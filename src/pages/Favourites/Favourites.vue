<template>
	<FAVsRemove />
	<div class="column q-pa-md">
		<div class="row justify-between q-pt-sm">
			<div class="row">
				<div class="favorites-title">NFTs</div>
				<div class="favorites-number q-pl-sm">{{ favsNFTs.length }}</div>
			</div>
			<div class="row">
				<q-input
					v-model="text"
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
			v-if="!favsNFTs.length"
			class="no-nfts-container column justify-center items-center"
		>
			<q-img src="../../../public/images/NoNFTs.svg" width="180px" />
			<div>You do not have any favorites yet.</div>
		</div>
		<div class="row justify-around favs-cards-container">
			<q-card
				v-for="item in favsNFTs"
				:key="item.tokenID"
				class="no-shadow q-ma-md favs-card-individual"
			>
				<div class="favs-card-img"></div>
				<div class="favs-wine-name q-py-md">
					The full name of the wine is here and here and here
				</div>
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
								removeNFT(
									item.walletAddress,
									item.tokenID,
									item.contractAddress,
									item.network
								)
							"
						/>
					</div>
					<div class="row justify-between">
						<div class="favs-price">
							<q-img src="../../../public/images/USDT.svg" width="20px" />
							&nbsp;00.00
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
import axios from 'axios';

import FAVsRemove from './FAVsRemove.vue';
import { FavoritesModel } from './models/Response';
export default defineComponent({
	name: 'FavouritesPage',
	components: {
		FAVsRemove,
	},
	data() {
		return {
			favsNFTs: Array<FavoritesModel>(),
		};
	},
	mounted() {
		this.getAllFavorites();
	},
	methods: {
		async getAllFavorites() {
			const walletAddress = '0xA3873a019aC68824907A3aD99D3e3542376573D0';
			const result = await axios.get(
				`http://localhost:3100/favorites/getAllFavorites?walletAddress=${walletAddress}`
			);

			this.favsNFTs = result.data;
			console.log(this.favsNFTs);
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
		async removeNFT(
			wAddress: string,
			tokedID: string,
			cAddress: string,
			network: string
		) {
			await axios.post('http://localhost:3100/favorites/deleteFavorite', {
				data: {
					walletAddress: wAddress,
					tokenID: tokedID,
					contractAddress: cAddress,
					network: network,
				},
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
