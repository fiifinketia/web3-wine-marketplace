<template>
  <q-page
    v-scroll.self="$q.screen.width > 600 ? '' : onScroll"
    class="q-mb-sm"
    style="min-height: 0"
  >
    <div>
      <section class="q-gutter-y-md">
        <q-tabs
          v-model="tab"
          class="text-grey hidden-a-599 marketplace_tab-label"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          no-caps
        >
          <q-tab name="nfts" label="Marketplace" />
          <q-tab name="releases" label="Releases" />
          <q-tab name="recommended" label="Recommended" />
        </q-tabs>
        <q-tabs
          v-model="tab"
          class="row justify-between items-center text-grey hidden-b-599 q-pa-sm q-px-md bg-gradient_blue-green"
          indicator-color="primary"
          no-caps
        >
          <span v-if="$q.screen.width > 350" class="col profile-tab-title">
            NFTs <span class="profile-tab-count"> {{ totalTokens }} </span>
          </span>
          <q-btn-dropdown
            v-model="marketplaceDropdown"
            style="height: 42px"
            no-caps
            color="white"
            text-color="secondary"
            dropdown-icon="none"
            icon-right="app:down_arrow"
            auto-close
            class="col-auto profile-dropdown-container"
            content-class="profile-dropdown-menu"
            :label="tabLabel"
          >
            <q-list>
              <q-item
                clickable
                @click="
                  tabLabel = 'Marketplace';
                  tab = 'nfts';
                "
              >
                <span class="profile-dropdown-selection"> Marketplace </span>
              </q-item>

              <q-item
                clickable
                @click="
                  tabLabel = 'Releases';
                  tab = 'releases';
                "
              >
                <span class="profile-dropdown-selection"> Releases </span>
              </q-item>
              <q-item
                clickable
                @click="
                  tabLabel = 'Recommended';
                  tab = 'recommended';
                "
              >
                <span class="profile-dropdown-selection"> Recommended </span>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-tabs>

        <q-separator class="q-ma-none" />
        <q-tab-panels v-model="tab" animated class="q-pa-none">
          <q-tab-panel class="q-pa-none q-px-none" name="nfts">
            <AllNFTsTab @total-tokens="(total:number) => totalTokens = total" />
          </q-tab-panel>
          <q-tab-panel class="q-pa-none q-px-none" name="releases">
            <NewlyReleasedTab
              @total-tokens="(total:number) => totalTokens = total"
            />
          </q-tab-panel>
          <q-tab-panel class="q-pa-none q-px-none" name="recommended">
            <RecommendedTab />
          </q-tab-panel>
        </q-tab-panels>
      </section>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import 'src/css/Profile/shared.css';
import AllNFTsTab from './components/AllNFTsTab.vue';
import NewReleasedTab from './components/NewReleasedTab.vue';
import RecommendedTab from './components/Recommended/RecommendedTab.vue';
import { TrackClickEvent } from 'src/shared/amplitude-service';

export default defineComponent({
  components: {
    AllNFTsTab: AllNFTsTab,
    NewlyReleasedTab: NewReleasedTab,
    RecommendedTab: RecommendedTab,
  },
  emits: ['openConnectWallet'],

  data() {
    const queryT = this.$router.currentRoute.value.query.tab as string;
    return {
      tab: ref(queryT || 'nfts'),
      tabLabel: '',
      totalTokens: ref(0),
      marketplaceDropdown: false,
    };
  },

  watch: {
    $route: {
      handler: function (to, from) {
        if (from && to.query.tab) {
          const tabTo = to.query.tab;
          if (
            tabTo !== from.query.tab &&
            (tabTo === 'nfts' ||
              tabTo === 'releases' ||
              tabTo === 'recommended')
          ) {
            this.tab = tabTo;
            this.TabLabelSetter(tabTo);
          }
        }
      },
      immediate: true,
    },

    tab: {
      handler(val) {
        switch (val) {
          case 'nfts':
            this.$router.push({ path: 'marketplace', query: { tab: 'nfts' } });
            this.tabLabel = 'Marketplace';
            TrackClickEvent('Marketplace Tab Clicked');
            break;
          case 'releases':
            this.$router.push({
              path: 'marketplace',
              query: { tab: 'releases' },
            });
            this.tabLabel = 'Releases';
            TrackClickEvent('Releases Tab Clicked');
            break;
          case 'recommended':
            this.$router.push({
              path: 'marketplace',
              query: { tab: 'recommended' },
            });
            this.tabLabel = 'Recommended';
            TrackClickEvent('Recommended NFTs Tab Clicked');
            break;
        }
      },
    },
  },

  mounted() {
    const tab = this.tab;
    this.TabLabelSetter(tab);
  },

  methods: {
    getLabel(query: string) {
      switch (query) {
        case 'nfts':
          return 'Marketplace';
        case 'releases':
          return 'Releases';
        case 'recommended':
          return 'Recommended';
      }
    },
    onScroll() {
      if (!!this.marketplaceDropdown) {
        this.marketplaceDropdown = false;
      }
    },
    TabLabelSetter(tab: string) {
      switch (tab) {
        case 'nfts':
          this.tabLabel = 'Marketplace';
          break;
        case 'releases':
          this.tabLabel = 'Releases';
          break;
        case 'recommended':
          this.tabLabel = 'Recommended';
          break;
        default:
          this.tabLabel = 'Marketplace';
          break;
      }
    },
  },
});
</script>

<style>
.marketplace_tab-drowpdown .q-icon {
  width: 0.7rem;
}
.marketplace_tab-label {
  font-family: 'Obviously-Bold';
  font-size: 18px;
}
</style>
