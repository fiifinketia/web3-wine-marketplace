<template>
	<q-page-container>
		<q-page>
			<div class="q-px-md">
				<section class="q-gutter-y-md">
					<!-- Main box -->
					<q-card
						flat
						bordered
						class="main-filter-box dark-blue-border q-pa-sm"
					>
						<q-card-section>
							<q-input
								v-model="searchQuery"
								outlined
								round
								placeholder="Search"
								type="search"
								color="secondary"
							>
								<template #prepend>
									<q-icon name="search" />
								</template>
							</q-input>
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
										v-model="listedOnly"
										:options="listedOnlyOptions"
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
										v-model="sortAtoZ"
										:options="sortAtoZOptions"
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
										v-model="type"
										:options="typeOptions"
										type="radio"
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
										v-model="brand"
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
										v-model="origin"
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
										v-model="producer"
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
										v-model="country"
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
										v-model="region"
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
										v-model="appelation"
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
								<q-card
									class="dark-blue-border rounded-borders q-my-sm q-pa-sm"
								>
									<q-card-section class="row col-12">
										<div class="col-8">
											<div class="row">
												<div class="col-3">
													<p class="q-pa-none q-ma-xs"> from </p>
													<p class="q-pa-none q-ma-xs"> to </p>
												</div>
												<div class="col-6">
													<p class="q-pa-none q-ma-xs"> <q-icon name="app:price" size="sm"></q-icon> {{ price.min.toFixed(2)}} </p>
													<p class="q-pa-none q-ma-xs"> <q-icon name="app:price" size="sm"></q-icon> {{ price.max.toFixed(2)}} </p>
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
												@click="applyPriceFilter"
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
								<q-card
									class="dark-blue-border rounded-borders q-my-sm q-pa-sm"
								>
									<q-card-section class="row col-12">
										<div class="col-8">
											<div class="row">
												<span class="q-pa-none q-ma-xs"> {{ getYears(maturity.min) || 0}} - {{ getYears(maturity.max) }} </span>
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
										v-model="caseFilter"
										:options="caseOptions"
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
										v-model="format"
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
										v-model="investmentGrade"
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
										v-model="LWIN"
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
										v-model="heritage"
										:options="heritageOptions"
										type="checkbox"
									/>
								</q-list>
							</q-expansion-item>
						</q-list>
					</q-card>
				</section>
			</div>
		</q-page>
	</q-page-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	data() {
		return {
			searchQuery: ref(''),
			listedOnly: ref(''),
			listedOnlyOptions: [
				{ label: 'Yes', value: 'yes' },
				{ label: 'No', value: 'no' },
			],
			sortAtoZ: ref(''),
			sortAtoZOptions: [
				{ label: 'Yes', value: 'yes' },
				{ label: 'No', value: 'no' },
			],
			type: ref(''),
			typeOptions: [
				{ label: 'Red', value: 'red' },
				{ label: 'White', value: 'white' },
			],
			brandQuery: ref(''),
			brand: ref([]),
			brandOptions: [
				{ label: 'Here’s brand number 1', value: 1 },
				{ label: 'An other brans', value: 2 },
				{ label: 'One more company', value: 3 },
				{ label: 'Wine brand', value: 4 },
				{ label: 'Brand name', value: 5 },
				{ label: 'Label', value: 6 },
			],
			origin: ref([]),
			originOptions: [
				{ label: 'Here’s origin number 1', value: 1 },
				{ label: 'An other origin', value: 2 },
				{ label: 'One more origin', value: 3 },
				{ label: 'Wine origin', value: 4 },
				{ label: 'Origin name', value: 5 },
				{ label: 'Origin label', value: 6 },
			],
			producer: ref([]),
			producerOptions: [
				{ label: 'Here’s producer number 1', value: 1 },
				{ label: 'An other producer', value: 2 },
				{ label: 'One more producer', value: 3 },
				{ label: 'Wine producer', value: 4 },
				{ label: 'Producer name', value: 5 },
				{ label: 'Producer label', value: 6 },
			],
			country: ref([]),
			countryOptions: [
				{ label: 'Here’s country number 1', value: 1 },
				{ label: 'An other country', value: 2 },
				{ label: 'One more country', value: 3 },
				{ label: 'Wine country', value: 4 },
				{ label: 'Country name', value: 5 },
				{ label: 'Country label', value: 6 },
			],
			region: ref([]),
			regionOptions: [
				{ label: 'Here’s region number 1', value: 1 },
				{ label: 'An other region', value: 2 },
				{ label: 'One more region', value: 3 },
				{ label: 'Wine region', value: 4 },
				{ label: 'Region name', value: 5 },
				{ label: 'Region label', value: 6 },
			],
			appelation: ref([]),
			appelationOptions: [
				{ label: 'Here’s appelation number 1', value: 1 },
				{ label: 'An other appelation', value: 2 },
				{ label: 'One more appelation', value: 3 },
				{ label: 'Wine appelation', value: 4 },
				{ label: 'Appelation name', value: 5 },
				{ label: 'Appelation label', value: 6 },
			],
			price: ref({ min: 0, max: 100 }),
			maturity: ref({ min: 0, max: 100 }),
			caseFilter: ref([]),
			caseOptions: [
				{ label: 'Here’s case number 1', value: 1 },
				{ label: 'An other case', value: 2 },
				{ label: 'One more case', value: 3 },
				{ label: 'Wine case', value: 4 },
				{ label: 'Case name', value: 5 },
				{ label: 'Case label', value: 6 },
			],
			heritage: ref([]),
			heritageOptions: [
				{ label: 'Here’s heritage number 1', value: 1 },
				{ label: 'An other heritage', value: 2 },
				{ label: 'One more heritage', value: 3 },
				{ label: 'Wine heritage', value: 4 },
				{ label: 'Heritage name', value: 5 },
				{ label: 'Heritage label', value: 6 },
			],
			format: ref([]),
			formatOptions: [
				{ label: 'Here’s format number 1', value: 1 },
				{ label: 'An other format', value: 2 },
				{ label: 'One more format', value: 3 },
				{ label: 'Wine format', value: 4 },
				{ label: 'Format name', value: 5 },
				{ label: 'Format label', value: 6 },
			],
			investmentGrade: ref([]),
			investmentGradeOptions: [
				{ label: 'Here’s investment grade number 1', value: 1 },
				{ label: 'An other investment grade', value: 2 },
				{ label: 'One more investment grade', value: 3 },
				{ label: 'Wine investment grade', value: 4 },
				{ label: 'Investment grade name', value: 5 },
				{ label: 'Investment grade label', value: 6 },
			],
			LWIN: ref([]),
			LWINOptions: [
				{ label: 'Here’s LWIN number 1', value: 1 },
				{ label: 'An other LWIN', value: 2 },
				{ label: 'One more LWIN', value: 3 },
				{ label: 'Wine LWIN', value: 4 },
				{ label: 'LWIN name', value: 5 },
				{ label: 'LWIN label', value: 6 },
			],
		};
	},

	methods: {
		applyPriceFilter() {
			console.log(this.price);
		},

		applyMaturityFilter() {
			console.log(this.maturity);
		},

		getYears(monthCount: number) {
			function getPlural(number: number, word: { [key: string]: string }) {
				return number === 1 && word.one || word.other;
			}

			var months = { one: 'mo', other: 'mos' },
				years = { one: 'yr', other: 'yrs' },
				m = monthCount % 12,
				y = Math.floor(monthCount / 12)

			if(y == 0) return m + ' ' + getPlural(m, months);
			else return y + ' ' + getPlural(y, years);
		},
	}
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
