<template>
  <div class="headline-container full-width column justify-center items-center">
    <q-img
      class="grape-img-left"
      src="../../../../public/images/Grape-left.svg"
    />
    <q-img
      class="grape-img-right"
      src="../../../../public/images/Grape-right.svg"
    />
    <q-img
      class="grape-mobile"
      src="../../../../public/images/Grape-mobile.svg"
    />
    <h1 id="welcome-step" class="headline-title q-mb-xs">WiV Marketplace</h1>
    <p class="headline-paragraph q-mb-lg">
      We offer the best fine wine investments
    </p>
    <div class="headline-buttons-container row q-mt-md">
      <q-btn class="headline-buttons" unelevated color="primary" no-caps
        >Start collection</q-btn
      >
      <q-btn class="headline-buttons" unelevated color="primary" outline no-caps
        >Learn about WiV</q-btn
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import '../../../css/Homepage/HeadlineComponent.css';
import { useTourStore } from 'src/stores/tour-state';
import { StepOptions } from 'vue-shepherd';

export default defineComponent({
  name: 'HeadlineComponent',
  data() {
    const tourStore = useTourStore();

    return {
      tourStore,
    };
  },
  mounted() {
    if (!this.tourStore.homeCompleted) {
			setTimeout(()=>{
				this.tourHomepage();
			}, 3000)
    }
  },
  methods: {
    tourHomepage() {
      // Adding steps to the tour
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
							text: 'Continue',
              action: () => {
                this.$shepherd.removeStep('go-to-marketplace');
              },
						},
            {
              text: 'Skip',
              action: () => {
                this.$shepherd.cancel();
                this.tourStore.setHomeCompleted();
              },
            },
          ],
        },
      ];

      this.$shepherd.addSteps(steps);
			this.$shepherd.start();
    },
  },
});
</script>

<style></style>
