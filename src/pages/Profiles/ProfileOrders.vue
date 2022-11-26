<template>
  <q-page class="q-mb-sm">
		<div>
			<section class="q-gutter-y-md">
				<q-tabs
					v-model="tab"
					class="text-grey hidden-a-599"
					active-color="primary"
					indicator-color="primary"
					align="justify"
					no-caps
				>
					<q-tab name="listings" label="Listings" />
					<q-tab name="incoming" label="Incoming Offers" />
					<q-tab name="outgoing" label="Outgoing Offers" />
					<q-tab name="transactions" label="Trading History" />
				</q-tabs>
				<q-tabs
					v-model="tab"
					class="row justify-between text-grey hidden-b-599 q-pa-sm q-px-lg bg-gradient_blue-green"
					indicator-color="primary"
					no-caps
				>
					<span class="col text-white">
						NFTs <span class="text-h6 text-weight-bolder"> {{ 283 }} </span>
					</span>
					<q-btn-dropdown
						no-caps
						color="white"
						text-color="secondary"
						dropdown-icon="none"
						icon-right="app:down_arrow"
						auto-close
						class="col-auto marketplace_tab-drowpdown"
						:label="tabLabel"
					>
						<q-list>
							<q-item clickable @click="tabLabel='Listings'">
								<q-tab name="listings" label="Listings"/>
							</q-item>

							<q-item clickable @click="tabLabel='Incoming Offers'">
								<q-tab name="incoming" label="Incoming Offers"/>
							</q-item>

							<q-item clickable @click="tabLabel = 'Outgoing Offers'">
								<q-tab name="outgoing" label="Outgoing Offers"/>
							</q-item>

							<q-item clickable @click="tabLabel = 'Trading History'">
								<q-tab name="transactions" label="transactions"/>
							</q-item>
						</q-list>
					</q-btn-dropdown>
				</q-tabs>

				<q-separator class="q-ma-none" />
				<q-tab-panels v-model="tab" animated>
					<q-tab-panel class="q-pa-none q-px-md" name="listings">
						<Listings />
					</q-tab-panel>
					<q-tab-panel class="q-pa-none q-px-md" name="incoming">
						<IncomingOffers />
					</q-tab-panel>
					<q-tab-panel class="q-pa-none q-px-md" name="outgoing">
						<OutgoingOffers />
					</q-tab-panel>
					<q-tab-panel class="q-pa-none q-px-md" name="transactions">
						<Transactions />
					</q-tab-panel>
				</q-tab-panels>
			</section>
		</div>
	</q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import IncomingTab from './Tabs/IncomingTab.vue';
import OutgoingTab from './Tabs/OutgoingTab.vue';
import ListingsTab from './Tabs/ListingsTab.vue';
import TransactionsTab from './Tabs/TransactionsTab.vue';

export default defineComponent({
  components: {
		IncomingOffers: IncomingTab,
		OutgoingOffers: OutgoingTab,
    Listings: ListingsTab,
    Transactions: TransactionsTab
	},

  data() {
    const queryT = this.$router.currentRoute.value.query.tab as string;
    return {
      tab: ref(queryT || 'nfts'),
      tabLabel: ref('All NFTs'),
    };
  },

  	watch: {
      $route: {
        handler: function (to, from) {
          if (from && to.query.tab) {
            const tabTo = to.query.tab;
            if (
              tabTo !== from.query.tab &&
              (tabTo === 'listings' || tabTo === 'outgoing' || tabTo === 'incoming' || tabTo === 'transactions')
            ) {
              this.tab = tabTo;
              switch (tabTo) {
                case 'listings':
                  this.tabLabel = 'Listings';
                  break;
                case 'outgoing':
                  this.tabLabel = 'Outgoing Offers';
                  break;
                case 'incoming':
                  this.tabLabel = 'Incoming Offers';
                  break;
                case 'transactions':
                  this.tabLabel = 'Trading History';
                  break;
              }
            }
          }
        },
        immediate: true,
      },
	  },
})
</script>

<style>

</style>