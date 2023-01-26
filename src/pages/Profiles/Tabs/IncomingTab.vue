<template>
<q-page class="column items-center" :class="!loadingRequest || emptyRequest ? 'justify-center' : ''">
  <div v-if="!loadingRequest" class="column items-center">
    <LoadingView
      :loadingText="'Loading your incoming offers'"
    />
  </div>
  <div v-else class="column items-center">
    <div v-if="!emptyRequest" class="column items-center">
      <IncomingHeaderLg
        v-if="$q.screen.width > 1020"
        :incomingAmount="incomingOffers.length"
        :selectedIncomingSortKey="incomingSortKey"
        :updatedIncomingBrandFilter="incomingBrandFilter"
        @incomingBrandFilterUpdated="(val) => incomingBrandFilter = val"
        @incomingSortKeySelected="(val) => incomingSortKey = val"
        @fetchIncomingWithBrandFilter="(val) => FetchIncomingOffers(val.sortKey, val.brandFilter)"
      />
      <IncomingHeaderSm
        v-else
        :incomingAmount="incomingOffers.length"
        :selectedIncomingSortKey="incomingSortKey"
        :updatedIncomingBrandFilter="incomingBrandFilter"
        @incomingBrandFilterUpdated="(val) => incomingBrandFilter = val"
        @incomingSortKeySelected="(val) => incomingSortKey = val"
        @fetchIncomingWithBrandFilter="(val) => FetchIncomingOffers(val.sortKey, val.brandFilter)"
      />
      <div class="profile-main-container column">
        <div class="row q-pa-lg profile-column-name">
          <span class="incoming-column-nft">
            NFT
          </span>
          <span 
            v-if="$q.screen.width > 1020"
            class="incoming-column-price-floor"
          >
            Floor Price
          </span>
          <span class="incoming-column-price-offered">
            Offered
          </span>
          <span 
            v-if="$q.screen.width > 1265"
            class="incoming-column-from"
          >
            From
          </span>
          <span 
            v-if="$q.screen.width > 600"
            class="incoming-column-expire"
          >
            Exp On
          </span>
          <span class="incoming-column-action">
            Action
          </span>
        </div>
        <q-separator style="background-color: #5e97ec45 !important" inset class="q-mx-xl" />
        <div class="profile-nft-container">
        <div 
          v-for="offer in incomingOffers"
          :key="offer.orderHash"
          class="q-px-lg q-py-md row items-center"
        >
          <q-btn 
            flat
            unelevated
            dense
            no-caps
            align="left"
            padding="0px"
            class="incoming-column-nft btn--no-hover"
            :to="{ path: '/nft', query: { id: offer.identifierOrCriteria, network: offer.network, contractAddress: offer.contractAddress} }"
          >
            <img v-if="$q.screen.width > 1265" :src="offer.image" class="profile-nft-image q-mr-md"/>
            <span class="profile-nft-brand"> {{ offer.brand }}</span>
          </q-btn>
          <div 
            v-if="$q.screen.width > 1020"
            class="row items-center incoming-column-price-floor"
          >
            <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
            <span class="profile-nft-number"> {{ !!offer.lowestOffer ? offer.lowestOffer : '0.00' }}  </span>
          </div>
          <div 
            v-if="$q.screen.width > 600"
            class="row items-center incoming-column-price-offered"
          >
            <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
            <span class="profile-nft-number"> {{ offer.offer }} </span>
            <q-tooltip
              v-if="
                $q.screen.width <= 1265
                && $q.screen.width > 600
              "
              anchor="top start" 
              self="center start"
              class="listing-tooltip-container" 
              :offset="$q.screen.width > 1020 ? [70, 30] : [70, 40]"
            >
              <div class="column">
                <div 
                  v-if="$q.screen.width <= 1020"
                  class="row items-center justify-between"
                >
                  <span class="incoming-tooltip-label">
                    Floor Price
                  </span>
                  <div class="row items-center">
                    <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
                    <span class="incoming-tooltip-text q-pl-xs"> {{ offer.offer }} </span>
                  </div>
                </div>
                <div class="row items-center justify-between">
                  <span class="incoming-tooltip-label">
                    From
                  </span>
                  <div class="row items-center">
                    <span class="incoming-tooltip-text q-pl-xs"> {{ ReduceAddress(offer.offerer) }} </span>
                  </div>
                </div>
              </div>
            </q-tooltip>
          </div>
          <div 
            v-if="$q.screen.width <= 600"
            class="incoming-column-price-offered column"
          >
            <div class="row q-pb-xs">
              <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
              <span class="profile-nft-number"> {{ offer.offer }} </span>
            </div>
            <span class="profile-nft-number-highlight"> {{ offer.endTime }} </span>
          </div>
          <div 
            v-if="$q.screen.width > 1265"
            class="row items-center incoming-column-from"
          >
            <span class="profile-nft-number"> {{ ReduceAddress(offer.offerer) }} </span>
          </div>
          <div 
            v-if="$q.screen.width > 600"
            class="incoming-column-expire"
          >
            <span class="profile-nft-number-highlight"> {{ offer.endTime }} </span>
          </div>
          <div style="margin-left: -5px;" class="row items-center incoming-column-action">
            <q-btn
              v-if="$q.screen.width > 1020"
              flat
              unelevated
              dense
              no-caps
              class="profile-accept-btn"
              @click="AcceptOffer(
                offer.orderHash,
                offer.brand,
                offer.image,
                {
                  identifierOrCriteria: offer.identifierOrCriteria,
                  contractAddress: offer.contractAddress,
                  network: offer.network
                }
              )"
            >
              Accept
            </q-btn>
            <q-btn
              v-else
              flat
              unelevated
              dense
              no-caps
              @click="AcceptOffer(
                offer.orderHash,
                offer.brand,
                offer.image,
                {
                  identifierOrCriteria: offer.identifierOrCriteria,
                  contractAddress: offer.contractAddress,
                  network: offer.network
                }
              )"
            >
              <img src="../../../assets/accept.svg"/>
            </q-btn>
          </div>
        </div>
        </div>
      </div>
      <ErrorDialog
        v-model="openErrorDialog"
        :errorType="errorType"
        :errorTitle="errorTitle"
        :errorMessage="errorMessage"
      />
    </div>
    <div v-else class="column items-center">
      <EmptyView :emptyText="'You do not have incoming offers yet.'" />
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
import { ErrorMessageBuilder, ErrorModel } from 'src/shared/error.msg.helper';

