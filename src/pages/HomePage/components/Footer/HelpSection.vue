<template>
  <div class="column">
    <router-link
      to=""
      class="item-title footer-normal"
    >
      Help
    </router-link>
    <div
      class="item-text footer-normal q-pt-sm"
      @click="$emit('openHelpCenterSupport')"
    >
      Contact Us
    </div>
    <div
      class="item-text footer-normal q-pt-sm"
      @click="$emit('openHelpCenterFaqs')"
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
import { defineComponent } from 'vue';
export default defineComponent({
  emits: [
    'openHelpCenterSupport',
    'openHelpCenterFaqs'
  ]
})
</script>

<style>

</style>
