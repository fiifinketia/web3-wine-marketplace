<template>
  <ConnectWallet @clicked="onConnectWallet($event)" v-if="showConnectWallet" />
  <MyWallet @clicked="onConnectWallet($event)" v-if="showMyWallet" />

  <q-layout view="lHh Lpr lFf">
    <q-header
      class="nav-bar q-py-xs"
      :style="(showConnectWallet || showMyWallet) && { 'z-index': '-1' }"
    >
      <q-toolbar class="row justify-between items-center">
        <div
          @click="
            {
            }
          "
          class="nav-bar-container-left"
        >
          <q-img class="logo" src="../assets/images/WiV-logo.svg" />
        </div>
        <div class="nav-bar-container-center row items-center">
          <q-btn-dropdown
            class="btn-dropdown-menu"
            dense
            flat
            label="Marketplace"
          >
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
        <div class="nav-bar-container-right row">
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
            class="btn-dropdown-menu"
            dense
            flat
            icon="img:data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIuNSIgY3k9IjUuNSIgcj0iNSIgc3Ryb2tlPSIjMjEyMTMxIi8+CjxwYXRoIGQ9Ik0yMi41IDE4QzIyLjUgMTkuMzg4MSAyMS40NjE2IDIwLjc1NDkgMTkuNTM4NyAyMS44MDM3QzE3LjYzNDggMjIuODQyMiAxNC45NzA0IDIzLjUgMTIgMjMuNUM5LjAyOTYxIDIzLjUgNi4zNjUxOSAyMi44NDIyIDQuNDYxMjUgMjEuODAzN0MyLjUzODQxIDIwLjc1NDkgMS41IDE5LjM4ODEgMS41IDE4QzEuNSAxNi42MTE5IDIuNTM4NDEgMTUuMjQ1MSA0LjQ2MTI1IDE0LjE5NjNDNi4zNjUxOSAxMy4xNTc4IDkuMDI5NjEgMTIuNSAxMiAxMi41QzE0Ljk3MDQgMTIuNSAxNy42MzQ4IDEzLjE1NzggMTkuNTM4NyAxNC4xOTYzQzIxLjQ2MTYgMTUuMjQ1MSAyMi41IDE2LjYxMTkgMjIuNSAxOFoiIHN0cm9rZT0iIzIxMjEzMSIvPgo8L3N2Zz4K"
          >
            <q-list>
              <q-item clickable v-close-popup @click="connectWallet">
                <q-item-section>
                  <q-item-label>My wallet</q-item-label>
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
                clickable
                v-close-popup
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
                    </q-btn-dropdown></q-item-label
                  >
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
                  <q-item-label>log out</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <q-btn
          class="menu-icon"
          flat
          dense
          @click="
            {
            }
          "
          icon="menu"
          aria-label="Menu"
        ></q-btn>
      </q-toolbar>
    </q-header>
    <BurgerMenu v-if="showBurgerMenu" />
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
      showConnectWallet: false,
      showBurgerMenu: false,
      showMyWallet: false,
    };
  },
  components: {
    ConnectWallet,
    BurgerMenu,
    MyWallet,
  },
  methods: {
    connectWallet() {
      // this.showConnectWallet = true;
      this.showMyWallet = true;
      document.body.classList.add('no-scroll');
    },
    onConnectWallet(title: boolean) {
      if (title === true) {
        this.showConnectWallet = false;
        this.showMyWallet = false;
      }
      document.body.classList.remove('no-scroll');
    },
  },
});
</script>

<style></style>
