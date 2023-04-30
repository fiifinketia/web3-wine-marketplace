<template>
  <div class="column justify-center items-center q-mt-xl">
    <div class="brand-name">{{ nft.brand }}</div>
    <div class="wine-name">{{ nft.name }}</div>
    <div
      :class="
        $q.screen.width > 600
          ? 'row justify-center q-pt-lg q-px-sm metadata-container'
          : 'column items-center metadata-container'
      "
    >
      <img :src="nft.image" class="metadata-nft-image" />

      <div class="column nft-takeaways-container q-pa-sm">
        <div class="row">
          <q-img
            src="../../../../public/images/profile-icon.svg"
            width="40px"
            height="40px"
            style="border-radius: 50%"
          />
          <div class="column q-pl-sm">
            <div class="owned-by">Owned by</div>
            <div class="user-id">WiV</div>
          </div>
        </div>
        <div id="metadata-details" class="q-py-md">
          <div v-if="$q.screen.width > 600" class="row justify-between q-pb-sm">
            <span class="metadata-text">{{ nft.type }} wine</span>
            <q-separator spaced="md" size="1px" vertical color="accent" />
            <span class="metadata-text">{{ nft.maturity }} yrs</span>
            <q-separator spaced="md" size="1px" vertical color="accent" />
            <span class="metadata-text">{{ nft.productionCountry }}</span>
            <q-separator spaced="md" size="1px" vertical color="accent" />
            <span class="metadata-text">{{ nft.region }}</span>
          </div>
          <div v-else class="column justify-start q-pb-lg q-gutter-y-sm">
            <div class="row">
              <span class="metadata-text">{{ nft.type }} wine</span>
              <q-separator spaced="lg" size="1px" vertical color="accent" />
              <span class="metadata-text">{{ nft.maturity }} yrs</span>
            </div>
            <div class="row">
              <span class="metadata-text">{{ nft.productionCountry }}</span>
              <q-separator spaced="lg" size="1px" vertical color="accent" />
              <span class="metadata-text">{{ nft.region }}</span>
            </div>
          </div>
          <div class="wine-description">
            {{ nft.description || 'No description' }}
          </div>
          <div
            class="q-pt-lg metadata-price-wrapper"
            :class="$q.screen.width > 600 ? '' : 'q-gutter-y-sm'"
          >
            <div
              v-if="nft.listingDetails.expTime"
              :class="$q.screen.width > 600 ? '' : 'column items-center'"
              style="margin-bottom: 14px;"
            >
              <ListingExpTimer
                :time-left="nft.listingDetails.expTime"
                style="max-width: 500px;"
              />
            </div>
            <div
							id="metadata-listing-price"
              class="column"
              :class="$q.screen.width > 600 ? 'items-start' : 'items-center'"
            >
              <div class="starting-from">Price</div>
              <div
                v-if="!!ongoingListingTransaction || nft.listingDetails.transactionStatus == false"
                class="row items-center"
              >
                <q-img src="../../../assets/processing.svg" width="30px" />
                <div class="price1-blue">Processing price</div>
              </div>
              <div
                v-else-if="
                  !!nft.listingDetails.listingPrice &&
                  !!nft.listingDetails.transactionStatus
                "
                class="row items-center"
              >
                <q-icon :name="`app:${GetCurrencyLabel(nft.listingDetails.currency)}-icon`" size="28px"/>
                <span class="price1 q-pl-sm"> {{ nft.listingDetails.listingPrice }} </span>
              </div>
              <div
                v-else-if="nft.listingDetails.listingPrice == null"
                class="row items-center"
              >
                <div class="price1">Not Available</div>
              </div>
              <div v-else class="row items-center">
                <q-img src="../../../assets/processing.svg" width="30px" />
                <div class="price1-blue">Processing price</div>
              </div>
            </div>
            <div
							id="metadata-bidding-price"
              class="column"
              :class="$q.screen.width > 600 ? 'items-start' : 'items-center'"
            >
              <div class="bid-text">Highest bid from</div>
              <div class="row items-center q-pt-sm">
                <q-icon
                  v-if="!!nft.offerDetails.highestBid"
                  :name="`app:${GetCurrencyLabel(nft.offerDetails.highestBidCurrency)}-icon`"
                  size="20px"
                />
                <span class="bid-price q-pl-sm"> {{ nft.offerDetails.highestBid || '--.--' }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="$q.screen.width > 600 ? 'q-pt-lg' : 'full-width'">
      <div v-if="nft.isOwner" class="column items-center full-width q-px-md">
        <q-btn
          v-if="nft.listingDetails.transactionStatus == null"
          class="list-cancel-fulfill-btn items-center justify-center metadata-btn-text"
          no-caps
          flat
          @click="openCreateListingDialog = true"
        >
          List For Sale
        </q-btn>
        <q-btn
          v-else
          :disable="nft.listingDetails.transactionStatus == false"
          class="unlist-btn items-center justify-center metadata-btn-text_outline"
          no-caps
          outline
          flat
          @click="openDeleteListingDialog = true"
        >
          Unlist
        </q-btn>
      </div>
      <div
        v-else
				id="metadata-checkout-buttons"
        :class="
          $q.screen.width > 600
            ? 'row q-gutter-x-md'
            : 'column items-center full-width q-px-md q-gutter-y-sm'
        "
      >
        <q-btn
          class="list-cancel-fulfill-btn items-center justify-center metadata-btn-text"
          no-caps
          flat
          :disable="
            !nft.listingDetails?.orderHash ||
            !nft.listingDetails?.transactionStatus
          "
          @click="openPurchaseListingDialog = true"
        >
          Buy now
        </q-btn>
        <q-btn
          no-caps
          flat
          class="offer-btn items-center justify-center metadata-btn-text"
          @click="OpenOfferDialog()"
        >
          Make an offer
        </q-btn>
      </div>
    </div>
    <q-btn
      class="q-pt-lg"
      flat
      unelevated
      dense
      no-caps
      @click="RefreshMetadataPage()"
    >
      <div class="row items-center q-gutter-x-xs">
        <span class="update-metadata-text">Update metadata</span>
        <img src="../../../../public/images/refresh.svg" style="width: 24px" />
      </div>
    </q-btn>

    <CreateListingDialog
      v-model="openCreateListingDialog"
      :brand="nft.brand"
      :image="nft.image"
      :network="nft.network"
      :smart-contract-address="nft.smartContractAddress"
      :token-i-d="nft.tokenID"
      :is-edit="false"
      @listing-edit-close="openCreateListingDialog = false"
      @listing-error-dialog="HandleError"
      @listable-nft-listed="SetTimeoutOnMetadataCompletedDialog('listing')"
      @listing-exists="listed => UpdateListingStatus(listed)"
    />

    <CreateOfferDialog
      v-model="openCreateOfferDialog"
      :brand="nft.brand"
      :highest-offer="nft.offerDetails.highestBid"
      :highest-offer-currency="nft.offerDetails.highestBidCurrency"
      :highest-offer-exp-time="nft.offerDetails.highestBidExpTime"
      :image="nft.image"
      :network="nft.network"
      :smart-contract-address="nft.smartContractAddress"
      :token-i-d="nft.tokenID"
      :is-edit="false"
      @outgoing-edit-close="openCreateOfferDialog = false"
      @outgoing-error-dialog="HandleError"
      @offer-created="SetTimeoutOnMetadataCompletedDialog('offer')"
    />

    <DeleteListingDialog
      v-model="openDeleteListingDialog"
      :order-hash="nft.listingDetails.orderHash"
      @listing-delete-close="openDeleteListingDialog = false"
      @listing-error-dialog="HandleError"
    />

    <OrderProcessed
      v-model="openOrderCompletedDialog"
      :order-type="orderType"
    />

    <ErrorDialog
      v-model="openErrorDialog"
      :error-type="errorType"
      :error-title="errorTitle"
      :error-message="errorMessage"
    />

    <PurchaseListingDialog
      v-model="openPurchaseListingDialog"
      :brand="nft.brand"
      :image="nft.image"
      :listing-currency="nft.listingDetails.currency"
      :listing-price="nft.listingDetails.listingPrice"
      :order-hash="nft.listingDetails.orderHash"
      :wallet-address="walletAddress"
      :listing-exp-date="nft.listingDetails.expTime"
      @listing-purchase-error="HandleError"
      @listing-purchased="PurchaseListingSuccess"
    />

    <AcceptedOrderDialog
      v-model="openOrderAccepted"
      :order-accepted="'listing'"
    />
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { NFTWithListingAndFavorites } from '../models/Metadata';
import 'src/css/Metadata/WineMetadata.css';
import ListingEdit from 'src/pages/SharedPopups/ListingEdit.vue';
import { mapState } from 'pinia';
import { useUserStore } from 'src/stores/user-store';
import OrderProcessed from 'src/pages/SharedPopups/OrderProcessed.vue';
import ProfileErrors from 'src/pages/SharedPopups/ProfileErrors.vue';
import OrderAccepted from 'src/pages/SharedPopups/OrderAccepted.vue';
import OutgoingEdit from 'src/pages/SharedPopups/OutgoingEdit.vue';
import ListingUnlist from 'src/pages/SharedPopups/ListingUnlist.vue';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
import { GetCurrencyLabel } from 'src/shared/currency.helper';
import PurchaseListing from 'src/pages/SharedPopups/PurchaseListing.vue';
import OrderExpTimer from 'src/pages/SharedPopups/OrderExpTimer.vue';

export default defineComponent({
  name: 'WineMetadata',
  components: {
    CreateListingDialog: ListingEdit,
    CreateOfferDialog: OutgoingEdit,
    DeleteListingDialog: ListingUnlist,

    OrderProcessed: OrderProcessed,
    ErrorDialog: ProfileErrors,
    AcceptedOrderDialog: OrderAccepted,
    PurchaseListingDialog: PurchaseListing,
    ListingExpTimer: OrderExpTimer
  },
  props: {
    nft: {
      type: Object as PropType<NFTWithListingAndFavorites>,
      required: true,
    },
  },
  emits: ['openWallet', 'refresh-metadata', 'connect-wallet', 'listing-exists', 'nft-listed'],
  data() {
    return {
      openCreateListingDialog: false,
      openDeleteListingDialog: false,
      openCreateOfferDialog: false,
      openOrderCompletedDialog: false,
      openErrorDialog: false,
      openPurchaseListingDialog: false,
      openOrderAccepted: false,

      errorType: '',
      errorTitle: '',
      errorMessage: '',

      orderType: '',

      ongoingListingTransaction: false,

      GetCurrencyLabel
    };
  },
  computed: {
    ...mapState(useUserStore, {
      walletAddress: store => store.getWalletAddress(),
    }),
  },
  watch: {
    walletAddress: {
      handler(val: string | null) {
        if (!!val) {
          this.$emit('refresh-metadata');
        }
      },
    },
  },
  methods: {
    OpenOfferDialog() {
      if (!this.walletAddress) {
        this.$emit('connect-wallet');
        return;
      } else {
        this.openCreateOfferDialog = true;
      }
    },
    SetTimeoutOnMetadataCompletedDialog(orderType: string) {
      this.orderType = orderType;
      if (orderType == 'listing') {
        this.$emit('nft-listed');
        this.ongoingListingTransaction = true;
      }
      this.openOrderCompletedDialog = true;
      setTimeout(() => {
        this.openOrderCompletedDialog = false;
      }, 3000);
    },
    HandleError(err: {
      errorType: string;
      errorTitle: string;
      errorMessage: string;
    }) {
      this.errorType = err.errorType;
      this.errorTitle = err.errorTitle;
      this.errorMessage = err.errorMessage;
      this.openErrorDialog = true;
      setTimeout(() => {
        this.openErrorDialog = false;
      }, 2000);
    },
    async PurchaseListingSuccess() {
      this.openPurchaseListingDialog = false;
      this.openOrderAccepted = true;
      setTimeout(() => {
        this.openOrderAccepted = false;
      }, 2500);
    },
    UpdateListingStatus(listed: TokenIdentifier & { listingPrice: string, currency: string, transactionStatus: boolean }) {
      this.$emit('listing-exists', listed);
    },
    RefreshMetadataPage() {
      this.$emit('refresh-metadata');
    }
  },
});
</script>

<style scoped>
:deep(.q-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
