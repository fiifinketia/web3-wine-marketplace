<template>
	<div class="fit row wrap justify-start items-start content-start">
		<!-- Header -->
		<div class="row col-xs-12 justify-between">
			<!-- <button
				:style="showToogleButton ? 'display: none;' : 'display : block;'"
				@click="toggleSidebar()"
			>
				Side
			</button> -->
			<div class="flex col-sm-2 hidden-a-599 q-pl-lg-none q-pl-md items-center">
				NFTs <span class="text-weight-bold text-h6 q-pl-sm">{{ totalNFTs || 0 }}</span>
			</div>
			<div class="col-sm-7 col-xs-12">
				<div class="q-mx-xs hidden-a-1023 overflow-hidden">
					<q-chip
						v-for="filter in wineFiltersStore.getAllFiltersArray.slice(0, 7)"
						:key="filter"
						removable
						color="secondary"
						text-color="white"
						@remove="wineFiltersStore.removeFilter(filter)"
					>
						{{ filter }}
					</q-chip>
				</div>
				<div class="row hidden-b-1023 justify-between q-px-sm">
					<q-input
						v-model="searchQuery"
						outlined
						round
						dense
						placeholder="Search"
						type="search"
						color="primary"
						class="col-10"
						style="width:80%"
					>
						<template #prepend>
							<q-icon name="search" />
						</template>
					</q-input>
					<q-btn
						color="primary"
						text-color="white"
						label="GO"
						unelevated
						class="col-2"
						@click="wineFiltersStore.searchQuery = searchQuery"
					/>
				</div>
			</div>
			<div class="row justify-end col-sm-2 hidden-a-599">
				<q-btn
					style="text-decoration: underline"
					class="row hidden-a-1023"
					label="Clear All"
					color="primary"
					no-caps
					flat
					@click="wineFiltersStore.$reset()"
				/>
				<div class="hidden-b-1023 q-pr-md">
					<span
						class="q-pa-sm text-weight-bolder text-h6"
						style="vertical-align: middle"
					>
						{{ wineFiltersStore.getAllFiltersArray.length }}</span
					>
					<q-btn
						class="col-10 q-pa-sm"
						dense
						unelevated
						color="secondary"
						text-color="white"
						icon="app:filter"
						@click="toggleSidebar()"
					/>
				</div>
			</div>
		</div>

		<!-- Sidebar -->

		<MarketPlaceSidebar class="col-sm-3 hidden-a-1023" />

		<!-- List Section -->
		<NFTSelections  class="col-md-9 col-sm-12"  style="overflow: auto; padding-top: 0px !important" @total-tokens="(total: number) => totalNFTs = total"/>
		<q-page-sticky
			class="hidden-b-599 q-mr-md"
			position="bottom-right"
			:offset="[18, 18]"
		>
			<q-card rounded class="row q-pa-xs rounded-borders">
				<span
					class="text-weight-bold text-h6 q-px-sm"
					clickable
					@click="toggleSidebar()"
				>
					{{ wineFiltersStore.getAllFiltersArray.length }}</span
				>
				<q-btn
					dense
					color="secondary"
					text-color="white"
					icon="app:filter"
					@click="toggleSidebar()"
				/>
			</q-card>
		</q-page-sticky>

		<q-dialog
			v-model="openSidebar"
			full-height
			position="right"
			class="filter-modal-bg"
		>
			<div class="column no-box-shadow q-mr-md">
				<MarketPlaceSidebar
					class="hidden-b-1023 all-pointer-events scroll"
					style="height: 85%; min-width: 200px"
				/>
				<q-card
					flat
					bordered
					class="main-filter-box hidden-b-1023 dark-blue-border q-mt-md"
				>
					<q-card-section class="row justify-between q-pa-md">
						<q-btn
							v-close-popup
							style="text-decoration: underline"
							label="Clear All"
							color="primary"
							no-caps
							flat
							@click="wineFiltersStore.$reset()"
						/>
						<q-btn v-close-popup label="Apply" color="primary" no-caps />
					</q-card-section>
				</q-card>
			</div>
		</q-dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NFTSelections from './NFT-Selections.vue';
import MarketPlaceSidebar from './MarketPlaceSidebar.vue';
import { useWineFilters } from 'src/stores/wine-filters';

export default defineComponent({
	components: {
		NFTSelections: NFTSelections,
		MarketPlaceSidebar: MarketPlaceSidebar,
	},
	data() {
		const wineFiltersStore = useWineFilters();

		return {
			showToogleButton: this.isMobile() ? ref(true) : ref(false),
			wineFiltersStore,
			searchQuery: '',
			openSidebar: false,
			totalNFTs: ref(0)
		};
	},

	watch: {
		'$q.screen.width': {
			handler() {
				this.showToogleButton = this.isMobile() ? true : false;
			},
		},
	},
	// mounted() {

	// },

	methods: {
		toggleSidebar() {
			this.openSidebar = !this.openSidebar;
		},

		isMobile(breakpoint = 880) {
			return this.$q.screen.width > breakpoint;
		},
	},
});
</script>

<style>
.filter-modal-bg {
	background: linear-gradient(
		289.94deg,
		rgba(33, 33, 49, 0.4) 58.61%,
		rgba(131, 224, 179, 0.4) 108.36%
	);
	backdrop-filter: blur(5px);
}
</style>
