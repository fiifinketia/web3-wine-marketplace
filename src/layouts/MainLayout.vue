<template>
	<ConnectWallet @clicked="onCloseModals($event)" />
	<MyWallet @clicked="onCloseModals($event)" />
	<BurgerMenu v-if="showBurgerMenu" />

	<q-dialog v-model="suggestedWines" class="suggested-wines-background">
		<q-card class="suggested-wines column items-center">
			<q-card-section class="join-wiv-world">
				<div>We're happy to see you join WiV wine world!</div>
			</q-card-section>
			<q-card-section
				class="suggest-trending-today row justify-center items-center"
			>
				<q-img src="../../public/images/trending.svg" width="22px" />

				<div>&nbsp;&nbsp;Trending today</div>
			</q-card-section>

			<q-card-section class="suggested-paragraph">
				<div class="uros">Check our special offers for you to start with -</div>
				<div class="uros">most trending at this moment!</div>
				<div class="uross">
					Check our special offers for you to start with most trending at this
					moment!
				</div>
			</q-card-section>
			<q-card-section class="suggested-wines-section row justify-between">
				<q-card
					v-for="item in items"
					:key="item.id"
					:class="item.class"
					class="no-shadow q-pa-sm suggest-card-individual"
				>
					<div class="suggest-card-img"></div>
					<div class="suggest-wine-name q-py-md">
						The full name of the wine is here and here and here
					</div>
					<div class="suggest-price-container column q-pa-sm">
						<div class="row justify-between q-pb-md">
							<div class="suggest-starting-from">Price</div>
							<q-btn
								class="un-favour-btn"
								icon="app:heart"
								flat
								dense
								padding="0"
								@click="
									{
									}
								"
							/>
						</div>
						<div class="row justify-between">
							<div class="suggest-price">
								<q-img src="../../public/images/USDT.svg" width="20px" />
								&nbsp;00.00
							</div>
							<q-img
								src="../../public/images/mini-button.svg"
								width="24px"
								height="24px"
							/>
						</div>
					</div>
				</q-card>
			</q-card-section>

			<q-card-section class="suggested-buttons-container row">
				<button
					class="suggested-buttons suggested-skip-btn"
					@click="suggestedWines = false"
				>
					Skip
				</button>
				<button
					class="suggested-buttons suggested-show-btn"
					@click="suggestedWines = false"
				>
					Show more
				</button>
			</q-card-section>
		</q-card>
	</q-dialog>

	<q-layout view="lHh Lpr lFf">
		<q-header
			class="nav-bar q-py-xs"
			:style="showModals && { 'z-index': '-1' }"
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
										<q-item-label>Recomended</q-item-label>
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
					>
						<div class="q-btn-menu-div">
							<q-list>
								<q-item
									v-if="!!userStore.walletAddress"
									v-close-popup
									clickable
									@click="onOpenModals('myWallet')"
								>
									<q-item-section>
										<q-item-label>my wallet</q-item-label>
									</q-item-section>
								</q-item>
								<q-item
									v-else
									v-close-popup
									clickable
									@click="onOpenModals('connectWallet')"
								>
									<q-item-section>
										<q-item-label>sign up</q-item-label>
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
					@click="onOpenModals('burgerMenu')"
				/>
				<img
					v-else
					class="burger-menu-exit-icon"
					src="../../public/images/x-burger-icon.svg"
					alt="burger-menu"
					@click="onCloseModals(true)"
				/>
			</q-toolbar>
		</q-header>
		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MetaMaskOnboarding from '@metamask/onboarding';

import '../css/MainLayout/MainLayout.scss';

import { useUserStore } from 'src/stores/user-store';
import ConnectWallet from './components/ConnectWallet.vue';
import BurgerMenu from './components/BurgerMenu.vue';
import MyWallet from './components/MyWallet.vue';

export default defineComponent({
	name: 'MainLayout',
	components: {
		ConnectWallet,
		BurgerMenu,
		MyWallet,
	},
	data() {
		const userStore = useUserStore();

		return {
			user: true,
			showModals: false,
			showBurgerMenu: false,
			suggestedWines: true,
			userStore,
			walletAddress: '',
			items: [
				{
					id: 1,
					name: 'Vranac',
					price: 1111,
					class: 'suggested-first',
				},
				{
					id: 2,
					name: 'Sauvignon',
					price: 2222,
					class: 'suggested-second',
				},
				{
					id: 3,
					name: 'Moje Vino',
					price: 3333,
					class: 'suggested-third',
				},
				{
					id: 4,
					name: 'Vranac Pro Corde',
					price: 4444,
					class: 'suggested-forth',
				},
			],
		};
	},
	async mounted() {
		const userStore = useUserStore();

		this.walletAddress = userStore.walletAddress;
	},

	methods: {
		animation(
			modal: string,
			opacity: string,
			transform: string,
			zIndex: string
		) {
			const connectBackground = document.querySelector(
				'.connect-wallet-background'
			) as HTMLElement;
			const connectContainer = document.querySelector(
				'.connect-wallet-container'
			) as HTMLElement;
			const walletBackground = document.querySelector(
				'.my-wallet-background'
			) as HTMLElement;
			const walletContainer = document.querySelector(
				'.my-wallet-container'
			) as HTMLElement;
			switch (modal) {
				case 'connectWallet':
					connectBackground.style.zIndex = zIndex;
					connectBackground.style.opacity = opacity;
					connectContainer.style.transform = transform;
					break;
				case 'myWallet':
					walletBackground.style.opacity = opacity;
					walletBackground.style.zIndex = zIndex;
					walletContainer.style.transform = transform;
			}
		},

		onOpenModals(modal: string) {
			switch (modal) {
				case 'connectWallet':
					this.showModals = true;
					this.animation('connectWallet', '1', 'scale(1)', '200');
					break;
				case 'myWallet':
					this.showModals = true;
					this.animation('myWallet', '1', 'translateX(0%)', '200');
					break;
				case 'burgerMenu':
					this.showBurgerMenu = true;
					break;
			}
			document.body.classList.add('no-scroll');
		},

		onCloseModals(title: boolean) {
			if (title === true) {
				this.showModals = false;
				this.showBurgerMenu = false;
				this.animation('connectWallet', '0', 'scale(0.5)', '-200');
				this.animation('myWallet', '0', 'translateX(100%)', '-200');
				document.body.classList.remove('no-scroll');
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
