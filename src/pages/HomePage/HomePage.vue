<template>
  <HeadlineComponent style="z-index: 0"/>
  <ExclusiveOffers class="q-px-md" style="z-index: 0" @shepherd-remove-step="id => shepherd.removeStep(id)" />
  <Calculator />
  <!-- <TrendingWines class="trending" /> -->
  <!-- <PartnershipWines class="partnership" /> -->
  <FAQ
    style="margin-bottom: 150px"
    class="faq"
    @open-help-center-faqs="$emit('openHelpCenterFaqs')"
    @open-help-center-support="$emit('openHelpCenterSupport')"
  />
  <LandingPageFooter
    @open-help-center-faqs="$emit('openHelpCenterFaqs')"
    @open-help-center-support="$emit('openHelpCenterSupport')"
		@open-terms-and-conditions="showTermsAndConditions = true"
  />
  <SuggestedWines
    v-model="DisplayRecommendations"
    :recommendations="recommendations"
    @favorite-action="
      action => FavoriteAction(action.source, action.nftIndex, action.state)
    "
  />
	<wiv-toc-dialog
		v-model="showTermsAndConditions"
		close-button
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useShepherd, Tour } from 'vue-shepherd';
import Calculator from './components/Calculator.vue';
import HeadlineComponent from './components/HeadlineComponent.vue';
import LandingPageFooter from './components/Footer.vue';
import ExclusiveOffers from './components/ExclusiveOffers.vue';
// import PartnershipWines from './components/PartnershipWines.vue';
import FAQ from './components/FAQ.vue';
import { useTourStore } from 'src/stores/tour-state';
import { StepOptions } from 'vue-shepherd';
import { useNFTStore } from 'src/stores/nft-store';
import { ListingWithPricingAndImage } from '../Marketplace-Main/models/Response.models';
import { AssociateOwned } from 'src/shared/association.helper';
import { RetrieveFilteredNFTs } from '../Marketplace-Main/services/RetrieveTokens';
import SuggestedWines from 'src/layouts/components/SuggestedWines.vue';

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
    SuggestedWines: SuggestedWines
  },
  emits: ['openHelpCenterFaqs', 'openHelpCenterSupport'],
  data() {
    const tourStore = useTourStore();
    const nftStore = useNFTStore();
    const shepherd = useShepherd({
      useModalOverlay: true,
    }) as Tour;
    return {
      tourStore,
      shepherd,
      nftStore,
      recommendations: [] as ListingWithPricingAndImage[],
      recommendationsFetched: false,
			showTermsAndConditions: false,
    };
  },
  computed: {
    DisplayRecommendations() {
      return this.recommendationsFetched && this.tourStore.suggestedWinesDialog;
    },
  },

  async mounted() {
    try {
      await this.SetUpRecommendations();
      if (this.recommendations.length > 0) {
        this.startPageTour();
      }
    } catch {
      return;
    }
  },

  methods: {
    async startPageTour() {
      if (this.tourStore.homeCompleted) return;
      await this.waitForLoad();

      const steps: StepOptions[] = [
        {
          id: 'welcome-step',
          attachTo: {
            element: '#welcome-step',
            on: 'bottom',
          },
          text: 'Welcome to the WiV Marketplace',
          classes: 'tour-style',
          buttons: [
            {
              text: 'Continue',
              action: () => {
                this.shepherd.next();
                this.shepherd.removeStep('welcome-step');
              },
            },
            {
              text: 'Skip',
              action: () => {
                this.shepherd.complete();
                this.shepherd.removeStep('welcome-step');
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
          classes: 'tour-style',
          scrollTo: {
            // Make sure the element is in the viewport
            behavior: 'smooth',
            block: 'end',
          },
          buttons: [
            {
              text: 'Finish',
              action: () => {
                this.shepherd.complete();
                this.shepherd.removeStep('go-to-marketplace');
                this.tourStore.setHomeCompleted();
              },
            },
          ],
        },
      ];

      this.shepherd.addSteps(steps);
      this.shepherd.start();
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
    IncorporateOwnedNFTs(retrievedNFTs: ListingWithPricingAndImage[]) {
      const nftsFetched = this.nftStore.fetchNFTsStatus;
      if (!!nftsFetched) {
        this.recommendations = AssociateOwned(
          retrievedNFTs,
          this.nftStore.ownedNFTs
        );
      } else {
        this.recommendations = retrievedNFTs;
      }
    },
    async SetUpRecommendations() {
      if (this.tourStore.suggestedWinesDialog) {
        const { result: nfts } = await RetrieveFilteredNFTs();
        if (nfts.length > 0) {
          this.recommendations = nfts.slice(0, 4);
          this.recommendationsFetched = true;
        }
      }
    },
    FavoriteAction(
      source: string,
      nftIndex: number,
      state: 'favorited' | 'unfavorited' | 'processing'
    ) {
      switch (source) {
        case 'suggestions':
          if (state == 'favorited') {
            this.recommendations[nftIndex].favorited = true;
            this.recommendations[nftIndex].favoriteLoading = false;
          } else if (state == 'unfavorited') {
            this.recommendations[nftIndex].favorited = false;
            this.recommendations[nftIndex].favoriteLoading = false;
          } else if (state == 'processing') {
            this.recommendations[nftIndex].favoriteLoading = true;
          }
          break;
      }
    },
  },
});
</script>

<style></style>
