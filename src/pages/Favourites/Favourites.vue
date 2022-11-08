<template>
  <div class="column">
    <div class="row q-pt-lg q-pl-lg">
      <div class="favorites-title">NFT</div>
      <div class="favorites-number q-pl-sm">283</div>
    </div>
    <div class="row justify-center cards-container q-ma-sm">
      <q-card
        class="no-shadow q-ma-md card-individual"
        v-for="item in items"
        :key="item.name"
      >
        <div class="card-img"></div>
        <div class="wine-name q-py-md">
          The full name of the wine is here and here and here
        </div>
        <div class="price-container column q-pa-sm">
          <div class="row justify-between q-pb-md">
            <div class="starting-from">Price</div>
            <q-img src="../../assets/heart.svg" width="20px" height="20px" />
          </div>
          <div class="row justify-between">
            <div class="price">
              <q-img src="../../assets/USDT.svg" width="20px" />
              &nbsp;00.00
            </div>
            <q-img src="../../assets/mini-button.svg" width="20px" />
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi';
import '../../css/Favorites/Favorites.css';
export default defineComponent({
  name: 'FavouritesPage',
  data() {
    return {
      items: [
        {
          name: 'Vranac',
          price: 1111,
        },
        {
          name: 'Sauvignon',
          price: 2222,
        },
        {
          name: 'Moje Vino',
          price: 3333,
        },
        {
          name: 'Vranac Pro Corde',
          price: 4444,
        },
        {
          name: 'Vranac',
          price: 1111,
        },
        {
          name: 'Sauvignon',
          price: 2222,
        },
        {
          name: 'Moje Vino',
          price: 3333,
        },
        {
          name: 'Vranac Pro Corde',
          price: 4444,
        },
      ],
    };
  },
});
</script>

<style></style>
