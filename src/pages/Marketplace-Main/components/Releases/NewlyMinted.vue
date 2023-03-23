<template>
  <NFTSelections
    :nft-selections="newNFTs"
    :is-loading="isLoading"
  />
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios';
import { defineComponent } from 'vue';
import { ListingWithPricingAndImage } from '../../models/Response.models';
import '../../../../css/Releases/Releases-Selections.css';
import { useUserStore } from 'src/stores/user-store';
import NFTSelectionsVue from './NFT-Selections.vue';

export default defineComponent({
  components: {
    NFTSelections: NFTSelectionsVue
  },
  data() {
    const userStore = useUserStore();
    return {
      userStore,
      newNFTs: new Array<ListingWithPricingAndImage>(),
      isLoading: true
    };
  },
  async mounted() {
    await this.GetNewlyMinted();
  },

  methods: {
    async GetNewlyMinted() {
      const url = <string>process.env.RETRIEVE_NEWLY_MINTED_NFTS_URL;
      try {
        await axios
          .get(`${url}?walletAddress=${this.userStore.walletAddress}`)
          .then(
            (res: AxiosResponse<ListingWithPricingAndImage[]>) =>
              (this.newNFTs = res.data)
          );
        this.isLoading = false;
      } catch {
        return;
      }
    }
  },
});
</script>

<style></style>
