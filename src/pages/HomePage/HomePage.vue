<template>
  <HeadlineComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '../../css/Homepage/HomePage.css';
import HeadlineComponent from './components/HeadlineComponent.vue';

export default defineComponent({
  data() {
    return {};
  },

  components: { HeadlineComponent },
});
</script>

<style></style>
