<template>
	<div
		v-if="!isLoading && allNFTs.length > 0 && !erroredOut"
		class="row q-pt-none q-px-sm q-gutter-y-md main-marketplace-overall-container"
		:class="
			allNFTs.length >= 4 && $q.screen.width > 600
				? 'justify-between'
				: allNFTs.length == 3 && $q.screen.width > 600
				? 'justify-evenly'
				: $q.screen.width > 600
				? 'justify-start q-gutter-x-md'
				: allNFTs.length >= 2
				? 'justify-around'
				: 'justify-start q-ml-xs'
		"
	>
		<div
			v-for="token in allNFTs"
			:key="
				token.tokenID + ',' + token.network + ',' + token.smartContractAddress
			"
			class="main-marketplace-card-container"
			@click="openNFT(token)"
		>
			<q-card class="q-ma-xs main-marketplace-nft-card" flat>
				<img
					:src="token.image"
					class="main-marketplace-card-image clickable-image"
				/>
				<div
					class="q-pb-sm main-marketplace-card-brand column justify-center"
					style="text-align: left"
				>
					<span>
						{{ truncateText(token.brand) }}
					</span>
				</div>
				<q-card-section
					class="column items-start main-marketplace-price-container q-py-sm"
				>
					<div class="row justify-between" style="width: 100%">
						<span class="main-marketplace-price-header q-pb-xs"> Price </span>
						<q-img
							v-if="!!userStore.walletAddress && !!token.favoriteLoading"
							src="../../../assets/loading-heart.gif"
							:style="
								$q.screen.width > 350
									? 'width: 27px; height: 27px; margin: -4px -4px -4px -4px'
									: 'width: 22px; height: 22px; margin: -3px -3px -4px -4px'
							"
						/>
						<q-img
							v-else-if="!!userStore.walletAddress && token.favorited === true"
							src="../../../../public/images/heart.svg"
							class="clickable-image"
							:width="$q.screen.width > 350 ? '20px' : '16px'"
							:height="$q.screen.width > 350 ? '20px' : '16px'"
							@click.stop="
								addRemoveFavorites(
									token.tokenID,
									token.smartContractAddress,
									token.network,
									'remove'
								)
							"
						/>
						<q-img
							v-else-if="!!userStore.walletAddress"
							src="../../../../public/images/empty-heart.svg"
							class="clickable-image"
							:width="$q.screen.width > 350 ? '20px' : '16px'"
							:height="$q.screen.width > 350 ? '20px' : '16px'"
							@click.stop="
								addRemoveFavorites(
									token.tokenID,
									token.smartContractAddress,
									token.network,
									'add'
								)
							"
						/>
					</div>
					<div
						v-if="
							!!token.orderDetails?.listingPrice &&
							!!token.orderDetails?.transactionStatus
						"
					>
						<div class="row items-center q-gutter-x-xs q-pt-xs">
							<q-img
								src="../../../assets/icons/currencies/USDC-Icon.svg"
								:style="
									$q.screen.width > 350
										? 'height: 20px; width: 20px'
										: 'height: 15px; width: 16px'
								"
							/>
							<span class="main-marketplace-price-text-b-active">
								{{ ToInt(token.orderDetails.listingPrice) }}
							</span>
						</div>
					</div>
					<div v-else class="q-pt-sm" style="display: flex">
						<span class="main-marketplace-price-text-b-inactive">
							Not available
						</span>
					</div>
				</q-card-section>
				<q-menu touch-position context-menu>
					<q-list dense style="min-width: 100px">
						<q-item v-close-popup clickable>
							<q-item-section @click="openNFT(token)">Open</q-item-section>
						</q-item>
						<q-item v-close-popup clickable>
							<q-item-section @click="openNFT(token, 'new-tab')"
								>Open link in New Tab</q-item-section
							>
						</q-item>
						<q-item v-close-popup clickable>
							<q-item-section @click="openNFT(token, 'new-window')"
								>Open link in New Window</q-item-section
							>
						</q-item>
						<q-separator />
						<q-item v-close-popup clickable>
							<q-item-section @click="copyAddress(token)"
								>Copy Link</q-item-section
							>
						</q-item>
						<q-item v-close-popup clickable>
							<q-item-section @click="copyToken(token)"
								>Copy Token Details</q-item-section
							>
						</q-item>
					</q-list>
				</q-menu>
			</q-card>
		</div>
	</div>
	<div v-else-if="!isLoading && allNFTs.length == 0 && !erroredOut">
		<EmptyView />
	</div>
	<div v-else-if="!isLoading && !!erroredOut">
		<ErrorView @retrieve-again="RetrieveTokens()" />
	</div>
	<div
		v-else
		class="row q-pt-none q-px-sm q-gutter-y-md main-marketplace-overall-container"
		:class="$q.screen.width > 600 ? 'justify-between' : 'justify-around'"
	>
		<div
			v-for="loading in loadingNFTs"
			:key="loading"
			class="main-marketplace-loading-card-container"
		>
			<div>
				<q-card class="q-ma-xs main-marketplace-loading-qcard" flat>
					<img
						src="../../../../src/assets/loading-card.svg"
						class="main-marketplace-card-image"
					/>
					<img
						src="../../../../src/assets/loading-brand.svg"
						:style="$q.screen.width > 1025 ? 'height: 25px' : 'height: 30px'"
						class="q-my-md"
					/>
					<img src="../../../../src/assets/loading-pricebox.svg" />
				</q-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { useWineFilters } from 'src/stores/wine-filters';
