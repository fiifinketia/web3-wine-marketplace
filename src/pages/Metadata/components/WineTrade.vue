<template>
  <div
    class="flex column justify-center items-center q-mt-xl"
    @click="openModal === true ? 'modal' : 'content'"
  >
    <div class="brand-name">{{ nft.brand }}</div>
    <div class="wine-name">{{ nft.name }}</div>
    <div class="row q-pt-lg metadata-container">
      <div class="metadata-nft-container col-sm-6 col-xs-12">
        <q-img :src="nft.image" class="picture" />
      </div>

      <div class="column info col-sm-6 col-xs-12 q-pa-sm">
        <div class="flex row">
          <q-img
            src="../../../../public/images/profile-icon.svg"
            width="40px"
            height="40px"
            style="border-radius: 50%"
          />
          <div class="flex column q-pl-sm">
            <div class="owned-by">Owned by</div>
            <div class="user-id">WiV</div>
          </div>
        </div>
        <div class="metadata q-py-md">
          <div class="row justify-between q-pb-sm">
            <div class="metadata-text">{{ nft.type }} wine</div>
            <q-separator spaced="md" size="1px" vertical color="accent" />
            <div class="metadata-text">{{ nft.maturity }} yrs</div>
            <q-separator spaced="md" size="1px" vertical color="accent" />
            <div class="metadata-text">{{ nft.productionCountry }}</div>
            <q-separator spaced="md" size="1px" vertical color="accent" />
            <div class="metadata-text">{{ nft.region }}</div>
          </div>
          <div class="wine-description">
            {{ nft.description || 'No description' }}
          </div>
          <div class="q-pt-lg metadata-price-wrapper">
            <div class="flex column">
              <div class="starting-from">Price</div>
              <div
                v-if="!!ongoingListingTransaction"
                class="flex row items-center"
              >
                <q-img src="../../../assets/processing.svg" width="30px" />
                <div class="price1-blue">Processing price</div>
              </div>
              <div
                v-else-if="
                  !!nft.listingDetails?.listingPrice &&
                  !!nft.listingDetails.transactionStatus
                "
                class="flex row items-center"
              >
                <div>
                  <q-img src="../../../assets/usdc.svg" width="28px" />
                </div>
                <div class="price1">
                  {{ nft.listingDetails?.listingPrice }}
                </div>
              </div>
              <div
                v-else-if="nft.listingDetails?.listingPrice == null"
                class="flex row items-center"
              >
                <div class="price1">Not Available</div>
              </div>
              <div v-else class="flex row items-center">
                <q-img src="../../../assets/processing.svg" width="30px" />
                <div class="price1-blue">Processing price</div>
              </div>
            </div>
            <div class="flex column">
              <div class="bid-text">Highest bid from</div>
              <div class="flex row items-center q-pt-sm">
                <div>
                  <q-img src="../../../assets/usdc.svg" width="20px" />
                </div>
                <div class="bid-price1">
                  {{ nft.offerDetails?.highestBid || '--.--' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="walletAddress" class="q-pt-lg row modal-container">
      <div
        v-if="nft.isOwner"
        class="q-pt-lg flex row justify-center modal-container"
      >
        <div v-if="!nft.listingDetails.orderHash" class="q-pr-sm">
          <q-btn
            class="buy-now-button flex items-center justify-center cursor-pointer buy-now-text"
            no-caps
            flat
            @click="openCreateListingDialog = true"
          >
            List For Sale
          </q-btn>
        </div>
        <div v-else class="q-pr-sm">
          <q-btn
            class="buy-now-button_outline flex items-center justify-center cursor-pointer buy-now-text_outline"
            no-caps
            outline
            flat
            @click="openDeleteListingDialog = true"
          >
            Unlist
          </q-btn>
        </div>
      </div>
      <div v-else class="row metadata-button-container">
        <q-btn
          class="buy-now-button flex items-center justify-center cursor-pointer buy-now-text"
          no-caps
          flat
          :disable="
            !nft.listingDetails.orderHash ||
            !nft.listingDetails.transactionStatus
          "
          @click="openConfirmDialog = true"
        >
          Buy now
        </q-btn>
        <q-btn
          no-caps
          flat
          class="make-offer-button flex items-center justify-center cursor-pointer buy-now-text"
          @click="openCreateOfferDialog = true"
        >
          Make an offer
        </q-btn>
      </div>
    </div>
    <div v-else class="q-pt-lg row modal-container">
      <div class="q-pr-sm text-warning text-bold">
        Please Connect Wallet to view actions.
      </div>
    </div>
    <button class="q-mt-lg row items-center update-metadata-button" flat>
      <div class="q-pr-sm cursor-pointer">
        <q-img src="../../../../public/images/refresh.svg" width="24px" />
      </div>
      <div class="update-metadata-text">Update metadata</div>
    </button>

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
      @listable-nft-listed="SetTimeoutOnCompletedDialog('listing')"
    />

    <CreateOfferDialog
      v-model="openCreateOfferDialog"
      :brand="nft.brand"
      :highest-offer="nft.offerDetails.highestBid"
      :highest-offer-currency="nft.offerDetails.highestBidCurrency"
      :image="nft.image"
      :network="nft.network"
      :smart-contract-address="nft.smartContractAddress"
      :token-i-d="nft.tokenID"
      :is-edit="false"
      @outgoing-edit-close="openCreateOfferDialog = false"
      @outgoing-error-dialog="HandleError"
      @offer-created="SetTimeoutOnCompletedDialog('offer')"
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

    <ConfirmOrderDialog
      v-model="openConfirmDialog"
      :order-hash="nft.listingDetails.orderHash"
      :brand="nft.brand"
      :image="nft.image"
      :token="{
        identifierOrCriteria: nft.tokenID,
        contractAddress: nft.smartContractAddress,
        network: nft.network
      }"
      @accept-offer="
        req => AcceptOffer(req.orderHash, req.brand, req.image, req.token)
      "
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
import '../../../css/Metadata/WineMetadata.css';
import ListingEdit from 'src/pages/SharedPopups/ListingEdit.vue';
import { mapState } from 'pinia';
import { useUserStore } from 'src/stores/user-store';
import OrderProcessed from 'src/pages/SharedPopups/OrderProcessed.vue';
import ProfileErrors from 'src/pages/SharedPopups/ProfileErrors.vue';
import AcceptOffer from 'src/pages/SharedPopups/AcceptOffer.vue';
import { FulfillBasicOrder } from '../services/Orders';
import OrderAccepted from 'src/pages/SharedPopups/OrderAccepted.vue';
import OutgoingEdit from 'src/pages/SharedPopups/OutgoingEdit.vue';
import ListingUnlist from 'src/pages/SharedPopups/ListingUnlist.vue';

export default defineComponent({
  name: 'WineMetadata',
  components: {
    CreateListingDialog: ListingEdit,
    CreateOfferDialog: OutgoingEdit,
    DeleteListingDialog: ListingUnlist,

    OrderProcessed: OrderProcessed,
    ErrorDialog: ProfileErrors,
    ConfirmOrderDialog: AcceptOffer,
    AcceptedOrderDialog: OrderAccepted
  },
  props: {
    nft: {
      type: Object as PropType<NFTWithListingAndFavorites>,
      required: true,
    },
  },
  emits: ['openWallet'],
  data() {
    return {
      openCreateListingDialog: false,
      openDeleteListingDialog: false,
      openCreateOfferDialog: false,
      openOrderCompletedDialog: false,
      openErrorDialog: false,
      openConfirmDialog: false,
      openOrderAccepted: false,

      errorType: '',
      errorTitle: '',
      errorMessage: '',

      orderType: '',

      ongoingListingTransaction: false
    }
  },
  computed: {
    ...mapState(useUserStore, {
      walletAddress: store => store.getWalletAddress
    }),
  },
  methods: {
    SetTimeoutOnCompletedDialog(orderType: string) {
      this.orderType = orderType;
      if (orderType == 'listing') {
        this.ongoingListingTransaction = true;
      }
      this.openOrderCompletedDialog = true;
      setTimeout(() => {
        this.openOrderCompletedDialog = false
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
    async AcceptOffer(
      orderHash: string,
      brand: string,
      image: string
    ) {
      const address = this.walletAddress();
      try {
        await FulfillBasicOrder(orderHash, brand, true, address, image);
        this.openOrderAccepted = true;
        setTimeout(() => {
          this.openOrderAccepted = false;
        }, 3000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        this.HandleError({
          errorType: 'accept',
          errorTitle: 'Sorry, the purchase failed',
          errorMessage: 'It may be due to not having enough balance, rejected transaction, etc.'
        });
      } finally {
        this.openConfirmDialog = false;
      }
    },
  },
});
</script>

<style scoped>
:deep(.q-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
