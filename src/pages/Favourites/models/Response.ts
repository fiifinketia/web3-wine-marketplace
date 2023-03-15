interface FavoritesModel {
	contractAddress: string;
	network: string;
	tokenID: string;
	walletAddress: string;
	nftDetails: {
		image: string;
		brand: string;
		orderDetails?: {
			listingPrice?: string;
			currency?: string;
			orderHash?: string;
			transactionStatus?: boolean;
			expTime?: number;
		};
	};

	favoriteLoading: null | boolean;
}

export { FavoritesModel };
