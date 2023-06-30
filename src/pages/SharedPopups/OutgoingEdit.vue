<template>
  <q-dialog
    v-if="$q.screen.width < 800"
    :maximized="true"
    transition-show="scale"
    transition-hide="scale"
    persistent
    @show="FetchBalances()"
  >
    <q-card class="q-pa-none column no-wrap">
      <q-card-section class="row items-center q-pb-none">
        <div class="dialog-title">
          {{ isEdit ? 'Edit Offer' : 'Bid For' }}
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
          <OfferExpTimer
            v-if="!!highestOffer"
            :time-left="highestOfferExpTime"
          />
          <div v-if="!!highestOffer" class="column">
            <span class="dialog-label q-pb-xs"> Highest Offer </span>
            <div class="row items-center">
              <q-icon :name="`app:${GetCurrencyLabel(highestOfferCurrency)}-icon`" size="20px" />
              <span class="dialog-highest-offer-price q-ml-xs">
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
          <div class="row items-center q-ma-none">
            <span class="dialog-label q-pr-xs">Max Available</span>
            <span class="dialog-label" style="color: #262626"> {{ DisplayBalanceForToken(currency.label) }} </span>
          </div>
          <div class="column">
            <span class="dialog-price-label"> Fee </span>
            <span class="dialog-fee"> 2.5% </span>
          </div>
          <div class="column">
            <span class="dialog-label q-pb-xs"> Keep active until </span>
            <div class="row justify-start" :class="$q.screen.width > 600 ? 'q-gutter-x-xs' : 'q-gutter-x-sm'">
              <q-input
                v-model="offerExpirationDate"
                outlined
                dense
                type="date"
                debounce="500"
                class="input-text"
                style="height: 40px;"
                :style="$q.screen.width > 600 ? 'width: 130px;' : 'width: 140px'"
                :min="GetCurrentDate()"
              />
              <q-input
                v-model="offerExpirationTime"
                outlined
                dense
                type="time"
                debounce="500"
                class="input-text"
                style="width: 120px; height: 40px;"
                :disable="!offerExpirationDate"
                :rules=[CheckExpirationTime]
                :no-error-icon="true"
                :error-message="'Invalid'"
              />
            </div>
          </div>
          <q-separator size="2px" color="accent" />
          <div class="column">
            <span class="dialog-price-label"> Total </span>
            <div class="row items-center">
              <q-icon :name="currency.icon" size="24px" />
              <span class="dialog-total q-ml-xs">
                {{ !!offerPrice ? offerPrice : '0.00' }}
              </span>
            </div>
          </div>
          <div class="row items-center" style="flex-wrap: nowrap">
            <img src="../../assets/info-icon.svg" />
            <span class="dialog-info q-ml-sm">
              You may be asked by Metamask to approve your token.
              Please click on “Default” and then approve.
              This is to give permission to make the trade in the future.
            </span>
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
        class="q-pb-sm"
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
            loadingOffer || !isValidTime
          "
          @click="CreateNewOfferAttempt()"
        >
          Make offer
        </q-btn>
      </div>
    </q-card>
    <OngoingTransactionDialog v-model="ongoingTxn"/>
    <ExpirationInvalid v-model="openInvalidTimeDialog"/>
  </q-dialog>
  <q-dialog
    v-else
    transition-show="scale"
    transition-hide="scale"
    @show="FetchBalances()"
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
          <div v-if="!!highestOffer" class="row items-center justify-between">
            <div class="column">
              <span class="dialog-label q-pb-xs"> Highest Offer </span>
              <div class="row items-center">
                <q-icon :name="`app:${GetCurrencyLabel(highestOfferCurrency)}-icon`" size="20px" />
                <span class="dialog-highest-offer-price q-ml-xs">
                  {{ highestOffer }}
                </span>
              </div>
            </div>
            <OfferExpTimer
              :time-left="highestOfferExpTime"
            />
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
          <div class="row items-center q-ma-none">
            <span class="dialog-label q-pr-xs">Max Available</span>
            <span class="dialog-label" style="color: #262626"> {{ DisplayBalanceForToken(currency.label) }} </span>
          </div>
          <div class="column">
            <span class="dialog-price-label"> Fee </span>
            <span class="dialog-fee"> 2.5% </span>
          </div>
          <div class="column">
            <span class="dialog-label q-pb-xs"> Keep active until </span>
            <div class="row justify-start q-gutter-x-md">
              <q-input
                v-model="offerExpirationDate"
                outlined
                dense
                type="date"
                debounce="500"
                class="input-text"
                style="width: 150px;"
                :min="GetCurrentDate()"
              />
              <q-input
                v-model="offerExpirationTime"
                outlined
                dense
                type="time"
                debounce="500"
                class="input-text"
                style="width: 120px;"
                :disable="!offerExpirationDate"
                :rules=[CheckExpirationTime]
                :no-error-icon="true"
                :error-message="'Invalid'"
              />
            </div>
          </div>
          <q-separator size="2px" color="accent" />
          <div class="column">
            <span class="dialog-price-label"> Total </span>
            <div class="row items-center">
              <q-icon :name="currency.icon" size="24px" />
              <span class="dialog-total q-ml-xs">
                {{ !!offerPrice ? offerPrice : '0.00' }}
              </span>
            </div>
          </div>
          <div class="row items-center" style="flex-wrap: nowrap">
            <img src="../../assets/info-icon.svg" />
            <span class="dialog-info q-ml-sm">
              You may be asked by Metamask to approve your token.
              Please click on “Default” and then approve.
              This is to give permission to make the trade in the future.
            </span>
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
              no-caps
              flat
              :disable="
                !acceptTerms ||
                offerExpirationDate === '' ||
                parseFloat(offerPrice) <= 0 ||
                loadingOffer || !isValidTime
              "
              @click="CreateNewOfferAttempt()"
            >
              Make offer
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <OngoingTransactionDialog v-model="ongoingTxn"/>
    <ExpirationInvalid v-model="openInvalidTimeDialog"/>
  </q-dialog>
