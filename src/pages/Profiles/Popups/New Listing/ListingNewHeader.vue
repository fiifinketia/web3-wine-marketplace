<template>
  <div class="row items-center justify-between full-width" style="flex-wrap: nowrap;" @click="CloseBrandFilter()">
    <div class="row items-center">
      <span class="q-pr-sm new-list-available-text"> Available </span>
      <span class="new-list-available-num"> {{ listableNFTs.length > 0 ? listableNFTs.length : '0' }} </span>
    </div>
    <div 
      v-if="$q.screen.width > 1200"
      class="row items-center justify-end q-gutter-x-lg"
    >
      <div class="row items-center q-gutter-x-sm">
        <div class="columns items-center">
          <q-input 
            v-model="listableSearchFilter"
            outlined 
            dense
            placeholder="Search"
            class="new-list-searchbox"
            :input-style="!!listableSearchFilter ? 'color: #212131' : ''"
          >
            <template #prepend>
              <q-icon name="app:search" />
            </template>
          </q-input>
          <div 
            class="new-list-brandf-container"
            v-if="searchFilterResults.length > 0"
          >
            <q-btn
              v-for="(brand) in searchFilterResults"
              flat
              square
              no-caps
              dense
              unelevated
              :ripple="false"
              align="left"
              :key="brand"
              class="new-list-brandf-box column justify-center q-pa-sm"
              @click="FilterBrand(brand)"
            >
              <span class="new-list-brandf-text"> {{ brand }} </span>
            </q-btn>
          </div>
        </div>
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
          @click="OpenSidebar()"
        />
      </div>
    </div>
    <div 
      v-if="$q.screen.width <= 1200"
      class="row items-center q-gutter-x-sm"
      style="width: 50%; flex-wrap: nowrap"
    >
      <q-input 
        v-model="newListingBrandFilter"
        outlined 
        dense
        placeholder="Search"
        class="new-list-searchbox"
        :input-style="!!newListingBrandFilter ? 'color: #212131' : ''"
        style="flex-grow: 1"
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
    <div 
      v-if="$q.screen.width <= 1200"
      class="row items-center"
    >
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
import { defineComponent, PropType } from "vue";
import 'src/css/Profile/shared.css';
import 'src/css/Profile/Component/newListing.css';
import { ListableToken } from "src/shared/models/entities/NFT.model";

export default defineComponent({
  props: {
    listableNFTs: { 
      type: [] as PropType<ListableToken[]>,
      default: []
    },
  },
  data() {
    return {
      newListingBrandFilter: '',

      listableSearchFilter: '',
      searchFilterResults: [] as string[],

      filteredNFTs: [] as ListableToken[]
    }
  },
  watch: {
    listableSearchFilter: {
      handler(search: string) {
        if (!search) {
          this.searchFilterResults = []
        } else {
          this.searchFilterResults = [
            ...new Set (
              this.listableNFTs
                .filter((f) => !!(f.brand.toLowerCase().includes(search.toLowerCase())))
                .map((f => f.brand))
            )
          ];
        }
      }
    }
  },
  methods: {
    FilterBrand(brand: string) {
      console.log(brand);
    },
    CloseBrandFilter() {
      this.searchFilterResults = [];
    },
    OpenSidebar() {
      console.log('open')
      this.$emit('open-norm-sidebar');
    }
  }
})
</script>

<style>

</style>