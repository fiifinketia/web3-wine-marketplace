import { defineStore } from 'pinia';
import { IncomingOffersResponse, ListingsResponse, OutgoingOffersResponse, TransactionResponse } from 'src/pages/Profiles/models/response.models';
import { ReturnListings, ReturnIncomingOffers, ReturnOutgoingOffers, ReturnTransactions } from 'src/pages/Profiles/orders.requests';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';

export const ordersStore = defineStore('ordersStore', {
	state: () => ({
		listings: [] as ListingsResponse[],
		outgoingOffers: [] as OutgoingOffersResponse[],
		incomingOffers: [] as IncomingOffersResponse[],
    transactions: [] as TransactionResponse[],
    fetchedOutgoingOffers: false,
    fetchedIncomingOffers: false,
    fetchedListings: false,
    fetchedTransactions: false,

    selectedListingSortKey: '',
    selectedOutgoingSortKey: '',
    selectedIncomingSortKey: '',
    selectedTransactionSortKey: '',

    listingBrandFilter: '',
    outgoingBrandFilter: '',
    incomingBrandFilter: '',
    transactionBrandFilter: '',

    listingBrandFilterStatus: false,
    outgoingBrandFilterStatus: false,
    incomingBrandFilterStatus: false,
    transactionBrandFilterStatus: false
	}),
	getters: {
		getListings: (state) => state.listings,
		getOutgoingOffers: (state) => state.outgoingOffers,
		getIncomingOffers: (state) => state.incomingOffers,
    getTransactions: (state) => state.transactions,

    getListingRequestStatus: (state) => state.fetchedListings,
    getOutgoingOffersRequestStatus: (state) => state.fetchedOutgoingOffers,
    getIncomingOffersRequestStatus: (state) => state.fetchedIncomingOffers,
    getTransactionRequestStatus: (state) => state.fetchedTransactions,

    getListingSortKey: (state) => state.selectedListingSortKey,
    getOutgoingSortKey: (state) => state.selectedOutgoingSortKey,
    getIncomingSortKey: (state) => state.selectedIncomingSortKey,
    getTransactionSortKey: (state) => state.selectedTransactionSortKey,

    getListingBrandFilter: (state) => state.listingBrandFilter,
    getOutgoingBrandFilter: (state) => state.outgoingBrandFilter,
    getIncomingBrandFilter: (state) => state.incomingBrandFilter,
    getTransactionBrandFilter: (state) => state.transactionBrandFilter,

    getListingBrandFilterStatus: (state) => state.listingBrandFilterStatus,
    getOutgoingBrandFilterStatus: (state) => state.outgoingBrandFilterStatus,
    getIncomingBrandFilterStatus: (state) => state.incomingBrandFilterStatus,
    getTransactionBrandFilterStatus: (state) => state.transactionBrandFilterStatus
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
    async setIncomingOffers(ownedNFTs: TokenIdentifier[], sortKey: string, brandFilter: string) {
      this.incomingOffers = await ReturnIncomingOffers(ownedNFTs, sortKey, brandFilter);
      this.fetchedIncomingOffers = true;
    },
    async setTransactions(walletAddress: string, sortKey: string, brandFilter: string) {
      this.transactions = await ReturnTransactions(walletAddress, sortKey, brandFilter);
      this.fetchedTransactions = true;
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
    setTransactionSortKey(sortKey: string) {
      this.selectedTransactionSortKey = sortKey;
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
    setTransactionBrandFilter(brandFilter: string) {
      this.transactionBrandFilter = brandFilter
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
    setTransactionBrandFilterStatus(status: boolean) {
      this.transactionBrandFilterStatus = status;
    },
  }
});
