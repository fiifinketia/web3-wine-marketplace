import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import axios from 'axios';
import { NotificationsSettings } from 'src/components/models';
import { APIKeyString } from 'src/boot/axios';

export const useNotificationsStore = defineStore(
  'notificationsStore',
  () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const settings: Ref<NotificationsSettings | undefined> = ref<NotificationsSettings | undefined>(undefined);

    const getNotificationsSettings = async (walletAddress: string) => {
     try {
        const updatedSettings = await axios.get(
          process.env.MARKETPLACE_API_URL + '/market/notifications/settings/' + walletAddress,
        );
       settings.value = updatedSettings.data;
      //  eslint-disable-next-line
      } catch (error: any) {
	      if(!settings.value) {
          settings.value = {
            offerMade: false,
            email: undefined,
            offerReceived: false,
            offerAccepted: false,
            orderFulfilled: false,
            offerOutbidded: false,
            wineChanged: false
          }
        }
        throw new Error(error);
      }
    }

    const saveNotificationsSettings = async (walletAddress: string) => {
      try {
        const updatedSettings = await axios.put(
          process.env.MARKETPLACE_NOTIFICATIONS_API + '/settings/' + walletAddress,
          {
            offerMade: settings.value?.offerMade,
            email: settings.value?.email || undefined,
            offerReceived: settings.value?.offerReceived,
            offerAccepted: settings.value?.offerAccepted,
            offerOutbidded: settings.value?.offerOutbidded,
            orderFulfilled: settings.value?.orderFulfilled,
            wineChanged: settings.value?.wineChanged
          },
          {
            headers: {
              'x-api-key': APIKeyString,
            },
          }
        );
       	settings.value = updatedSettings.data;
      // eslint-disable-next-line
      } catch (error: any) {
        throw new Error(error);
      }
    };

   return {
      saveNotificationsSettings,
      getNotificationsSettings,
      settings,
    };
  },
  { persist: false }
);
