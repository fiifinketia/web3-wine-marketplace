<template>
  <div class="column">
    <router-link class="footer-bold" to="/marketplace?tab=nfts">
      NFTs
    </router-link>
    <router-link
      class="item-text footer-normal q-pt-sm"
      to="/marketplace?tab=releases"
    >
      New Releases
    </router-link>
    <router-link
      class="item-text footer-normal q-pt-sm"
      to="/marketplace?tab=recommended"
    >
      Recommended
    </router-link>
    <router-link
      class="item-title footer-normal q-pt-md"
      to="/favorites"
    >
      Favorites
    </router-link>
  </div>
</template>

<script lang="ts">
import 'src/css/Homepage/Footer.css';
export default {

}
</script>

<style>

</style>