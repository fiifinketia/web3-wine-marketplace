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
        :selectedIncomingFilter="incomingFilter"
        @incomingFilterSelected="(val) => incomingFilter = val"
      />
      <IncomingHeaderSm
        v-else
        :incomingAmount="incomingOffers.length"
        :selectedIncomingFilter="incomingFilter"
        @incomingFilterSelected="(val) => incomingFilter = val"
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
          <div class="row items-center incoming-column-nft">
            <img v-if="$q.screen.width > 1265" :src="offer.image" class="profile-nft-image q-mr-md"/>
            <span class="profile-nft-brand"> {{ offer.brand }}</span>
          </div>
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
              @click="AcceptOffer(offer.orderHash)"
            >
              Accept
            </q-btn>
            <q-btn
              v-else
              flat
              unelevated
              dense
              no-caps
              @click="AcceptOffer(offer.orderHash)"
            >
              <img src="../../../assets/accept.svg"/>
            </q-btn>
          </div>
        </div>
        </div>
      </div>
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

const nftStore = useNFTStore();

export default defineComponent({
  components: {
    IncomingHeaderLg: IncomingHeaderLg,
    IncomingHeaderSm: IncomingHeaderSm,
    LoadingView: OrderLoading,
    EmptyView: Empty
  },

  data() {
    const store = ordersStore();
    const nftStore = useNFTStore();
    return {
      store,
      nftStore,
      incomingOffers: store.incomingOffers,
      incomingFilter: '',
      loadingRequest: false,
      emptyRequest: false
    }
  },

  async mounted() {
    const incomingOffersRequestStatus = this.store.getIncomingOffersRequestStatus;
    if (incomingOffersRequestStatus == false) {
      await this.FetchIncomingOffers('');
    }
    this.loadingRequest = true;
  },

  watch: {
    incomingFilter: {
      handler: async function (filter) {
        await this.FetchIncomingOffers(filter);
        this.loadingRequest = true
      }
    }
  },

  methods: {
    IsSelectedFilter(filter: string) : boolean {
      return !!(this.incomingFilter === filter)
    },
    ReduceAddress(walletAddress: string) {
      return `${walletAddress.slice(0, 11)}...`
    },
    AcceptOffer(orderHash: string) {
      console.log(orderHash)
    },
    async FetchIncomingOffers(filter: string) {
      this.loadingRequest = false;
      await this.store.setIncomingOffers(nftStore.ownedNFTs, filter);
      this.incomingOffers = this.store.getIncomingOffers;
      if (this.incomingOffers.length == 0) {
        this.emptyRequest = true 
      }
    }
  }
});

</script>

<style>

</style>
