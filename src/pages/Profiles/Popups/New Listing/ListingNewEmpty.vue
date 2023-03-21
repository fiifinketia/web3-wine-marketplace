<template>
  <div
    class="column items-center justify-center q-gutter-y-md full-height"
    style="flex-wrap: nowrap"
  >
    <span class="unavailable-nft-subheader">
      You do not have NFTs to list yet.
    </span>
    <q-img
      class="error-nft-icon q-mt-lg q-mb-md"
      src="../../../../assets/unavailableNFT.svg"
    />
    <span
      class="unavailable-nft-text"
      :style="$q.screen.width <= 600 ? 'width: 90%' : ''"
    >
      Purchase wines on Marketplace and list for sale here.
    </span>
  </div>
</template>

<script lang="ts">
import 'src/css/Metadata/UnavailableNFT.css';
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style></style>
