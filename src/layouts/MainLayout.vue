<template>
  <ConnectWallet @clicked="onCloseModals($event)" />
  <MyWallet @clicked="onCloseModals($event)" />
  <BurgerMenu v-if="showBurgerMenu" />

  <q-layout view="lHh Lpr lFf">
    <q-header
      class="nav-bar q-py-xs"
      :style="showModals && { 'z-index': '-1' }"
    >
      <q-toolbar class="row justify-between items-center">
        <div
          @click="
            {
            }
          "
          class="nav-bar-container-left"
        >
          <q-img
            @click="
              {
              }
            "
            class="logo"
            src="../assets/images/WiV-logo.svg"
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
                  clickable
                  v-close-popup
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
                  clickable
                  v-close-popup
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
                  clickable
                  v-close-popup
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
            @click="
              {
              }
            "
            class="icons"
            src="../assets/images/favs-icon.svg"
          />
          <img
            @click="
              {
              }
            "
            class="icons"
            src="../assets/images/bell-icon.svg"
          />
          <q-btn-dropdown
            class="btn-dropdown-menu profile-dropdown"
            dense
            flat
            split
            icon="img:data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAzOCAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjM4IiBoZWlnaHQ9IjM4IiByeD0iNiIgZmlsbD0iI0Q5RThGRiIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPGNpcmNsZSBjeD0iMTkuNSIgY3k9IjEyLjUiIHI9IjUiIHN0cm9rZT0iIzIxMjEzMSIvPgo8cGF0aCBkPSJNMjkuNSAyNUMyOS41IDI2LjM4ODEgMjguNDYxNiAyNy43NTQ5IDI2LjUzODcgMjguODAzN0MyNC42MzQ4IDI5Ljg0MjIgMjEuOTcwNCAzMC41IDE5IDMwLjVDMTYuMDI5NiAzMC41IDEzLjM2NTIgMjkuODQyMiAxMS40NjEzIDI4LjgwMzdDOS41Mzg0MSAyNy43NTQ5IDguNSAyNi4zODgxIDguNSAyNUM4LjUgMjMuNjExOSA5LjUzODQxIDIyLjI0NTEgMTEuNDYxMyAyMS4xOTYzQzEzLjM2NTIgMjAuMTU3OCAxNi4wMjk2IDE5LjUgMTkgMTkuNUMyMS45NzA0IDE5LjUgMjQuNjM0OCAyMC4xNTc4IDI2LjUzODcgMjEuMTk2M0MyOC40NjE2IDIyLjI0NTEgMjkuNSAyMy42MTE5IDI5LjUgMjVaIiBzdHJva2U9IiMyMTIxMzEiLz4KPC9zdmc+Cg=="
          >
            <div class="q-btn-menu-div">
              <q-list>
                <q-item
                  v-if="!user"
                  clickable
                  v-close-popup
                  @click="onOpenModals('connectWallet')"
                >
                  <q-item-section>
                    <q-item-label>sign up</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  v-if="user"
                  clickable
                  v-close-popup
                  @click="onOpenModals('myWallet')"
                >
                  <q-item-section>
                    <q-item-label>my wallet</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
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
                  clickable
                  v-close-popup
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
                        label="help"
                      >
                        <div class="q-btn-menu-div">
                          <q-list>
                            <q-item
                              clickable
                              v-close-popup
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
                              clickable
                              v-close-popup
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
                <q-item clickable v-close-popup @click="user = false">
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
          src="../assets/images/burger-icon.svg"
          alt="burger-menu"
          @click="onOpenModals('burgerMenu')"
        />
        <img
          v-if="showBurgerMenu"
          class="burger-menu-exit-icon"
          src="../assets/images/x-burger-icon.svg"
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

import ConnectWallet from './components/ConnectWallet.vue';
import BurgerMenu from './components/BurgerMenu.vue';
import MyWallet from './components/MyWallet.vue';

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      user: true,
      showModals: false,
      showBurgerMenu: false,
    };
  },
  components: {
    ConnectWallet,
    BurgerMenu,
    MyWallet,
  },

  methods: {
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
          this.animation('connectWallet', '1', 'scale(1)', '200');
          break;
        case 'myWallet':
          this.showModals = true;
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
  },
});
</script>

<style></style>
