<template>
  <q-page class="q-mb-sm">
		<div>
			<section class="q-gutter-y-md">
				<q-tabs
					v-model="tab"
					class="text-grey hidden-a-599 profile-tabs"
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
					class="row justify-between items-center text-grey hidden-b-599 q-py-sm q-px-md bg-gradient_blue-green"
					indicator-color="primary"
					no-caps
				>
					<span v-if="$q.screen.width > 350" class="col profile-tab-title">
						{{ CountLabel() }} <span class="profile-tab-count"> {{ countForTab }} </span>
					</span>
					<q-btn-dropdown
						style="height: 42px;"
						no-caps
						color="white"
						text-color="secondary"
						dropdown-icon="none"
						icon-right="app:down_arrow"
						auto-close
						class="col-auto profile-dropdown"
						:label="tabLabel"
					>
						<q-list>
							<q-item clickable @click="tabLabel = 'Listings'; tab = 'listings'">
								<span class="profile-dropdown-selection"> Listings </span>
							</q-item>

							<q-item clickable @click="tabLabel = 'Incoming Offers'; tab = 'incoming'">
								<span class="profile-dropdown-selection"> Incoming Offers </span>
							</q-item>

							<q-item clickable @click="tabLabel = 'Outgoing Offers'; tab= 'outgoing'">
								<span class="profile-dropdown-selection"> Outgoing Offers </span>
							</q-item>

							<q-item clickable @click="tabLabel = 'Trading History'; tab = 'transactions'">
								<span class="profile-dropdown-selection"> Trading History </span>
							</q-item>
						</q-list>
					</q-btn-dropdown>
				</q-tabs>

				<q-separator class="q-ma-none" />
				<q-tab-panels v-model="tab" animated>
					<q-tab-panel class="q-pa-none q-px-sm" name="listings">
						<Listings @listingsAmount="(val) => countForTab = val"/>
					</q-tab-panel>
					<q-tab-panel class="q-pa-none q-px-md" name="incoming">
						<IncomingOffers @incomingAmount="(val) => countForTab = val"/>
					</q-tab-panel>
					<q-tab-panel class="q-pa-none q-px-md" name="outgoing">
						<OutgoingOffers @outgoingAmount="(val) => countForTab = val"/>
					</q-tab-panel>
					<q-tab-panel class="q-pa-none q-px-md" name="transactions">
						<Transactions @transactionsAmount="(val) => countForTab = val"/>
					</q-tab-panel>
				</q-tab-panels>
			</section>
		</div>
	</q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import 'src/css/Profile/shared.css';
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
      tab: ref(queryT || 'listings'),
      tabLabel: ref('Listings'),
			countForTab: 0
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

	methods: {
		CountLabel() {
			switch (this.tabLabel) {
				case 'Listings':
					return 'Listings';
				case 'Incoming Offers':
					return 'Offers';
				case 'Outgoing Offers':
					return 'Offers';
				case 'Trading History':
					return 'TXN'
			}
		}
	}
})
</script>

<style>

</style>