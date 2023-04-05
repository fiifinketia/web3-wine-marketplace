import { defineStore } from 'pinia';

export const useTourStore = defineStore('tourState', {
  state: () => ({
    completed: false,
  }),

  actions: {
    setCompleted() {
			this.completed = true;
		}
  }
});
