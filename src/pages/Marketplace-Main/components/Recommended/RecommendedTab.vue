<template>
	<div v-if="!errorPage">
		<div v-for="(group, key) in groupedTokens" :key="'recomm-'+key" class="q-pb-md">
    <q-banner
      class="bg-primary text-white justify-center"
      style="display: grid"
    >
      <q-img
        src="../../../../assets/small-wine.svg"
        class="releases-tab-icons"
      />
      <span class="text-uppercase text-weight-bold">{{
        String(key).split(':')[1]
      }}</span>
      <q-img
        src="../../../../assets/small-bottle.svg"
        class="releases-tab-icons"
      />
    </q-banner>
    <NFTSelections
      :nft-selections="group"
      :is-loading="isLoading"
      :errored-out="!isLoading && group === undefined"
      :section-error="group + ' ' + erroredText"
      @refetch="FetchAllWines()"
    />
  </div>
	</div>
  <ErrorView v-else @retrieve-again="reloadPage()"/>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ListingWithPricingAndImage } from '../../models/Response.models';
import { RetrieveFilteredNFTs } from '../../services/RetrieveTokens';
import NFTSelectionsVue from './NFT-Selections.vue';
import ErrorView from '../ErrorView.vue';
import '../../../../css/Releases/Releases-Selections.css';
import axios from 'axios';
import { useUserStore } from 'src/stores/user-store';
import { customAllSettled } from 'src/utils'

export default defineComponent({
  components: {
    NFTSelections: NFTSelectionsVue,
		ErrorView: ErrorView,
  },
  data: () => {
		const userStore = useUserStore()
    return {
      isLoading: true,
      errorPage: false,
      groupedTokens: {} as {[key: string]: ListingWithPricingAndImage[]| undefined},
      erroredText: 'wines',
      groups: [] as string[],
			totalView: 4,
			userStore
    };
  },
  async mounted() {
		try {
			const suggestionsApiUrl = process.env.GET_ALL_RECOMMENDATIONS
			const { data } = await axios.get(`${suggestionsApiUrl}/${this.userStore.walletAddress}?include_public=true`)
			this.groups = data;
			await this.FetchAllWines();
		} catch (error) {
			this.errorPage = true;
		}
  },

  methods: {
    async FetchAllWines() {
			this.isLoading = true
      const promises = this.groups.map(
        async group => await this.FetchWineByGroup(group)
      );
			const results: {[key: string]: ListingWithPricingAndImage[] | undefined} = {}
      const res = await customAllSettled(promises);
			res.forEach((settled, index) => {
				const group = this.groups[index]
				if(settled.status === 'fulfilled' && settled.value.length > 0) results[group] = settled.value
			})

			this.groupedTokens = results
			this.isLoading = false;
    },
    async FetchWineByGroup(group: string) {
      const [groupName, groupValue] = group.split(':');
      return (
        await RetrieveFilteredNFTs(`${groupName}[]=${groupValue}`)
      ).result.slice(0, 4);
    },
		reloadPage() {
			window.location.reload()
		}
  },
});
</script>

<style></style>
