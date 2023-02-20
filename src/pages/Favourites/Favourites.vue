<template>
	<q-page class="column items-center here" style="margin-bottom: 10px; min-height: 0">
		<FavsHeader />
		<div 
			v-if="!isLoading"
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
					<img class="favorites-card-image" :src="nft.nftDetails.image" />
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
								:width="$q.screen.width > 350 ? '20px' : '16px'"
								:height="$q.screen.width > 350 ? '20px' : '16px'"
								src="../../../public/images/heart.svg"
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
				</q-card>
			</div>
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
	</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '../../css/Favorites/Favorites.css';
import FAVsRemove from './FAVsRemove.vue';
import { FavoritesModel } from './models/Response';
import {
	RemoveFavorites,
	GetAllFavorites,
} from '../Marketplace-Main/services/FavoritesFunctions';
import { useUserStore } from 'src/stores/user-store';
import FavoritesHeader from './FavoritesHeader.vue';

export default defineComponent({
	name: 'FavouritesPage',
	components: {
		// FavsPopup: FAVsRemove,
		FavsHeader: FavoritesHeader
	},
	data() {
		const userStore = useUserStore();
		return {
			favNFTs: Array<FavoritesModel>(),
			loadingFavNFTs: [0,1,2,3,4,5,6,7],
			isLoading: true,
			userStore
		};
	},
	mounted() {
		this.getAllFavorites();
	},
	methods: {
		async getAllFavorites() {
			this.isLoading = true;
			const { result: nfts } = await GetAllFavorites(
				`?walletAddress=${this.userStore.walletAddress}`
			);
			this.favNFTs = nfts;
			this.isLoading = false;
		},
		animation(opacity: string, transform: string, zIndex: string) {
			const removeNFTBackground = document.querySelector(
				'.fr-background'
			) as HTMLElement;
			const removeNFTContainer = document.querySelector(
				'.fr-container'
			) as HTMLElement;

			removeNFTBackground.style.zIndex = zIndex;
			removeNFTBackground.style.opacity = opacity;
			removeNFTContainer.style.transform = transform;
		},
		async removeNFT(tokenID: string, cAddress: string, network: string) {
			try {
				await RemoveFavorites({
					walletAddress: this.userStore.walletAddress,
					tokenID: tokenID,
					contractAddress: cAddress,
					network: network,
				});
				this.favNFTs = this.favNFTs.filter(nft => nft.contractAddress !== cAddress && nft.tokenID !== tokenID && nft.network !== network);
				this.animation('1', 'scale(1)', '200');
	
				setTimeout(() => {
					this.animation('0', 'scale(0.5)', '-200');
				}, 1500);
			} catch {
				return 0
			}
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
		}
	},
});
</script>

<style></style>
