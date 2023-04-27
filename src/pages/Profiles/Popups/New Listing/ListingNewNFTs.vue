<template>
  <div
    v-if="listableTokens.length > 0"
    class="row q-mt-md q-pb-md q-px-sm q-gutter-y-md"
    :class="
      listableTokens.length >= 4 && $q.screen.width > 600
        ? 'justify-between'
        : listableTokens.length == 3 && $q.screen.width > 600
        ? 'justify-evenly'
        : $q.screen.width > 600
        ? 'justify-start q-gutter-x-md'
        : listableTokens.length >= 2
        ? 'justify-around'
        : 'justify-start q-ml-xs'
    "
  >
    <div
      v-for="token in listableTokens"
      :key="
        token.identifierOrCriteria +
        ',' +
        token.network +
        ',' +
        token.contractAddress
      "
      class="new-list-card-container"
    >
      <q-card flat>
        <q-btn
          :disable="!!token.listingPrice || !!token.listingCancellationStatus"
          flat
          unelevated
          dense
          :ripple="false"
          no-caps
          class="q-pa-none list-btn btn--no-hover"
          align="left"
          @click="OpenListingDialog(token)"
        >
          <div class="new-list-card-image">
            <img
              :src="token.image"
              class="full-width"
              :style="
                !!token.listingPrice || !!token.listingCancellationStatus
                  ? 'filter: brightness(0.5);'
                  : ''
              "
            />
            <img
              v-if="!!token.listingPrice || !!token.listingCancellationStatus"
              src="../../../../assets/listing-process.svg"
              class="new-list-card-process-logo"
            />
          </div>
          <div
            class="q-pb-sm new-list-card-brand column justify-center"
            style="text-align: left"
          >
            <span class="new-list-brand-text">
              {{ truncateText(token.brand) }}
            </span>
          </div>
        </q-btn>
        <div
          class="new-list-history-container row justify-between items-center q-px-sm"
        >
          <span v-if="!token.listingPrice" class="new-list-history-text">
            Price history
          </span>
          <div
            v-else-if="!!token.listingPrice && !token.listingCancellationStatus"
            class="row items-center q-gutter-x-xs"
          >
            <q-img
              src="../../../../assets/processing.svg"
              :style="
                $q.screen.width > 350
                  ? 'height: 34px; width: 23px'
                  : 'height: 15px; width: 16px'
              "
            />
            <span class="new-list-history-text"> Loading: </span>
          </div>
          <div v-else class="row items-center q-gutter-x-xs">
            <q-img
              src="../../../../assets/processing.svg"
              :style="
                $q.screen.width > 350
                  ? 'height: 34px; width: 23px'
                  : 'height: 15px; width: 16px'
              "
            />
            <span class="new-list-history-text"> Delisting </span>
          </div>
          <q-btn
            v-if="!token.listingPrice"
            unelevated
            flat
            dense
            :ripple="false"
            class="open-link btn--no-hover"
          >
            <img src="../../../../assets/button-right.svg" />
          </q-btn>
          <div
            v-else-if="!!token.listingPrice && !token.listingCancellationStatus"
            class="row items-center q-gutter-x-xs"
          >
            <q-img
              v-if="ReturnCurrency(token.listingCurrency) == Currencies.USDC"
              src="../../../../assets/icons/currencies/USDC-logo.svg"
              class="currency-logo"
            />
            <q-img
              v-if="ReturnCurrency(token.listingCurrency) == Currencies.USDT"
              src="../../../../assets/icons/currencies/USDT-logo.svg"
              class="currency-logo"
            />
            <q-img
              v-if="ReturnCurrency(token.listingCurrency) == Currencies.WIVA"
              src="../../../../assets/icons/currencies/WIVA-logo.svg"
              class="currency-logo"
            />
            <span class="new-list-price">
              {{ token.listingPrice }}
            </span>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia';
import { ListableToken } from 'src/shared/models/entities/NFT.model';
import { useListableFilters } from 'src/stores/listable-filters';
import { defineComponent } from 'vue';
import { ReturnCurrency } from 'src/shared/currency.helper';
import { Currencies } from 'src/shared/models/entities/currency';

export default defineComponent({
  emits: ['open-listing-dialog'],
  data() {
    const listableFiltersStore = useListableFilters();
    return {
      listableFiltersStore,
      ReturnCurrency,
      Currencies
    };
  },
  computed: {
    ...mapState(useListableFilters, {
      listableTokens: store =>
        store.getFilteredListableTokens as ListableToken[],
    }),
  },
  methods: {
    truncateText(text: string) {
      if (this.$q.screen.width > 1350) {
        if (text.length > 50) {
          return (
            text.trim().substring(0, 50).split(' ').slice(0, -1).join(' ') + '…'
          );
        } else return text;
      } else if (this.$q.screen.width <= 600) {
        if (text.length > 35) {
          return (
            text.trim().substring(0, 35).split(' ').slice(0, -1).join(' ') + '…'
          );
        } else return text;
      } else {
        if (text.length > 40) {
          return (
            text.trim().substring(0, 40).split(' ').slice(0, -1).join(' ') + '…'
          );
        } else return text;
      }
    },
    OpenListingDialog(token: ListableToken) {
      // console.log(token);
      this.$emit('open-listing-dialog', token);
    },
  },
});
</script>

<style scoped>
:deep(.list-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
:deep(.open-link.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
