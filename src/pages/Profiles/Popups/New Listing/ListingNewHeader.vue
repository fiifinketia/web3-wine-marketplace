<template>
  <div class="row items-center justify-between full-width" style="flex-wrap: nowrap;">
    <div class="row items-center">
      <span class="q-pr-sm new-list-available-text"> Available </span>
      <span class="new-list-available-num"> STAT </span>
    </div>
    <div class="row items-center q-gutter-x-sm">
      <q-input 
        v-model="newListingBrandFilter"
        outlined 
        dense
        placeholder="Search"
        class="new-list-searchbox"
        :input-style="!!newListingBrandFilter ? 'color: #212131' : ''"
      >
        <template #prepend>
          <q-icon name="app:search" />
        </template>
      </q-input>
      <q-btn
        :disable="!newListingBrandFilter"
        flat
        unelevated
        dense
        class="profile-primary-btn"
      >
        GO
      </q-btn>
    </div>
    <div class="row items-center">
      <span 
        class="q-pa-sm text-weight-bolder text-h6"
        style="vertical-align: middle"
      >
        ST
      </span>
      <q-btn
        class="filter-btn btn--no-hover"
        dense
        unelevated
        color="secondary"
        text-color="white"
        icon="app:filter"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import 'src/css/Profile/shared.css';
import 'src/css/Profile/Component/newListing.css';

export default defineComponent({
  data() {
    return {
      newListingBrandFilter: ''
    }
  }
})
</script>

<style>

</style>