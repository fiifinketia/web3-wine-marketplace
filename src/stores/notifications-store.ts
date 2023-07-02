import { defineStore } from 'pinia';
import axios, { AxiosResponse } from 'axios';
import { ExtendedNotificationModel, FetchNotificationsRequest, NotificationsSettings } from 'src/shared/models/entities/notifications.model';
import { APIKeyString } from 'src/boot/axios';

export const useNotificationsStore = defineStore('notificationsStore', {
  state: () => ({
    notificationSettings: {} as NotificationsSettings,
    notifications: [] as ExtendedNotificationModel<'veriff' | 'transaction'>[],
    storedNotifications: [] as ExtendedNotificationModel<'veriff' | 'transaction'>[],
    searchedNotifications: [] as ExtendedNotificationModel<'veriff' | 'transaction'>[],
    settingsFetched: false,
    notificationsFetched: false,
    notificationsErrorEncountered: false,
    sortKey: 'latest' as 'latest' | 'earliest',
    filterKey: 'all' as 'all' | 'sale' | 'offers',
    isSearching: false
  }),
  getters: {
    getSettings: state => state.notificationSettings,
    getUnviewedNotifications: state => state.notifications.filter(f => !f.viewed).length
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
        this.notificationsErrorEncountered = false;
        this.notificationsFetched = false;
        this.notifications = [];
        const response : AxiosResponse<ExtendedNotificationModel<'veriff' | 'transaction'>[]> = await axios.post(
          process.env.MARKETPLACE_API_URL + '/market/notifications/retrieve',
          req
        );
        this.storedNotifications = response.data;
        this.addMoreNotificationsToView();
      } catch (error: any) { // eslint-disable-line
        this.notificationsErrorEncountered = true;
        throw new Error(error);
      } finally {
        this.notificationsFetched = true;
      }
    },
    async updateNotificationAsViewed(notifID: string) {
      await axios.put(
        process.env.MARKETPLACE_API_URL + `/market/notifications/viewed/${notifID}`,
        { apiKey: APIKeyString }
      )
      const notifIndex = this.notifications.findIndex(
        notif => notif._id == notifID
      );
      this.notifications[notifIndex].viewed = true;
    },
    addMoreNotificationsToView() {
      const startIndex = this.notifications.length;
      const endIndex = Math.min(startIndex + 2, this.storedNotifications.length);

      for (let i = startIndex; i < endIndex; i++) {
        this.notifications.push(this.storedNotifications[i])
      }

      return this.storedNotifications.length > this.notifications.length;
    },
    searchNotification(searchString: string) {
      if (!searchString) {
        this.isSearching = false;
      } else {
        this.searchedNotifications = this.storedNotifications.filter((obj) => obj.message.includes(searchString));
        this.isSearching = true;
      }
    }
  },
});
