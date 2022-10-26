<template>
  <q-page-container class="q-pt-none">
		Main
  </q-page-container>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { ListingWithPricingAndImage } from '../models/Response.models';
import { RetrieveAllNFTs } from '../services/RetrieveTokens';

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
