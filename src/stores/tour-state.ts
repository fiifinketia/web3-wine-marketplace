import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTourStore = defineStore(
  'tourState',
  () => {
    const homeCompleted = ref(false);
    const marketplaceCompleted = ref(false);
    const metadataCompleted = ref(false);

    const setHomeCompleted = () => {
      homeCompleted.value = true;
    };

		const setMarketplaceCompleted = () => {
      homeCompleted.value = true;
    };

		const setMetadataCompleted = () => {
      homeCompleted.value = true;
    };

    return {
      homeCompleted,
			marketplaceCompleted,
			metadataCompleted,
      setHomeCompleted,
			setMarketplaceCompleted,
			setMetadataCompleted,
    };
  },
  { persist: true }
);
