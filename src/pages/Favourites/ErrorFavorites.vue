<template>
  <div 
    class="column items-center q-gutter-y-md" 
    :class="$q.screen.width > 600 ? '' : 'error-favorites-container'"
  >
    <span class="unavailable-nft-header"> Ooops </span>
    <span class="unavailable-nft-subheader"> NFTs failed to load :( </span>
    <q-img class="error-favorites-icon q-mt-lg q-mb-md" src="../../assets/errorFavorites.svg" />
    <span class="unavailable-nft-subheader"> Let's try to load again </span>
    <q-btn
      dense
      flat
      unelevated
      :ripple="false"
      no-caps
      class="error-try-favorites-btn"
      @click="this.TryAgain()"
    >
      Try Again
    </q-btn>
  </div>
</template>

<script lang="ts">
import 'src/css/Metadata/UnavailableNFT.css';
import 'src/css/Favorites/FAVsError.css';
import { defineComponent } from 'vue';
export default defineComponent({
  methods: {
    TryAgain() {
      this.$emit('reset-search')
    }
  }
})
</script>

<style>

</style>