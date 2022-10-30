<template>
  <div class="flex column">
    <div class="flex row q-pt-lg q-pl-lg">
      <div class="favorites-title">NFT</div>
      <div class="favorites-number q-pl-sm">283</div>
    </div>
    <div class="flex row">
      <div class="q-gutter-lg q-pl-lg q-pt-lg cards-container">
        <q-card
          class="no-shadow description-container"
          v-for="item in items"
          :key="item.name"
        >
          <q-img src="../../assets/nft2.png" width="250px" height="250px" />
          <div class="flex column">
            <div class="wine-name q-pt-md">
              The full name of the wine is here and here and here
            </div>
          </div>
          <div class="flex column">
            <div class="flex row justify-between cards">
              <div class="starting-from">Starting from</div>
              <div>
                <q-img
                  src="../../assets/heart.png"
                  width="20px"
                  height="20px"
                />
              </div>
            </div>
            <div></div>
          </div>
        </q-card>
      </div>
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
      ],
    };
  },
});
</script>

<style></style>
