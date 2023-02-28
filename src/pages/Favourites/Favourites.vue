<template>
	<q-page 
		class="column items-center" 
		style="margin-bottom: 10px; min-height: 0"
	>
		<FavsHeader 
			:nftsLength="favNFTs.length"
			@brand-search="(val) => getAllFavoritesWithBrand(val)"
			@reset-search="getAllFavoritesWithoutBrand()"
		/>
		<div 
			v-if="!isLoading && !emptyRequest"
			class="row q-gutter-y-md"
			:class="favNFTs.length >= 4 && $q.screen.width > 600
				? 'justify-between q-px-md': favNFTs.length == 3 && $q.screen.width > 600
				? 'justify-evenly q-px-md' : $q.screen.width > 600
				? 'justify-start q-gutter-x-lg' : favNFTs.length >= 2
				? 'justify-around q-px-sm' : 'justify-start q-px-sm'"
			style="width: 100%"
		>
			<div
				v-for="nft in favNFTs"
				:key="nft.tokenID"
				class="favorites-card-container"
			>
				<q-card
					class="q-ma-xs"
					flat
				>
					<img 
						class="favorites-card-image clickable-image"
						:src="nft.nftDetails.image"
					/>
					<div
						class="q-pb-sm favorites-brand column justify-center"
						style="text-align: left"
					>
						<span>
							{{ truncateText(nft.nftDetails.brand) }}
						</span>
					</div>
					<div class="favorites-price-container column q-pa-sm">
						<div class="row justify-between">
							<span class="favorites-price-text">Price</span>
							<q-img
								v-if="!!nft.favoriteLoading"
								src="../../assets/loading-heart.gif"
								:style="$q.screen.width > 350 
									? 'width: 27px; height: 27px; margin: -4px -4px -4px -4px' 
									: 'width: 22px; height: 22px; margin: -3px -3px -4px -4px'"
							/>
							<q-img
								v-else
								:width="$q.screen.width > 350 ? '20px' : '16px'"
								:height="$q.screen.width > 350 ? '20px' : '16px'"
								src="../../../public/images/heart.svg"
								class="clickable-image"
								@click.stop="
									removeNFT(nft.tokenID, nft.contractAddress, nft.network)
								"
							/>
						</div>
						<div v-if="!!nft.nftDetails.orderDetails?.listingPrice && !!nft.nftDetails.orderDetails?.transactionStatus">
							<div class="row items-center q-gutter-x-xs q-pt-xs">
								<q-img
									src="../../assets/icons/currencies/USDC-Icon.svg"
									:style="$q.screen.width > 350 ? 'height: 20px; width: 20px' : 'height: 15px; width: 16px'"
								/>
								<span class="favorites-b-text-active">
									{{ ToInt(nft.nftDetails.orderDetails.listingPrice) }}
								</span>
							</div>
						</div>
						<div v-else class="q-pt-sm" style="display: flex">
							<span class="favorites-b-text-inactive"> Not available </span>
						</div>
					</div>
					<q-menu touch-position context-menu>
						<q-list dense style="min-width: 100px">
							<q-item clickable v-close-popup>
								<q-item-section @click="openNFT(nft)">Open</q-item-section>
							</q-item>
							<q-item clickable v-close-popup>
								<q-item-section @click="openNFT(nft, 'new-tab')"
									>Open link in New Tab</q-item-section
								>
							</q-item>
							<q-item clickable v-close-popup>
								<q-item-section @click="openNFT(nft, 'new-window')"
									>Open link in New Window</q-item-section
								>
							</q-item>
							<q-separator />
							<q-item clickable v-close-popup>
								<q-item-section @click="copyAddress(nft)"
									>Copy Link</q-item-section
								>
							</q-item>
							<q-item clickable v-close-popup>
								<q-item-section @click="copyToken(nft)"
									>Copy Token Details</q-item-section
								>
							</q-item>
						</q-list>
					</q-menu>
				</q-card>
			</div>
		</div>
		<div
			v-else-if="!isLoading && emptyRequest"
			style="min-height: calc(100vh - 200px); width: 80%"
			class="column items-center justify-center"
		>
			<FavsEmpty />
		</div>
		<div 
			v-else
			class="row q-px-md q-pt-sm q-gutter-y-md"
			:class="$q.screen.width > 600
				? 'justify-between' : 'justify-around'"
		>
			<div
				v-for="loading in loadingFavNFTs"
				:key="loading"
				class="favorites-loading-card-container"
			>
				<q-card
					class="q-ma-xs"
					flat
				>
					<img
						src="../../../src/assets/loading-card.svg"
						class="favorites-card-image"
					/>
					<img
						src="../../../src/assets/loading-brand.svg"
						style="height: 35px"
						class="q-my-md"
					/>
					<img
						src="../../../src/assets/loading-pricebox.svg"
					/>
				</q-card>
		</div>
		</div>
		<FavsRemoved v-model="removeDialog"/>
	</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '../../css/Favorites/Favorites.css';
