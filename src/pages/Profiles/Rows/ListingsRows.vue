<template>
  <div class="profile-nft-container">
    <div 
      v-for="listing in listings"
      :key="listing.orderHash"
      class="q-py-md row items-center"
      :class="$q.screen.width > 600 ? 'q-pa-lg' : 'q-px-md'"
    >
      <q-btn 
        flat
        unelevated
        dense
        no-caps
        align="left"
        padding="0px"
        class="listings-column-nft btn--no-hover"
        @click="$q.screen.width > 600 ? ClickBrandAction(listing, 'new tab') : ClickBrandAction(listing, 'nft dialog')"
      >
        <img v-if="$q.screen.width > 1265" :src="listing.image" class="profile-nft-image q-mr-md"/>
        <span class="profile-nft-brand"> {{ listing.brand }}</span>
      </q-btn>
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
          :offset="[70, 30]"
        >
          <div class="column">
            <div 
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
          </div>
        </q-tooltip>
      </div>
      <div 
        v-if="$q.screen.width > 1265"
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
          @click="OpenDeleteDialog(listing)"
        >
          <img src="../../../assets/trash.svg" />
        </q-btn>
        <q-btn
          flat
          unelevated
          dense
          @click="OpenEditDialog(listing)"
        >
          <img src="../../../assets/edit.svg" />
        </q-btn>
      </div>
    </div>
    <NFTDialog 
      v-model="showNFTPopup"
      :brand="brand"
      :image="image"
      :highestOffer="highestOffer"
      :tab="tab"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import 'src/css/Profile/shared.css';
import 'src/css/Profile/Component/listings.css';
import { ListingsResponse } from '../models/response.models';
import { ordersStore } from 'src/stores/orders-store';
import NFTDetails from '../Popups/NFTDetails.vue';

export default defineComponent({
  components: {
    NFTDialog: NFTDetails
  },
  data() {
    const store = ordersStore();
    return {
      store,
      listings: store.listings,

      showNFTPopup: false,
      image: '',
      brand: '',
      highestOffer: '',
      tab: 'listings'
    }
  },
  methods: {
    OpenDeleteDialog(listing: ListingsResponse) {
      this.$emit('delete-listing', listing);
    },
    OpenEditDialog(listing: ListingsResponse) {
      this.$emit('edit-listing', listing);
    },
    OpenNFTDialog(listing: ListingsResponse) {
      this.image = listing.image;
      this.brand = listing.brand;
      this.highestOffer = !!listing.highestOffer ? listing.highestOffer : '0.00';
      this.showNFTPopup = true;
    },
    OpenMetadataPage(listing: ListingsResponse) {
      const routeData = this.$router.resolve({
        path: '/nft',
        query: {
          id: listing.identifierOrCriteria,
          network: listing.network,
          contractAddress: listing.contractAddress,
        },
      });
      window.open(routeData.href, '_blank');
    },
    ClickBrandAction(listing: ListingsResponse, action: string) {
      if (action == 'new tab') {
        this.OpenMetadataPage(listing);
      } else {
        this.OpenNFTDialog(listing);
      }
    }
  }
})
</script>

<style>

</style>