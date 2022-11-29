<template>
<q-page class="column items-center">
  <OutgoingHeaderLg
    v-if="$q.screen.width > 1020"
    :outgoingAmount="outgoingOffers.length"
  />
  <OutgoingHeaderSm
    v-else
    :outgoingAmount="outgoingOffers.length"
  />
  <div class="profile-main-container column">
    <div class="row q-pa-lg profile-column-name">
      <span class="outgoing-column-nft">
        NFT
      </span>
      <span class="outgoing-column-own-offer">
        Your offer
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
        >
          <img src="../../../assets/trash.svg" />
        </q-btn>
        <q-btn
          flat
          unelevated
          dense
        >
          <img src="../../../assets/edit.svg" />
        </q-btn>
      </div>
    </div>
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

export default defineComponent({
  components: {
    OutgoingHeaderLg: OutgoingHeaderLg,
    OutgoingHeaderSm: OutgoingHeaderSm
  },
  data() {
    const store = ordersStore();
    return {
      store,
      outgoingOffers: store.outgoingOffers,
      outgoingFilter: ''
    }
  },

  async mounted() {
    const offersRequestStatus = this.store.getOffersRequestStatus;
    if (offersRequestStatus == false) {
      const address = '0x37B4044A9238C4DB0A97c551D165aee3E8C9f95A';
      await this.store.setOffers(address);
      this.outgoingOffers = this.store.getOutgoingOffers;
    }
  },

  methods: {
    IsSelectedFilter(filter: string) : boolean {
      return !!(this.outgoingFilter === filter)
    }
  }

});

</script>

<style>

</style>
