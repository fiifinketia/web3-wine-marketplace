<template>
  <q-page>
    <ExclusiveOffers />
    <TrendingWines />
    <PartnershipWines />
    <FAQ />
    <LandingPageFooter />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PartnershipWines from './components/PartnershipWines.vue';

import ExclusiveOffers from './components/ExclusiveOffers.vue';
import TrendingWines from './components/TrendingWines.vue';

import LandingPageFooter from './components/Footer.vue';

import FAQ from './components/FAQ.vue';

export default defineComponent({
  name: 'VueHomepage',
  components: {
    ExclusiveOffers,
    TrendingWines,
    LandingPageFooter,
    PartnershipWines,
    FAQ,
  },
});
</script>

<style></style>
