<template>
  <div
    :class="
      isMobile()
        ? 'fit row wrap justify-center items-start content-start'
        : $q.screen.width > 1025
        ? 'fixed fit row wrap justify-start items-start content-start q-pl-md'
        : 'fixed fit row wrap justify-start items-start content-start'
    "
  >
    <div
      class="row q-pb-sm col-xs-12"
      :class="$q.screen.width >= 1024 ? 'justify-between' : 'justify-center'"
    >
      <div
        class="row"
        :class="$q.screen.width >= 600 ? 'col 10' : 'col-12 q-px-md'"
      >
        <div class="flex hidden-a-599 q-pl-lg-none q-pl-md items-center col-4">
          <span class="header-nfts-title"> NFTs </span>
          <span class="q-pl-sm header-nfts-count">{{ totalNFTs || 0 }}</span>
        </div>
        <div class="col-sm-8 col-xs-12">
          <div class="q-mx-xs hidden-a-1023 overflow-hidden">
            <q-resize-observer @resize="onResize" />
            <q-chip
              v-for="filter in wineFiltersStore.getAllFiltersArray.slice(0, 7)"
              :key="filter"
              removable
              dense
              color="secondary"
              class="header-filter-chip q-px-sm"
              text-color="white"
              @remove="wineFiltersStore.removeFilter(filter)"
            >
              {{ truncateChipText(filter) }}
            </q-chip>
          </div>
          <div class="row hidden-b-1023 justify-center q-gutter-x-sm">
            <q-input
              v-model="generalSearch"
              outlined
              round
              dense
              placeholder="Search"
              type="search"
              color="primary"
              :class="$q.screen.width > 600 ? 'col-10' : ''"
              :style="$q.screen.width > 600 ? 'width: 80%' : ''"
              class="header-search"
              :input-style="!!generalSearch ? 'color: #212131' : ''"
            >
              <template #prepend>
                <q-icon name="app:search" />
              </template>
            </q-input>
            <q-btn
              :disable="!generalSearch"
              color="primary"
              text-color="white"
              label="GO"
              unelevated
              class="header-go"
              @click="emitGeneralSearch()"
            />
          </div>
        </div>
      </div>
      <div class="row justify-end hidden-a-599 col-2 q-pr-sm">
        <q-btn
          style="text-decoration: underline"
          class="row hidden-a-1023 header-clear-btn btn--no-hover"
          label="Clear All"
          color="primary"
          dense
          no-caps
          flat
          @click="wineFiltersStore.removeAllFilters()"
        />
        <div id="marketplace-sidebar-sm" class="hidden-b-1023 q-pr-md">
          <span
            class="q-pa-sm text-weight-bolder text-h6"
            style="vertical-align: middle"
          >
            {{ wineFiltersStore.getAllFiltersArray.length }}</span
          >
          <q-btn
            class="col-10 q-pa-sm filter-btn btn--no-hover"
            dense
            unelevated
            color="secondary"
            text-color="white"
            icon="app:filter"
            @click="toggleSidebar()"
          />
        </div>
      </div>
    </div>

    <SidebarDesktop
      v-if="$q.screen.width > 1023"
      id="marketplace-sidebar-lg"
      :style="qChipRows > 1 ? calculateExtraHeightSidebar(qChipRows) : ''"
      class="col-sm-3 q-mt-sm"
    />
    <SidebarTablet v-else-if="$q.screen.width > 768" v-model="openSidebar" />
    <SidebarMobile v-else v-model="openSidebar" />

    <!-- List Section -->
    <NFTSelections
      id="marketplace-nfts"
      class="col-md-9 col-sm-12"
      :style="qChipRows > 1 ? calculateExtraHeightNFTs(qChipRows) : ''"
      style="padding-top: 0px !important"
      @total-tokens="updateTokenCount"
      @loading-completed="nftLoadingCompleted = true"
    />
    <q-page-sticky
      id="marketplace-sidebar-xs"
      class="hidden-b-599 q-mr-md"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-card
        rounded
        class="row items-center justify-center q-pa-xs rounded-borders sidebar-sticky-container"
      >
        <span
          class="text-weight-bold text-h6 sidebar-sticky-filter-icon q-pr-xs"
          clickable
          @click="toggleSidebar()"
        >
          {{ wineFiltersStore.getAllFiltersArray.length }}</span
        >
        <q-btn
          dense
          class="sidebar-sticky-filter-icon btn--no-hover"
          color="secondary"
          text-color="white"
          icon="app:filter"
          unelevated
          @click="toggleSidebar()"
        />
      </q-card>
    </q-page-sticky>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NFTSelections from './NFT-Selections.vue';
import SidebarDesktop from './SidebarDesktop.vue';
import { useWineFilters } from 'src/stores/wine-filters';
import { useGeneralSearch } from 'src/stores/general-search-filter';
import 'src/css/Marketplace/header.css';
import 'src/css/Marketplace/sidebar.css';
import SidebarTablet from './SidebarTablet.vue';
import SidebarMobile from './SidebarMobile.vue';
import { useTourStore } from 'src/stores/tour-state';
import { SetSessionID } from 'src/shared/amplitude-service';

