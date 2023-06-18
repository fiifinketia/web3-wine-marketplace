import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import axios from 'axios';
import { utils } from 'ethers';
import { generateRandomColor } from 'src/utils';
import { UserModel } from 'src/components/models';
import { APIKeyString } from 'src/boot/axios';
import { WindowWeb3Provider } from 'src/shared/web3.helper';
import { GetBalanceByCurrency } from 'src/shared/balanceAndApprovals';

export const useUserStore = defineStore(
  'userStore',
  () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const walletAddress: Ref<string> = ref('');
    // const showSettingsDialog: Ref<boolean> = ref(false);
    const user: Ref<UserModel | undefined> = ref<UserModel | undefined>(
      undefined
    );
    const connectWallet = async () => {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const address = utils.getAddress(accounts[0]);
      const date = new Date().getTime();
      try {
        const getUser = await axios.get(
          process.env.MARKETPLACE_USERS_API +
            '/profile/' +
            address +
            '?t=' +
            date
        );
        if (!!getUser.data) {
          user.value = getUser.data;
          walletAddress.value = address;
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          try {
            const getColors = [
              generateRandomColor(),
              generateRandomColor(),
              generateRandomColor(),
            ].join(',');

            const avatar = `https://source.boringavatars.com/beam/40/${address}?colors=${getColors}`;

            const newUser = await axios.post(
              process.env.MARKETPLACE_USERS_API + '/create',
              {
                walletAddress: address,
                avatar,
                apiKey: APIKeyString,
              }
            );
            walletAddress.value = address;
            user.value = newUser.data;
            return;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            throw new Error('Unable to connect wallet');
          }
        }
        throw error;
      }
    };

    const fetchUser = async () => {
      const date = new Date().getTime();
      try {
        const getUser = await axios.get(
          process.env.MARKETPLACE_USERS_API +
            '/profile/' +
            walletAddress.value +
            '?t=' +
            date
        );
        if (!!getUser.data) {
          user.value = getUser.data;
          walletAddress.value = getUser.data.walletAddress;
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw error;
      }
    };

    const updateUsername = async (username: string) => {
      const updatedUser = await axios.put(
        process.env.MARKETPLACE_USERS_API + '/update/' + walletAddress.value,
        {
          username,
          apiKey: APIKeyString,
        }
      );
      user.value = updatedUser.data;
    };

    const checkConnection = async () => {
      try {
        const connectedAccounts: string[] = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (connectedAccounts.length == 0) {
          walletAddress.value = '';
        }
      } catch {
        walletAddress.value = '';
      }
    };

    // eslint-disable-next-line
    const uploadAvatar = async (formData: any) => {
      try {
        formData.append('apiKey', APIKeyString);
        await axios.post(
          process.env.MARKETPLACE_USERS_API +
            '/upload-image/' +
            walletAddress.value,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        const updatedUser = await axios.get(
          process.env.MARKETPLACE_USERS_API + '/profile/' + walletAddress.value
        );
        user.value = updatedUser.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error);
      }
    };

    const getWalletBalance = async () => {
      if (!window.ethereum) return 0;
      const signer = WindowWeb3Provider?.getSigner();
      if (!!signer) {
        const [wivaBalance, usdtBalance, usdcBalance] = await Promise.all([
          GetBalanceByCurrency(
            <string>process.env.WIVA_CURRENCY,
            signer,
            walletAddress.value
          ),
          GetBalanceByCurrency(
            <string>process.env.USDT_CURRENCY,
            signer,
            walletAddress.value
          ),
          GetBalanceByCurrency(
            <string>process.env.USDC_CURRENCY,
            signer,
            walletAddress.value
          ),
        ]);
        return {
          _wivaBalance: wivaBalance,
          _usdtBalance: usdtBalance,
          _usdcBalance: usdcBalance,
        };
      }
      return undefined;
    };

    const getWalletAddress = () => {
      return walletAddress.value;
    };

    // const setSettingsDialog = (show = false) => {
    //   showSettingsDialog.value = show;
    // };

    const $reset = () => {
      (walletAddress.value = ''), (user.value = undefined);
      // (showSettingsDialog.value = false);
    };

    return {
      walletAddress,
      // showSettingsDialog,
      // setSettingsDialog,
      connectWallet,
      fetchUser,
      updateUsername,
      uploadAvatar,
      getWalletBalance,
      getWalletAddress,
      checkConnection,
      user,
      $reset,
    };
  },
  { persist: true }
);
