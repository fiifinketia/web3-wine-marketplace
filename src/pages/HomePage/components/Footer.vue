<template>
  <footer class="footer-container q-pb-xl">
    <div class="wiv-image-wrapper">
      <img
        src="../../../../public/images/wiv-footer-logo.svg"
        class="wiv-image"
      />
    </div>
    <div class="footer-wrapper">
      <div class="footer-item-wrapper">
        <router-link class="footer-bold" to="/marketplace?tab=nfts"
          >NFTs</router-link
        >
        <router-link
          class="item-text footer-normal q-pt-sm"
          to="/marketplace?tab=releases"
          >New Releases</router-link
        >
        <router-link
          class="item-text footer-normal q-pt-sm"
          to="/marketplace?tab=recommended"
          >Recommended</router-link
        >
        <router-link class="item-title footer-normal q-pt-md" to="/favorites"
          >Favourites</router-link
        >
        <router-link class="item-title footer-normal q-pt-md" to="#"
          >Stats</router-link
        >
        <router-link class="item-text footer-normal q-pt-sm" to="#"
          >Wine Statistics</router-link
        >

        <div class="first-div-appear">
          <div class="footer-bold">Storefront</div>
          <div class="item-text footer-normal q-pt-sm">New Commings</div>
          <div class="item-text footer-normal q-pt-sm">Recommended</div>
        </div>

        <div class="footer-item-wrapper fourth-400-item">
          <div class="item-title footer-normal">Contact info:</div>
          <div class="item-text footer-normal q-pt-sm">info@wiv.io</div>
          <div class="item-text footer-normal q-pt-sm">+0 000 000 0000</div>
        </div>
      </div>
      <div class="footer-item-wrapper first-item">
        <div class="item-title footer-normal">Storefront</div>
        <div class="item-text footer-normal q-pt-sm">New Commings</div>
        <div class="item-text footer-normal q-pt-sm">Recommended</div>
      </div>
      <div class="footer-item-wrapper">
        <router-link class="item-title footer-normal" to="/orders"
          >Profile</router-link
        >
        <router-link to="" class="item-text footer-normal q-pt-sm"
          >Digital Wine Cellar</router-link
        >
        <router-link
          class="item-text footer-normal q-pt-sm"
          to="/orders?tab=incoming"
          >Offers</router-link
        >
        <router-link
          class="item-text footer-normal q-pt-sm"
          to="/orders?tab=transactions"
          >Trading History</router-link
        >
        <router-link to="" class="item-text footer-normal q-pt-sm"
          >Notifications</router-link
        >
        <router-link to="" class="item-title footer-normal q-pt-md"
          >Settings</router-link
        >

        <div class="footer-item-wrapper third-div-wrapper">
          <div class="item-title footer-normal">Help</div>
          <div class="item-text footer-normal q-pt-sm">Contract us</div>
          <div class="item-text footer-normal q-pt-sm">FAQs</div>
          <div class="item-text footer-normal q-pt-sm">Privacy Policy</div>
          <div class="item-text footer-normal q-pt-sm">
            Terms and Conditions
          </div>
        </div>
        <div class="footer-item-wrapper fifth-item-400">
          <div class="item-title footer-normal">Integrations</div>
          <div class="row q-pt-md">
            <a
              href="https://discord.gg/znkRDJDXvr"
              target="_blank"
              class="q-pr-sm"
            >
              <q-img src="../../../../public/images/discord.svg" width="23px" />
            </a>
            <a
              href="https://twitter.com/wivteam"
              target="_blank"
              class="q-px-sm"
            >
              <q-img src="../../../../public/images/twitter.svg" width="23px" />
            </a>
            <a
              href="https://www.instagram.com/wiv.io/"
              target="_blank"
              class="q-px-sm"
            >
              <q-img
                src="../../../../public/images/instagram.svg"
                width="23px"
              />
            </a>
          </div>
        </div>
      </div>
      <div class="footer-item-wrapper third-item">
        <div class="item-title footer-normal">Help</div>
        <div class="item-text footer-normal q-pt-sm">Contact us</div>
        <div class="item-text footer-normal q-pt-sm">FAQs</div>
        <div class="item-text footer-normal q-pt-sm">Privacy Policy</div>
        <div class="item-text footer-normal q-pt-sm">Terms and Conditions</div>
      </div>
      <div class="footer-item-wrapper">
        <div class="footer-nft-400-disappear">
          <div class="item-title footer-normal">Contract info:</div>
          <div class="item-text footer-normal q-pt-sm">info@wiv.io</div>
          <div class="item-text footer-normal q-pt-sm">+0 000 000 0000</div>
        </div>
        <div class="footer-item-wrapper fifth-div-wrapper">
          <div class="item-title footer-normal">Integrations</div>
          <div class="row q-pt-md">
            <a
              href="https://discord.gg/znkRDJDXvr"
              target="_blank"
              class="q-pr-sm"
            >
              <q-img src="../../../../public/images/discord.svg" width="23px" />
            </a>
            <a
              href="https://twitter.com/wivteam"
              target="_blank"
              class="q-px-sm"
            >
              <q-img src="../../../../public/images/twitter.svg" width="23px" />
            </a>
            <a
              href="https://www.instagram.com/wiv.io/"
              target="_blank"
              class="q-px-sm"
            >
              <q-img
                src="../../../../public/images/instagram.svg"
                width="23px"
              />
            </a>
          </div>
        </div>
      </div>
      <div class="footer-item-wrapper fifth-item">
        <div class="item-title footer-normal">Integrations</div>
        <div class="row q-pt-md">
          <a
            href="https://discord.gg/znkRDJDXvr"
            target="_blank"
            class="q-pr-sm"
          >
            <q-img src="../../../../public/images/discord.svg" width="23px" />
          </a>
          <a href="https://twitter.com/wivteam" target="_blank" class="q-px-sm">
            <q-img src="../../../../public/images/twitter.svg" width="23px" />
          </a>
          <a
            href="https://www.instagram.com/wiv.io/"
            target="_blank"
            class="q-px-sm"
          >
            <q-img src="../../../../public/images/instagram.svg" width="23px" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '../../../css/Homepage/Footer.css';
export default defineComponent({
  name: 'LandingPageFooter',
});
</script>

<style></style>
