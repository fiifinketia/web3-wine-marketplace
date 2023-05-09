<template>
  <div class="flex column items-center justify-center faq-container">
    <q-img src="../../../../public/images/Rocket.svg" class="rocket q-mt" />
    <div class="faq-title q-pt-xl q-pb-md">Don't know how to start?</div>
    <div class="faq-small-text q-pb-md">Let us help you!</div>
    <div class="row q-px-sm faq-cards-container">
      <div class="col-md-3 col-sm-6 col-xs-12 q-pa-sm">
        <q-card class="my-card">
          <div class="faq-image row justify-between q-px-sm">
            <q-img
              src="../../../../public/images/wallet.svg"
              width="60px"
              height="60px"
            />
            <q-img
              class="q-mt-sm q-mr-sm"
              src="../../../../public/images/01.svg"
              width="27px"
              height="25px"
            />
          </div>
          <q-card-section class="q-pt-none faq-text row">
            <div>To <label class="bold-text">sign up</label> click on</div>
            <div class="q-pl-md">
              <q-img
                src="../../../../public/images/user.svg"
                width="35px"
                height="25px"
              />
            </div>
            <div>& connect your <label class="bold-text">wallet.</label></div>
          </q-card-section>
          <q-card-section class="q-pt-none faq-text">
            If you do not have a wallet, Click here to create one
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12 q-pa-sm">
        <q-card class="my-card">
          <div class="faq-image row justify-between q-px-sm">
            <q-img
              src="../../../../public/images/faq-02.svg"
              width="60px"
              height="60px"
            />
            <q-img
              class="q-mt-sm q-mr-sm"
              src="../../../../public/images/02.svg"
              width="35px"
              height="25px"
            />
          </div>
          <q-card-section class="q-pt-none faq-text row">
            To review, buy, or place a bid for an NFT, click on it to see the
            meta data.
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12 q-pa-sm">
        <q-card class="my-card">
          <div class="faq-image row justify-between q-px-sm">
            <q-img
              src="../../../../public/images/faq-03.svg"
              width="60px"
              height="60px"
            />
            <q-img
              class="q-mt-sm q-mr-sm"
              src="../../../../public/images/03.svg"
              width="35px"
              height="25px"
            />
          </div>
          <q-card-section class="q-pt-none faq-text row">
            <label class="bold-text q-pr-sm">Hesitating</label>what to buy or
            want to compare?
          </q-card-section>
          <q-card-section class="q-pt-none faq-text row">
            <div>Add NFTs to the favs</div>
            <div class="q-px-sm">
              <q-img
                src="../../../../public/images/empty-heart.svg"
                width="20px"
                height="20px"
              />
            </div>
            <div>
              to <label class="bold-text">monitor</label> them & buy later
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12 q-pa-sm">
        <q-card class="my-card">
          <div class="faq-image row justify-between q-pl-sm">
            <q-img
              src="../../../../public/images/faq-04.svg"
              width="60px"
              height="60px"
            />
            <q-img
              class="q-mt-sm q-mr-sm"
              src="../../../../public/images/04.svg"
              width="35px"
              height="25px"
            />
          </div>
          <q-card-section class="q-pt-none faq-text row">
            All your wines will be stored in a special place - Digital Wine
            Cellar. It’s our web app to monitor manage the NFTs you own.
          </q-card-section>
          <q-card-section class="q-pt-none faq-text row">
            <a class="contact-us">Visit Cellar</a>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="flex row items-center justify-center q-mt-lg">
      <div class="still-have-question">Still have questions?</div>
      <div class="still-have-question q-pl-sm">
        <a class="contact-us">Contact us</a> or find answer in
        <a class="contact-us">FAQs</a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import '../../../css/Homepage/Faq.css';
export default defineComponent({
  name: 'FAQ',
  data() {
    return {
      items: [
        {
          image: require('../../../assets/wallet.svg'),
          text: 'To sign up click on & connect your wallet',
          text2: 'If you do not have a wallet, Click here to create one',
          class: 'first',
        },
        {
          image: require('../../../assets/box.svg'),
          text: 'To review, buy, or place a bid for an NFT click on it to see the meta data.',
          class: 'second',
        },
        {
          image: require('../../../assets/heartFaq.svg'),
          text: 'Hesitating what to buy or want to compare?',
          text2: 'Add NFTs to the favs to monitor them & buy later',
          class: 'third',
        },
        {
          image: require('../../../assets/wine.svg'),
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
