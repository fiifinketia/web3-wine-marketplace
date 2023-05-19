<template>
  <div class="headline-container full-width column justify-center items-center">
    <q-img
      class="grape-img-left"
      src="../../../../public/images/Grape-left.svg"
    />
    <q-img
      class="grape-img-right"
      src="../../../../public/images/Grape-right.svg"
    />
    <q-img
      class="grape-mobile"
      src="../../../../public/images/Grape-mobile.svg"
    />
    <h1 id="welcome-step" class="headline-title q-mb-xs">WiV Marketplace</h1>
    <p class="headline-paragraph q-mb-lg">
      We offer the best fine wine investments
    </p>
    <div class="headline-buttons-container row q-mt-md">
      <q-btn
        class="app-btn-text-lg app-primary-btn-bg"
        style="width: 254px;"
        unelevated
        no-caps
        @click="$router.push('/marketplace?tab=nfts')"
      >
        Start collection
      </q-btn>
      <q-btn
        class="app-btn-text-lg app-secondary-btn-bg"
        unelevated
        outline
        no-caps
        disable
        style="width: 254px;"
      >
        <span class="app-secondary-btn-text">
          Learn about WiV
        </span>
      </q-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import '../../../css/Homepage/HeadlineComponent.css';

export default defineComponent({
  name: 'HeadlineComponent',
});
</script>

<style></style>
