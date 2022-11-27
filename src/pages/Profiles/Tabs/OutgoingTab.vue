<template>
<q-page class="column items-center">
  <div class="row justify-between items-center q-pb-md" style="width: 95%">
    <div class="row q-gutter-x-lg">
      <span class="profile-header-offer q-pr-xs"> Offers </span>
      <span class="profile-nft-number"> {{ outgoingOffers.length }} </span>
      <q-separator style="background-color: #5e97ec45 !important" vertical inset />
      <q-radio v-model="outgoingFilter" dense val="newest" label="New First" class="profile-checkbox" :style="IsSelectedFilter('newest') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
      <q-radio v-model="outgoingFilter" dense val="oldest" label="Old First" class="profile-checkbox" :style="IsSelectedFilter('oldest') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
      <q-radio v-model="outgoingFilter" dense val="expire" label="Expiring First" class="profile-checkbox" :style="IsSelectedFilter('expire') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
    </div>
    <div class="row items-center q-gutter-x-sm" style="flex-wrap: nowrap;">
      <q-input 
        v-model="text"
        color="grey"
        outlined 
        dense
        label="Search"
        class="profile-searchbox"
      >
        <template #prepend>
          <q-icon name="search" color="grey"></q-icon>
        </template>
      </q-input>
      <q-btn
        flat
        unelevated
        dense
        class="profile-primary-btn"
      >
        GO
      </q-btn>
    </div>
  </div>
  <div class="profile-main-container column">
    <div class="row q-pa-lg profile-column-name">
      <span class="outgoing-column-nft">
        NFT
      </span>
      <span class="outgoing-column-own-offer">
        Your offer
      </span>
      <span class="outgoing-column-highest-offer">
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
        <img :src="offer.image" class="profile-nft-image q-mr-md"/>
        <span class="profile-nft-brand"> {{ offer.brand }}</span>
      </div>
      <div class="row items-center outgoing-column-own-offer">
        <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
        <span class="profile-nft-number"> {{ offer.offer }} </span>
        <q-tooltip 
          v-if="$q.screen.width <= 1265"
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
      <div class="row items-center outgoing-column-highest-offer">
        <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
        <span class="profile-nft-number"> {{ !!offer.highestOffer ? offer.highestOffer : '0.00' }} </span>
      </div>
      <div
        v-if="$q.screen.width > 1265"
        class="row items-center outgoing-column-expire"
      >
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

export default defineComponent({
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
