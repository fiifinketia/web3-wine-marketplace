<template>
  <div class="flex column items-center">
    <div class="exclusive-offer-title">
      Invest in wines to taste & exclusive offers . . .
    </div>
    <div class="cards">
      <div class="q-gutter-lg items-center justify-center row q-pt-lg">
        <q-card
          v-for="item in arrayOfObjects"
          :key="item.name"
          class="flex column card-container no-shadow"
          :class="item.class"
        >
          <q-img src="../../../assets/circle.png" class="circle" />
          <div class="wine-name q-pt-sm">
            The full name of the wine is here and here and here
          </div>
          <div class="q-pt-md">
            <div class="flex column box q-pt-md border">
              <div class="flex row justify-between">
                <div class="card-starting-from-title">Starting from</div>
                <q-img
                  src="../../../assets/like.png"
                  class="cursor-pointer like"
                />
              </div>
              <div class="flex row items-center q-pt-sm">
                <q-img src="../../../assets/usdc.png" class="usdc" />
                <div class="q-pl-sm currency">00.00</div>
                <div class="price10 q-pl-sm">/ $ 00.00</div>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
    <div class="q-pt-lg go-to-marketplace-wrapper">
      <button class="go-to-marketplace">
        <div class="go-to-marketplace-text" @click="$router.push('marketplace?tab=nfts')">Go to Marketplace</div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import '../../../css/Homepage/ExclusiveOffers.css';
export default defineComponent({
  name: 'ExclusiveOffers',
  data() {
    return {
      arrayOfObjects: [
        {
          name: 'Vranac',
          price: 1000,
          image: '../../../assets/image.png',
          class: 'one',
        },
        {
          name: 'Sauvignon',
          price: 800,
          image: '../../../assets/image.png',
          class: 'two',
        },
        {
          name: 'Dom Perignon',
          price: 1800,
          image: '../../../assets/image.png',
          class: 'three',
        },
        {
          name: 'Pro Corde',
          price: 1800,
          image: '../../../assets/image.png',
          class: 'four',
        },
      ],
    };
  },
});
</script>

<style></style>
