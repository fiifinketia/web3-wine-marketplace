<template>
  <div class="row justify-between items-center q-pb-md" style="width: 100%">
    <div class="row q-gutter-x-lg">
      <div v-if="!brandSearched">
        <span class="profile-header-offer q-pr-xs"> Transactions </span>
        <span class="profile-nft-number"> {{ transactionsAmount }} </span>
      </div>
      <div v-else>
        <q-btn
          dense
          unelevated
          flat
          no-caps
          :ripple="false"
          class="profile-back btn--no-hover"
          @click="ResetSearch()"
        >
          <img
            src="../../../assets/back-left.svg"
            style="height: 20px; width: 11.5px"
          />
          <span class="profile-back-text q-pl-md"> All TXNs </span>
        </q-btn>
      </div>
      <q-separator
        style="background-color: #5e97ec45 !important"
        vertical
        inset
      />
      <q-radio
        v-model="transactionSortKey"
        dense
        val="newest"
        label="New First"
        class="profile-checkbox"
        :style="
          IsSelectedSortKey('newest')
            ? `font-family: 'ProximaNova-Bold';`
            : 'color: #9D9D9D'
        "
      />
      <q-radio
        v-model="transactionSortKey"
        dense
        val="oldest"
        label="Old First"
        class="profile-checkbox"
        :style="
          IsSelectedSortKey('oldest')
            ? `font-family: 'ProximaNova-Bold';`
            : 'color: #9D9D9D'
        "
      />
    </div>
    <div class="row items-center q-gutter-x-sm" style="flex-wrap: nowrap">
      <q-input
        v-model="transactionBrandFilter"
        outlined
        dense
        placeholder="Search"
        class="profile-searchbox"
        :input-style="!!transactionBrandFilter ? 'color: #212131' : ''"
      >
        <template #prepend>
          <q-icon name="app:search" />
        </template>
      </q-input>
      <q-btn
        :disable="!transactionBrandFilter"
        flat
        unelevated
        dense
        class="profile-primary-btn"
        @click="
          FetchTransactionWithBrandFilter(
            transactionSortKey,
            transactionBrandFilter
          )
        "
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
    transactionsAmount: {
      type: Number,
      required: true,
    },
    selectedTransactionSortKey: {
      type: String,
      required: true,
    },
    updatedTransactionBrandFilter: {
      type: String,
      required: true,
    },
    brandSearched: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'transactionSortKeySelected',
    'transactionBrandFilterUpdated',
    'fetchTransactionWithBrandFilter',
    'reset-transactions-search',
  ],
  data() {
    const store = ordersStore();
    return {
      store,
      transactionSortKey: '',
      transactionBrandFilter: '',
    };
  },
  watch: {
    transactionSortKey: {
      handler: function (val) {
        this.$emit('transactionSortKeySelected', val);
      },
    },
    transactionBrandFilter: {
      handler: function (val) {
        this.$emit('transactionBrandFilterUpdated', val);
      },
    },
  },
  mounted() {
    if (!!this.selectedTransactionSortKey) {
      this.transactionSortKey = this.selectedTransactionSortKey;
    }
    if (!!this.updatedTransactionBrandFilter) {
      this.transactionBrandFilter = this.updatedTransactionBrandFilter;
    }
  },
  methods: {
    IsSelectedSortKey(sortKey: string): boolean {
      return !!(this.transactionSortKey === sortKey);
    },
    FetchTransactionWithBrandFilter(sortKey: string, brandFilter: string) {
      this.store.setTransactionBrandFilterStatus(true);
      this.$emit('fetchTransactionWithBrandFilter', {
        sortKey: sortKey,
        brandFilter: brandFilter,
      });
    },
    ResetSearch() {
      this.transactionBrandFilter = '';
      this.store.setTransactionBrandFilterStatus(false);
      this.$emit('reset-transactions-search', this.transactionSortKey);
    },
  },
});
</script>

<style></style>
