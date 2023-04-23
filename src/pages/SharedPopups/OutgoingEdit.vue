<template>
  <q-dialog
    v-if="$q.screen.width < 800"
    :maximized="true"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-pa-none column">
      <q-card-section class="row items-center q-pb-none">
        <div class="dialog-title">Edit Offer</div>
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
          @click="ResetData()"
        />
      </q-card-section>

      <span class="dialog-subtitle" style="align-self: center">
        {{ brand }}
      </span>

      <q-card-section class="row justify-start">
        <div
          v-if="$q.screen.width > 600"
          style="width: 55%; align-self: center"
        >
          <q-img :src="image" width="95%" />
        </div>
        <div
          class="column justify-between q-my-xs q-gutter-y-md"
          style="width: 45%"
          :style="$q.screen.width > 600 ? 'width: 45%' : 'width: 100%'"
        >
          <div v-if="!!highestOffer" class="column">
            <span class="dialog-label"> Highest Offer </span>
            <div class="row items-center">
              <span class="dialog-highest-offer-price">
                {{ highestOffer }}
              </span>
            </div>
          </div>
          <div class="row full-width">
            <div class="column q-mr-md" style="width: 125px">
              <span class="dialog-label q-pb-xs">Your price</span>
              <q-input
                v-model="offerPrice"
                outlined
                dense
                type="number"
                debounce="500"
                class="dialog-input-box"
              />
            </div>
            <div class="column">
              <span class="dialog-label q-pb-xs">Currency</span>
              <q-select
                v-model="currency"
                :options="filteredCurrencyOptions"
                dense
                borderless
                style="height: 40px"
                popup-content-class="currency-dropdown"
                behavior="menu"
              >
                <template #selected>
                  <div
                    v-if="currency"
                    dense
                    square
                    color="white"
                    text-color="primary"
                    class="q-ma-none row items-center"
                  >
                    <q-icon :name="currency.icon" size="20px"/>
                    <span class="currency-label q-ml-xs"> {{ currency.label }} </span>
                  </div>
                </template>
                <template #option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    dense
                    class="currency-option q-px-sm row items-center"
                  >
                    <q-icon :name="scope.opt.icon" size="20px"/>
                    <span class="currency-label q-ml-xs">{{ scope.opt.label }}</span>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <div class="column">
            <span class="dialog-price-label"> Fee </span>
            <span class="dialog-fee"> 2.5% </span>
          </div>
          <div class="column">
            <span class="dialog-label q-pb-xs"> Keep active until </span>
            <q-input
              v-model="offerExpirationDate"
              outlined
              dense
              type="date"
              debounce="500"
              class="dialog-date-box"
            />
          </div>
          <q-separator size="2px" color="accent" />
          <div class="column">
            <span class="dialog-price-label"> Total </span>
            <div class="row items-center">
              <q-icon :name="currency.icon" size="24px" />
              <span class="dialog-total q-ml-xs">
                {{ !!offerPrice ? parseInt(offerPrice) : '0.00' }}
              </span>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-checkbox
        v-model="acceptTerms"
        class="q-pb-md"
        style="align-self: center"
      >
        <span class="dialog-terms-conditions">
          I agree with the Terms and Conditions
        </span>
      </q-checkbox>

      <div
        :class="
          $q.screen.width > 450
            ? 'row justify-center q-gutter-x-sm'
            : 'column items-center q-gutter-y-sm'
        "
      >
        <q-btn
          class="dialog-reset-small"
          :style="$q.screen.width <= 450 ? 'width: 95% !important;' : ''"
          no-caps
          outline
          style="color: #3586ff"
          @click="ResetData()"
        >
          <span class="dialog-cancel-gr-text"> Reset </span>
        </q-btn>
        <q-btn
          class="dialog-confirm-small"
          :style="$q.screen.width <= 450 ? 'width: 95% !important;' : ''"
          no-caps
          flat
          :disable="
            !acceptTerms ||
            offerExpirationDate === '' ||
            parseFloat(offerPrice) <= 0 ||
            loadingOffer
          "
          @click="CreateNewOrder()"
        >
          Make offer
        </q-btn>
      </div>
    </q-card>
    <OngoingTransactionDialog v-model="ongoingTxn"/>
  </q-dialog>
  <q-dialog v-else transition-show="scale" transition-hide="scale">
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
        <div class="dialog-title">Edit Offer</div>
        <q-separator spaced="md" size="2px" inset vertical color="accent" />
        <div class="dialog-subtitle">{{ brand }}</div>
        <q-space />
        <q-btn
          v-close-popup
          icon="close"
          flat
          round
          dense
          @click="ResetData()"
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
          <div v-if="!!highestOffer" class="column">
            <span class="dialog-label q-pb-xs"> Highest Offer </span>
            <div class="row items-center">
              <q-img
                v-if="ReturnCurrency(highestOfferCurrency) == Currencies.USDC"
                src="../../assets/icons/currencies/USDC-icon.svg"
                width="20px"
              />
              <q-img
                v-if="ReturnCurrency(highestOfferCurrency) == Currencies.USDT"
                src="../../assets/icons/currencies/USDT-icon.svg"
                width="20px"
              />
              <q-img
                v-if="ReturnCurrency(highestOfferCurrency) == Currencies.WIVA"
                src="../../assets/icons/currencies/WIVA-icon.svg"
                width="20px"
              />
              <span class="dialog-highest-offer-price">
                {{ highestOffer }}
              </span>
            </div>
          </div>
          <div class="row full-width">
            <div class="column q-mr-md" style="width: 30%">
              <span class="dialog-label q-pb-xs">Your price</span>
              <q-input
                v-model="offerPrice"
                outlined
                dense
                type="number"
                debounce="500"
                class="dialog-input-box"
              />
            </div>
            <div class="column">
              <span class="dialog-label q-pb-xs">Currency</span>
              <q-select
                v-model="currency"
                :options="filteredCurrencyOptions"
                dense
                borderless
                style="height: 40px"
                popup-content-class="currency-dropdown"
                behavior="menu"
              >
                <template #selected>
                  <div
                    v-if="currency"
                    dense
                    square
                    color="white"
                    text-color="primary"
                    class="q-ma-none row items-center"
                  >
                    <q-icon :name="currency.icon" size="20px"/>
                    <span class="currency-label q-ml-xs"> {{ currency.label }} </span>
                  </div>
                </template>
                <template #option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    dense
                    class="currency-option q-px-sm row items-center"
                  >
                    <q-icon :name="scope.opt.icon" size="20px"/>
                    <span class="currency-label q-ml-xs">{{ scope.opt.label }}</span>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <div class="column">
            <span class="dialog-price-label"> Fee </span>
            <span class="dialog-fee"> 2.5% </span>
          </div>
          <div class="column">
            <span class="dialog-label q-pb-xs"> Keep active until </span>
            <q-input
              v-model="offerExpirationDate"
              outlined
              dense
              type="date"
              debounce="500"
              class="dialog-date-box"
            />
          </div>
          <q-separator size="2px" color="accent" />
          <div class="column">
            <span class="dialog-price-label"> Total </span>
            <div class="row items-center">
              <q-icon :name="currency.icon" size="24px" />
              <span class="dialog-total q-ml-xs">
                {{ !!offerPrice ? parseInt(offerPrice) : '0.00' }}
              </span>
            </div>
          </div>
          <q-checkbox v-model="acceptTerms">
            <span class="dialog-terms-conditions">
              I agree with the Terms and Conditions
            </span>
          </q-checkbox>
          <div class="row justify-between q-mb-sm">
            <q-btn
              class="dialog-reset"
              no-caps
              outline
              style="color: #3586ff"
              @click="ResetData()"
            >
              <span class="dialog-cancel-gr-text"> Reset </span>
            </q-btn>
            <q-btn
              class="dialog-confirm"
              no-caps
              flat
              :disable="
                !acceptTerms ||
                offerExpirationDate === '' ||
                parseFloat(offerPrice) <= 0 ||
                loadingOffer
              "
              @click="CreateNewOrder()"
            >
              Make offer
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
import { defineComponent, ref } from 'vue';
import {
  CreateERC721Offer,
  CancelSingleOrder,
} from 'src/pages/Metadata/services/Orders';
import { useUserStore } from 'src/stores/user-store';
import { ErrorMessageBuilder, ErrorModel } from 'src/shared/error.msg.helper';
import TxnOngoing from './TxnOngoing.vue';
import { ReturnCurrency } from 'src/shared/currency.helper';
import { Currencies } from 'src/shared/models/entities/currency';

