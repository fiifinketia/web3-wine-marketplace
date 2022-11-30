<template>
  <div class="row justify-between items-center q-pb-md" style="width: 95%">
    <div class="row q-gutter-x-lg">
      <span class="profile-header-offer q-pr-xs"> Listings </span>
      <span class="profile-nft-number"> {{ listingsAmount }} </span>
      <q-separator style="background-color: #5e97ec45 !important" vertical inset />
      <q-radio v-model="listingFilter" dense val="newest" label="New First" class="profile-checkbox" :style="IsSelectedFilter('newest') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
      <q-radio v-model="listingFilter" dense val="oldest" label="Old First" class="profile-checkbox" :style="IsSelectedFilter('oldest') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
      <q-radio v-model="listingFilter" dense val="expireFirst" label="Expiring First" class="profile-checkbox" :style="IsSelectedFilter('expire') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
    </div>
    <div class="row items-center q-gutter-x-sm" style="flex-wrap: nowrap;">
      <img src="../../../assets/sell.svg" style="cursor: pointer;" @click="test()"/>
      <q-input 
        v-model="text"
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
    listingsAmount: {
      type: String,
      required: true
    },
    selectedListingFilter: {
      type: String,
      required: true
    }
  },
  data() {
    const store = ordersStore();
    return {
      store,
      listingFilter: ''
    }
  },
  mounted() {
    if (!!this.selectedListingFilter) {
      this.listingFilter = this.selectedListingFilter
    }
  },
  watch: {
    listingFilter: {
      handler: function (val) {
        this.$emit('listingFilterSelected', val)
      }
    }
  },
  methods: {
    IsSelectedFilter(filter: string) : boolean {
      return !!(this.listingFilter === filter)
    }
  }
})

</script>

<style>


</style>