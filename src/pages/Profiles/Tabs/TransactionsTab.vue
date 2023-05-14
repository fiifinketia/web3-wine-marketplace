<template>
  <q-page
    class="column items-center"
    :class="loadingRequest || emptyRequest ? 'justify-center' : ''"
    style="flex-wrap: nowrap"
  >
    <div v-if="loadingRequest" class="column items-center">
      <LoadingView :loading-text="'Loading your transactions'" />
    </div>
    <ErrorView
      v-else-if="!!errorOverall"
      :tab-error="'trading'"
      @reload-tab="FetchTransactions(transactionSortKey, transactionBrandFilter)"
    />
    <div v-else class="column items-center full-width q-mx-none profile-page-container">
      <div
        v-if="!emptyRequest"
        class="column items-center"
        :class="$q.screen.width > 600 ? '' : 'full-width'"
      >
        <TransactionHeaderLg
          v-if="$q.screen.width > 1020"
          :transactions-amount="transactions.length"
          :selected-transaction-sort-key="transactionSortKey"
          :updated-transaction-brand-filter="transactionBrandFilter"
          :brand-searched="brandSearched"
          @transaction-brand-filter-updated="
            val => (transactionBrandFilter = val)
          "
          @transaction-sort-key-selected="val => (transactionSortKey = val)"
          @fetch-transaction-with-brand-filter="
            val => FetchTransactions(val.sortKey, val.brandFilter)
          "
          @reset-transactions-search="val => FetchTransactions(val, '')"
        />
        <TransactionHeaderSm
          v-else
          :transactions-amount="transactions.length"
          :selected-transaction-sort-key="transactionSortKey"
          :updated-transaction-brand-filter="transactionBrandFilter"
          :brand-searched="brandSearched"
          @transaction-brand-filter-updated="
            val => (transactionBrandFilter = val)
          "
          @transaction-sort-key-selected="val => (transactionSortKey = val)"
          @fetch-transaction-with-brand-filter="
            val => FetchTransactions(val.sortKey, val.brandFilter)
          "
          @reset-transactions-search="val => FetchTransactions(val, '')"
        />
        <div v-if="$q.screen.width > 600" class="profile-main-container column">
          <TransactionsColumns />
          <q-separator
            style="background-color: #5e97ec45 !important"
            inset
            class="q-mx-xl"
          />
          <TransactionsRows />
        </div>
        <div v-else class="full-width" style="width: 100vw">
          <TransactionsColumns />
          <TransactionsRows />
        </div>
        <ErrorDialog
          v-model="openErrorDialog"
          :error-type="errorType"
          :error-title="errorTitle"
          :error-message="errorMessage"
        />
      </div>
      <div v-else class="column items-center">
        <EmptyView :empty-text="'You have not made any offers yet.'" />
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
import LoadingError from '../LoadingError.vue';
import TransactionHeaderLg from '../Headers/TransactionHeaderLg.vue';
import TransactionHeaderSm from '../Headers/TransactionHeaderSm.vue';
import { useUserStore } from 'src/stores/user-store';
import ProfileErrors from '../../SharedPopups/ProfileErrors.vue';
import TransactionsColumns from '../Columns/TransactionsColumns.vue';
import TransactionsRows from '../Rows/TransactionsRows.vue';
import { mapState } from 'pinia';

export default defineComponent({
  components: {
    TransactionHeaderLg: TransactionHeaderLg,
    TransactionHeaderSm: TransactionHeaderSm,
    LoadingView: OrderLoading,
    EmptyView: EmptyOrders,
    ErrorView: LoadingError,
    ErrorDialog: ProfileErrors,
    TransactionsColumns: TransactionsColumns,
    TransactionsRows: TransactionsRows,
  },
  emits: ['transactionsAmount'],
  data() {
    const store = ordersStore();
    const userStore = useUserStore();
    return {
      store,
      userStore,
      transactions: store.transactions,
      transactionSortKey: store.getTransactionSortKey,

      transactionBrandFilter: store.getTransactionBrandFilter,

      loadingRequest: false,
      emptyRequest: false,

      errorOverall: false,
      errorType: '',
      errorTitle: '',
      errorMessage: '',
      openErrorDialog: false
    };
  },
  computed: {
    ...mapState(ordersStore, {
      brandSearched: store => store.getTransactionBrandFilterStatus,
      tabKey: store => store.getTransactionTabKey
    }),
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
      },
    },
    transactionBrandFilter: {
      handler: function (brandFilter) {
        this.store.setTransactionBrandFilter(brandFilter);
      },
    },
    tabKey: {
      async handler() {
        await this.FetchTransactions('', '');
      }
    }
  },
  async mounted() {
    const transactionRequestStatus = this.store.getTransactionRequestStatus;
    if (transactionRequestStatus == false) {
      await this.FetchTransactions('', '');
    } else {
      this.$emit('transactionsAmount', this.transactions.length);
      this.CheckForEmptyRequest();
      this.loadingRequest = false;
    }
  },
  methods: {
    ReduceAddress(walletAddress: string) {
      return `${walletAddress.slice(0, 11)}...`;
    },
    async FetchTransactions(sortKey: string, brandFilter: string) {
      this.loadingRequest = true;
      const address = this.userStore.walletAddress;
      try {
        await this.store.setTransactions(address, sortKey, brandFilter);
        if (
          this.store.getTransactions.length == 0 &&
          this.store.transactionBrandFilterStatus == true
        ) {
          this.HandleMissingBrand();
        } else {
          this.transactions = this.store.getTransactions;
          this.$emit('transactionsAmount', this.transactions.length);
          this.CheckForEmptyRequest();
        }
        this.errorOverall = false;
      } catch {
        this.errorOverall = true;
      } finally {
        this.loadingRequest = false;
      }
    },
    HandleError(err: {
      errorType: string;
      errorTitle: string;
      errorMessage: string;
    }) {
      this.errorType = err.errorType;
      this.errorTitle = err.errorTitle;
      this.errorMessage = err.errorMessage;
      this.openErrorDialog = true;
      setTimeout(() => {
        this.openErrorDialog = false;
      }, 2000);
    },
    CheckForEmptyRequest() {
      if (this.transactions.length == 0) {
        this.emptyRequest = true;
      }
    },
    HandleMissingBrand() {
      this.store.resetTransactions();
      this.transactionBrandFilter = this.store.transactionBrandFilter;
      this.HandleError({
        errorType: 'filter',
        errorTitle: 'Unable to fetch your transactions',
        errorMessage: 'There are no transactions under your current filter',
      });
    },
  },
});
</script>

<style></style>