import { FavoritesModel } from './models/Response';
import {
	RemoveFavorites,
	GetAllFavorites,
} from '../Marketplace-Main/services/FavoritesFunctions';
import { useUserStore } from 'src/stores/user-store';
import FavoritesHeader from './FavoritesHeader.vue';
import EmptyFavorites from './EmptyFavorites.vue';
import RemoveDialog from './RemoveDialog.vue';

export default defineComponent({
	name: 'FavouritesPage',
	components: {
		FavsRemoved: RemoveDialog,
		FavsHeader: FavoritesHeader,
		FavsEmpty: EmptyFavorites
	},
	data() {
		const userStore = useUserStore();
		return {
			favNFTs: Array<FavoritesModel>(),
			loadingFavNFTs: [0,1,2,3,4,5,6,7],
			isLoading: true,
			emptyRequest: false,
			brandSearch: '',
			userStore,
			removeDialog: true
		};
	},
	mounted() {
		this.getAllFavoritesWithoutBrand();
	},
	methods: {
		async getAllFavorites(walletAddress: string, brand: string) {
			this.isLoading = true;
			const { result: nfts } = await GetAllFavorites(
				walletAddress,
				brand
			);
			this.favNFTs = nfts;
			this.CheckForEmptiness(this.favNFTs);
			this.isLoading = false;
		},
		async removeNFT(tokenID: string, cAddress: string, network: string) {
			try {
				const nftIndex = this.favNFTs.findIndex((nft => 
					nft.contractAddress == cAddress && 
					nft.tokenID == tokenID &&
					nft.network == network
				))
				if (nftIndex > -1) {
					this.favNFTs[nftIndex].favoriteLoading = true;
					await RemoveFavorites({
						walletAddress: this.userStore.walletAddress,
						tokenID: tokenID,
						contractAddress: cAddress,
						network: network,
					});
					this.favNFTs.splice(nftIndex, 1)
				}
				this.CheckForEmptiness(this.favNFTs);
			} catch {
				return 0
			}
		},
		getAllFavoritesWithBrand(brand: string) {
			this.getAllFavorites(this.userStore.walletAddress, brand);
		},
		getAllFavoritesWithoutBrand() {
			this.getAllFavorites(this.userStore.walletAddress, '');
		},
		ToInt(price: string) {
			return parseInt(price);
		},
		truncateText(text: string) {
			if (this.$q.screen.width > 1350) {
				if (text.length > 50) {
					return text.trim().substring(0, 50).split(" ").slice(0, -1).join(" ") + "…";	
				} else return text
			} else if (this.$q.screen.width <= 600) {
				if (text.length > 35) {
					return text.trim().substring(0, 35).split(" ").slice(0, -1).join(" ") + "…";	
				} else return text
			} else {
				if (text.length > 40) {
					return text.trim().substring(0, 40).split(" ").slice(0, -1).join(" ") + "…";
				} else return text
			}
		},
		CheckForEmptiness(favNFTs: FavoritesModel[]) {
			if (favNFTs.length == 0) {
				this.emptyRequest = true;
			}
		},
		openNFT(token: FavoritesModel, where?: string) {
			const routeData = this.$router.resolve({
				path: '/nft',
				query: {
					id: token.tokenID,
					network: token.network,
					contractAddress: token.contractAddress,
				},
			});
			switch (where) {
				case 'here':
					this.$router.push({
						path: '/nft',
						query: {
							id: token.tokenID,
							network: token.network,
							contractAddress: token.contractAddress,
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
							contractAddress: token.contractAddress,
						},
					});
					break;
			}
		},
		copyToken(token: FavoritesModel) {
			navigator.clipboard.writeText(JSON.stringify(token));
		},
		copyAddress(token: FavoritesModel) {
			const routeData = this.$router.resolve({
				path: '/nft',
				query: {
					id: token.tokenID,
					network: token.network,
					contractAddress: token.contractAddress,
				},
			});
			navigator.clipboard.writeText(window.location.host + routeData.href);
		},
	},
});
</script>

<style></style>
