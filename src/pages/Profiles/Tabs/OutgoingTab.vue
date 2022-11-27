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
      <span style="width: 30%">
        NFT
      </span>
      <span style="width: 25%">
        Your offer
      </span>
      <span style="width: 25%">
        Highest Offer
      </span>
      <span style="width: 12%">
        Exp On
      </span>
      <span style="width: 8%">
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
      <div style="width: 30%" class="row items-center">
        <img :src="offer.image" class="profile-nft-image q-mr-md"/>
        <span class="profile-nft-brand"> {{ offer.brand }}</span>
      </div>
      <div style="width: 25%" class="row items-center">
        <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
        <span class="profile-nft-number"> {{ offer.offer }} </span>
      </div>
      <div style="width: 25%" class="row items-center">
        <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
        <span class="profile-nft-number"> {{ !!offer.highestOffer ? offer.highestOffer : '0.00' }} </span>
      </div>
      <div style="width: 12%" class="row items-center">
        <span class="profile-nft-number-highlight"> {{ offer.endTime }} </span>
      </div>
      <div style="width: 8%; margin-left: -5px;" class="row items-center">
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
