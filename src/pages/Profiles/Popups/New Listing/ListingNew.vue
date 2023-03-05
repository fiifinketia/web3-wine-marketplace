<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="new-list-container column items-center q-px-md q-pt-md">
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
      <NewListingHeader />
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'src/css/Profile/Component/newListing.css';
import ListingNewHeader from './ListingNewHeader.vue';

export default defineComponent({
  components: {
    NewListingHeader: ListingNewHeader
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