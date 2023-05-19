<template>
  <q-dialog
    persistent
    seamless
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="q-pa-xs favorites-remove-container column">
      <div class="full-width row justify-end items-center">
        <q-btn
          flat
          dense
          unelevated
          class="exit-btn btn--no-hover"
          @click="EmitUnfavorite(false)"
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
          flat
          dense
          unelevated
          no-caps
          class="favorites-remove-btn"
          @click="EmitUnfavorite(true)"
        >
          <span class="favorites-remove-gr-text"> Cancel </span>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    smartContractAddress: {
      type: String,
      required: true
    },
    network: {
      type: String,
      required: true
    },
    tokenId: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  emits: ['unfavorite'],
  methods: {
    EmitUnfavorite(cancel: boolean) {
      this.$emit('unfavorite', {
        index: this.index,
        token: {
          cAddress: this.smartContractAddress,
          network: this.network,
          tokenID: this.tokenId
        },
        cancel
      })
    }
  }
});
</script>

<style scoped>
:deep(.exit-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
