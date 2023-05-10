import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import axios from 'axios';
import { ethers, utils } from 'ethers';
import { generateRandomColor } from 'src/utils';
import { UserModel } from 'src/components/models';
import { APIKeyString } from 'src/boot/axios';

export const useUserStore = defineStore(
  'userStore',
  () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const walletAddress: Ref<string> = ref('');
    const user: Ref<UserModel | undefined> = ref<UserModel | undefined>(undefined);

    const connectWallet = async () => {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      walletAddress.value = utils.getAddress(accounts[0]);

      try {
        const getColors = [
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
        ].join(',');
        const newUser = await axios.post(
          process.env.MARKETPLACE_USERS_API + '/create',
          {
            walletAddress: walletAddress.value,
            avatar: `https://source.boringavatars.com/beam/40/${walletAddress.value}?colors=${getColors}`,
          },
          {
            headers: {
              'x-api-key': APIKeyString,
            },
          }
        );
        user.value = newUser.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch {
        throw new Error('Unable to connect wallet');
      }
    };

    const updateUsername = async (username: string) => {
      const updatedUser = await axios.put(
        process.env.MARKETPLACE_USERS_API + '/' + walletAddress.value,
        {
          username,
        },
        {
          headers: {
            'x-api-key': APIKeyString,
          },
        }
      );
      user.value = updatedUser.data;
    };

    const checkConnection = async () => {
      const connectedAccounts: string[] = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (connectedAccounts.length == 0) {
        walletAddress.value = '';
      }
    };

    const uploadAvatar = async (formData: any) => {
      try {
        await axios.post(
          process.env.MARKETPLACE_USERS_API + '/upload-image/' + walletAddress.value,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-api-key': APIKeyString,
            },
          }
        );
        const updatedUser = await axios.get(
          process.env.MARKETPLACE_USERS_API+ '/profile/' + walletAddress.value,
        );
        user.value = updatedUser.data;
      } catch (error: any) {
        throw new Error(error);
      }
    };

    //TODO: detect network feature
    // const checkNetwork = async () => {
    // 	const connectedAccounts: string[] = await window.ethereum.request({
    // 		method: 'eth_accounts',
    // 	});
    // 	if (connectedAccounts.length == 0) {
    // 		walletAddress.value = '';
    // 	}
    // };

    const getWalletBalance = async () => {
      if (!window.ethereum) return 0;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(walletAddress.value);
      const balanceInETH = ethers.utils.formatEther(balance);

      // Convert Matic to USDC
      const maticToUsdc = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd'
      );
      const maticToUsdcRate = maticToUsdc.data['matic-network'].usd;
      return Number(balanceInETH) * maticToUsdcRate;
    };

    const getWalletAddress = () => {
      return walletAddress.value;
    };

    const $reset = () => {
      (walletAddress.value = ''), (user.value = undefined);
    };

    return {
      // provider,
      walletAddress,
      connectWallet,
      updateUsername,
      uploadAvatar,
      getWalletBalance,
      getWalletAddress,
      checkConnection,
      user,
      // isConnected,
      // walletBalance,
      // connect,
      // logout,
      $reset,
    };
  },
  { persist: true }
);
