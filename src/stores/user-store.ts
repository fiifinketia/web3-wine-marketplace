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
      const signer = WindowWeb3Provider?.getSigner();
      if (!!signer) {
        const [wivaBalance, usdtBalance, usdcBalance] = await Promise.all([
          GetBalanceByCurrency(<string> process.env.WIVA_CURRENCY, signer, walletAddress.value),
          GetBalanceByCurrency(<string> process.env.USDT_CURRENCY, signer, walletAddress.value),
          GetBalanceByCurrency(<string> process.env.USDC_CURRENCY, signer, walletAddress.value)
        ]);
        return {
          _wivaBalance: wivaBalance,
          _usdtBalance: usdtBalance,
          _usdcBalance: usdcBalance
        }
      }
      return undefined;
    };

    const getWalletAddress = () => {
      return walletAddress.value
    };

    const $reset = () => {
      (walletAddress.value = ''), (user.value = null);
    };

    return {
      // provider,
      walletAddress,
      connectWallet,
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
