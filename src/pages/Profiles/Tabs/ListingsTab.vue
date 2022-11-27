<template>
<q-page class="column items-center">
  <div class="row justify-between items-center q-pb-md" style="width: 95%">
    <div class="row q-gutter-x-lg">
      <span class="profile-header-offer q-pr-xs"> Listings </span>
      <span class="profile-nft-number"> {{ listings.length }} </span>
      <q-separator style="background-color: #5e97ec45 !important" vertical inset />
      <q-radio v-model="listingFilter" dense val="newest" label="New First" class="profile-checkbox" :style="IsSelectedFilter('newest') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
      <q-radio v-model="listingFilter" dense val="oldest" label="Old First" class="profile-checkbox" :style="IsSelectedFilter('oldest') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
      <q-radio v-model="listingFilter" dense val="expire" label="Expiring First" class="profile-checkbox" :style="IsSelectedFilter('expire') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
    </div>
    <div class="row items-center q-gutter-x-sm" style="flex-wrap: nowrap;">
      <img src="../../../assets/sell.svg" style="cursor: pointer;" @click="test()"/>
      <q-input 
        v-model="text"
        color="grey"
        outlined 
        dense
        label="Search"
        class="profile-searchbox"
      >
        <template #prepend>
          <q-icon name="search" color="grey"></q-icon>
        </template>
      </q-input>
      <q-btn
        flat
        unelevated
        dense
        class="profile-primary-btn"
      >
        GO
      </q-btn>
    </div>
  </div>
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
      <span class="listings-column-price">
        Price
      </span>
      <span 
        v-if="$q.screen.width > 1020"
        class="listings-column-highestOffer"
      >
        Highest Offer
      </span>
      <span class="listings-column-expire">
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
        <img :src="listing.image" class="profile-nft-image q-mr-md"/>
        <span class="profile-nft-brand"> {{ listing.brand }}</span>
      </div>
      <div
        v-if="$q.screen.width > 1265"
        class="row items-center listings-column-threshold"
      >
        <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
        <span class="profile-nft-number"> 0.00 </span>
      </div>
      <div class="row items-center listings-column-price">
        <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
        <span class="profile-nft-number"> {{ listing.listingPrice }} </span>
        <q-tooltip 
          v-if="$q.screen.width <= 1265"
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
      <div class="listings-column-expire">
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
</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'src/css/Profile/shared.css';
import 'src/css/Profile/Component/listings.css';
import { setCssVar } from 'quasar';
import { ordersStore } from 'src/stores/orders-store';

setCssVar('custom', '#5e97ec45');

export default defineComponent({
  data() {
    const store = ordersStore();
    return {
      store,
      listings: store.listings,
      listingFilter: ''
    }
  },

  async mounted() {
    const listingsRequestStatus = this.store.getListingRequestStatus;
    if (listingsRequestStatus == false) {
      const address = '0xA3873a019aC68824907A3aD99D3e3542376573D0';
      await this.store.setListings(address);
      this.listings = this.store.getListings;
    }
  },

  methods: {
    IsSelectedFilter(filter: string) : boolean {
      return !!(this.listingFilter === filter)
    }
  }
});

</script>

<style>

</style>
