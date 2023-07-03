<template>
  <q-page
    class="column items-center"
    :class="loadingRequest || emptyRequest ? 'justify-center' : ''"
    style="flex-wrap: nowrap"
  >
    <div v-if="loadingRequest" class="column items-center">
      <LoadingView :loading-text="'Loading your listings'" />
    </div>
    <ErrorView
      v-else-if="!!errorOverall"
      :tab-error="'listings'"
      @reload-tab="FetchListings(listingSortKey, listingBrandFilter)"
    />
    <div
      v-else
      class="column items-center full-width q-mx-none profile-page-container"
    >
      <div
        v-if="!emptyRequest"
        class="column items-center"
        :class="$q.screen.width > 600 ? '' : 'full-width'"
      >
        <ListingHeaderLg
          v-if="$q.screen.width > 1020"
          :listings-amount="listings.length"
          :selected-listing-sort-key="listingSortKey"
          :updated-listing-brand-filter="listingBrandFilter"
          :listable-n-f-ts="listableNFTs"
          :brand-searched="brandSearched"
          @listing-brand-filter-updated="val => (listingBrandFilter = val)"
          @listing-sort-key-selected="val => (listingSortKey = val)"
          @create-new-listing="openNewListingDialog = true"
          @fetch-listings-with-brand-filter="
            val => FetchListings(val.sortKey, val.brandFilter)
          "
          @reset-listings-search="val => FetchListings(val, '')"
        />
        <ListingHeaderSm
          v-else
          :listings-amount="listings.length"
          :selected-listing-sort-key="listingSortKey"
          :updated-listing-brand-filter="listingBrandFilter"
          :listable-n-f-ts="listableNFTs"
          :brand-searched="brandSearched"
          @listing-brand-filter-updated="val => (listingBrandFilter = val)"
          @listing-sort-key-selected="val => (listingSortKey = val)"
          @create-new-listing="openNewListingDialog = true"
          @fetch-listings-with-brand-filter="
            val => FetchListings(val.sortKey, val.brandFilter)
          "
          @reset-listings-search="val => FetchListings(val, '')"
        />
        <div v-if="$q.screen.width > 600" class="profile-main-container column">
          <ListingsColumns />
          <q-separator
            style="background-color: #5e97ec45 !important"
            inset
            class="q-mx-xl"
          />
          <ListingsRows
            :listings="listings"
            @delete-listing="
              listing => TransactionPreValidator('UNLIST', listing)
            "
            @edit-listing="listing => TransactionPreValidator('LIST', listing)"
          />
        </div>
        <div v-else class="full-width" style="width: 100vw">
          <ListingsColumns />
          <ListingsRows
            :listings="listings"
            @delete-listing="
              listing => TransactionPreValidator('UNLIST', listing)
            "
            @edit-listing="listing => TransactionPreValidator('LIST', listing)"
          />
        </div>
      </div>
      <div v-else class="column items-center">
        <EmptyView
          :empty-text="'You have not made any listings yet.'"
          @open-listable-container="openNewListingDialog = true"
        />
      </div>
      <ListingDialogEdit
        v-model="openEditDialog"
        :brand="singleListing.brand"
        :image="singleListing.image"
        :order-hash="singleListing.orderHash"
        :network="singleListing.network"
        :smart-contract-address="singleListing.contractAddress"
        :token-i-d="singleListing.identifierOrCriteria"
        :is-edit="true"
        @listing-edit-close="openEditDialog = false"
        @remove-listing="val => RemoveRow(val)"
        @listing-error-dialog="HandleError"
        @listable-nft-listed="SetTimeoutOnListingProcessedDialog()"
        @open-terms-and-conditions="showTermsAndConditions = true"
        @open-kyc-dialog="
          openEditDialog = false;
          openKYCUpdate = true;
        "
      />
      <ListingDialogUnlist
        v-model="openDeleteDialog"
        :order-hash="singleListing.orderHash"
        :network="singleListing.network"
        :smart-contract-address="singleListing.contractAddress"
        :token-id="singleListing.identifierOrCriteria"
        @listing-delete-close="openDeleteDialog = false"
        @remove-listing="val => RemoveRow(val)"
        @listing-error-dialog="HandleError"
        @unlist-failed="unlisted => InvalidUnlist(unlisted)"
        @open-kyc-dialog="
          openDeleteDialog = false;
          openKYCUpdate = true;
        "
      />
      <ErrorDialog
        v-model="openErrorDialog"
        :error-type="errorType"
        :error-title="errorTitle"
        :error-message="errorMessage"
      />
      <ListableContainer
        v-model="openNewListingDialog"
        :listable-n-f-ts="listableNFTs"
        :is-loading="loadingNewListingDialog"
        :errored-out="errorNewListingDialog"
        @listable-nft-listed="
          listed => UpdateListableNFTWithPrice(listed, false)
        "
        @listing-warning-processing="
          processingListing =>
            UpdateListableNFTWithPrice(processingListing, true)
        "
        @listing-warning-processed="
          processedListing => RemoveListableNFT(processedListing)
        "
        @refetch-nfts="SetListableNFTs()"
        @open-terms-and-conditions="showTermsAndConditions = true"
        @open-kyc-dialog="
          openNewListingDialog = false;
          openKYCUpdate = true;
        "
      />
      <ListingProcessedDialog
        v-model="openOrderCompletedDialog"
        :order-type="'listing'"
      />
      <ListingStatusDialog
        v-model="openListingStatusDialog"
        :transaction-status="true"
      />
      <UnlistingStatusDialog
        v-model="openListingUnavailableDialog"
        :invalid-status="listingUnavailableStatus"
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
      <wiv-toc-dialog v-model="showTermsAndConditions" close-button />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'src/css/Profile/shared.css';
