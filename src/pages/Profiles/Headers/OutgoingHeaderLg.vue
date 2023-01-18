<template>
  <div class="row justify-between items-center q-pb-md" style="width: 100%">
    <div class="row q-gutter-x-lg">
      <span class="profile-header-offer q-pr-xs"> Outgoing </span>
      <span class="profile-nft-number"> {{ outgoingAmount }} </span>
      <q-separator style="background-color: #5e97ec45 !important" vertical inset />
      <q-radio v-model="outgoingSortKey" dense val="newest" label="New First" class="profile-checkbox" :style="IsSelectedSortKey('newest') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
      <q-radio v-model="outgoingSortKey" dense val="oldest" label="Old First" class="profile-checkbox" :style="IsSelectedSortKey('oldest') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
      <q-radio v-model="outgoingSortKey" dense val="expireFirst" label="Expiring First" class="profile-checkbox" :style="IsSelectedSortKey('expireFirst') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
    </div>
    <div class="row items-center q-gutter-x-sm" style="flex-wrap: nowrap;">
      <img src="../../../assets/sell.svg" style="cursor: pointer;" @click="test()"/>
      <q-input 
        v-model="outgoingBrandFilter"
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
        @click="FetchOutgoingWithBrandFilter(outgoingSortKey, outgoingBrandFilter)"
      >
        GO
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ordersStore } from 'src/stores/orders-store';
import 'src/css/Profile/shared.css';

export default defineComponent({
  props: {
    outgoingAmount: {
      type: String,
      required: true
    },
    selectedOutgoingSortKey: {
      type: String,
      required: true
    },
    updatedOutgoingBrandFilter: {
      type: String,
      required: true
    }
  },
  emits: [
    'outgoing-sort-key-selected',
    'outgoing-brand-filter-updated',
    'fetch-outgoing-with-brand-filter'
  ],
  data() {
    const store = ordersStore();
    return {
      store,
      outgoingSortKey: '',
      outgoingBrandFilter: ''
    }
  },
  watch: {
    outgoingSortKey: {
      handler: function (val) {
        this.$emit('outgoing-sort-key-selected', val)
      }
    },
    outgoingBrandFilter: {
      handler: function (val) {
        this.$emit('outgoing-brand-filter-updated', val)
      }
    }
  },
  mounted() {
    if (!!this.selectedOutgoingSortKey) {
      this.outgoingSortKey = this.selectedOutgoingSortKey
    }
    if (!!this.updatedOutgoingBrandFilter) {
      this.outgoingBrandFilter = this.updatedOutgoingBrandFilter
    }
  },
  methods: {
    IsSelectedSortKey(sortKey: string) : boolean {
      return !!(this.outgoingSortKey === sortKey)
    },
    FetchOutgoingWithBrandFilter(sortKey: string, brandFilter: string) {
      this.store.setOutgoingBrandFilterStatus(true);
      this.$emit('fetch-outgoing-with-brand-filter', {sortKey: sortKey, brandFilter: brandFilter})
    }
  }
})

</script>

<style>


</style>