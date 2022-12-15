<template>
	<!-------------------------------------- POPUP MODALS -------------------------------------->

	<!---------------------------- CONNECT WALLET ---------------------------->

	<q-dialog
		v-model="showConnectWallet"
		class="connect-wallet-background row justify-center items-center"
	>
		<q-card class="connect-wallet-container column justify-center items-center">
			<q-card-section>
				<img src="../../public/images/wallet.svg" alt="wallet-icon" />
			</q-card-section>

			<q-card-section>
				<div class="connect-wallet-title">
					Connect your Web3 Wallet to signup.
				</div>
			</q-card-section>

			<q-card-section>
				<q-btn
					class="connect-wallet-btns connect-btn"
					:disable="!isMetaMaskInstalled"
					@click="connectWallet"
				>
					Connect wallet
				</q-btn>
				<q-btn
					class="connect-wallet-btns no-wallet-btn"
					:disabled="!!isMetaMaskInstalled"
					@click="setupWallet"
				>
					I don't have a wallet
				</q-btn>
			</q-card-section>
		</q-card>
	</q-dialog>

	<!---------------------------- /CONNECT WALLET ---------------------------->

	<!---------------------------- MY WALLET ---------------------------->

	<q-dialog
		v-model="showMyWallet"
		position="right"
		full-height
		class="my-wallet-background row justify-end"
	>
		<q-card class="my-wallet-container column justify-between items-center">
			<q-card-section class="my-wallet-header row">
				<div>MY WALLET</div>
				<img src="../../public/images/metamask-icon.svg" alt="" />
				<div class="wallet-id">walletID</div>
				<img
					class="x-icon"
					src="../../public/images/x-icon.svg"
					alt=""
					@click="showMyWallet = false"
				/>
			</q-card-section>
			<div class="id-mobile">walletID</div>

			<q-card-section
				class="my-wallet-ballance-container column justify-center items-center"
			>
				<img src="../../public/images/wallet.svg" alt="wallet-icon" />
				<div class="ballance-wrapper column">
					<div class="my-wallet-title q-pb-sm">Your balance is</div>
					<div class="my-wallet-balance">$ {{ balance.toFixed(2) }}</div>
				</div>
				<q-btn class="my-wallet-btn no-box-shadow" @click="fundWallet"
					>Fund wallet</q-btn
				>
			</q-card-section>

			<q-card-section class="my-wallet-logout"> LOG OUT </q-card-section>
		</q-card>
	</q-dialog>

	<!---------------------------- /MY WALLET ---------------------------->

	<BurgerMenu v-if="showBurgerMenu" />
	<SuggestedWines />

	<!-------------------------------------- /POPUP MODALS -------------------------------------->

	<q-layout view="lHh Lpr lFf">
		<q-header
			class="nav-bar q-py-xs"
			:style="(showConnectWallet || showMyWallet) && { 'z-index': '-1' }"
		>
			<q-toolbar class="row justify-between items-center">
				<div
					class="nav-bar-container-left"
					@click="
						{
						}
					"
				>
					<q-img
						class="logo"
						src="../../public/images/WiV-logo.svg"
						@click="$router.push('/')"
					/>
				</div>
				<div class="nav-bar-container-center row items-center">
					<q-btn-dropdown
						class="btn-dropdown-menu dropdown-center"
						dense
						flat
						label="Marketplace"
					>
						<div class="q-btn-menu-div">
							<q-list>
								<q-item
									v-close-popup
									clickable
									@click="$router.push('/marketplace?tab=nfts')"
								>
									<q-item-section>
										<q-item-label>All NFTs</q-item-label>
									</q-item-section>
								</q-item>

								<q-item
									v-close-popup
									clickable
									@click="$router.push('/marketplace?tab=releases')"
								>
									<q-item-section>
										<q-item-label>New Releases</q-item-label>
									</q-item-section>
								</q-item>

								<q-item
									v-close-popup
									clickable
									@click="$router.push('/marketplace?tab=recommended')"
								>
									<q-item-section>
										<q-item-label>Recommended</q-item-label>
									</q-item-section>
								</q-item>
							</q-list>
						</div>
					</q-btn-dropdown>
					<div
						@click="
							{
							}
						"
					>
						Stats
					</div>
					<div
						@click="
							{
							}
						"
					>
						Storefront
					</div>
				</div>
				<div class="nav-bar-container-right row items-center">
					<img
						class="icons"
						src="../../public/images/favs-icon.svg"
						@click="$router.push('/favorites')"
					/>
					<img
						class="icons"
						src="../../public/images/bell-icon.svg"
						@click="
							{
							}
						"
					/>
					<q-btn-dropdown
						class="btn-dropdown-menu profile-dropdown"
						dense
						flat
						split
						icon="app:profile"
						:to="{ path: '/orders' }"
					>
						<div class="q-btn-menu-div">
							<q-list>
								<q-item
									v-if="!!userStore.walletAddress"
									v-close-popup
									clickable
									@click="showMyWallet = true"
								>
									<q-item-section>
										<q-item-label>my wallet</q-item-label>
									</q-item-section>
								</q-item>
								<q-item
									v-else
									v-close-popup
									clickable
									@click="showConnectWallet = true"
								>
									<q-item-section>
										<q-item-label>sign up</q-item-label>
									</q-item-section>
								</q-item>

								<q-item
									v-close-popup
									clickable
									href="https://dwc.wiv-tech.com/#/"
								>
									<q-item-section>
										<q-item-label>digital wine cellar</q-item-label>
									</q-item-section>
								</q-item>

								<q-item
									v-close-popup
									clickable
									@click="
										{
										}
									"
								>
									<q-item-section>
										<q-item-label>settings</q-item-label>
									</q-item-section>
								</q-item>
								<q-item
									@click="
										{
										}
									"
								>
									<q-item-section>
										<q-item-label
											><q-btn-dropdown
												class="btn-dropdown-help"
												dense
												flat
												disable
												padding="0"
												label="help"
											>
												<div class="q-btn-menu-div">
													<q-list>
														<q-item
															v-close-popup
															clickable
															@click="
																{
																}
															"
														>
															<q-item-section>
																<q-item-label>conctact us</q-item-label>
															</q-item-section>
														</q-item>

														<q-item
															v-close-popup
															clickable
															@click="
																{
																}
															"
														>
															<q-item-section>
																<q-item-label>Faqs</q-item-label>
															</q-item-section>
														</q-item>
													</q-list>
												</div>
											</q-btn-dropdown></q-item-label
										>
									</q-item-section>
								</q-item>
								<q-item
									v-if="!!userStore.walletAddress"
									v-close-popup
									clickable
									@click="logout"
								>
									<q-item-section>
										<q-item-label>log out</q-item-label>
									</q-item-section>
								</q-item>
							</q-list>
						</div>
					</q-btn-dropdown>
				</div>
				<img
					v-if="!showBurgerMenu"
					class="burger-menu-icon"
					src="../../public/images/burger-icon.svg"
					alt="burger-menu"
					@click="onBurgerMenu('open')"
				/>
				<img
					v-else
					class="burger-menu-exit-icon"
					src="../../public/images/x-burger-icon.svg"
					alt="burger-menu"
					@click="onBurgerMenu('close')"
				/>
			</q-toolbar>
		</q-header>
		<q-page-container>
			<router-view @open-wallet-sidebar="showMyWallet = !showMyWallet"/>
		</q-page-container>
	</q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MetaMaskOnboarding from '@metamask/onboarding';
