import { defineStore } from 'pinia';
import axios from 'axios';
import { NotificationsSettings } from 'src/shared/models/entities/notifications.model';
import { APIKeyString } from 'src/boot/axios';

export const useNotificationsStore = defineStore('notificationsStore', {
  state: () => ({
    notificationSettings: {} as NotificationsSettings,
    settingsFetched: false
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
    }
  },
});
