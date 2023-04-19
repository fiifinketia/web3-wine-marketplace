interface FavoritesModel {
  smartContractAddress: string;
  network: string;
  tokenID: string;
  walletAddress: string;
  image: string;
  brand: string;
  orderDetails?: {
    listingPrice?: string;
    currency?: string;
    orderHash?: string;
    transactionStatus?: boolean;
    expTime?: number;
  };

  favoriteLoading: null | boolean;
}

export { FavoritesModel };
