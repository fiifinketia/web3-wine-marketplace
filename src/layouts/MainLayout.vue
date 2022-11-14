<template>
  <ConnectWallet v-if="showConnectWallet" @clicked="onOpenModals($event)" />
  <MyWallet v-if="showMyWallet" @clicked="onOpenModals($event)" />
  <BurgerMenu v-if="showBurgerMenu" />

  <q-layout view="lHh Lpr lFf">
    <q-header
      class="nav-bar q-py-xs"
      :style="showModals && { 'z-index': '-1' }"
    >
      <q-toolbar class="row justify-between items-center">
        <div
          class="nav-bar-container-left"
          @click="
            {
            }
          "
        >
          <q-img
            class="logo"
            src="../../public/images/WiV-logo.svg"
            @click="redirectin('home')"
          />
        </div>
        <div class="nav-bar-container-center row items-center">
          <q-btn-dropdown
            class="btn-dropdown-menu dropdown-center"
            dense
            flat
            label="Marketplace"
          >
            <div class="q-btn-menu-div">
              <q-list>
                <q-item
                  v-close-popup
                  clickable
                  @click="
                    {
                    }
                  "
                >
                  <q-item-section>
                    <q-item-label>All NFTs</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  v-close-popup
                  clickable
                  @click="
                    {
                    }
                  "
                >
                  <q-item-section>
                    <q-item-label>New Releases</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  v-close-popup
                  clickable
                  @click="
                    {
                    }
                  "
                >
                  <q-item-section>
                    <q-item-label>Recomended</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-btn-dropdown>
          <div
            @click="
              {
              }
            "
          >
            Stats
          </div>
          <div
            @click="
              {
              }
            "
          >
            Storefront
          </div>
        </div>
        <div class="nav-bar-container-right row items-center">
          <img
            class="icons"
            src="../../public/images/favs-icon.svg"
            @click="redirectin('favorites')"
          />
          <img
            class="icons"
            src="../../public/images/bell-icon.svg"
            @click="
              {
              }
            "
          />
          <q-btn-dropdown
            class="btn-dropdown-menu profile-dropdown"
            dense
            flat
            split
            icon="img:./images/profile-icon.svg"
          >
            <div class="q-btn-menu-div">
              <q-list>
                <q-item
									v-if="!!userStore.walletAddress"
                  v-close-popup
                  clickable
                  @click="onOpenModals('connectWallet')"
                >
                  <q-item-section>
                    <q-item-label>sign up</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  v-else
                  v-close-popup
                  clickable
                  @click="onOpenModals('myWallet')"
                >
                  <q-item-section>
                    <q-item-label>my wallet</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  v-close-popup
                  clickable
                  @click="
                    {
                    }
                  "
                >
                  <q-item-section>
                    <q-item-label>digital wine cellar</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  v-close-popup
                  clickable
                  @click="
                    {
                    }
                  "
                >
                  <q-item-section>
                    <q-item-label>settings</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  @click="
                    {
                    }
                  "
                >
                  <q-item-section>
                    <q-item-label
                      ><q-btn-dropdown
                        class="btn-dropdown-help"
                        dense
                        flat
                        disable
                        padding="0"
                        label="help"
                      >
                        <div class="q-btn-menu-div">
                          <q-list>
                            <q-item
                              v-close-popup
                              clickable
                              @click="
                                {
                                }
                              "
                            >
                              <q-item-section>
                                <q-item-label>conctact us</q-item-label>
                              </q-item-section>
                            </q-item>

                            <q-item
                              v-close-popup
                              clickable
                              @click="
                                {
                                }
                              "
                            >
                              <q-item-section>
                                <q-item-label>Faqs</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </div>
                      </q-btn-dropdown></q-item-label
                    >
                  </q-item-section>
                </q-item>
                <q-item
								v-if="!!userStore.walletAddress"
                v-close-popup
                clickable
                @click="
                  logout
                ">
                  <q-item-section>
                    <q-item-label>log out</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-btn-dropdown>
        </div>
        <img
          v-if="!showBurgerMenu"
          class="burger-menu-icon"
          src="../../public/images/burger-icon.svg"
          alt="burger-menu"
          @click="onOpenModals('burgerMenu')"
        />
        <img
          v-if="showBurgerMenu"
          class="burger-menu-exit-icon"
          src="../../public/images/x-burger-icon.svg"
          alt="burger-menu"
          @click="onCloseModals(true)"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '../css/MainLayout/MainLayout.scss';

import { useUserStore } from 'src/stores/user-store';
import ConnectWallet from './components/ConnectWallet.vue';
import BurgerMenu from './components/BurgerMenu.vue';
import MyWallet from './components/MyWallet.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    ConnectWallet,
    BurgerMenu,
    MyWallet,
  },
  data() {

    const userStore = useUserStore();


    return {
      user: true,
      showModals: false,
      showBurgerMenu: false,
      showMyWallet: false,
      showConnectWallet: false,
      userStore,
      walletAddress: '',
    };
  },

  methods: {
    redirectin(page: string) {
      switch (page) {
        case 'favorites':
          window.location.href = 'http://localhost:8080/#/favorites';
          break;

        case 'home':
          window.location.href = 'http://localhost:8080/#/';

          break;
      }
    },
    animation(
      modal: string,
      opacity: string,
      transform: string,
      zIndex: string
    ) {
      const connectBackground = document.querySelector(
        '.connect-wallet-background'
      ) as HTMLElement;
      const connectContainer = document.querySelector(
        '.connect-wallet-container'
      ) as HTMLElement;
      const walletBackground = document.querySelector(
        '.my-wallet-background'
      ) as HTMLElement;
      const walletContainer = document.querySelector(
        '.my-wallet-container'
      ) as HTMLElement;
      switch (modal) {
        case 'connectWallet':
          connectBackground.style.zIndex = zIndex;
          connectBackground.style.opacity = opacity;
          connectContainer.style.transform = transform;
          break;
        case 'myWallet':
          walletBackground.style.opacity = opacity;
          walletBackground.style.zIndex = zIndex;
          walletContainer.style.transform = transform;
      }
    },

    onOpenModals(modal: string) {
      switch (modal) {
        case 'connectWallet':
          this.showModals = true;
          this.showConnectWallet = true;
          this.animation('connectWallet', '1', 'scale(1)', '200');
					this.userStore.provider.listAccounts().then(accounts => this.userStore.walletAddress = accounts[0]);
          break;
        case 'myWallet':
          this.showModals = true;
          this.showMyWallet = true;
          this.animation('myWallet', '1', 'translateX(0%)', '200');
          break;
        case 'burgerMenu':
          this.showBurgerMenu = true;
          break;
      }
      document.body.classList.add('no-scroll');
    },

    onCloseModals(title: boolean) {
      if (title === true) {
        this.showModals = false;
        this.showBurgerMenu = false;
        this.animation('connectWallet', '0', 'scale(0.5)', '-200');
        this.animation('myWallet', '0', 'translateX(100%)', '-200');
        document.body.classList.remove('no-scroll');
      }
    },
    async logout() {
      console.log('logout');
      this.userStore.walletAddress = '';
    }
  },
});
</script>

<style></style>
