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
import { GetLatestMinted } from '../../services/RetrieveReleased';
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
      erroredText: 'Newly minted wines'
    };
  },
  async mounted() {
    await this.GetNewlyMinted();
  },

  methods: {
    async GetNewlyMinted() {
      try {
        this.isLoading = true;
        this.newNFTs = await GetLatestMinted(this.userStore.walletAddress);
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
