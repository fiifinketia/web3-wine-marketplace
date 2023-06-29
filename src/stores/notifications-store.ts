import { defineStore } from 'pinia';
import axios, { AxiosResponse } from 'axios';
import { ExtendedNotificationModel, FetchNotificationsRequest, NotificationsSettings } from 'src/shared/models/entities/notifications.model';
import { APIKeyString } from 'src/boot/axios';

export const useNotificationsStore = defineStore('notificationsStore', {
  state: () => ({
    notificationSettings: {} as NotificationsSettings,
    notifications: [] as ExtendedNotificationModel<'veriff' | 'transaction'>[],
    settingsFetched: false,
    sortKey: 'latest' as 'latest' | 'earliest',
    filterKey: 'all' as 'all' | 'sale' | 'offers'
  }),
  getters: {
    getSettings: state => state.notificationSettings
  },
  actions: {
    async getNotificationsSettings (walletAddress: string) {
      try {
        const updatedSettings = await axios.get(
          process.env.MARKETPLACE_API_URL + '/market/notifications/settings/' + walletAddress,
        );
        this.notificationSettings = updatedSettings.data;
        this.settingsFetched = true;
      //  eslint-disable-next-line
      } catch (error: any) {
        throw new Error(error);
      }
    },
    async saveNotificationSettings(walletAddress: string) {
      try {
        await axios.put(
          process.env.MARKETPLACE_API_URL + '/market/notifications/settings/' + walletAddress,
          { updateSettingsDto: this.notificationSettings, apiKey: APIKeyString }
        );
      // eslint-disable-next-line
      } catch (error: any) {
        throw new Error(error);
      }
    },
    async getUserNotifications(walletAddress: string) : Promise<void> {
      const req: FetchNotificationsRequest = {
        walletAddress: walletAddress,
        order: this.sortKey,
        filter: this.filterKey,
        apiKey: <string> process.env.MKTPLACE_API_KEY
      }
      try {
        const response : AxiosResponse<ExtendedNotificationModel<'veriff' | 'transaction'>[]> = await axios.post(
          process.env.MARKETPLACE_API_URL + '/market/notifications/retrieve',
          req
        );
        this.notifications = response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    async updateNotificationAsViewed(notifID: string) {
      await axios.put(
        process.env.MARKETPLACE_API_URL + '/market/notifications/viewed',
        { notificationID: notifID, apiKey: APIKeyString }
      )
      const notifIndex = this.notifications.findIndex(
        notif => notif.id == notifID
      );
      this.notifications[notifIndex].viewed = true;
    }
  },
});
