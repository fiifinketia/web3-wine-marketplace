<template>
  <div class="flex justify-center column text-center">
    <div class="exclusive-offer-title">
      Invest in wines to taste & exclusive offers
    </div>
    <div
      class="flex justify-center row text-center q-pa-md row items-start q-gutter-lg"
    >
      <div v-for="item in arrayOfObjects" :key="item.name">
        <q-card class="my-card">
          <q-img src="../../../assets/image.png" />

          <q-card-section class="q-pt-sm card-title-text text-left q-pl-none">
            The full name of the wine is here and here and here
          </q-card-section>

          <q-card-section class="q-pl-none">
            <div class="flex justify-between column card-border q-pa-md">
              <div class="flex justify-between">
                <div class="card-starting-from-title">Starting from</div>
                <q-img
                  src="../../../assets/heart.png"
                  class="cursor-pointer"
                  width="20px"
                />
              </div>
              <div>
                <div class="flex items-center">
                  <q-img
                    src="../../../assets/Vector.png"
                    width="18px"
                    height="18px"
                  />
                  <div class="price flex row">
                    <label class="currency"> &nbsp;00.00</label> &nbsp; / $
                    00.00
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import '../../../css/Homepage/ExclusiveOffers.css';
// import image from '../../../assets/image.png';
export default defineComponent({
  name: 'ExclusiveOffers',
  data() {
    return {
      arrayOfObjects: [
        {
          name: 'Vranac',
          price: 1000,
          image: '../../../assets/image.png',
        },
        {
          name: 'Sauvignon',
          price: 800,
          image: '../../../assets/image.png',
        },
        {
          name: 'Dom Perignon',
          price: 1800,
          image: '../../../assets/image.png',
        },
        {
          name: 'Pro Corde',
          price: 1800,
          image: '../../../assets/image.png',
        },
      ],
    };
  },
});
</script>

<style></style>
