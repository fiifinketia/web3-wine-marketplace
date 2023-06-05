import { TokenIdentifier } from './NFT.model';

enum NOTIFICATION_CODES {
  LISTING_CREATED = 100,
  OFFER_CREATED = 101,
  LISTING_DELIST = 110,
  OFFER_DELIST = 111,
  OFFER_RECEIVED = 120,
  OFFER_OUTBID = 121,
  OFFER_ACCEPTED = 130,
  LISTING_ACCEPTED = 131,
  WINE_CHANGED = 140
}

enum TXN_STATUS {
  TRANSACTION_PENDING = 500,
  TRANSACTION_CANCELLED = 501,
  TRANSACTION_COMPLETED = 502,
  TRANSACTION_ERROR = 503
}

enum VERIFF_NOTIFICATION_STATUS {}

interface NotificationSchema {
  link?: string;
}

interface TransactionNotificationModel extends NotificationSchema, TokenIdentifier {
  status: TXN_STATUS;
  orderPrice?: string;
  orderCurrency?: string;
}

interface VeriffNotificationModel extends NotificationSchema {
  status: VERIFF_NOTIFICATION_STATUS;
}

interface NotificationReceived<T> {
  walletAddress: string;
  code: NOTIFICATION_CODES;
  message?: string;
  data: T;
}

export {
  NOTIFICATION_CODES,
  NotificationReceived,
  TransactionNotificationModel,
  VeriffNotificationModel
}