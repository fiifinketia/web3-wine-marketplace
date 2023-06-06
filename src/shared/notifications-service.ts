import { io } from 'socket.io-client';
import { useUserStore } from 'src/stores/user-store';
import { Notify } from 'quasar';
import {
  NOTIFICATION_CODES,
  NotificationReceived,
  TransactionNotificationModel,
} from './models/entities/notifications.model';
import { VeriffNotificationModel } from './models/entities/notifications.model';

const userStore = useUserStore();
const socketURL = <string>process.env.NOTIFICATIONS_MSVC_URL;
// const socketURL = 'http://localhost:3900';
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
  notification: NotificationReceived<VeriffNotificationModel>
) => {
  userStore.fetchUser();
  notify({
    message: notification.message,
    username: userStore.user?.username || '',
    avatar: userStore.user?.avatar || '',
  });
};

const transactionEventListener = (
  notification: NotificationReceived<TransactionNotificationModel>
) => {
  notify({
    message: notification.message,
    username: userStore.user?.username || '',
    avatar: userStore.user?.avatar || '',
  });
};

socket.onAny((code, data) => {
  // Check if data is a notification
  if (Object.keys(NOTIFICATION_CODES).includes(code.toString())) {
    // Use first digit of code to determine notification type
    const notificationType = Math.floor(data.code / 100);
    switch (notificationType) {
      case 1:
        // Transaction notification
        transactionEventListener(data);
        break;
      case 2:
        // Veriff notification
        veriffEventListener(data);
        break;
      default:
        break;
    }
  }
});
