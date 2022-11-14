<template>
	<div
		class="connect-wallet-background row justify-center items-center"
		@click="onClickBackground"
	>
		<div
			class="connect-wallet-container column justify-center items-center"
			@click.stop
		>
			<img src="../../../public/images/wallet.svg" alt="wallet-icon" />
			<div class="connect-wallet-title">
				Connect your Web3 Wallet to signup.
			</div>
			<div>
				<q-btn class="connect-wallet-btns connect-btn" @click="connectWallet"
					>Connect wallet</q-btn
				>
				<q-btn
					class="connect-wallet-btns no-wallet-btn"
					:disabled="!isMetaMaskInstalled"
					@click="setupWallet"
				>
					I don't have a wallet
				</q-btn>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useUserStore } from 'src/stores/user-store';

import '../../css/MainLayout/ConnectWallet.css';
export default defineComponent({
	name: 'ConnectWallet',
	data() {
		const userStore = useUserStore();
		const isMetaMaskInstalled = ethereum && ethereum.isMetaMask;
		const email = ref('kelvinnketiaachiampong@gmail.com');
		return {
			email,
			userStore,
		};
	},
	methods: {
		onClickBackground() {
			this.$emit('clicked', true);
		},

		connectWallet() {
			this.onClickBackground();
			this.userStore.connectWallet();
		},

		setupWallet() {
			this.isMetaMaskInstalled = ethereum && ethereum.isMetaMask;
			if (!isMetaMaskInstalled) {
				//If it isn't installed we ask the user to click to install it
				const onboarding = new MetaMaskOnboarding({
					forwarderOrigin: 'http://localhost:8081',
				});
				onboarding.startOnboarding();
			}
		},
	},
});
</script>

<style></style>
