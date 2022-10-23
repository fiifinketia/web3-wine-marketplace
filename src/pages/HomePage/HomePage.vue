<template>
  <q-page>
    <!-- <ExclusiveOffers /> -->
    <LandingPageFooter />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExclusiveOffers from './components/ExclusiveOffers.vue';
import LandingPageFooter from './components/Footer.vue';
export default defineComponent({
  data() {
    return {
      test: 'Hello',
    };
  },

  components: {
    // ExclusiveOffers,
    LandingPageFooter,
  },

  mounted() {
    console.log(this.test);
  },
});
</script>

<style></style>
