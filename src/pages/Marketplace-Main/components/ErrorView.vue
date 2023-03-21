<template>
  <div class="column items-center q-gutter-y-md">
    <span class="unavailable-nft-header"> Ooops </span>
    <span class="unavailable-nft-subheader"> NFTs failed to load :( </span>
    <q-img
      class="error-nft-icon q-mt-lg q-mb-md"
      src="../../../assets/unavailableNFT.svg"
    />
    <span class="unavailable-nft-subheader"> Let's try to load again </span>
    <q-btn
      dense
      flat
      unelevated
      :ripple="false"
      no-caps
      class="error-try-btn"
      @click="TryAgain()"
    >
      Try Again
    </q-btn>
  </div>
</template>

<script lang="ts">
import '../../../css/Metadata/UnavailableNFT.css';
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['retrieve-again'],
  methods: {
    TryAgain() {
      this.$emit('retrieve-again');
    },
  },
});
</script>

<style></style>
