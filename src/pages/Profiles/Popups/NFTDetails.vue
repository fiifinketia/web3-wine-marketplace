<template>
  <q-dialog transition-show="scale" transition-hide="scale">
    <q-card
      class="full-width no-shadow"
      style="border-radius: 8px; max-width: 390px"
    >
      <img :src="image" />
      <span class="nft-dialog-brand nft-dialog-custom-padding">
        {{ brand }}</span
      >

      <div
        v-if="tab == 'listings'"
        class="column nft-dialog-custom-padding q-py-sm"
      >
        <div class="row items-center justify-between">
          <span class="nft-dialog-label"> Highest Offer </span>
          <div class="row items-center q-gutter-x-xs">
            <img
              class="nft-dialog-currency"
              src="../../../assets/icons/currencies/USDC-logo.svg"
            />
            <span class="nft-dialog-text-highlight"> {{ highestOffer }} </span>
          </div>
        </div>
      </div>

      <div
        v-else-if="tab == 'incoming'"
        class="column nft-dialog-custom-padding q-py-sm q-gutter-y-sm"
      >
        <div class="row items-center justify-between">
          <span class="nft-dialog-label"> Floor Price </span>
          <div class="row items-center q-gutter-x-xs">
            <img
              class="nft-dialog-currency"
              src="../../../assets/icons/currencies/USDC-logo.svg"
            />
            <span class="nft-dialog-text-default"> {{ floorPrice }} </span>
          </div>
        </div>
        <div class="row items-center justify-between">
          <span class="nft-dialog-label"> From </span>
          <div class="row items-center q-gutter-x-xs">
            <span class="nft-dialog-text-default"> {{ from }} </span>
          </div>
        </div>
      </div>

      <div
        v-else-if="tab == 'outgoing'"
        class="column nft-dialog-custom-padding q-py-sm q-gutter-y-sm"
      >
        <div class="row items-center justify-between">
          <span class="nft-dialog-label"> Expiration On </span>
          <div class="row items-center q-gutter-x-xs">
            <span class="nft-dialog-text-highlight"> {{ offerEndTime }} </span>
          </div>
        </div>
        <div class="row items-center justify-between">
          <span class="nft-dialog-label"> Highest Offer </span>
          <div class="row items-center q-gutter-x-xs">
            <img
              class="nft-dialog-currency"
              src="../../../assets/icons/currencies/USDC-logo.svg"
            />
            <span class="nft-dialog-text-default"> {{ highestOffer }} </span>
          </div>
        </div>
      </div>

      <div
        v-else-if="tab == 'transactions'"
        class="column nft-dialog-custom-padding q-py-sm q-gutter-y-sm"
      >
        <div class="row items-center justify-between">
          <span class="nft-dialog-label"> Date </span>
          <div class="column items-end">
            <span class="nft-dialog-date"> {{ date }} </span>
            <span class="nft-dialog-time"> {{ time }} </span>
          </div>
        </div>
        <div class="row items-center justify-between">
          <span class="nft-dialog-label"> Transaction ID </span>
          <div class="row items-center q-gutter-x-xs">
            <span class="nft-dialog-hash">
              {{ txnHash.slice(0, 11) + '...' }}
            </span>
          </div>
        </div>
        <div class="row justify-between items-center">
          <span class="nft-dialog-info"> Full transaction info </span>
          <q-btn
            unelevated
            flat
            dense
            class="open-link btn--no-hover"
            :href="txnLinkPrepend + txnHash"
            target="_blank"
          >
            <img src="../../../assets/button-right.svg" />
          </q-btn>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'src/css/Profile/Component/nftDialog.css';
export default defineComponent({
  props: {
    tab: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    highestOffer: { type: String, default: '' },
    floorPrice: { type: String, default: '' },
    from: { type: String, default: '' },
    offerEndTime: { type: String, default: '' },
    txnHash: { type: String, default: '' },
    date: { type: String, default: '' },
    time: { type: String, default: '' },
    txnLinkPrepend: { type: String, default: '' },
  },
});
</script>

<style scoped>
:deep(.open-link.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
