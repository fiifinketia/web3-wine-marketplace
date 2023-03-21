<template>
  <q-page
    class="column items-center"
    :class="!loadingRequest || emptyRequest ? 'justify-center' : ''"
  >
    <div v-if="!loadingRequest" class="column items-center">
      <LoadingView :loading-text="'Loading your outgoing offers'" />
    </div>
    <div v-else class="column items-center full-width q-mx-none">
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
            @delete-offer="offer => OpenDeleteDialog(offer)"
            @edit-offer="offer => OpenEditDialog(offer)"
          />
        </div>
        <div v-else class="full-width" style="width: 100vw">
          <OutgoingColumns />
          <OutgoingRows
            :outgoing-offers="outgoingOffers"
            @delete-offer="offer => OpenDeleteDialog(offer)"
            @edit-offer="offer => OpenEditDialog(offer)"
          />
        </div>
        <OutgoingDialogEdit
          v-model="openEditDialog"
          :brand="singleOffer.brand"
          :highest-offer="singleOffer.highestOffer!"
          :highest-offer-currency="singleOffer.highestOfferCurrency!"
          :image="singleOffer.image"
          :network="singleOffer.network"
          :order-hash="singleOffer.orderHash"
          :smart-contract-address="singleOffer.contractAddress"
          :token-i-d="singleOffer.identifierOrCriteria"
          @outgoing-edit-close="openEditDialog = false"
          @remove-offer="val => RemoveRow(val)"
          @outgoing-error-dialog="HandleError"
        />
        <OutgoingDialogDelete
          v-model="openDeleteDialog"
          :order-hash="singleOffer.orderHash"
          @outgoing-delete-close="openDeleteDialog = false"
          @remove-offer="val => RemoveRow(val)"
          @outgoing-error-dialog="HandleError"
        />
        <ErrorDialog
          v-model="openErrorDialog"
          :error-type="errorType"
          :error-title="errorTitle"
          :error-message="errorMessage"
        />
      </div>
      <div v-else class="column items-center">
        <EmptyView :empty-text="'You have not made any offers yet.'" />
      </div>
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
import { useUserStore } from 'src/stores/user-store';
import OutgoingEdit from '../Popups/OutgoingEdit.vue';
import OutgoingDelete from '../Popups/OutgoingDelete.vue';
import { OutgoingOffersResponse } from '../models/response.models';
import ProfileErrors from '../Popups/ProfileErrors.vue';
import OutgoingColumns from '../Columns/OutgoingColumns.vue';
import OutgoingRows from '../Rows/OutgoingRows.vue';

export default defineComponent({
  components: {
    OutgoingHeaderLg: OutgoingHeaderLg,
    OutgoingHeaderSm: OutgoingHeaderSm,
    LoadingView: OrderLoading,
    EmptyView: EmptyOrders,
    OutgoingDialogEdit: OutgoingEdit,
    OutgoingDialogDelete: OutgoingDelete,
    ErrorDialog: ProfileErrors,
    OutgoingColumns: OutgoingColumns,
    OutgoingRows: OutgoingRows,
  },
  emits: ['outgoingAmount'],
  data() {
    const store = ordersStore();
    const userStore = useUserStore();
    return {
      store,
      userStore,
      outgoingOffers: store.outgoingOffers,
      outgoingSortKey: store.getOutgoingSortKey,

      outgoingBrandFilter: store.getOutgoingBrandFilter,

      loadingRequest: false,
      emptyRequest: false,

      openEditDialog: false,
      openDeleteDialog: false,

      singleOffer: {} as OutgoingOffersResponse,

      errorType: '',
      errorTitle: '',
      errorMessage: '',
      openErrorDialog: false,

      brandSearched: false,
    };
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
        this.loadingRequest = true;
      },
    },
    outgoingBrandFilter: {
      handler: function (brandFilter) {
        this.store.setOutgoingBrandFilter(brandFilter);
        this.store.setOutgoingBrandFilterStatus(false);
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
    }
    this.loadingRequest = true;
  },
  methods: {
    async FetchOutgoingOffers(sortKey: string, brandFilter: string) {
      this.loadingRequest = false;
      const address = this.userStore.walletAddress;
      await this.store.setOutgoingOffers(address, sortKey, brandFilter);
      // Checks whether a brand filter was used
      if (
        this.store.getOutgoingOffers.length == 0 &&
        this.store.outgoingBrandFilterStatus == true
      ) {
        this.HandleMissingBrand();
      } else if (this.store.outgoingBrandFilterStatus == true) {
        this.brandSearched = true;
        this.loadingRequest = true;
      } else {
        this.brandSearched = false;
        this.outgoingOffers = this.store.getOutgoingOffers;
        this.$emit('outgoingAmount', this.outgoingOffers.length);
        this.CheckForEmptyRequest();
        this.loadingRequest = true;
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
      this.outgoingOffers = this.outgoingOffers.filter(
        f => f.orderHash !== orderHash
      );
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
      this.store.setOutgoingBrandFilterStatus(false);
      this.loadingRequest = true;
      this.HandleError({
        errorType: 'filter',
        errorTitle: 'Unable to fetch your orders',
        errorMessage: 'There are no orders under your current filter',
      });
    },
  },
});
</script>

<style scoped>
:deep(.q-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
