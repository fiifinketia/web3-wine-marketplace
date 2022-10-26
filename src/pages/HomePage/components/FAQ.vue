<template>
  <div class="flex column items-center justify-center">
    <div class="faq-title">Don't know how to start?</div>
    <div class="faq-small-text">Let us help you!</div>
    <div class="q-pa-md row items-start justify-center q-gutter-md container">
      <q-card v-for="item in items" :key="item.text" class="my-card">
        <div class="faq-image">
          <q-img :src="item.image" width="60px" height="60px" />
        </div>
        <q-card-section class="q-pt-none faq-text">
          {{ item.text }}
        </q-card-section>
        <q-card-section class="q-pt-none faq-text">
          {{ item.text2 }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi';
import '../../../css/Homepage/Faq.css';
export default defineComponent({
  name: 'FAQ',
  data() {
    return {
      items: [
        {
          image: require('../../../assets/wallet.png'),
          text: 'To sign up click on & connect your wallet',
          text2: 'If you do not have a wallet, Click here to create one',
          class: 'first',
        },
        {
          image: require('../../../assets/box.png'),
          text: 'To review, buy, or place a bid for an NFT click on it to see the meta data.',
          class: 'second',
        },
        {
          image: require('../../../assets/heartFaq.png'),
          text: 'Hesitating what to buy or want to compare?',
          text2: 'Add NFTs to the favs to monitor them & buy later',
          class: 'third',
        },
        {
          image: require('../../../assets/wine.png'),
          text: 'All your wines will be stored in a special place - Digital Wine Cellar. Its our web app to monitor manage the NFTs you own.',
          text2: 'Visit cellar',
          class: 'fourth',
        },
      ],
    };
  },
});
</script>

<style></style>
