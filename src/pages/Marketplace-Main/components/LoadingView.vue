<template>
  <div class="column items-center q-gutter-y-xl">
    <img class="profile-loading-gif" src="../../../assets/gifs/loadingWine.gif" />
    <span class="profile-loading-text">
      {{ loadingText || 'Loading...' }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'src/css/Profile/shared.css';

export default defineComponent({
  props: {
    loadingText: {
      type: String,
      required: false,
			default: 'Loading...'
    },
  },
});
</script>

<style></style>
