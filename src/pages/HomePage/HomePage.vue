<template>
  <q-page>
    <!-- <ExclusiveOffers /> -->
    <TrendingWines />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExclusiveOffers from './components/ExclusiveOffers.vue';
import TrendingWines from './components/TrendingWines.vue';
export default defineComponent({
  data() {
    return {
      test: 'Hello',
    };
  },

  components: {
    // ExclusiveOffers,
    TrendingWines,
  },

  mounted() {
    console.log(this.test);
  },
});
</script>

<style></style>
