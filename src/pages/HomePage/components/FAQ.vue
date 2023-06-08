<template>
  <div class="column items-center justify-center faq-container">
    <div class="faq-title q-pt-xl q-pb-sm">Don't know how to start?</div>
    <div class="faq-small-text q-pb-md">Let us help you!</div>
    <div class="row faq-cards-container" style="position: relative">
      <img src="../../../../public/images/Rocket.svg" class="rocket" />
      <div
        class="col-md-3 col-sm-6 col-xs-12 q-pa-sm"
        :class="$q.screen.width < 1023
          ? $q.screen.width > 600
          ? 'card-align-right'
          : 'card-align-center'
          : ''
        "
      >
        <q-card class="my-card q-py-lg q-px-md">
          <div class="row justify-between q-mb-sm">
            <q-img
              src="../../../../public/images/wallet.svg"
              width="60px"
              height="60px"
            />
            <span class="faq-number">
              01
            </span>
          </div>
          <q-card-section class="q-pa-none faq-text row items-center">
            <div>To <label class="bold-text">sign up</label> click on</div>
            <div class="q-pl-sm">
              <q-img
                src="../../../../public/images/user.svg"
                width="30px"
                height="30px"
              />
            </div>
            <div>& connect your <label class="bold-text">wallet.</label></div>
          </q-card-section>
          <q-card-section class="q-pa-none q-pt-md faq-text">
            If you do not have a wallet,
            <a class="contact-us" href="https://metamask.io/" target="_blank">Click here</a>
            to create one
          </q-card-section>
        </q-card>
      </div>
      <div
        class="col-md-3 col-sm-6 col-xs-12 q-pa-sm"
        :class="$q.screen.width > 600 ? '' : 'card-align-center'"
      >
        <q-card class="my-card q-py-lg q-px-md">
          <div class="row justify-between q-mb-sm">
            <q-img
              src="../../../../public/images/faq-02.svg"
              width="60px"
              height="60px"
            />
            <span class="faq-number">
              02
            </span>
          </div>
          <q-card-section class="q-pa-none faq-text row">
            To review, buy, or place a bid for an NFT, click on it to see the
            meta data.
          </q-card-section>
        </q-card>
      </div>
      <div
        class="col-md-3 col-sm-6 col-xs-12 q-pa-sm my-card-align"
        :class="$q.screen.width < 1023
          ? $q.screen.width > 600
          ? 'card-align-right'
          : 'card-align-center'
          : ''
        "
      >
        <q-card class="my-card q-py-lg q-px-md">
          <div class="row justify-between q-mb-sm">
            <q-img
              src="../../../../public/images/faq-03.svg"
              width="60px"
              height="60px"
            />
            <span class="faq-number">
              03
            </span>
          </div>
          <q-card-section class="q-pa-none faq-text">
            <label class="bold-text q-pr-xs">Hesitating</label>what to buy or
            want to compare?
          </q-card-section>
          <q-card-section class="q-pa-none q-mt-md faq-text row">
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
      <div
        class="col-md-3 col-sm-6 col-xs-12 q-pa-sm"
        :class="$q.screen.width > 600 ? '' : 'card-align-center'"
      >
        <q-card class="my-card q-py-lg q-px-md">
          <div class="row justify-between q-mb-sm">
            <q-img
              src="../../../../public/images/faq-04.svg"
              width="60px"
              height="60px"
            />
            <span class="faq-number">
              04
            </span>
          </div>
          <q-card-section class="q-pa-none column">
            <span class="faq-text">
              All your wines will be stored in a special place: Digital Wine
              Cellar. It’s our web app to monitor NFTs you own.
            </span>
            <a class="contact-us q-pt-md" href="https://dwc.wiv-tech.org/#" target="_blank">Visit Cellar</a>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row items-center justify-center q-mt-lg q-mx-md">
      <span class="still-have-question">
        Still have questions?
        <a class="contact-us" @click="$emit('openHelpCenterSupport')">Contact us</a> or find answer in
        <a class="contact-us" @click="$emit('openHelpCenterFaqs')">FAQs</a>
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import '../../../css/Homepage/Faq.css';
export default defineComponent({
  name: 'FAQ',
  emits: ['openHelpCenterSupport', 'openHelpCenterFaqs']
});
</script>

<style></style>
