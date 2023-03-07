<!-- eslint-disable vue/v-on-event-hyphenation -->
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
					unelevated
					@click="connectWallet"
				>
					Connect wallet
				</q-btn>
				<q-btn
					class="connect-wallet-btns no-wallet-btn"
					:disabled="!!isMetaMaskInstalled"
					unelevated
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
			<q-card-section class="my-wallet-header row items-center no-wrap">
				<div class="my-wallet-header-container row">
					<div>MY WALLET</div>
					<q-separator spaced="md" size="2px" vertical color="accent" />
					<img src="../../public/images/metamask-icon.svg" alt="" />
					<q-separator
						class="wallet-id"
						spaced="sm"
						size="2px"
						vertical
						color="accent"
					/>
					<div class="wallet-id">{{ walletAddress.slice(0, 15) + '...' }}</div>
				</div>
				<img
					class="x-icon"
					src="../../public/images/x-icon.svg"
					alt=""
					@click="showMyWallet = false"
				/>
			</q-card-section>
			<div class="id-mobile">{{ walletAddress.slice(0, 20) + '...' }}</div>

			<q-card-section
				class="my-wallet-ballance-container column justify-center items-center"
			>
				<img src="../../public/images/wallet.svg" alt="wallet-icon" />
				<div class="ballance-wrapper column">
					<div class="my-wallet-title q-pb-sm">Your balance is</div>
					<div class="my-wallet-balance">$ {{ balance.toFixed(4) }}</div>
				</div>
				<q-btn
					class="my-wallet-btn no-box-shadow"
					unelevated
					@click="fundWallet"
					>Fund wallet</q-btn
				>
			</q-card-section>

			<q-card-section class="my-wallet-logout" @click="logout">
				LOG OUT
			</q-card-section>
		</q-card>
	</q-dialog>

	<!---------------------------- /MY WALLET ---------------------------->

	<BurgerMenu
		v-if="showBurgerMenu"
		@closeBurgerMenu="onBurgerMenu('close')"
		@openConnectWallet="showConnectWallet = true"
		@openMyWallet="showMyWallet = true"
	/>
	<SuggestedWines v-model="suggestedWinesDialog" />

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
					<div clickable>Stats</div>
					<div clickable>Storefront</div>
				</div>
				<div class="row">
					<div class="row items-center">
						<img
							v-if="!!walletAddress"
							class="icons q-mx-xs"
							src="../../public/images/favs-icon.svg"
							@click="$router.push('/favorites')"
						/>
						<img
							v-if="!!walletAddress"
							class="icons q-mx-xs"
							src="../../public/images/bell-icon.svg"
							clickable
						/>
						<q-btn
							class="btn-dropdown-menu profile-dropdown q-mx-xs"
							dense
							flat
							icon="app:profile"
						>
							<q-menu
								class="q-btn-menu-div no-scroll"
								max-width="300px"
								max-height="100vh"
							>
								<q-toolbar v-if="!!walletAddress" class="text-white">
									<q-chip
										v-close-popup
										clickable
										color="white"
										class="text-bold"
										@click="showMyWallet = true"
									>
										<q-avatar size="24px">
											<img :src="userStore.user?.avatar" />
										</q-avatar>
										{{ walletAddress.slice(0, 10) }}...
									</q-chip>
								</q-toolbar>
								<q-list>
									<q-item v-if="!!walletAddress" clickable>
										<q-expansion-item
											id="mainlayout-expansion-item"
											dense
											dense-toggle
											expand-separator
											label="profile"
											group="menu-expansion"
										>
											<div>
												<q-list class="q-ml-md">
													<q-item
														v-close-popup
														clickable
														@click="
															$router.push({
																path: 'orders',
																query: { tab: 'listings' },
															})
														"
													>
														<q-item-section>
															<q-item-label class="text-no-wrap"
																>listings</q-item-label
															>
														</q-item-section>
													</q-item>

													<q-item
														v-close-popup
														clickable
														@click="
															$router.push({
																path: 'orders',
																query: { tab: 'incoming' },
															})
														"
													>
														<q-item-section>
															<q-item-label class="text-no-wrap"
																>incoming offers</q-item-label
															>
														</q-item-section>
													</q-item>

													<q-item
														v-close-popup
														clickable
														@click="
															$router.push({
																path: 'orders',
																query: { tab: 'outgoing' },
															})
														"
													>
														<q-item-section>
															<q-item-label class="text-no-wrap"
																>outgoing offers</q-item-label
															>
														</q-item-section>
													</q-item>

													<q-item
														v-close-popup
														clickable
														@click="
															$router.push({
																path: 'orders',
																query: { tab: 'transactions' },
															})
														"
													>
														<q-item-section>
															<q-item-label class="text-no-wrap"
																>trading history</q-item-label
															>
														</q-item-section>
													</q-item>
												</q-list>
											</div>
										</q-expansion-item>
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
											<q-item-label class="text-no-wrap"
												>digital wine cellar</q-item-label
											>
										</q-item-section>
									</q-item>

									<q-item v-close-popup clickable>
										<q-item-section>
											<q-item-label>settings</q-item-label>
										</q-item-section>
									</q-item>
									<q-item clickable>
										<q-expansion-item
											id="mainlayout-expansion-item"
											dense
											dense-toggle
											expand-separator
											label="help"
											group="menu-expansion"
										>
											<div>
												<q-list class="q-ml-md">
													<q-item v-close-popup clickable>
														<q-item-section>
															<q-item-label>conctact us</q-item-label>
														</q-item-section>
													</q-item>

													<q-item v-close-popup clickable>
														<q-item-section>
															<q-item-label>Faqs</q-item-label>
														</q-item-section>
													</q-item>
												</q-list>
											</div>
										</q-expansion-item>
									</q-item>
									<q-item
										v-if="!!walletAddress"
										v-close-popup
										clickable
										@click="logout"
									>
										<q-item-section>
											<q-item-label>log out</q-item-label>
										</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
					</div>
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
			<router-view
				@open-wallet-sidebar="showMyWallet = !showMyWallet"
				@openConnectWallet="showConnectWallet = true"
			/>
		</q-page-container>
	</q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MetaMaskOnboarding from '@metamask/onboarding';
