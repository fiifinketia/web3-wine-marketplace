<template>
	<div class="my-wallet-background row justify-end" @click="onClickBackground">
		<div
			class="my-wallet-container column justify-between items-center"
			@click.stop
		>
			<div class="my-wallet-header row">
				<div>MY WALLET</div>
				<img src="../../../public/images/metamask-icon.svg" alt="" />
				<div>walletID</div>
				<img
					class="x-icon"
					src="../../../public/images/x-icon.svg"
					alt=""
					@click="onClickBackground"
				/>
			</div>
			<div
				class="my-wallet-ballance-container column justify-center items-center"
			>
				<img src="../../../public/images/wallet.svg" alt="wallet-icon" />
				<div class="ballance-wrapper column">
					<div class="my-wallet-title q-pb-sm">Your balance is</div>
					<div class="my-wallet-balance">$ {{ balance.toFixed(2) }}</div>
				</div>
				<q-btn class="my-wallet-btn no-box-shadow" @click="fundWallet"
					>Fund wallet</q-btn
				>
			</div>
			<div class="my-wallet-logout">LOG OUT</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import transakSDK from '@transak/transak-sdk';

import { useUserStore } from 'src/stores/user-store';
import '../../css/MainLayout/MyWallet.css';
export default defineComponent({
	name: 'MyWallet',
	data() {
		const userStore = useUserStore();
		return {
			balance: 0,
			userStore,
		};
	},
	async beforeMount() {
	  this.balance = await this.userStore.getWalletBalance();
	},
	methods: {
		onClickBackground() {
			// eslint-disable-next-line vue/require-explicit-emits
			this.$emit('clicked', true);
		},

		fundWallet() {
			let transak = new transakSDK({
				apiKey: process.env.TRANSAK_API_KEY, // Your API Key
				environment: 'STAGING', // STAGING/PRODUCTION
				widgetHeight: '625px',
				widgetWidth: '500px',
				// Examples of some of the customization parameters you can pass
				defaultCryptoCurrency: 'MATIC', // Example 'ETH'
				walletAddress: this.userStore.walletAddress, // Your customer's wallet address
				themeColor: '#3586ff', // App theme color
				fiatCurrency: 'GBP', // If you want to limit fiat selection eg 'GBP'
				email: this.userStore.user?.email, // Your customer's email address
				redirectURL: 'http://localhost:8081', // Redirect URL of your app
			});
			this.onClickBackground();
			transak.init();

			transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
				// console.log(orderData);
				transak.close();
			});
		},
	},
});
</script>

<style></style>
