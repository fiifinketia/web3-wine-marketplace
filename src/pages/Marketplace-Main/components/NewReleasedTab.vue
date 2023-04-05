<template>
  <div class="fit column items-center">
    <!-- Newly Listed Section -->
    <div class="releases-tab-container column justify-center">
      <div class="row items-center justify-center q-gutter-x-lg">
        <q-img src="../../../assets/small-bag.svg" class="releases-tab-icons" />
        <span> SALE </span>
        <q-img src="../../../assets/small-box.svg" class="releases-tab-icons" />
      </div>
    </div>
    <NewlyListedSection class="q-pa-md" />

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
    <NewlyMintedSection class="q-pa-md" />

    <!-- Super Tuscans Section -->
    <div class="releases-tab-container column justify-center">
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
    <SuperTuscans class="q-pa-md" />

    <!-- Exceptional Bordeaux Section -->
    <div class="releases-tab-container column justify-center">
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
    <ExceptionalBordeaux class="q-pa-md" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewlyMinted from './Releases/NewlyMinted.vue';
import NewlyListed from './Releases/NewlyListed.vue';
import NewTuscans from './Releases/NewTuscans.vue';
import 'src/css/Releases/Releases-page.css';
import NewBordeaux from './Releases/NewBordeaux.vue';

// amplitude
import * as amplitude from '@amplitude/analytics-browser';

amplitude.init('286edfa9633aaf8f494a67e9e5d4d2a7', undefined, {
  defaultTracking: {
    sessions: true,
    pageViews: true,
  },
});

amplitude.setSessionId(Date.now());
amplitude.track('Releases Tab Clicked');

export default defineComponent({
  components: {
    NewlyMintedSection: NewlyMinted,
    NewlyListedSection: NewlyListed,
    SuperTuscans: NewTuscans,
    ExceptionalBordeaux: NewBordeaux,
  },
  emits: ['totalTokens'],
});
</script>

<style></style>
