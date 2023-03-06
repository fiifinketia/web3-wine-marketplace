<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
    :maximized="$q.screen.width > 600 ? false : true"
  >
    <q-card
      class="new-list-container q-py-md"
      :class="$q.screen.width > 600 ? 'q-px-md' : ''"
    >
      <div class="full-width row items-start justify-center q-pb-sm">
        <div class="column items-center q-gutter-y-sm">
          <span class="new-list-header-text"> Listing NFT </span>
          <span class="new-list-subheader-text"> Click on the NFT you want to sell </span>
        </div>
        <q-btn 
          v-close-popup
          flat
          dense
          unelevated
          class="exit-btn btn--no-hover"
        >
          <img
            src="../../../../assets/exit-light.svg"
          />
        </q-btn>
      </div>
      <NewListingHeader 
        v-if="$q.screen.width > 600"
        :listableNFTsLength="listableNFTs.length"
      />
      <NewListingNFTs 
        class="scroll"
        :listableNFTs="listableNFTs"
      />
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import 'src/css/Profile/Component/newListing.css';
import ListingNewHeader from './ListingNewHeader.vue';
import ListingNewNFTs from './ListingNewNFTs.vue';
import { TokenWithBrandImage } from 'src/shared/models/entities/NFT.model';

export default defineComponent({
  components: {
    NewListingHeader: ListingNewHeader,
    NewListingNFTs: ListingNewNFTs
  },
  props: {
    listableNFTs: { type: [] as PropType<TokenWithBrandImage[]>, default: [] }
  }
})
</script>

<style scoped>
@media screen and (min-width: 600px) {
  .q-dialog__inner--minimized > div {
    max-width: none;
  }
}
:deep(.exit-btn.btn--no-hover .q-focus-helper) {
	display: none;
}
</style>