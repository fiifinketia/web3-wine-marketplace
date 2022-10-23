<template>
  <q-page>
    <ExclusiveOffers />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExclusiveOffers from './components/ExclusiveOffers.vue';
export default defineComponent({
  data() {
    return {
      test: 'Hello',
    };
  },

  components: {
    ExclusiveOffers,
  },

  mounted() {
    console.log(this.test);
  },
});
</script>

<style></style>
