<template>
  <WineMetadata style="margin-bottom: 50px" />
  <NFTHistory />
  <!-- <About />
  <WineMaker /> -->
</template>

<script>
import { defineComponent } from 'vue-demi';
import StatisticsMenu from './components/StatisticsMenu.vue';
import NFTHistory from './components/NFTHistory.vue';
import About from './components/About.vue';
import WineMaker from './components/WineMaker.vue';
import WineMetadata from './components/WineMetadata.vue';
export default defineComponent({
  name: 'MetadataPage',
  components: {
    NFTHistory,
    WineMetadata,
  },
});
</script>

<style></style>