// import transakSDK from '@transak/transak-sdk';
const transakSDK = require('@transak/transak-sdk');

import '../css/MainLayout/MainLayout.scss';
import '../css/MainLayout/ConnectWallet.css';
import '../css/MainLayout/MyWallet.css';

import { useUserStore } from 'src/stores/user-store';
import BurgerMenu from './components/BurgerMenu.vue';
import SuggestedWines from './components/SuggestedWines.vue';

export default defineComponent({
	name: 'MainLayout',
	components: {
		BurgerMenu,
		SuggestedWines,
	},
	data() {
		const userStore = useUserStore();
		const isMetaMaskInstalled = window.ethereum && window.ethereum.isMetaMask;

		return {
			user: true,
			showBurgerMenu: false,
			showMyWallet: false,
			showConnectWallet: false,
			userStore,
			walletAddress: '',
			isMetaMaskInstalled,
			balance: 0,
		};
	},

	async mounted() {
		const userStore = useUserStore();

		this.walletAddress = userStore.walletAddress;
	},

	methods: {
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
				// email: this.userStore.user?.email, // Your customer's email address
				redirectURL: 'http://localhost:8081', // Redirect URL of your app
			});
			this.showMyWallet = false;
			transak.init();

			transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData: any) => {
				// console.log(orderData);
				transak.close();
			});
		},
		connectWallet() {
			this.showConnectWallet = false;
			this.userStore.connectWallet();
		},

		setupWallet() {
			this.isMetaMaskInstalled = window.ethereum && window.ethereum.isMetaMask;
			if (!this.isMetaMaskInstalled) {
				//If it isn't installed we ask the user to click to install it
				const onboarding = new MetaMaskOnboarding({
					forwarderOrigin: 'http://localhost:8081',
				});
				onboarding.startOnboarding();
			}
		},

		onBurgerMenu(modal: string) {
			switch (modal) {
				case 'open':
					this.showBurgerMenu = true;

					document.body.classList.add('no-scroll');
					break;
				case 'close':
					this.showBurgerMenu = false;
					document.body.classList.remove('no-scroll');
					break;
			}
		},

		async logout() {
			this.userStore.walletAddress = '';
		},
		installMetaMask() {
			this.$q
				.dialog({
					dark: false,
					title: 'Confirm',
					message:
						'You need a metamask wallet to make transactions, do you want to install MetaMask now?',
					cancel: true,
					persistent: true,
				})
				.onOk(() => {
					const onboarding = new MetaMaskOnboarding({
						forwarderOrigin: 'http://localhost:8081',
					});
					onboarding.startOnboarding();
				})
				.onOk(() => {
					// console.log('>>>> second OK catcher')
				})
				.onCancel(() => {
					// console.log('>>>> Cancel')
				})
				.onDismiss(() => {
					// console.log('I am triggered on both OK and Cancel')
				});
		},
	},
});
</script>

<style></style>
