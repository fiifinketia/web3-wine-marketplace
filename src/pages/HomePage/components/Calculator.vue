<template>
  <div class="row justify-center items-center wine-calculator-container q-my-lg">
    <div class="wine-calculator-image-wrapper">
      <q-img
        src="../../../assets/wineCalculator.svg"
        class="wine-calculator-image"
      />
    </div>
    <div
      class="flex column justify-start wine-calculator-description-container"
    >
      <div class="boost-worth-text">
        . . . or boost the worth with a customised portfolio.
      </div>
      <div class="we-offer-text">
        We offer only specially selected partnership wines, considering your
        investment style.
      </div>
      <div class="justify-center items-center">
        <q-btn
          class="calculate-worth-button calculate-worth-text"
          unelevated
          no-caps
          @click="$router.push('/calculator')"
        >
          Calculate The Worth
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '../../../css/Homepage/Calcualtor.css';
export default defineComponent({
  name: 'WineCalculator',
});
</script>

<style></style>
