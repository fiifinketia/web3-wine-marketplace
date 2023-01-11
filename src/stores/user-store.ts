import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { ethers, utils } from 'ethers';
import { useNFTStore } from './nft-store';

export const useUserStore = defineStore(
	'userStore',
	() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const walletAddress = ref('');
		const nftStorage = useNFTStore();

		const connectWallet = async () => {
			// this.showConnectWallet = true;
			// // this.showMyWallet = true;
			// document.body.classList.add('no-scroll');
			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});
			walletAddress.value = utils.getAddress(accounts[0]);
			await nftStorage.fetchNFTs(accounts[0]);

			try {
				await axios.post(process.env.MARKETPLACE_API_URL + 'market/users', {
					walletAddress: walletAddress.value,
				});
			}
			catch {
				console.log('Failed to upload user!')
			}
		};

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

		return {
			// provider,
			walletAddress,
			connectWallet,
			getWalletBalance,
			// isConnected,
			// walletBalance,
			// connect,
			// logout,
		};
	},
	{ persist: true }
);
