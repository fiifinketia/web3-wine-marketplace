<template>
  <q-page
    class="column items-center"
    :class="!loadingRequest || emptyRequest ? 'justify-center' : ''"
    style="flex-wrap: nowrap"
  >
    <div v-if="!loadingRequest" class="column items-center">
      <LoadingView :loading-text="'Loading your listings'" />
    </div>
    <div v-else class="column items-center full-width q-mx-none">
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
            @delete-listing="listing => OpenDeleteDialog(listing)"
            @edit-listing="listing => OpenEditDialog(listing)"
          />
        </div>
        <div v-else class="full-width" style="width: 100vw">
          <ListingsColumns />
          <ListingsRows
            :listings="listings"
            @delete-listing="listing => OpenDeleteDialog(listing)"
            @edit-listing="listing => OpenEditDialog(listing)"
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
        />
        <ListingDialogUnlist
          v-model="openDeleteDialog"
          :order-hash="singleListing.orderHash"
          @listing-delete-close="openDeleteDialog = false"
          @remove-listing="val => RemoveRow(val)"
          @listing-error-dialog="HandleError"
        />
        <ErrorDialog
          v-model="openErrorDialog"
          :error-type="errorType"
          :error-title="errorTitle"
          :error-message="errorMessage"
        />
        <CreateListing
          v-model="openNewListingDialog"
          :listable-n-f-ts="listableNFTs"
          @listable-nft-listed="listed => UpdateListableNFTWithPrice(listed)"
        />
      </div>
      <div v-else class="column items-center">
        <EmptyView :empty-text="'You have not made any listings yet.'" />
      </div>
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
import ListingEdit from '../Popups/ListingEdit.vue';
import ListingUnlist from '../Popups/ListingUnlist.vue';
import { ListingsResponse } from '../models/response.models';
import ProfileErrors from '../Popups/ProfileErrors.vue';
import ListingsColumns from '../Columns/ListingsColumns.vue';
import ListingsRows from '../Rows/ListingsRows.vue';
import ListingNew from '../Popups/New Listing/ListingNew.vue';
import { useNFTStore } from 'src/stores/nft-store';
import {
  TokenIdentifier,
  ListableToken,
} from 'src/shared/models/entities/NFT.model';
import { ReturnMissingNFTDetails } from '../orders.requests';

setCssVar('custom', '#5e97ec45');

export default defineComponent({
  components: {
    ListingHeaderLg: ListingHeaderLg,
    ListingHeaderSm: ListingHeaderSm,
    LoadingView: OrderLoading,
    EmptyView: EmptyOrders,
    ListingDialogEdit: ListingEdit,
    ListingDialogUnlist: ListingUnlist,
    ErrorDialog: ProfileErrors,
    ListingsColumns: ListingsColumns,
    ListingsRows: ListingsRows,
    CreateListing: ListingNew,
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

      listings: store.listings,
      listingSortKey: store.getListingSortKey,

      listingBrandFilter: store.getListingBrandFilter,

      loadingRequest: false,
      emptyRequest: false,

      openEditDialog: false,
      openDeleteDialog: false,

      openNewListingDialog: false,
      enableListingDialog: false,

      singleListing: {} as ListingsResponse,
      listableNFTs: [] as ListableToken[],

      errorType: '',
      errorTitle: '',
      errorMessage: '',
      openErrorDialog: false,

      brandSearched: false,
    };
  },

  watch: {
    listingSortKey: {
      handler: async function (sortKey) {
        this.store.setListingSortKey(sortKey);
        if (!this.store.listingBrandFilterStatus) {
          await this.FetchListings(sortKey, '');
          this.loadingRequest = true;
        } else {
          await this.FetchListings(sortKey, this.listingBrandFilter);
          this.loadingRequest = true;
        }
        this.loadingRequest = true;
      },
    },
    listingBrandFilter: {
      handler: async function (brandFilter) {
        this.store.setListingBrandFilter(brandFilter);
        this.store.setListingBrandFilterStatus(false);
      },
    },
  },

  async mounted() {
    const listingsRequestStatus = this.store.getListingRequestStatus;
    if (listingsRequestStatus == false) {
      await this.RefetchNFTs();
      await this.FetchListings('', '');
      await this.SetListableNFTs();
      this.loadingRequest = true;
    } else {
      this.$emit('listingsAmount', this.listings.length);
      this.CheckForEmptyRequest();
    }
    this.loadingRequest = true;
  },

  methods: {
    async FetchListings(sortKey: string, brandFilter: string) {
      this.loadingRequest = false;
      const address = this.userStore.walletAddress;
      await this.store.setListings(address, sortKey, brandFilter);
      if (
        this.store.getListings.length == 0 &&
        this.store.listingBrandFilterStatus == true
      ) {
        this.HandleMissingBrand();
      } else if (this.store.listingBrandFilterStatus == true) {
        this.brandSearched = true;
        this.loadingRequest = true;
      } else {
        this.brandSearched = false;
        this.listings = this.store.getListings;
        this.$emit('listingsAmount', this.listings.length);
        this.CheckForEmptyRequest();
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
      this.listings = this.listings.filter(f => f.orderHash !== orderHash);
      this.store.filterListings(orderHash);
      this.CheckForEmptyRequest();
    },
    CheckForEmptyRequest() {
      if (this.listings.length == 0) {
        this.emptyRequest = true;
      }
      this.loadingRequest = true;
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
      this.store.setListingBrandFilterStatus(false);
      this.loadingRequest = true;
      this.HandleError({
        errorType: 'filter',
        errorTitle: 'Unable to fetch your orders',
        errorMessage: 'There are no orders under your current filter',
      });
    },
    async RefetchNFTs() {
      this.loadingRequest = false;
      this.nftStore.ownedNFTs = [] as TokenIdentifier[];
      await this.nftStore.fetchNFTs(this.userStore.walletAddress);
    },
    async SetListableNFTs() {
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
          this.listableNFTs = await ReturnMissingNFTDetails(listableOwnedNFTs);
          this.listableFiltersStore.setAllFilters(this.listableNFTs);
          this.listableFiltersStore.filteredListableTokens = this.listableNFTs;
          // this.listableNFTs = this.listableNFTs.concat(this.listableNFTs);
          // this.listableNFTs = this.listableNFTs.concat(this.listableNFTs);
          // this.listableNFTs = this.listableNFTs.concat(this.listableNFTs);
        }
      }
      // console.log('Listable NFTs Set', this.listableNFTs)
    },
    UpdateListableNFTWithPrice(listed: ListableToken) {
      const listedIndex = this.listableNFTs.findIndex(
        nft =>
          nft.contractAddress == listed.contractAddress &&
          nft.identifierOrCriteria == listed.identifierOrCriteria &&
          nft.network == listed.network
      );
      this.listableNFTs[listedIndex].listingPrice = listed.listingPrice;
      this.listableFiltersStore.UpdateListableNFTPriceInDuplicate(listed);
    },
  },
});
</script>

<style scoped>
:deep(.q-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
