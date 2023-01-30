<template>
	<WineMetadata
		:nft="nft"
		@refresh="refresh"
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
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { NFTMetadata } from './models/Metadata';
import { GetMetadata } from './services/Metadata';
import NFTHistory from './components/NFTHistory.vue';
import WineMetadata from './components/WineMetadata.vue';
import About from './components/About.vue';
import WineMaker from './components/WineMaker.vue';
import '../../css/Metadata/StatisticsMenu.css';

export default defineComponent({
	name: 'MetadataPage',
	components: {
		NFTHistory,
		About,
		WineMaker,
		WineMetadata,
	},
	emits: ['openWalletSidebar'],

	data() {
		const userStore = useUserStore();
		return {
			nft: ref < NFTMetadata > null,
			userStore,
			tab: ref('history'),
		};
	},

	async mounted() {
		await this.getMetadata();
	},

	methods: {
		async refresh() {
			this.$router.go();
		},

		async getMetadata() {
			const { id, contractAddress, network } = this.$route.query;

			try {
				const res = await GetMetadata({
					id,
					contractAddress,
					network,
					walletAddress: this.userStore.walletAddress,
				});
				this.nft = res;
			} catch (error) {
				console.log(error);
			}
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
