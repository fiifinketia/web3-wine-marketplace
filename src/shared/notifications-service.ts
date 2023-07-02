import { io } from 'socket.io-client';
import { useUserStore } from 'src/stores/user-store';
import { Notify } from 'quasar';
import {
  ExtendedNotificationModel,
  NOTIFICATION_CODES,
} from './models/entities/notifications.model';
import { useNotificationsStore } from 'src/stores/notifications-store';

const userStore = useUserStore();
const notificationsStore = useNotificationsStore();
const socketURL = <string>process.env.NOTIFICATIONS_MSVC_URL;
// const socketURL = 'https://wiv-mkt-notifications-msvc-test.azurewebsites.net/';
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

const transactionEventListener = (
  notification: ExtendedNotificationModel<'transaction'>
) => {
  notify({
    message: `${notification.brand},TXN_STATUS: ${notification.status},CODE: ${notification.code}`,
    username: userStore.user?.username || '',
    avatar: userStore.user?.avatar || '',
  });
};

socket.onAny((code: string, data: ExtendedNotificationModel<'veriff' | 'transaction'>) => {
  // Check if data is a notification
  if (Object.keys(NOTIFICATION_CODES).includes(code.toString())) {
    // Use first digit of code to determine notification type
    const notificationType = Math.floor(data.code / 100);
    // console.log(data)
    switch (notificationType) {
      case 1:
        // Transaction notification
        transactionEventListener(<ExtendedNotificationModel<'transaction'>>data);
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
