import { defineStore } from 'pinia';
import { FilterOptionsResponse } from 'src/pages/Marketplace-Main/models/Response.models/FilterOptions.response';

export const useWineFilters = defineStore('wineFilters', {
	state: () => ({
		listedOnly: '',
		listedOnlyOptions: [
			{
				label: 'Yes',
				value: 'Yes',
			},
			{
				label: 'No',
				value: 'No',
			},
		],
		type: [''],
		typeOptions: [] as {label: string, value: string}[],

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
		brand: [''],
		brandOptions: [] as {label: string, value: string}[],
		origin: [''],
		originOptions: [] as {label: string, value: string}[],
		producer: [''],
		producerOptions: [] as {label: string, value: string}[],
		country: [''],
		countryOptions: [] as {label: string, value: string}[],
		region: [''],
		regionOptions: [] as {label: string, value: string}[],
		appellation: [''],
		appellationOptions: [] as {label: string, value: string}[],
		price: {
			min: 0,
			max: 1000000,
		},
		maturity: {
			min: 0,
			max: 100,
		},
		wineCase: [''],
		wineCaseOptions: [] as {label: string, value: string}[],
		heritage: [''],
		heritageOptions: [] as {label: string, value: string}[],
		format: [''],
		formatOptions: [] as {label: string, value: string}[],
		investmentGrade: [''],
		investmentGradeOptions: [] as {label: string, value: string}[],
		LWIN: [''],
		LWINOptions: [] as {label: string, value: string}[],
		searchQuery: '',
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
		getPrice: (state) => state.price,
		getSearchQuery: (state) => state.searchQuery,
		getFiltersQueryParams: (state) => {
			const filters = [
				'type[]=' + state.type.filter((i: string) => i !== '').join(','),
				'sortedAtoZ=' + state.sortedAtoZ,
				'brand[]=' + state.brand.filter((i: string) => i !== '').join(','),
				'origin[]=' + state.origin.filter((i: string) => i !== '').join(','),
				'producer[]=' +
					state.producer.filter((i: string) => i !== '').join(','),
				'country[]=' + state.country.filter((i: string) => i !== '').join(','),
				'region[]=' + state.region.filter((i: string) => i !== '').join(','),
				'appellation[]=' +
					state.appellation.filter((i: string) => i !== '').join(','),
				'price[]=' + state.price.min + ',' + state.price.max,
				'q=' + state.searchQuery,
			];

			const q = filters.join('&');
			return q;
		},
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
				...state.investmentGrade,
				state.listedOnly,
			];
			return filters.filter((i) => i !== '');
		},
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
		setPrice(price: { min: number; max: number }) {
			this.price = price;
		},
		setSearchQuery(searchQuery: string) {
			this.searchQuery = searchQuery;
		},
		removeFilter(value: string) {
			console.log(
				'🚀 ~ file: wine-filters.ts ~ line 215 ~ removeFilter ~ value',
				value
			);
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
			this.listedOnly =
				value === 'Yes' || value === 'No' ? '' : this.listedOnly;
			this.sortedAtoZ =
				value === 'Ascending' || value === 'Descending' ? '' : this.sortedAtoZ;
		},
		setAllFilters(options: FilterOptionsResponse) {
			for (const key in options) {
				const value = options[key];
				switch (key) {
					case 'appellation': 
						value.forEach(f => {
							this.appellationOptions.push({label: f, value: f})
						});
						break;
					case 'brand':
						value.forEach(f => {
							this.brandOptions.push({label: f, value: f})
						})
						break;
					case 'case':
						value.forEach(f => {
							this.wineCaseOptions.push({label: f, value: f})
						})
						break;
					case 'country':
						value.forEach(f => {
							this.countryOptions.push({label: f, value: f})
						})
						break;
					case 'format':
						value.forEach(f => {
							this.formatOptions.push({label: f, value: f})
						})
						break;
					case 'heritage':
						value.forEach(f => {
							this.heritageOptions.push({label: f, value: f})
						})
						break;
					case 'investmentGrade':
						value.forEach(f => {
							this.investmentGradeOptions.push({label: f, value: f})
						})
						break;
					case 'lwin':
						value.forEach(f => {
							this.LWINOptions.push({label: f, value: f})
						})
						break;
					case 'origin':
						value.forEach(f => {
							this.originOptions.push({label: f, value: f})
						})
						break;
					case 'producer':
						value.forEach(f => {
							this.producerOptions.push({label: f, value: f})
						})
						break;
					case 'region':
						value.forEach(f => {
							this.regionOptions.push({label: f, value: f})
						})
						break;
					case 'type':
						value.forEach(f => {
							this.typeOptions.push({label: f, value: f})
						})
						break;
				}
			}

		}
	},
});
