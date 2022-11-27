import { defineStore } from 'pinia';
import { IncomingOffersResponse, ListingsResponse, OutgoingOffersResponse } from 'src/pages/Profiles/models/response.models';
import { ReturnListings, ReturnOffers } from 'src/pages/Profiles/orders.requests';

export const ordersStore = defineStore('ordersStore', {
	state: () => ({
		listings: [] as ListingsResponse[],
		outgoingOffers: [] as OutgoingOffersResponse[],
		incomingOffers: [] as IncomingOffersResponse[],
    fetchedOffers: false,
    fetchedListings: false
	}),
	getters: {
		getListings: (state) => state.listings,
		getOutgoingOffers: (state) => state.outgoingOffers,
		getIncomingOffers: (state) => state.incomingOffers,
    getListingRequestStatus: (state) => state.fetchedListings,
    getOffersRequestStatus: (state) => state.fetchedOffers
	},
	actions: {
		async setListings(walletAddress: string) {
      this.listings = await ReturnListings(walletAddress);
      this.fetchedListings = true;
      console.log('listings', this.listings)
		},
    async setOffers(walletAddress: string) {
      const { incoming, outgoing } = await ReturnOffers(walletAddress);
      this.outgoingOffers = outgoing;
      this.incomingOffers = incoming;
      this.fetchedOffers = true;
      console.log('incoming', incoming)
      console.log('outgoing', outgoing)
    }
  }
});