import 'src/css/Profile/Component/listings.css';
import { setCssVar } from 'quasar';
import { ordersStore } from 'src/stores/orders-store';
import { useListableFilters } from 'src/stores/listable-filters';
import ListingHeaderLg from '../Headers/ListingHeaderLg.vue';
import ListingHeaderSm from '../Headers/ListingHeaderSm.vue';
import OrderLoading from '../OrderLoading.vue';
import EmptyOrders from '../EmptyOrders.vue';
import { useUserStore } from 'src/stores/user-store';
import ListingEdit from '../../SharedPopups/ListingEdit.vue';
import ListingUnlist from '../../SharedPopups/ListingUnlist.vue';
import { ListingsResponse } from '../models/response.models';
import ProfileErrors from '../../SharedPopups/ProfileErrors.vue';
import LoadingError from '../LoadingError.vue';
import ListingsColumns from '../Columns/ListingsColumns.vue';
import ListingsRows from '../Rows/ListingsRows.vue';
import ListingNew from '../Popups/New Listing/ListingNew.vue';
import { useNFTStore } from 'src/stores/nft-store';
import {
  TokenIdentifier,
  ListableToken,
} from 'src/shared/models/entities/NFT.model';
import { ReturnMissingNFTDetails } from '../orders.requests';
import { mapState } from 'pinia';
import OrderProcessed from 'src/pages/SharedPopups/OrderProcessed.vue';
import ListingExists from 'src/pages/SharedPopups/ListingExists.vue';
import ListingUnavailable from 'src/pages/SharedPopups/ListingUnavailable.vue';
import KYCUpdate from 'src/pages/SharedPopups/KYCUpdate.vue';
import {
  HandleUserValidity,
  StartVeriff,
  VerificationStatus,
} from 'src/shared/veriff-service';

setCssVar('custom', '#5e97ec45');

