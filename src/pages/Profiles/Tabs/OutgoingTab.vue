<template>
  <q-page
    class="column items-center"
    :class="loadingRequest || emptyRequest ? 'justify-center' : ''"
    style="flex-wrap: nowrap"
  >
    <div v-if="loadingRequest" class="column items-center">
      <LoadingView :loading-text="'Loading your outgoing offers'" />
    </div>
    <ErrorView
      v-else-if="!!errorOverall"
      :tab-error="'outgoing'"
      @reload-tab="FetchOutgoingOffers(outgoingSortKey, outgoingBrandFilter)"
    />
    <div
      v-else
      class="column items-center full-width q-mx-none profile-page-container"
    >
      <div
        v-if="!emptyRequest"
        class="column items-center"
        :class="$q.screen.width > 600 ? '' : 'full-width'"
      >
        <OutgoingHeaderLg
          v-if="$q.screen.width > 1020"
          :outgoing-amount="outgoingOffers.length"
          :selected-outgoing-sort-key="outgoingSortKey"
          :updated-outgoing-brand-filter="outgoingBrandFilter"
          :brand-searched="brandSearched"
          @outgoing-brand-filter-updated="val => (outgoingBrandFilter = val)"
          @outgoing-sort-key-selected="val => (outgoingSortKey = val)"
          @fetch-outgoing-with-brand-filter="
            val => FetchOutgoingOffers(val.sortKey, val.brandFilter)
          "
          @reset-outgoing-search="val => FetchOutgoingOffers(val, '')"
        />
        <OutgoingHeaderSm
          v-else
          :outgoing-amount="outgoingOffers.length"
          :selected-outgoing-sort-key="outgoingSortKey"
          :updated-outgoing-brand-filter="outgoingBrandFilter"
          :brand-searched="brandSearched"
          @outgoing-brand-filter-updated="val => (outgoingBrandFilter = val)"
          @outgoing-sort-key-selected="val => (outgoingSortKey = val)"
          @fetch-outgoing-with-brand-filter="
            val => FetchOutgoingOffers(val.sortKey, val.brandFilter)
          "
          @reset-outgoing-search="val => FetchOutgoingOffers(val, '')"
        />
        <div v-if="$q.screen.width > 600" class="profile-main-container column">
          <OutgoingColumns />
          <q-separator
            style="background-color: #5e97ec45 !important"
            inset
            class="q-mx-xl"
          />
          <OutgoingRows
            :outgoing-offers="outgoingOffers"
            @delete-offer="offer => TransactionPreValidator('UNOFFER', offer)"
            @edit-offer="offer => TransactionPreValidator('OFFER', offer)"
          />
        </div>
        <div v-else class="full-width" style="width: 100vw">
          <OutgoingColumns />
          <OutgoingRows
            :outgoing-offers="outgoingOffers"
            @delete-offer="offer => TransactionPreValidator('UNOFFER', offer)"
            @edit-offer="offer => TransactionPreValidator('OFFER', offer)"
          />
        </div>
      </div>
      <div v-else class="column items-center">
        <EmptyView :empty-text="'You have not made any offers yet.'" />
      </div>
      <OutgoingDialogEdit
        v-model="openEditDialog"
        :brand="singleOffer.brand"
        :highest-offer="singleOffer.highestOffer"
        :highest-offer-currency="singleOffer.highestOfferCurrency"
        :highest-offer-exp-time="singleOffer.highestOfferExpTime"
        :image="singleOffer.image"
        :network="singleOffer.network"
        :order-hash="singleOffer.orderHash"
        :smart-contract-address="singleOffer.contractAddress"
        :token-i-d="singleOffer.identifierOrCriteria"
        :is-edit="true"
        @outgoing-edit-close="openEditDialog = false"
        @remove-offer="val => RemoveRow(val)"
        @outgoing-error-dialog="HandleError"
        @offer-created="SetTimeoutOnOfferProcessedDialog()"
        @open-terms-and-conditions="showTermsAndConditions = true"
        @open-kyc-dialog="
          openEditDialog = false;
          openKYCUpdate = true;
        "
      />
      <OutgoingDialogDelete
        v-model="openDeleteDialog"
        :order-hash="singleOffer.orderHash"
        @outgoing-delete-close="openDeleteDialog = false"
        @remove-offer="val => RemoveRow(val)"
        @outgoing-error-dialog="HandleError"
        @open-kyc-dialog="
          openEditDialog = false;
          openKYCUpdate = true;
        "
      />
      <ErrorDialog
        v-model="openErrorDialog"
        :error-type="errorType"
        :error-title="errorTitle"
        :error-message="errorMessage"
      />
      <OutgoingProcessedDialog
        v-model="openOrderCompletedDialog"
        :order-type="'offer'"
      />
      <KYCUpdate
        v-model="openKYCUpdate"
        @start-veriff="
          sessionDetails =>
            BeginUserVerification(
              sessionDetails.continueSession,
              sessionDetails.lastSessionURL
            )
        "
      />
      <wiv-toc-dialog v-model="showTermsAndConditions" close-button />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ordersStore } from 'src/stores/orders-store';
