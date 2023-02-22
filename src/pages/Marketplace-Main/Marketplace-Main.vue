<template>
	<q-page class="q-mb-sm" style="min-height: 0">
		<div>
			<section class="q-gutter-y-md">
				<q-tabs
					v-model="tab"
					class="text-grey hidden-a-599 marketplace_tab-label"
					active-color="primary"
					indicator-color="primary"
					align="justify"
					no-caps
				>
					<q-tab name="nfts" label="Marketplace" />
					<q-tab name="releases" label="Releases" />
					<q-tab name="recommended" label="Recommended" />
				</q-tabs>
				<q-tabs
					v-model="tab"
					class="row justify-between items-center text-grey hidden-b-599 q-pa-sm q-px-md bg-gradient_blue-green"
					indicator-color="primary"
					no-caps
				>
					<span v-if="$q.screen.width > 350" class="col profile-tab-title">
						NFTs <span class="profile-tab-count"> {{ totalTokens }} </span>
					</span>
					<q-btn-dropdown
						style="height: 42px;"
						no-caps
						color="white"
						text-color="secondary"
						dropdown-icon="none"
						icon-right="app:down_arrow"
						auto-close
						class="col-auto profile-dropdown-container"
						content-class="profile-dropdown-menu"
						:label="tabLabel"
					>
						<q-list>
							<q-item clickable @click="tabLabel = 'Marketplace'; tab = 'nfts'">
								<span class="profile-dropdown-selection"> Marketplace </span>
							</q-item>

							<q-item clickable @click="tabLabel = 'Releases'; tab = 'releases'">
								<span class="profile-dropdown-selection"> Releases </span>
							</q-item>
							<q-item clickable @click="tabLabel = 'Recommended'; tab = 'recommended'">
								<span class="profile-dropdown-selection"> Recommended </span>
							</q-item>
						</q-list>
					</q-btn-dropdown>
				</q-tabs>

				<q-separator class="q-ma-none" />
				<q-tab-panels v-model="tab" animated class="q-pa-none">
					<q-tab-panel class="q-pa-none q-px-none" name="nfts">
						<AllNFTsTab @total-tokens="(total:number) => totalTokens = total"/>
					</q-tab-panel>
					<q-tab-panel class="q-pa-none q-px-none" name="releases">
						<NewlyReleasedTab @total-tokens="(total:number) => totalTokens = total"/>
					</q-tab-panel>
					<q-tab-panel class="q-pa-none q-px-none" name="recommended">
						<AllNFTsTab @total-tokens="(total:number) => totalTokens = total"/>
					</q-tab-panel>
				</q-tab-panels>
			</section>
		</div>
	</q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import 'src/css/Profile/shared.css';
import AllNFTsTab from './components/AllNFTsTab.vue';
import NewReleasedTab from './components/NewReleasedTab.vue';

export default defineComponent({
	components: {
		AllNFTsTab: AllNFTsTab,
		NewlyReleasedTab: NewReleasedTab,
	},

	data() {
		const queryT = this.$router.currentRoute.value.query.tab as string;
		return {
			tab: ref(queryT || 'nfts'),
			tabLabel: ref(this.getLabel(queryT) || 'Marketplace'),
			totalTokens: ref(0)
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
								this.tabLabel = 'Marketplace';
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

	methods: {
		getLabel(query: string) {
			switch (query) {
				case 'nfts':
					return 'Marketplace';
				case 'releases':
					return 'Releases';
				case 'recommended':
					return 'Recommended';
			}
		},
	},
});
</script>

<style>
.marketplace_tab-drowpdown .q-icon {
	width: 0.7rem;
}
.marketplace_tab-label {
	font-family: 'Obviously-Bold';
	font-size: 18px;
}
</style>
