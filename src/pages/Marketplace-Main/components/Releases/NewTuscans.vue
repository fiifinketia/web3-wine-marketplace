<template>
  <NFTSelections
    :nft-selections="newNFTs"
    :is-loading="isLoading"
    :errored-out="erroredOut"
    :section-error="erroredText"
    @refetch-release="GetSuperTuscans()"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GetNFTsFromRegion } from '../../services/RetrieveReleased';
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
      erroredText: 'Super Tuscan wines'
    };
  },
  async mounted() {
    await this.GetSuperTuscans();
  },

  methods: {
    async GetSuperTuscans() {
      try {
        this.isLoading = true;
        this.newNFTs = await GetNFTsFromRegion(this.userStore.walletAddress, 'Tuscany');
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
