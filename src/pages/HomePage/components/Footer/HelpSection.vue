<template>
  <div class="column">
    <router-link
      to=""
      class="item-title footer-normal"
    >
      Help
    </router-link>
    <div
      @click="$emit('openHelpCenterSupport')"
      class="item-text footer-normal q-pt-sm"
    >
      Contact Us
    </div>
    <div
      @click="$emit('openHelpCenterFaqs')"
      class="item-text footer-normal q-pt-sm"
    >
      FAQs
    </div>
    <router-link
      to=""
      class="item-text footer-normal q-pt-sm"
    >
      Privacy Policy
    </router-link>
    <router-link
      to=""
      class="item-text footer-normal q-pt-sm"
    >
      Terms and Conditions
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
