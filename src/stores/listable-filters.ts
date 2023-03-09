import { defineStore } from 'pinia';
import { ListableToken } from 'src/shared/models/entities/NFT.model';

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

    type: [] as string[],
    typeOptions: [] as { label: string; value: string }[],

		brand: [] as string[],
		brandOptions: [] as { label: string; value: string }[],

		origin: [] as string[],
		originOptions: [] as { label: string; value: string }[],

		producer: [] as string[],
		producerOptions: [] as { label: string; value: string }[],

		country: [] as string[],
		countryOptions: [] as { label: string; value: string }[],

		region: [] as string[],
		regionOptions: [] as { label: string; value: string }[],

		appellation: [] as string[],
		appellationOptions: [] as { label: string; value: string }[],

		wineCase: [] as string[],
		wineCaseOptions: [] as { label: string; value: string }[],

		heritage: [] as string[],
		heritageOptions: [] as { label: string; value: string }[],

		format: [] as string[],
		formatOptions: [] as { label: string; value: string }[],

		investmentGrade: [] as string[],
		investmentGradeOptions: [] as { label: string; value: string }[],

		LWIN: [] as string[],
		LWINOptions: [] as { label: string; value: string }[],

		filterMode: 'automatic',
		filterKey: 0,

    filteredListableTokens: [] as ListableToken[]
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
    },
    getFilteredListableTokens: (state) => {
      return state.filteredListableTokens
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
		setAllFilters(options: ListableToken[]) {
      options.map(f => {
        if (!this.regionOptions.find((a) => a.value === f.region))
          this.regionOptions.push(
            {
              label: <string> f.region,
              value: <string> f.region
            }
          );
        if (!this.appellationOptions.find((a) => a.value === f.appellation))
          this.appellationOptions.push(
            {
              label: <string> f.appellation,
              value: <string> f.appellation
            }
          );
        if (!this.wineCaseOptions.find((a) => a.value === f.case))
          this.wineCaseOptions.push(
            {
              label: <string> f.case,
              value: <string> f.case
            }
          );
        if (!this.originOptions.find((a) => a.value === f.origin))
          this.originOptions.push(
            {
              label: <string> f.origin,
              value: <string> f.origin
            }
          );
        if (!this.countryOptions.find((a) => a.value === f.productionCountry))
          this.countryOptions.push(
            {
              label: <string> f.productionCountry,
              value: <string> f.productionCountry
            }
          );
        if (!this.typeOptions.find((a) => a.value === f.type))
          this.typeOptions.push(
            {
              label: <string> f.type,
              value: <string> f.type
            }
          );
        if (!this.formatOptions.find((a) => a.value === f.format))
          this.formatOptions.push(
            {
              label: <string> f.format,
              value: <string> f.format
            }
          );
        if (!this.LWINOptions.find((a) => a.value === f.lwin))
          this.LWINOptions.push(
            {
              label: <string> f.lwin,
              value: <string> f.lwin
            }
          );
        if (!this.producerOptions.find((a) => a.value === f.producer))
          this.producerOptions.push(
            {
              label: <string> f.producer,
              value: <string> f.producer
            }
          );
        if (!this.investmentGradeOptions.find((a) => a.value === f.investmentGrade))
          this.investmentGradeOptions.push(
            {
              label: <string> f.investmentGrade,
              value: <string> f.investmentGrade
            }
          );
        if (!this.heritageOptions.find((a) => a.value === f.heritage))
          this.heritageOptions.push(
            {
              label: <string> f.heritage,
              value: <string> f.heritage
            }
          );
        if (!this.brandOptions.find((a) => a.value === f.brand))
          this.brandOptions.push(
            {
              label: <string> f.brand,
              value: <string> f.brand
            }
          );
      })
		},
    filterListableTokens(tokensToFilter: ListableToken[]) {
      const type : null | string[] = this.type.length > 0 ? this.type : null;
      const brand : null | string[] = this.brand.length > 0 ? this.brand : null;
      const producer : null | string[] = this.producer.length > 0 ? this.producer : null;
      const productionCountry : null | string[] = this.country.length > 0 ? this.country : null;
      const region : null | string[] = this.region.length > 0 ? this.region : null;
      const origin : null | string[] = this.origin.length > 0 ? this.origin : null;
      const appellation : null | string[] = this.appellation.length > 0 ? this.appellation : null;
      const wineCase = this.wineCase.length > 0 ? this.wineCase : null;
      const format : null | string[] = this.format.length > 0 ? this.format : null;
      const investmentGrade : null | string[] = this.investmentGrade.length > 0 ? this.investmentGrade : null;
      const lwin : null | string[] = this.LWIN.length > 0 ? this.LWIN : null;
      const heritage : null | string[] = this.heritage.length > 0 ? this.heritage : null;
      
      const filters = {
        ...(!!type ? { type } : {}),
        ...(!!brand ? { brand } : {}),
        ...(!!producer ? { producer } : {}),
        ...(!!productionCountry ? { productionCountry } : {}),
        ...(!!region ? { region } : {}),
        ...(!!origin ? { origin } : {}),
        ...(!!appellation ? { appellation } : {}),
        ...(!!wineCase ? { wineCase } : {}),
        ...(!!format ? { format } : {}),
        ...(!!investmentGrade ? { investmentGrade } : {}),
        ...(!!lwin ? { lwin } : {}),
        ...(!!heritage ? { heritage } : {}),
      }
      this.filterBasedOnKey(filters, tokensToFilter)
    },
    clearAllFilters(originalListOfTokens: ListableToken[]) {
      this.filteredListableTokens = originalListOfTokens;
    },
    filterBasedOnKey(filters: any, tokensToFilter: ListableToken[]) {
      const keys = Object.keys(filters);
      if (keys.length > 1) {
        keys.forEach(f => {
          const key = f as keyof ListableToken;
          this.filteredListableTokens = this.filteredListableTokens.filter(f => !!filters[key].includes(f[`${key}`]))
        })
      } else {
        keys.forEach(f => {
          const key = f as keyof ListableToken;
          this.filteredListableTokens = tokensToFilter.filter(f => !!filters[key].includes(f[`${key}`]))
        })
      }
    }
	},
});
