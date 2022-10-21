<template>
  <q-page>
		<div class="q-px-md">
			<section class="q-gutter-y-md">
				<q-tabs
					v-model="tab"
					class="text-grey"
					active-color="primary"
					indicator-color="primary"
					align="justify"
					no-caps
				>
					<q-tab name="nfts" label="All NFTs" />
					<q-tab name="releases" label="Releases" />
					<q-tab name="recommended" label="Recommended" />
				</q-tabs>

				<q-separator class="q-ma-none" />
				<q-tab-panels v-model="tab" animated>
					<q-tab-panel class="q-pa-none" name="nfts">
            <AllNFTsTab />
          </q-tab-panel>
					<q-tab-panel class="q-pa-none" name="releases">
            <AllNFTsTab />
          </q-tab-panel>
					<q-tab-panel class="q-pa-none" name="recommended">
            <AllNFTsTab />
          </q-tab-panel>
				</q-tab-panels>
		</section>
		</div>
  </q-page>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import AllNFTsTab from './components/AllNFTsTab.vue';

export default defineComponent({

	components: {
		AllNFTsTab: AllNFTsTab,
	},

  data() {
    return {
      tab: ref('nfts')
    }
  },

})
</script>

<style>

</style>
