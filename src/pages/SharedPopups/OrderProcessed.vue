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
        <span v-if="orderType == 'listing'" class="order-completed-blue-text">
          Your listing is successfully submitted.
        </span>
        <span v-else class="order-completed-blue-text">
          Your offer is successfully submitted.
        </span>
        <span v-if="orderType == 'listing'" class="order-completed-black-text">
          You will receive notifications on purchases and offers.
        </span>
        <span v-else class="order-completed-black-text">
          We will notify you in case someone outbids you.
          <br>
          You can update your bid or withdraw it from the Outgoing Page.
        </span>
      </q-card-section>
    </div>
  </q-dialog>
</template>

<script>
import 'src/css/Metadata/Dialog.css';
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    orderType: {
      type: String,
      required: true
    }
  }
})
</script>

<style>

</style>