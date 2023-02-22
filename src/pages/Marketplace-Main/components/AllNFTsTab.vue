<template>
	<div
		:class="
			isMobile()
				? 'fit row wrap justify-center items-start content-start'
				: $q.screen.width > 1025 ? 'fixed fit row wrap justify-start items-start content-start q-pl-md'
				: 'fixed fit row wrap justify-start items-start content-start'
		"
	>
		<div 
			class="row q-pb-sm col-xs-12" 
			:class="$q.screen.width >= 1024 ? 'justify-between': 'justify-center'"
		>
			<div class="row col-10">
				<div 
					class="flex hidden-a-599 q-pl-lg-none q-pl-md items-center col-4"
				>
					<span class="header-nfts-title">
						NFTs
					</span>
					<span class="q-pl-sm header-nfts-count">{{
						totalNFTs || 0
					}}</span>
				</div>
				<div class="col-sm-8 col-xs-12">
					<div class="q-mx-xs hidden-a-1023 overflow-hidden">
						<q-chip
							v-for="filter in wineFiltersStore.getAllFiltersArray.slice(0, 7)"
							:key="filter"
							removable
							dense
							color="secondary"
							class="header-filter-chip q-px-sm"
							text-color="white"
							@remove="wineFiltersStore.removeFilter(filter)"
						>
							{{ filter }}
						</q-chip>
					</div>
					<div class="row hidden-b-1023 justify-center q-gutter-x-sm">
						<q-input
							v-model="searchQuery"
							outlined
							round
							dense
							placeholder="Search"
							type="search"
							color="primary"
							:class="$q.screen.width > 600 ? 'col-10' : ''"
							:style="$q.screen.width > 600 ? 'width: 80%' : ''"
							class="header-search"
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
							class="header-go"
							@click="wineFiltersStore.searchQuery = searchQuery"
						/>
					</div>
				</div>
			</div>
			<div class="row justify-end hidden-a-599 col-2 q-pr-sm">
				<q-btn
					style="text-decoration: underline"
					class="row hidden-a-1023 header-clear-btn"
					label="Clear All"
					color="primary"
					dense
					no-caps
					flat
					@click="wineFiltersStore.removeAllFilters()"
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

		<SidebarDesktop
			v-if="$q.screen.width > 1023"
		 	class="col-sm-3 q-mt-sm" 
		 />
		<SidebarTablet
			v-else-if="$q.screen.width > 768"
			v-model="openSidebar"
		/>
		<SidebarMobile
			v-else
			v-model="openSidebar"
		/>

		<!-- List Section -->
		<NFTSelections
			class="col-md-9 col-sm-12"
			style="padding-top: 0px !important"
			@total-tokens="updateTokenCount"
		/>
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
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NFTSelections from './NFT-Selections.vue';
import SidebarDesktop from './SidebarDesktop.vue';
import { useWineFilters } from 'src/stores/wine-filters';
import 'src/css/Marketplace/header.css';
import SidebarTablet from './SidebarTablet.vue';
import SidebarMobile from './SidebarMobile.vue';

export default defineComponent({
	components: {
		NFTSelections: NFTSelections,
		SidebarDesktop: SidebarDesktop,
		SidebarTablet: SidebarTablet,
		SidebarMobile: SidebarMobile
	},
	emits: ['totalTokens'],
	data() {
		const wineFiltersStore = useWineFilters();

		return {
			showToogleButton: this.isMobile() ? ref(true) : ref(false),
			wineFiltersStore,
			searchQuery: '',
			openSidebar: false,
			totalNFTs: ref(0),
		};
	},

	watch: {
		'$q.screen.width': {
			handler() {
				this.showToogleButton = this.isMobile() ? true : false;
				this.CheckFilterMode();
			},
		},
	},
	mounted() {
		this.CheckFilterMode()
	},

	methods: {
		toggleSidebar() {
			this.openSidebar = !this.openSidebar;
		},

		isMobile(breakpoint = 880) {
			return this.$q.screen.width < breakpoint;
		},
		updateTokenCount(total: number) {
			this.totalNFTs = total;
			this.$emit('totalTokens', total);
		},
		CheckFilterMode() {
			if (this.$q.screen.width > 1023) {
				this.wineFiltersStore.setFilterMode('automatic');
			} else {
				this.wineFiltersStore.setFilterMode('manual');
			}
		}
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
