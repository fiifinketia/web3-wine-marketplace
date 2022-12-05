<template>
<q-page class="column items-center" :class="!loadingRequest || emptyRequest ? 'justify-center' : ''">
  <div v-if="!loadingRequest" class="column items-center">
    <LoadingView
      :loadingText="'Loading your transactions'"
    />
  </div>
  <div v-else class="column items-center">
    <div v-if="!emptyRequest" class="column items-center">
      <TransactionHeaderLg
        v-if="$q.screen.width > 1020"
        :transactionsAmount="transactions.length"
        :selectedTransactionSortKey="transactionSortKey"
        :updatedTransactionBrandFilter="transactionBrandFilter"
        @transactionBrandFilterUpdated="(val) => transactionBrandFilter = val"
        @transactionSortKeySelected="(val) => transactionSortKey = val"
        @fetchTransactionWithBrandFilter="(val) => FetchTransactions(val.sortKey, val.brandFilter)"
      />
      <TransactionHeaderSm
        v-else
        :transactionsAmount="transactions.length"
        :selectedTransactionSortKey="transactionSortKey"
        :updatedTransactionBrandFilter="transactionBrandFilter"
        @transactionBrandFilterUpdated="(val) => transactionBrandFilter = val"
        @transactionSortKeySelected="(val) => transactionSortKey = val"
        @fetchTransactionWithBrandFilter="(val) => FetchTransactions(val.sortKey, val.brandFilter)"
      />
      <div class="profile-main-container column">
        <div class="row q-pa-lg profile-column-name">
          <span class="transaction-column-nft">
            NFT
          </span>
          <span class="transaction-column-price">
            Price
          </span>
          <span 
            v-if="$q.screen.width > 1020"
            class="transaction-column-source"
          >
            From/To
          </span>
          <span class="transaction-column-date">
            Date
          </span>
        </div>
        <q-separator style="background-color: #5e97ec45 !important" inset class="q-mx-xl" />
        <div class="profile-nft-container">
        <div 
          v-for="txn in transactions"
          :key="txn.txnHash"
          class="q-px-lg q-py-md row items-center"
          :class="$q.screen.width < 1265 ? 'q-py-lg' : ''"
        >
          <div class="row items-center transaction-column-nft">
            <span 
              v-if=" $q.screen.width > 600"
              class="transaction-number-text q-mr-md" 
              :style="txn.event == 'Buy' ? 'color: #212131;' : 'color: #3586FF;'"
            > 
                {{ txn.event }} 
            </span>
            <img v-if="$q.screen.width > 1265" :src="txn.image" class="profile-nft-image q-mr-md"/>
            <span class="profile-nft-brand"> {{ txn.brand }}</span>
          </div>
          <div class="row items-center transaction-column-price">
            <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
            <span class="transaction-number-text" :style="txn.event == 'Buy' ? 'color: #212131;' : 'color: #3586FF;'"> {{ txn.price }} </span>
            <q-tooltip 
              v-if="
                $q.screen.width <= 1020
                && $q.screen.width > 600
              "
              anchor="top start" 
              self="center start"
              class="transaction-tooltip-container"
              :offset="[70, 30]"
            >
                <div class="column">
                <div 
                  v-if="$q.screen.width <= 1020"
                  class="row items-center justify-between"
                >
                  <span class="transaction-tooltip-label">
                    From/To
                  </span>
                  <span class="transaction-tooltip-text">
                    {{ ReduceAddress(txn.source) }}
                  </span>
                </div>
              </div>

            </q-tooltip>
          </div>
          <div 
            v-if="$q.screen.width > 1020"
            class="row items-center transaction-column-source"
          >
            <span class="transaction-number-text"> {{ ReduceAddress(txn.source) }} </span>
          </div>
          <div v-if="$q.screen.width > 600" class="transaction-column-date row items-center">
            <span class="transaction-date-text"> {{ txn.date }} </span>
            <q-separator style="background-color: #5e97ec45 !important" inset class="q-mx-sm" vertical/>
            <span class="transaction-time-text"> {{ txn.time }} </span>
          </div>
          <div v-if="$q.screen.width <= 600" class="transaction-column-date column">
            <span class="transaction-date-text"> {{ txn.date }} </span>
            <span class="transaction-time-text"> {{ txn.time }} </span>
          </div>
        </div>
        </div>
      </div>
    </div>
    <div v-else class="column items-center">
      <EmptyView :emptyText="'You have not made any offers yet.'" />
    </div>
  </div>
</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ordersStore } from 'src/stores/orders-store';
import 'src/css/Profile/Component/transaction.css';
import OrderLoading from '../OrderLoading.vue';
import EmptyOrders from '../EmptyOrders.vue';
import TransactionHeaderLg from '../Headers/TransactionHeaderLg.vue';
import TransactionHeaderSm from '../Headers/TransactionHeaderSm.vue';

export default defineComponent({
  components: {
    TransactionHeaderLg: TransactionHeaderLg,
    TransactionHeaderSm: TransactionHeaderSm,
    LoadingView: OrderLoading,
    EmptyView: EmptyOrders
  },
  data() {
    const store = ordersStore();
    return {
      store,
      transactions: store.transactions,
      transactionSortKey: store.getTransactionSortKey,

      transactionBrandFilter: store.getTransactionBrandFilter,

      loadingRequest: false,
      emptyRequest: false
    }
  },
  watch: {
    transactionSortKey: {
      handler: async function (sortKey) {
        this.store.setTransactionSortKey(sortKey);
        if (!this.store.getTransactionBrandFilterStatus) {
          await this.FetchTransactions(sortKey, '');
        } else {
          await this.FetchTransactions(sortKey, this.transactionBrandFilter);
        }
        this.loadingRequest = true
      }
    },
    transactionBrandFilter: {
      handler: function (brandFilter) {
        this.store.setTransactionBrandFilter(brandFilter);
        this.store.setTransactionBrandFilterStatus(false);
      }
    }
  },
  async mounted() {
    const transactionRequestStatus = this.store.getTransactionRequestStatus;
    if (transactionRequestStatus == false) {
      await this.FetchTransactions('', '');
    }
    this.loadingRequest = true;
  },
  methods: {
    ReduceAddress(walletAddress: string) {
      return `${walletAddress.slice(0, 11)}...`
    },
    async FetchTransactions(sortKey: string, brandFilter: string) {
      this.loadingRequest = false;
      // JMG/TODO: Add dynamic address herein
      console.log('here')
      const address = '0xA3873a019aC68824907A3aD99D3e3542376573D0';
      await this.store.setTransactions(address, sortKey, brandFilter);
      console.log(this.store.getTransactions);
      this.transactions = this.store.getTransactions;
      if (this.transactions.length == 0) {
        this.emptyRequest = true 
      }
      this.loadingRequest = true
    }
  }

});

</script>

<style>

</style>
