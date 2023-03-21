<template>
  <div v-if="$q.screen.width > 600" class="column q-pb-md" style="width: 100%">
    <div class="row justify-between items-center q-pb-sm">
      <div class="row q-gutter-x-lg">
        <div v-if="!brandSearched">
          <span class="profile-header-offer q-pr-xs"> Incoming </span>
          <span class="profile-nft-number"> {{ incomingAmount }} </span>
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
            <span class="profile-back-text q-pl-md"> All Incoming </span>
          </q-btn>
        </div>
      </div>
      <div class="row items-center q-gutter-x-sm" style="flex-wrap: nowrap">
        <q-input
          v-model="incomingBrandFilter"
          outlined
          dense
          placeholder="Search"
          class="profile-searchbox"
          :input-style="!!incomingBrandFilter ? 'color: #212131' : ''"
        >
          <template #prepend>
            <q-icon name="app:search" />
          </template>
        </q-input>
        <q-btn
          :disable="!incomingBrandFilter"
          flat
          unelevated
          dense
          class="profile-primary-btn"
          @click="
            FetchIncomingWithBrandFilter(incomingSortKey, incomingBrandFilter)
          "
        >
          GO
        </q-btn>
      </div>
    </div>
    <div class="row justify-between">
      <div class="row q-gutter-x-lg">
        <q-radio
          v-model="incomingSortKey"
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
          v-model="incomingSortKey"
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
        <q-radio
          v-model="incomingSortKey"
          dense
          val="expireFirst"
          label="Expiring First"
          class="profile-checkbox"
          :style="
            IsSelectedSortKey('expireFirst')
              ? `font-family: 'ProximaNova-Bold';`
              : 'color: #9D9D9D'
          "
        />
      </div>
    </div>
  </div>
  <div
    v-else
    class="row justify-between q-pb-md items-center q-gutter-x-sm q-px-sm"
    style="width: 100%"
  >
    <q-input
      v-model="incomingBrandFilter"
      outlined
      dense
      placeholder="Search"
      class="profile-searchbox"
      :input-style="!!incomingBrandFilter ? 'color: #212131' : ''"
    >
      <template #prepend>
        <q-icon name="app:search" />
      </template>
    </q-input>
    <q-btn
      :disable="!incomingBrandFilter"
      flat
      unelevated
      dense
      class="profile-primary-btn"
      @click="
        FetchIncomingWithBrandFilter(incomingSortKey, incomingBrandFilter)
      "
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
    incomingAmount: {
      type: Number,
      required: true,
    },
    selectedIncomingSortKey: {
      type: String,
      required: true,
    },
    updatedIncomingBrandFilter: {
      type: String,
      required: true,
    },
    brandSearched: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'incomingSortKeySelected',
    'incomingBrandFilterUpdated',
    'fetchIncomingWithBrandFilter',
    'reset-incoming-search',
  ],
  data() {
    const store = ordersStore();
    return {
      store,
      incomingSortKey: '',
      incomingBrandFilter: '',
    };
  },
  watch: {
    incomingSortKey: {
      handler: function (val) {
        this.$emit('incomingSortKeySelected', val);
      },
    },
    incomingBrandFilter: {
      handler: function (val) {
        this.$emit('incomingBrandFilterUpdated', val);
      },
    },
  },
  mounted() {
    if (!!this.selectedIncomingSortKey) {
      this.incomingSortKey = this.selectedIncomingSortKey;
    }
    if (!!this.updatedIncomingBrandFilter) {
      this.incomingBrandFilter = this.updatedIncomingBrandFilter;
    }
  },
  methods: {
    IsSelectedSortKey(sortKey: string): boolean {
      return !!(this.incomingSortKey === sortKey);
    },
    FetchIncomingWithBrandFilter(sortKey: string, brandFilter: string) {
      this.store.setIncomingBrandFilterStatus(true);
      this.$emit('fetchIncomingWithBrandFilter', {
        sortKey: sortKey,
        brandFilter: brandFilter,
      });
    },
    ResetSearch() {
      this.incomingBrandFilter = '';
      this.store.setIncomingBrandFilterStatus(false);
      this.$emit('reset-incoming-search', this.incomingSortKey);
    },
  },
});
</script>

<style></style>
