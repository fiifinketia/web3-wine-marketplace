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
    const user: Ref<UserModel | null> = ref<UserModel | null>(null);

    const connectWallet = async () => {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      walletAddress.value = utils.getAddress(accounts[0]);
      try {
        const body = {
          walletAddress: walletAddress.value,
          apiKey: APIKeyString
        }
        const getUser = await axios.post(
          process.env.MARKETPLACE_API_URL + '/market/users/retrieve',
          body
        );
        if (!!getUser.data) return (user.value = getUser.data);
      } catch (error: unknown) {
        throw 'User does not exist'
      }

      try {
        const getColors = [
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
        ].join(',');
        const newUser = await axios.post(
          process.env.MARKETPLACE_API_URL + '/market/create',
          {
            walletAddress: walletAddress.value,
            avatar: `https://source.boringavatars.com/beam/40/${walletAddress.value}?colors=${getColors}`,
          }
        );
        user.value = newUser.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch {
        return 0;
      }
    };

    const checkConnection = async () => {
      const connectedAccounts: string[] = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (connectedAccounts.length == 0) {
        walletAddress.value = '';
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

    const $reset = () => {
      (walletAddress.value = ''), (user.value = null);
    };

    return {
      // provider,
      walletAddress,
      connectWallet,
      getWalletBalance,
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
