<template>
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
        <q-btn 
          flat
          unelevated
          dense
          no-caps
          align="left"
          padding="0px"
          class="btn--no-hover"
          @click="$q.screen.width > 600 ? ClickBrandAction(txn, 'new tab') : ClickBrandAction(txn, 'nft dialog')"
        >
          <img v-if="$q.screen.width > 1265" :src="txn.image" class="profile-nft-image q-mr-md"/>
          <span class="profile-nft-brand"> {{ txn.brand }}</span>
        </q-btn>
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
                TXN ID
              </span>
              <span class="transaction-tooltip-text">
                {{ ReduceAddress(txn.txnHash) }}
              </span>
            </div>
          </div>
        </q-tooltip>
      </div>
      <div 
        v-if="$q.screen.width > 1020"
        class="row items-center transaction-column-source"
      >
        <span class="transaction-number-text"> {{ ReduceAddress(txn.txnHash) }} </span>
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
    <NFTDialog 
      v-model="showNFTPopup"
      :brand="brand"
      :image="image"
      :txnHash="ReduceAddress(txnHash)"
      :tab="tab"
    />
  </div>
</template>

<script lang="ts">
import { ordersStore } from 'src/stores/orders-store';
import { defineComponent } from 'vue'
import { TransactionResponse } from '../models/response.models';
import NFTDetails from '../Popups/NFTDetails.vue';
export default defineComponent({
  components: {
    NFTDialog: NFTDetails
  },
  data() {
    const store = ordersStore();
    return {
      store,
      transactions: store.transactions,

      showNFTPopup: false,
      image: '',
      brand: '',
      txnHash: '',
      tab: 'transactions'
    }
  },
  methods: {
    ReduceAddress(walletAddress: string) {
      return `${walletAddress.slice(0, 11)}...`
    },
    OpenNFTDialog(txn: TransactionResponse) {
      this.image = txn.image;
      this.brand = txn.brand;
      this.txnHash = txn.txnHash;
      this.showNFTPopup = true;
    },
    OpenMetadataPage(txn: TransactionResponse) {
      const routeData = this.$router.resolve({
        path: '/nft',
        query: {
          id: txn.identifierOrCriteria,
          network: txn.network,
          contractAddress: txn.contractAddress,
        },
      });
      window.open(routeData.href, '_blank');
    },
    ClickBrandAction(txn: TransactionResponse, action: string) {
      if (action == 'new tab') {
        this.OpenMetadataPage(txn);
      } else {
        this.OpenNFTDialog(txn);
      }
    }
  }
})
</script>

<style>

</style>