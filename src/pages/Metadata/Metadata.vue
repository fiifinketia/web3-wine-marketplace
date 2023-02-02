<template>
	<div v-if="!loadingMetadata">
		<div v-if="tokenExists">
			<WineMetadata
				:nft="nft"
				@open-wallet="openWalletSideBar"
			/>
			<q-tabs v-model="tab" no-caps align="justify" class="tabs-menu">
				<q-tab name="history" label="NFT history" />
				<q-tab class="tab-text-not-clicked" name="about" label="About" />
				<q-tab name="wine-maker" class="tab-text-not-clicked" label="Wine-maker" />
			</q-tabs>
			<q-tab-panels
				v-model="tab"
				animated
				swipeable
				transition-prev="jump-right"
				transition-next="jump-left"
			>
				<q-tab-panel name="history">
					<NFTHistory />
				</q-tab-panel>

				<q-tab-panel name="about">
					<About />
				</q-tab-panel>

				<q-tab-panel name="wine-maker">
					<WineMaker />
				</q-tab-panel>
			</q-tab-panels>
		</div>
		<UnavailableNFT
			v-else
		/>
	</div>
	<div v-else>
		<LoadingMetadata
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { NewPolygonNFT, NFTWithListingAndFavorites } from './models/Metadata';
import { GetMetadata } from './services/Metadata';
import NFTHistory from './components/NFTHistory.vue';
import WineMetadata from './components/WineMetadata.vue';
import About from './components/About.vue';
import WineMaker from './components/WineMaker.vue';
import '../../css/Metadata/StatisticsMenu.css';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
import { Contract } from '@ethersproject/contracts';
import { NewPolygonCollectionContract_MumbaiInstance, NewPolygonCollectionContract_PolygonInstance } from 'src/shared/web3.helper';
import UnavailableNFT from './components/UnavailableNFT.vue';
import LoadingMetadata from './components/LoadingMetadata.vue';

export default defineComponent({
	name: 'MetadataPage',
	components: {
		NFTHistory,
		About,
		WineMaker,
		WineMetadata,
		UnavailableNFT: UnavailableNFT,
		LoadingMetadata: LoadingMetadata
	},
	emits: ['openWalletSidebar'],

	data() {
		const userStore = useUserStore();
		return {
			nft: {} as NFTWithListingAndFavorites,
			userStore,
			tab: ref('history'),
			tokenExists: false,
			loadingMetadata: true
		};
	},

	async mounted() {
		await this.getMetadata();
	},

	methods: {
		async getMetadata() {
			const { id, contractAddress, network } = this.$route.query;
			if (typeof id === 'string' && typeof contractAddress === 'string' && typeof network === 'string') {
				const tokenExistCheck = await this.CheckTokenExistence(id, contractAddress, network);
				if (!!tokenExistCheck) {
					await this.FetchMetadata(id, contractAddress, network);
					this.tokenExists = true;
				}
				this.loadingMetadata = false;
			}
		},

		async FetchMetadata(id: string, contractAddress: string, network: string) {
			try {
				const res = await GetMetadata({
					id,
					contractAddress,
					network,
					walletAddress: this.userStore.walletAddress,
				});
				console.log(res)
				this.nft = res;
			} catch (error) {
				console.log(error);
			}
		},

		async CheckTokenExistence(id: string, contractAddress: string, network: string) : Promise<boolean> {
			let exists = true;
			try {
				let contract: Contract;
				switch (contractAddress) {
					case process.env.ERC721_CONTRACT_ADDRESS_MUMBAI:
						contract = NewPolygonCollectionContract_MumbaiInstance;
						await contract.tokenURI(id);
						break;
					case process.env.ERC721_CONTRACT_ADDRESS_POLYGON:
						contract = NewPolygonCollectionContract_PolygonInstance;
						await contract.tokenURI(id);
						break;
				}
				console.log('Token:', id, 'exists')
				exists = true;
			} catch (err: any) {
				const nonexistentMessage = err.message.toString().includes('URI query for nonexistent token');
				if (nonexistentMessage) {
					const burntNFT: TokenIdentifier = {
						contractAddress: contractAddress,
						identifierOrCriteria: id,
						network: network
					}
					this.$axios.post(<string> process.env.BURN_NFT_URL, burntNFT)
					exists = false;
				}
			}
			return exists;
		},

		openWalletSideBar() {
			this.$emit('openWalletSidebar');
		},
	},
});
</script>

<style>
.q-tab-panel {
	padding: 3rem 0 4rem !important;
}
</style>
