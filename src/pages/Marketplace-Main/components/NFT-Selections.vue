<template>
  <q-page-container>
    
    <q-btn
      v-for="token in allNFTs"
      :key="token.tokenID + ',' + token.network + ',' + token.smartContract"
      flat
      :ripple="false"
      no-caps
    >
      <q-card class="q-pa-sm main-marketplace-nft-card">
        <img :src="token.image" />
        <q-card-section>
          <div> {{(token.brand).toUpperCase()}} </div>
        </q-card-section>
        <q-card-section>
          <div> {{(token.brand).toUpperCase()}} </div>
        </q-card-section>
      </q-card>
    </q-btn>

  </q-page-container>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { ListingWithPricingAndImage } from '../models/Response.models';
import { RetrieveAllNFTs } from '../services/RetrieveTokens';
import '../../../css/Marketplace/NFT-Selections.css'

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
