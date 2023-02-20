<template>
  <div class="row justify-between items-center q-pt-sm q-pb-md q-pa-md" style="width: 100%">
    <div class="row items-center">
      <span class="favorites-nfts-title">NFTs</span>
      <span class="favorites-nfts-count q-pl-sm">
        {{ nftsLength > 0 ? nftsLength : 0 }}
      </span>
    </div>
    <div class="row">
      <q-input
        v-model="searchText"
        dense
        outlined
        color="blue-6"
        placeholder="Search"
        class="favorites-search-bar"
      >
        <template #prepend>
          <q-icon name="app:search" />
        </template>
      </q-input>
      <q-btn flat class="favorites-search-btn q-ml-sm">GO</q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    nftsLength: { type: Number, required: true }
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {

  }
})
</script>

<style>

</style>