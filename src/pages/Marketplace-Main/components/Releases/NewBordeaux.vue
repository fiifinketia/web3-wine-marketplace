<template>
  <NFTSelections
    :nft-selections="newNFTs"
    :is-loading="isLoading"
    :errored-out="erroredOut"
    :section-error="erroredText"
    @refetch-release="GetExceptionalBordeaux()"
  />
</template>

<script lang="ts">
import { GetNFTsFromRegion } from '../../services/RetrieveReleased';
import { defineComponent } from 'vue';
import { ListingWithPricingAndImage } from '../../models/Response.models';
import '../../../../css/Releases/Releases-Selections.css';
import { useUserStore } from 'src/stores/user-store';
import NFTSelectionsVue from './NFT-Selections.vue';

export default defineComponent({
  components: {
    NFTSelections: NFTSelectionsVue
  },
  emits: ['empty-section'],
  data() {
    const userStore = useUserStore();
    return {
      userStore,
      newNFTs: new Array<ListingWithPricingAndImage>(),
      isLoading: true,
      erroredOut: false,
      erroredText: 'Exceptional Bordeaux wines'
    };
  },
  async mounted() {
    await this.GetExceptionalBordeaux();
  },

  methods: {
    async GetExceptionalBordeaux() {
      try {
        this.isLoading = true;
        this.newNFTs = await GetNFTsFromRegion(this.userStore.walletAddress, 'Bordeaux');
        if (this.newNFTs.length == 0) {
          this.$emit('empty-section');
        }
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
