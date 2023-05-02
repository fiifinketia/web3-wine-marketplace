<template>
  <q-card flat>
    <q-card-section
      class="hidden-a-1023 row justify-between q-px-none q-pt-md q-pb-sm q-gutter-xs"
    >
      <q-input
        v-model="generalSearch"
        outlined
        round
        placeholder="Search"
        type="search"
        color="primary"
        class="col-9 sidebar-search sidebar-search-stretch"
        :input-style="!!generalSearch ? 'color: #212131' : ''"
        dense
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        :disable="!generalSearch"
        class="sidebar-go"
        color="primary"
        outlined
        unelevated
        label="GO"
        dense
        @click="emitGeneralSearch()"
      />
    </q-card-section>
    <q-list class="rounded-borders">
      <!-- Status filter -->
      <q-expansion-item
        label="Status"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="wineFiltersStore.listedOnly"
            :options="wineFiltersStore.listedOnlyOptions"
            type="radio"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>

      <!-- Sort A to Z filter -->
      <q-expansion-item
        label="Sort A-Z"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="wineFiltersStore.sortedAtoZ"
            :options="wineFiltersStore.sortedAtoZOptions"
            type="radio"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>

      <!-- Currency filter -->
      <q-expansion-item
        label="Listing currencies"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="wineFiltersStore.currency"
            :options="wineFiltersStore.currencyOptions"
            type="checkbox"
            class="sidebar-options"
          >
            <template #label="opt">
              <div class="row items-center q-gutter-x-xs">
                <q-icon :name="opt.icon" size="1.5em"></q-icon>
                <span>{{ opt.label }}</span>
              </div>
            </template>
          </q-option-group>
        </q-list>
      </q-expansion-item>

      <!-- Type filter -->
      <q-expansion-item
        label="Type"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="wineFiltersStore.type"
            :options="wineFiltersStore.typeOptions"
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
            v-model="wineFiltersStore.brand"
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
            v-model="wineFiltersStore.producer"
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
            v-model="wineFiltersStore.country"
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
            v-model="wineFiltersStore.region"
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
            v-model="wineFiltersStore.appellation"
            :options="appellationOptions"
            type="checkbox"
            :style="{ maxHeight: '200px', overflowY: 'scroll' }"
            class="sidebar-options"
          />
        </q-list>
      </q-expansion-item>

      <!-- Price Filter-->
      <q-expansion-item
        label="Price"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-card class="sidebar-active-border rounded-borders q-my-sm q-pa-sm">
          <q-card-section
            class="column items-center col-12 q-pa-xs q-gutter-y-md"
          >
            <div class="full-width">
              <div class="col-12 row justify-between">
                <div class="column q-gutter-y-xs sidebar-price-column">
                  <span class="q-pa-none sidebar-label-light">From</span>
                  <q-input
                    v-model="minPrice"
                    type="number"
                    dense
                    class="sidebar-price-text-field"
                    input-style="color: #212131"
                    outlined
                  />
                </div>
                <div class="column q-gutter-y-xs sidebar-price-column">
                  <span class="q-pa-none sidebar-label-light">To</span>
                  <q-input
                    v-model="maxPrice"
                    type="number"
                    dense
                    class="sidebar-price-text-field"
                    input-style="color: #212131"
                    outlined
                  />
                </div>
              </div>
            </div>
            <q-btn
              class="sidebar-apply btn--no-hover full-width"
              :disable="!minPrice && !maxPrice"
              unelevated
              no-caps
              label="Apply price range"
              outlined
              color="primary"
              @click="
                wineFiltersStore.setPrice({ min: minPrice, max: maxPrice })
              "
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Case Filter -->
      <q-expansion-item
        label="Case"
        header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
      >
        <q-list class="sidebar-active-border rounded-borders q-my-sm">
          <q-option-group
            v-model="wineFiltersStore.wineCase"
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
            v-model="wineFiltersStore.format"
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
            v-model="wineFiltersStore.investmentGrade"
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
            v-model="wineFiltersStore.LWIN"
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
            v-model="wineFiltersStore.heritage"
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
import { useWineFilters } from 'src/stores/wine-filters';
import { useGeneralSearch } from 'src/stores/general-search-filter';
import { defineComponent, ref } from 'vue';
import 'src/css/Marketplace/sidebar.css';

