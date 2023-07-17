import { OrderWithCounter } from '@opensea/seaport-js/lib/types';
import { Seaport } from '@opensea/seaport-js';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';

interface OrderPriceDetails {
  orderPrice?: string;
  orderCurrency?: string;
}

interface OtherOrderDetails {
  readonly from: string;
  readonly orderHash: string;
  readonly brand: string;
	readonly image: string;
}

interface OrderModel extends OrderWithCounter, TokenIdentifier, OrderPriceDetails, OtherOrderDetails {
  nonce?: number;
}

interface SeaportInstance {
  seaport: Seaport;
  network: string;
}

interface CancelOrderModel extends OrderPriceDetails, TokenIdentifier {
  readonly orderHash: string;
  readonly walletAddress: string;
  readonly nonce: number;
  readonly blockNumber: number;
  readonly apiKey: string;
  readonly brand: string;
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
  brand: string;
}

export {
  OrderModel,
  CancelOrderModel,
  SeaportInstance,
  ItemType,
  ChainID,
  RetrieveOrderResponse
}
