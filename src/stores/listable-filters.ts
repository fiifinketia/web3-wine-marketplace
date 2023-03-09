import { defineStore } from 'pinia';
import { FilterOptionsResponse } from 'src/pages/Marketplace-Main/models/Response.models/FilterOptions.response';

export const useListableFilters = defineStore('listableFilters', {
	state: () => ({
    sortedAtoZ: '',
		sortedAtoZOptions: [
			{
				label: 'Ascending',
				value: 'Ascending',
			},
			{
				label: 'Descending',
				value: 'Descending',
			},
		],

    type: [''],
    typeOptions: [] as { label: string; value: string }[],

		brand: [''],
		brandOptions: [] as { label: string; value: string }[],

		origin: [''],
		originOptions: [] as { label: string; value: string }[],

		producer: [''],
		producerOptions: [] as { label: string; value: string }[],

		country: [''],
		countryOptions: [] as { label: string; value: string }[],

		region: [''],
		regionOptions: [] as { label: string; value: string }[],

		appellation: [''],
		appellationOptions: [] as { label: string; value: string }[],

		wineCase: [''],
		wineCaseOptions: [] as { label: string; value: string }[],

		heritage: [''],
		heritageOptions: [] as { label: string; value: string }[],

		format: [''],
		formatOptions: [] as { label: string; value: string }[],

		investmentGrade: [''],
		investmentGradeOptions: [] as { label: string; value: string }[],

		LWIN: [''],
		LWINOptions: [] as { label: string; value: string }[],

		filterMode: 'automatic',
		filterKey: 0
	}),
	getters: {
		getType: (state) => state.type,
		getSortedAtoZ: (state) => state.sortedAtoZ,
		getBrand: (state) => state.brand,
		getBrandOptions: (state) => state.brandOptions,
		getOrigin: (state) => state.origin,
		getProducer: (state) => state.producer,
		getCountry: (state) => state.country,
		getRegion: (state) => state.region,
		getAppelation: (state) => state.appellation,
    getAllFiltersArray: (state) => {
      const filters = [
				...state.type,
				...state.brand,
				...state.origin,
				...state.producer,
				...state.country,
				...state.region,
				...state.appellation,
				state.sortedAtoZ,
				...state.LWIN,
				...state.wineCase,
				...state.heritage,
				...state.format,
				...state.investmentGrade
			];
      return filters.filter((i) => !!i);
    }
	},
	actions: {
		setType(type: string[]) {
			this.type = type;
		},
		setSortedAtoZ(sortedAtoZ: string) {
			this.sortedAtoZ = sortedAtoZ;
		},
		setBrand(brand: string[]) {
			this.brand = brand;
		},
		setOrigin(origin: string[]) {
			this.origin = origin;
		},
		setProducer(producer: string[]) {
			this.producer = producer;
		},
		setCountry(country: string[]) {
			this.country = country;
		},
		setRegion(region: string[]) {
			this.region = region;
		},
		setAppelation(appellation: string[]) {
			this.appellation = appellation;
		},
		setFilterMode(mode: string) {
			this.filterMode = mode;
		},
		indexFilterKey() {
			this.filterKey = this.filterKey + 1;
		},
		removeFilter(value: string) {
			this.type = this.type.filter((i) => i !== value);
			this.brand = this.brand.filter((i) => i !== value);
			this.origin = this.origin.filter((i) => i !== value);
			this.producer = this.producer.filter((i) => i !== value);
			this.country = this.country.filter((i) => i !== value);
			this.region = this.region.filter((i) => i !== value);
			this.appellation = this.appellation.filter((i) => i !== value);
			this.LWIN = this.LWIN.filter((i) => i !== value);
			this.wineCase = this.wineCase.filter((i) => i !== value);
			this.heritage = this.heritage.filter((i) => i !== value);
			this.format = this.format.filter((i) => i !== value);
			this.investmentGrade = this.investmentGrade.filter((i) => i !== value);
			this.sortedAtoZ =
				value === 'Ascending' || value === 'Descending' ? '' : this.sortedAtoZ;
		},
		removeAllFilters() {
			this.type = [];
			this.brand = [];
			this.origin = [];
			this.producer = [];
			this.country = [];
			this.region = [];
			this.appellation = [];
			this.LWIN = [];
			this.wineCase = [];
			this.heritage = [];
			this.format = [];
			this.investmentGrade = [];
			this.sortedAtoZ = '';
		},
		setAllFilters(options: FilterOptionsResponse) {
			for (const key in options) {
				const value = options[key];
				switch (key) {
					case 'appellation':
						value.forEach((f) => {
							if (!this.appellationOptions.find((a) => a.value === f))
								this.appellationOptions.push({ label: f, value: f });
						});
						break;
					case 'brand':
						value.forEach((f) => {
							if (!this.brandOptions.find((a) => a.value === f))
								this.brandOptions.push({ label: f, value: f });
						});
						break;
					case 'case':
						value.forEach((f) => {
							if (!this.wineCaseOptions.find((a) => a.value === f))
								this.wineCaseOptions.push({ label: f, value: f });
						});
						break;
					case 'country':
						value.forEach((f) => {
							if (!this.countryOptions.find((a) => a.value === f))
								this.countryOptions.push({ label: f, value: f });
						});
						break;
					case 'format':
						value.forEach((f) => {
							if (!this.formatOptions.find((a) => a.value === f))
								this.formatOptions.push({ label: f, value: f });
						});
						break;
					case 'heritage':
						value.forEach((f) => {
							if (!this.heritageOptions.find((a) => a.value === f))
								this.heritageOptions.push({ label: f, value: f });
						});
						break;
					case 'investmentGrade':
						value.forEach((f) => {
							if (!this.investmentGradeOptions.find((a) => a.value === f))
								this.investmentGradeOptions.push({ label: f, value: f });
						});
						break;
					case 'lwin':
						value.forEach((f) => {
							if (!this.LWINOptions.find((a) => a.value === f))
								this.LWINOptions.push({ label: f, value: f });
						});
						break;
					case 'origin':
						value.forEach((f) => {
							if (!this.originOptions.find((a) => a.value === f))
								this.originOptions.push({ label: f, value: f });
						});
						break;
					case 'producer':
						value.forEach((f) => {
							if (!this.producerOptions.find((a) => a.value === f))
								this.producerOptions.push({ label: f, value: f });
						});
						break;
					case 'region':
						value.forEach((f) => {
							if (!this.regionOptions.find((a) => a.value === f))
								this.regionOptions.push({ label: f, value: f });
						});
						break;
					case 'type':
						value.forEach((f) => {
							if (!this.typeOptions.find((a) => a.value === f))
								this.typeOptions.push({ label: f, value: f });
						});
						break;
				}
			}
		},
	},
});
