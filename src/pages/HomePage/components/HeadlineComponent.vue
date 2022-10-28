<template>
  <div class="headline-container full-width column justify-center items-center">
    <q-img class="grape-img-left" src="../../../assets/images/Grape-left.png" />
    <q-img
      class="grape-img-right"
      src="../../../assets/images/Grape-right.png"
    />
    <h1 class="headline-title">WiV Marketplace</h1>
    <p class="headline-paragraph">We offer the best fine wine NFT in web3</p>
    <div class="headline-buttons-container row">
      <button class="headline-buttons left-btn">Start collection</button>
      <button class="headline-buttons right-btn">Learn about WiV</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import '../../../css/Homepage/HeadlineComponent.css';

export default defineComponent({
  name: 'HeadlineComponent',
  data() {
    return {};
  },
});
</script>

<style></style>
