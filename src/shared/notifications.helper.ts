import { NOTIFICATION_CODES, NotificationSettingCodeEnum, TXN_STATUS } from './models/entities/notifications.model';
import { GetCurrencyLabel } from './currency.helper';

export class NotificationsHelper {
  GetTransactionType(code: NOTIFICATION_CODES, status: TXN_STATUS) {
    return `${code}:${status}`;
  }

  GetTransactionLinkName(code: NOTIFICATION_CODES) {
    if (
      code == NOTIFICATION_CODES.LISTING_CREATED ||
      code == NOTIFICATION_CODES.LISTING_REMOVED ||
      code == NOTIFICATION_CODES.OFFER_CREATED ||
      code == NOTIFICATION_CODES.OFFER_RECEIVED ||
      code == NOTIFICATION_CODES.OFFER_REMOVED ||
      code == NOTIFICATION_CODES.OFFER_OUTBID
    ) {
      return 'See NFT';
    }
    // code == NOTIFICATION_CODES.LISTING_PURCHASED_NEW_OWNER ||
    // code == NOTIFICATION_CODES.LISTING_PURCHASED_OLD_OWNER ||
    // code == NOTIFICATION_CODES.OFFER_ACCEPTED_NEW_OWNER ||
    // code == NOTIFICATION_CODES.OFFER_ACCEPTED_OLD_OWNER
    return 'See TXN'
  }

  GetNotificationIcon(code: NOTIFICATION_CODES) {
    switch (code) {
      case NOTIFICATION_CODES.LISTING_CREATED:
        return 'app:listing-notif';
      case NOTIFICATION_CODES.OFFER_CREATED:
        return 'app:offer-notif';
      case NOTIFICATION_CODES.LISTING_REMOVED:
        return 'app:unlist-notif';
      case NOTIFICATION_CODES.OFFER_REMOVED:
        return 'app:revoke-offer-notif';
      case NOTIFICATION_CODES.OFFER_RECEIVED:
        return 'app:receive-offer-notif';
      case NOTIFICATION_CODES.OFFER_OUTBID:
        return 'app:offer-notif';
      case NOTIFICATION_CODES.OFFER_ACCEPTED_NEW_OWNER:
        return 'app:receive-nft-notif';
      case NOTIFICATION_CODES.OFFER_ACCEPTED_OLD_OWNER:
        return 'app:offer-accepted-notif';
      case NOTIFICATION_CODES.LISTING_PURCHASED_NEW_OWNER:
        return 'app:receive-nft-notif';
      case NOTIFICATION_CODES.LISTING_PURCHASED_OLD_OWNER:
        return 'app:listing-purchased-notif';
    }
  }

  GetTransactionNotificationMessage(code: NOTIFICATION_CODES, status: TXN_STATUS, orderPrice: string, orderCurrency: string, brand: string) : string | undefined {
    const type = this.GetTransactionType(code, status);
    // this orderType for generating messages is only applicable for new orders
    const orderType = code == NOTIFICATION_CODES.LISTING_CREATED ? 'listing' : 'offer';
    const orderCurrencyLabel = GetCurrencyLabel(orderCurrency);
    if (
      type == NotificationSettingCodeEnum.LISTING_CREATED_PENDING ||
      type == NotificationSettingCodeEnum.OFFER_CREATED_PENDING
    ) {
      return `Your ${orderType} of ${orderPrice} ${orderCurrencyLabel} for ${brand} is on its way!`
    } else if (
      type == NotificationSettingCodeEnum.LISTING_CREATED_CANCELLED ||
      type == NotificationSettingCodeEnum.OFFER_CREATED_CANCELLED
    ) {
      return `You have cancelled your ${orderType} of ${orderPrice} ${orderCurrencyLabel} for ${brand}.`
    } else if (
      type == NotificationSettingCodeEnum.LISTING_CREATED_COMPLETED ||
      type == NotificationSettingCodeEnum.OFFER_CREATED_COMPLETED
    ) {
      return `Your ${orderType} of ${orderPrice} ${orderCurrencyLabel} for ${brand} is live!`
    } else if (
      type == NotificationSettingCodeEnum.LISTING_CREATED_ERROR ||
      type == NotificationSettingCodeEnum.OFFER_CREATED_ERROR
    ) {
      return `There was a problem with your ${orderType} of ${orderPrice} ${orderCurrencyLabel} for ${brand}.`
    } else if (type == NotificationSettingCodeEnum.OFFER_RECEIVED) {
      return `You have received an offer of ${orderPrice} ${orderCurrencyLabel} for ${brand}!`
    } else if (type == NotificationSettingCodeEnum.LISTING_PURCHASED_OLD_OWNER) {
      return `Your listing for ${brand} has been successfully purchased! You have received ${orderPrice} ${orderCurrencyLabel}.`
    } else if (type == NotificationSettingCodeEnum.LISTING_PURCHASED_NEW_OWNER) {
      return `You have successfully purchased ${brand} for ${orderPrice} ${orderCurrencyLabel}.`
    } else if (type == NotificationSettingCodeEnum.LISTING_PURCHASED_ERROR) {
      return `There was a problem with your purchase for ${brand} of ${orderPrice} ${orderCurrencyLabel}.`
    } else if (type == NotificationSettingCodeEnum.OFFER_ACCEPTED_NEW_OWNER) {
      return `Your offer of ${orderPrice} ${orderCurrencyLabel} for ${brand} has been successfully accepted!`
    } else if (type == NotificationSettingCodeEnum.OFFER_ACCEPTED_OLD_OWNER) {
      return `You have successfully accepted an offer for ${brand}. You have received ${orderPrice} ${orderCurrencyLabel}.`
    } else if (type == NotificationSettingCodeEnum.OFFER_CREATED_ERROR) {
      return `There was a problem with the offer for ${brand} of ${orderPrice} ${orderCurrencyLabel} that you accepted.`
    } else if (type == NotificationSettingCodeEnum.REMOVE_LISTING_PENDING) {
      return `Your listing of ${orderPrice} ${orderCurrencyLabel} for ${brand} is currently being cancelled!`
    } else if (type == NotificationSettingCodeEnum.REMOVE_OFFER_PENDING) {
      return `Your offer of ${orderPrice} ${orderCurrencyLabel} for ${brand} is currently being cancelled!`
    } else if (type == NotificationSettingCodeEnum.REMOVE_LISTING_CANCELLED) {
      return `You have cancelled your ongoing wine unlisting for ${brand} of ${orderPrice} ${orderCurrencyLabel}`
    } else if (type == NotificationSettingCodeEnum.REMOVE_OFFER_CANCELLED) {
      return `You have cancelled your ongoing wine offer withdrawal for ${brand} of ${orderPrice} ${orderCurrencyLabel}`
    } else if (type == NotificationSettingCodeEnum.REMOVE_LISTING_COMPLETED) {
      return `Your listing of ${orderPrice} ${orderCurrencyLabel} for ${brand} is removed from the marketplace!`
    } else if (type == NotificationSettingCodeEnum.REMOVE_OFFER_COMPLETED) {
      return `Your offer of ${orderPrice} ${orderCurrencyLabel} for ${brand} is removed from the marketplace!`
    } else if (type == NotificationSettingCodeEnum.REMOVE_LISTING_ERROR) {
      return `There was a problem with removing your listing of ${orderPrice} ${orderCurrencyLabel} for ${brand}.`
    } else if (type == NotificationSettingCodeEnum.REMOVE_OFFER_ERROR) {
      return `There was a problem with withdrawing your wine offer of ${orderPrice} ${orderCurrencyLabel} for ${brand}.`
    }
  }
}