<template>
  <div v-if="$q.screen.width > 600" class="column q-pb-md" style="width: 100%;">
    <div class="row justify-between items-center q-pb-sm">
      <div class="row q-gutter-x-lg">
        <span class="profile-header-offer q-pr-xs"> Listings </span>
        <span class="profile-nft-number"> {{ listingsAmount }} </span>
      </div>
      <div class="row items-center q-gutter-x-sm" style="flex-wrap: nowrap;">
        <img src="../../../assets/sell.svg" style="cursor: pointer;"/>
        <q-input 
          v-model="listingBrandFilter"
          color="grey"
          outlined 
          dense
          label="Search"
          class="profile-searchbox"
        >
          <template #prepend>
            <q-icon name="search" color="grey"></q-icon>
          </template>
        </q-input>
        <q-btn
          flat
          unelevated
          dense
          class="profile-primary-btn"
          @click="FetchListingsWithBrandFilter(listingSortKey, listingBrandFilter)"
        >
          GO
        </q-btn>
      </div>
    </div>
    <div class="row justify-between">
      <div class="row q-gutter-x-lg">
        <q-radio v-model="listingSortKey" dense val="newest" label="New First" class="profile-checkbox" :style="IsSelectedSortKey('newest') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
        <q-radio v-model="listingSortKey" dense val="oldest" label="Old First" class="profile-checkbox" :style="IsSelectedSortKey('oldest') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
        <q-radio v-model="listingSortKey" dense val="expireFirst" label="Expiring First" class="profile-checkbox" :style="IsSelectedSortKey('expireFirst') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
      </div>
    </div>
  </div>
  <div v-else class="row justify-between q-pb-md items-center q-gutter-x-sm" style="width: 100%">
    <q-input 
      v-model="listingBrandFilter"
      color="grey"
      outlined 
      dense
      label="Search"
      class="profile-searchbox"
    >
      <template #prepend>
        <q-icon name="search" color="grey"></q-icon>
      </template>
    </q-input>
    <q-btn
      flat
      unelevated
      dense
      class="profile-primary-btn"
      @click="FetchListingsWithBrandFilter(listingSortKey, listingBrandFilter)"
    >
      GO
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ordersStore } from 'src/stores/orders-store';
import 'src/css/Profile/shared.css';

export default defineComponent({
  props: {
    listingsAmount: {
      type: String,
      required: true
    },
    selectedListingSortKey: {
      type: String,
      required: true
    },
    updatedListingBrandFilter: {
      type: String,
      required: true
    }
  },
  data() {
    const store = ordersStore();
    return {
      store,
      listingSortKey: '',
      listingBrandFilter: ''
    }
  },
  watch: {
    listingSortKey: {
      handler: function (val) {
        this.$emit('listingSortKeySelected', val)
      }
    },
    listingBrandFilter: {
      handler: function (val) {
        this.$emit('listingBrandFilterUpdated', val)
      }
    }
  },
  mounted() {
    if (!!this.selectedListingSortKey) {
      this.listingSortKey = this.selectedListingSortKey
    }
    if (!!this.updatedListingBrandFilter) {
      this.listingBrandFilter = this.updatedListingBrandFilter
    }
  },
  methods: {
    IsSelectedSortKey(sortKey: string) : boolean {
      return !!(this.listingSortKey === sortKey)
    },
    FetchListingsWithBrandFilter(sortKey: string, brandFilter: string) {
      this.store.setListingBrandFilterStatus(true);
      this.$emit('fetchListingsWithBrandFilter', {sortKey: sortKey, brandFilter: brandFilter})
    }
  }
})

</script>

<style>


</style>