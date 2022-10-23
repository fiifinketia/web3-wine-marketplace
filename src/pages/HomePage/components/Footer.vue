<template>
  <div class="footer-container">
    <div class="q-pl-sm q-pt-md">
      <q-img src="../../../assets/wiv-logo.png" width="80px" />
    </div>
    <div class="flex row">
      <div class="flex column q-pl-sm q-pt-md">
        <div class="footer-bold-text q-py-sm">NFTs</div>
        <div class="footer-normal-text q-py-sm">New Releases</div>
        <div class="footer-normal-text q-py-sm">Recommended</div>
        <div class="footer-bold-text q-py-sm">Favourites</div>
        <div class="footer-bold-text q-py-sm">Stats</div>
        <div class="footer-normal-text q-py-sm">Wine Statistics</div>
      </div>
      <div class="flex column footer-column">
        <div class="footer-bold-text q-py-sm">Storefront</div>
        <div class="footer-normal-text q-py-sm">New comings</div>
        <div class="footer-normal-text q-py-sm">Recommended</div>
      </div>
      <div class="flex column footer-column">
        <div class="footer-bold-text q-py-sm">Profile</div>
        <div class="footer-normal-text q-py-sm">Digital Wine Cellar</div>
        <div class="footer-normal-text q-py-sm">Offers</div>
        <div class="footer-normal-text q-py-sm">Trading History</div>
        <div class="footer-normal-text q-py-sm">Notifications</div>
        <div class="footer-bold-text q-py-sm">Settings</div>
      </div>
      <div class="flex column footer-column">
        <div class="footer-bold-text q-py-sm">Help</div>
        <div class="footer-normal-text q-py-sm">Contact us</div>
        <div class="footer-normal-text q-py-sm">FAQs</div>
        <div class="footer-normal-text q-py-sm">Privacy Policy</div>
        <div class="footer-normal-text q-py-sm">Terms & Conditions</div>
      </div>
      <div class="flex column footer-column">
        <div class="footer-bold-text q-py-sm">Contact info:</div>
        <div class="footer-normal-text q-py-sm">email@email.com</div>
        <div class="footer-normal-text q-py-sm">+ 0 000 000 0000</div>
      </div>
      <div class="flex column footer-column">
        <div class="footer-bold-text q-py-sm">Integrations</div>
        <div class="flex row">
          <div class="q-pr-md">
            <q-img src="../../../assets/discord.png" width="20px" />
          </div>
          <div class="q-pr-md">
            <q-img src="../../../assets/twitter.png" width="20px" />
          </div>
          <div class="q-pr-md">
            <q-img src="../../../assets/instagram.png" width="20px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import '../../../css/Homepage/Footer.css';
export default defineComponent({
  name: 'LandingPageFooter',
});
</script>

<style></style>
