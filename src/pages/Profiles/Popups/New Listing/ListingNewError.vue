<template>
  <div
    class="column items-center justify-center q-gutter-y-md full-height"
    style="flex-wrap: nowrap"
  >
    <span class="profile-error-header"> Ooops </span>
    <span class="profile-error-subheader">
      NFT loading failed :(
    </span>
    <q-img
      class="q-my-lg"
      style="max-width: 350px"
      src="../../../../assets/fallen-box.svg"
    />
    <span class="profile-error-subheader"> Let's try to load again. </span>
    <q-btn
      dense
      flat
      unelevated
      :ripple="false"
      no-caps
      class="profile-error-btn"
      @click="TryAgain()"
    >
      Try Again
    </q-btn>
  </div>
</template>

<script lang="ts">
import 'src/css/Profile/shared.css';
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['refetch-nfts'],
  methods: {
    TryAgain() {
      this.$emit('refetch-nfts')
    }
  }
});
</script>

<style></style>
