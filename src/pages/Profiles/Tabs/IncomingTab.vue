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
      <span class="incoming-column-nft">
        NFT
      </span>
      <span 
        v-if="$q.screen.width > 1020"
        class="incoming-column-price-floor"
      >
        Floor Price
      </span>
      <span class="incoming-column-price-offered">
        Offered
      </span>
      <span 
        v-if="$q.screen.width > 1265"
        class="incoming-column-from"
      >
        From
      </span>
      <span class="incoming-column-expire">
        Exp On
      </span>
      <span class="incoming-column-action">
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
      <div class="row items-center incoming-column-nft">
        <img :src="offer.image" class="profile-nft-image q-mr-md"/>
        <span class="profile-nft-brand"> {{ offer.brand }}</span>
      </div>
      <div 
        v-if="$q.screen.width > 1020"
        class="row items-center incoming-column-price-floor"
      >
        <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
        <span class="profile-nft-number"> {{ !!offer.lowestOffer ? offer.lowestOffer : '0.00' }}  </span>
      </div>
      <div class="row items-center incoming-column-price-offered">
        <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
        <span class="profile-nft-number"> {{ offer.offer }} </span>
        <q-tooltip
          v-if="$q.screen.width <= 1265"
          anchor="top start" 
          self="center start"
          class="listing-tooltip-container" 
          :offset="$q.screen.width > 1020 ? [70, 30] : [70, 40]"
        >
          <div class="column">
            <div 
              v-if="$q.screen.width <= 1020"
              class="row items-center justify-between"
            >
              <span class="incoming-tooltip-label">
                Floor Price
              </span>
              <div class="row items-center">
                <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
                <span class="incoming-tooltip-text q-pl-xs"> {{ offer.offer }} </span>
              </div>
            </div>
            <div class="row items-center justify-between">
              <span class="incoming-tooltip-label">
                From
              </span>
              <div class="row items-center">
                <span class="incoming-tooltip-text q-pl-xs"> {{ ReduceAddress(offer.offerer) }} </span>
              </div>
            </div>
          </div>
        </q-tooltip>
      </div>
      <div 
        v-if="$q.screen.width > 1265"
        class="row items-center incoming-column-from"
      >
        <span class="profile-nft-number"> {{ ReduceAddress(offer.offerer) }} </span>
      </div>
      <div class="incoming-column-expire">
        <span class="profile-nft-number-highlight"> {{ offer.endTime }} </span>
      </div>
      <div style="margin-left: -5px;" class="row items-center incoming-column-action">
        <q-btn
          v-if="$q.screen.width > 1020"
          flat
          unelevated
          dense
          no-caps
          class="profile-accept-btn"
          @click="AcceptOffer(offer.orderHash)"
        >
          Accept
        </q-btn>
        <q-btn
          v-else
          flat
          unelevated
          dense
          no-caps
          @click="AcceptOffer(offer.orderHash)"
        >
          <img src="../../../assets/accept.svg"/>
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
import 'src/css/Profile/Component/incoming.css';
import { ordersStore } from 'src/stores/orders-store';

export default defineComponent({
  data() {
    const store = ordersStore();
    return {
      store,
      incomingOffers: store.incomingOffers,
      incomingFilter: ''
    }
  },

  async mounted() {
    const offersRequestStatus = this.store.getOffersRequestStatus;
    if (offersRequestStatus == false) {
      const address = '0xA3873a019aC68824907A3aD99D3e3542376573D0';
      await this.store.setOffers(address);
      this.incomingOffers = this.store.getIncomingOffers;
    }
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
