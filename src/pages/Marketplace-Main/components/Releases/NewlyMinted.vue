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
import 'src/css/Releases/ReleasesSelections.css';
import { useUserStore } from 'src/stores/user-store';
import NFTSelectionsVue from './NFT-Selections.vue';
import { useNFTStore } from 'src/stores/nft-store';
import { AssociateOwned } from 'src/shared/association.helper';

export default defineComponent({
  components: {
    NFTSelections: NFTSelectionsVue
  },
  emits: ['empty-section'],
  data() {
    const userStore = useUserStore();
    const nftStore = useNFTStore();
    return {
      userStore,
      nftStore,
      newNFTs: new Array<ListingWithPricingAndImage & { isOwned?: boolean }>(),
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
        const newNFTs = await GetLatestMinted(this.userStore.walletAddress);
        if (newNFTs.length == 0) {
          this.$emit('empty-section');
        }
        this.IncorporateOwnedNFTs(newNFTs);
        this.erroredOut = false;
      } catch {
        this.erroredOut = true;
      } finally {
        this.isLoading = false;
      }
    },
    IncorporateOwnedNFTs(newNFTs: ListingWithPricingAndImage[]) {
      const nftsFetched = this.nftStore.fetchNFTsStatus;
      if (!!nftsFetched) {
        this.newNFTs = AssociateOwned(newNFTs, this.nftStore.ownedNFTs);
      } else {
        this.newNFTs = newNFTs;
      }
    }
  },
});
</script>

<style></style>
