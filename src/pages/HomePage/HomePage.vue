<template>
  <q-page>
     <ExclusiveOffers /> 

    <TrendingWines />


    <LandingPageFooter />

    <FAQ />

  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExclusiveOffers from './components/ExclusiveOffers.vue';
import TrendingWines from './components/TrendingWines.vue';


import LandingPageFooter from './components/Footer.vue';

import FAQ from './components/FAQ.vue';

export default defineComponent({
  data() {
    return {
      test: 'Hello',
    };
  },

  components: {
     ExclusiveOffers,
    TrendingWines,
     ExclusiveOffers,
    LandingPageFooter,

    FAQ,

  },

  mounted() {
    console.log(this.test);
  },
});
</script>

<style></style>
