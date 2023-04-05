<template>
  <div v-for="(group, i) in groups" :key="group" class="q-pb-md">
    <q-banner
      class="bg-primary text-white justify-center"
      style="display: grid"
    >
      <q-img
        src="../../../../assets/small-wine.svg"
        class="releases-tab-icons"
      />
      <span class="text-uppercase text-weight-bold">{{
        group.split(':')[1]
      }}</span>
      <q-img
        src="../../../../assets/small-bottle.svg"
        class="releases-tab-icons"
      />
    </q-banner>
    <NFTSelections
      :nft-selections="groupedTokens[i]"
      :is-loading="isLoading"
      :errored-out="!isLoading && groupedTokens[i].length === 0"
      :section-error="group + ' ' + erroredText"
      @refetch="FetchAllWines()"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ListingWithPricingAndImage } from '../../models/Response.models';
import { RetrieveFilteredNFTs } from '../../services/RetrieveTokens';
import NFTSelectionsVue from './NFT-Selections.vue';
import '../../../../css/Releases/Releases-Selections.css';

// amplitude
// import * as amplitude from '@amplitude/analytics-node';
import * as amplitude from '@amplitude/analytics-browser';

// client-side connection
// amplitude.init('286edfa9633aaf8f494a67e9e5d4d2a7');
// API token tMRL7vva59X5AMUGvEb-2SU4X_KAnW8m
// how to track a specific user

amplitude.init('286edfa9633aaf8f494a67e9e5d4d2a7', undefined, {
  defaultTracking: {
    sessions: true,
    pageViews: true,
  },
});

amplitude.setSessionId(Date.now());

// user properties
// const identifyEvent = new amplitude.Identify();
// identifyEvent.add('marketplace visit count', 1);
// amplitude.identify(identifyEvent);

amplitude.track('Recommended NFTs Tab Clicked');

export default defineComponent({
  components: {
    NFTSelections: NFTSelectionsVue,
  },
  data: () => {
    return {
      isLoading: true,
      groupedTokens: new Array<ListingWithPricingAndImage[]>(),
      erroredText: 'wines',
      groups: [
        'type:Red',
        'productionCountry:Spain',
        'region:Tuscany',
        'type:Champagne',
        'productionCountry:Italy',
        'region:Napa Valley',
        'region:Bordeaux',
        'productionCountry:France',
        'type:Sparkling',
      ],
    };
  },
  async mounted() {
    await this.FetchAllWines();
  },

  methods: {
    async FetchAllWines() {
      const promises = this.groups.map(
        async group => await this.FetchWineByGroup(group)
      );
      try {
        this.groupedTokens = await Promise.all(promises);
      } catch {
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },
    async FetchWineByGroup(group: string) {
      const [groupName, groupValue] = group.split(':');
      return (
        await RetrieveFilteredNFTs(`${groupName}[]=${groupValue}`)
      ).result.slice(0, 4);
    },
  },
});
</script>

<style></style>
