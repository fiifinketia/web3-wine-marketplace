<template>
  <HeadlineComponent />
  <ExclusiveOffers />
  <Calculator/>
  <!-- <TrendingWines class="trending" />
  <PartnershipWines class="partnership" /> -->
  <FAQ class="faq" />
  <LandingPageFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import PartnershipWines from './components/PartnershipWines.vue';
import Calculator from './components/Calculator.vue';
import ExclusiveOffers from './components/ExclusiveOffers.vue';
// import TrendingWines from './components/TrendingWines.vue';

import LandingPageFooter from './components/Footer.vue';
import '../../css/Homepage/HomePage.css';
import HeadlineComponent from './components/HeadlineComponent.vue';

import FAQ from './components/FAQ.vue';

import { useTourStore } from 'src/stores/tour-state';
import { StepOptions } from 'vue-shepherd';

export default defineComponent({
  name: 'VueHomepage',
  components: {
    HeadlineComponent,
    ExclusiveOffers,
    Calculator,
    // TrendingWines,
    LandingPageFooter,
    // PartnershipWines,
    FAQ,
  },
  data() {
    const tourStore = useTourStore();

    return {
      tourStore,
    };
  },

  mounted() {
    this.startPageTour();
  },

  methods: {
    async startPageTour() {
      if (this.tourStore.homeCompleted) return;
      await this.waitForLoad();
      this.$shepherd.complete();

      const steps: StepOptions[] = [
        {
          id: 'welcome-step',
          attachTo: {
            element: '#welcome-step',
            on: 'bottom',
          },
          text: 'Welcome to the WiV Marketplace',
          buttons: [
            {
              text: 'Continue',
              action: () => {
		this.$shepherd.next();
		this.$shepherd.removeStep('welcome-step');
	      }
            },
            {
              text: 'Skip',
              action: () => {
                this.$shepherd.cancel();
		this.$shepherd.removeStep('welcome-step');
                this.tourStore.setHomeCompleted();
              },
            },
          ],
        },
        {
          id: 'go-to-marketplace',
          attachTo: {
            element: '#go-to-marketplace',
            on: 'bottom',
          },
          text: 'Click here to go to the marketplace',
          scrollTo: {
            // Make sure the element is in the viewport
            behavior: 'smooth',
            block: 'end',
          },
          buttons: [
            {
              text: 'Finish',
              action: () => {
                this.$shepherd.complete();
		this.$shepherd.removeStep('go-to-marketplace');
                this.tourStore.setHomeCompleted();
              },
            }
          ],
        },
      ];

      this.$shepherd.addSteps(steps);
      this.$shepherd.start();
      this.tourStore.setHomeCompleted();
    },
    waitForLoad() {
      return new Promise<void>(resolve => {
        const checkValue = () => {
          if (this.tourStore.suggestedWinesDialog === false) {
            resolve();
          } else {
            setTimeout(checkValue, 100); // wait for 100 milliseconds before checking again
          }
        };
        checkValue();
      });
    },
  },
});
</script>

<style></style>
