<template>
  <div
    class="row items-center favorites-search-container"
    :class="$q.screen.width > 600 ? 'justify-between q-px-md' : 'justify-center'"
  >
    <div class="row items-center" :style="$q.screen.width > 600 ? '' : 'display: none'">
      <span class="favorites-nfts-title">NFTs</span>
      <span class="favorites-nfts-count q-pl-sm">
        {{ nftsLength > 0 ? nftsLength : 0 }}
      </span>
    </div>
    <div
      class="row justify-center q-gutter-x-sm"
      :style="$q.screen.width > 600 ? '' : 'width:100%; flex-wrap: nowrap'"
    >
      <q-input
        v-model="searchText"
        dense
        outlined
        color="blue-6"
        placeholder="Search"
        class="favorites-search-bar"
        :input-style="!!searchText ? 'color: #212131' : ''"
      >
        <template #prepend>
          <q-icon name="app:search" />
        </template>
      </q-input>
      <q-btn
        dense
        flat
        class="favorites-search-btn"
				unelevated
      >
        GO
      </q-btn>
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
