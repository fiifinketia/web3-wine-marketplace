<template>
  <q-dialog>
    <div id="veriff-root" />
  </q-dialog>
</template>

<script lang="ts">
import { veriff } from 'src/shared/veriff-service';
import { defineComponent } from 'vue';
export default defineComponent({
  async mounted() {
    await this.$nextTick()
    veriff.mount();
  }
})
</script>

<style>

</style>