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
			<q-card-section class="my-wallet-header row items-center no-wrap">
				<div class="my-wallet-header-container row">
					<div>MY WALLET</div>
					<img src="../../public/images/metamask-icon.svg" alt="" />
					<div class="wallet-id">{{ walletAddress.slice(0, 15) + '...' }}</div>
				</div>
				<img
					class="x-icon"
					src="../../public/images/x-icon.svg"
					alt=""
					@click="showMyWallet = false"
				/>
			</q-card-section>
			<div class="id-mobile">{{ walletAddress.slice(0, 15) + '...' }}</div>

			<q-card-section
				class="my-wallet-ballance-container column justify-center items-center"
			>
				<img src="../../public/images/wallet.svg" alt="wallet-icon" />
				<div class="ballance-wrapper column">
					<div class="my-wallet-title q-pb-sm">Your balance is</div>
					<div class="my-wallet-balance">$ {{ balance.toFixed(4) }}</div>
				</div>
				<q-btn class="my-wallet-btn no-box-shadow" @click="fundWallet"
					>Fund wallet</q-btn
				>
			</q-card-section>

			<q-card-section class="my-wallet-logout" @click="logout">
				LOG OUT
			</q-card-section>
		</q-card>
	</q-dialog>

	<!---------------------------- /MY WALLET ---------------------------->

	<!---------------------------- HELP CENTRE ---------------------------->

	<q-dialog
		v-model="showHelpCentre"
		position="left"
		full-height
		class="my-wallet-background row justify-end help-centre"
	>
		<q-card
			class="my-wallet-container column justify-between items-center full-width"
		>
			<q-card-section
				class="my-wallet-header row items-center no-wrap justify-between"
			>
				<div class="my-wallet-header-container row help-header-container">
					<div
						:class="mainHelpWindow && 'help-header-focus'"
						style="cursor: pointer"
						@click="
							mainHelpWindow = true;
							contactSupport = false;
						"
					>
						HELP CENTRE
					</div>
					|
					<div v-if="contactSupport" class="help-header-focus">
						CONTACT SUPPORT
					</div>
				</div>
				<img
					class="x-icon"
					src="../../public/images/x-icon.svg"
					alt=""
					@click="showHelpCentre = false"
				/>
			</q-card-section>

			<q-card-section
				v-if="mainHelpWindow"
				class="column justify-center items-center"
			>
				<div class="help-centre-title">How can we help you?</div>
				<p class="help-p">
					Search for a question or topic, or find relevant ones below
				</p>
				<div class="row full-width">
					<q-input
						v-model="helpSearchBar"
						dense
						outlined
						color="blue-6"
						placeholder="Search"
						class="help-search-bar q-pr-xs"
					>
						<template #prepend>
							<q-icon name="app:search" />
						</template>
					</q-input>
					<q-btn flat class="help-search-btn">GO</q-btn>
				</div>
			</q-card-section>
			<q-card-section
				v-if="mainHelpWindow"
				class="row justify-center items-center help-card-container"
			>
				<div class="col-4 q-pa-sm">
					<div class="help-card">
						<div class="help-card-title">How to start?</div>
						<div class="help-card-p column">
							<div>Web3 Wallet</div>
							<div>Identity verification</div>
						</div>
					</div>
				</div>
				<div class="col-4 q-pa-sm">
					<div class="help-card">
						<div class="help-card-title">How to get NFT?</div>
						<div class="help-card-p column">
							<div>Buying now</div>
							<div>Making offers (bidding)</div>
						</div>
					</div>
				</div>
				<div class="col-4 q-pa-sm">
					<div class="help-card">
						<div class="help-card-title">Storing my NFTs</div>
						<div class="help-card-p column">
							<div>Digital Wine Cellar</div>
							<div>Portfolio</div>
						</div>
					</div>
				</div>
				<div class="col-4 q-pa-sm">
					<div class="help-card">
						<div class="help-card-title">Sell my NFT</div>
						<div class="help-card-p column">
							<div>Listing</div>
							<div>Incoming offers</div>
						</div>
					</div>
				</div>
				<div class="col-4 q-pa-sm">
					<div class="help-card">
						<div class="help-card-title">My Profile</div>
						<div class="help-card-p column">
							<div>Offers & Listings</div>
							<div>Trading history</div>
						</div>
					</div>
				</div>
				<div class="col-4 q-pa-sm">
					<div class="help-card">
						<div class="help-card-title">Policy</div>
						<div class="help-card-p column">
							<div>Privacy Policy</div>
							<div>Terms of service</div>
						</div>
					</div>
				</div>
			</q-card-section>

			<q-card-section
				v-if="mainHelpWindow"
				class="column justify-center items-center"
			>
				<div class="help-p q-pb-xs">Can't find the answer?</div>
				<div class="ask-team q-mb-lg">Ask our team!</div>
				<q-btn
					flat
					class="support-btn"
					@click="
						mainHelpWindow = false;
						contactSupport = true;
					"
					>Contact support</q-btn
				>
			</q-card-section>

			<q-card-section
				v-if="contactSupport"
				class="column justify-center items-center help-p contact-section-wrapper"
			>
				We will much appreciate if you add some more info so that
				<div class="q-py-xs">
					we could have more productive communication at first
				</div>
				message.
			</q-card-section>
			<q-card-section
				v-if="contactSupport"
				class="row justify-between items-center help-contact-icons contact-section-wrapper"
			>
				<div class="column justify-center items-center" style="width: 110px">
					<img src="../../public/images/call-icon.svg" alt="" /> Request a call
				</div>
				<div class="column justify-center items-center" style="width: 110px">
					<img src="../../public/images/discord-1.svg" alt="" /> Message us
				</div>
				<div class="column justify-center items-center" style="width: 110px">
					<img src="../../public/images/mail-us.svg" alt="" /> Mail us
				</div>
			</q-card-section>
			<q-card-section v-if="contactSupport" class="contact-section-wrapper">
				<q-form
					class="column justify-between items-start full-width contact-form"
					@submit="onSubmit"
				>
					<div>Name</div>
					<q-input
						v-model="nameInput"
						outlined
						placeholder="Please enter your name"
						class="contact-form-inputs contact-support-form full-width"
					/>
					<div>Email <span>*</span></div>

					<q-input
						v-model="mailInput"
						type="email"
						outlined
						placeholder="Please enter email"
						class="contact-form-inputs contact-support-form full-width"
					/>
					<div>How can we help? <span>*</span></div>
					<q-input
						v-model="mailInput"
						type="textarea"
						outlined
						placeholder="Tell us a little about things you're curious about"
						class="full-width contact-support-form"
					/>
					<q-btn
						flat
						class="support-btn self-end q-my-lg"
						type="submit"
						label="Send the message"
					/>
				</q-form>
			</q-card-section>
		</q-card>
	</q-dialog>

	<!---------------------------- /HELP CENTRE ---------------------------->

	<BurgerMenu
		v-if="showBurgerMenu"
		@closeBurgerMenu="onBurgerMenu('close')"
		@openConnectWallet="showConnectWallet = true"
	/>
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
						v-if="!!userStore.walletAddress"
						class="icons"
						src="../../public/images/favs-icon.svg"
						@click="$router.push('/favorites')"
					/>
					<img
						v-if="!!userStore.walletAddress"
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
						:to="
							!!userStore.walletAddress
								? { path: '/orders' }
								: { query: { next: $route.fullPath, connect: 'open' } }
						"
						split
						icon="app:profile"
					>
						<div class="q-btn-menu-div">
							<q-toolbar v-if="!!userStore.walletAddress" class="text-white">
								<q-chip
									v-close-popup
									clickable
									color="white"
									class="text-bold"
									@click="$router.push('orders')"
								>
									<q-avatar size="24px">
										<img :src="userStore.user?.avatar" />
									</q-avatar>
									{{ userStore.walletAddress.slice(0, 10) }}...
								</q-chip>
							</q-toolbar>
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
			<router-view
				@open-wallet-sidebar="showMyWallet = !showMyWallet"
				@openConnectWallet="showConnectWallet = true"
			/>
		</q-page-container>
	</q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MetaMaskOnboarding from '@metamask/onboarding';
