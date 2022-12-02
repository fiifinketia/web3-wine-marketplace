<template>
	<WineMetadata :nft="nft" @refresh="refresh" @open-wallet="openWalletSideBar"/>
	<NFTHistory />
	<About />
	<WineMaker />
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import StatisticsMenu from './components/StatisticsMenu.vue';
import { NFTMetadata } from './models/Metadata';
import { GetMetadata } from './services/Metadata';
import NFTHistory from './components/NFTHistory.vue';
import WineMetadata from './components/WineMetadata.vue';
import About from './components/About.vue';
import WineMaker from './components/WineMaker.vue';
export default defineComponent({
	name: 'MetadataPage',
	components: {
		NFTHistory,
		About,
		WineMaker,
		WineMetadata
	},
emits: ['openWalletSidebar'],

	data() {
		const userStore = useUserStore();
		return {
			nft: ref < NFTMetadata > (null),
			userStore,
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
			const { id, contractAddress, network } = this.$route.params;

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

<style></style>