import 'src/css/Profile/Component/outgoing.css';
import OutgoingHeaderLg from '../Headers/OutgoingHeaderLg.vue';
import OutgoingHeaderSm from '../Headers/OutgoingHeaderSm.vue';
import OrderLoading from '../OrderLoading.vue';
import EmptyOrders from '../EmptyOrders.vue';
import LoadingError from '../LoadingError.vue';
import { useUserStore } from 'src/stores/user-store';
import OutgoingEdit from '../../SharedPopups/OutgoingEdit.vue';
import OutgoingDelete from '../../SharedPopups/OutgoingDelete.vue';
import { OutgoingOffersResponse } from '../models/response.models';
import ProfileErrors from '../../SharedPopups/ProfileErrors.vue';
import OutgoingColumns from '../Columns/OutgoingColumns.vue';
import OutgoingRows from '../Rows/OutgoingRows.vue';
import { mapState } from 'pinia';
import OrderProcessed from 'src/pages/SharedPopups/OrderProcessed.vue';
import KYCUpdate from 'src/pages/SharedPopups/KYCUpdate.vue';
import {
  HandleUserValidity,
  StartVeriff,
  VerificationStatus,
} from 'src/shared/veriff-service';

export default defineComponent({
  components: {
    OutgoingHeaderLg: OutgoingHeaderLg,
    OutgoingHeaderSm: OutgoingHeaderSm,
    LoadingView: OrderLoading,
    EmptyView: EmptyOrders,
    ErrorView: LoadingError,
    OutgoingDialogEdit: OutgoingEdit,
    OutgoingDialogDelete: OutgoingDelete,
    OutgoingProcessedDialog: OrderProcessed,
    ErrorDialog: ProfileErrors,
    OutgoingColumns: OutgoingColumns,
    OutgoingRows: OutgoingRows,
    KYCUpdate: KYCUpdate,
  },
  emits: ['outgoingAmount'],
  data() {
    const store = ordersStore();
    const userStore = useUserStore();
    return {
      store,
      userStore,
      outgoingSortKey: store.getOutgoingSortKey,

      outgoingBrandFilter: store.getOutgoingBrandFilter,

      loadingRequest: true,
      emptyRequest: false,

      openEditDialog: false,
      openDeleteDialog: false,

      singleOffer: {} as OutgoingOffersResponse,

      errorOverall: false,
      errorType: '',
      errorTitle: '',
      errorMessage: '',
      openErrorDialog: false,
      openOrderCompletedDialog: false,
      showTermsAndConditions: false,

      openKYCUpdate: false,
    };
  },
  computed: {
    ...mapState(ordersStore, {
      outgoingOffers: store => store.getOutgoingOffers,
      brandSearched: store => store.getOutgoingBrandFilterStatus,
      tabKey: store => store.getOutgoingTabKey,
    }),
    ...mapState(useUserStore, {
      userStatus: store => store.user?.verificationStatus,
    }),
  },
  watch: {
    outgoingSortKey: {
      handler: async function (sortKey) {
        this.store.setOutgoingSortKey(sortKey);
        if (!this.store.getOutgoingBrandFilterStatus) {
          await this.FetchOutgoingOffers(sortKey, '');
        } else {
          await this.FetchOutgoingOffers(sortKey, this.outgoingBrandFilter);
        }
      },
    },
    outgoingBrandFilter: {
      handler: function (brandFilter) {
        this.store.setOutgoingBrandFilter(brandFilter);
      },
    },
    tabKey: {
      async handler() {
        await this.FetchOutgoingOffers('', '');
      },
    },
  },
  async mounted() {
    const outgoingOffersRequestStatus =
      this.store.getOutgoingOffersRequestStatus;
    if (outgoingOffersRequestStatus == false) {
      await this.FetchOutgoingOffers('', '');
    } else {
      this.$emit('outgoingAmount', this.outgoingOffers.length);
      this.CheckForEmptyRequest();
      this.loadingRequest = false;
    }
  },
  methods: {
    SetTimeoutOnOfferProcessedDialog() {
      this.openOrderCompletedDialog = true;
      setTimeout(() => {
        this.openOrderCompletedDialog = false;
      }, 3000);
    },
    async FetchOutgoingOffers(sortKey: string, brandFilter: string) {
      this.loadingRequest = true;
      const address = this.userStore.walletAddress;
      try {
        await this.store.setOutgoingOffers(address, sortKey, brandFilter);
        // Checks whether a brand filter was used
        if (
          this.store.getOutgoingOffers.length == 0 &&
          this.store.outgoingBrandFilterStatus == true
        ) {
          this.HandleMissingBrand();
        } else {
          this.$emit('outgoingAmount', this.outgoingOffers.length);
          this.CheckForEmptyRequest();
        }
        this.errorOverall = false;
      } catch {
        this.errorOverall = true;
      } finally {
        this.loadingRequest = false;
      }
    },
    OpenDeleteDialog(offer: OutgoingOffersResponse) {
      this.singleOffer = offer;
      this.openDeleteDialog = true;
    },
    OpenEditDialog(offer: OutgoingOffersResponse) {
      this.singleOffer = offer;
      this.openEditDialog = true;
    },
    RemoveRow(orderHash: string) {
      this.store.filterOutgoingOffers(orderHash);
      this.CheckForEmptyRequest();
    },
    CheckForEmptyRequest() {
      if (this.outgoingOffers.length == 0) {
        this.emptyRequest = true;
      }
    },
    HandleError(err: {
      errorType: string;
      errorTitle: string;
      errorMessage: string;
    }) {
      this.errorType = err.errorType;
      this.errorTitle = err.errorTitle;
      this.errorMessage = err.errorMessage;
      this.openErrorDialog = true;
      setTimeout(() => {
        this.openErrorDialog = false;
      }, 2000);
    },
    HandleMissingBrand() {
      this.store.resetOutgoingOffers();
      this.outgoingBrandFilter = this.store.outgoingBrandFilter;
      this.HandleError({
        errorType: 'filter',
        errorTitle: 'Unable to fetch your orders',
        errorMessage: 'There are no orders under your current filter',
      });
    },
    BeginUserVerification(continueSession: boolean, lastSessionURL: string) {
      this.openKYCUpdate = false;
      StartVeriff(
        <string>this.userStore.user?.walletAddress,
        '',
        continueSession,
        lastSessionURL
      );
    },
    async TransactionPreValidator(
      dialog: string,
      offer: OutgoingOffersResponse
    ) {
      if (!this.userStore.user?.email) {
        this.HandleError({
          errorType: 'email_unverified',
          errorTitle: 'User email not verified',
          errorMessage: 'Please verify your email and try again.',
        });
      } else if (this.userStatus !== VerificationStatus.VERIFIED) {
        try {
          const isVerified = await HandleUserValidity();
          if (isVerified) {
            this.TransactionPreValidator(dialog, offer);
          } else {
            this.openKYCUpdate = true;
          }
        } catch {
          this.HandleError({
            errorType: 'validation_failed',
            errorTitle: 'Failed to verify user KYC status.',
            errorMessage: 'Please try again later.',
          });
        }
      } else {
        switch (dialog) {
          case 'OFFER':
            this.OpenEditDialog(offer);
            break;
          case 'UNOFFER':
            this.OpenDeleteDialog(offer);
            break;
        }
      }
    },
  },
});
</script>

<style scoped>
:deep(.q-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
