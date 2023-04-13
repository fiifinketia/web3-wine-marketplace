import { defineStore } from 'pinia';

export const useListingStore = defineStore('listingsStore', {
  state: () => ({
    ongoingListings: {} as {[key: string]: boolean}
  }),
  getters: {
    getNFTListingStatus: state => (nftKey : string) => {
      console.log(state.ongoingListings)
      return state.ongoingListings[nftKey] ?? false;
    }
  },
  actions: {
    setNFTListingStatus(nftKey: string) {
      this.ongoingListings[nftKey] = true;
    },
    removeNFTListingStatus(nftKey: string) {
      delete this.ongoingListings[nftKey];
    }
  },
  persist: true,
  hydrate(storeState, initialState) {
    initialState.ongoingListings = {
      ...initialState.ongoingListings,
      ...storeState.ongoingListings
    };
  }
});
