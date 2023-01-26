import { defineStore } from 'pinia';
import { IncomingOffersResponse, ListingsResponse, OutgoingOffersResponse, TransactionResponse } from 'src/pages/Profiles/models/response.models';
import { ReturnListings, ReturnIncomingOffers, ReturnOutgoingOffers, ReturnTransactions } from 'src/pages/Profiles/orders.requests';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';

export const ordersStore = defineStore('ordersStore', {
	state: () => ({
		listings: [] as ListingsResponse[],
    previousListings: [] as ListingsResponse[],

		outgoingOffers: [] as OutgoingOffersResponse[],
    previousOutgoingOffers: [] as OutgoingOffersResponse[],

		incomingOffers: [] as IncomingOffersResponse[],
    previousIncomingOffers: [] as IncomingOffersResponse[],

    transactions: [] as TransactionResponse[],
    previousTransactions: [] as TransactionResponse[],

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
      const listings = await ReturnListings(walletAddress, sortKey, brandFilter);
      this.listings = listings;
      if (this.listings.length > 0) {
        this.previousListings = listings;
      }
      this.fetchedListings = true;
		},
    resetListings() {
      this.listings = this.previousListings;
    },
    filterListings(orderHash: string) {
      this.listings = this.listings.filter(f => f.orderHash !== orderHash);
      this.previousListings = this.listings;
    },

    async setOutgoingOffers(walletAddress: string, sortKey: string, brandFilter: string) {
      const outgoingOffers = await ReturnOutgoingOffers(walletAddress, sortKey, brandFilter); 
      this.outgoingOffers = outgoingOffers;
      if (this.outgoingOffers.length > 0) {
        this.previousOutgoingOffers = outgoingOffers;
      }
      this.fetchedOutgoingOffers = true;
    },
    resetOutgoingOffers() {
      this.outgoingOffers = this.previousOutgoingOffers;
    },
    filterOutgoingOffers(orderHash: string) {
      this.outgoingOffers = this.outgoingOffers.filter(f => f.orderHash !== orderHash);
      this.previousOutgoingOffers = this.outgoingOffers;
    },

    async setIncomingOffers(ownedNFTs: TokenIdentifier[], sortKey: string, brandFilter: string) {
      const incomingOffers = await ReturnIncomingOffers(ownedNFTs, sortKey, brandFilter);
      this.incomingOffers = incomingOffers;
      if (this.incomingOffers.length > 0) {
        this.previousIncomingOffers = incomingOffers
      }
      this.fetchedIncomingOffers = true;
    },
    resetIncomingOffers() {
      this.incomingOffers = this.previousIncomingOffers;
    },
    filterIncomingOffers(token: TokenIdentifier) {
      const tokenKey = `${token.identifierOrCriteria},${token.contractAddress},${token.network}`;
      this.incomingOffers = this.incomingOffers.filter(f => {
          const offersKey = `${f.identifierOrCriteria},${f.contractAddress},${f.network}`
          return offersKey !== tokenKey
        }
      );
      this.previousIncomingOffers = this.incomingOffers;
    },

    async setTransactions(walletAddress: string, sortKey: string, brandFilter: string) {
      const transactions = await ReturnTransactions(walletAddress, sortKey, brandFilter);
      this.transactions = transactions;
      if (this.transactions.length > 0) {
        this.previousTransactions = transactions;
      }
      this.fetchedTransactions = true;
    },
    resetTransactions() {
      this.transactions = this.previousTransactions;
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
