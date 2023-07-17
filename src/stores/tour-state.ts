import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTourStore = defineStore(
  'tourState',
  () => {
    const homeCompleted = ref(false);
    const marketplaceCompleted = ref(false);
    const metadataCompleted = ref(false);
    const favoritesCompleted = ref(false);
    const termsAndConditionsAgreed = ref(false);
    const suggestedWinesDialog = ref(true); // Setting this to true will show the dialog on page load

    const suggestionTimeout = ref(Date.now()); // Every day(24/hours) in milliseconds (86400000)

    // If the dialog has not been shown
    // And the user has not seen it in the past day of their timezone
    // Then show the dialog
    if (
      !suggestedWinesDialog.value &&
      Date.now() - suggestionTimeout.value > 86400000
    ) {
      suggestedWinesDialog.value = true;
    }

    // if (
    //   suggestedWinesDialog.value ||
    //   Date.now() - suggestionTimeout.value <= 86400000
    // ) {
    //   suggestedWinesDialog.value = false;
    // }

    const setHomeCompleted = () => {
      homeCompleted.value = true;
    };

    const setMarketplaceCompleted = () => {
      marketplaceCompleted.value = true;
    };

    const setMetadataCompleted = () => {
      metadataCompleted.value = true;
    };

    const setFavoritesCompleted = () => {
      favoritesCompleted.value = true;
    };

    const setTermsAndConditionsAgreed = () => {
      termsAndConditionsAgreed.value = true;
    };

    const setSuggestedWinesDialog = () => {
      suggestedWinesDialog.value = false;
      suggestionTimeout.value = Date.now();
    };

    return {
      homeCompleted,
      marketplaceCompleted,
      metadataCompleted,
      favoritesCompleted,
      termsAndConditionsAgreed,
      suggestedWinesDialog,
      setHomeCompleted,
      setMarketplaceCompleted,
      setMetadataCompleted,
      setFavoritesCompleted,
      setTermsAndConditionsAgreed,
      setSuggestedWinesDialog,
    };
  },
  { persist: true }
);
