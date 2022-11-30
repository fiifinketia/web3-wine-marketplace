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
    fetchedListings: false,
    selectedListingSortKey: '',
    selectedOutgoingSortKey: '',
    selectedIncomingSortKey: ''
	}),
	getters: {
		getListings: (state) => state.listings,
		getOutgoingOffers: (state) => state.outgoingOffers,
		getIncomingOffers: (state) => state.incomingOffers,
    getListingRequestStatus: (state) => state.fetchedListings,
    getOutgoingOffersRequestStatus: (state) => state.fetchedOutgoingOffers,
    getIncomingOffersRequestStatus: (state) => state.fetchedIncomingOffers,
    getListingSortKey: (state) => state.selectedListingSortKey,
    getOutgoingSortKey: (state) => state.selectedOutgoingSortKey,
    getIncomingSortKey: (state) => state.selectedIncomingSortKey
	},
	actions: {
		async setListings(walletAddress: string, sortKey: string) {
      this.listings = await ReturnListings(walletAddress, sortKey);
      this.fetchedListings = true;
		},
    async setOutgoingOffers(walletAddress: string, sortKey: string) {
      this.outgoingOffers = await ReturnOutgoingOffers(walletAddress, sortKey);
      this.fetchedOutgoingOffers = true;
    },
    async setIncomingOffers(ownedNFTs: TokenIdentifier[], sortKey: string) {
      this.incomingOffers = await ReturnIncomingOffers(ownedNFTs, sortKey);
      this.fetchedIncomingOffers = true;
    },
    setListingSortKey(sortKey: string) {
      this.selectedListingSortKey = sortKey;
    },
    setOutgoingSortKey(sortKey: string) {
      this.selectedOutgoingSortKey = sortKey;
    },
    setIncomingSortKey(sortKey: string) {
      this.selectedIncomingSortKey = sortKey;
    }
  }
});