// import transakSDK from '@transak/transak-sdk';
import transakSDK from '@transak/transak-sdk';

import '../css/MainLayout/MainLayout.scss';
import '../css/MainLayout/ConnectWallet.css';
import '../css/MainLayout/MyWallet.css';

import { useUserStore } from 'src/stores/user-store';
import BurgerMenu from './components/BurgerMenu.vue';
import SuggestedWines from './components/SuggestedWines.vue';
import { useNFTStore } from 'src/stores/nft-store';
import { ordersStore } from 'src/stores/orders-store';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';

export default defineComponent({
	name: 'MainLayout',
	components: {
		BurgerMenu,
		SuggestedWines,
	},
	data() {
		const userStore = useUserStore();
		const nftStore = useNFTStore();
		const orderStore = ordersStore();
		const isMetaMaskInstalled = window.ethereum && window.ethereum.isMetaMask;

		return {
			user: true,
			showBurgerMenu: false,
			showMyWallet: false,
			showConnectWallet: false,
			userStore,
			nftStore,
			orderStore,
			walletAddress: '',
			isMetaMaskInstalled,
			balance: 0,
			suggestedWinesDialog: false,
		};
	},
	watch: {
		$route: {
			handler: function () {
				if (
					this.$route.query?.connect &&
					this.$route.query?.connect === 'open'
				) {
					this.showConnectWallet = true;
				}
			},
			immediate: true,
		},
	},

	async mounted() {
		await this.userStore.checkConnection();
		this.walletAddress = this.userStore.walletAddress;
		this.balance = await this.userStore.getWalletBalance();
		if (!this.walletAddress) {
			this.ClearStore();
		}
	},
	methods: {
		async fundWallet() {
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
				redirectURL: this.$route.fullPath, // Redirect URL of your app
			});
			this.showMyWallet = false;
			transak.init();

			transak.on(
				transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL,
				async (orderData: any) => {
					// TODO: Notitfy user on balance update
					this.balance = await this.userStore.getWalletBalance();
					// console.log(orderData);
					transak.close();
				}
			);
			// This is so that the balance is updated after new funds are imported
		},
		async connectWallet() {
			this.showConnectWallet = false;
			//TODO: Catch errors
			await this.userStore.connectWallet();
			if (!this.$route.query?.next) {
				this.$router.go(0);
			} else {
				const next = this.$route.query?.next as string;
				await this.$router.replace({ path: next, replace: true });
				window.location.reload();
			}
		},

		setupWallet() {
			this.isMetaMaskInstalled = window.ethereum && window.ethereum.isMetaMask;
			if (!this.isMetaMaskInstalled) {
				//If it isn't installed we ask the user to click to install it
				const onboarding = new MetaMaskOnboarding({
					forwarderOrigin: this.$route.fullPath,
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
			this.showMyWallet = false;
			this.ClearStore();

			if (this.$route.meta.requiresAuth) {
				this.$router.push('/');
				return;
			}
			window.location.reload();
		},
		ClearStore() {
			this.nftStore.ownedNFTs = [] as TokenIdentifier[];
			this.nftStore.fetchNFTsStatus = false;
			this.orderStore.$reset();
			this.userStore.$reset();
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
						forwarderOrigin: this.$route.fullPath,
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
