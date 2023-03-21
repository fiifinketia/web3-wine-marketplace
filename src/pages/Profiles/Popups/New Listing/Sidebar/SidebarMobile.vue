<template>
  <q-dialog maximized transition-show="slide-up" transition-hide="slide-down">
    <div class="column bg-white items-center" style="flex-wrap: nowrap">
      <q-card
        flat
        square
        class="row justify-between sidebar-header-container q-my-xs q-px-md"
        style="width: 100%"
      >
        <img
          src="../../../../../../public/images/WiV-logo.svg"
          style="width: 100px"
        />
        <q-btn
          v-close-popup
          flat
          dense
          unelevated
          class="exit-btn btn--no-hover"
        >
          <img src="../../../../../assets/exit.svg" />
        </q-btn>
      </q-card>
      <q-scroll-area
        bordered
        class="q-pr-md"
        style="height: 80%"
        :style="
          $q.screen.width > 600 ? 'width: 70%; max-width: 400px;' : 'width: 95%'
        "
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
        class="main-filter-box q-mt-md"
        :style="$q.screen.width > 600 ? 'width: 70%' : 'width: 95%'"
      >
        <q-card-section
          class="row justify-between"
          style="padding-left: 0; padding-right: 0"
        >
          <q-btn
            class="header-clear-btn btn--no-hover"
            style="text-decoration: underline"
            label="Clear All"
            color="primary"
            no-caps
            flat
            dense
            @click="ClearFilters()"
          />
          <div class="row items-center">
            <span
              class="q-pa-sm text-weight-bolder text-h6 q-mr-xs"
              style="vertical-align: middle"
            >
              {{ listableFiltersStore.getAllFiltersArray.length }}
            </span>
            <q-btn
              v-close-popup
              :disable="listableFiltersStore.getAllFiltersArray.length == 0"
              class="header-apply"
              label="Apply"
              color="primary"
              no-caps
              @click="ApplyFilter()"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import SidebarContents from './SidebarContents.vue';
import { defineComponent, PropType } from 'vue';
import { useListableFilters } from 'src/stores/listable-filters';
import 'src/css/Marketplace/header.css';
import { ListableToken } from 'src/shared/models/entities/NFT.model';

export default defineComponent({
  components: {
    SidebarContents: SidebarContents,
  },
  props: {
    listableNFTs: { type: [] as PropType<ListableToken[]>, required: true },
  },
  data() {
    const listableFiltersStore = useListableFilters();

    return {
      listableFiltersStore,
    };
  },
  methods: {
    ApplyFilter() {
      this.listableFiltersStore.filterListableTokens(this.listableNFTs);
    },
    ClearFilters() {
      this.listableFiltersStore.clearAllFilters(this.listableNFTs);
    },
  },
});
</script>

<style scoped>
:deep(.header-clear-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
