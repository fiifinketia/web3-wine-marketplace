<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="full-width no-shadow" style="border-radius: 8px;">
      <img :src="image"/>
      <span class="nft-dialog-brand nft-dialog-custom-padding"> {{ brand }}</span>

      <div v-if="tab == 'listings'" class="column nft-dialog-custom-padding q-py-sm">
        <div class="row items-center justify-between">
          <span class="nft-dialog-label">
            Highest Offer
          </span>
          <div class="row items-center q-gutter-x-xs q-pb-xs">
            <img class="nft-dialog-currency" src="../../../assets/icons/currencies/USDC-Icon.svg" />
            <span class="nft-dialog-text-highlight"> {{ highestOffer }} </span>
          </div>
        </div>
      </div>

      <div v-else-if="tab == 'incoming'" class="column nft-dialog-custom-padding q-py-sm q-gutter-y-xs">
        <div class="row items-center justify-between">
          <span class="nft-dialog-label">
            Floor Price
          </span>
          <div class="row items-center q-gutter-x-xs q-pb-xs">
            <img class="nft-dialog-currency" src="../../../assets/icons/currencies/USDC-Icon.svg" />
            <span class="nft-dialog-text-default"> {{ floorPrice }} </span>
          </div>
        </div>
        <div class="row items-center justify-between">
          <span class="nft-dialog-label">
            From
          </span>
          <div class="row items-center q-gutter-x-xs q-pb-xs">
            <span class="nft-dialog-text-default"> {{ from }} </span>
          </div>
        </div>
      </div>

      <div v-else-if="tab == 'outgoing'" class="column nft-dialog-custom-padding q-py-sm q-gutter-y-xs">
        <div class="row items-center justify-between">
          <span class="nft-dialog-label">
            Expiration On
          </span>
          <div class="row items-center q-gutter-x-xs q-pb-xs">
            <span class="nft-dialog-text-highlight"> {{ offerEndTime }} </span>
          </div>
        </div>
        <div class="row items-center justify-between">
          <span class="nft-dialog-label">
            Highest Offer
          </span>
          <div class="row items-center q-gutter-x-xs q-pb-xs">
            <img class="nft-dialog-currency" src="../../../assets/icons/currencies/USDC-Icon.svg" />
            <span class="nft-dialog-text-default"> {{ highestOffer }} </span>
          </div>
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
    offerEndTime: { type: String, default: '' }
  }
})
</script>

<style>

</style>