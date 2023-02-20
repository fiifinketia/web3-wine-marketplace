<template>
	<!-- Main box -->
	<q-scroll-area
		bordered
		class="main-filter-box dark-blue-border q-px-md"
		style="height: 85%; max-width: 100%; max-height: calc(100% - 200px)"
		:thumb-style="{
			right: '4px',
			borderRadius: '5px',
			backgroundColor: '#027be3',
			width: '5px',
			opacity: '0.75',
		}"
		:bar-style="{
			right: '2px',
			borderRadius: '9px',
			backgroundColor: '#027be3',
			width: '9px',
			opacity: '0.2',
		}"
	>
		<q-card flat>
			<q-card-section
				class="hidden-a-1023 row justify-between q-px-none q-pt-md q-pb-sm q-gutter-xs"
			>
				<q-input
					v-model="searchQuery"
					outlined
					round
					placeholder="Search"
					type="search"
					color="primary"
					class="col-9 sidebar-search sidebar-search-stretch"
					dense
				>
					<template #prepend>
						<q-icon name="search" />
					</template>
				</q-input>
				<q-btn
					class="sidebar-go"
					color="primary"
					outlined
					label="GO"
					dense
					@click="wineFiltersStore.searchQuery = searchQuery"
				/>
			</q-card-section>
			<q-list class="rounded-borders">
				<!-- Listed Only filter -->
				<q-expansion-item
					label="Listed Only"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
				>
					<q-list class="dark-blue-border rounded-borders q-my-sm">
						<q-option-group
							v-model="wineFiltersStore.listedOnly"
							:options="wineFiltersStore.listedOnlyOptions"
							type="radio"
							class="sidebar-options"
						/>
					</q-list>
				</q-expansion-item>

				<!-- Sort A to Z filter -->
				<q-expansion-item
					label="Sort A-Z"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
				>
					<q-list class="dark-blue-border rounded-borders q-my-sm">
						<q-option-group
							v-model="wineFiltersStore.sortedAtoZ"
							:options="wineFiltersStore.sortedAtoZOptions"
							type="radio"
							class="sidebar-options"
						/>
					</q-list>
				</q-expansion-item>

				<!-- Type filter -->
				<q-expansion-item
					label="Type"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
				>
					<q-list class="dark-blue-border rounded-borders q-my-sm">
						<q-option-group
							v-model="wineFiltersStore.type"
							:options="wineFiltersStore.typeOptions"
							type="checkbox"
							class="sidebar-options"
						/>
					</q-list>
				</q-expansion-item>

				<!-- brand filter -->
				<q-expansion-item
					label="Brand"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
				>
					<q-input
						v-model="brandQuery"
						outlined
						dense
						round
						placeholder="Search"
						type="search"
						class="sidebar-search"
					>
						<template #prepend>
							<q-icon name="search" />
						</template>
					</q-input>
					<q-list class="dark-blue-border rounded-borders q-my-sm">
						<q-option-group
							v-model="wineFiltersStore.brand"
							:options="brandOptions"
							type="checkbox"
							:style="{ maxHeight: '200px', overflowY: 'scroll' }"
							class="sidebar-options"
						/>
					</q-list>
				</q-expansion-item>

				<!-- Origin Filter -->
				<q-expansion-item
					label="Origin"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
				>
					<q-input
						v-model="originQuery"
						outlined
						dense
						round
						placeholder="Search"
						type="search"
						class="sidebar-search"
					>
						<template #prepend>
							<q-icon name="search" />
						</template>
					</q-input>
					<q-list class="dark-blue-border rounded-borders q-my-sm">
						<q-option-group
							v-model="wineFiltersStore.origin"
							:options="originOptions"
							type="checkbox"
							:style="{ maxHeight: '200px', overflowY: 'scroll' }"
							class="sidebar-options"
						/>
					</q-list>
				</q-expansion-item>

				<!-- Producer Filter -->
				<q-expansion-item
					label="Producer"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
				>
					<q-input
						v-model="producerQuery"
						outlined
						dense
						round
						placeholder="Search"
						type="search"
						class="sidebar-search"
					>
						<template #prepend>
							<q-icon name="search" />
						</template>
					</q-input>
					<q-list class="dark-blue-border rounded-borders q-my-sm">
						<q-option-group
							v-model="wineFiltersStore.producer"
							:options="producerOptions"
							type="checkbox"
							:style="{ maxHeight: '200px', overflowY: 'scroll' }"
							class="sidebar-options"
						/>
					</q-list>
				</q-expansion-item>

				<!-- Country Filter -->
				<q-expansion-item
					label="Country"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
				>
					<q-input
						v-model="countryQuery"
						outlined
						dense
						round
						placeholder="Search"
						type="search"
						class="sidebar-search"
					>
						<template #prepend>
							<q-icon name="search" />
						</template>
					</q-input>
					<q-list class="dark-blue-border rounded-borders q-my-sm">
						<q-option-group
							v-model="wineFiltersStore.country"
							:options="countryOptions"
							type="checkbox"
							:style="{ maxHeight: '200px', overflowY: 'scroll' }"
							class="sidebar-options"
						/>
					</q-list>
				</q-expansion-item>

				<!-- Region Filter -->
				<q-expansion-item
					label="Region"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
				>
					<q-input
						v-model="regionQuery"
						outlined
						dense
						round
						placeholder="Search"
						type="search"
						class="sidebar-search"
					>
						<template #prepend>
							<q-icon name="search" />
						</template>
					</q-input>
					<q-list class="dark-blue-border rounded-borders q-my-sm">
						<q-option-group
							v-model="wineFiltersStore.region"
							:options="regionOptions"
							type="checkbox"
							:style="{ maxHeight: '200px', overflowY: 'scroll' }"
							class="sidebar-options"
						/>
					</q-list>
				</q-expansion-item>

				<!-- Appellation Filter -->
				<q-expansion-item
					label="Appelation"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
				>
					<q-input
						v-model="appellationQuery"
						outlined
						dense
						round
						placeholder="Search"
						type="search"
						class="sidebar-search"
					>
						<template #prepend>
							<q-icon name="search" />
						</template>
					</q-input>
					<q-list class="dark-blue-border rounded-borders q-my-sm">
						<q-option-group
							v-model="wineFiltersStore.appellation"
							:options="appellationOptions"
							type="checkbox"
							:style="{ maxHeight: '200px', overflowY: 'scroll' }"
							class="sidebar-options"
						/>
					</q-list>
				</q-expansion-item>

				<!-- Price Filter edit-->
				<q-expansion-item
					label="Price"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
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
								id="filter_price"
								v-model="price"
								thumb-color="white"
								class="col-8 q-px-lg"
								:step="1"
								:min="0"
								:max="100"
								:debounce="500"
							/>
						</q-item-section>
					</q-card>
				</q-expansion-item>

				<!-- Maturity Filter edit-->
				<q-expansion-item
					label="Maturity"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
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
								id="filter_maturity"
								v-model="maturity"
								thumb-color="white"
								class="col-8 q-px-lg"
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
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
				>
					<q-input
						v-model="caseQuery"
						outlined
						dense
						round
						placeholder="Search"
						type="search"
						class="sidebar-search"
					>
						<template #prepend>
							<q-icon name="search" />
						</template>
					</q-input>
					<q-list class="dark-blue-border rounded-borders q-my-sm">
						<q-option-group
							v-model="wineFiltersStore.wineCase"
							:options="caseOptions"
							type="checkbox"
							:style="{ maxHeight: '200px', overflowY: 'scroll' }"
							class="sidebar-options"
						/>
					</q-list>
				</q-expansion-item>

				<!-- Format Filter -->
				<q-expansion-item
					label="Format"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
				>
					<q-input
						v-model="formatQuery"
						outlined
						dense
						round
						placeholder="Search"
						type="search"
						class="sidebar-search"
					>
						<template #prepend>
							<q-icon name="search" />
						</template>
					</q-input>
					<q-list class="dark-blue-border rounded-borders q-my-sm">
						<q-option-group
							v-model="wineFiltersStore.format"
							:options="formatOptions"
							type="checkbox"
							:style="{ maxHeight: '200px', overflowY: 'scroll' }"
							class="sidebar-options"
						/>
					</q-list>
				</q-expansion-item>

				<!-- Investment Grade Filter -->
				<q-expansion-item
					label="Investment Grade"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
				>
					<q-input
						v-model="investmentGradeQuery"
						outlined
						dense
						round
						placeholder="Search"
						type="search"
						class="sidebar-search"
					>
						<template #prepend>
							<q-icon name="search" />
						</template>
					</q-input>
					<q-list class="dark-blue-border rounded-borders q-my-sm">
						<q-option-group
							v-model="wineFiltersStore.investmentGrade"
							:options="investmentGradeOptions"
							type="checkbox"
							:style="{ maxHeight: '200px', overflowY: 'scroll' }"
							class="sidebar-options"
						/>
					</q-list>
				</q-expansion-item>

				<!-- LWIN Filter -->
				<q-expansion-item
					label="LWIN"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
				>
					<q-input
						v-model="lwinQuery"
						outlined
						dense
						round
						placeholder="Search"
						type="search"
						class="sidebar-search"
					>
						<template #prepend>
							<q-icon name="search" />
						</template>
					</q-input>
					<q-list class="dark-blue-border rounded-borders q-my-sm">
						<q-option-group
							v-model="wineFiltersStore.LWIN"
							:options="LWINOptions"
							type="checkbox"
							:style="{ maxHeight: '200px', overflowY: 'scroll' }"
							class="sidebar-options"
						/>
					</q-list>
				</q-expansion-item>

				<!-- Heritage Filter -->
				<q-expansion-item
					label="Heritage"
					header-class="dark-blue-border rounded-borders q-my-sm sidebar-title"
				>
					<q-input
						v-model="heritageQuery"
						outlined
						dense
						round
						placeholder="Search"
						type="search"
						class="sidebar-search"
					>
						<template #prepend>
							<q-icon name="search" />
						</template>
					</q-input>
					<q-list class="dark-blue-border rounded-borders q-my-sm">
						<q-option-group
							v-model="wineFiltersStore.heritage"
							:options="heritageOptions"
							type="checkbox"
							:style="{ maxHeight: '200px', overflowY: 'scroll' }"
							class="sidebar-options"
						/>
					</q-list>
				</q-expansion-item>
			</q-list>
		</q-card>
	</q-scroll-area>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useWineFilters } from '../../../stores/wine-filters';
