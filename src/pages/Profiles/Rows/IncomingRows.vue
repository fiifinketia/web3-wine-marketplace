<template>
  <div class="profile-nft-container">
    <div
      v-for="offer in paginatedOffers"
      :key="offer.orderHash"
      class="q-py-md row items-center"
      :class="$q.screen.width > 600 ? 'q-pa-lg' : 'q-px-md'"
    >
      <q-btn
        flat
        unelevated
        dense
        no-caps
        align="left"
        padding="0px"
        class="incoming-column-nft profile-nft-btn-wrapper btn--no-hover"
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
        v-if="$q.screen.width > 1020"
        class="row items-center incoming-column-price-floor"
      >
        <q-icon
          v-if="offer.lowestOffer"
          :name="`app:${GetCurrencyLabel(offer.lowestOfferCurrency)}-icon`"
          size="20px"
        />
        <span class="profile-nft-number">
          {{ !!offer.lowestOffer ? offer.lowestOffer : '0.00' }}
        </span>
      </div>
      <div
        v-if="$q.screen.width > 600"
        class="row items-center incoming-column-price-offered"
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
          class="listing-tooltip-container"
          :offset="$q.screen.width > 1020 ? [70, 30] : [70, 40]"
        >
          <div class="column">
            <div
              v-if="$q.screen.width <= 1020"
              class="row items-center justify-between"
            >
              <span class="incoming-tooltip-label"> Floor Price </span>
              <div class="row items-center">
                <q-icon
                  v-if="offer.lowestOffer"
                  :name="`app:${GetCurrencyLabel(offer.lowestOfferCurrency)}-icon`"
                  size="16px"
                />
                <span class="incoming-tooltip-text q-pl-xs">
                  {{ offer.lowestOffer }}
                </span>
              </div>
            </div>
            <div class="row items-center justify-between">
              <span class="incoming-tooltip-label"> From </span>
              <div class="row items-center">
                <span class="incoming-tooltip-text q-pl-xs">
                  {{ ReduceAddress(offer.offerer) }}
                </span>
              </div>
            </div>
          </div>
        </q-tooltip>
      </div>
      <div
        v-if="$q.screen.width <= 600"
        class="incoming-column-price-offered column"
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
        v-if="$q.screen.width > 1265"
        class="row items-center incoming-column-from"
      >
        <span class="profile-nft-number">
          {{ ReduceAddress(offer.offerer) }}
        </span>
      </div>
      <div v-if="$q.screen.width > 600" class="incoming-column-expire">
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
        style="margin-left: -5px"
        class="row items-center incoming-column-action"
      >
        <q-btn
          v-if="$q.screen.width > 1020"
          flat
          unelevated
          dense
          no-caps
          class="profile-accept-btn"
          @click="
            OpenConfirmDialog(
              offer.orderHash,
              offer.brand,
              offer.image,
              {
                identifierOrCriteria: offer.identifierOrCriteria,
                contractAddress: offer.contractAddress,
                network: offer.network,
              },
              offer.offer,
              offer.currency
            )
          "
        >
          Accept
        </q-btn>
        <q-btn
          v-else
          flat
          unelevated
          dense
          no-caps
          @click="
            OpenConfirmDialog(
              offer.orderHash,
              offer.brand,
              offer.image,
              {
                identifierOrCriteria: offer.identifierOrCriteria,
                contractAddress: offer.contractAddress,
                network: offer.network,
              },
              offer.offer,
              offer.currency
            )
          "
        >
          <img src="../../../assets/accept.svg" />
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
      :floor-price="floorPrice"
      :from="ReduceAddress(from)"
      :tab="tab"
    />
  </div>
</template>

<script lang="ts">
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
import { defineComponent, PropType, ref } from 'vue';
import { IncomingOffersResponse } from '../models/response.models';
import NFTDetails from '../Popups/NFTDetails.vue';
import { GetCurrencyLabel } from 'src/shared/currency.helper';
import { ConvertUnixToDate, ConvertUnixToTime } from 'src/shared/date.helper';

export default defineComponent({
  components: {
    NFTDialog: NFTDetails,
  },
  props: {
    incomingOffers: {
      type: [] as PropType<IncomingOffersResponse[]>,
      default: [],
    },
  },
  emits: ['accept-offer'],
  data() {
    return {
      showNFTPopup: false,
      image: '',
      brand: '',
      floorPrice: '',
      from: '',
      tab: 'incoming',
			currentPage: ref(1),
      maxPageLength: 5,

      GetCurrencyLabel,
      ConvertUnixToDate,
      ConvertUnixToTime
    };
  },
	computed: {
    paginatedOffers() {
      return this.incomingOffers.slice(
        (this.currentPage - 1) * this.maxPageLength,
        this.currentPage * this.maxPageLength
      );
    },
    maxPage() {
      return Math.ceil(this.incomingOffers.length / this.maxPageLength);
    },
  },
  methods: {
    ReduceAddress(walletAddress: string) {
      return `${walletAddress.slice(0, 11)}...`;
    },
    OpenConfirmDialog(
      orderHash: string,
      brand: string,
      image: string,
      token: TokenIdentifier,
      offer: string,
      currency: string
    ) {
      this.$emit('accept-offer', {
        orderHash: orderHash,
        brand: brand,
        image: image,
        token: token,
        offer: offer,
        currency: currency
      });
    },
    OpenNFTDialog(offer: IncomingOffersResponse) {
      this.image = offer.image;
      this.brand = offer.brand;
      this.floorPrice = !!offer.lowestOffer ? offer.lowestOffer : '0.00';
      this.from = offer.offerer;
      this.showNFTPopup = true;
    },
    OpenMetadataPage(offer: IncomingOffersResponse) {
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
    ClickBrandAction(offer: IncomingOffersResponse, action: string) {
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
