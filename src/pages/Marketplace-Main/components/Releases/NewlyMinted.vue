<template>
  <NFTSelections
    :nft-selections="newNFTs"
    :is-loading="isLoading"
    :errored-out="erroredOut"
    :section-error="erroredText"
    @refetch-release="GetNewlyMinted()"
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
      isLoading: true,
      erroredOut: false,
      erroredText: 'Newly minted wines'
    };
  },
  async mounted() {
    await this.GetNewlyMinted();
  },

  methods: {
    async GetNewlyMinted() {
      const url = <string>process.env.RETRIEVE_NEWLY_MINTED_NFTS_URL;
      try {
        this.isLoading = true;
        await axios
          .get(`${url}?walletAddress=${this.userStore.walletAddress}`)
          .then(
            (res: AxiosResponse<ListingWithPricingAndImage[]>) =>
              (this.newNFTs = res.data)
          );
        this.erroredOut = false;
      } catch {
        this.erroredOut = true;
      } finally {
        this.isLoading = false;
      }
    }
  },
});
</script>

<style></style>
