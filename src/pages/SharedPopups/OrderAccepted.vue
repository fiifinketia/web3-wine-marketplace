<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="q-pa-md column items-center order-completed-dialog">
      <img
        src="../../assets/light_bulb.svg"
        class="light-bulb-icon q-py-lg"
        width="50%"
      />
      <q-card-section class="column q-gutter-y-md">
        <span class="order-completed-blue-text">
          NFT will be in your cellar shortly!
        </span>
        <span class="order-completed-black-text">
          You can monitor its growth in your. <a> Digital Wine Cellar </a>
        </span>
      </q-card-section>
    </div>
  </q-dialog>
</template>

<script>
import 'src/css/Metadata/Dialog.css';
export default {

}
</script>

<style>

</style>