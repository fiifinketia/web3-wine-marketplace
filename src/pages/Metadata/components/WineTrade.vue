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
      <div
        :class="
          $q.screen.width > 600
            ? 'metadata-nft-image-wrapper row justify-end'
            : ''
        "
        :style="$q.screen.width > 600 ? '' : 'position: relative'"
      >
        <img :src="nft.image" class="metadata-nft-image" />
        <div
          v-if="!!userStore.walletAddress"
          class="metadata-favorite-container column items-center justify-center"
        >
          <q-img
            v-if="nft.favoriteLoading"
            src="../../../assets/loading-heart.gif"
            style="width: 27px; height: 27px"
          />
          <q-img
            v-else-if="nft.favorited"
            src="../../../../public/images/heart.svg"
            class="clickable-image"
            width="20px"
            height="20px"
            @click.stop="
              addRemoveFavorites(
                nft.tokenID,
                nft.smartContractAddress,
                nft.network,
                'remove'
              )
            "
          />
          <q-img
            v-else
            src="../../../../public/images/empty-heart.svg"
            class="clickable-image"
            width="20px"
            height="20px"
            @click.stop="
              addRemoveFavorites(
                nft.tokenID,
                nft.smartContractAddress,
                nft.network,
                'add'
              )
            "
          />
        </div>
      </div>

      <div class="column nft-takeaways-container q-pa-sm">
        <div class="row">
          <q-img
            :src="owner.avatar || '../../../../public/images/profile-icon.svg'"
            width="40px"
            height="40px"
            style="border-radius: 50%"
          />
          <div class="column q-pl-sm">
            <div class="owned-by">Owned by</div>
            <div class="user-id">{{ owner.username || 'unknown' }}</div>
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
              v-if="
                nft.listingDetails.expTime &&
                nft.listingDetails.transactionStatus == true
              "
              :class="$q.screen.width > 600 ? '' : 'column items-center'"
              style="margin-bottom: 14px"
            >
              <ListingExpTimer
                :time-left="nft.listingDetails.expTime"
                style="max-width: 500px"
              />
            </div>
            <div
              id="metadata-listing-price"
              class="column"
              :class="$q.screen.width > 600 ? 'items-start' : 'items-center'"
            >
              <div class="starting-from">Price</div>
              <div
                v-if="
                  !!ongoingListingTransaction ||
                  nft.listingDetails.transactionStatus == false
                "
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
                <q-icon
                  :name="`app:${GetCurrencyLabel(
                    nft.listingDetails.currency
                  )}-icon`"
                  size="28px"
                />
                <span class="price1 q-pl-sm">
                  {{ nft.listingDetails.listingPrice }}
                </span>
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
                  :name="`app:${GetCurrencyLabel(
                    nft.offerDetails.highestBidCurrency
                  )}-icon`"
                  size="20px"
                />
                <span class="bid-price q-pl-sm">
                  {{ nft.offerDetails.highestBid || '--.--' }}
                </span>
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
          @click="TransactionPreValidator('LIST')"
        >
          List For Sale
        </q-btn>
        <q-btn
          v-else
          :disable="
            nft.listingDetails.transactionStatus == false ||
            unlisted ||
            nft.listingDetails.listingCancellationStatus == true
          "
          class="unlist-btn items-center justify-center metadata-btn-text_outline"
          no-caps
          outline
          flat
          @click="TransactionPreValidator('UNLIST')"
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
          @click="TransactionPreValidator('PURCHASE')"
        >
          Buy now
        </q-btn>
        <q-btn
          no-caps
          flat
          class="offer-btn items-center justify-center metadata-btn-text"
          @click="TransactionPreValidator('OFFER')"
        >
          Make an offer
        </q-btn>
      </div>
    </div>
    <q-btn
      class="q-mt-md btn--no-hover"
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
      @open-terms-and-conditions="$emit('open-terms-and-conditions')"
      @open-kyc-dialog="
        openCreateListingDialog = false;
        openKYCUpdate = true;
      "
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
      @open-terms-and-conditions="$emit('open-terms-and-conditions')"
      @open-kyc-dialog="
        openCreateOfferDialog = false;
        openKYCUpdate = true;
      "
    />

    <DeleteListingDialog
      v-model="openDeleteListingDialog"
      :order-hash="nft.listingDetails.orderHash"
      :network="nft.network"
      :smart-contract-address="nft.smartContractAddress"
      :token-id="nft.tokenID"
      @listing-delete-close="openDeleteListingDialog = false"
      @listing-error-dialog="HandleError"
      @remove-listing="unlisted = true"
      @unlist-failed="failedUnlist => InvalidUnlist(failedUnlist)"
      @open-kyc-dialog="
        openDeleteListingDialog = false;
        openKYCUpdate = true;
      "
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
      @open-terms-and-conditions="$emit('open-terms-and-conditions')"
      @open-kyc-dialog="
        openPurchaseListingDialog = false;
        openKYCUpdate = true;
      "
    />

    <AcceptedOrderDialog
      v-model="openOrderAccepted"
      :order-accepted="'listing'"
    />

    <KYCUpdate
      v-model="openKYCUpdate"
      @start-veriff="
        sessionDetails =>
          BeginUserVerification(
            sessionDetails.continueSession,
            sessionDetails.lastSessionURL
          )
      "
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
import {
  AddFavorites,
  RemoveFavorites,
} from 'src/pages/Favourites/services/FavoritesFunctions';
import KYCUpdate from 'src/pages/SharedPopups/KYCUpdate.vue';
import {
	StartVeriff,
	// VerificationStatus
} from 'src/shared/veriff-service';
// import { HandleUserValidity } from 'src/shared/veriff-service';
import { GetTokenOwnerAddress } from 'src/shared/web3.helper';

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
    ListingExpTimer: OrderExpTimer,
    KYCUpdate: KYCUpdate,
  },
  props: {
    nft: {
      type: Object as PropType<NFTWithListingAndFavorites>,
      required: true,
    },
  },
  emits: [
    'openWallet',
    'refresh-metadata',
    'connect-wallet',
    'listing-exists',
    'nft-listed',
    'favorite-action',
    'unlist-failed',
    'shepherd-remove-step',
    'open-terms-and-conditions',
  ],
  data() {
    return {
      openCreateListingDialog: false,
      openDeleteListingDialog: false,
      openCreateOfferDialog: false,
      openOrderCompletedDialog: false,
      openErrorDialog: false,
      openPurchaseListingDialog: false,
      openOrderAccepted: false,
      openKYCUpdate: false,

      errorType: '',
      errorTitle: '',
      errorMessage: '',
      unlisted: false,

      orderType: '',

      ongoingListingTransaction: false,

      GetCurrencyLabel,
      userStore: useUserStore(),
			owner: {
				username: '' as string | undefined,
				avatar: '' as string | undefined,
			},
    };
  },
  computed: {
    ...mapState(useUserStore, {
      walletAddress: store => store.getWalletAddress(),
      userStatus: store => store.user?.verificationStatus,
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
  async beforeMount() {
    try {
      const ownerAddress = await GetTokenOwnerAddress(
        this.nft.tokenID,
        this.nft.tokenType
      );

      const user = await this.userStore.fetchUserByAddress(ownerAddress);
      this.owner = user;
    } catch (error) {
      return this.owner = {
				username: undefined,
				avatar: undefined,
			};
    }
  },
  methods: {
    shepherdRemoveStep() {
      this.$emit('shepherd-remove-step', 'metadata-checkout-buttons');
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
      }, 3000);
    },
    async PurchaseListingSuccess() {
      this.openPurchaseListingDialog = false;
      this.openOrderAccepted = true;
      setTimeout(() => {
        this.openOrderAccepted = false;
      }, 2500);
    },
    UpdateListingStatus(
      listed: TokenIdentifier & {
        listingPrice: string;
        currency: string;
        transactionStatus: boolean;
      }
    ) {
      this.$emit('listing-exists', listed);
    },
    InvalidUnlist(
      failedUnlist: TokenIdentifier & {
        status: 'ongoingUnlist' | 'unlisted' | 'purchased';
      }
    ) {
      this.openDeleteListingDialog = false;
      this.$emit('unlist-failed', failedUnlist);
    },
    RefreshMetadataPage() {
      this.$emit('refresh-metadata');
    },
    async addRemoveFavorites(
      tokenID: string,
      cAddress: string,
      network: string,
      objective: string
    ) {
      switch (objective) {
        case 'add':
          try {
            this.$emit('favorite-action', 'processing');
            await AddFavorites({
              walletAddress: this.userStore.walletAddress,
              tokenID: tokenID,
              contractAddress: cAddress,
              network: network,
            });
            this.$emit('favorite-action', 'favorited');
          } catch {
            return 0;
          }
          break;
        case 'remove':
          try {
            this.$emit('favorite-action', 'processing');
            await RemoveFavorites({
              walletAddress: this.userStore.walletAddress,
              tokenID: tokenID,
              contractAddress: cAddress,
              network: network,
            });
            this.$emit('favorite-action', 'unfavorited');
          } catch {
            return 0;
          }
          break;
      }
    },
    BeginUserVerification(continueSession: boolean, lastSessionURL: string) {
      this.openKYCUpdate = false;
      StartVeriff(
        <string>this.userStore.user?.walletAddress,
        '',
        continueSession,
        lastSessionURL
      );
    },
    async TransactionPreValidator(dialog: string) {
      if (!this.walletAddress) {
        this.$emit('connect-wallet');
        return;
      }
      //TODO: add
      if (!this.userStore.user?.email) {
        this.HandleError({
          errorType: 'email_unverified',
          errorTitle: 'User email not verified',
          errorMessage: 'Please verify your email and try again.',
        });
      }
      // else if (this.userStatus !== VerificationStatus.VERIFIED) {
      //   try {
      //     const isVerified = await HandleUserValidity();
      //     if (isVerified) {
      //       this.TransactionPreValidator(dialog);
      //     } else {
      //       this.openKYCUpdate = true;
      //     }
      //   } catch {
      //     this.HandleError({
      //       errorType: 'validation_failed',
      //       errorTitle: 'Failed to verify user KYC status.',
      //       errorMessage: 'Please try again later.',
      //     });
      //   }
      // }
      else {
        try {
          if (!this.userStore.user.isLegal) await this.userStore.confirmAge();
        } catch (error) {
          throw error;
        } finally {
          if (this.userStore.user.isLegal) {
            switch (dialog) {
              case 'LIST':
                this.openCreateListingDialog = true;
                break;
              case 'UNLIST':
                this.openDeleteListingDialog = true;
                break;
              case 'OFFER':
                this.openCreateOfferDialog = true;
                this.shepherdRemoveStep();
                break;
              case 'PURCHASE':
                this.openPurchaseListingDialog = true;
                this.shepherdRemoveStep();
                break;
            }
          } else {
            this.HandleError({
              errorType: 'under_age',
              errorTitle: 'User is not old enough',
              errorMessage:
                'You must be 21 years or older to use make transactions on this site.',
            });
          }
        }
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
