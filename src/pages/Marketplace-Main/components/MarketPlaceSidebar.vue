<template>
	<!-- Main box -->
	<q-card flat bordered class="main-filter-box dark-blue-border q-px-md">
		<q-card-section class="hidden-a-992">
			<q-input
				v-model="searchQuery"
				outlined
				round
				placeholder="Search"
				type="search"
				color="primary"
			>
				<template #prepend>
					<q-icon name="search" />
				</template>
			</q-input>
			<div class="row justify-end">
				<q-btn
					class="q-ma-sm"
					color="primary"
					outlined
					label="Go"
					@click="wineFiltersStore.searchQuery = searchQuery"
				/>
			</div>
		</q-card-section>
		<q-list class="q-pl-md q-pr-lg rounded-borders">
			<!-- Listed Only filter -->
			<q-expansion-item
				label="Listed Only"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-list
					class="q-pl-md q-pr-lg dark-blue-border rounded-borders q-my-sm"
				>
					<q-option-group
						v-model="wineFiltersStore.listedOnly"
						:options="wineFiltersStore.listedOnlyOptions"
						type="radio"
					/>
				</q-list>
			</q-expansion-item>

			<!-- Sort A to Z filter -->
			<q-expansion-item
				label="Sort A-Z"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-list
					class="q-pl-md q-pr-lg dark-blue-border rounded-borders q-my-sm"
				>
					<q-option-group
						v-model="wineFiltersStore.sortedAtoZ"
						:options="wineFiltersStore.sortedAtoZOptions"
						type="radio"
					/>
				</q-list>
			</q-expansion-item>

			<!-- Type filter -->
			<q-expansion-item
				label="Type"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-list
					class="q-pl-md q-pr-lg dark-blue-border rounded-borders q-my-sm"
				>
					<q-option-group
						v-model="wineFiltersStore.type"
						:options="wineFiltersStore.typeOptions"
						type="checkbox"
					/>
				</q-list>
			</q-expansion-item>

			<!-- brand filter -->
			<q-expansion-item
				label="Brand"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-input
					v-model="brandQuery"
					outlined
					dense
					round
					placeholder="Search"
					type="search"
				>
					<template #prepend>
						<q-icon name="search" />
					</template>
				</q-input>
				<q-list
					class="q-pl-md q-pr-lg dark-blue-border rounded-borders q-my-sm"
				>
					<q-option-group
						v-model="wineFiltersStore.brand"
						:options="brandOptions"
						type="checkbox"
					/>
				</q-list>
			</q-expansion-item>

			<!-- Origin Filter -->
			<q-expansion-item
				label="Origin"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-list
					class="q-pl-md q-pr-lg dark-blue-border rounded-borders q-my-sm"
				>
					<q-option-group
						v-model="wineFiltersStore.origin"
						:options="originOptions"
						type="checkbox"
					/>
				</q-list>
			</q-expansion-item>

			<!-- Producer Filter -->
			<q-expansion-item
				label="Producer"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-list
					class="q-pl-md q-pr-lg dark-blue-border rounded-borders q-my-sm"
				>
					<q-option-group
						v-model="wineFiltersStore.producer"
						:options="producerOptions"
						type="checkbox"
					/>
				</q-list>
			</q-expansion-item>

			<!-- Country Filter -->
			<q-expansion-item
				label="Country"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-list
					class="q-pl-md q-pr-lg dark-blue-border rounded-borders q-my-sm"
				>
					<q-option-group
						v-model="wineFiltersStore.country"
						:options="countryOptions"
						type="checkbox"
					/>
				</q-list>
			</q-expansion-item>

			<!-- Region Filter -->
			<q-expansion-item
				label="Region"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-list
					class="q-pl-md q-pr-lg dark-blue-border rounded-borders q-my-sm"
				>
					<q-option-group
						v-model="wineFiltersStore.region"
						:options="regionOptions"
						type="checkbox"
					/>
				</q-list>
			</q-expansion-item>

			<!-- Appelation Filter -->
			<q-expansion-item
				label="Appelation"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-list
					class="q-pl-md q-pr-lg dark-blue-border rounded-borders q-my-sm"
				>
					<q-option-group
						v-model="wineFiltersStore.appelation"
						:options="appelationOptions"
						type="checkbox"
					/>
				</q-list>
			</q-expansion-item>

			<!-- Price Filter -->
			<q-expansion-item
				label="Price"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-card class="dark-blue-border rounded-borders q-my-sm q-pa-sm">
					<q-card-section class="row col-12">
						<div class="col-8">
							<div class="row">
								<div class="col-3">
									<p class="q-pa-none q-ma-xs">from</p>
									<p class="q-pa-none q-ma-xs">to</p>
								</div>
								<div class="col-6">
									<p class="q-pa-none q-ma-xs">
										<q-icon name="app:price" size="sm"></q-icon>
										{{ price.min.toFixed(2) }}
									</p>
									<p class="q-pa-none q-ma-xs">
										<q-icon name="app:price" size="sm"></q-icon>
										{{ price.max.toFixed(2) }}
									</p>
								</div>
							</div>
						</div>
						<div class="col-4">
							<q-btn
								class="q-ma-md"
								type="button"
								label="Ok"
								outlined
								color="primary"
								@click="wineFiltersStore.setPrice(price)"
							/>
						</div>
					</q-card-section>
					<q-item-section class="row col-12">
						<q-range
							v-model="price"
							thumb-color="white"
							class="col-8 q-px-lg"
							label
							:step="1"
							:min="0"
							:max="100"
							:debounce="500"
						/>
					</q-item-section>
				</q-card>
			</q-expansion-item>

			<!-- Maturity Filter -->
			<q-expansion-item
				label="Maturity"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-card class="dark-blue-border rounded-borders q-my-sm q-pa-sm">
					<q-card-section class="row col-12">
						<div class="col-8">
							<div class="row">
								<span class="q-pa-none q-ma-xs">
									{{ getYears(maturity.min) || 0 }} -
									{{ getYears(maturity.max) }}
								</span>
							</div>
						</div>
						<div class="col-4">
							<q-btn
								class="q-ma-none"
								type="button"
								label="Ok"
								outlined
								color="primary"
								@click="applyMaturityFilter"
							/>
						</div>
					</q-card-section>
					<q-item-section class="row col-12">
						<q-range
							v-model="maturity"
							thumb-color="white"
							class="col-8 q-px-lg"
							label
							:step="6"
							:min="0"
							:max="100"
							:debounce="500"
						/>
					</q-item-section>
				</q-card>
			</q-expansion-item>

			<!-- Case Filter -->
			<q-expansion-item
				label="Case"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-list
					class="q-pl-md q-pr-lg dark-blue-border rounded-borders q-my-sm"
				>
					<q-option-group
						v-model="wineFiltersStore.wineCase"
						:options="wineCaseOptions"
						type="checkbox"
					/>
				</q-list>
			</q-expansion-item>

			<!-- Format Filter -->
			<q-expansion-item
				label="Format"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-list
					class="q-pl-md q-pr-lg dark-blue-border rounded-borders q-my-sm"
				>
					<q-option-group
						v-model="wineFiltersStore.format"
						:options="formatOptions"
						type="checkbox"
					/>
				</q-list>
			</q-expansion-item>

			<!-- Inverstment Grade Filter -->
			<q-expansion-item
				label="Investment Grade"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-list
					class="q-pl-md q-pr-lg dark-blue-border rounded-borders q-my-sm"
				>
					<q-option-group
						v-model="wineFiltersStore.investmentGrade"
						:options="investmentGradeOptions"
						type="checkbox"
					/>
				</q-list>
			</q-expansion-item>

			<!-- LWIN Filter -->
			<q-expansion-item
				label="LWIN"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-list
					class="q-pl-md q-pr-lg dark-blue-border rounded-borders q-my-sm"
				>
					<q-option-group
						v-model="wineFiltersStore.LWIN"
						:options="LWINOptions"
						type="checkbox"
					/>
				</q-list>
			</q-expansion-item>

			<!-- Heritage Filter -->
			<q-expansion-item
				label="Heritage"
				header-class="dark-blue-border rounded-borders q-my-sm"
			>
				<q-list
					class="q-pl-md q-pr-lg dark-blue-border rounded-borders q-my-sm"
				>
					<q-option-group
						v-model="wineFiltersStore.heritage"
						:options="heritageOptions"
						type="checkbox"
					/>
				</q-list>
			</q-expansion-item>
		</q-list>
	</q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useWineFilters } from '../../../stores/wine-filters';

