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
							id="metadata-listing-price"
              class="column"
              :class="$q.screen.width > 600 ? 'items-start' : 'items-center'"
            >
              <div class="starting-from">Price</div>
              <div v-if="!!ongoingListingTransaction" class="row items-center">
                <q-img src="../../../assets/processing.svg" width="30px" />
                <div class="price1-blue">Processing price</div>
              </div>
              <div
                v-else-if="
                  !!nft.listingDetails?.listingPrice &&
                  !!nft.listingDetails.transactionStatus
                "
                class="row items-center"
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
                <div>
                  <q-img src="../../../assets/usdc.svg" width="20px" />
                </div>
                <div class="bid-price">
                  {{ nft.offerDetails?.highestBid || '--.--' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="$q.screen.width > 600 ? 'q-pt-lg' : 'full-width'">
      <div v-if="nft.isOwner" class="column items-center full-width q-px-md">
        <q-btn
          v-if="!nft.listingDetails.orderHash"
          class="list-cancel-fulfill-btn items-center justify-center metadata-btn-text"
          no-caps
          flat
          @click="openCreateListingDialog = true"
        >
          List For Sale
        </q-btn>
        <q-btn
          v-else
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
            !nft.listingDetails.orderHash ||
            !nft.listingDetails.transactionStatus
          "
          @click="OpenFulFillOrOfferDialog('fulfill')"
        >
          Buy now
        </q-btn>
        <q-btn
          no-caps
          flat
          class="offer-btn items-center justify-center metadata-btn-text"
          @click="OpenFulFillOrOfferDialog('offer')"
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
        network: nft.network,
      }"
      @accept-offer="
        req => AcceptOffer(req.orderHash, req.brand, req.image)
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
import 'src/css/Metadata/WineMetadata.css';
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
import { useTourStore } from 'src/stores/tour-state';
import { StepOptions } from 'vue-shepherd';

export default defineComponent({
  name: 'WineMetadata',
  components: {
    CreateListingDialog: ListingEdit,
    CreateOfferDialog: OutgoingEdit,
    DeleteListingDialog: ListingUnlist,

    OrderProcessed: OrderProcessed,
    ErrorDialog: ProfileErrors,
    ConfirmOrderDialog: AcceptOffer,
    AcceptedOrderDialog: OrderAccepted,
  },
  props: {
    nft: {
      type: Object as PropType<NFTWithListingAndFavorites>,
      required: true,
    },
  },
  emits: ['openWallet', 'refresh-metadata', 'connect-wallet'],
  data() {
    const tourStore = useTourStore();
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

      ongoingListingTransaction: false,
      tourStore,
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
  mounted() {
    if (!this.tourStore.metadataCompleted && !this.nft.isOwner) {
      this.metadataTour();
    }
  },
  methods: {
    OpenFulFillOrOfferDialog(dialog: string) {
      if (!this.walletAddress) {
        this.$emit('connect-wallet');
        return;
      } else {
        switch (dialog) {
          case 'offer':
            this.openCreateOfferDialog = true;
            break;
          case 'fulfill':
            this.openConfirmDialog = true;
            break;
        }
      }
    },
    SetTimeoutOnmetadataCompletedDialog(orderType: string) {
      this.orderType = orderType;
      if (orderType == 'listing') {
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
    async AcceptOffer(orderHash: string, brand: string, image: string) {
      const address = this.walletAddress;
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
          errorMessage:
            'It may be due to not having enough balance, rejected transaction, etc.',
        });
      } finally {
        this.openConfirmDialog = false;
      }
    },
    RefreshMetadataPage() {
      this.$emit('refresh-metadata');
    },
    metadataTour() {
			const steps: StepOptions[] = [
				{
					id: 'metadata-details',
					attachTo: {
            element: '#metadata-details',
            on: 'top',
          },
          text: 'You can read the brief details of the wine',
          buttons: [
						{
							text: 'Continue',
							action: () => {
								this.$shepherd.next()
								this.$shepherd.removeStep('metadata-details')
							}
						},
            {
              text: 'Skip',
              action: () => {
                this.tourStore.setMetadataCompleted();
                this.$shepherd.cancel();
              },
            },
          ],
				},
				{
					id: 'metadata-listing-price',
					attachTo: {
            element: '#metadata-listing-price',
            on: 'top',
          },
          text: 'This is the listing price of the wine if you want to purchase immediatly',
          buttons: [
						{
							text: 'Continue',
							action: () => {
								this.$shepherd.next()
								this.$shepherd.removeStep('metadata-listing-price')
							}
						},
            {
              text: 'Skip',
              action: () => {
                this.tourStore.setMetadataCompleted();
                this.$shepherd.cancel();
              },
            },
          ],
				},
				{
					id: 'metadata-bidding-price',
					attachTo: {
            element: '#metadata-bidding-price',
            on: 'top',
          },
          text: 'This is the bidding price of the wine if you want to bid for the wine.',
          buttons: [
						{
							text: 'Continue',
							action: () => {
								this.$shepherd.next()
								this.$shepherd.removeStep('metadata-bidding-price')
							}
						},
            {
              text: 'Skip',
              action: () => {
                this.tourStore.setMetadataCompleted();
                this.$shepherd.cancel();
              },
            },
          ],
				},
				{
					id: 'metadata-checkout-buttons',
					attachTo: {
            element: '#metadata-checkout-buttons',
            on: 'top',
          },
					scrollTo: {
            // Make sure the element is in the viewport
            behavior: 'smooth',
            block: 'end',
          },
          text: 'Use any of these buttons to purchase the wine depending on your preference',
          buttons: [
						{
							text: 'Continue',
							action: () => {
								this.$shepherd.removeStep('metadata-checkout-buttons')
							}
						},
            {
              text: 'Skip',
              action: () => {
                this.tourStore.setMetadataCompleted();
                this.$shepherd.cancel();
              },
            },
          ],
				},
			]

			this.$shepherd.addSteps(steps)
			this.$shepherd.start()
		},
  },
});
</script>

<style scoped>
:deep(.q-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
