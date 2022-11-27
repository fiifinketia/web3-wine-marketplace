<template>
<q-page class="column items-center">
  <div class="row justify-between items-center q-pb-md" style="width: 95%">
    <div class="row q-gutter-x-lg">
      <span class="profile-header-offer q-pr-xs"> Offers </span>
      <span class="profile-nft-number"> {{ incomingOffers.length }} </span>
      <q-separator style="background-color: #5e97ec45 !important" vertical inset />
      <q-radio v-model="incomingFilter" dense val="newest" label="New First" class="profile-checkbox" :style="IsSelectedFilter('newest') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
      <q-radio v-model="incomingFilter" dense val="oldest" label="Old First" class="profile-checkbox" :style="IsSelectedFilter('oldest') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
      <q-radio v-model="incomingFilter" dense val="expire" label="Expiring First" class="profile-checkbox" :style="IsSelectedFilter('expire') ? `font-family: 'ProximaNova-Bold';` : 'color: #9D9D9D'"/>
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
      <span style="width: 28%">
        NFT
      </span>
      <span style="width: 16%">
        Floor Price
      </span>
      <span style="width: 16%">
        Offered
      </span>
      <span style="width: 16%">
        From
      </span>
      <span style="width: 16%">
        Exp On
      </span>
      <span style="width: 8%">
        Action
      </span>
    </div>
    <q-separator style="background-color: #5e97ec45 !important" inset class="q-mx-xl" />
    <div class="profile-nft-container">
    <div 
      v-for="offer in incomingOffers"
      :key="offer.orderHash"
      class="q-px-lg q-py-md row items-center"
    >
      <div style="width: 28%" class="row items-center">
        <img :src="offer.image" class="profile-nft-image q-mr-md"/>
        <span class="profile-nft-brand"> {{ offer.brand }}</span>
      </div>
      <div style="width: 16%" class="row items-center">
        <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
        <span class="profile-nft-number"> {{ !!offer.lowestOffer ? offer.lowestOffer : '0.00' }}  </span>
      </div>
      <div style="width: 16%" class="row items-center">
        <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
        <span class="profile-nft-number"> {{ offer.offer }} </span>
      </div>
      <div style="width: 16%" class="row items-center">
        <span class="profile-nft-number"> {{ ReduceAddress(offer.offerer) }} </span>
      </div>
      <div style="width: 16%">
        <span class="profile-nft-number-highlight"> {{ offer.endTime }} </span>
      </div>
      <div style="width: 8%; margin-left: -5px;" class="row items-center">
        <q-btn
          flat
          unelevated
          dense
          no-caps
          class="profile-accept-btn"
          @click="AcceptOffer(offer.orderHash)"
        >
          Accept
        </q-btn>
      </div>
    </div>
    </div>
  </div>
</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'src/css/Profile/shared.css';
import { IncomingOffersResponse } from '../models/response.models';
import { ReturnOffers } from '../orders.requests';

export default defineComponent({
  data() {
    return {
      incomingOffers: new Array<IncomingOffersResponse> (),
      incomingFilter: ''
    }
  },

  async mounted() {
    const address = '0xA3873a019aC68824907A3aD99D3e3542376573D0';
    const { incoming, outgoing } = await ReturnOffers(address);
    this.incomingOffers = incoming;
    console.log(this.incomingOffers)
  },

  methods: {
    IsSelectedFilter(filter: string) : boolean {
      return !!(this.incomingFilter === filter)
    },
    ReduceAddress(walletAddress: string) {
      return `${walletAddress.slice(0, 11)}...`
    },
    AcceptOffer(orderHash: string) {
      console.log(orderHash)
    }
  }
});

</script>

<style>

</style>
