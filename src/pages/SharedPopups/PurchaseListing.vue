<template>
  <q-dialog
    v-if="$q.screen.width < 800"
    :maximized="true"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-pa-none column">
      <q-card-section class="row items-center q-pb-lg">
        <div class="dialog-title">
          Buy Now
        </div>
        <q-separator
          v-if="$q.screen.width > 600"
          spaced="md"
          size="2px"
          inset
          vertical
          color="accent"
        />
        <q-space />
        <q-btn
          v-close-popup
          icon="close"
          flat
          round
          dense
        />
      </q-card-section>

      <span class="dialog-subtitle" style="align-self: center">
        {{ brand }}
      </span>

      <q-card-section class="row justify-start" style="flex-wrap: nowrap">
        <div
          v-if="$q.screen.width > 600"
          style="width: 55%; align-self: center"
        >
          <q-img :src="image" width="95%" />
        </div>
        <div
          class="column justify-between q-my-xs q-gutter-y-md"
          style="width: 45%; flex-wrap: nowrap"
          :style="$q.screen.width > 600 ? 'width: 45%' : 'width: 100%'"
        >
          <ListingExpTimer
            :time-left="listingExpDate"
          />
          <div class="row full-width">
            <div class="column">
              <span class="dialog-label"> Price </span>
              <div class="row items-center">
                <q-icon :name="`app:${GetCurrencyLabel(listingCurrency)}-icon`" size="20px" />
                <span class="dialog-highest-offer-price q-ml-xs">
                  {{ listingPrice }}
                </span>
              </div>
            </div>
          </div>
          <div class="column">
            <span class="dialog-price-label"> Fee </span>
            <span class="dialog-fee"> 2.5% </span>
          </div>
          <q-separator size="2px" color="accent" />
          <div class="column">
            <span class="dialog-price-label"> Total </span>
            <div class="row items-center">
              <q-icon :name="`app:${GetCurrencyLabel(listingCurrency)}-icon`" size="24px" />
              <span class="dialog-total q-ml-xs">
                {{ listingPrice }}
              </span>
            </div>
          </div>
        </div>
      </q-card-section>
      <span class="dialog-terms-conditions">
				<q-checkbox
					v-model="acceptTerms"
					class="q-pb-md"
					style="align-self: center"
				/>
				I agree with the
				<q-btn
					class="text-blue-underlined"
					dense no-caps flat
					:ripple="false" padding="none"
					@click="$emit('open-terms-and-conditions');">
					terms and conditions
				</q-btn>
			</span>
      <div
        :class="
          $q.screen.width > 450
            ? 'row justify-center q-gutter-x-sm'
            : 'column items-center q-gutter-y-sm'
        "
      >
        <q-btn
          v-if="!userStore.user"
          class="dialog-confirm"
          :style="$q.screen.width > 600 ? '' : 'width: 100%'"
          unelevated
          no-caps
          flat
          disable
          size="md"
        >
          Please Connect Wallet
        </q-btn>
        <q-btn
	        v-else
          class="dialog-confirm-small"
          :style="$q.screen.width <= 450 ? 'width: 95% !important;' : ''"
          no-caps
          flat
          :disable="!acceptTerms"
          @click="PurchaseListing(orderHash, brand, image)"
        >
          Process payment
        </q-btn>
      </div>
    </q-card>
    <OngoingTransactionDialog v-model="ongoingTxn"/>
  </q-dialog>

  <q-dialog
    v-else
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      class="q-pa-none"
      style="
        min-width: 785px;
        background-color: #ffffff;
        border-radius: 10px;
        max-width: 785px;
      "
    >
      <q-card-section class="row items-center q-pb-none">
        <div class="dialog-title">
          Buy Now
        </div>
        <q-separator spaced="md" size="2px" inset vertical color="accent" />
        <div class="dialog-subtitle">{{ brand }}</div>
        <q-space />
        <q-btn
          v-close-popup
          icon="close"
          flat
          round
          dense
        />
      </q-card-section>

      <q-card-section class="row justify-start">
        <div style="width: 55%; align-self: center">
          <q-img :src="image" width="95%" />
        </div>
        <div
          class="column justify-between q-my-xs q-gutter-y-md"
          style="width: 45%"
        >
          <div class="row full-width">
            <div class="column q-mr-md" style="width: 25%">
              <span class="dialog-label q-pb-xs">Price</span>
              <div class="row items-center">
                <q-icon :name="`app:${GetCurrencyLabel(listingCurrency)}-icon`" size="20px" />
                <span class="dialog-highest-offer-price q-ml-xs">
                  {{ listingPrice }}
                </span>
              </div>
            </div>
            <ListingExpTimer
              :time-left="listingExpDate"
            />
          </div>
          <div class="column">
            <span class="dialog-price-label"> Fee </span>
            <span class="dialog-fee"> 2.5% </span>
          </div>
          <q-separator size="2px" color="accent" />
          <div class="column">
            <span class="dialog-price-label"> Total </span>
            <div class="row items-center">
              <q-icon :name="`app:${GetCurrencyLabel(listingCurrency)}-icon`" size="24px" />
              <span class="dialog-total q-ml-xs">
                {{ listingPrice }}
              </span>
            </div>
          </div>
          <div class="row items-center" style="flex-wrap: nowrap">
            <span class="dialog-terms-conditions">
							<q-checkbox
								v-model="acceptTerms"
							/>
							I agree with the
							<q-btn
								class="text-blue-underlined"
								dense no-caps flat
								:ripple="false" padding="none"
								@click="$emit('open-terms-and-conditions');">
								terms and conditions
							</q-btn>
						</span>
          </div>
          <div class="row justify-end q-mb-sm">
            <q-btn
              v-if="!userStore.user"
              class="dialog-confirm"
              :style="$q.screen.width > 600 ? '' : 'width: 100%'"
              unelevated
              no-caps
              flat
              disable
              size="md"
            >
              Please Connect Wallet
            </q-btn>
            <q-btn
              v-else
              class="dialog-confirm"
              style="width: 70%;"
              no-caps
              flat
              :disable="!acceptTerms"
              @click="PurchaseListing(orderHash, brand, image)"
            >
              Process payment
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <OngoingTransactionDialog v-model="ongoingTxn"/>
  </q-dialog>
