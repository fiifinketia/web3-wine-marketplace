<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <!-------------------------------------- POPUP MODALS -------------------------------------->

  <!---------------------------- CONNECT WALLET ---------------------------->

  <q-dialog
    v-model="showConnectWallet"
    class="connect-wallet-background row justify-center items-center"
  >
    <q-card class="connect-wallet-container column justify-center items-center">
      <q-card-section>
        <img src="../../public/images/wallet.svg" alt="wallet-icon" />
      </q-card-section>

      <q-card-section>
        <div class="connect-wallet-title">
          Connect your Web3 Wallet to signup.
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn
          class="connect-wallet-btns connect-btn"
          :disable="!isMetaMaskInstalled"
          unelevated
          @click="connectWallet()"
        >
          Connect wallet
        </q-btn>
        <q-btn
          class="connect-wallet-btns no-wallet-btn"
          :disable="!!isMetaMaskInstalled"
          unelevated
          @click="setupWallet"
        >
          I don't have a wallet
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!---------------------------- /CONNECT WALLET ---------------------------->

  <!---------------------------- MY WALLET ---------------------------->

  <div
    v-if="userStore.user"
    class="my-wallet-background row justify-end hidden"
  >
    <WalletDialog
      v-model="showMyWallet"
      :user="userStore.user"
      :usdc-balance="usdcBalance ? FormatNumber(usdcBalance) : ''"
      :usdt-balance="usdtBalance ? FormatNumber(usdtBalance) : ''"
      :wiva-balance="wivaBalance ? FormatNumber(wivaBalance) : ''"
      @close-my-wallet="showMyWallet = false"
      @fund-wallet="fundWallet()"
      @logout="logout"
    />
  </div>

  <!---------------------------- /MY WALLET ---------------------------->
  <!---------------------------- SETTINGS ---------------------------->
  <div v-if="userStore.user" class="row justify-end hidden">
    <SettingsDialog
      v-model="showSettings"
      @close-settings="showSettings = false"
    />
  </div>

  <!-- Terms and Conditions -->
  <wiv-toc-dialog
    v-model="showTermsAndConditions"
    full-height
    class="terms-and-conditions-background"
    @toc-accepted="showTermsAndConditions = false"
  />

  <!-- /Terms and Conditions -->

  <BurgerMenu
    v-if="showBurgerMenu"
    @closeBurgerMenu="onBurgerMenu('close')"
    @openNotifications="showNotifications = true"
    @logout="logout"
    @openConnectWallet="showConnectWallet = true"
    @openMyWallet="showMyWallet = true"
    @openSettings="showSettings = true"
    @openHelpCenterFaqs="openHelpCenter('topics')"
    @openHelpCenterSupport="openHelpCenter('support')"
  />

  <HelpCenterDialog
    v-model="showHelpCenter"
    :open-tab="openHelpCenterTab"
    @close-help-center="showHelpCenter = false"
  />

  <NotificationsDialog v-model="showNotifications" @open-settings="showNotifications = false; showSettings = true"/>

  <ProfileErrors
    v-model="openUserErrorDialog"
    :error-type="'user-invalid'"
    :error-title="'Unable to connect wallet'"
    :error-message="'Failed to connect wallet. Please try again, or contact support.'"
  />

  <!-------------------------------------- /POPUP MODALS -------------------------------------->
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="nav-bar q-py-xs"
      :style="(showConnectWallet || showMyWallet) && { 'z-index': '-1' }"
    >
      <q-toolbar class="row justify-between items-center">
        <div class="nav-bar-container-left row items-center">
          <q-img
            v-if="$q.screen.width > 600"
            class="logo"
            src="../../public/images/WiV-logo.svg"
            @click="$router.push('/')"
          />
          <span
            v-else-if="$router.currentRoute.value.path === '/orders'"
            class="logo-replacement-text"
          >
            Profile
          </span>
          <span
            v-else-if="$router.currentRoute.value.path === '/marketplace'"
            class="logo-replacement-text"
            @click="$router.push('/')"
          >
            Marketplace
          </span>
          <span
            v-else-if="$router.currentRoute.value.path === '/favorites'"
            class="logo-replacement-text"
          >
            Favorites
          </span>
          <span v-else class="logo-replacement-text" @click="$router.push('/')">
            WiV
          </span>
        </div>
        <div class="nav-bar-container-center row items-center">
          <q-btn-dropdown
            class="btn-dropdown-menu dropdown-center"
            dense
            flat
            :ripple="false"
            label="Marketplace"
          >
            <div class="q-btn-menu-div">
              <q-list>
                <q-item
                  v-close-popup
                  clickable
                  :to="{ path: '/marketplace', query: { tab: 'nfts' } }"
                >
                  <q-item-section>
                    <q-item-label>All NFTs</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  v-close-popup
                  clickable
                  :to="{ path: '/marketplace', query: { tab: 'releases' } }"
                >
                  <q-item-section>
                    <q-item-label>New Releases</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  v-close-popup
                  clickable
                  :to="{
                    path: '/marketplace',
                    query: { tab: 'recommended' },
                  }"
                >
                  <q-item-section>
                    <q-item-label>Recommended</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-btn-dropdown>
          <div clickable class="text-h6">
            Stats
            <q-badge
              rounded
              color="red"
              align="top"
              label="Soon"
              style="padding-bottom: 5px"
            />
          </div>
          <div clickable class="text-h6">
            Storefront
            <q-badge
              rounded
              color="red"
              align="top"
              label="Soon"
              style="padding-bottom: 5px"
            />
          </div>
        </div>
        <div class="row">
          <div v-if="$q.screen.width > 768" class="row items-center">
            <q-btn
              v-if="!!walletAddress"
              dense
              :ripple="false"
              unelevated
              flat
              class="route-btn btn--no-hover q-mx-xs no-padding"
              :to="{ path: '/favorites' }"
            >
              <img src="../../public/images/favs-icon.svg" class="icons" />
            </q-btn>
            <q-btn
              v-if="!!walletAddress"
              dense
              :ripple="false"
              unelevated
              flat
              class="route-btn btn--no-hover q-mx-xs no-padding profile-dropdown"
              icon="app:bell-icon"
            >
              <NotificationsPopup @open-settings="showNotifications = false; showSettings = true"/>
              <q-badge
                v-if="notificationsFetched && !notificationsErrorEncountered && notifications.filter(f => !f.viewed).length > 0"
                rounded
                floating
                color="red"
              />
            </q-btn>
            <q-btn
              class="btn-dropdown-menu profile-dropdown q-mx-xs route-btn btn--no-hover"
              :ripple="false"
              dense
              flat
              unelevated
              icon="app:profile"
            >
              <q-menu
                class="q-btn-menu-div no-scroll"
                max-width="300px"
                max-height="100vh"
              >
                <q-toolbar v-if="!!walletAddress" class="text-white">
                  <q-chip
                    v-close-popup
                    clickable
                    color="white"
                    class="text-bold"
                    @click="showMyWallet = true"
                  >
                    <q-avatar size="24px">
                      <img :src="userStore.user?.avatar" />
                    </q-avatar>
                    {{ userStore.user?.username || walletAddress.slice(0, 10) }}
                  </q-chip>
                </q-toolbar>
                <q-list>
                  <q-item v-if="!!walletAddress" clickable>
                    <q-expansion-item
                      id="mainlayout-expansion-item"
                      dense
                      dense-toggle
                      expand-separator
                      label="profile"
                      group="menu-expansion"
                    >
                      <div>
                        <q-list class="q-ml-md">
                          <q-item
                            v-close-popup
                            clickable
                            :to="{
                              path: '/orders',
                              query: { tab: 'listings' },
                            }"
                          >
                            <q-item-section>
                              <q-item-label class="text-no-wrap">
                                listings
                              </q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-item
                            v-close-popup
                            clickable
                            :to="{
                              path: '/orders',
                              query: { tab: 'incoming' },
                            }"
                          >
                            <q-item-section>
                              <q-item-label class="text-no-wrap">
                                incoming offers
                              </q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-item
                            v-close-popup
                            clickable
                            :to="{
                              path: '/orders',
                              query: { tab: 'outgoing' },
                            }"
                          >
                            <q-item-section>
                              <q-item-label class="text-no-wrap">
                                outgoing offers
                              </q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-item
                            v-close-popup
                            clickable
                            :to="{
                              path: '/orders',
                              query: { tab: 'transactions' },
                            }"
                          >
                            <q-item-section>
                              <q-item-label class="text-no-wrap">
                                trading history
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                    </q-expansion-item>
                  </q-item>
                  <q-item
                    v-else
                    v-close-popup
                    clickable
                    @click="showConnectWallet = true"
                  >
                    <q-item-section>
                      <q-item-label>connect wallet</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item
                    v-close-popup
                    clickable
                    href="https://dwc.wiv-tech.org/#/"
                    target="_blank"
                  >
                    <q-item-section>
                      <q-item-label class="text-no-wrap"
                        >digital wine cellar</q-item-label
                      >
                    </q-item-section>
                  </q-item>

                  <q-item
                    v-if="!!walletAddress"
                    v-close-popup
                    clickable
                    @click="showSettings = true"
                  >
                    <q-item-section>
                      <q-item-label>settings</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-expansion-item
                      id="mainlayout-expansion-item"
                      dense
                      dense-toggle
                      expand-separator
                      label="help"
                      group="menu-expansion"
                    >
                      <div>
                        <q-list class="q-ml-md">
                          <q-item
                            v-close-popup
                            clickable
                            @click="openHelpCenter('support')"
                          >
                            <q-item-section>
                              <q-item-label>contact us</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item
                            v-close-popup
                            clickable
                            @click="openHelpCenter('topics')"
                          >
                            <q-item-section>
                              <q-item-label>Faqs</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                    </q-expansion-item>
                  </q-item>
                  <q-item
                    v-if="!!walletAddress"
                    v-close-popup
                    clickable
                    @click="logout"
                  >
                    <q-item-section>
                      <q-item-label>log out</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <img
          v-if="!showBurgerMenu"
          class="burger-menu-icon"
          src="../../public/images/burger-icon.svg"
          alt="burger-menu"
          @click="onBurgerMenu('open')"
        />
        <img
          v-else
          class="burger-menu-exit-icon"
          src="../../public/images/x-burger-icon.svg"
          alt="burger-menu"
          @click="onBurgerMenu('close')"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view
        @open-wallet-sidebar="showMyWallet = !showMyWallet"
        @open-connect-wallet="showConnectWallet = true"
        @open-help-center-support="openHelpCenter('support')"
        @open-help-center-faqs="openHelpCenter('topics')"
      />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MetaMaskOnboarding from '@metamask/onboarding';
