import { OrderWithCounter } from '@opensea/seaport-js/lib/types';
import { Seaport } from '@opensea/seaport-js';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';

interface OrderPrice {
  offerPrice?: string;
  offerCurrency?: string;
  listingPrice?: string;
  listingCurrency?: string;
}

interface OtherOrderDetails {
  readonly from: string;
  readonly orderHash: string;
  readonly brand: string;
	readonly image: string;
}

interface OrderModel extends OrderWithCounter, TokenIdentifier, OrderPrice, OtherOrderDetails {
  nonce?: number;
}

interface SeaportInstance {
  seaport: Seaport;
  network: string;
}

interface CreateOrderRequest {
  readonly order: OrderModel,
  readonly blockNumber: number;
  readonly apiKey: string;
}

interface CancelOrderRequest extends OrderPrice, TokenIdentifier {
  readonly orderHash: string;
  readonly walletAddress: string;
  readonly nonce: number;
  readonly blockNumber: number;
  readonly apiKey: string;
}

interface FulfillOrderRequest extends TokenIdentifier, OrderPrice {
	readonly brand: string;
	readonly image: string;
	readonly orderHash: string;
	readonly isOwner: boolean;
	readonly nonce: number;
	readonly walletAddress: string;
	readonly blockNumber: number;
	readonly offerer: string;
  readonly apiKey: string;
}

enum ItemType {
  NATIVE = 0,
  ERC20 = 1,
  ERC721 = 2,
  ERC1155 = 3,
  ERC721_WITH_CRITERIA = 4,
  ERC1155_WITH_CRITERIA = 5,
}

enum ChainID {
  ETHEREUM = 1,
  POLYGON = 137,
  RINKEBY = 4,
  MUMBAI = 80001,
}

interface RetrieveOrderResponse extends OrderWithCounter, TokenIdentifier {
  from: string;
}

export {
  OrderModel,
  CreateOrderRequest,
  FulfillOrderRequest,
  CancelOrderRequest,
  SeaportInstance,
  ItemType,
  ChainID,
  RetrieveOrderResponse
}
