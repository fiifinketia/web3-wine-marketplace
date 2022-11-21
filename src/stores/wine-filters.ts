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
			const filters = [];
			const keys = Object.keys(state);
			keys.forEach((key) => {
				switch (key) {
					case 'type':
						if (state.type.filter((x) => x !== '').length > 0) {
							filters.push(
								'type[]=' +
									state.type.filter((i: string) => i !== '').join('&type[]=')
							);
						}
						break;
					case 'sortedAtoZ':
						if (state.sortedAtoZ !== '') {
							if (state.sortedAtoZ === 'Ascending') {
								filters.push('sortType=asc');
							} else {
								filters.push('sortType=desc');
							}
						}
						break;
					case 'brand':
						if (state.brand.filter((x) => x !== '').length > 0) {
							filters.push(
								'brand[]=' +
									state.brand.filter((i: string) => i !== '').join('&brand[]=')
							);
						}
						break;
					case 'origin':
						if (state.origin.filter((x) => x !== '').length > 0) {
							filters.push(
								'origin[]=' +
									state.origin
										.filter((i: string) => i !== '')
										.join('&origin[]=')
							);
						}
						break;
					case 'producer':
						if (state.producer.filter((x) => x !== '').length > 0) {
							filters.push(
								'producer[]=' +
									state.producer
										.filter((i: string) => i !== '')
										.join('&producer[]=')
							);
						}
						break;
					case 'country':
						if (state.country.filter((x) => x !== '').length > 0) {
							filters.push(
								'country[]=' +
									state.country
										.filter((i: string) => i !== '')
										.join('&country[]=')
							);
						}
						break;
					case 'region':
						if (state.region.filter((x) => x !== '').length > 0) {
							filters.push(
								'region[]=' +
									state.region
										.filter((i: string) => i !== '')
										.join('&region[]=')
							);
						}
						break;
					case 'appellation':
						if (state.appellation.filter((x) => x !== '').length > 0) {
							filters.push(
								'appellation[]=' +
									state.appellation
										.filter((i: string) => i !== '')
										.join('&appellation[]=')
							);
						}
						break;
					case 'price':
						if (state.price.min !== 0 || state.price.max !== 1000000) {
							filters.push('priceMin=' + state.price.min);
							filters.push('priceMax=' + state.price.max);
						}
						break;
					case 'maturity':
						if (state.maturity.min !== 0 || state.maturity.max !== 100) {
							filters.push('maturityMin=' + state.maturity.min);
							filters.push('maturityMax=' + state.maturity.max);
						}
						break;
					case 'wineCase':
						if (state.wineCase.filter((x) => x !== '').length > 0) {
							filters.push(
								'wineCase[]=' +
									state.wineCase
										.filter((i: string) => i !== '')
										.join('&wineCase[]=')
							);
						}
						break;
					case 'heritage':
						if (state.heritage.filter((x) => x !== '').length > 0) {
							filters.push(
								'heritage[]=' +
									state.heritage
										.filter((i: string) => i !== '')
										.join('&heritage[]=')
							);
						}
						break;
					case 'format':
						if (state.format.filter((x) => x !== '').length > 0) {
							filters.push(
								'format[]=' +
									state.format
										.filter((i: string) => i !== '')
										.join('&format[]=')
							);
						}
						break;
					case 'investmentGrade':
						if (state.investmentGrade.filter((x) => x !== '').length > 0) {
							filters.push(
								'investmentGrade[]=' +
									state.investmentGrade
										.filter((i: string) => i !== '')
										.join('&investmentGrade[]=')
							);
						}
						break;
					case 'LWIN':
						if (state.LWIN.filter((x) => x !== '').length > 0) {
							filters.push(
								'LWIN[]=' +
									state.LWIN.filter((i: string) => i !== '').join('&LWIN[]=')
							);
						}
						break;
				}
			});
			if (state.searchQuery) filters.push('q=' + state.searchQuery);
			return filters.join('&');
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

		}
	},
});