import { useGeneralSearch } from 'src/stores/general-search-filter';
import {
	DynamicKeyWithCount,
	ListingWithPricingAndImage,
} from '../models/Response.models';
import { RetrieveFilteredNFTs } from '../services/RetrieveTokens';
import { AddFavorites, RemoveFavorites } from '../services/FavoritesFunctions';
import '../../../css/Marketplace/NFT-Selections.css';
import { RetrieveFilterDetails } from '../services/FilterOptions';
import ErrorViewVue from './ErrorView.vue';
import EmptyView from './EmptyView.vue';
export default defineComponent({
	components: {
		ErrorView: ErrorViewVue,
		EmptyView: EmptyView,
	},
	emits: ['totalTokens'],
	data() {
		const userStore = useUserStore();

		const wineFiltersStore = useWineFilters();
		const generalSearchStore = useGeneralSearch();

		return {
			allNFTs: new Array<ListingWithPricingAndImage>(),
			loadingNFTs: [0, 1, 2, 3, 4, 5, 6, 7],
			isLoading: true,
			card: ref(false),
			stars: ref(3),
			selected: ref(),
			userStore,
			wineFiltersStore,
			generalSearchStore,
			filterListenersEnabled: true,
			erroredOut: false, // change
			filterKey: wineFiltersStore.filterKey,
			nftEnums: {} as DynamicKeyWithCount,
			subscription: Function(),
		};
	},
	watch: {
		'wineFiltersStore.filterKey': {
			handler(val) {
				if (val != 0) {
					this.RetrieveTokens(null);
				}
			},
		},
		'generalSearchStore.generalSearchKey': {
			async handler(val) {
				if (val != 0) {
					// temporarily disable listeners so that removing the filters won't trigger the 2nd if statement in the subscription
					this.filterListenersEnabled = false;
					// await so that the filters are properly removed and won't "leak" to the subscriber
					try {
						await this.RetrieveTokens(this.generalSearchStore.generalSearch);
						await this.wineFiltersStore.removeAllFilters();
						// tick the brand options related to the NFTs retrieved from general search key
						await this.wineFiltersStore.setBrandFiltersAfterGenSearch(
							this.nftEnums
						);
					} catch {
						return;
					} finally {
						// after removing filters, bring back listeners for the filter
						this.filterListenersEnabled = true;
					}
				}
			},
		},
	},
	async mounted() {
		await this.RetrieveTokens(null);

		const filterOptions = await RetrieveFilterDetails();
		this.wineFiltersStore.setAllFilters(filterOptions);

		this.subscription = this.wineFiltersStore.$subscribe(
			async () => {
				if (!this.filterListenersEnabled) {
					return;
				}
				if (this.wineFiltersStore.filterMode == 'automatic') {
					await this.RetrieveTokens(null);
				}
			}
		);
	},
	unmounted() {
		// cancels subscription once changing to another tab (e.g. releases, recommended)
		this.subscription();
	},

	methods: {
		async addRemoveFavorites(
			tokenID: string,
			cAddress: string,
			network: string,
			objective: string
		) {
			const nftIndex = this.allNFTs.findIndex(
				nft =>
					nft.smartContractAddress == cAddress &&
					nft.tokenID == tokenID &&
					nft.network == network
			);
			switch (objective) {
				case 'add':
					try {
						this.allNFTs[nftIndex].favoriteLoading = true;
						await AddFavorites({
							walletAddress: this.userStore.walletAddress,
							tokenID: tokenID,
							contractAddress: cAddress,
							network: network,
						});
						this.allNFTs[nftIndex].favorited = true;
					} catch {
						return 0;
					} finally {
						this.allNFTs[nftIndex].favoriteLoading = false;
					}
					break;
				case 'remove':
					try {
						this.allNFTs[nftIndex].favoriteLoading = true;
						await RemoveFavorites({
							walletAddress: this.userStore.walletAddress,
							tokenID: tokenID,
							contractAddress: cAddress,
							network: network,
						});
						this.allNFTs[nftIndex].favorited = false;
					} catch {
						return 0;
					} finally {
						this.allNFTs[nftIndex].favoriteLoading = false;
					}
					break;
			}
		},

		openNFT(token: ListingWithPricingAndImage, where?: string) {
			const routeData = this.$router.resolve({
				path: '/nft',
				query: {
					id: token.tokenID,
					network: token.network,
					contractAddress: token.smartContractAddress,
				},
			});
			switch (where) {
				case 'here':
					this.$router.push({
						path: '/nft',
						query: {
							id: token.tokenID,
							network: token.network,
							contractAddress: token.smartContractAddress,
						},
					});
					break;
				case 'new-tab':
					window.open(routeData.href, '_blank');
					break;
				case 'new-window':
					window.open(
						routeData.href,
						'_blank',
						'location=yes,status=yes,scrollbars=yes,height=auto,width=auto'
					);
					break;
				default:
					this.$router.push({
						path: '/nft',
						query: {
							id: token.tokenID,
							network: token.network,
							contractAddress: token.smartContractAddress,
						},
					});
					break;
			}
		},

		copyToken(token: ListingWithPricingAndImage) {
			navigator.clipboard.writeText(JSON.stringify(token));
		},

		copyAddress(token: ListingWithPricingAndImage) {
			const routeData = this.$router.resolve({
				path: '/nft',
				query: {
					id: token.tokenID,
					network: token.network,
					contractAddress: token.smartContractAddress,
				},
			});
			navigator.clipboard.writeText(window.location.host + routeData.href);
		},

		selectCard(tokenID: string) {
			this.card = true;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			this.selected = this.allNFTs.filter((x: any) => x.tokenID === tokenID)[0];
		},

		async RetrieveTokens(genSearch?: string | null) {
			this.isLoading = true;
			if (!genSearch) {
				try {
					const { result: nfts } = await RetrieveFilteredNFTs(
						`${this.wineFiltersStore.getFiltersQueryParams}&walletAddress=${this.userStore.walletAddress}`
					);
					this.$emit('totalTokens', nfts.length);
					this.allNFTs = nfts;
					this.erroredOut = false; // change
				} catch {
					this.erroredOut = true;
				}
			} else {
				try {
					const { result: nfts, counts: nftEnums } = await RetrieveFilteredNFTs(
						`generalSearch=${genSearch}&walletAddress=${this.userStore.walletAddress}`
					);
					this.$emit('totalTokens', nfts.length);
					this.allNFTs = nfts;
					this.erroredOut = false; // change
					this.nftEnums = nftEnums;
				} catch {
					this.erroredOut = true;
				}
			}
			this.isLoading = false;
		},
		ToInt(price: string) {
			return parseInt(price);
		},
		truncateText(text: string) {
			if (this.$q.screen.width > 1350) {
				if (text.length > 50) {
					return (
						text.trim().substring(0, 50).split(' ').slice(0, -1).join(' ') + '…'
					);
				} else return text;
			} else if (this.$q.screen.width <= 600) {
				if (text.length > 35) {
					return (
						text.trim().substring(0, 35).split(' ').slice(0, -1).join(' ') + '…'
					);
				} else return text;
			} else {
				if (text.length > 40) {
					return (
						text.trim().substring(0, 40).split(' ').slice(0, -1).join(' ') + '…'
					);
				} else return text;
			}
		},
	},
});
</script>

<style scoped>
:deep(.q-btn.btn--no-hover .q-focus-helper) {
	display: none;
}
</style>
