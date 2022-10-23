<template>
  <WineMetadata />
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import WineMetadata from './components/WineMetadata.vue';
export default defineComponent({
  name: 'MetadataPage',
  components: { WineMetadata },
});
</script>

<style></style>
