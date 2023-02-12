<template>
	<FAVsRemove />
	<div class="column q-pa-md">
		<div class="row justify-between q-pt-sm">
			<div class="row">
				<div class="favorites-title">NFTs</div>
				<div class="favorites-number q-pl-sm">{{ favNFTs.length }}</div>
			</div>
			<div class="row">
				<q-input
					v-model="favsSearchBar"
					dense
					outlined
					color="blue-6"
					placeholder="Search"
					class="search-bar"
				>
					<template #prepend>
						<q-icon name="app:search" />
					</template>
				</q-input>
				<q-btn flat class="search-btn q-ml-sm">GO</q-btn>
			</div>
		</div>
		<div
			v-if="!favNFTs.length"
			class="no-nfts-container column justify-center items-center"
		>
			<q-img src="../../../public/images/NoNFTs.svg" width="180px" />
			<div>You do not have any favorites yet.</div>
		</div>
		<div class="row favs-cards-container">
			<q-card
				v-for="item in favNFTs"
				:key="item.tokenID"
				class="no-shadow q-pa-sm col-xl-2 col-md-3 col-sm-4 col-xs-6"
			>
				<img class="main-marketplace-card-image" :src="item.nftDetails.image" />
				<div class="favs-wine-name q-py-md">TokenID: {{ item.tokenID }}</div>
				<div class="favs-price-container column q-pa-sm">
					<div class="row justify-between q-pb-md">
						<div class="starting-from">Price</div>
						<q-btn
							class="un-favour-btn"
							icon="app:heart"
							flat
							dense
							padding="0"
							@click="
								removeNFT(item.tokenID, item.contractAddress, item.network)
							"
						/>
					</div>
					<div class="row justify-between">
						<div class="favs-price">
							<q-img src="../../../public/images/USDT.svg" width="20px" />
							&nbsp;{{ item.nftDetails?.orderDetails?.listingPrice || '00.00' }}
						</div>
						<q-img
							src="../../../public/images/mini-button.svg"
							width="24px"
							height="24px"
						/>
					</div>
				</div>
			</q-card>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import '../../css/Favorites/Favorites.css';

import FAVsRemove from './FAVsRemove.vue';
import { FavoritesModel } from './models/Response';
import {
	RemoveFavorites,
	GetAllFavorites,
} from '../Marketplace-Main/services/FavoritesFunctions';
import { useUserStore } from 'src/stores/user-store';
import { ref } from 'vue';
export default defineComponent({
	name: 'FavouritesPage',
	components: {
		FAVsRemove,
	},
	data() {
		const userStore = useUserStore();
		return {
			favsSearchBar: ref(''),
			favNFTs: Array<FavoritesModel>(),
			userStore,
		};
	},
	mounted() {
		this.getAllFavorites();
	},
	methods: {
		async getAllFavorites() {
			const { result: nfts } = await GetAllFavorites(
				`?walletAddress=${this.userStore.walletAddress}`
			);
			this.favNFTs = nfts;
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
			await RemoveFavorites({
				walletAddress: this.userStore.walletAddress,
				tokenID: tokenID,
				contractAddress: cAddress,
				network: network,
			});
			this.getAllFavorites();

			this.animation('1', 'scale(1)', '200');

			setTimeout(() => {
				this.animation('0', 'scale(0.5)', '-200');
			}, 1500);
		},
	},
});
</script>

<style></style>
