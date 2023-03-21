<template>
  <div class="column">
    <div class="column exclusive-offer-title justify-center">
      <div>Our wines are selected using 20+ years of historic</div>
      <div>wine data to offer the best opportunities</div>
    </div>

    <div class="row justify-center q-pt-lg exclusive-offer-container">
      <q-card
        v-for="item in arrayOfObjects"
        :key="item.name"
        class="no-shadow col q-pa-md"
        :class="item.class"
      >
        <q-img src="../../../assets/circle.png" class="circle" />
        <div class="wine-name q-py-sm">
          The full name of the wine is here and here and here
        </div>
        <div class="column border q-mt-sm">
          <div class="row justify-between card-starting-from-title">
            Price
            <q-img
              src="../../../../public/images/empty-heart.svg"
              class="cursor-pointer like"
            />
          </div>
          <div class="row justify-between items-center q-pt-sm">
            <div class="row">
              <q-img
                src="../../../../public/images/USDT.svg"
                height="22px"
                width="22px"
              />
              <div class="currency">&nbsp;00.00</div>
            </div>
            <q-img
              src="../../../../public/images/mini-button.svg"
              width="32px"
            />
          </div>
        </div>
      </q-card>
    </div>
    <div class="go-to-marketplace-wrapper row justify-center">
      <q-btn
        class="go-to-marketplace q-mt-lg"
        unelevated
        no-caps
        @click="$router.push('marketplace?tab=nfts')"
      >
        Go to Marketplace
      </q-btn>
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
