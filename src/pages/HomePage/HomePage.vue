<template>
  <q-page>
    <ExclusiveOffers />
    <FAQ />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExclusiveOffers from './components/ExclusiveOffers.vue';
import FAQ from './components/FAQ.vue';
export default defineComponent({
  data() {
    return {
      test: 'Hello',
    };
  },

  components: {
    ExclusiveOffers,
    FAQ,
  },

  mounted() {
    console.log(this.test);
  },
});
</script>

<style></style>
