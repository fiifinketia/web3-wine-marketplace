<template>
  <div class="row">
    <div
      v-for="token in newNFTs"
      :key="
        token.tokenID + ',' + token.network + ',' + token.smartContractAddress
      "
      class="col-xl-3 col-md-3 col-sm-4 col-xs-6 main-marketplace-card-container"
    >
      <q-btn
        flat
        dense
        :ripple="false"
        no-caps
        class="btn--no-hover"
        @click="selectCard(token.tokenID)"
      >
        <q-card class="q-pa-xs main-marketplace-nft-card" flat>
          <img class="main-marketplace-card-image" :src="token.image" />
          <div
            class="q-px-sm q-pb-sm main-marketplace-card-brand column justify-center"
            style="text-align: left"
          >
            <span>
              {{ token.brand }}
            </span>
          </div>
          <q-card-section
            class="column items-start main-marketplace-price-container q-py-sm q-mx-sm"
          >
            <span class="main-marketplace-price-header q-pb-xs">
              Starting from
            </span>
            <div v-if="!!token.listingPrice">
              <div class="row items-end q-gutter-x-xs">
                <q-img
                  src="../../../../assets/icons/currencies/USDC-Icon.svg"
                  style="height: 20px; width: 20px"
                />
                <span class="main-marketplace-price-text-b"> 0.00 </span>
                <span class="main-marketplace-price-text-l"> /$ 00.00 </span>
              </div>
            </div>
            <div v-else>
              <span class="main-marketplace-price-text-b"> Not available </span>
            </div>
          </q-card-section>
        </q-card>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios';
import { defineComponent } from 'vue';
import { ListingWithPricingAndImage } from '../../models/Response.models';
import '../../../../css/Marketplace/NFT-Selections.css';

export default defineComponent({
  data() {
    return {
      newNFTs: new Array<ListingWithPricingAndImage>(),
    };
  },

  mounted() {
    this.GetNewlyMinted();
  },

  methods: {
    async GetNewlyMinted() {
      const url = <string>process.env.RETRIEVE_NEWLY_MINTED_NFTS_URL;
      await axios
        .get(url)
        .then(
          (res: AxiosResponse<ListingWithPricingAndImage[]>) =>
            (this.newNFTs = res.data)
        );
    },
  },
});
</script>

<style></style>
