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
      if (!this.ongoingListings[nftKey]) {
        this.ongoingListings[nftKey] = true;
        const channel = new BroadcastChannel('listingStore')
        channel.postMessage({ action: 'setNFTListingStatus', payload: nftKey })
      }
    },
    removeNFTListingStatus(nftKey: string) {
      if (!!this.ongoingListings[nftKey]) {
        delete this.ongoingListings[nftKey];
        const channel = new BroadcastChannel('listingStore')
        channel.postMessage({ action: 'removeNFTListingStatus', payload: nftKey })
      }
    }
  },
  // We can persist this so client page refreshes reflect the NFT ongoing txn status,
  // but it would be very hard to update the localStorage if we do this,
  // and client may be unable to list that NFT forever.
  // Persist basically uses localStorage
  persist: false,
  // This below hydrates the localStorage string into object
  // hydrate(storeState, initialState) {
  //   initialState.ongoingListings = {
  //     ...initialState.ongoingListings,
  //     ...storeState.ongoingListings
  //   };
  // }
});