</template>

<script lang="ts">
import 'src/css/Profile/Component/dialog.css';
import { defineComponent } from 'vue';
import TxnOngoing from './TxnOngoing.vue';
import { GetCurrencyLabel } from 'src/shared/currency.helper';
import { FulfillBasicOrder } from '../Metadata/services/Orders';
import OrderExpTimer from './OrderExpTimer.vue';
import { useUserStore } from 'src/stores/user-store';

export default defineComponent({
  components: {
    OngoingTransactionDialog: TxnOngoing,
    ListingExpTimer: OrderExpTimer
  },
  props: {
    orderHash: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    listingPrice: {
      type: String,
      required: true
    },
    listingCurrency: {
      type: String,
      required: true
    },
    listingExpDate: {
      type: Number,
      required: true
    },
    walletAddress: {
      type: String,
      required: true
    }
  },
  emits: [
    'listing-purchase-close',
    'listing-purchased',
    'listing-purchase-error',
		'open-terms-and-conditions',
    'open-kyc-dialog'
  ],
  data() {
    const userStore = useUserStore();
    return {
      acceptTerms: false,
      ongoingTxn: false,

      GetCurrencyLabel,
      userStore
    };
  },
  methods: {
    async PreventExitDuringTxn(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = '';
    },
    SetPreventingExitListener(action: boolean) {
      if (action) {
        this.ongoingTxn = true;
        window.addEventListener('beforeunload', this.PreventExitDuringTxn);
      } else {
        this.ongoingTxn = false;
        window.removeEventListener('beforeunload', this.PreventExitDuringTxn);
      }
    },
    async PurchaseListing(orderHash: string, brand: string, image: string) {
      if (!this.userStore.user) throw new Error('User not logged in');
      try {
        this.SetPreventingExitListener(true);
        await FulfillBasicOrder(orderHash, brand, false, this.userStore.user, image);
        this.$emit('listing-purchased');
      } catch {
        this.$emit('listing-purchase-error', {
          errorType: 'accept',
          errorTitle: 'Sorry, the purchase failed',
          errorMessage: 'It may be due to insufficient balance, disconnected wallet, etc.'
        })
      } finally {
        this.SetPreventingExitListener(false);
      }
    },
    GetCurrencyIconString(listingCurrency: string) {
      switch (listingCurrency) {
        case process.env.WIVA_CURRENCY:
          return 'WIVA';
        case process.env.USDT_CURRENCY:
          return 'USDT';
        case process.env.USDC_CURRENCY:
          return 'USDC';
      }
    }
  },
});
</script>

<style></style>