export default defineComponent({
  components: {
    OngoingTransactionDialog: TxnOngoing
  },
  props: {
    orderHash: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    smartContractAddress: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      required: true,
    },
    tokenID: {
      type: String,
      required: true,
    },
    highestOffer: {
      type: String,
      required: true,
    },
    highestOfferCurrency: {
      type: String,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  emits: [
    'remove-offer',
    'outgoing-edit-close',
    'outgoing-error-dialog',
    'offer-created'
  ],
  data() {
    const userStore = useUserStore();
    return {
      userStore,
      offerPrice: '',
      offerExpirationDate: '',
      currency: ref(
        {
          label: 'WIVA',
          value: process.env.WIVA_CURRENCY,
          icon: 'app:WIVA-icon'
        }
      ),
      currencyOptions: [
        {
          label: 'WIVA',
          value: process.env.WIVA_CURRENCY,
          icon: 'app:WIVA-icon'
        },
        {
          label: 'USDC',
          value: process.env.USDC_CURRENCY,
          icon: 'app:USDC-icon'
        },
        {
          label: 'USDT',
          value: process.env.USDT_CURRENCY,
          icon: 'app:USDT-icon'
        }
      ],
      fee: '',
      acceptTerms: false,
      loadingOffer: false,
      ongoingTxn: false,

      ReturnCurrency,
      Currencies
    };
  },
  computed: {
    filteredCurrencyOptions() {
      return this.currencyOptions.filter((option) => option.value !== this.currency.value);
    },
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
    async CreateNewOrder() {
      try {
        this.SetPreventingExitListener(true);
        if (!!this.isEdit) {
          await CancelSingleOrder(this.orderHash, this.userStore.walletAddress);
          this.$emit('remove-offer', this.orderHash);
        }
        try {
          await CreateERC721Offer(
            this.tokenID,
            this.smartContractAddress,
            this.brand,
            this.image,
            this.userStore.walletAddress,
            this.offerPrice,
            <string> this.currency.value,
            this.offerExpirationDate
          );
          this.$emit('offer-created');
        } catch (err) {
          this.BuildErrorDialog(err);
        }
      } catch (err) {
        this.BuildErrorDialog(err);
      } finally {
        this.SetPreventingExitListener(false);
        this.$emit('outgoing-edit-close');
      }
    },
    ResetData() {
      this.offerPrice = '';
      this.offerExpirationDate = '';
      this.acceptTerms = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BuildErrorDialog(err: any) {
      const errorDetails: ErrorModel = ErrorMessageBuilder(err);
      this.$emit('outgoing-error-dialog', errorDetails);
    },
  },
});
</script>

<style></style>
