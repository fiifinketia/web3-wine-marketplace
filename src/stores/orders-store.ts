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
    selectedIncomingSortKey: '',

    listingBrandFilter: '',
    outgoingBrandFilter: '',
    incomingBrandFilter: '',

    listingBrandFilterStatus: false,
    outgoingBrandFilterStatus: false,
    incomingBrandFilterStatus: false
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
    getIncomingSortKey: (state) => state.selectedIncomingSortKey,

    getListingBrandFilter: (state) => state.listingBrandFilter,
    getOutgoingBrandFilter: (state) => state.outgoingBrandFilter,
    getIncomingBrandFilter: (state) => state.incomingBrandFilter,

    getListingBrandFilterStatus: (state) => state.listingBrandFilterStatus,
    getOutgoingBrandFilterStatus: (state) => state.outgoingBrandFilterStatus,
    getIncomingBrandFilterStatus: (state) => state.incomingBrandFilterStatus
	},
	actions: {
		async setListings(walletAddress: string, sortKey: string, brandFilter: string) {
      this.listings = await ReturnListings(walletAddress, sortKey, brandFilter);
      this.fetchedListings = true;
		},
    async setOutgoingOffers(walletAddress: string, sortKey: string, brandFilter: string) {
      this.outgoingOffers = await ReturnOutgoingOffers(walletAddress, sortKey, brandFilter);
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
    },

    setListingBrandFilter(brandFilter: string) {
      this.listingBrandFilter = brandFilter;
    },
    setOutgoingBrandFilter(brandFilter: string) {
      this.outgoingBrandFilter = brandFilter;
    },
    setIncomingBrandFilter(brandFilter: string) {
      this.incomingBrandFilter = brandFilter
    },

    setListingBrandFilterStatus(status: boolean) {
      this.listingBrandFilterStatus = status;
    },
    setOutgoingBrandFilterStatus(status: boolean) {
      this.outgoingBrandFilterStatus = status;
    },
    setIncomingBrandFilterStatus(status: boolean) {
      this.incomingBrandFilterStatus = status;
    },
  }
});
