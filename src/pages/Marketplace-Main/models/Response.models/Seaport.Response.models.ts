import { OrderWithCounter } from '@opensea/seaport-js/lib/types';
import { TokenIdentifier } from '../Request.models/Seaport.Request.models';

export interface RetrieveListingResponse extends OrderWithCounter, TokenIdentifier {
  network: string;
}

export interface ListingWithPricingAndImage {
  smartContractAddress: string;
  tokenID: string;
  image: string;
  lwin: string;
  // priceData: number;
  listingPrice: string;
  priceCurrency: string;
  brand: string;
  network: string;
}

interface NewPolygonNFT {
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
}


export interface SeaportListingModel {
  from: string;
  contractAddress?: string;
  identifierOrCriteria?: string;
  parameters: {
    offerer: string;
    zone: string;
    orderType: string;
    startTime: string;
    endTime: string;
    zoneHash: string;
    salt: string;
    conduitKey: string;
    totalOriginalConsiderationItems: string;
    counter: string;
    offer: [{
      itemType: string;
      token: string;
      startAmount: string;
      endAmount: string;
      identifierOrCriteria: string;
    }];
    consideration: [{
      itemType: string;
      token: string;
      startAmount: string;
      endAmount: string;
      identifierOrCriteria: string;
      recipient: string;
    }]
  },
  signature: string;
  orderHash?: string;
  network?: string;
}

export interface NFTWithListingsResponse {
  token: NewPolygonNFT;
  listings: ListingsDTO[];
  offers: ListingsDTO[];
  transactions: SeaportTransactionsModel[];
  latestPricing: string;
}

export interface ListingsDTO {
  orderHash: string;
  listPrice: string;
  listCurrency: string;
  timeLeft: string;
  usdPrice?: string;
  from: string;
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
}