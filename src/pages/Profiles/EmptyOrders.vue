<template>
  <div class="column items-center q-gutter-y-xl">
    <img class="profile-empty" src="../../assets/no-orders.svg" />
    <span class="profile-loading-text">
      {{ emptyText }}
    </span>
  </div>  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'src/css/Profile/shared.css';

export default defineComponent({
  props: {
    emptyText: {
      type: String,
      required: true
    }
  }
});
</script>

<style>

</style>