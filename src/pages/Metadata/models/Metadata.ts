export enum TOKENTYPE {
  ERC1155 = 'ERC1155',
  ERC721 = 'ERC721',
}
interface TokenProperties {
  amount?: number;
  hasValueToken?: boolean;
  dateAdded?: number;
  isOwner?: boolean;
  tokenType?: TOKENTYPE;
}

export interface NewPolygonNFT extends TokenProperties {
  tokenID: string;
  description: string;
  image: string;
  name: string;
  wivVintage: string;
  brand: string;
  producer: string;
  productionCountry: string;
  region: string;
  appellation: string;
  vintage: string;
  grape: string;
  lwin: string;
  maturity: string;
  heritage: string;
  investmentGrade: string;
  case: string;
  origin: string;
  source: string;
  type: string;
  format: string;
  smartContractAddress: string;
  network: string;
  typeID?: string;
}

export interface SeaportTransactionsModel {
  network: string;
  to?: string;
  from: string;
  event: string;
  transactionHash: string;
  contractAddress: string;
  identifierOrCriteria: string;
  price?: string;
  timestamp: number;
  currency: string;
  image?: string;
  brand?: string;
}

interface FavoritesAndOrderDetails {
  favorited?: null | boolean;

  offerDetails: {
    highestBidCurrency: string | null;
    highestBid: string | null;
    highestBidHash: string | null;
    highestBidExpTime: number | null;
  };

  listingDetails: {
    listingPrice: string | null;
    currency: string | null;
    orderHash: string | null;
    transactionStatus: boolean | null;
    listingCancellationStatus: boolean | null;
    expTime: string | null;
  };
}

export interface ListingDetails {
  listingPrice: string | null;
  currency: string | null;
  orderHash: string | null;
  transactionStatus: boolean | null;
  listingCancellationStatus: boolean | null;
  expTime: string | null;
}

export interface OfferDetails {
  highestBidCurrency: string | null;
  highestBid: string | null;
  highestBidHash: string | null;
  highestBidExpTime: number | null;
}

export interface NFTHistoryDetails {
  txns: SeaportTransactionsModel[],
  wivaChart: number[][],
  stableChart: number[][]
}

export interface NFTWithListingAndFavorites extends NewPolygonNFT, FavoritesAndOrderDetails {
  favoriteLoading?: null | boolean;
}
