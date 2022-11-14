<template>
  <FAVsRemove />
  <div class="column q-pa-md">
    <div class="row justify-between q-pt-sm">
      <div class="row">
        <div class="favorites-title">NFTs</div>
        <div class="favorites-number q-pl-sm">{{ items.length }}</div>
      </div>
      <div class="row">
        <q-input
          dense
          outlined
          color="blue-6"
          v-model="text"
          placeholder="Search"
          class="search-bar"
        >
          <template v-slot:prepend>
            <q-icon name="img:./images/search.svg" />
          </template>
        </q-input>
        <q-btn flat class="search-btn q-ml-sm">GO</q-btn>
      </div>
    </div>
    <div
      class="no-nfts-container column justify-center items-center"
      v-if="!items.length"
    >
      <q-img src="../../../public/images/NoNFTs.svg" width="180px" />
      <div>You do not have any favorites yet.</div>
    </div>
    <div class="row justify-around favs-cards-container">
      <q-card
        class="no-shadow q-ma-md vafs-card-individual"
        v-for="item in items"
        :key="item.id"
      >
        <div class="favs-card-img"></div>
        <div class="favs-wine-name q-py-md">
          The full name of the wine is here and here and here
        </div>
        <div class="favs-price-container column q-pa-sm">
          <div class="row justify-between q-pb-md">
            <div class="starting-from">Price</div>
            <q-btn
              @click="removeNFT(item.id)"
              class="un-favour-btn"
              icon="img:./images/heart.svg"
              flat
              dense
              padding="0"
            />
          </div>
          <div class="row justify-between">
            <div class="favs-price">
              <q-img src="../../../public/images/USDT.svg" width="20px" />
              &nbsp;00.00
            </div>
            <q-img
              src="../../../public/images/mini-button.svg"
              width="24px"
              height="24px"
            />
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import '../../css/Favorites/Favorites.css';

import FAVsRemove from './FAVsRemove.vue';
export default defineComponent({
  name: 'FavouritesPage',
  components: {
    FAVsRemove,
  },
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Vranac',
          price: 1111,
        },
        {
          id: 2,
          name: 'Sauvignon',
          price: 2222,
        },
        {
          id: 3,
          name: 'Moje Vino',
          price: 3333,
        },
        {
          id: 4,
          name: 'Vranac Pro Corde',
          price: 4444,
        },
        {
          id: 5,
          name: 'Vranac',
          price: 1111,
        },
        {
          id: 6,
          name: 'Sauvignon',
          price: 2222,
        },
        {
          id: 7,
          name: 'Moje Vino',
          price: 3333,
        },
        {
          id: 8,
          name: 'Vranac Pro Corde',
          price: 4444,
        },
      ],
    };
  },
  methods: {
    animation(opacity: string, transform: string, zIndex: string) {
      const removeNFTBackground = document.querySelector(
        '.fr-background'
      ) as HTMLElement;
      const removeNFTContainer = document.querySelector(
        '.fr-container'
      ) as HTMLElement;

      removeNFTBackground.style.zIndex = zIndex;
      removeNFTBackground.style.opacity = opacity;
      removeNFTContainer.style.transform = transform;
    },
    removeNFT(id: number) {
      this.items = this.items.filter((item) => {
        return item.id !== id;
      });

      this.animation('1', 'scale(1)', '200');

      setTimeout(() => {
        this.animation('0', 'scale(0.5)', '-200');
      }, 1500);
    },
  },
});
</script>

<style></style>
