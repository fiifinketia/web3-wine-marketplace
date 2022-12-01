<template>
<q-page class="column items-center" :class="!loadingRequest || emptyRequest ? 'justify-center' : ''">
  <div v-if="!loadingRequest" class="column items-center">
    <LoadingView
      :loadingText="'Loading your listings'"
    />
  </div>
  <div v-else class="column items-center">
    <div v-if="!emptyRequest" class="column items-center">
      <ListingHeaderLg
        v-if="$q.screen.width > 1020"
        :listingsAmount="listings.length"
        :selectedListingSortKey="listingSortKey"
        :updatedListingBrandFilter="listingBrandFilter"
        @listingBrandFilterUpdated="(val) => listingBrandFilter = val"
        @listingSortKeySelected="(val) => listingSortKey = val"
        @fetchListingsWithBrandFilter="(val) => FetchListings(val.sortKey, val.brandFilter)"
      />
      <ListingHeaderSm
        v-else
        :listingsAmount="listings.length"
        :selectedListingSortKey="listingSortKey"
        :updatedListingBrandFilter="listingBrandFilter"
        @listingBrandFilterUpdated="(val) => listingBrandFilter = val"
        @listingSortKeySelected="(val) => listingSortKey = val"
        @fetchListingsWithBrandFilter="(val) => FetchListings(val.sortKey, val.brandFilter)"
      />
      <div class="profile-main-container column">
        <div class="row q-pa-lg profile-column-name">
          <span class="listings-column-nft">
            NFT
          </span>
          <span 
            v-if="$q.screen.width > 1265"
            class="listings-column-threshold"
          >
            Threshold
          </span>
          <span 
            v-if="$q.screen.width > 600"
            class="listings-column-price"
          >
            Price
          </span>
          <span 
            v-if="$q.screen.width <= 600"
            class="listings-column-yours"
          >
            Yours
          </span>
          <span 
            v-if="$q.screen.width > 1020"
            class="listings-column-highestOffer"
          >
            Highest Offer
          </span>
          <span
            v-if="$q.screen.width > 600"
            class="listings-column-expire"
          >
            Exp On
          </span>
          <span class="listings-column-action">
            Action
          </span>
        </div>
        <q-separator style="background-color: #5e97ec45 !important" inset class="q-mx-xl" />
        <div class="profile-nft-container">
        <div 
          v-for="listing in listings"
          :key="listing.orderHash"
          class="q-px-lg q-py-md row items-center"
        >
          <div class="row items-center listings-column-nft">
            <img v-if="$q.screen.width > 1265" :src="listing.image" class="profile-nft-image q-mr-md"/>
            <span class="profile-nft-brand"> {{ listing.brand }}</span>
          </div>
          <div
            v-if="$q.screen.width > 1265"
            class="row items-center listings-column-threshold"
          >
            <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
            <span class="profile-nft-number"> 0.00 </span>
          </div>
          <div 
            v-if="$q.screen.width > 600"
            class="row items-center listings-column-price"
          >
            <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
            <span class="profile-nft-number"> {{ listing.listingPrice }} </span>
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
                  <span class="listing-tooltip-label">
                    Highest Offer
                  </span>
                  <div class="row items-center">
                    <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
                    <span class="listing-tooltip-price-highest q-pl-xs"> {{ !!listing.highestOffer ? listing.highestOffer : '0.00' }} </span>
                  </div>
                </div>
                <div class="row items-center justify-between">
                  <span class="listing-tooltip-label">
                    Threshold
                  </span>
                  <div class="row items-center">
                    <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
                    <span class="listing-tooltip-price-threshold q-pl-xs"> {{ '0.00' }} </span>
                  </div>
                </div>
              </div>
            </q-tooltip>
          </div>
          <div 
            v-if="$q.screen.width > 1020"
            class="row items-center listings-column-highestOffer"
          >
            <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
            <span class="profile-nft-number-highlight"> {{ !!listing.highestOffer ? listing.highestOffer : '0.00' }} </span>
          </div>
          <div 
            v-if="$q.screen.width > 600"
            class="listings-column-expire"
          >
            <span class="profile-nft-number-highlight"> {{ listing.endTime }} </span>
          </div>
          <div 
            v-if="$q.screen.width <= 600"
            class="listings-column-yours column"
          >
            <div class="row q-pb-xs">
              <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
              <span class="profile-nft-number"> {{ listing.listingPrice }} </span>
            </div>
            <span class="profile-nft-number-highlight"> {{ listing.endTime }} </span>
          </div>
          <div style="margin-left: -5px;" class="row items-center listings-column-action">
            <q-btn
              flat
              unelevated
              dense
            >
              <img src="../../../assets/trash.svg" />
            </q-btn>
            <q-btn
              flat
              unelevated
              dense
            >
              <img src="../../../assets/edit.svg" />
            </q-btn>
          </div>
        </div>
        </div>
      </div>
    </div>
    <div v-else class="column items-center">
      <EmptyView :emptyText="'You have not made any listings yet.'" />
    </div>
  </div>
</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'src/css/Profile/shared.css';
import 'src/css/Profile/Component/listings.css';
import { setCssVar } from 'quasar';
import { ordersStore } from 'src/stores/orders-store';
import ListingHeaderLg from '../Headers/ListingHeaderLg.vue';
import ListingHeaderSm from '../Headers/ListingHeaderSm.vue';
import OrderLoading from '../OrderLoading.vue';
import EmptyOrders from '../EmptyOrders.vue';

setCssVar('custom', '#5e97ec45');

export default defineComponent({
  components: {
    ListingHeaderLg: ListingHeaderLg,
    ListingHeaderSm: ListingHeaderSm,
    LoadingView: OrderLoading,
    EmptyView: EmptyOrders
  },

  data() {
    const store = ordersStore();
    return {
      store,
      listings: store.listings,
      listingSortKey: store.getListingSortKey,

      listingBrandFilter: store.getListingBrandFilter,

      loadingRequest: false,
      emptyRequest: false
    }
  },

  watch: {
    listingSortKey: {
      handler: async function (sortKey) {
        this.store.setListingSortKey(sortKey);
        if (!this.store.listingBrandFilterStatus) {
          await this.FetchListings(sortKey, '');  
        } else {
          await this.FetchListings(sortKey, this.listingBrandFilter);
        }
        this.loadingRequest = true
      }
    },
    listingBrandFilter: {
      handler: async function (brandFilter) {
        this.store.setListingBrandFilter(brandFilter);
        this.store.setListingBrandFilterStatus(false);
      }
    }
  },

  async mounted() {
    const listingsRequestStatus = this.store.getListingRequestStatus;
    if (listingsRequestStatus == false) {
      await this.FetchListings('', '');
    }
    this.loadingRequest = true
  },

  methods: {
    async FetchListings(sortKey: string, brandFilter: string) {
      this.loadingRequest = false;
      // JMG/TODO: Add dynamic address herein
      const address = '0xA3873a019aC68824907A3aD99D3e3542376573D0';
      await this.store.setListings(address, sortKey, brandFilter);
      this.listings = this.store.getListings;
      if (this.listings.length == 0) {
        this.emptyRequest = true 
      }
      this.loadingRequest = true
    }
  }
});

</script>

<style>

</style>
