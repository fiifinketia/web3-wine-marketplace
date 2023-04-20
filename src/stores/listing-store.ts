import { defineStore } from 'pinia';

export const useListingStore = defineStore('listingsStore', {
  state: () => ({
    ongoingListings: {} as {[key: string]: boolean}
  }),
  getters: {
    getNFTListingStatus: state => (nftKey : string) => {
      // console.log('working')
      return state.ongoingListings[nftKey] ?? false;
    }
  },
  actions: {
    setNFTListingStatus(nftKey: string) {
      if (!this.ongoingListings[nftKey]) {
        this.ongoingListings[nftKey] = true;
      }
    },
    removeNFTListingStatus(nftKey: string) {
      if (!!this.ongoingListings[nftKey]) {
        delete this.ongoingListings[nftKey];
      }
    }
  },
});
