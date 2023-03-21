import { defineStore } from 'pinia';

export const useGeneralSearch = defineStore('generalSearchFilter', {
  state: () => ({
    generalSearch: '',
    generalSearchKey: 0,
  }),
  getters: {},
  actions: {
    setGeneralSearch(search: string) {
      this.generalSearch = search;
    },
    indexGeneralSearchKey() {
      this.generalSearchKey = this.generalSearchKey + 1;
    },
  },
});
