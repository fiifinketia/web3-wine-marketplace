<template>
  <div class="fit column items-center">
    <!-- Newly Listed Section -->
    <div class="releases-tab-container column justify-center">
      <div class="row items-center justify-center q-gutter-x-lg">
        <q-img
          src="../../../assets/small-bag.svg"
          class="releases-tab-icons"
        />
        <span> SALE </span>
        <q-img
          src="../../../assets/small-box.svg"
          class="releases-tab-icons"
        />
      </div>
    </div>
    <NewlyListedSection class="q-pa-md"/>
    <!-- Newly Minted Section -->
    <div class="releases-tab-container column justify-center">
      <div class="row items-center justify-center q-gutter-x-lg">
        <q-img
          src="../../../assets/small-wine.svg"
          class="releases-tab-icons"
        />
        <span> NEW RELEASES </span>
        <q-img
          src="../../../assets/small-bottle.svg"
          class="releases-tab-icons"
        />
      </div>
    </div>
    <NewlyMintedSection class="q-pa-md"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewlyMinted from './Releases/NewlyMinted.vue';
import NewlyListed from './Releases/NewlyListed.vue';
import 'src/css/Releases/Releases-page.css';

export default defineComponent({
  components: {
    NewlyMintedSection: NewlyMinted,
    NewlyListedSection: NewlyListed
  },
  emits: ['totalTokens'],
});
</script>

<style></style>
