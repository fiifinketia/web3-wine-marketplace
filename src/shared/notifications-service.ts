import { io } from 'socket.io-client';
import { useUserStore } from 'src/stores/user-store';
import { Notify } from 'quasar';
import {
  ExtendedNotificationModel,
  NOTIFICATION_CODES,
} from './models/entities/notifications.model';
import { useNotificationsStore } from 'src/stores/notifications-store';
import { NotificationsHelper } from './notifications.helper';
import 'src/css/MainLayout/NotificationsDialog.css';

const userStore = useUserStore();
const notificationsStore = useNotificationsStore();
const notificationsHelper = new NotificationsHelper();
const socketURL = <string>process.env.NOTIFICATIONS_MSVC_URL;
const socket = io(socketURL, {
  query: { walletAddress: userStore.walletAddress },
});

const notify = ({
  message,
  username,
  avatar,
}: {
  message: string;
  username: string;
  avatar: string;
}) => {
  Notify.create({
    message,
    caption: username,
    avatar,
    color: 'primary',
    multiLine: true,
  });
};

const veriffEventListener = (
  notification: ExtendedNotificationModel<'veriff'>
) => {
  userStore.fetchUser();
  notify({
    message: notification.message,
    username: userStore.user?.username || '',
    avatar: userStore.user?.avatar || '',
  });
};

const TransactionEventManager = (
  linkName: string,
  icon: string,
  message: string,
  link: string,
  notifID: string
) => {
  const clickLink = async (link: string) => {
    notificationsStore.updateNotificationAsViewed(notifID, false, link);
  }
  const screenWidth = window.innerWidth;
  Notify.create({
    message: message,
    multiLine: true,
    icon: icon,
    actions: [
      { label: linkName, color: 'primary', handler: () => clickLink(link) }
    ],
    badgeStyle: 'opacity: 0',
    timeout: 2000,
    iconSize: '50px',
    classes: 'notification-popup',
    position: screenWidth <= 600 ? 'top' : undefined
  })
};

function TransactionNotifBuilder(incomingNotif: ExtendedNotificationModel<'transaction'>) {
  const { code, orderPrice, orderCurrency, status, brand, link, _id } = incomingNotif;
  const linkName = notificationsHelper.GetTransactionLinkName(code);
  const icon = notificationsHelper.GetNotificationIcon(code);
  const message = notificationsHelper.GetTransactionNotificationMessage(
    code,
    status,
    <string> orderPrice,
    <string> orderCurrency,
    brand
  );

  TransactionEventManager(
    linkName,
    <string> icon,
    <string> message,
    <string> link,
    _id
  )
}

socket.onAny((code: string, data: ExtendedNotificationModel<'veriff' | 'transaction'>) => {
  // Check if data is a notification
  if (Object.keys(NOTIFICATION_CODES).includes(code.toString())) {
    // Use first digit of code to determine notification type
    const notificationType = Math.floor(data.code / 100);
    // console.log(data)
    switch (notificationType) {
      case 1:
        // Transaction notification
        const sortKey = notificationsStore.sortKey;
        const filterKey = notificationsStore.filterKey;
        const isSearching = notificationsStore.isSearching;
        if (sortKey == 'latest' && !isSearching) {
          if (filterKey == 'offers') {
            if (data.code == NOTIFICATION_CODES.OFFER_RECEIVED) {
              notificationsStore.notifications.unshift(data);
              notificationsStore.storedNotifications.unshift(data);
            }
          } else if (filterKey == 'sale') {
            if (data.code == NOTIFICATION_CODES.LISTING_PURCHASED_OLD_OWNER) {
              notificationsStore.notifications.unshift(data);
              notificationsStore.storedNotifications.unshift(data);
            }
          } else {
            notificationsStore.notifications.unshift(data);
            notificationsStore.storedNotifications.unshift(data);
          }
        }
        TransactionNotifBuilder(<ExtendedNotificationModel<'transaction'>>data);
        break;
      case 2:
        // Veriff notification
        veriffEventListener(<ExtendedNotificationModel<'veriff'>> data);
        break;
      default:
        break;
    }
  }
});
