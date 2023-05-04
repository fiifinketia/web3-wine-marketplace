<template>
  <div class="column">
    <router-link
      class="item-title footer-normal"
      to="/orders"
    >
      Profile
    </router-link>
    <router-link
      to=""
      class="item-text footer-normal q-pt-sm"
    >
      Digital Wine Cellar
    </router-link>
    <router-link
      class="item-text footer-normal q-pt-sm"
      to="/orders?tab=incoming"
    >
      Offers
    </router-link>
    <router-link
      class="item-text footer-normal q-pt-sm"
      to="/orders?tab=transactions"
    >
      Trading History
    </router-link>
    <router-link
      to=""
      class="item-title footer-normal q-pt-md"
    >
      Settings
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