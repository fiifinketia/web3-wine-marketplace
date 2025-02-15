<template>
  <q-dialog
    full-height
    seamless
    transition-show="scale"
    transition-hide="scale"
    class="list-filter-dialog"
    @show="AddClickOutsideListener()"
    @hide="RemoveClickOutsideListener()"
  >
    <div
      ref="sidebar"
      class="no-box-shadow"
      :class="$q.screen.width < 1154 ? 'q-mr-md' : ''"
    >
      <q-scroll-area
        bordered
        class="main-filter-box dark-blue-border q-px-md"
        style="
          height: 100%;
          max-width: 100%;
          max-height: calc(100% - 100px);
          min-width: 275px;
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
      <q-card flat bordered class="main-filter-box dark-blue-border q-mt-md">
        <q-card-section class="row justify-between q-pa-md">
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
  emits: ['close-sidebar'],
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
    HandleClickOutside(event: MouseEvent) {
      if (event.target) {
        const sidebar = this.$refs.sidebar as HTMLElement;
        if (sidebar && !sidebar.contains(event.target as Node)) {
          this.$emit('close-sidebar');
        }
      }
    },
    AddClickOutsideListener() {
      document.body.addEventListener('click', this.HandleClickOutside);
    },
    RemoveClickOutsideListener() {
      document.body.removeEventListener('click', this.HandleClickOutside);
    }
  },
});
</script>

<style scoped>
:deep(.header-clear-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
