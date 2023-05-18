<template>
  <q-dialog
    v-if="$q.screen.width < 800"
    :maximized="true"
    transition-show="scale"
    transition-hide="scale"
    persistent
  >
    <q-card class="q-pa-none column no-wrap">
      <q-card-section class="row items-center q-pb-lg">
        <div class="dialog-title">
          {{ !isEdit ? 'List' : 'Edit Listing' }}
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
          <div class="row full-width">
            <div class="column q-mr-md" style="width: 125px">
              <span class="dialog-label q-pb-xs">Your price</span>
              <q-input
                v-model="listingPrice"
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
            <span class="dialog-label q-pb-xs"> Expiration date </span>
            <div class="row justify-start" :class="$q.screen.width > 600 ? 'q-gutter-x-xs' : 'q-gutter-x-sm'">
              <q-input
                v-model="listingExpirationDate"
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
                v-model="listingExpirationTime"
                outlined
                dense
                type="time"
                debounce="500"
                class="input-text"
                style="width: 120px; height: 40px;"
                :disable="!listingExpirationDate"
                :rules=[CheckExpirationTime]
                :no-error-icon="true"
                :error-message="'Invalid'"
              />
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
              <q-icon :name="currency.icon" size="24px" />
              <span class="dialog-total q-ml-xs">
                {{ !!listingPrice ? listingPrice : '0.00' }}
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
          unelevated
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
            listingExpirationDate === '' ||
            parseFloat(listingPrice) <= 0 ||
            loadingListing || !isValidTime
          "
          @click="CreateNewOrder()"
        >
          {{ !isEdit ? 'List the NFT' : 'Update' }}
        </q-btn>
      </div>
    </q-card>
    <OngoingTransactionDialog v-model="ongoingTxn"/>
    <ExpirationInvalid v-model="openInvalidTimeDialog"/>
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
        <div class="dialog-title">
          {{ !isEdit ? 'List' : 'Edit Listing' }}
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
          <div class="row full-width">
            <div class="column q-mr-md" style="width: 30%">
              <span class="dialog-label q-pb-xs">Your price</span>
              <q-input
                v-model="listingPrice"
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
            <span class="dialog-label q-pb-xs"> Expiration date </span>
            <div class="row justify-start q-gutter-x-md">
              <q-input
                v-model="listingExpirationDate"
                outlined
                dense
                type="date"
                debounce="500"
                class="input-text"
                style="width: 150px;"
                :min="GetCurrentDate()"
              />
              <q-input
                v-model="listingExpirationTime"
                outlined
                dense
                type="time"
                debounce="500"
                class="input-text"
                style="width: 120px;"
                :disable="!listingExpirationDate"
                :rules=[CheckExpirationTime]
                :no-error-icon="true"
                :error-message="'Invalid'"
              />
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
              <q-icon :name="currency.icon" size="24px" />
              <span class="dialog-total q-ml-xs">
                {{ !!listingPrice ? listingPrice : '0.00' }}
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
              unelevated
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
                listingExpirationDate === '' ||
                parseFloat(listingPrice) <= 0 ||
                loadingListing || !isValidTime
              "
              @click="CreateNewOrder()"
            >
              {{ !isEdit ? 'List the NFT' : 'Update' }}
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
  CreateERC721Listing,
  CancelSingleOrder,
  InspectListingStatus,
  isInputDateTimeAboveCurrentTime
} from 'src/pages/Metadata/services/Orders';
import { useUserStore } from 'src/stores/user-store';
import { useListingStore } from 'src/stores/listing-store';
import { ErrorMessageBuilder, ErrorModel } from 'src/shared/error.msg.helper';
import { ListableToken } from 'src/shared/models/entities/NFT.model';
import { GetCurrentDate, GetValidTime } from 'src/shared/date.helper';
import { share } from 'pinia-shared-state';
import TxnOngoing from './TxnOngoing.vue';
import ExpirationInvalid from './ExpirationInvalid.vue';
export default defineComponent({
  components: {
    OngoingTransactionDialog: TxnOngoing,
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
    isEdit: {
      type: Boolean,
      required: true,
    },
  },
  emits: [
    'remove-listing',
    'listable-nft-listed',
    'listing-edit-close',
    'listing-error-dialog',
    'listing-exists'
  ],
  data() {
    const userStore = useUserStore();
    const listingsStore = useListingStore();
    return {
      userStore,
      listingsStore,
      listingPrice: '',
      listingExpirationDate: '',
      listingExpirationTime: '',
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
      ongoingTxn: false,

      GetCurrentDate,
      GetValidTime
    };
  },
  computed: {
    loadingListing() {
      if (!!this.acceptTerms) {
        const nftKey = `${this.tokenID},${this.smartContractAddress},${this.network}`;
        return this.listingsStore.getNFTListingStatus(nftKey);
      } else {
        return false
      }
    },
    filteredCurrencyOptions() {
      return this.currencyOptions.filter((option) => option.value !== this.currency.value);
    },
  },
  watch: {
    listingExpirationDate: {
      handler() {
        this.listingExpirationTime = '';
      }
    }
  },
  mounted() {
    share('ongoingListings', useListingStore(), { initialize: true });
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
      const isValidExpTime = isInputDateTimeAboveCurrentTime(this.listingExpirationDate, this.listingExpirationTime);
      if (!isValidExpTime) {
        this.isValidTime = false;
        this.openInvalidTimeDialog = true;
        setTimeout(() => {
          this.openInvalidTimeDialog = false;
        }, 2000);
        return;
      }
      const nftKey = `${this.tokenID},${this.smartContractAddress},${this.network}`;
      this.SetPreventingExitListener(true);
      try {
        if (!!this.isEdit) {
          await CancelSingleOrder(this.orderHash, this.userStore.walletAddress);
          this.$emit('remove-listing', this.orderHash);
        } else {
          const existingListing = await InspectListingStatus({
            contractAddress: this.smartContractAddress,
            network: this.network,
            identifierOrCriteria: this.tokenID
          })
          if (!!existingListing) {
            this.$emit('listing-exists', {
              ...existingListing,
              contractAddress: this.smartContractAddress,
              identifierOrCriteria: this.tokenID,
              network: this.network
            });
            return
          }
        }
        try {
          if (!this.loadingListing) {
            this.AddListingStatusState(nftKey);
          }
          await CreateERC721Listing(
            this.tokenID,
            this.smartContractAddress,
            this.brand,
            this.image,
            this.userStore.walletAddress,
            this.listingPrice,
            <string> this.currency.value,
            this.listingExpirationDate,
            this.listingExpirationTime
          );
          if (!this.isEdit) {
            const token: ListableToken = {
              contractAddress: this.smartContractAddress,
              network: this.network,
              identifierOrCriteria: this.tokenID,
              image: this.image,
              brand: this.brand,
              listingPrice: this.listingPrice,
              listingCurrency: this.currency.value
            };
            this.$emit('listable-nft-listed', token);
          } else {
            this.$emit('listable-nft-listed');
          }
        } catch (err) {
          this.BuildErrorDialog(err);
        }
      } catch (err) {
        this.BuildErrorDialog(err);
      } finally {
        this.SetPreventingExitListener(false);
        this.RemoveListingStatusState(nftKey);
        this.$emit('listing-edit-close');
      }
    },
    AddListingStatusState(nftKey: string) {
      // console.log('adding..')
      this.listingsStore.setNFTListingStatus(nftKey);
    },
    RemoveListingStatusState(nftKey: string) {
      // console.log('deleting..')
      this.listingsStore.removeNFTListingStatus(nftKey);
      this.loadingListing = false;
    },
    ResetData() {
      this.listingPrice = '';
      this.listingExpirationDate = '';
      this.acceptTerms = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BuildErrorDialog(err: any) {
      const errorDetails: ErrorModel = ErrorMessageBuilder(err);
      this.$emit('listing-error-dialog', errorDetails);
    },
    CheckExpirationTime() {
      const isValid = GetValidTime(this.listingExpirationDate, this.listingExpirationTime);
      this.isValidTime = isValid;
      return isValid;
    }
  },
});
</script>

<style></style>