// import transakSDK from '@transak/transak-sdk';
import transakSDK from '@transak/transak-sdk';

import '../css/MainLayout/MainLayout.scss';
import '../css/MainLayout/ConnectWallet.css';
import '../css/MainLayout/MyWallet.css';
import '../css/MainLayout/HelpCentre.css';

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
			showHelpCentre: true,
			mainHelpWindow: true,
			contactSupport: false,
			userStore,
			nftStore,
			orderStore,
			walletAddress: '',
			isMetaMaskInstalled,
			balance: 0,
			helpSearchBar: ref(''),
			nameInput: ref(''),
			mailInput: ref(''),
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
		if (!this.walletAddress) {
			this.ClearStore();
		}
	},
	methods: {
		onSubmit() {
			console.log('submit');
		},
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
			await this.userStore.connectWallet();
			this.balance = await this.userStore.getWalletBalance();
			if (this.$route.query?.next) {
				const next = this.$route.query?.next as string;
				this.$router.replace({ path: next });
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
			this.userStore.walletAddress = '';

			this.showMyWallet = false;

			if (this.$route.meta.requiresAuth) {
				this.$router.push('/');
				return;
			}
			window.location.reload();
			this.ClearStore();
		},
		ClearStore() {
			this.nftStore.ownedNFTs = [] as TokenIdentifier[];
			this.nftStore.fetchNFTsStatus = false;
			this.orderStore.$reset();
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
