<template>
	<div class="row justify-between items-center q-pb-md" style="width: 100%">
		<div class="row q-gutter-x-lg">
			<div v-if="!brandSearched">
				<span class="profile-header-offer q-pr-xs"> Outgoing </span>
				<span class="profile-nft-number"> {{ outgoingAmount }} </span>
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
					<span class="profile-back-text q-pl-md"> All Out...ng </span>
				</q-btn>
			</div>
			<q-separator
				style="background-color: #5e97ec45 !important"
				vertical
				inset
			/>
			<q-radio
				v-model="outgoingSortKey"
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
				v-model="outgoingSortKey"
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
				v-model="outgoingSortKey"
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
			<q-input
				v-model="outgoingBrandFilter"
				outlined
				dense
				placeholder="Search"
				class="profile-searchbox"
				:input-style="!!outgoingBrandFilter ? 'color: #212131' : ''"
			>
				<template #prepend>
					<q-icon name="app:search" />
				</template>
			</q-input>
			<q-btn
				:disable="!outgoingBrandFilter"
				flat
				unelevated
				dense
				class="profile-primary-btn"
				@click="
					FetchOutgoingWithBrandFilter(outgoingSortKey, outgoingBrandFilter)
				"
			>
				GO
			</q-btn>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ordersStore } from 'src/stores/orders-store';
import 'src/css/Profile/shared.css';

export default defineComponent({
	props: {
		outgoingAmount: {
			type: Number,
			required: true,
		},
		selectedOutgoingSortKey: {
			type: String,
			required: true,
		},
		updatedOutgoingBrandFilter: {
			type: String,
			required: true,
		},
		brandSearched: {
			type: Boolean,
			default: false,
		},
	},
emits: ['outgoingSortKeySelected', 'outgoingBrandFilterUpdated', 'fetchOutgoingWithBrandFilter', 'reset-outgoing-search'],
	data() {
		const store = ordersStore();
		return {
			store,
			outgoingSortKey: '',
			outgoingBrandFilter: '',
		};
	},
	watch: {
		outgoingSortKey: {
			handler: function (val) {
				this.$emit('outgoingSortKeySelected', val);
			},
		},
		outgoingBrandFilter: {
			handler: function (val) {
				this.$emit('outgoingBrandFilterUpdated', val);
			},
		},
	},
	mounted() {
		if (!!this.selectedOutgoingSortKey) {
			this.outgoingSortKey = this.selectedOutgoingSortKey;
		}
		if (!!this.updatedOutgoingBrandFilter) {
			this.outgoingBrandFilter = this.updatedOutgoingBrandFilter;
		}
	},
	methods: {
		IsSelectedSortKey(sortKey: string): boolean {
			return !!(this.outgoingSortKey === sortKey);
		},
		FetchOutgoingWithBrandFilter(sortKey: string, brandFilter: string) {
			this.store.setOutgoingBrandFilterStatus(true);
			this.$emit('fetchOutgoingWithBrandFilter', {
				sortKey: sortKey,
				brandFilter: brandFilter,
			});
		},
		ResetSearch() {
			this.outgoingBrandFilter = '';
			this.store.setOutgoingBrandFilterStatus(false);
			this.$emit('reset-outgoing-search', this.outgoingSortKey);
		},
	},
});
</script>

<style></style>
