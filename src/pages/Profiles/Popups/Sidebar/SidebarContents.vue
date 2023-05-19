<template>
  <q-card flat>
    <q-list class="rounded-borders">
      <!-- Sort A to Z filter -->
      <q-expansion-item
        label="Sort A-Z"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="listableFiltersStore.sortedAtoZ"
            :options="listableFiltersStore.sortedAtoZOptions"
            type="radio"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>

      <!-- Type filter -->
      <q-expansion-item
        label="Type"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="listableFiltersStore.type"
            :options="listableFiltersStore.typeOptions"
            type="checkbox"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>

      <!-- brand filter -->
      <q-expansion-item
        label="Brand"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-input
          v-model="brandQuery"
          outlined
          dense
          round
          placeholder="Search"
          type="search"
          class="sidebar-search"
          :input-style="!!brandQuery ? 'color: #212131' : ''"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="listableFiltersStore.brand"
            :options="brandOptions"
            type="checkbox"
            :style="{ maxHeight: '200px', overflowY: 'scroll' }"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>

      <!-- Producer Filter -->
      <q-expansion-item
        label="Producer"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-input
          v-model="producerQuery"
          outlined
          dense
          round
          placeholder="Search"
          type="search"
          class="sidebar-search"
          :input-style="!!producerQuery ? 'color: #212131' : ''"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="listableFiltersStore.producer"
            :options="producerOptions"
            type="checkbox"
            :style="{ maxHeight: '200px', overflowY: 'scroll' }"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>

      <!-- Country Filter -->
      <q-expansion-item
        label="Country"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-input
          v-model="countryQuery"
          outlined
          dense
          round
          placeholder="Search"
          type="search"
          class="sidebar-search"
          :input-style="!!countryQuery ? 'color: #212131' : ''"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="listableFiltersStore.country"
            :options="countryOptions"
            type="checkbox"
            :style="{ maxHeight: '200px', overflowY: 'scroll' }"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>

      <!-- Region Filter -->
      <q-expansion-item
        label="Region"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-input
          v-model="regionQuery"
          outlined
          dense
          round
          placeholder="Search"
          type="search"
          class="sidebar-search"
          :input-style="!!regionQuery ? 'color: #212131' : ''"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="listableFiltersStore.region"
            :options="regionOptions"
            type="checkbox"
            :style="{ maxHeight: '200px', overflowY: 'scroll' }"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>

      <!-- Appellation Filter -->
      <q-expansion-item
        label="Appellation"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-input
          v-model="appellationQuery"
          outlined
          dense
          round
          placeholder="Search"
          type="search"
          class="sidebar-search"
          :input-style="!!appellationQuery ? 'color: #212131' : ''"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="listableFiltersStore.appellation"
            :options="appellationOptions"
            type="checkbox"
            :style="{ maxHeight: '200px', overflowY: 'scroll' }"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>

      <!-- Case Filter -->
      <q-expansion-item
        label="Case"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="listableFiltersStore.wineCase"
            :options="caseOptions"
            type="checkbox"
            :style="{ maxHeight: '200px', overflowY: 'scroll' }"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>

      <!-- Format Filter -->
      <q-expansion-item
        label="Format"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="listableFiltersStore.format"
            :options="formatOptions"
            type="checkbox"
            :style="{ maxHeight: '200px', overflowY: 'scroll' }"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>

      <!-- Investment Grade Filter -->
      <q-expansion-item
        label="Investment Grade"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="listableFiltersStore.investmentGrade"
            :options="investmentGradeOptions"
            type="checkbox"
            :style="{ maxHeight: '200px', overflowY: 'scroll' }"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>

      <!-- LWIN Filter -->
      <q-expansion-item
        label="LWIN"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-input
          v-model="lwinQuery"
          outlined
          dense
          round
          placeholder="Search"
          type="search"
          class="sidebar-search"
          :input-style="!!lwinQuery ? 'color: #212131' : ''"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="listableFiltersStore.LWIN"
            :options="LWINOptions"
            type="checkbox"
            :style="{ maxHeight: '200px', overflowY: 'scroll' }"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>

      <!-- Heritage Filter -->
      <q-expansion-item
        label="Heritage"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="listableFiltersStore.heritage"
            :options="heritageOptions"
            type="checkbox"
            :style="{ maxHeight: '200px', overflowY: 'scroll' }"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>
    </q-list>
  </q-card>
</template>

<script lang="ts">
import { useListableFilters } from 'src/stores/listable-filters';
import { defineComponent, ref } from 'vue';
import 'src/css/Marketplace/sidebar.css';

export default defineComponent({
  setup() {
    const listableFiltersStore = useListableFilters();

    return {
      listableFiltersStore,
      searchQuery: ref(''),
      brandQuery: ref(''),
      regionQuery: ref(''),
      producerQuery: ref(''),
      vintageQuery: ref(''),
      formatQuery: ref(''),
      investmentGradeQuery: ref(''),
      appellationQuery: ref(''),
      lwinQuery: ref(''),
      heritageQuery: ref(''),
      caseQuery: ref(''),
      originQuery: ref(''),
      countryQuery: ref(''),
      brandOptions: listableFiltersStore.brandOptions,
      regionOptions: listableFiltersStore.regionOptions,
      producerOptions: listableFiltersStore.producerOptions,
      formatOptions: listableFiltersStore.formatOptions,
      investmentGradeOptions: listableFiltersStore.investmentGradeOptions,
      appellationOptions: listableFiltersStore.appellationOptions,
      LWINOptions: listableFiltersStore.LWINOptions,
      heritageOptions: listableFiltersStore.heritageOptions,
      caseOptions: listableFiltersStore.wineCaseOptions,
      originOptions: listableFiltersStore.originOptions,
      countryOptions: listableFiltersStore.countryOptions,
    };
  },
  data() {
    return {
      generalSearch: '',
      minPrice: null,
      maxPrice: null,
    };
  },
});
</script>

<style></style>
