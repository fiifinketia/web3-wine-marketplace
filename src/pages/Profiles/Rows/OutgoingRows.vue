<template>
  <div class="profile-nft-container">
    <div
      v-for="offer in paginatedOffers"
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
        class="outgoing-column-nft profile-nft-btn-wrapper btn--no-hover"
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
        <q-icon
          v-if="offer.offer"
          :name="`app:${GetCurrencyLabel(offer.currency)}-icon`"
          size="20px"
        />
        <span class="profile-nft-number"> {{ offer.offer }} </span>
        <q-tooltip
          v-if="$q.screen.width <= 1265 && $q.screen.width > 600"
          anchor="top start"
          self="center start"
          class="outgoing-tooltip-container"
          :offset="[70, 40]"
        >
          <div class="column">
            <div class="row items-center justify-between">
              <span class="outgoing-tooltip-label"> Expiration On </span>
              <div class="column items-center q-pl-xs" style="width: fit-content">
                <span
                  class="outgoing-tooltip-expire"
                  :style="ConvertUnixToDate(offer.endTime) === 'today' ? 'color: rgba(193, 27, 27, 1)' : ''"
                >
                  {{ ConvertUnixToDate(offer.endTime) }}
                </span>
                <span class="transaction-time-text" style="font-size: 16px">
                  {{ ConvertUnixToTime(offer.endTime) }}
                </span>
              </div>
            </div>
          </div>
        </q-tooltip>
      </div>
      <div
        v-if="$q.screen.width > 600"
        class="row items-center outgoing-column-highest-offer"
      >
        <q-icon
          v-if="offer.highestOffer"
          :name="`app:${GetCurrencyLabel(offer.highestOfferCurrency)}-icon`"
          size="20px"
        />
        <span class="profile-nft-number">
          {{ !!offer.highestOffer ? offer.highestOffer : '0.00' }}
        </span>
      </div>
      <div
        v-if="$q.screen.width > 1265"
        class="row items-center outgoing-column-expire"
      >
        <div class="column items-center" style="width: fit-content">
          <span
            class="profile-nft-number-highlight"
            :style="ConvertUnixToDate(offer.endTime) === 'today' ? 'color: rgba(193, 27, 27, 1)' : ''"
          >
            {{ ConvertUnixToDate(offer.endTime) }}
          </span>
          <span class="transaction-time-text">
            {{ ConvertUnixToTime(offer.endTime) }}
          </span>
        </div>
      </div>
      <div
        v-if="$q.screen.width <= 600"
        class="outgoing-column-own-offer column"
      >
        <div class="row q-pb-xs">
          <q-icon
            v-if="offer.offer"
            :name="`app:${GetCurrencyLabel(offer.currency)}-icon`"
            size="20px"
          />
          <span class="profile-nft-number"> {{ offer.offer }} </span>
        </div>
        <span
          class="profile-nft-number-highlight"
          :style="ConvertUnixToDate(offer.endTime) === 'today' ? 'color: rgba(193, 27, 27, 1)' : ''"
        >
          {{ ConvertUnixToDate(offer.endTime) }}
        </span>
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
		<q-pagination
			v-model="currentPage"
      class="row justify-center q-ma-sm"
      :max="maxPage"
      direction-links
    />
    <NFTDialog
      v-model="showNFTPopup"
      :brand="brand"
      :image="image"
      :offer-end-time="offerEndTime"
      :offer-end-date="offerEndDate"
      :highest-offer="highestOffer"
      :tab="tab"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { OutgoingOffersResponse } from '../models/response.models';
import NFTDetails from '../Popups/NFTDetails.vue';
import { GetCurrencyLabel } from 'src/shared/currency.helper';
import { ConvertUnixToDate, ConvertUnixToTime } from 'src/shared/date.helper';

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
      offerEndDate: '',
      offerEndTime: '',
      highestOffer: '',
      tab: 'outgoing',
			currentPage: ref(1),
      maxPageLength: 5,

      GetCurrencyLabel,
      ConvertUnixToDate,
      ConvertUnixToTime
    };
  },
	computed: {
    paginatedOffers() {
      return this.outgoingOffers.slice(
        (this.currentPage - 1) * this.maxPageLength,
        this.currentPage * this.maxPageLength
      );
    },
    maxPage() {
      return Math.ceil(this.outgoingOffers.length / this.maxPageLength);
    },
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
      this.highestOffer = !!offer.highestOffer ? offer.highestOffer : '0.00';
      this.offerEndDate = ConvertUnixToDate(offer.endTime);
      this.offerEndTime = ConvertUnixToTime(offer.endTime);
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