export default defineComponent({
  components: {
    ListingHeaderLg: ListingHeaderLg,
    ListingHeaderSm: ListingHeaderSm,
    LoadingView: OrderLoading,
    EmptyView: EmptyOrders,
    ErrorView: LoadingError,
    ListingDialogEdit: ListingEdit,
    ListingDialogUnlist: ListingUnlist,
    ListingProcessedDialog: OrderProcessed,
    ErrorDialog: ProfileErrors,
    ListingsColumns: ListingsColumns,
    ListingsRows: ListingsRows,
    ListableContainer: ListingNew,
    ListingStatusDialog: ListingExists,
    UnlistingStatusDialog: ListingUnavailable,
    KYCUpdate: KYCUpdate,
  },
  emits: ['listingsAmount'],

  data() {
    const nftStore = useNFTStore();
    const store = ordersStore();
    const userStore = useUserStore();
    const listableFiltersStore = useListableFilters();
    return {
      store,
      userStore,
      nftStore,
      listableFiltersStore,

      listingSortKey: store.getListingSortKey,

      listingBrandFilter: store.getListingBrandFilter,

      loadingRequest: true,
      emptyRequest: false,

      openEditDialog: false,
      openDeleteDialog: false,

      openNewListingDialog: false,
      enableListingDialog: false,

      loadingNewListingDialog: true,
      errorNewListingDialog: true,

      singleListing: {} as ListingsResponse,

      errorOverall: false,
      errorType: '',
      errorTitle: '',
      errorMessage: '',
      openErrorDialog: false,
      openOrderCompletedDialog: false,
      openListingStatusDialog: false,

      listingUnavailableStatus: '',
      openListingUnavailableDialog: false,
      showTermsAndConditions: false,

      openKYCUpdate: false,
    };
  },
  computed: {
    ...mapState(ordersStore, {
      listings: store => store.getListings,
      brandSearched: store => store.getListingBrandFilterStatus,
      tabKey: store => store.getListingTabKey,
    }),
    ...mapState(useListableFilters, {
      listableNFTs: store => store.getParentListableTokens,
    }),
    ...mapState(useUserStore, {
      userStatus: store => store.user?.verificationStatus,
      walletAddress: store => store.walletAddress,
    }),
  },
  watch: {
    listingSortKey: {
      handler: async function (sortKey) {
        this.store.setListingSortKey(sortKey);
        if (!this.store.listingBrandFilterStatus) {
          await this.FetchListings(sortKey, '');
        } else {
          await this.FetchListings(sortKey, this.listingBrandFilter);
        }
      },
    },
    listingBrandFilter: {
      handler: async function (brandFilter) {
        this.store.setListingBrandFilter(brandFilter);
      },
    },
    tabKey: {
      async handler() {
        await this.FetchListings('', '');
      },
    },
  },

  async mounted() {
    const listingsRequestStatus = this.store.getListingRequestStatus;
    if (listingsRequestStatus == false) {
      await this.FetchListings('', '');
      this.SetListableNFTs();
    } else {
      this.$emit('listingsAmount', this.listings.length);
      this.CheckForEmptyRequest();
      this.listableNFTs = this.listableFiltersStore.getFilteredListableTokens;
      this.loadingNewListingDialog = false;
      this.errorNewListingDialog = false;
      this.loadingRequest = false;
    }
  },

  methods: {
    SetTimeoutOnListingProcessedDialog() {
      this.openOrderCompletedDialog = true;
      setTimeout(() => {
        this.openOrderCompletedDialog = false;
      }, 3000);
    },
    async FetchListings(sortKey: string, brandFilter: string) {
      this.loadingRequest = true;
      const address = this.userStore.walletAddress;
      try {
        await this.store.setListings(address, sortKey, brandFilter);
        if (
          this.store.getListings.length == 0 &&
          this.store.listingBrandFilterStatus == true
        ) {
          this.HandleMissingBrand();
        } else {
          this.$emit('listingsAmount', this.listings.length);
          this.CheckForEmptyRequest();
        }
        this.errorOverall = false;
      } catch {
        this.errorOverall = true;
      } finally {
        this.loadingRequest = false;
      }
    },
    OpenDeleteDialog(listing: ListingsResponse) {
      this.singleListing = listing;
      this.openDeleteDialog = true;
    },
    OpenEditDialog(listing: ListingsResponse) {
      this.singleListing = listing;
      this.openEditDialog = true;
    },
    RemoveRow(orderHash: string) {
      this.store.filterListings(orderHash);
      this.CheckForEmptyRequest();
    },
    CheckForEmptyRequest() {
      if (this.listings.length == 0) {
        this.emptyRequest = true;
      }
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
    HandleMissingBrand() {
      this.store.resetListings();
      this.listingBrandFilter = this.store.listingBrandFilter;
      this.HandleError({
        errorType: 'filter',
        errorTitle: 'Unable to fetch your orders',
        errorMessage: 'There are no orders under your current filter',
      });
    },
    async RefetchNFTs() {
      this.nftStore.ownedNFTs = [] as TokenIdentifier[];
      await this.nftStore.fetchNFTs(this.userStore.walletAddress);
    },
    async SetListableNFTs() {
      try {
        this.loadingNewListingDialog = true;
        await this.RefetchNFTs();
        const currentListings = this.listings;
        const ownedNFTs = this.nftStore.ownedNFTs;
        if (ownedNFTs.length > currentListings.length) {
          const ownedNFTsMap: Map<string, TokenIdentifier> = new Map();
          ownedNFTs.forEach(f => {
            const {
              identifierOrCriteria: id,
              contractAddress: address,
              network,
            } = f;
            const key = `${id},${address},${network}`;
            ownedNFTsMap.set(key, {
              identifierOrCriteria: id,
              contractAddress: address,
              network: network,
            });
          });
          currentListings.forEach(f => {
            const {
              identifierOrCriteria: id,
              contractAddress: address,
              network,
            } = f;
            const key = `${id},${address},${network}`;
            if (ownedNFTsMap.has(key)) {
              ownedNFTsMap.delete(key);
            }
          });
          if (ownedNFTsMap.size > 0) {
            const listableOwnedNFTs = Array.from(ownedNFTsMap.values());
            const listableTokens = await ReturnMissingNFTDetails(
              listableOwnedNFTs
            );
            this.listableFiltersStore.setParentListableTokens(listableTokens);
            this.listableFiltersStore.setAllFilters(this.listableNFTs);
            this.listableFiltersStore.filteredListableTokens =
              this.listableNFTs;
          }
          this.errorNewListingDialog = false;
        }
      } catch {
        this.errorNewListingDialog = true;
      } finally {
        this.loadingNewListingDialog = false;
      }
    },
    UpdateListableNFTWithPrice(listed: ListableToken, warning: boolean) {
      if (!warning) {
        this.SetTimeoutOnListingProcessedDialog();
      }
      const listedIndex = this.listableNFTs.findIndex(
        nft =>
          nft.contractAddress == listed.contractAddress &&
          nft.identifierOrCriteria == listed.identifierOrCriteria &&
          nft.network == listed.network
      );
      this.listableNFTs[listedIndex].listingPrice = listed.listingPrice;
      this.listableNFTs[listedIndex].listingCurrency = listed.listingCurrency;
      this.listableFiltersStore.UpdateListableNFTPriceInDuplicate(listed);
    },
    RemoveListableNFT(
      listed: TokenIdentifier & {
        listingPrice: string;
        currency: string;
        transactionStatus: boolean;
      }
    ) {
      this.openNewListingDialog = false;
      this.openNewListingDialog = false;
      this.openListingStatusDialog = true;
      setTimeout(() => {
        this.openListingStatusDialog = false;
      }, 2000);
      const listedIndex = this.listableNFTs.findIndex(
        nft =>
          nft.contractAddress == listed.contractAddress &&
          nft.identifierOrCriteria == listed.identifierOrCriteria &&
          nft.network == listed.network
      );
      this.listableNFTs.splice(listedIndex, 1);
      this.listableFiltersStore.RemoveListableNFTInDuplicate(listed);
    },
    async InvalidUnlist(failed: {
      status: 'ongoingUnlist' | 'unlisted' | 'purchased';
      contractAddress: string;
      identifierOrCriteria: string;
      network: string;
    }) {
      const listedIndex = this.store.listings.findIndex(
        nft =>
          nft.contractAddress == failed.contractAddress &&
          nft.identifierOrCriteria == failed.identifierOrCriteria &&
          nft.network == failed.network
      );
      this.RemoveRow(this.store.listings[listedIndex].orderHash);
      this.listingUnavailableStatus = failed.status;
      this.openListingUnavailableDialog = true;
      setTimeout(() => {
        this.openListingUnavailableDialog = false;
      }, 2000);
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
    async TransactionPreValidator(dialog: string, listing: ListingsResponse) {
      if (!this.userStore.user?.email) {
        this.HandleError({
          errorType: 'email_unverified',
          errorTitle: 'User email not verified',
          errorMessage: 'Please verify your email and try again.',
        });
      }
      // else if (this.userStatus !== VerificationStatus.VERIFIED) {
      // 	try {
      //     const isVerified = await HandleUserValidity();
      //     if (isVerified) {
      //       this.TransactionPreValidator(dialog, listing);
      //     } else {
      //       this.openKYCUpdate = true;
      //     }
      //   }
      //   catch {
      //     this.HandleError({
      //       errorType: 'validation_failed',
      //       errorTitle: 'Failed to verify user KYC status.',
      //       errorMessage: 'Please try again later.'
      //     })
      //   }
      // }
      else {
        try {
          if (!this.userStore.user?.isLegal) await this.userStore.confirmAge();
        } catch (error) {
          throw error;
        } finally {
          if (this.userStore.user?.isLegal) {
            switch (dialog) {
              case 'LIST':
                this.OpenEditDialog(listing);
                break;
              case 'UNLIST':
                this.OpenDeleteDialog(listing);
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
