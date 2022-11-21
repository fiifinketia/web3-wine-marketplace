<template>
	<q-page class="q-mb-sm">
		<div>
			<section class="q-gutter-y-md">
				<q-tabs
					v-model="tab"
					class="text-grey hidden-a-599"
					active-color="primary"
					indicator-color="primary"
					align="justify"
					no-caps
				>
					<q-tab name="nfts" label="All NFTs" />
					<q-tab name="releases" label="Releases" />
					<q-tab name="recommended" label="Recommended" />
				</q-tabs>
				<q-tabs
					v-model="tab"
					class="row justify-between text-grey hidden-b-599 q-pa-sm q-px-lg bg-gradient_blue-green"
					indicator-color="primary"
					no-caps
				>
					<span class="col text-white">
						NFTs <span class="text-h6 text-weight-bolder"> {{ 283 }} </span>
					</span>
					<q-btn-dropdown
						no-caps
						color="white"
						text-color="secondary"
						dropdown-icon="none"
						icon-right="app:down_arrow"
						auto-close
						class="col-auto marketplace_tab-drowpdown"
						:label="tabLabel"
					>
						<q-list>
							<q-item clickable @click="tabLabel = 'All NFTs'">
								<q-tab name="nfts" label="All NFTs" />
							</q-item>

							<q-item clickable @click="tabLabel = 'Releases'">
								<q-tab name="releases" label="Releases" />
							</q-item>
							<q-item clickable @click="tabLabel = 'Recommended'">
								<q-tab name="recommended" label="Recommended" />
							</q-item>
						</q-list>
					</q-btn-dropdown>
				</q-tabs>

				<q-separator class="q-ma-none" />
				<q-tab-panels v-model="tab" animated>
					<q-tab-panel class="q-pa-none q-px-md" name="nfts">
						<AllNFTsTab />
					</q-tab-panel>
					<q-tab-panel class="q-pa-none q-px-md" name="releases">
						<AllNFTsTab />
					</q-tab-panel>
					<q-tab-panel class="q-pa-none q-px-md" name="recommended">
						<AllNFTsTab />
					</q-tab-panel>
				</q-tab-panels>
			</section>
		</div>
	</q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AllNFTsTab from './components/AllNFTsTab.vue';

export default defineComponent({
	components: {
		AllNFTsTab: AllNFTsTab,
	},

	data() {
		const queryT = this.$router.currentRoute.value.query.tab as string;
		return {
			tab: ref(queryT || 'nfts'),
			tabLabel: ref('All NFTs'),
		};
	},

	watch: {
		$route: {
			handler: function (to, from) {
				if (from && to.query.tab) {
					const tabTo = to.query.tab;
					if (
						tabTo !== from.query.tab &&
						(tabTo === 'nfts' ||
							tabTo === 'releases' ||
							tabTo === 'recommended')
					) {
						this.tab = tabTo;
						switch (tabTo) {
							case 'nfts':
								this.tabLabel = 'All NFTs';
								break;
							case 'releases':
								this.tabLabel = 'Releases';
								break;
							case 'recommended':
								this.tabLabel = 'Recommended';
								break;
						}
					}
				}
			},
			immediate: true,
		},
	},
});
</script>

<style>
.marketplace_tab-drowpdown .q-icon {
	width: 0.7rem;
}
</style>
