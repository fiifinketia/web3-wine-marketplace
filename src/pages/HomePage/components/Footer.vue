<template>
  <footer
    class="footer-container q-pb-xl"
    :class="$q.screen.width >= 1512 ? 'column items-center' : ''"
  >
    <div class="fit">
      <div class="wiv-image-wrapper">
        <img
          src="../../../../public/images/wiv-footer-logo.svg"
          class="wiv-image"
        />
      </div>
      <div v-if="$q.screen.width > 600" class="row fit justify-between q-px-md">
        <NFTsSection />
        <ProfileSection />
        <HelpSection
          @open-help-center-support="$emit('openHelpCenterSupport')"
          @open-help-center-faqs="$emit('openHelpCenterFaqs')"
          @open-terms-and-conditions="$emit('open-terms-and-conditions')"
        />
        <div class="column">
          <ContactSection />
          <SocialsSection class="q-pt-md" />
        </div>
      </div>
      <div
        v-else-if="$q.screen.width <= 600 && $q.screen.width > 450"
        class="row justify-between q-px-md"
      >
        <NFTsSection />
        <div class="column">
          <ProfileSection />
          <HelpSection
            class="q-pt-md"
            @open-help-center-support="$emit('openHelpCenterSupport')"
            @open-help-center-faqs="$emit('openHelpCenterFaqs')"
            @open-terms-and-conditions="$emit('open-terms-and-conditions')"
          />
        </div>
        <div class="column">
          <ContactSection />
          <SocialsSection class="q-pt-md" />
        </div>
      </div>
      <div v-else class="row justify-between q-px-md">
        <div class="column">
          <NFTsSection />
          <ContactSection class="q-pt-md" />
        </div>
        <div class="column">
          <ProfileSection />
          <HelpSection
            class="q-pt-md"
            @open-help-center-support="$emit('openHelpCenterSupport')"
            @open-help-center-faqs="$emit('openHelpCenterFaqs')"
            @open-terms-and-conditions="$emit('open-terms-and-conditions')"
          />
          <SocialsSection class="q-pt-md" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '../../../css/Homepage/Footer.css';
import ContactSection from './Footer/ContactSection.vue';
import HelpSection from './Footer/HelpSection.vue';
import NFTsSection from './Footer/NFTsSection.vue';
import ProfileSection from './Footer/ProfileSection.vue';
import SocialsSection from './Footer/SocialsSection.vue';
export default defineComponent({
  name: 'LandingPageFooter',
  components: {
    ContactSection,
    HelpSection,
    NFTsSection,
    ProfileSection,
    SocialsSection,
  },
  emits: [
    'openHelpCenterSupport',
    'openHelpCenterFaqs',
    'open-terms-and-conditions',
  ],
});
</script>

<style></style>
