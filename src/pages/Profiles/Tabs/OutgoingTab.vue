<template>
<q-page class="column items-center" :class="!loadingRequest || emptyRequest ? 'justify-center' : ''">
  <div v-if="!loadingRequest" class="column items-center">
    <LoadingView
      :loadingText="'Loading your outgoing offers'"
    />
  </div>
  <div v-else class="column items-center">
    <div v-if="!emptyRequest" class="column items-center">
      <OutgoingHeaderLg
        v-if="$q.screen.width > 1020"
        :outgoingAmount="outgoingOffers.length"
        :selectedOutgoingSortKey="outgoingSortKey"
        :updatedOutgoingBrandFilter="outgoingBrandFilter"
        @outgoingBrandFilterUpdated="(val) => outgoingBrandFilter = val"
        @outgoingSortKeySelected="(val) => outgoingSortKey = val"
        @fetchOutgoingWithBrandFilter="(val) => FetchOutgoingOffers(val.sortKey, val.brandFilter)"
      />
      <OutgoingHeaderSm
        v-else
        :outgoingAmount="outgoingOffers.length"
        :selectedOutgoingSortKey="outgoingSortKey"
        :updatedOutgoingBrandFilter="outgoingBrandFilter"
        @outgoingBrandFilterUpdated="(val) => outgoingBrandFilter = val"
        @outgoingSortKeySelected="(val) => outgoingSortKey = val"
        @fetchOutgoingWithBrandFilter="(val) => FetchOutgoingOffers(val.sortKey, val.brandFilter)"
      />
      <div class="profile-main-container column">
        <div class="row q-pa-lg profile-column-name">
          <span class="outgoing-column-nft">
            NFT
          </span>
          <span 
            v-if="$q.screen.width > 600"
            class="outgoing-column-own-offer"
          >
            Your offer
          </span>
          <span 
            v-if="$q.screen.width <= 600"
            class="outgoing-column-own-offer"
          >
            Yours
          </span>
          <span 
            v-if="$q.screen.width > 600"
            class="outgoing-column-highest-offer"
          >
            Highest Offer
          </span>
          <span 
            v-if="$q.screen.width > 1265"
            class="outgoing-column-expire"
          >
            Exp On
          </span>
          <span class="outgoing-column-action">
            Action
          </span>
        </div>
        <q-separator style="background-color: #5e97ec45 !important" inset class="q-mx-xl" />
        <div class="profile-nft-container">
        <div 
          v-for="offer in outgoingOffers"
          :key="offer.orderHash"
          class="q-px-lg q-py-md row items-center"
        >
          <div class="row items-center outgoing-column-nft">
            <img v-if="$q.screen.width > 1265" :src="offer.image" class="profile-nft-image q-mr-md"/>
            <span class="profile-nft-brand"> {{ offer.brand }}</span>
          </div>
          <div 
            v-if="$q.screen.width > 600"
            class="row items-center outgoing-column-own-offer"
          >
            <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
            <span class="profile-nft-number"> {{ offer.offer }} </span>
            <q-tooltip 
              v-if="
                $q.screen.width <= 1265
                && $q.screen.width > 600
              "
              anchor="top start" 
              self="center start"
              class="outgoing-tooltip-container"
              :offset="[70, 30]"
            >
              <div class="column">
                <div class="row items-center justify-between">
                  <span class="outgoing-tooltip-label">
                    Expiration On
                  </span>
                  <span class="outgoing-tooltip-expire q-pl-xs"> {{ offer.endTime }} </span>
                </div>
              </div>
            </q-tooltip>
          </div>
          <div 
            v-if="$q.screen.width > 600"
            class="row items-center outgoing-column-highest-offer"
          >
            <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
            <span class="profile-nft-number"> {{ !!offer.highestOffer ? offer.highestOffer : '0.00' }} </span>
          </div>
          <div
            v-if="$q.screen.width > 1265"
            class="row items-center outgoing-column-expire"
          >
            <span class="profile-nft-number-highlight"> {{ offer.endTime }} </span>
          </div>
          <div 
            v-if="$q.screen.width <= 600"
            class="outgoing-column-own-offer column"
          >
            <div class="row q-pb-xs">
              <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
              <span class="profile-nft-number"> {{ offer.offer }} </span>
            </div>
            <span class="profile-nft-number-highlight"> {{ offer.endTime }} </span>
          </div>
          <div style="margin-left: -5px;" class="row items-center outgoing-column-action">
            <q-btn
              flat
              unelevated
              dense
              @click="OpenDeleteDialog(offer)"
            >
              <img src="../../../assets/trash.svg" />
            </q-btn>
            <q-btn
              flat
              unelevated
              dense
              @click="OpenEditDialog(offer)"
            >
              <img src="../../../assets/edit.svg" />
            </q-btn>
          </div>
          <OutgoingDialogEdit
            v-model="openEditDialog"
            :brand="singleOffer.brand"
            :highestOffer="singleOffer.highestOffer"
            :highestOfferCurrency="singleOffer.highestOfferCurrency"
            :image="singleOffer.image"
            :network="singleOffer.network"
            :orderHash="singleOffer.orderHash"
            :smartContractAddress="singleOffer.contractAddress"
            :tokenID="singleOffer.identifierOrCriteria"
            @outgoing-edit-close="openEditDialog = false"
            @remove-offer="(val) => RemoveRow(val)"
          />
          <OutgoingDialogDelete
            v-model="openDeleteDialog"
            :orderHash="singleOffer.orderHash"
            @outgoing-delete-close="openDeleteDialog = false"
            @remove-offer="(val) => RemoveRow(val)"
          />
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
import 'src/css/Profile/Component/outgoing.css';
import OutgoingHeaderLg from '../Headers/OutgoingHeaderLg.vue';
import OutgoingHeaderSm from '../Headers/OutgoingHeaderSm.vue';
import OrderLoading from '../OrderLoading.vue';
import EmptyOrders from '../EmptyOrders.vue';
import { useUserStore } from 'src/stores/user-store';
import OutgoingEdit from '../Popups/OutgoingEdit.vue';
import OutgoingDelete from '../Popups/OutgoingDelete.vue';
import { OutgoingOffersResponse } from '../models/response.models';

