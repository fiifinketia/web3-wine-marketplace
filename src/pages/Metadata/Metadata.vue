<template>
  <!-- <NFTHistory /> -->
  <!-- <About /> -->
  <WineMaker />
</template>

<script>
import { defineComponent } from 'vue-demi';
import StatisticsMenu from './components/StatisticsMenu.vue';
import NFTHistory from './components/NFTHistory.vue';
import About from './components/About.vue';
import WineMaker from './components/WineMaker.vue';
export default defineComponent({
  name: 'MetadataPage',
  components: {
    // NFTHistory,
    // About,
    WineMaker,
  },
});
</script>

<style></style>