export default defineComponent({
  components: {
    NFTSelections: NFTSelections,
    SidebarDesktop: SidebarDesktop,
    SidebarTablet: SidebarTablet,
    SidebarMobile: SidebarMobile,
  },
  emits: ['totalTokens'],
  data() {
    const wineFiltersStore = useWineFilters();
    const generalSearchStore = useGeneralSearch();
    const tourStore = useTourStore();

    return {
      showToogleButton: this.isMobile() ? ref(true) : ref(false),
      wineFiltersStore,
      generalSearchStore,
      searchQuery: '',
      openSidebar: false,
      totalNFTs: ref(0),
      generalSearch: '',
      qChipRows: 0,
      tourStore,
      nftLoadingCompleted: false,
    };
  },
  watch: {
    '$q.screen.width': {
      handler() {
        this.showToogleButton = this.isMobile() ? true : false;
        this.CheckFilterMode();
      },
    },
  },
  async mounted() {
    SetSessionID('Marketplace Tab Clicked');
    this.CheckFilterMode();
    await this.marketplaceTour();
  },

  methods: {
    toggleSidebar() {
      this.openSidebar = !this.openSidebar;
    },

    isMobile(breakpoint = 880) {
      return this.$q.screen.width < breakpoint;
    },
    updateTokenCount(total: number) {
      this.totalNFTs = total;
      this.$emit('totalTokens', total);
    },
    CheckFilterMode() {
      if (this.$q.screen.width > 1023) {
        this.wineFiltersStore.setFilterMode('automatic');
      } else {
        this.wineFiltersStore.setFilterMode('manual');
      }
    },
    emitGeneralSearch() {
      this.generalSearchStore.setGeneralSearch(this.generalSearch);
      this.generalSearchStore.indexGeneralSearchKey();
      this.generalSearch = '';
    },
    truncateChipText(filter: string) {
      const checkForPriceFilter = filter.split(' ')[0];
      if (checkForPriceFilter == 'from' || checkForPriceFilter == 'to') {
        return filter;
      }
      const splitText = filter.split(',');
      const newSplitText = splitText[0].split(' ');
      if (newSplitText.length > 2) {
        filter = `${newSplitText[0]} ${newSplitText[1]} ${newSplitText[2].slice(
          0,
          2
        )}...`;
      } else {
        if (splitText.length > 1) {
          splitText[1] = splitText[1].replace(/\s/g, '');
          filter = `${splitText[0]}, ${splitText[1].slice(0, 2)}...`;
        }
      }
      return filter;
    },
    onResize(size: { width: number; height: number }) {
      if (this.$q.screen.width > 1023) {
        const rows = size.height / 32;
        this.qChipRows = rows;
      }
    },
    calculateExtraHeightNFTs(rows: number) {
      const extraHeight = rows * 32 - 32;
      return `max-height: calc(95% - ${(-150 - extraHeight) * -1}px)`;
    },
    calculateExtraHeightSidebar(rows: number) {
      const extraHeight = rows * 32 - 32;
      return `max-height: calc(100% - ${(-200 - extraHeight) * -1}px)`;
    },
    async marketplaceTour() {
			if(this.tourStore.marketplaceCompleted) return;
      let screenSize = '';
      if (this.$q.screen.width > 1023) screenSize = 'lg';
      else if (this.$q.screen.width > 599) screenSize = 'sm';
      else screenSize = 'xs';
      this.$shepherd.complete();
      await this.waitForLoad();
      this.$shepherd.addSteps([
        {
          id: 'marketplace-sidebar',
          attachTo: {
            element: `#marketplace-sidebar-${screenSize}`,
            on: screenSize === 'xs' ? 'top' : 'left',
          },
          text: 'You can filter out the particular metadata here.',
          buttons: [
            {
              text: 'Continue',
              action: () => {
                this.$shepherd.next();
              },
            },
            {
              text: 'Skip',
              action: () => {
                this.tourStore.setMarketplaceCompleted();
                this.$shepherd.cancel();
              },
            },
          ],
        },
        {
          id: 'marketplace-nfts',
          attachTo: {
            element: '#marketplace-nfts',
            on: 'top',
          },
          text: 'You can select any NFTs here.',
          buttons: [
            {
              text: 'Continue',
              action: () => {
                this.$shepherd.complete();
                this.tourStore.setMarketplaceCompleted();
              },
            },
            // {
            //   text: 'Skip',
            //   action: () => {
            //     this.tourStore.setMarketplaceCompleted();
            //     this.$shepherd.cancel();
            //   },
            // },
          ],
        },
      ]);
      this.$shepherd.start();
			this.tourStore.setMarketplaceCompleted();
    },
    waitForLoad() {
      return new Promise<void>(resolve => {
        const checkValue = () => {
          if (!this.tourStore.suggestedWinesDialog && !!this.totalNFTs) {
            resolve();
          } else {
            setTimeout(checkValue, 100); // wait for 100 milliseconds before checking again
          }
        };
        checkValue();
      });
    },
  },
});
</script>

<style scoped>
:deep(.header-clear-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
:deep(.sidebar-sticky-filter-icon.btn--no-hover .q-focus-helper) {
  display: none;
}
:deep(.filter-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
