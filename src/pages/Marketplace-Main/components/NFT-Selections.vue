<template>
	<q-page-container class="row justify-between q-pt-none q-px-sm q-gutter-y-md">
		<div
			v-for="token in allNFTs"
			:key="
				token.tokenID + ',' + token.network + ',' + token.smartContractAddress
			"
			class="col-xl-3 col-md-3 col-sm-4 col-xs-6 main-marketplace-card-container"
			@click="openNFT(token)"
		>
			<div>
				<q-card class="q-ma-xs main-marketplace-nft-card" flat>
					<q-btn
						flat
						dense
						:ripple="false"
						class="btn--no-hover"

					>
						<img
							:src="token.image"
							class="main-marketplace-card-image"
							style="width: 100%"
						/>
					</q-btn>
					<div
						class="q-px-sm q-pb-sm main-marketplace-card-brand column justify-center"
						style="text-align: left"
					>
						<span>
							{{ token.brand }}
						</span>
					</div>
					<q-card-section
						class="column items-start main-marketplace-price-container q-py-sm q-mx-sm"
					>
						<div class="row justify-between" style="width: 100%">
							<span
								class="main-marketplace-price-header q-pb-xs"
							>
								Price
							</span>
							<q-img
								v-if="token.favorited === true"
								src="../../../../public/images/heart.svg"
								class="clickable-image"
								width="20px"
								height="20px"
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
								v-else
								src="../../../../public/images/empty-heart.svg"
								class="clickable-image"
								width="20px"
								height="20px"
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
							v-if="!!token.orderDetails?.listingPrice"
						>
							<div class="row items-end q-gutter-x-xs">
								<q-img
									src="../../../assets/icons/currencies/USDC-Icon.svg"
									style="height: 20px; width: 20px"
								/>
								<span class="main-marketplace-price-text-b">
									{{ ToInt(token.orderDetails.listingPrice) }}
								</span>
							</div>
						</div>
						<div v-else>
							<span class="main-marketplace-price-text-b"> Not available </span>
						</div>
					</q-card-section>
					<q-menu touch-position context-menu>
						<q-list dense style="min-width: 100px">
							<q-item clickable v-close-popup>
								<q-item-section @click="openNFT(token)">Open</q-item-section>
							</q-item>
							<q-item clickable v-close-popup>
								<q-item-section @click="openNFT(token, 'new-tab')"
									>Open link in New Tab</q-item-section
								>
							</q-item>
							<q-item clickable v-close-popup>
								<q-item-section @click="openNFT(token, 'new-window')"
									>Open link in New Window</q-item-section
								>
							</q-item>
							<q-separator />
							<q-item clickable v-close-popup>
								<q-item-section @click="copyAddress(token)">Copy Link</q-item-section>
							</q-item>
							<q-item clickable v-close-popup>
								<q-item-section @click="copyToken(token)">Copy Token Details</q-item-section>
							</q-item>
						</q-list>
					</q-menu>
				</q-card>
			</div>
		</div>
	</q-page-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useUserStore } from 'src/stores/user-store';
import { useWineFilters } from 'src/stores/wine-filters';
import { ListingWithPricingAndImage } from '../models/Response.models';
import { RetrieveFilteredNFTs } from '../services/RetrieveTokens';
import { AddFavorites, RemoveFavorites } from '../services/FavoritesFunctions';
import '../../../css/Marketplace/NFT-Selections.css';

export default defineComponent({
	data() {
		const userStore = useUserStore();

		const wineFiltersStore = useWineFilters();

		wineFiltersStore.$subscribe(async () => {
			await this.RetrieveTokens();
		});

		return {
			allNFTs: new Array<ListingWithPricingAndImage>(),
			card: ref(false),
			stars: ref(3),
			selected: ref(),
			userStore,
			wineFiltersStore,
			// walletAddressTemporary: '0xA3873a019aC68824907A3aD99D3e3542376573D0',
		};
	},

	async mounted() {
		await this.RetrieveTokens();
	},

	methods: {
		async addRemoveFavorites(
			tokenID: string,
			cAddress: string,
			network: string,
			objective: string
		) {
			switch (objective) {
				case 'add':
					await AddFavorites({
						walletAddress: this.userStore.walletAddress,
						tokenID: tokenID,
						contractAddress: cAddress,
						network: network,
					});
					break;

				case 'remove':
					await RemoveFavorites({
						walletAddress: this.userStore.walletAddress,
						tokenID: tokenID,
						contractAddress: cAddress,
						network: network,
					});
					break;
			}
			await this.RetrieveTokens();
		},

		openNFT(token: any, where?: string) {
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
					window.open(routeData.href, '_blank', 'location=yes,status=yes,scrollbars=yes,height=auto,width=auto');
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

		copyToken(token: any) {
			navigator.clipboard.writeText(JSON.stringify(token))
		},

		copyAddress(token: any) {
			const routeData = this.$router.resolve({
				path: '/nft',
				query: {
					id: token.tokenID,
					network: token.network,
					contractAddress: token.smartContractAddress,
				},
			});
			navigator.clipboard.writeText(window.location.host+routeData.href)
		},

		selectCard(tokenID: string) {
			this.card = true;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			this.selected = this.allNFTs.filter((x: any) => x.tokenID === tokenID)[0];
		},

		async RetrieveTokens() {
			const { result: nfts } = await RetrieveFilteredNFTs(
				`${this.wineFiltersStore.getFiltersQueryParams}&walletAddress=${this.userStore.walletAddress}`
			);
			this.allNFTs = nfts;
		},
		ToInt(price: string) {
			return parseInt(price);
		},
	},
});
</script>

<style scoped>
:deep(.q-btn.btn--no-hover .q-focus-helper) {
	display: none;
}
</style>
