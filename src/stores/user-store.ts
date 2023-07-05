import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import axios from 'axios';
import { utils } from 'ethers';
import { Dialog } from 'quasar';
import { JwtPayload, decode } from 'jsonwebtoken';
import { generateRandomColor } from 'src/utils';
import { UserModel } from 'src/components/models';
import { APIKeyString } from 'src/boot/axios';
import { GetWeb3Provider, magic } from 'src/shared/web3.helper';
import { GetBalanceByCurrency } from 'src/shared/balanceAndApprovals';

// import { recoverPersonalSignature } from '@metamask/eth-sig-util';

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
    const accessToken = ref('');
    // const showSettingsDialog: Ref<boolean> = ref(false);
    const user: Ref<UserModel | undefined> = ref<UserModel | undefined>(
      undefined
    );

    const connectWallet = async () => {
      const accounts = await magic.wallet.connectWithUI();
      const web3Provider = await GetWeb3Provider();
      const message = 'Connect wallet to WiV Marketplace?';
      const signedMessage = await web3Provider.getSigner().signMessage(message);
      const address = utils.getAddress(accounts[0]);
      try {
        const avatar = generateAvatar(address);
        const getUser = await axios.post(
          process.env.MARKETPLACE_USERS_API + '/connect',
          {
            walletAddress: address,
            signature: signedMessage,
            apiKey: APIKeyString,
            avatar,
          }
        );
        if (!!getUser.data) {
          const payload = decode(getUser.data.access_token) as JwtPayload;
          user.value = payload.user as UserModel;
          walletAddress.value = payload.user.walletAddress;
          accessToken.value = getUser.data.access_token;
        }
      } catch (error) {
        throw error;
      }
    };

    const disconnectWallet = async () => {
      const provider = await GetWeb3Provider();
      if (!!provider) {
        provider.removeAllListeners();
      }

      await magic.wallet.disconnect();
      walletAddress.value = '';
      user.value = undefined;
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
        const web3Provider = await GetWeb3Provider();
        const accounts: string[] = await web3Provider.provider.request?.({
          method: 'eth_accounts',
        });
        if (accounts.length === 0) {
          walletAddress.value = '';
          user.value = undefined;
        }
      } catch {
        walletAddress.value = '';
        user.value = undefined;
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
      const web3Provider = await GetWeb3Provider();
      const signer = web3Provider.getSigner();
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
      disconnectWallet,
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
