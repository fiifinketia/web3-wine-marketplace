<template>
  <q-page
    class="column items-center"
    :class="loadingRequest || emptyRequest ? 'justify-center' : ''"
    style="flex-wrap: nowrap"
  >
    <div v-if="loadingRequest" class="column items-center">
      <LoadingView :loading-text="'Loading your incoming offers'" />
    </div>
    <ErrorView
      v-else-if="!!errorOverall"
      :tab-error="'trading'"
      @reload-tab="FetchIncomingOffers(incomingSortKey, incomingBrandFilter)"
    />
    <div v-else class="column items-center full-width q-mx-none profile-page-container">
      <div
        v-if="!emptyRequest"
        class="column items-center"
        :class="$q.screen.width > 600 ? '' : 'full-width'"
      >
        <IncomingHeaderLg
          v-if="$q.screen.width > 1020"
          :incoming-amount="incomingOffers.length"
          :selected-incoming-sort-key="incomingSortKey"
          :updated-incoming-brand-filter="incomingBrandFilter"
          :brand-searched="brandSearched"
          @incoming-brand-filter-updated="val => (incomingBrandFilter = val)"
          @incoming-sort-key-selected="val => (incomingSortKey = val)"
          @fetch-incoming-with-brand-filter="
            val => FetchIncomingOffers(val.sortKey, val.brandFilter)
          "
          @reset-incoming-search="val => FetchIncomingOffers(val, '')"
        />
        <IncomingHeaderSm
          v-else
          :incoming-amount="incomingOffers.length"
          :selected-incoming-sort-key="incomingSortKey"
          :updated-incoming-brand-filter="incomingBrandFilter"
          :brand-searched="brandSearched"
          @incoming-brand-filter-updated="val => (incomingBrandFilter = val)"
          @incoming-sort-key-selected="val => (incomingSortKey = val)"
          @fetch-incoming-with-brand-filter="
            val => FetchIncomingOffers(val.sortKey, val.brandFilter)
          "
          @reset-incoming-search="val => FetchIncomingOffers(val, '')"
        />
        <div v-if="$q.screen.width > 600" class="profile-main-container column">
          <IncomingColumns />
          <q-separator
            style="background-color: #5e97ec45 !important"
            inset
            class="q-mx-xl"
          />
          <IncomingRows
            :incoming-offers="incomingOffers"
            @accept-offer="
              req =>
                OpenConfirmDialog(
                  req.orderHash,
                  req.brand,
                  req.image,
                  req.token,
                  req.offer,
                  req.currency
                )
            "
          />
        </div>
        <div v-else class="full-width" style="width: 100vw">
          <IncomingColumns />
          <IncomingRows
            :incoming-offers="incomingOffers"
            @accept-offer="
              req =>
                OpenConfirmDialog(
                  req.orderHash,
                  req.brand,
                  req.image,
                  req.token,
                  req.offer,
                  req.currency
                )
            "
          />
        </div>
        <ErrorDialog
          v-model="openErrorDialog"
          :error-type="errorType"
          :error-title="errorTitle"
          :error-message="errorMessage"
        />
        <ConfirmView
          v-model="openConfirmDialog"
          :order-hash="orderHash"
          :brand="brand"
          :image="image"
          :token="token"
          :amount="offer"
          :currency="currency"
          @accept-offer="
            req => AcceptOffer(req.orderHash, req.brand, req.image, req.token)
          "
					@open-terms-and-conditions="showTermsAndConditions = true"
        />
      </div>
      <div v-else class="column items-center">
        <EmptyView :empty-text="'You do not have incoming offers yet.'" />
      </div>
      <AcceptedOfferDialog
        v-model="openAcceptedOrderDialog"
        :order-accepted="'offer'"
      />
      <OngoingTransactionDialog v-model="ongoingTxn"/>
      <KYCUpdate
        v-model="openKYCUpdate"
        @start-veriff="(sessionDetails) =>
          BeginUserVerification(sessionDetails.continueSession, sessionDetails.lastSessionURL)
        "
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'src/css/Profile/shared.css';
import 'src/css/Profile/Component/incoming.css';
import { ordersStore } from 'src/stores/orders-store';
import IncomingHeaderLg from '../Headers/IncomingHeaderLg.vue';
import IncomingHeaderSm from '../Headers/IncomingHeaderSm.vue';
import OrderLoading from '../OrderLoading.vue';
import LoadingError from '../LoadingError.vue';
import Empty from '../EmptyOrders.vue';
import { useNFTStore } from 'src/stores/nft-store';
import { FulfillBasicOrder } from 'src/pages/Metadata/services/Orders';
import { useUserStore } from 'src/stores/user-store';
import { IncomingOffersResponse } from '../models/response.models';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
import ProfileErrors from '../../SharedPopups/ProfileErrors.vue';
import { ErrorMessageBuilder } from 'src/shared/error.msg.helper';
import AcceptOffer from '../../SharedPopups/AcceptOffer.vue';
import IncomingColumns from '../Columns/IncomingColumns.vue';
import IncomingRows from '../Rows/IncomingRows.vue';
import { mapState } from 'pinia';
import OrderAccepted from 'src/pages/SharedPopups/OrderAccepted.vue';
import TxnOngoing from 'src/pages/SharedPopups/TxnOngoing.vue';
import { HandleUserValidity, StartVeriff } from 'src/shared/veriff-service';
import KYCUpdate from 'src/pages/SharedPopups/KYCUpdate.vue';

