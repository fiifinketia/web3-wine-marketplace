import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import axios from 'axios';
import { utils } from 'ethers';
import { Dialog } from 'quasar';
import { generateRandomColor } from 'src/utils';
import { UserModel } from 'src/components/models';
import { APIKeyString } from 'src/boot/axios';
import { WindowWeb3Provider } from 'src/shared/web3.helper';
import { GetBalanceByCurrency } from 'src/shared/balanceAndApprovals';

const generateAvatar = (name: string) => {
  const getColors = [
    generateRandomColor(),
    generateRandomColor(),
    generateRandomColor(),
  ].join(',');

  const avatar = `https://source.boringavatars.com/beam/40/${name}?colors=${getColors}`;
  return avatar;
};

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
            const avatar = generateAvatar(address);

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

    const fetchUserByAddress = async (address: string) => {
      const date = new Date().getTime();
      try {
        const getUser = await axios.get<UserModel>(
          process.env.MARKETPLACE_USERS_API +
            '/profile/' +
            address +
            '?t=' +
            date
        );
        return {
          username: getUser.data.username || address,
          avatar: getUser.data.avatar || generateAvatar(address),
        };
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

    const updateLegalAge = async (isLegal: boolean) => {
      const updatedUser = await axios.put(
        process.env.MARKETPLACE_USERS_API + '/update/' + walletAddress.value,
        {
          isLegal,
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

    async function confirmAge() {
      let dismissed = false;
      try {
        Dialog.create({
          title: 'Confirm Age',
          message: 'Are 21 years or older?',
          cancel: 'No',
          persistent: true,
          color: 'primary',
          ok: 'Yes',
        })
          .onOk(async () => {
            await updateLegalAge(true);
            dismissed = true;
          })
          .onCancel(() => (dismissed = true));
        await new Promise<void>(resolve => {
          const interval = setInterval(() => {
            if (dismissed) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });
        return user.value?.isLegal || false;
      } catch (error) {
        throw error;
      }
    }

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
      fetchUserByAddress,
      updateUsername,
      uploadAvatar,
      getWalletBalance,
      getWalletAddress,
      checkConnection,
      confirmAge,
      user,
      $reset,
    };
  },
  { persist: true }
);
