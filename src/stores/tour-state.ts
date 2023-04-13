import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTourStore = defineStore(
  'tourState',
  () => {
    const homeCompleted = ref(false);
    const marketplaceCompleted = ref(false);
    const metadataCompleted = ref(false);
		const favoritesCompleted = ref(false);

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

    return {
      homeCompleted,
			marketplaceCompleted,
			metadataCompleted,
			favoritesCompleted,
      setHomeCompleted,
			setMarketplaceCompleted,
			setMetadataCompleted,
			setFavoritesCompleted
    };
  },
  { persist: true }
);
