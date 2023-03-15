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
            class="header-clear-btn btn--no-hover"
            style="text-decoration: underline"
            label="Clear All"
            color="primary"
            no-caps
            flat
            dense
            @click="ClearAllAndApply()"
          />
          <div class="row items-center">
            <span
              class="q-pa-sm text-weight-bolder text-h6 q-mr-xs"
              style="vertical-align: middle"
            >
						  {{ wineFiltersStore.getAllFiltersArray.length }}
            </span>
            <q-btn 
              v-close-popup
              :disable="wineFiltersStore.getAllFiltersArray.length == 0"
              @click="this.ApplyFilter()"
              class="header-apply"
              label="Apply"
              color="primary"
              no-caps
            />
          </div>
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
  methods: {
    ApplyFilter() {
      this.wineFiltersStore.indexFilterKey();
    },
    async ClearAllAndApply() {
      await this.wineFiltersStore.removeAllFilters();
      this.wineFiltersStore.indexFilterKey();
    }
  }
});

</script>

<style scoped>
:deep(.header-clear-btn.btn--no-hover .q-focus-helper) {
	display: none;
}
</style>