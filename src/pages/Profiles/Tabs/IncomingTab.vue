<template>
  <q-page
    class="column items-center"
    :class="!loadingRequest || emptyRequest ? 'justify-center' : ''"
    style="flex-wrap: nowrap"
  >
    <div v-if="!loadingRequest" class="column items-center">
      <LoadingView :loading-text="'Loading your incoming offers'" />
    </div>
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
                  req.token
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
                  req.token
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
          @accept-offer="
            req => AcceptOffer(req.orderHash, req.brand, req.image, req.token)
          "
        />
      </div>
      <div v-else class="column items-center">
        <EmptyView :empty-text="'You do not have incoming offers yet.'" />
      </div>
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
import Empty from '../EmptyOrders.vue';
import { useNFTStore } from 'src/stores/nft-store';
import { FulfillBasicOrder } from 'src/pages/Metadata/services/Orders';
import { useUserStore } from 'src/stores/user-store';
import { IncomingOffersResponse } from '../models/response.models';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
import ProfileErrors from '../Popups/ProfileErrors.vue';
import { ErrorMessageBuilder } from 'src/shared/error.msg.helper';
import AcceptOffer from '../Popups/AcceptOffer.vue';
import IncomingColumns from '../Columns/IncomingColumns.vue';
import IncomingRows from '../Rows/IncomingRows.vue';
import { mapState } from 'pinia';

const nftStore = useNFTStore();

export default defineComponent({
  components: {
    IncomingHeaderLg: IncomingHeaderLg,
    IncomingHeaderSm: IncomingHeaderSm,
    LoadingView: OrderLoading,
    EmptyView: Empty,
    ErrorDialog: ProfileErrors,
    ConfirmView: AcceptOffer,
    IncomingColumns: IncomingColumns,
    IncomingRows: IncomingRows,
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

      errorType: '',
      errorTitle: '',
      errorMessage: '',
      openErrorDialog: false,
      openConfirmDialog: false,

      orderHash: '',
      brand: '',
      image: '',
      token: {} as TokenIdentifier
    };
  },

  computed: {
    ...mapState(ordersStore, {
      incomingOffers: store => store.getIncomingOffers,
      brandSearched: store => store.getIncomingBrandFilterStatus
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
        this.loadingRequest = true;
      },
    },
    incomingBrandFilter: {
      handler: function (brandFilter) {
        this.store.setIncomingBrandFilter(brandFilter);
        this.store.setIncomingBrandFilterStatus(false);
      },
    },
  },

  async mounted() {
    this.store.setIncomingBrandFilterStatus(false);
    await this.FetchIncomingOffers('', '');
  },

  methods: {
    ReduceAddress(walletAddress: string) {
      return `${walletAddress.slice(0, 11)}...`;
    },
    OpenConfirmDialog(
      orderHash: string,
      brand: string,
      image: string,
      token: TokenIdentifier
    ) {
      this.orderHash = orderHash;
      this.brand = brand;
      this.image = image;
      this.token = token;
      this.openConfirmDialog = true;
    },
    async AcceptOffer(
      orderHash: string,
      brand: string,
      image: string,
      token: TokenIdentifier
    ) {
      const address = this.userStore.walletAddress;
      try {
        await FulfillBasicOrder(orderHash, brand, true, address, image);
        this.RemoveRow(token);
        this.CheckForEmptyRequest();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        this.HandleError(err);
      } finally {
        this.openConfirmDialog = false;
      }
    },
    async FetchIncomingOffers(sortKey: string, brandFilter: string) {
      this.loadingRequest = false;
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
      } else if (this.store.incomingBrandFilterStatus == true) {
        this.brandSearched = true;
        this.loadingRequest = true;
      } else {
        this.brandSearched = false;
        this.incomingOffers = this.EnsureIncomingOffersAreOwned();
        this.$emit('incomingAmount', this.incomingOffers.length);
        this.CheckForEmptyRequest();
        this.loadingRequest = true;
      }
    },
    CheckForEmptyRequest() {
      if (this.incomingOffers.length == 0) {
        this.emptyRequest = true;
      }
      this.loadingRequest = true;
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
      this.loadingRequest = true;

      this.errorType = 'filter';
      this.errorTitle = 'Unable to fetch your orders';
      this.errorMessage = 'There are no orders under your current filter';
      this.openErrorDialog = true;
      setTimeout(() => {
        this.openErrorDialog = false;
      }, 2000);
    },
  },
});
</script>

<style scoped>
:deep(.q-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
