import { TokenIdentifier } from './NFT.model';

enum NOTIFICATION_CODES {
  VERIFF_STARTED = 201,
  VERIFF_SUBMITTED = 202,
  VERIFF_POSITIVE = 203,
  VERIFF_NEGATIVE = 204,
  VERIFF_RESUBMITTED = 205,
  VERIFF_EXPIRED = 206,
  VERIFF_REVIEW = 207,
  
  LISTING_CREATED = 100,
  OFFER_CREATED = 101,

  LISTING_REMOVED = 110,
  OFFER_REMOVED = 111,

  OFFER_RECEIVED = 120,
  OFFER_OUTBID = 121,

  OFFER_ACCEPTED_NEW_OWNER = 130,
  OFFER_ACCEPTED_OLD_OWNER = 131,
  LISTING_PURCHASED_OLD_OWNER = 132,
  LISTING_PURCHASED_NEW_OWNER = 133,
  
  WINE_CHANGED = 140,
}

enum TXN_STATUS {
  TRANSACTION_PENDING = 500,
  TRANSACTION_CANCELLED = 501,
  TRANSACTION_COMPLETED = 502,
  TRANSACTION_ERROR = 503,
}

enum VERIFF_NOTIFICATION_STATUS {
  STARTED = 7001,
  SUBMITTED = 7002,
  POSITIVE = 9001,
  NEGATIVE = 9102,
  RESUBMITTED = 9103,
  EXPIRED = 9104,
  REVIEW = 9121,
}

interface NotificationSchema {
  link?: string;
}

interface TransactionNotificationModel
  extends NotificationSchema,
    TokenIdentifier {
  status: TXN_STATUS;
  orderPrice?: string;
  orderCurrency?: string;
}

interface VeriffNotificationModel extends NotificationSchema {
  status: VERIFF_NOTIFICATION_STATUS;
  text: string;
}

interface NotificationReceived<T> {
  walletAddress: string;
  code: NOTIFICATION_CODES;
  message: string;
  data: T;
}

export {
  NOTIFICATION_CODES,
  NotificationReceived,
  TransactionNotificationModel,
  VeriffNotificationModel,
  TXN_STATUS
};
