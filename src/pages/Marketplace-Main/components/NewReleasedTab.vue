<template>
  <div class="fit column items-center">
    <!-- Newly Listed Section -->
    <div v-if="listedSectionExists" class="releases-tab-container column justify-center">
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
    <NewlyListedSection
      v-if="listedSectionExists"
      class="q-pa-md"
      @empty-section="listedSectionExists = false"
    />

    <!-- Newly Minted Section -->
    <div v-if="mintedSectionExists" class="releases-tab-container column justify-center">
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
    <NewlyMintedSection
      v-if="mintedSectionExists"
      class="q-pa-md"
      @empty-section="mintedSectionExists = false"
    />

    <!-- Super Tuscans Section -->
    <div v-if="tuscansSectionExists" class="releases-tab-container column justify-center">
      <div class="row items-center justify-center q-gutter-x-lg">
        <q-img
          src="../../../assets/small-wine.svg"
          class="releases-tab-icons"
        />
        <span> SUPER TUSCANS </span>
        <q-img
          src="../../../assets/small-bottle.svg"
          class="releases-tab-icons"
        />
      </div>
    </div>
    <SuperTuscans
      v-if="tuscansSectionExists"
      class="q-pa-md"
      @empty-section="tuscansSectionExists = false"
    />

    <!-- Exceptional Bordeaux Section -->
    <div v-if="bordeauxSectionExists" class="releases-tab-container column justify-center">
      <div class="row items-center justify-center q-gutter-x-lg">
        <q-img
          src="../../../assets/small-wine.svg"
          class="releases-tab-icons"
        />
        <span> EXCEPTIONAL BORDEAUX </span>
        <q-img
          src="../../../assets/small-bottle.svg"
          class="releases-tab-icons"
        />
      </div>
    </div>
    <ExceptionalBordeaux
      v-if="bordeauxSectionExists"
      class="q-pa-md"
      @empty-section="bordeauxSectionExists = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewlyMinted from './Releases/NewlyMinted.vue';
import NewlyListed from './Releases/NewlyListed.vue';
import NewTuscans from './Releases/NewTuscans.vue';
import 'src/css/Releases/Releases-page.css';
import NewBordeaux from './Releases/NewBordeaux.vue';

export default defineComponent({
  components: {
    NewlyMintedSection: NewlyMinted,
    NewlyListedSection: NewlyListed,
    SuperTuscans: NewTuscans,
    ExceptionalBordeaux: NewBordeaux
  },
  emits: ['totalTokens'],
  data() {
    return {
      listedSectionExists: true,
      mintedSectionExists: true,
      tuscansSectionExists: true,
      bordeauxSectionExists: true
    }
  }
});
</script>

<style></style>