const nftStore = useNFTStore();

export default defineComponent({
  components: {
    IncomingHeaderLg: IncomingHeaderLg,
    IncomingHeaderSm: IncomingHeaderSm,
    LoadingView: OrderLoading,
    EmptyView: Empty,
    ErrorView: LoadingError,
    ErrorDialog: ProfileErrors,
    ConfirmView: AcceptOffer,
    AcceptedOfferDialog: OrderAccepted,
    IncomingColumns: IncomingColumns,
    IncomingRows: IncomingRows,
    OngoingTransactionDialog: TxnOngoing,
    KYCUpdate: KYCUpdate
  },
  emits: ['incomingAmount'],

  data() {
    const store = ordersStore();
    const nftStore = useNFTStore();
    const userStore = useUserStore();
    return {
      store,
      nftStore,
      userStore,
      incomingSortKey: store.getIncomingSortKey,

      incomingBrandFilter: store.getIncomingBrandFilter,

      loadingRequest: false,
      emptyRequest: false,

      errorOverall: false,
      errorType: '',
      errorTitle: '',
      errorMessage: '',
      openErrorDialog: false,
      openConfirmDialog: false,
      openAcceptedOrderDialog: false,
			showTermsAndConditions: false,
      openKYCUpdate: false,

      orderHash: '',
      brand: '',
      image: '',
      token: {} as TokenIdentifier,
      currency: '',
      offer: '',

      ongoingTxn: false
    };
  },

  computed: {
    ...mapState(ordersStore, {
      incomingOffers: store => store.getIncomingOffers,
      brandSearched: store => store.getIncomingBrandFilterStatus,
      tabKey: store => store.getIncomingTabKey
    }),
  },

  watch: {
    incomingSortKey: {
      handler: async function (sortKey) {
        this.store.setIncomingSortKey(sortKey);
        if (!this.store.getIncomingBrandFilterStatus) {
          await this.FetchIncomingOffers(sortKey, '');
        } else {
          await this.FetchIncomingOffers(sortKey, this.incomingBrandFilter);
        }
      },
    },
    incomingBrandFilter: {
      handler: function (brandFilter) {
        this.store.setIncomingBrandFilter(brandFilter);
        this.store.setIncomingBrandFilterStatus(false);
      },
    },
    tabKey: {
      async handler() {
        await this.FetchIncomingOffers('', '');
      }
    }
  },

  async mounted() {
    this.store.setIncomingBrandFilterStatus(false);
    await this.FetchIncomingOffers('', '');
  },

  methods: {
    async PreventExitDuringTxn(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = '';
    },
    SetPreventingExitListener(action: boolean) {
      if (action) {
        this.ongoingTxn = true;
        window.addEventListener('beforeunload', this.PreventExitDuringTxn);
      } else {
        this.ongoingTxn = false;
        window.removeEventListener('beforeunload', this.PreventExitDuringTxn);
      }
    },
    ReduceAddress(walletAddress: string) {
      return `${walletAddress.slice(0, 11)}...`;
    },
    OpenConfirmDialog(
      orderHash: string,
      brand: string,
      image: string,
      token: TokenIdentifier,
      offer: string,
      currency: string
    ) {
      this.orderHash = orderHash;
      this.brand = brand;
      this.image = image;
      this.token = token;
      this.offer = offer;
      this.currency = currency;
      this.openConfirmDialog = true;
    },
    async AcceptOffer(
      orderHash: string,
      brand: string,
      image: string,
      token: TokenIdentifier
    ) {
			if(!this.userStore.user) throw new Error('User not logged in');
      try {
        this.SetPreventingExitListener(true);
        const isVerified = await HandleUserValidity();
        if (isVerified) {
          await FulfillBasicOrder(orderHash, brand, true, this.userStore.user, image);
          this.RemoveRow(token);
          this.CheckForEmptyRequest();
          this.openAcceptedOrderDialog = true;
          setTimeout(() => {
            this.openAcceptedOrderDialog = false;
          }, 3000);
        } else {
          this.SetPreventingExitListener(false);
          this.openKYCUpdate = true;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        this.HandleError(err);
      } finally {
        this.SetPreventingExitListener(false);
        this.openConfirmDialog = false;
      }
    },
    async FetchIncomingOffers(sortKey: string, brandFilter: string) {
      this.loadingRequest = true;
      try {
        // TODO WHEN TO REFETCH?
        await this.RefetchNFTs();
        await this.store.setIncomingOffers(
          nftStore.ownedNFTs,
          sortKey,
          brandFilter
        );
        if (
          this.store.getIncomingOffers.length == 0 &&
          this.store.incomingBrandFilterStatus == true
        ) {
          this.HandleMissingBrand();
        } else {
          this.incomingOffers = this.EnsureIncomingOffersAreOwned();
          this.$emit('incomingAmount', this.incomingOffers.length);
          this.CheckForEmptyRequest();
        }
        this.errorOverall = false;
      } catch {
        this.errorOverall = true;
      } finally {
        this.loadingRequest = false;
      }
    },
    CheckForEmptyRequest() {
      if (this.incomingOffers.length == 0) {
        this.emptyRequest = true;
      }
    },
    EnsureIncomingOffersAreOwned(): IncomingOffersResponse[] {
      const incomingOffers = this.store.getIncomingOffers;
      const ownedNFTs = nftStore.ownedNFTs;

      const incomingOffersMap: Map<string, IncomingOffersResponse> = new Map();
      const ownedNFTsMap: Map<string, TokenIdentifier> = new Map();

      incomingOffers.forEach(f => {
        const key = f.orderHash;
        incomingOffersMap.set(key, f);
      });
      ownedNFTs.forEach(f => {
        const key = `${f.identifierOrCriteria},${f.contractAddress},${f.network}`;
        ownedNFTsMap.set(key, f);
      });

      const actualIncomingOffers: IncomingOffersResponse[] = [];
      incomingOffersMap.forEach(v => {
        const key = `${v.identifierOrCriteria},${v.contractAddress},${v.network}`;
        const actualIncomingOffer = ownedNFTsMap.has(key);
        if (actualIncomingOffer) actualIncomingOffers.push(v);
      });
      return actualIncomingOffers;
    },
    RemoveRow(token: TokenIdentifier) {
      this.store.filterIncomingOffers(token);
      this.CheckForEmptyRequest();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    HandleError(err: any) {
      const { errorType, errorTitle, errorMessage } = ErrorMessageBuilder(err);
      this.errorType = errorType;
      this.errorTitle = errorTitle;
      this.errorMessage = errorMessage;
      this.openErrorDialog = true;
      setTimeout(() => {
        this.openErrorDialog = false;
      }, 2000);
    },
    async RefetchNFTs() {
      nftStore.ownedNFTs = [] as TokenIdentifier[];
      // TODO: Exception handling
      await nftStore.fetchNFTs(this.userStore.walletAddress);
    },
    HandleMissingBrand() {
      this.store.resetIncomingOffers();
      this.incomingBrandFilter = this.store.incomingBrandFilter;
      this.store.setIncomingBrandFilterStatus(false);

      this.errorType = 'filter';
      this.errorTitle = 'Unable to fetch your orders';
      this.errorMessage = 'There are no orders under your current filter';
      this.openErrorDialog = true;
      setTimeout(() => {
        this.openErrorDialog = false;
      }, 2000);
    },
    BeginUserVerification(continueSession: boolean, lastSessionURL: string) {
      this.openKYCUpdate = false;
      StartVeriff(<string> this.userStore.user?.walletAddress, '', continueSession, lastSessionURL);
    }
  },
});
</script>

<style scoped>
:deep(.q-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
