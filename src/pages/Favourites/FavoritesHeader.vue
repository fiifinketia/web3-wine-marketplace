<template>
  <div
    class="q-pb-md"
    :class="$q.screen.width > 600 ? 'q-pt-lg' : 'column items-center q-pt-none'"
    style="width: 100%"
  >
    <div
      v-if="$q.screen.width <= 600"
      class="bg-gradient_blue-green q-mb-md q-px-md q-py-sm"
      style="width: 100%"
    >
      <div class="row items-center" style="height: 46.28px">
        <div v-if="!usingFilter">
          <span class="favorites-nfts-title">NFTs</span>
          <span class="favorites-nfts-count q-pl-xs">
            {{ nftsLength > 0 ? nftsLength : 0 }}
          </span>
        </div>
        <div v-else>
          <q-btn
            dense
            unelevated
            flat
            no-caps
            class="favorites-back btn--no-hover"
            @click="resetSearch()"
          >
            <img
              src="../../assets/back-left-white.svg"
              style="height: 20px; width: 11.5px"
            />
            <span class="favorites-back-text q-pl-md" style="color: white">
              All Fav...s
            </span>
          </q-btn>
        </div>
      </div>
    </div>
    <div
      class="row items-center favorites-search-container"
      :class="
        $q.screen.width > 600 ? 'justify-between q-px-md' : 'justify-center'
      "
    >
      <div v-if="$q.screen.width > 600" class="row items-center">
        <div v-if="!usingFilter">
          <span class="favorites-nfts-title">NFTs</span>
          <span class="favorites-nfts-count q-pl-sm">
            {{ nftsLength > 0 ? nftsLength : 0 }}
          </span>
        </div>
        <div v-else>
          <q-btn
            dense
            unelevated
            flat
            no-caps
            class="favorites-back btn--no-hover"
            @click="resetSearch()"
          >
            <img
              src="../../assets/back-left.svg"
              style="height: 20px; width: 11.5px"
            />
            <span
              v-if="$q.screen.width > 1200"
              class="favorites-back-text q-pl-md"
            >
              All Favorites
            </span>
            <span v-else class="favorites-back-text q-pl-md">
              All Fav...s
            </span>
          </q-btn>
        </div>
      </div>
      <div
        class="row justify-center q-gutter-x-sm"
        :style="$q.screen.width > 600 ? '' : 'width:100%; flex-wrap: nowrap'"
      >
        <q-input
          v-model="searchText"
          input-class="favorites-search-input"
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
          id="favorites-search-button"
          unelevated
          dense
          :disable="!searchText"
          flat
          class="favorites-search-btn"
          @click="submitBrand()"
        >
          GO
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    nftsLength: { type: Number, required: true },
  },
  emits: ['brand-search', 'reset-search'],
  data() {
    return {
      searchText: '',
      usingFilter: false,
    };
  },
  methods: {
    submitBrand() {
      this.$emit('brand-search', this.searchText);
      this.usingFilter = true;
    },
    resetSearch() {
      this.$emit('reset-search');
      this.searchText = '';
      this.usingFilter = false;
    },
  },
});
</script>

<style scoped>
:deep(.favorites-back.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