import transakSDK from '@transak/transak-sdk';

import '../css/MainLayout/MainLayout.scss';
import '../css/MainLayout/ConnectWallet.css';
import '../css/MainLayout/MyWallet.css';
import '../css/MainLayout/NotificationsDialog.css';
import 'src/css/reusable.css';

import { useUserStore } from 'src/stores/user-store';
import BurgerMenu from './components/BurgerMenu.vue';
import WalletDialog from './components/WalletDialog.vue';
import SettingsDialog from './components/SettingsDialog.vue';
import HelpCenterDialog from './components/HelpCenterDialog.vue';
import NotificationsPopup from 'src/pages/Notifications/NotificationsPopup.vue'
import NotificationsDialog from 'src/pages/Notifications/NotificationsDialog.vue'
import { useNFTStore } from 'src/stores/nft-store';
import { ordersStore } from 'src/stores/orders-store';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
import { useTourStore } from 'src/stores/tour-state';
import { FormatNumber } from 'src/shared/currency.helper';
import ProfileErrors from 'src/pages/SharedPopups/ProfileErrors.vue';
import { useNotificationsStore } from 'src/stores/notifications-store';
import { mapState } from 'pinia';

export default defineComponent({
  name: 'MainLayout',
  components: {
    BurgerMenu,
    WalletDialog,
    SettingsDialog,
    NotificationsPopup,
    NotificationsDialog,
    HelpCenterDialog,
    ProfileErrors: ProfileErrors,
  },
  data() {
    const userStore = useUserStore();
    const nftStore = useNFTStore();
    const orderStore = ordersStore();
    const tourStore = useTourStore();
    const isMetaMaskInstalled = window.ethereum && window.ethereum.isMetaMask;
    return {
      showBurgerMenu: false,
      showMyWallet: false,
      showSettings: false,
      showHelpCenter: false,
      showConnectWallet: false,
      showTermsAndConditions: false,
      showNotifications: false,
      openHelpCenterTab: ref('topics'),
      userStore,
      nftStore,
      orderStore,
      walletAddress: userStore.walletAddress,
      isMetaMaskInstalled,
      usdtBalance: 0,
      usdcBalance: 0,
      wivaBalance: 0,
      tourStore,

      FormatNumber,

      openUserErrorDialog: false,
    };
  },
  computed: {
    ...mapState(useNotificationsStore, {
      notifications: store => store.storedNotifications,
      notificationsFetched: store => store.notificationsFetched,
      notificationsErrorEncountered: store => store.notificationsErrorEncountered
    })
  },
  watch: {
    $route: {
      handler: function () {
        if (
          this.$route.query?.connect &&
          this.$route.query?.connect === 'open'
        ) {
          this.showConnectWallet = true;
        }
      },
      immediate: true,
    },
    'userStore.walletAddress': {
      handler: function (walletAddress: string) {
        this.walletAddress = walletAddress;
        if (!!walletAddress) {
          this.ReInitAmplitude(walletAddress);
        }
      },
    },
  },

  async mounted() {
    await this.userStore.checkConnection();
    if (!this.walletAddress) {
      this.ClearStore();
    } else {
      this.ReInitAmplitude(this.walletAddress);
      require('src/shared/notifications-service');
      const walletBalances = await this.userStore.getWalletBalance();
      if (walletBalances) {
        const {
          _usdtBalance: usdtBalance,
          _usdcBalance: usdcBalance,
          _wivaBalance: wivaBalance,
        } = walletBalances;
        Object.assign(this, { usdtBalance, usdcBalance, wivaBalance });
      }
    }
  },
  methods: {
    openHelpCenter(tab: string) {
      this.openHelpCenterTab = tab;
      this.showHelpCenter = true;
    },
    async fundWallet() {
      let transak = new transakSDK({
        apiKey: process.env.TRANSAK_API_KEY, // Your API Key
        environment: process.env.NODE_ENV == 'production' ? 'PRODUCTION' : 'STAGING', // STAGING/PRODUCTION
        widgetHeight: '625px',
        widgetWidth: '500px',
        // Examples of some of the customization parameters you can pass
        defaultCryptoCurrency: 'USDT', // Example 'ETH'
        walletAddress: this.userStore.walletAddress, // Your customer's wallet address
        themeColor: '#3586ff', // App theme color
        fiatCurrency: 'GBP', // If you want to limit fiat selection eg 'GBP'
        // email: this.userStore.user?.email, // Your customer's email address
        redirectURL: this.$route.fullPath, // Redirect URL of your app
      });
      this.showMyWallet = false;
      transak.init();

      // transak.on(
      // 	transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL,
      // 	async (orderData: any) => {
      // 		// TODO: Notitfy user on balance update
      // 		this.balance = await this.userStore.getWalletBalance();
      // 		// console.log(orderData);
      // 	}
      // );
      transak.close();
      // This is so that the balance is updated after new funds are imported
    },
    ReInitAmplitude(walletAddress: string) {
      // console.log(process.env.AMP_API_KEY, walletAddress)
      this.$amplitude.init(<string>process.env.AMP_API_KEY, walletAddress, {
        defaultTracking: {
          sessions: true,
          pageViews: true,
        },
      });
    },
    async connectWallet() {
      this.showConnectWallet = false;
      if (!this.tourStore.termsAndConditionsAgreed) {
        this.showTermsAndConditions = true;
        this.$watch('tourStore.termsAndConditionsAgreed', async newValue => {
          if (newValue) {
            await this._connectWallet();
          }
        });
      } else {
        await this._connectWallet();
      }
    },

    async _connectWallet() {
      try {
        await this.userStore.connectWallet();
        if (!this.$route.query?.next) {
          this.$router.go(0);
        } else {
          const next = this.$route.query?.next as string;
          await this.$router.replace({ path: next, replace: true });
        }
      } catch (error) {
        this.openUserErrorDialog = true;
        setTimeout(() => {
          this.openUserErrorDialog = false;
        }, 2000);
        throw error;
      }
    },

    setupWallet() {
      this.isMetaMaskInstalled = window.ethereum && window.ethereum.isMetaMask;
      if (!this.isMetaMaskInstalled) {
        //If it isn't installed we ask the user to click to install it
        const onboarding = new MetaMaskOnboarding({
          forwarderOrigin: this.$route.fullPath,
        });
        onboarding.startOnboarding();
      }
    },

    onBurgerMenu(modal: string) {
      switch (modal) {
        case 'open':
          this.showBurgerMenu = true;

          document.body.classList.add('no-scroll');
          break;
        case 'close':
          this.showBurgerMenu = false;
          document.body.classList.remove('no-scroll');
          break;
      }
    },

    async logout() {
      this.showMyWallet = false;
      this.ClearStore();

      if (this.$route.meta.requiresAuth) {
        this.$router.push('/');
        return;
      }
      window.location.reload();
    },
    ClearStore() {
      this.nftStore.ownedNFTs = [] as TokenIdentifier[];
      this.nftStore.fetchNFTsStatus = false;
      this.orderStore.$reset();
      this.userStore.$reset();
    },
    installMetaMask() {
      this.$q
        .dialog({
          dark: false,
          title: 'Confirm',
          message:
            'You need a metamask wallet to make transactions, do you want to install MetaMask now?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          const onboarding = new MetaMaskOnboarding({
            forwarderOrigin: this.$route.fullPath,
          });
          onboarding.startOnboarding();
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  },
});
</script>

<style scoped>
:deep(.route-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
