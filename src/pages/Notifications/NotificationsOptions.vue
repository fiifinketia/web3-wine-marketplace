<template>
  <div class="notifications-options-container column no-wrap">
    <div class="notifications-options-main row no-wrap">
      <q-btn
        flat
        dense
        unelevated
        class="btn--no-hover no-padding sort-btn"
        :ripple="false"
        @click="openOptions = !openOptions"
      >
        <img v-if="!openOptions" src="../../assets/sort-amount-down.svg" />
        <img v-else src="../../assets/sort-amount-down-active.svg" />
      </q-btn>
      <q-input
        v-model="searchText"
        dense
        outlined
        color="blue-6"
        placeholder="Search"
        :input-style="!!searchText ? 'color: #212131' : ''"
        class="notifications-search"
      >
        <template #prepend>
          <q-icon name="app:search" />
        </template>
      </q-input>
    </div>
    <div v-if="openOptions" class="column no-wrap q-px-md q-pb-md q-pt-sm">
      <div class="row" style="gap: 40px">
        <q-radio
          v-model="sortKey"
          class="notifications-radio"
          keep-color
          dense
          val="latest"
          :style="
            IsSelectedSortKey('latest')
              ? `font-family: 'ProximaNova-Bold';`
              : 'color: #9D9D9D'
          "
        >
          New First
        </q-radio>
        <q-radio
          v-model="sortKey"
          class="notifications-radio"
          keep-color
          dense
          val="earliest"
          :style="
            IsSelectedSortKey('earliest')
              ? `font-family: 'ProximaNova-Bold';`
              : 'color: #9D9D9D'
          "
        >
          Old First
        </q-radio>
      </div>
      <q-separator spaced="xl" size="1px" style="width: 100%; background: rgba(94, 151, 236, 0.27);"/>
      <div class="row justify-between">
        <q-radio
          v-model="filterKey"
          class="notifications-radio"
          keep-color
          dense
          val="all"
          :style="
            IsSelectedFilterKey('all')
              ? `font-family: 'ProximaNova-Bold';`
              : 'color: #9D9D9D'
          "
        >
          All
        </q-radio>
        <q-radio
          v-model="filterKey"
          class="notifications-radio"
          keep-color
          dense
          val="offers"
          :style="
            IsSelectedFilterKey('offers')
              ? `font-family: 'ProximaNova-Bold';`
              : 'color: #9D9D9D'
          "
        >
          Offers
        </q-radio>
        <q-radio
          v-model="filterKey"
          class="notifications-radio"
          keep-color
          dense
          val="sale"
          :style="
            IsSelectedFilterKey('sale')
              ? `font-family: 'ProximaNova-Bold';`
              : 'color: #9D9D9D'
          "
        >
          Sale
        </q-radio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia';
import 'src/css/MainLayout/NotificationsDialog.css';
import { useNotificationsStore } from 'src/stores/notifications-store';
import { useUserStore } from 'src/stores/user-store';
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    const notificationStore = useNotificationsStore();
    return {
      searchText: '',
      openOptions: false,
      notificationStore,
      sortKey: 'latest' as 'latest' | 'earliest',
      filterKey: 'all' as 'all' | 'offers' | 'sale'
    }
  },
  computed: {
    ...mapState(useUserStore, {
      walletAddress: store => store.walletAddress
    })
  },
  watch: {
    sortKey: {
      handler: async function () {
        this.notificationStore.sortKey = this.sortKey;
        if (!!this.walletAddress) {
          await this.notificationStore.getUserNotifications(this.walletAddress);
        }
      },
    },
    filterKey: {
      handler: async function () {
        if (!!this.walletAddress) {
          this.notificationStore.filterKey = this.filterKey;
          await this.notificationStore.getUserNotifications(this.walletAddress);
        }
      },
    },
  },
  methods: {
    IsSelectedSortKey(sortKey: string): boolean {
      return !!(this.sortKey === sortKey);
    },
    IsSelectedFilterKey(filterKey: string): boolean {
      return !!(this.filterKey === filterKey);
    },
  }
})
</script>

<style scoped>
  :deep(.sort-btn.btn--no-hover .q-focus-helper) {
    display: none;
  }
</style>