</template>

<script lang="ts">
import 'src/css/Profile/Component/dialog.css';
import { defineComponent, ref } from 'vue';
import {
  CreateERC721Offer,
  CancelSingleOrder,
  isInputDateTimeAboveCurrentTime,
} from 'src/pages/Metadata/services/Orders';
import { useUserStore } from 'src/stores/user-store';
import { ErrorMessageBuilder, ErrorModel } from 'src/shared/error.msg.helper';
import TxnOngoing from './TxnOngoing.vue';
import { FormatNumber, GetCurrencyLabel } from 'src/shared/currency.helper';
import { Currencies } from 'src/shared/models/entities/currency';
import { GetCurrentDate, GetValidTime } from 'src/shared/date.helper';
import OrderExpTimer from './OrderExpTimer.vue';
import { GetBalanceByCurrency } from 'src/shared/balanceAndApprovals';
import { GetWeb3Provider } from 'src/shared/web3.helper';
import ExpirationInvalid from './ExpirationInvalid.vue';
import { UserModel } from 'src/components/models';

export default defineComponent({
  components: {
    OngoingTransactionDialog: TxnOngoing,
    OfferExpTimer: OrderExpTimer,
    ExpirationInvalid: ExpirationInvalid
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
    highestOfferExpTime: {
      type: Number,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
  },
  emits: [
    'remove-offer',
    'outgoing-edit-close',
    'outgoing-error-dialog',
    'offer-created',
		'open-terms-and-conditions',
    'open-kyc-dialog'
  ],
  data() {
    const userStore = useUserStore();
    return {
      userStore,
      offerPrice: '',
      offerExpirationDate: '',
      offerExpirationTime: '',
      isValidTime: false,
      openInvalidTimeDialog: false,
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

      GetCurrencyLabel,
      Currencies,

      GetCurrentDate,
      GetValidTime,

      usdtBalance: '',
      usdcBalance: '',
      wivaBalance: '',
      FormatNumber,

      openKYC: false
    };
  },
  computed: {
    filteredCurrencyOptions() {
      return this.currencyOptions.filter((option) => option.value !== this.currency.value);
    },
  },
  watch: {
    offerExpirationDate: {
      handler() {
        this.offerExpirationTime = '';
      }
    }
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
    async CreateNewOfferAttempt() {
      if (!this.userStore.user) throw 'Connect Wallet and Login';
      const isValidExpTime = isInputDateTimeAboveCurrentTime(this.offerExpirationDate, this.offerExpirationTime);
      if (!isValidExpTime) {
        this.isValidTime = false;
        this.openInvalidTimeDialog = true;
        setTimeout(() => {
          this.openInvalidTimeDialog = false;
        }, 2000);
        return;
      };

      this.SetPreventingExitListener(true);
      this.CreateOffer();
    },

    async CreateOffer() {
      try {
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
            this.offerExpirationDate,
            this.offerExpirationTime,
            <UserModel> this.userStore.user
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
    CheckExpirationTime() {
      const isValid = GetValidTime(this.offerExpirationDate, this.offerExpirationTime);
      this.isValidTime = isValid;
      return isValid;
    },
    DisplayBalanceForToken(tokenLabel: string) {
      switch (tokenLabel) {
        case 'USDC':
          if (this.usdcBalance) {
            return `${this.usdcBalance} USDC`;
          }
          return '00.00 USDC';
        case 'USDT':
          if (this.usdtBalance) {
            return `${this.usdtBalance} USDT`;
          }
          return '00.00 USDT';
        default:
          if (this.wivaBalance) {
            return `${this.wivaBalance} WIVA`
          }
          return '00.00 WIVA'
      }
    },
    async FetchBalances() {
			const web3Provider = await GetWeb3Provider();
      const signer = web3Provider.getSigner();
      if (!!signer) {
        const [wivaBalance, usdtBalance, usdcBalance] = await Promise.all([
          GetBalanceByCurrency(<string> process.env.WIVA_CURRENCY, signer, this.userStore.walletAddress),
          GetBalanceByCurrency(<string> process.env.USDT_CURRENCY, signer, this.userStore.walletAddress),
          GetBalanceByCurrency(<string> process.env.USDC_CURRENCY, signer, this.userStore.walletAddress)
        ]);
        this.wivaBalance = wivaBalance ? FormatNumber(wivaBalance) : '';
        this.usdtBalance = usdtBalance ? FormatNumber(usdtBalance) : '';
        this.usdcBalance = usdcBalance ? FormatNumber(usdcBalance) : '';
      };
    }
  },
});
</script>

<style></style>
