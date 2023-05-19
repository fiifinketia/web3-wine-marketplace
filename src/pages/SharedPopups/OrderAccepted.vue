<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="q-pa-md column items-center dialog-confirm-box">
      <img
        src="../../assets/light_bulb.svg"
        class="light-bulb-icon q-py-lg"
      />
      <q-card-section class="column q-gutter-y-md">
        <span v-if="orderAccepted == 'listing'" class="order-completed-blue-text">
          NFT will be in your cellar shortly!
        </span>
        <span v-else class="order-completed-blue-text">
          Buyer will receive the NFT and funds will be in your wallet shortly!
        </span>
        <span v-if="orderAccepted == 'listing'" class="order-completed-black-text">
          You can monitor its growth in your <a> Digital Wine Cellar </a>
        </span>
        <span v-else class="order-completed-black-text">
          You can check the transaction status in your Metamask wallet.
        </span>
      </q-card-section>
    </div>
  </q-dialog>
</template>

<script>
import 'src/css/Metadata/Dialog.css';
import 'src/css/Profile/Component/dialog.css';
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    orderAccepted: {
      type: String,
      required: true
    }
  }
})
</script>

<style>

</style>