export default defineComponent({
  setup() {
    const wineFiltersStore = useWineFilters();
    const generalSearchStore = useGeneralSearch();

    return {
      wineFiltersStore,
      generalSearchStore,
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
      brandOptions: wineFiltersStore.brandOptions,
      regionOptions: wineFiltersStore.regionOptions,
      producerOptions: wineFiltersStore.producerOptions,
      formatOptions: wineFiltersStore.formatOptions,
      investmentGradeOptions: wineFiltersStore.investmentGradeOptions,
      appellationOptions: wineFiltersStore.appellationOptions,
      LWINOptions: wineFiltersStore.LWINOptions,
      heritageOptions: wineFiltersStore.heritageOptions,
      caseOptions: wineFiltersStore.wineCaseOptions,
      originOptions: wineFiltersStore.originOptions,
      countryOptions: wineFiltersStore.countryOptions,
      maturity: ref(wineFiltersStore.maturity),
    };
  },
  data() {
    return {
      generalSearch: '',
      minPrice: 0,
      maxPrice: 0,
    };
  },
  watch: {
    brandQuery: {
      handler: function (val) {
        this.brandOptions = this.wineFiltersStore.brandOptions.filter(b =>
          b.value.toLowerCase().includes(val.toLowerCase())
        );
      },
    },
    regionQuery: {
      handler: function (val) {
        this.regionOptions = this.wineFiltersStore.regionOptions.filter(b =>
          b.value.toLowerCase().includes(val.toLowerCase())
        );
      },
    },
    producerQuery: {
      handler: function (val) {
        this.producerOptions = this.wineFiltersStore.producerOptions.filter(b =>
          b.value.toLowerCase().includes(val.toLowerCase())
        );
      },
    },
    originQuery: {
      handler: function (val) {
        this.originOptions = this.wineFiltersStore.originOptions.filter(b =>
          b.value.toLowerCase().includes(val.toLowerCase())
        );
      },
    },
    appellationQuery: {
      handler: function (val) {
        this.appellationOptions =
          this.wineFiltersStore.appellationOptions.filter(b =>
            b.value.toLowerCase().includes(val.toLowerCase())
          );
      },
    },
    countryQuery: {
      handler: function (val) {
        this.countryOptions = this.wineFiltersStore.countryOptions.filter(b =>
          b.value.toLowerCase().includes(val.toLowerCase())
        );
      },
    },
    formatQuery: {
      handler: function (val) {
        this.formatOptions = this.wineFiltersStore.formatOptions.filter(b =>
          b.value.toLowerCase().includes(val.toLowerCase())
        );
      },
    },
    investmentGradeQuery: {
      handler: function (val) {
        this.investmentGradeOptions =
          this.wineFiltersStore.investmentGradeOptions.filter(b =>
            b.value.toLowerCase().includes(val.toLowerCase())
          );
      },
    },
    lwinQuery: {
      handler: function (val) {
        this.LWINOptions = this.wineFiltersStore.LWINOptions.filter(b =>
          b.value.toLowerCase().includes(val.toLowerCase())
        );
      },
    },
    heritageQuery: {
      handler: function (val) {
        this.heritageOptions = this.wineFiltersStore.heritageOptions.filter(b =>
          b.value.toLowerCase().includes(val.toLowerCase())
        );
      },
    },
    caseQuery: {
      handler: function (val) {
        this.caseOptions = this.wineFiltersStore.wineCaseOptions.filter(b =>
          b.value.toLowerCase().includes(val.toLowerCase())
        );
      },
    },
  },
  methods: {
    applyMaturityFilter() {
      // console.log(this.wineFiltersStore);
    },
    getYears(monthCount: number) {
      function getPlural(number: number, word: { [key: string]: string }) {
        return (number === 1 && word.one) || word.other;
      }

      let months = { one: 'mo', other: 'mos' },
        years = { one: 'yr', other: 'yrs' },
        m = monthCount % 12,
        y = Math.floor(monthCount / 12);

      if (y == 0) return m + ' ' + getPlural(m, months);
      else return y + ' ' + getPlural(y, years);
    },
    emitGeneralSearch() {
      this.generalSearchStore.setGeneralSearch(this.generalSearch);
      this.generalSearchStore.indexGeneralSearchKey();
      this.generalSearch = '';
    },
  },
});
</script>

<style></style>
