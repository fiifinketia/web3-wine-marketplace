<template>
  <LoadingView v-if="isLoading" loading-text="Loading Recommendations..." />
  <EmptyView v-else-if="isEmpty" />
  <ErrorView v-else-if="errorPage" @retrieve-again="retrieveAgain()" />
  <div v-else>
    <div
      v-for="(token, index) in recommendations"
      :key="'fields-' + index + recommendations"
      class="q-pb-md"
    >
      <q-banner
        class="bg-primary text-white justify-center"
        style="display: grid"
      >
        <q-img
          src="../../../../assets/small-wine.svg"
          class="releases-tab-icons"
        />
        <span class="text-uppercase text-weight-bold">{{
          token.title + ' Wines'
        }}</span>
        <q-img
          src="../../../../assets/small-bottle.svg"
          class="releases-tab-icons"
        />
      </q-banner>
      <NFTSelections
        :nft-selections="token.nfts"
        :is-loading="isLoading"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import EmptyView from '../EmptyView.vue';
import LoadingView from '../LoadingView.vue';
import { RetrieveFilteredNFTs } from '../../services/RetrieveTokens';
import NFTSelectionsVue from './NFT-Selections.vue';
import ErrorView from '../ErrorView.vue';
import axios from 'axios';
import { useUserStore } from 'src/stores/user-store';
import { RecommendationResponse } from '../../models/Response.models/recommendation.model';
import { Recommendation } from '../../services/Recommendations';
import 'src/css/Releases/ReleasesSelections.css';
import { SetSessionID } from 'src/shared/amplitude-service';

export default defineComponent({
  components: {
    NFTSelections: NFTSelectionsVue,
    ErrorView: ErrorView,
    EmptyView: EmptyView,
    LoadingView: LoadingView,
  },
  data: () => {
    const userStore = useUserStore();
    return {
      isLoading: true,
      isEmpty: false,
      errorPage: false,
      recommendations: [] as Recommendation[],
      erroredText: 'wines',
      totalView: 4,
      userStore,
    };
  },
	watch: {
		'recommendations': {
			handler: function() {
				if(!this.recommendations) {
					this.isEmpty = true;
				}
				else {
					this.isEmpty = false
				}
			},
			deep: true
		}
	},
  async mounted() {
    this.isLoading = true;
    await this.fetchRecommendations();
    SetSessionID('Recommended NFTs Tab Clicked');
    this.isLoading = false;
  },

  methods: {
    async FetchWineByGroup(group: RecommendationResponse) {
      return (
        await RetrieveFilteredNFTs(
          `${group.metadataField}[]=${group.metadataValue}`
        )
      ).result;
    },

    async fetchRecommendations() {
      try {
        const recommendationsApiUrl = process.env.RETRIEVE_RECOMMENDATIONS_URL;
        const { data } = await axios.get<RecommendationResponse[]>(
          `${recommendationsApiUrl}?wallet_address=${this.userStore.walletAddress}`
        );
        // Check if data is empty
        if (data.length === 0) {
          this.isEmpty = true;
          return;
        }
        data.map(async res => {
          // Check if the metadataField is already in the recommendations object
          const nfts = await this.FetchWineByGroup(res);
          if (nfts.length > 0) {
            this.recommendations.push({
              title: res.metadataValue.toUpperCase() + ' ' + res.metadataField.toUpperCase() + ' Wines',
              metadataField: res.metadataField,
              metadataValue: res.metadataValue,
              nfts: nfts.slice(0, this.totalView),
            });
          }
        });
      } catch (error) {
        this.errorPage = true;
      } finally {
        this.isLoading = false;
      }
    },
    async retrieveAgain() {
      this.errorPage = false;
      this.isLoading = true;
      await this.fetchRecommendations();
    },
  },
});
</script>

<style></style>
