<template>
  <q-dialog
    full-height
    position="right"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <div class="column no-box-shadow q-mr-md">
      <q-scroll-area
        bordered
        class="main-filter-box dark-blue-border q-px-md"
        style="height: 100%; max-width: 100%; max-height: calc(100% - 100px); min-width: 275px;"
        :thumb-style="{
          right: '4px',
          borderRadius: '5px',
          backgroundColor: '#027be3',
          width: '5px',
          opacity: '0.75',
        }"
        :bar-style="{
          right: '2px',
          borderRadius: '9px',
          backgroundColor: '#027be3',
          width: '9px',
          opacity: '0.2',
        }"
      >
        <SidebarContents />
      </q-scroll-area>
      <q-card
        flat
        bordered
        class="main-filter-box hidden-b-1023 dark-blue-border q-mt-md"
      >
        <q-card-section class="row justify-between q-pa-md">
          <q-btn
            v-close-popup
            class="header-clear-btn"
            style="text-decoration: underline"
            label="Clear All"
            color="primary"
            no-caps
            flat
            dense
            @click="wineFiltersStore.$reset()"
          />
          <q-btn 
            v-close-popup
            class="header-apply"
            label="Apply"
            color="primary"
            no-caps
          />
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import SidebarContents from './SidebarContents.vue';
import { defineComponent } from 'vue';
import { useWineFilters } from 'src/stores/wine-filters';

export default defineComponent({
	components: {
		SidebarContents: SidebarContents
	},
  data() {
    const wineFiltersStore = useWineFilters();

    return {
      wineFiltersStore
    }
  },
});

</script>

<style>

</style>