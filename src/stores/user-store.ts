import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useUserStore = defineStore(
	'userStore',
	() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const walletAddress = ref('');

		const connectWallet = async () => {
			// this.showConnectWallet = true;
			// // this.showMyWallet = true;
			// document.body.classList.add('no-scroll');
			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});
			walletAddress.value = accounts[0];

			await axios.post(process.env.MKT_API_URL + 'market/users', {
				walletAddress: walletAddress.value,
			});
		};

		return {
			// provider,
			walletAddress,
			connectWallet,
			// getWalletBalance,
			// isConnected,
			// walletBalance,
			// connect,
			// logout,
		};
	},
	{ persist: true }
);
