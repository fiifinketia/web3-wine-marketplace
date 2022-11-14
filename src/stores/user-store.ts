import { defineStore } from 'pinia';
import {
  Magic,
  SDKError,
  RPCError,
  ExtensionError,
  MagicUserMetadata,
  LoginWithMagicLinkConfiguration,
} from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';
import { ref } from 'vue';
import { ethers } from 'ethers';

export const useUserStore = defineStore(
	'userStore',
	() => {
		const magic = new Magic(process.env.MAGIC_API_KEY || '', {
			network: {
				rpcUrl: process.env.POLYGON_RPC_URL || '',
				chainId: 80001,
			},
			extensions: [new ConnectExtension()],
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const provider = new ethers.providers.Web3Provider(<any>magic.rpcProvider);

		const walletAddress = ref('');

		// const user = ref<{ publicAddress: string | null }>({
		//   publicAddress: null,
		// });

		// const walletBalance = ref<number>(0);

		// const isConnected = () => {
		//   return !!provider.listAccounts().then((accounts) => accounts[0]);
		// };

		// const connect = async () => {
		//   try {
		//     await magic.connect.getWalletInfo();
		//
		//     getWalletBalance();
		//   } catch (error) {
		//     if (error instanceof SDKError) {
		//       console.log(error);
		//     }
		//     if (error instanceof RPCError) {
		//       console.log(error);
		//     }
		//     if (error instanceof ExtensionError) {
		//       console.log(error);
		//     }
		//   }
		// };
		// const logout = async () => {
		//   await magic.connect.disconnect();
		//   user.value = {
		//     publicAddress: null,
		//   };
		// };

		return {
			magic,
			provider,
			// provider,
			walletAddress,
			// getWalletBalance,
			// isConnected,
			// walletBalance,
			// connect,
			// logout,
		};
	},
	{ persist: true }
);