import { RetrieveFilterDetails } from '../services/FilterOptions';
import 'src/css/Marketplace/sidebar.css'

export default defineComponent({
	setup() {
		const wineFiltersStore = useWineFilters();

		return {
			wineFiltersStore,
			searchQuery: ref(''),
			brandQuery: ref(''),
			regionQuery: ref(''),
			producerQuery: ref(''),
			vintageQuery: ref(''),
			formatQuery: ref(''),
			investmentGradeQuery: ref(''),
			appellationQuery: ref(''),
			lwinQuery: ref(''),
			heritageQuery: ref(''),
			caseQuery: ref(''),
			originQuery: ref(''),
			countryQuery: ref(''),
			brandOptions: wineFiltersStore.brandOptions,
			regionOptions: wineFiltersStore.regionOptions,
			producerOptions: wineFiltersStore.producerOptions,
			formatOptions: wineFiltersStore.formatOptions,
			investmentGradeOptions: wineFiltersStore.investmentGradeOptions,
			appellationOptions: wineFiltersStore.appellationOptions,
			LWINOptions: wineFiltersStore.LWINOptions,
			heritageOptions: wineFiltersStore.heritageOptions,
			caseOptions: wineFiltersStore.wineCaseOptions,
			originOptions: wineFiltersStore.originOptions,
			countryOptions: wineFiltersStore.countryOptions,
			price: ref(wineFiltersStore.price),
			maturity: ref(wineFiltersStore.maturity),
		};
	},

	watch: {
		brandQuery: {
			handler: function (val) {
				this.brandOptions = this.wineFiltersStore.brandOptions.filter((b) =>
					b.value.toLowerCase().includes(val.toLowerCase())
				);
			},
		},
		regionQuery: {
			handler: function (val) {
				this.regionOptions = this.wineFiltersStore.regionOptions.filter((b) =>
					b.value.toLowerCase().includes(val.toLowerCase())
				);
			},
		},
		producerQuery: {
			handler: function (val) {
				this.producerOptions = this.wineFiltersStore.producerOptions.filter(
					(b) => b.value.toLowerCase().includes(val.toLowerCase())
				);
			},
		},
		originQuery: {
			handler: function (val) {
				this.originOptions = this.wineFiltersStore.originOptions.filter((b) =>
					b.value.toLowerCase().includes(val.toLowerCase())
				);
			},
		},
		appellationQuery: {
			handler: function (val) {
				this.appellationOptions =
					this.wineFiltersStore.appellationOptions.filter((b) =>
						b.value.toLowerCase().includes(val.toLowerCase())
					);
			},
		},
		countryQuery: {
			handler: function (val) {
				this.countryOptions = this.wineFiltersStore.countryOptions.filter((b) =>
					b.value.toLowerCase().includes(val.toLowerCase())
				);
			},
		},
		formatQuery: {
			handler: function (val) {
				this.formatOptions = this.wineFiltersStore.formatOptions.filter((b) =>
					b.value.toLowerCase().includes(val.toLowerCase())
				);
			},
		},
		investmentGradeQuery: {
			handler: function (val) {
				this.investmentGradeOptions =
					this.wineFiltersStore.investmentGradeOptions.filter((b) =>
						b.value.toLowerCase().includes(val.toLowerCase())
					);
			},
		},
		lwinQuery: {
			handler: function (val) {
				this.LWINOptions = this.wineFiltersStore.LWINOptions.filter((b) =>
					b.value.toLowerCase().includes(val.toLowerCase())
				);
			},
		},
		heritageQuery: {
			handler: function (val) {
				this.heritageOptions = this.wineFiltersStore.heritageOptions.filter(
					(b) => b.value.toLowerCase().includes(val.toLowerCase())
				);
			},
		},
		caseQuery: {
			handler: function (val) {
				this.caseOptions = this.wineFiltersStore.wineCaseOptions.filter((b) =>
					b.value.toLowerCase().includes(val.toLowerCase())
				);
			},
		},
	},

	async mounted() {
		const filterOptions = await RetrieveFilterDetails();
		this.wineFiltersStore.setAllFilters(filterOptions);
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

.main-filter-box::-webkit-scrollbar {
	display: none;
}
#filter_price .q-slider__thumb,
#filter_maturity .q-slider__thumb {
	box-shadow: inset 0px 0px 3px 0px rgb(0 0 0 / 20%);
	border-radius: 100px;
}
</style>
