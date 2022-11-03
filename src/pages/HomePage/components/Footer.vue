<template>
  <div class="footer-container">
    <div class="q-pl-sm q-pt-md">
      <q-img src="../../../assets/wiv-logo.png" width="80px" />
    </div>
    <div class="flex row justify-between text-left">
      <div class="first">
        <div class="flex column q-pl-sm q-pt-md">
          <a class="footer-bold-text q-py-sm">NFTs</a>
          <a class="footer-normal-text q-py-sm">New Releases</a>
          <a class="footer-normal-text q-py-sm">Recommended</a>
          <a class="footer-bold-text q-py-sm">Favourites</a>
          <a class="footer-bold-text q-py-sm">Stats</a>
          <a class="footer-normal-text q-py-sm">Wine Statistics</a>
        </div>
        <div class="flex column q-pt-md">
          <a class="footer-bold-text q-py-sm">Storefront</a>
          <a class="footer-normal-text q-py-sm">New comings</a>
          <a class="footer-normal-text q-py-sm">Recommended</a>
        </div>
      </div>
      <div class="second">
        <div class="flex column q-pt-md">
          <a class="footer-bold-text q-py-sm">Profile</a>
          <a class="footer-normal-text q-py-sm">Digital Wine Cellar</a>
          <a class="footer-normal-text q-py-sm">Offers</a>
          <a class="footer-normal-text q-py-sm">Trading History</a>
          <a class="footer-normal-text q-py-sm">Notifications</a>
          <a class="footer-bold-text q-py-sm">Settings</a>
        </div>
        <div class="flex column q-pt-md">
          <a class="footer-bold-text q-py-sm">Help</a>
          <a class="footer-normal-text q-py-sm">Contact us</a>
          <a class="footer-normal-text q-py-sm">FAQs</a>
          <a class="footer-normal-text q-py-sm">Privacy Policy</a>
          <a class="footer-normal-text q-py-sm">Terms & Conditions</a>
        </div>
      </div>
      <div class="third">
        <div class="flex column q-pt-md">
          <div class="footer-bold-text q-py-sm">Contact info:</div>
          <div class="footer-normal-text q-py-sm">email@email.com</div>
          <div class="footer-normal-text q-py-sm">+ 0 000 000 0000</div>
        </div>
        <div class="flex column footer-column q-pt-md">
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
  </div>
  <!-- <footer class="footer">
    <div class="q-pl-sm q-pt-md">
      <q-img src="../../../assets/wiv-logo.png" width="80px" />
    </div>
    <div class=""></div>
  </footer> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import '../../../css/Homepage/Footer.css';
export default defineComponent({
  name: 'LandingPageFooter',
});
</script>

<style></style>
