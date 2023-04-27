<template>
  <div class="profile-nft-container">
    <div
      v-for="offer in outgoingOffers"
      :key="offer.orderHash"
      class="q-px-lg q-py-md row items-center"
    >
      <q-btn
        flat
        unelevated
        dense
        no-caps
        align="left"
        padding="0px"
        class="outgoing-column-nft btn--no-hover"
        @click="
          $q.screen.width > 600
            ? ClickBrandAction(offer, 'new tab')
            : ClickBrandAction(offer, 'nft dialog')
        "
      >
        <img
          v-if="$q.screen.width > 1265"
          :src="offer.image"
          class="profile-nft-image q-mr-md"
        />
        <span class="profile-nft-brand"> {{ offer.brand }}</span>
      </q-btn>
      <div
        v-if="$q.screen.width > 600"
        class="row items-center outgoing-column-own-offer"
      >
        <q-img
          v-if="ReturnCurrency(offer.currency) == Currencies.USDC"
          src="../../../assets/icons/currencies/USDC-logo.svg"
          width="20px"
        />
        <q-img
          v-if="ReturnCurrency(offer.currency) == Currencies.USDT"
          src="../../../assets/icons/currencies/USDT-logo.svg"
          width="20px"
        />
        <q-img
          v-if="ReturnCurrency(offer.currency) == Currencies.WIVA"
          src="../../../assets/icons/currencies/WIVA-logo.svg"
          width="20px"
        />
        <span class="profile-nft-number"> {{ parseFloat(offer.offer).toFixed(1) }} </span>
        <q-tooltip
          v-if="$q.screen.width <= 1265 && $q.screen.width > 600"
          anchor="top start"
          self="center start"
          class="outgoing-tooltip-container"
          :offset="[70, 30]"
        >
          <div class="column">
            <div class="row items-center justify-between">
              <span class="outgoing-tooltip-label"> Expiration On </span>
              <span class="outgoing-tooltip-expire q-pl-xs">
                {{ offer.endTime }}
              </span>
            </div>
          </div>
        </q-tooltip>
      </div>
      <div
        v-if="$q.screen.width > 600"
        class="row items-center outgoing-column-highest-offer"
      >
        <q-img
          v-if="ReturnCurrency(offer.highestOfferCurrency) == Currencies.USDC"
          src="../../../assets/icons/currencies/USDC-logo.svg"
          width="20px"
        />
        <q-img
          v-if="ReturnCurrency(offer.highestOfferCurrency) == Currencies.USDT"
          src="../../../assets/icons/currencies/USDT-logo.svg"
          width="20px"
        />
        <q-img
          v-if="ReturnCurrency(offer.highestOfferCurrency) == Currencies.WIVA"
          src="../../../assets/icons/currencies/WIVA-logo.svg"
          width="20px"
        />
        <span class="profile-nft-number">
          {{ !!offer.highestOffer ? parseFloat(offer.highestOffer).toFixed(1) : '0.00' }}
        </span>
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
          <q-img
            v-if="ReturnCurrency(offer.currency) == Currencies.USDC"
            src="../../../assets/icons/currencies/USDC-logo.svg"
            width="20px"
          />
          <q-img
            v-if="ReturnCurrency(offer.currency) == Currencies.USDT"
            src="../../../assets/icons/currencies/USDT-logo.svg"
            width="20px"
          />
          <q-img
            v-if="ReturnCurrency(offer.currency) == Currencies.WIVA"
            src="../../../assets/icons/currencies/WIVA-logo.svg"
            width="20px"
          />
          <span class="profile-nft-number"> {{ parseFloat(offer.offer).toFixed(1) }} </span>
        </div>
        <span class="profile-nft-number-highlight"> {{ offer.endTime }} </span>
      </div>
      <div
        style="margin-left: -5px"
        class="row items-center outgoing-column-action"
      >
        <q-btn flat unelevated dense @click="OpenDeleteDialog(offer)">
          <img src="../../../assets/trash.svg" />
        </q-btn>
        <q-btn flat unelevated dense @click="OpenEditDialog(offer)">
          <img src="../../../assets/edit.svg" />
        </q-btn>
      </div>
    </div>
    <NFTDialog
      v-model="showNFTPopup"
      :brand="brand"
      :image="image"
      :offer-end-time="offerEndTime"
      :highest-offer="highestOffer"
      :tab="tab"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { OutgoingOffersResponse } from '../models/response.models';
import NFTDetails from '../Popups/NFTDetails.vue';
import { ReturnCurrency } from 'src/shared/currency.helper';
import { Currencies } from 'src/shared/models/entities/currency';

export default defineComponent({
  components: {
    NFTDialog: NFTDetails,
  },
  props: {
    outgoingOffers: {
      type: [] as PropType<OutgoingOffersResponse[]>,
      default: [],
    },
  },
  emits: ['delete-offer', 'edit-offer'],
  data() {
    return {
      showNFTPopup: false,
      image: '',
      brand: '',
      offerEndTime: '',
      highestOffer: '',
      tab: 'outgoing',

      ReturnCurrency,
      Currencies
    };
  },
  methods: {
    OpenDeleteDialog(offer: OutgoingOffersResponse) {
      this.$emit('delete-offer', offer);
    },
    OpenEditDialog(offer: OutgoingOffersResponse) {
      this.$emit('edit-offer', offer);
    },
    OpenNFTDialog(offer: OutgoingOffersResponse) {
      this.image = offer.image;
      this.brand = offer.brand;
      this.highestOffer = !!offer.highestOffer ? parseFloat(offer.highestOffer).toFixed(1) : '0.00';
      this.offerEndTime = offer.endTime;
      this.showNFTPopup = true;
    },
    OpenMetadataPage(offer: OutgoingOffersResponse) {
      const routeData = this.$router.resolve({
        path: '/nft',
        query: {
          id: offer.identifierOrCriteria,
          network: offer.network,
          contractAddress: offer.contractAddress,
        },
      });
      window.open(routeData.href, '_blank');
    },
    ClickBrandAction(offer: OutgoingOffersResponse, action: string) {
      if (action == 'new tab') {
        this.OpenMetadataPage(offer);
      } else {
        this.OpenNFTDialog(offer);
      }
    },
  },
});
</script>

<style></style>
