<template>
  <q-dialog seamless transition-show="slide-up" transition-hide="slide-down">
    <q-card class="q-pa-xs favorites-remove-container column">
      <div class="full-width row justify-end items-center">
        <q-btn
          v-close-popup
          flat
          dense
          unelevated
          class="exit-btn btn--no-hover"
        >
          <img src="../../assets/exit-light.svg" />
        </q-btn>
      </div>
      <q-card-section class="column justify-center items-center q-gutter-y-md">
        <q-img
          src="../../../public/images/RemoveNFT.svg"
          class="favorites-remove-icon"
        />
        <span class="favorites-remove-text">
          NFT has been removed from the list
        </span>
        <q-btn
          v-close-popup
          flat
          dense
          unelevated
          no-caps
          class="favorites-remove-btn"
        >
          <span class="favorites-remove-gr-text"> Cancel </span>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style scoped>
:deep(.exit-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
