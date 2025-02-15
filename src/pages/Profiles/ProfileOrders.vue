<template>
  <q-page class="q-mb-sm">
    <div>
      <section class="q-gutter-y-md">
        <q-tabs
          v-if="$q.screen.width > 600"
          v-model="tab"
          class="text-grey profile-tabs"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          no-caps
        >
          <q-tab name="listings" label="Listings" />
          <q-tab name="incoming" label="Incoming Offers" />
          <q-tab name="outgoing" label="Outgoing Offers" />
          <q-tab name="transactions" label="Trading History" />
        </q-tabs>
        <q-tabs
          v-else
          v-model="tab"
          class="text-grey q-py-sm q-px-md bg-gradient_blue-green"
          content-class="row justify-between items-center"
          indicator-color="primary"
          no-caps
        >
          <div v-if="IsSearchedForTab()" class="q-mr-xs">
            <q-btn
              dense
              unelevated
              flat
              no-caps
              class="btn--no-hover"
              style="width: fit-content;"
              @click="ResetSearchForTab()"
            >
              <img
                src="../../assets/back-left-white.svg"
                style="height: 20px; width: 11.5px"
              />
              <span class="profile-back-text q-pl-md" style="color: white">
                {{ BackButtonLabel() }}
              </span>
            </q-btn>
          </div>
          <span v-else-if="$q.screen.width > 350" class="col profile-tab-title">
            {{ CountLabel() }}
            <span class="profile-tab-count"> {{ countForTab }} </span>
          </span>
          <q-btn-dropdown
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
                  tabLabel = 'Listings';
                  tab = 'listings';
                "
              >
                <span class="profile-dropdown-selection"> Listings </span>
              </q-item>

              <q-item
                clickable
                @click="
                  tabLabel = 'Incoming Offers';
                  tab = 'incoming';
                "
              >
                <span class="profile-dropdown-selection">
                  Incoming Offers
                </span>
              </q-item>

              <q-item
                clickable
                @click="
                  tabLabel = 'Outgoing Offers';
                  tab = 'outgoing';
                "
              >
                <span class="profile-dropdown-selection">
                  Outgoing Offers
                </span>
              </q-item>

              <q-item
                clickable
                @click="
                  tabLabel = 'Trading History';
                  tab = 'transactions';
                "
              >
                <span class="profile-dropdown-selection">
                  Trading History
                </span>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-tabs>

        <q-separator class="q-ma-none" />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            class="q-pa-none"
            :class="$q.screen.width > 600 ? 'q-px-sm' : ''"
            name="listings"
          >
            <Unconnected
              v-if="!isConnected"
              @open-connect-wallet="$emit('openConnectWallet')"
            />
            <Listings v-else @listings-amount="val => (countForTab = val)" />
          </q-tab-panel>
          <q-tab-panel
            class="q-pa-none"
            :class="$q.screen.width > 600 ? 'q-px-sm' : ''"
            name="incoming"
          >
            <Unconnected
              v-if="!isConnected"
              @open-connect-wallet="$emit('openConnectWallet')"
            />
            <IncomingOffers
              v-else
              @incoming-amount="val => (countForTab = val)"
            />
          </q-tab-panel>
          <q-tab-panel
            class="q-pa-none"
            :class="$q.screen.width > 600 ? 'q-px-sm' : ''"
            name="outgoing"
          >
            <Unconnected
              v-if="!isConnected"
              @open-connect-wallet="$emit('openConnectWallet')"
            />
            <OutgoingOffers
              v-else
              @outgoing-amount="val => (countForTab = val)"
            />
          </q-tab-panel>
          <q-tab-panel
            class="q-pa-none"
            :class="$q.screen.width > 600 ? 'q-px-sm' : ''"
            name="transactions"
          >
            <Unconnected
              v-if="!isConnected"
              @open-connect-wallet="$emit('openConnectWallet')"
            />
            <Transactions
              v-else
              @transactions-amount="val => (countForTab = val)"
            />
          </q-tab-panel>
        </q-tab-panels>
      </section>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import 'src/css/Profile/shared.css';
import IncomingTab from './Tabs/IncomingTab.vue';
import OutgoingTab from './Tabs/OutgoingTab.vue';
import ListingsTab from './Tabs/ListingsTab.vue';
import TransactionsTab from './Tabs/TransactionsTab.vue';
import UnconnectedWallet from './UnconnectedWallet.vue';
import { useUserStore } from 'src/stores/user-store';
import { ordersStore } from 'src/stores/orders-store';
import { mapState } from 'pinia';

