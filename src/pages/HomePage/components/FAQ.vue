<template>
  <div class="flex column items-center justify-center">
    <div class="faq-title">Don't know how to start?</div>
    <div class="faq-small-text">Let us help you!</div>
    <div class="q-pa-md row items-start justify-center q-gutter-md container">
      <q-card class="my-card">
        <div class="faq-image">
          <q-img src="../../../assets/wallet.png" width="60px" height="60px" />
        </div>
        <q-card-section class="q-pt-none faq-text row">
          <div>To <label class="bold-text">sign up</label> click on</div>
          <div class="q-pl-md">
            <q-img src="../../../assets/user.png" width="35px" height="25px" />
          </div>
          <div>& connect your <label class="bold-text">wallet.</label></div>
        </q-card-section>
        <q-card-section class="q-pt-none faq-text">
          If you do not have a wallet, Click here to create one
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <div class="faq-image">
          <q-img src="../../../assets/box.png" width="60px" height="60px" />
        </div>
        <q-card-section class="q-pt-none faq-text row">
          To review, buy, or place a bid for an NFT, click on it to see the meta
          data.
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <div class="faq-image">
          <q-img
            src="../../../assets/heartFaq.png"
            width="60px"
            height="60px"
          />
        </div>
        <q-card-section class="q-pt-none faq-text row">
          <label class="bold-text">Hesitating</label> what to buy or want to
          compare?
        </q-card-section>
        <q-card-section class="q-pt-none faq-text row">
          <div>Add NFTs to the favs</div>
          <div class="q-pl-sm">
            <q-img src="../../../assets/heart.png" width="20px" height="20px" />
          </div>
          <div>
            to <label class="bold-text">monitor</label> them & buy later
          </div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <div class="faq-image">
          <q-img src="../../../assets/wine.png" width="60px" height="60px" />
        </div>
        <q-card-section class="q-pt-none faq-text row">
          All your wies will be stored in a special place - Digital Wine Cellar.
          It’s our web app to monitor manage the NFTs you own.
        </q-card-section>
        <q-card-section class="q-pt-none faq-text row">
          <a class="visit-cellar">Visit Cellar</a>
        </q-card-section>
      </q-card>
    </div>
    <div class="still-have-question">Still have questions?</div>
    <div class="still-have-question q-pt-sm">
      <a class="contact-us">Contact us</a> or find answer in
      <a class="contact-us">FAQs</a>
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
