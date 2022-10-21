<template>
  <q-page><div>hello</div> </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      test: 'Hello',
    };
  },

  components: {},

  mounted() {
    console.log(this.test);
  },
});
</script>

<style></style>
