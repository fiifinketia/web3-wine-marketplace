import { defineStore } from 'pinia';

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
		typeOptions: [
			{
				label: 'Red',
				value: 'Red',
			},
			{
				label: 'White',
				value: 'White',
			},
			{
				label: 'Rose',
				value: 'Rose',
			},
			{
				label: 'Sparkling',
				value: 'Sparkling',
			},
			{
				label: 'Dessert',
				value: 'Dessert',
			},
			{
				label: 'Fortified',
				value: 'Fortified',
			},
		],

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
		brandOptions: [
			{ label: 'Here’s brand number 1', value: 'Here’s brand number 1' },
			{ label: 'An other brans', value: 'An other brans' },
		],
		origin: [''],
		originOptions: [
			{ label: 'Here’s origin number 1', value: '1' },
			{ label: 'An other origin', value: '2' },
			{ label: 'One more origin', value: '3' },
			{ label: 'Wine origin', value: '4' },
			{ label: 'Origin name', value: '5' },
			{ label: 'Origin label', value: '6' },
		],
		producer: [''],
		producerOptions: [
			{ label: 'Here’s producer number 1', value: '1' },
			{ label: 'An other producer', value: '2' },
			{ label: 'One more producer', value: '3' },
		],
		country: [''],
		countryOptions: [
			{ label: 'Here’s country number 1', value: '1' },
			{ label: 'An other country', value: '2' },
			{ label: 'One more country', value: '3' },
		],
		region: [''],
		regionOptions: [
			{ label: 'Here’s region number 1', value: '1' },
			{ label: 'An other region', value: '2' },
			{ label: 'One more region', value: '3' },
		],
		appelation: [''],
		appelationOptions: [
			{ label: 'Here’s appelation number 1', value: '1' },
			{ label: 'An other appelation', value: '2' },
			{ label: 'One more appelation', value: '3' },
		],
		price: {
			min: 0,
			max: 1000000,
		},
		maturity: {
			min: 0,
			max: 100,
		},
		wineCase: [''],
		wineCaseOptions: [
			{ label: 'Here’s case number 1', value: '1' },
			{ label: 'An other case', value: '2' },
			{ label: 'One more case', value: '3' },
		],
		heritage: [''],
		heritageOptions: [
			{ label: 'Here’s heritage number 1', value: '1' },
			{ label: 'An other heritage', value: '2' },
			{ label: 'One more heritage', value: '3' },
		],
		format: [''],
		formatOptions: [
			{ label: 'Here’s format number 1', value: '1' },
			{ label: 'An other format', value: '2' },
			{ label: 'One more format', value: '3' },
		],
		investmentGrade: [''],
		investmentGradeOptions: [
			{ label: 'Here’s investment grade number 1', value: '1' },
			{ label: 'An other investment grade', value: '2' },
		],
		LWIN: [''],
		LWINOptions: [
			{ label: 'Here’s LWIN number 1', value: '1' },
			{ label: 'An other LWIN', value: '2' },
			{ label: 'One more LWIN', value: '3' },
		],
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
		getAppelation: (state) => state.appelation,
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
					state.appelation.filter((i: string) => i !== '').join(','),
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
				...state.appelation,
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
			this.appelation = appellation;
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
			this.appelation = this.appelation.filter((i) => i !== value);
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
	},
});
