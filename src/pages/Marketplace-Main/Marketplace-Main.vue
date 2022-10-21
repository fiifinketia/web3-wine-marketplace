<template>
  <q-page>
    <NFTSelections/>
  </q-page>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import NFTSelections from './components/NFT-Selections.vue';

export default defineComponent({
  data() {
    return {
      test: 'Hello'
    }
  },

  components: {
    NFTSelections: NFTSelections
  },

  mounted() {
    console.log(this.test)
  }
})
</script>

<style>

</style>