const nftStore = useNFTStore();

export default defineComponent({
  components: {
    IncomingHeaderLg: IncomingHeaderLg,
    IncomingHeaderSm: IncomingHeaderSm,
    LoadingView: OrderLoading,
    EmptyView: Empty,
    ErrorDialog: ProfileErrors
  },

  data() {
    const store = ordersStore();
    const nftStore = useNFTStore();
    const userStore = useUserStore();
    return {
      store,
      nftStore,
      userStore,
      incomingOffers: store.incomingOffers,
      incomingSortKey: store.getIncomingSortKey,

      incomingBrandFilter: store.getIncomingBrandFilter,

      loadingRequest: false,
      emptyRequest: false,

      errorType: '',
      errorTitle: '',
      errorMessage: '',
      openErrorDialog: false
    }
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
        this.loadingRequest = true
      }
    },
    incomingBrandFilter: {
      handler: function (brandFilter) {
        this.store.setIncomingBrandFilter(brandFilter);
        this.store.setIncomingBrandFilterStatus(false);
      }
    }
  },

  async mounted() {
    // if (incomingOffersRequestStatus == false) {
    await this.FetchIncomingOffers('', '');
    // } else {
    //   this.$emit('incomingAmount', this.incomingOffers.length);
    //   this.CheckForEmptyRequest();
    // }
  },

  methods: {
    ReduceAddress(walletAddress: string) {
      return `${walletAddress.slice(0, 11)}...`
    },
    async AcceptOffer(orderHash: string, brand: string, image: string, token: TokenIdentifier) {
      const address = this.userStore.walletAddress;
      try {
        await FulfillBasicOrder(
          orderHash,
          brand,
          true,
          address,
          image
        );
        this.RemoveRow(token);
        this.CheckForEmptyRequest();
      } catch (err: any) {
        this.HandleError(err);
      }
    },
    async FetchIncomingOffers(sortKey: string, brandFilter: string) {
      this.loadingRequest = false;
      await this.RefetchNFTs();
      await this.store.setIncomingOffers(nftStore.ownedNFTs, sortKey, brandFilter);
      if (this.store.getIncomingOffers.length == 0 && this.store.incomingBrandFilterStatus == true) {
        this.HandleMissingBrand();
      } else {
        this.incomingOffers = this.EnsureIncomingOffersAreOwned();
        this.$emit('incomingAmount', this.incomingOffers.length);
        this.CheckForEmptyRequest();
        this.loadingRequest = true;
      }
    },
    CheckForEmptyRequest() {
      if (this.incomingOffers.length == 0) {
        this.emptyRequest = true 
      }
      this.loadingRequest = true;
    },
    EnsureIncomingOffersAreOwned() : IncomingOffersResponse[] {
      const incomingOffers = this.store.getIncomingOffers;
      const ownedNFTs = nftStore.ownedNFTs;
      
      const incomingOffersMap: Map<string, IncomingOffersResponse> = new Map();
      const ownedNFTsMap: Map<string, TokenIdentifier> = new Map();

      incomingOffers.forEach(f => {
        const key = f.orderHash;
        incomingOffersMap.set(key, f);
      })
      ownedNFTs.forEach(f => {
        const key = `${f.identifierOrCriteria},${f.contractAddress},${f.network}`;
        ownedNFTsMap.set(key, f);
      })

      const actualIncomingOffers: IncomingOffersResponse[] = [];
      incomingOffersMap.forEach((v,k) => {
        const key = `${v.identifierOrCriteria},${v.contractAddress},${v.network}`;
        const actualIncomingOffer = ownedNFTsMap.has(key);
        if (actualIncomingOffer) actualIncomingOffers.push(v);
      })
      return actualIncomingOffers;
    },
    RemoveRow(token: TokenIdentifier) {
      const tokenKey = `${token.identifierOrCriteria},${token.contractAddress},${token.network}`;
      this.incomingOffers = this.incomingOffers.filter(f => {
          const offersKey = `${f.identifierOrCriteria},${f.contractAddress},${f.network}`
          return offersKey !== tokenKey
        }
      );
      this.store.filterIncomingOffers(token);
      this.CheckForEmptyRequest();
    },
    HandleError(err: any) {
      const { errorType, errorTitle, errorMessage } = ErrorMessageBuilder(err);
      this.errorType = errorType;
      this.errorTitle = errorTitle;
      this.errorMessage = errorMessage;
      this.openErrorDialog = true;
      setTimeout(() => { this.openErrorDialog = false }, 2000);
    },
    async RefetchNFTs() {
      nftStore.ownedNFTs = [] as TokenIdentifier[];
      // TODO: Exception handling
      await nftStore.fetchNFTs(this.userStore.walletAddress);
    },
    HandleMissingBrand() {
      this.incomingBrandFilter = '';
      this.store.resetIncomingOffers();
      this.store.setIncomingBrandFilterStatus(false);
      this.loadingRequest = true;

      this.errorType = 'filter';
      this.errorTitle = 'Unable to fetch your orders';
      this.errorMessage = 'There are no orders under your current filter';
      this.openErrorDialog = true;
      setTimeout(() => { this.openErrorDialog = false }, 2000);
    }
  }
});

</script>

<style scoped>
:deep(.q-btn.btn--no-hover .q-focus-helper) {
	display: none;
}
</style>