export default defineComponent({
	setup() {
		const wineFiltersStore = useWineFilters();

		return {
			wineFiltersStore,
			searchQuery: ref(''),
			brandQuery: ref(''),
			brandOptions: wineFiltersStore.brandOptions,
			originOptions: wineFiltersStore.originOptions,
			producerOptions: wineFiltersStore.producerOptions,
			countryOptions: wineFiltersStore.countryOptions,
			regionOptions: wineFiltersStore.regionOptions,
			appelationOptions: wineFiltersStore.appelationOptions,
			wineCaseOptions: wineFiltersStore.wineCaseOptions,
			heritageOptions: wineFiltersStore.wineCaseOptions,
			formatOptions: wineFiltersStore.formatOptions,
			investmentGradeOptions: wineFiltersStore.investmentGradeOptions,
			LWINOptions: wineFiltersStore.LWINOptions,
			price: ref(wineFiltersStore.price),
			maturity: ref(wineFiltersStore.maturity),
		};
	},

	watch: {
		brandQuery: {
			handler: function (val) {
				this.brandOptions = this.wineFiltersStore.brandOptions.filter((b) =>
					b.value.includes(val)
				);
			},
		},
	},

	methods: {
		applyMaturityFilter() {
			// console.log(this.wineFiltersStore);
		},

		getYears(monthCount: number) {
			function getPlural(number: number, word: { [key: string]: string }) {
				return (number === 1 && word.one) || word.other;
			}

			var months = { one: 'mo', other: 'mos' },
				years = { one: 'yr', other: 'yrs' },
				m = monthCount % 12,
				y = Math.floor(monthCount / 12);

			if (y == 0) return m + ' ' + getPlural(m, months);
			else return y + ' ' + getPlural(y, years);
		},
	},
});
</script>

<style>
.main-filter-box {
	box-sizing: border-box;

	overflow-y: scroll;

	background: #ffffff;
	/* Primary/Light blue */

	border-radius: 18px;
}
</style>
