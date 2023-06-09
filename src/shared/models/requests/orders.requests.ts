import { CancelOrderModel, OrderModel } from "src/pages/Metadata/models/Orders";
import { NOTIFICATION_CODES, TXN_STATUS } from "../entities/notifications.model";
import { TokenIdentifier } from "../entities/NFT.model";

interface CancelOrderRequest {
  order: CancelOrderModel;
  status: TXN_STATUS;
  notificationCode: NOTIFICATION_CODES.LISTING_REMOVED | NOTIFICATION_CODES.OFFER_REMOVED;
  apiKey: string;
}

interface CreateOrderRequest {
  order: OrderModel;
  blockNumber: number;
  apiKey: string;
}

interface FulfillOrderRequest extends TokenIdentifier{
  brand: string;
  image: string;
  orderHash: string;
  isOwner: boolean;
  nonce: number;
  walletAddress: string;
  blockNumber: number;
  offerer: string;
  apiKey: string;
}

export {
  CancelOrderRequest,
  CreateOrderRequest,
  FulfillOrderRequest
}