<template>
	<div class="row justify-between items-center q-pb-md" style="width: 100%">
		<div class="row q-gutter-x-lg">
			<div v-if="!brandSearched">
				<span class="profile-header-offer q-pr-xs"> Listings </span>
				<span class="profile-nft-number"> {{ listingsAmount }} </span>
			</div>
			<div v-else>
				<q-btn
					dense
					unelevated
					flat
					no-caps
					:ripple="false"
					class="profile-back btn--no-hover"
					@click="ResetSearch()"
				>
					<img
						src="../../../assets/back-left.svg"
						style="height: 20px; width: 11.5px"
					/>
					<span class="profile-back-text q-pl-md"> All List...s </span>
				</q-btn>
			</div>
			<q-separator
				style="background-color: #5e97ec45 !important"
				vertical
				inset
			/>
			<q-radio
				v-model="listingSortKey"
				dense
				val="newest"
				label="New First"
				class="profile-checkbox"
				:style="
					IsSelectedSortKey('newest')
						? `font-family: 'ProximaNova-Bold';`
						: 'color: #9D9D9D'
				"
			/>
			<q-radio
				v-model="listingSortKey"
				dense
				val="oldest"
				label="Old First"
				class="profile-checkbox"
				:style="
					IsSelectedSortKey('oldest')
						? `font-family: 'ProximaNova-Bold';`
						: 'color: #9D9D9D'
				"
			/>
			<q-radio
				v-model="listingSortKey"
				dense
				val="expireFirst"
				label="Expiring First"
				class="profile-checkbox"
				:style="
					IsSelectedSortKey('expireFirst')
						? `font-family: 'ProximaNova-Bold';`
						: 'color: #9D9D9D'
				"
			/>
		</div>
		<div class="row items-center q-gutter-x-sm" style="flex-wrap: nowrap">
			<q-btn
				:ripple="false"
				unelevated
				dense
				flat
				class="new-listing-btn btn--no-hover"
				@click="OpenCreateNewListing()"
			>
				<img src="../../../assets/sell.svg" />
			</q-btn>
			<q-input
				v-model="listingBrandFilter"
				outlined
				dense
				placeholder="Search"
				class="profile-searchbox"
				:input-style="!!listingBrandFilter ? 'color: #212131' : ''"
			>
				<template #prepend>
					<q-icon name="app:search" />
				</template>
			</q-input>
			<q-btn
				:disable="!listingBrandFilter"
				flat
				unelevated
				dense
				class="profile-primary-btn"
				@click="
					FetchListingsWithBrandFilter(listingSortKey, listingBrandFilter)
				"
			>
				GO
			</q-btn>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ordersStore } from 'src/stores/orders-store';
import 'src/css/Profile/shared.css';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';

export default defineComponent({
	props: {
		listingsAmount: {
			type: Number,
			required: true,
		},
		selectedListingSortKey: {
			type: String,
			required: true,
		},
		updatedListingBrandFilter: {
			type: String,
			required: true,
		},
		listableNFTs: {
			type: [] as PropType<TokenIdentifier[]>,
			default: [],
		},
		brandSearched: {
			type: Boolean,
			default: false,
		},
	},
emits: ['listingSortKeySelected', 'listingBrandFilterUpdated', 'fetchListingsWithBrandFilter', 'create-new-listing', 'reset-listings-search'],
	data() {
		const store = ordersStore();
		return {
			store,
			listingSortKey: '',
			listingBrandFilter: '',
		};
	},
	watch: {
		listingSortKey: {
			handler: function (val) {
				this.$emit('listingSortKeySelected', val);
			},
		},
		listingBrandFilter: {
			handler: function (val) {
				this.$emit('listingBrandFilterUpdated', val);
			},
		},
	},
	mounted() {
		if (!!this.selectedListingSortKey) {
			this.listingSortKey = this.selectedListingSortKey;
		}
		if (!!this.updatedListingBrandFilter) {
			this.listingBrandFilter = this.updatedListingBrandFilter;
		}
	},
	methods: {
		IsSelectedSortKey(sortKey: string): boolean {
			return !!(this.listingSortKey === sortKey);
		},
		FetchListingsWithBrandFilter(sortKey: string, brandFilter: string) {
			this.store.setListingBrandFilterStatus(true);
			this.$emit('fetchListingsWithBrandFilter', {
				sortKey: sortKey,
				brandFilter: brandFilter,
			});
		},
		OpenCreateNewListing() {
			this.$emit('create-new-listing');
		},
		ResetSearch() {
			this.listingBrandFilter = '';
			this.store.setListingBrandFilterStatus(false);
			this.$emit('reset-listings-search', this.listingSortKey);
		},
	},
});
</script>

<style scoped>
:deep(.new-listing-btn.btn--no-hover .q-focus-helper) {
	display: none;
}
</style>
