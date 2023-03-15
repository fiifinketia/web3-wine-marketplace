<template>
  <div v-if="$q.screen.width > 600" class="column q-pb-md" style="width: 100%;">
    <div class="row justify-between items-center q-pb-sm">
      <div class="row q-gutter-x-lg">
        <span class="profile-header-offer q-pr-xs"> Outgoing </span>
        <span class="profile-nft-number"> {{ outgoingAmount }} </span>
      </div>
      <div class="row items-center q-gutter-x-sm" style="flex-wrap: nowrap;">
        <q-input 
          v-model="outgoingBrandFilter"
          outlined 
          dense
          placeholder="Search"
          class="profile-searchbox"
          :input-style="!!outgoingBrandFilter ? 'color: #212131' : ''"
        >
          <template #prepend>
            <q-icon name="app:search" />
          </template>
        </q-input>
        <q-btn
          :disable="!outgoingBrandFilter"
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
    <div class="row justify-between">
      <div class="row q-gutter-x-lg">
        <q-radio v-model="outgoingSortKey" dense val="newest" label="New First" class="profile-checkbox" :style="IsSelectedSortKey('newest') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
        <q-radio v-model="outgoingSortKey" dense val="oldest" label="Old First" class="profile-checkbox" :style="IsSelectedSortKey('oldest') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
        <q-radio v-model="outgoingSortKey" dense val="expireFirst" label="Expiring First" class="profile-checkbox" :style="IsSelectedSortKey('expireFirst') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
      </div>
    </div>
  </div>
  <div v-else class="row justify-between q-pb-md items-center q-gutter-x-sm q-px-sm" style="width: 100%">
    <q-input 
      v-model="outgoingBrandFilter"
      outlined 
      dense
      placeholder="Search"
      class="profile-searchbox"
      :input-style="!!outgoingBrandFilter ? 'color: #212131' : ''"
    >
      <template #prepend>
        <q-icon name="app:search" />
      </template>
    </q-input>
    <q-btn
      :disable="!outgoingBrandFilter"
      flat
      unelevated
      dense
      class="profile-primary-btn"
      @click="FetchOutgoingWithBrandFilter(outgoingSortKey, outgoingBrandFilter)"
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
        this.$emit('outgoingSortKeySelected', val)
      }
    },
    outgoingBrandFilter: {
      handler: function (val) {
        this.$emit('outgoingBrandFilterUpdated', val)
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
      this.$emit('fetchOutgoingWithBrandFilter', {sortKey: sortKey, brandFilter: brandFilter})
    }
  }
})

</script>

<style>


</style>