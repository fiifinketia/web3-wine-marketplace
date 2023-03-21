import { OrderWithCounter } from '@opensea/seaport-js/lib/types';
import { Seaport } from '@opensea/seaport-js';
import { Transaction } from 'ethers';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';

interface OfferModel {
  item_type: number;
  token: string;
  identifier_or_criteria: string;
  startAmount?: number;
  endAmount?: number;
}

interface ConsiderationModel extends OfferModel {
  recipient: string;
}

interface Fee {
  recipient: string;
  basisPoints: number;
}
export interface OrderListingModel extends OrderWithCounter, TokenIdentifier {
  orderHash: string;
  network: string;
  from: string;
  brand: string;
  image: string;
  highestBid?: string;
  nonce?: number;
}

export interface OrderRequest {
  Input: {
    conduitKey?: string;
    zone?: string;
    startTime?: string;
    endTime?: string;
    offer: OfferModel;
    consideration: ConsiderationModel;
    counter?: number;
    allowPartialFills?: boolean;
    restrictedByZone?: boolean;
    fees?: Fee[];
    salt?: string;
  };
  accountAddress: string;
}

export interface SeaportInstance {
  seaport: Seaport;
  network: string;
}

export interface UpdateListingRequest extends TokenIdentifier {
  readonly notificationID: number;
  readonly brand: string;
  readonly image: string;

  readonly orderHash: string;
  readonly isOwner: boolean;
  readonly nonce: number;
  readonly walletAddress: string;
}

export interface UnverifiedFulfillment extends TokenIdentifier {
  readonly transaction: Transaction;
  readonly network: string;
}

export enum ItemType {
  NATIVE = 0,
  ERC20 = 1,
  ERC721 = 2,
  ERC1155 = 3,
  ERC721_WITH_CRITERIA = 4,
  ERC1155_WITH_CRITERIA = 5,
}

export enum ChainID {
  ETHEREUM = 1,
  POLYGON = 137,
  RINKEBY = 4,
  MUMBAI = 80001,
}

export interface RetrieveListingResponse
  extends OrderWithCounter,
    TokenIdentifier {
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
    offer: [
      {
        itemType: string;
        token: string;
        startAmount: string;
        endAmount: string;
        identifierOrCriteria: string;
      }
    ];
    consideration: [
      {
        itemType: string;
        token: string;
        startAmount: string;
        endAmount: string;
        identifierOrCriteria: string;
        recipient: string;
      }
    ];
  };
  signature: string;
  orderHash?: string;
  network?: string;
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
