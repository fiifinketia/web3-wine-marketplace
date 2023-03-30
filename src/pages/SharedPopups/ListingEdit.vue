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

      <span class="dialog-subtitle" style="align-self: center">{{
        brand
      }}</span>

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
          <div class="column">
            <span class="dialog-label">Your price</span>
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
            <span class="dialog-label"> Expiration date </span>
            <q-input
              v-model="listingExpirationDate"
              outlined
              dense
              type="date"
              debounce="500"
              class="dialog-date-box"
            />
          </div>
          <div class="column">
            <span class="dialog-label"> Fee </span>
            <span class="dialog-fee"> 2.5% </span>
          </div>
          <q-separator size="2px" color="accent" />
          <div class="column">
            <span class="dialog-label"> Total </span>
            <span class="dialog-total">
              {{ !!listingPrice ? parseInt(listingPrice) : '0.00' }}
            </span>
          </div>
          <div class="row items-center" style="flex-wrap: nowrap">
            <img src="../../assets/info-icon.svg" />
            <span class="dialog-info q-ml-sm">
              After the expiration, the NFT will be removed from the listing and
              will be available for listing in DWC.
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
            loadingOffer
          "
          @click="CreateNewOrder()"
        >
          {{ !isEdit ? 'List the NFT' : 'Update' }}
        </q-btn>
      </div>
    </q-card>
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
          <div class="column">
            <span class="dialog-label">Your price</span>
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
            <span class="dialog-label"> Expiration date </span>
            <q-input
              v-model="listingExpirationDate"
              outlined
              dense
              type="date"
              debounce="500"
              class="dialog-date-box"
            />
          </div>
          <div class="column">
            <span class="dialog-label"> Fee </span>
            <span class="dialog-fee"> 2.5% </span>
          </div>
          <q-separator size="2px" color="accent" />
          <div class="column">
            <span class="dialog-label"> Total </span>
            <span class="dialog-total">
              {{ !!listingPrice ? parseInt(listingPrice) : '0.00' }}
            </span>
          </div>
          <div class="row items-center" style="flex-wrap: nowrap">
            <img src="../../assets/info-icon.svg" />
            <span class="dialog-info q-ml-sm">
              After the expiration, the NFT will be removed from the listing and
              will be available for listing in DWC.
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
                loadingOffer
              "
              @click="CreateNewOrder()"
            >
              {{ !isEdit ? 'List the NFT' : 'Update' }}
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import 'src/css/Profile/Component/dialog.css';
import { defineComponent } from 'vue';
import {
  CreateERC721Listing,
  CancelSingleOrder,
} from 'src/pages/Metadata/services/Orders';
import { useUserStore } from 'src/stores/user-store';
import { ErrorMessageBuilder, ErrorModel } from 'src/shared/error.msg.helper';
import { ListableToken } from 'src/shared/models/entities/NFT.model';
export default defineComponent({
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
  ],
  data() {
    const userStore = useUserStore();
    return {
      userStore,
      listingPrice: '',
      listingExpirationDate: '',
      fee: '',
      acceptTerms: false,
    };
  },
  methods: {
    async CreateNewOrder() {
      try {
        if (!!this.isEdit) {
          await CancelSingleOrder(this.orderHash, this.userStore.walletAddress);
          this.$emit('remove-listing', this.orderHash);
        }
        try {
          await CreateERC721Listing(
            this.tokenID,
            this.smartContractAddress,
            this.brand,
            this.image,
            this.userStore.walletAddress,
            this.listingPrice,
            this.listingExpirationDate
          );
          if (!this.isEdit) {
            const token: ListableToken = {
              contractAddress: this.smartContractAddress,
              network: this.network,
              identifierOrCriteria: this.tokenID,
              image: this.image,
              brand: this.brand,
              listingPrice: this.listingPrice,
            };
            this.$emit('listable-nft-listed', token);
          }
        } catch (err) {
          this.BuildErrorDialog(err);
        }
      } catch (err) {
        this.BuildErrorDialog(err);
      } finally {
        this.$emit('listing-edit-close');
      }
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
  },
});
</script>

<style></style>