export default defineComponent({
  components: {
    IncomingOffers: IncomingTab,
    OutgoingOffers: OutgoingTab,
    Listings: ListingsTab,
    Transactions: TransactionsTab,
    Unconnected: UnconnectedWallet,
  },
  emits: ['openConnectWallet'],

  data() {
    const queryT = this.$router.currentRoute.value.query.tab as string;
    const userStore = useUserStore();
    const store = ordersStore();
    return {
      tab: ref(queryT || 'listings'),
      tabLabel: '',
      countForTab: 0,
      isConnected: false,
      userStore,
      store
    };
  },
  computed: {
    ...mapState(ordersStore, {
      txnSearched: store => store.getTransactionBrandFilterStatus,
      outgoingSearched: store => store.getOutgoingBrandFilterStatus,
      listingSearched: store => store.getListingBrandFilterStatus,
      incomingSearched: store => store.getIncomingBrandFilterStatus
    }),
  },
  watch: {
    $route: {
      handler: function (to, from) {
        if (from && to.query.tab) {
          const tabTo = to.query.tab;
          if (
            tabTo !== from.query.tab &&
            (tabTo === 'listings' ||
              tabTo === 'outgoing' ||
              tabTo === 'incoming' ||
              tabTo === 'transactions')
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
          case 'listings':
            this.$router.push({ path: 'orders', query: { tab: 'listings' } });
            this.tabLabel = 'Listings';
            break;
          case 'outgoing':
            this.$router.push({ path: 'orders', query: { tab: 'outgoing' } });
            this.tabLabel = 'Outgoing Offers';
            break;
          case 'incoming':
            this.$router.push({ path: 'orders', query: { tab: 'incoming' } });
            this.tabLabel = 'Incoming Offers';
            break;
          case 'transactions':
            this.$router.push({
              path: 'orders',
              query: { tab: 'transactions' },
            });
            this.tabLabel = 'Trading History';
            break;
        }
      },
    },
    'userStore.walletAddress': {
      handler(val) {
        if (!!val) {
          this.isConnected = true;
        } else {
          this.countForTab = 0;
          this.isConnected = false;
        }
      },
    },
  },

  mounted() {
    const wallet = this.userStore.walletAddress;
    if (!!wallet) {
      this.isConnected = true;
    }
    const tab = this.tab;
    this.TabLabelSetter(tab);
  },

  methods: {
    CountLabel() {
      switch (this.tabLabel) {
        case 'Listings':
          return 'Listings';
        case 'Incoming Offers':
          return 'Offers';
        case 'Outgoing Offers':
          return 'Offers';
        case 'Trading History':
          return 'TXN';
      }
    },
    IsSearchedForTab() {
      switch (this.tabLabel) {
        case 'Listings':
          return this.listingSearched;
        case 'Incoming Offers':
          return this.incomingSearched;
        case 'Outgoing Offers':
          return this.outgoingSearched;
        case 'Trading History':
          return this.txnSearched;
      }
    },
    BackButtonLabel() {
      switch (this.tabLabel) {
        case 'Listings':
          return 'All List...'
        case 'Incoming Offers':
          return 'All Inc...'
        case 'Outgoing Offers':
          return 'All Off...'
        case 'Trading History':
          return 'All TXN...'
      }
    },
    TabLabelSetter(tab: string) {
      switch (tab) {
        case 'listings':
          this.tabLabel = 'Listings';
          break;
        case 'outgoing':
          this.tabLabel = 'Outgoing Offers';
          break;
        case 'incoming':
          this.tabLabel = 'Incoming Offers';
          break;
        case 'transactions':
          this.tabLabel = 'Trading History';
          break;
        default:
          this.tabLabel = 'Listings';
          break;
      }
    },
    ResetSearchForTab() {
      switch (this.tabLabel) {
        case 'Listings':
          this.store.setListingTabKey();
          break;
        case 'Incoming Offers':
          this.store.setIncomingTabKey();
          break;
        case 'Outgoing Offers':
          this.store.setOutgoingTabKey();
          break;
        case 'Trading History':
          this.store.setTransactionTabKey()
          break;
      }
    }
  },
});
</script>

<style></style>
