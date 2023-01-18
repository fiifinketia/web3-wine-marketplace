<template>
	<q-page-container class="row justify-between q-pt-none q-px-sm q-gutter-y-md">
		<div
			v-for="token in allNFTs"
			:key="
				token.tokenID + ',' + token.network + ',' + token.smartContractAddress
			"
			class="col-xl-3 col-md-3 col-sm-4 col-xs-6 main-marketplace-card-container"
		>
			<q-btn
				flat
				dense
				:ripple="false"
				no-caps
				class="btn--no-hover"
				@click="
					navigateToNFT(
						token.tokenID,
						token.network,
						token.smartContractAddress
					)
				"
			>
				<q-card class="q-pa-xs main-marketplace-nft-card" flat>
					<img class="main-marketplace-card-image" :src="token.image" />
					<div
						class="q-px-sm q-pb-sm main-marketplace-card-brand column justify-center"
						style="text-align: left"
					>
						<span>
							{{ token.brand }}
						</span>
					</div>
					<q-card-section
						class="column items-start main-marketplace-price-container q-py-sm"
					>
						<div class="row justify-between" style="width: 100%">
							<span class="main-marketplace-price-header q-pb-xs"> Price </span>
							<q-img
								v-if="token.favorited === true"
								src="../../../../public/images/heart.svg"
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
							<q-img
								v-else
								src="../../../../public/images/empty-heart.svg"
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
						<div v-if="!!token.orderDetails?.listingPrice">
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
				</q-card>
			</q-btn>
		</div>
	</q-page-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import contract from '../contract/contractABI.json';
import { useUserStore } from 'src/stores/user-store';
import { useWineFilters } from 'src/stores/wine-filters';
import { ListingWithPricingAndImage } from '../models/Response.models';
import { RetrieveFilteredNFTs } from '../services/RetrieveTokens';
import { AddFavorites, RemoveFavorites } from '../services/FavoritesFunctions';
import '../../../css/Marketplace/NFT-Selections.css';
import { CreateOrderERC1155 } from '../services/Orders';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
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
		navigateToNFT(id: string, network: string, contractAddress: string) {
			this.$router.replace({
				path: '/nft',
				query: {
					id,
					network,
					contractAddress,
				},
			});
		},

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

		selectCard(tokenID: string, smartContract: string) {
			this.card = true;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			this.selected = this.allNFTs.filter((x: any) => x.tokenID === tokenID)[0];
			this.checkIfTokenExists(tokenID, smartContract);
		},

		async checkIfTokenExists(tokenID: string, smartContract: string) {
			try {
				const web3 = new Web3('https://polygon-rpc.com');
				const result = new web3.eth.Contract(
					contract as AbiItem[],
					smartContract
				);

				const exists = await result.methods.tokenURI(tokenID).call();
				exists && console.log('Token exists\nTokenID: ' + tokenID);
			} catch (err: any) {
				if (err) console.log('Token Does not exists\nTokenID: ' + tokenID);
			}
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
