import { defineStore } from 'pinia';
import { IncomingOffersResponse, ListingsResponse, OutgoingOffersResponse } from 'src/pages/Profiles/models/response.models';
import { ReturnListings, ReturnIncomingOffers, ReturnOutgoingOffers } from 'src/pages/Profiles/orders.requests';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';

export const ordersStore = defineStore('ordersStore', {
	state: () => ({
		listings: [] as ListingsResponse[],
		outgoingOffers: [] as OutgoingOffersResponse[],
		incomingOffers: [] as IncomingOffersResponse[],
    fetchedOutgoingOffers: false,
    fetchedIncomingOffers: false,
    fetchedListings: false
	}),
	getters: {
		getListings: (state) => state.listings,
		getOutgoingOffers: (state) => state.outgoingOffers,
		getIncomingOffers: (state) => state.incomingOffers,
    getListingRequestStatus: (state) => state.fetchedListings,
    getOutgoingOffersRequestStatus: (state) => state.fetchedOutgoingOffers,
    getIncomingOffersRequestStatus: (state) => state.fetchedIncomingOffers
	},
	actions: {
		async setListings(walletAddress: string) {
      this.listings = await ReturnListings(walletAddress);
      this.fetchedListings = true;
      console.log('listings', this.listings)
		},
    async setOutgoingOffers(walletAddress: string) {
      this.outgoingOffers = await ReturnOutgoingOffers(walletAddress);
      this.fetchedOutgoingOffers = true;
      console.log('outgoing offers', this.outgoingOffers)
    },
    async setIncomingOffers(ownedNFTs: TokenIdentifier[]) {
      this.incomingOffers = await ReturnIncomingOffers(ownedNFTs);
      this.fetchedIncomingOffers = true;
      console.log('incoming offers', this.incomingOffers)
    }
  }
});
