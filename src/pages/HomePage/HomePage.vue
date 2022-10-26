<template>
  <q-page>
    <PartnershipWines />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PartnershipWines from './components/PartnershipWines.vue';
export default defineComponent({
  data() {
    return {
      test: 'Hello',
    };
  },

  components: { PartnershipWines },

  mounted() {
    console.log(this.test);
  },
});
</script>

<style></style>