export default defineComponent({
  components: {
    OutgoingHeaderLg: OutgoingHeaderLg,
    OutgoingHeaderSm: OutgoingHeaderSm,
    LoadingView: OrderLoading,
    EmptyView: EmptyOrders,
    OutgoingDialogEdit: OutgoingEdit,
    OutgoingDialogDelete: OutgoingDelete
  },
  data() {
    const store = ordersStore();
    const userStore = useUserStore();
    return {
      store,
      userStore,
      outgoingOffers: store.outgoingOffers,
      outgoingSortKey: store.getOutgoingSortKey,

      outgoingBrandFilter: store.getOutgoingBrandFilter,

      loadingRequest: false,
      emptyRequest: false,

      openEditDialog: false,
      openDeleteDialog: false,

      singleOffer: {} as OutgoingOffersResponse
    }
  },
  watch: {
    outgoingSortKey: {
      handler: async function (sortKey) {
        this.store.setOutgoingSortKey(sortKey);
        if (!this.store.getOutgoingBrandFilterStatus) {
          await this.FetchOutgoingOffers(sortKey, '');
        } else {
          await this.FetchOutgoingOffers(sortKey, this.outgoingBrandFilter);
        }
        this.loadingRequest = true
      }
    },
    outgoingBrandFilter: {
      handler: function (brandFilter) {
        this.store.setOutgoingBrandFilter(brandFilter);
        this.store.setOutgoingBrandFilterStatus(false);
      }
    }
  },
  async mounted() {
    const outgoingOffersRequestStatus = this.store.getOutgoingOffersRequestStatus;
    if (outgoingOffersRequestStatus == false) {
      await this.FetchOutgoingOffers('', '');
    } else {
      this.$emit('outgoingAmount', this.outgoingOffers.length);
    }
    this.loadingRequest = true;
  },
  methods: {
    async FetchOutgoingOffers(sortKey: string, brandFilter: string) {
      this.loadingRequest = false;
      const address = this.userStore.walletAddress;
      await this.store.setOutgoingOffers(address, sortKey, brandFilter);
      this.outgoingOffers = this.store.getOutgoingOffers;
      this.$emit('outgoingAmount', this.outgoingOffers.length);
      if (this.outgoingOffers.length == 0) {
        this.emptyRequest = true 
      }
      this.loadingRequest = true
    },
    OpenDeleteDialog(offer: OutgoingOffersResponse) {
      this.singleOffer = offer;
      this.openDeleteDialog = true;
    },
    OpenEditDialog(offer: OutgoingOffersResponse) {
      this.singleOffer = offer;
      this.openEditDialog = true;
    },
    RemoveRow(orderHash: string) {
      this.outgoingOffers = this.outgoingOffers.filter(f => f.orderHash !== orderHash);
    }
  }

});

</script>

<style>

</style>
