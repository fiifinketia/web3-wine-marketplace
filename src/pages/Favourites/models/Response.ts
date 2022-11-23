export interface FavoritesModel {
	contractAddress: string;
	network: string;
	tokenID: string;
	walletAddress: string;
	nftDetails: {
		image: string;
		orderDetails?: {
			listingPrice?: string;
			currency?: string;
			orderHash?: string;
			transactionStatus?: boolean;
			expTime?: number;
		};
	};
}
