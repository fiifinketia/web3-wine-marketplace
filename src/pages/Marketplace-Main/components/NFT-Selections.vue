<template>
  <q-page-container class="flex justify-around q-pt-none">

    <q-btn
      v-for="token in allNFTs"
      :key="token.tokenID + ',' + token.network + ',' + token.smartContractAddress"
      flat
			dense
      :ripple="false"
      no-caps
    >
      <q-card
        class="q-pa-sm main-marketplace-nft-card"
        flat
      >
        <img :src="token.image"/>
        <q-card-section class="q-px-sm q-pt-xs" style="text-align: left;">
          <span>
            {{token.brand}}
          </span>
        </q-card-section>
        <q-card-section class="column items-start main-marketplace-price-container q-py-sm">
          <span class="main-marketplace-price-header q-pb-xs">
            Starting from
          </span>
          <div v-if="!!token.listingPrice">
            <div class="row items-end q-gutter-x-xs">
              <q-img
                src="../../../assets/icons/currencies/USDC-Icon.svg"
                style="height: 20px; width: 20px"
              />
              <span class="main-marketplace-price-text-b">
                0.00
              </span>
              <span class="main-marketplace-price-text-l">
                /$ 00.00
              </span>
            </div>
          </div>
          <div v-else>
            <span class="main-marketplace-price-text-b">
              Not available
            </span>
          </div>
        </q-card-section>
      </q-card>
    </q-btn>

  </q-page-container>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { ListingWithPricingAndImage } from '../models/Response.models';
import { RetrieveAllNFTs } from '../services/RetrieveTokens';
import '../../../css/Marketplace/NFT-Selections.css';

export default defineComponent({
  data() {
    return {
      allNFTs: new Array<ListingWithPricingAndImage>(),
    }
  },

  async mounted() {
    this.allNFTs = await RetrieveAllNFTs();
    console.log(this.allNFTs)
  }

  // methods: {

  // }
})
</script>

<style>

</style>
