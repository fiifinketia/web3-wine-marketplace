<template>
<q-page class="column items-center" :class="!loadingRequest || emptyRequest ? 'justify-center' : ''" style="flex-wrap: nowrap">
  <div v-if="!loadingRequest" class="column items-center">
    <LoadingView
      :loadingText="'Loading your listings'"
    />
  </div>
  <div v-else class="column items-center">
    <div v-if="!emptyRequest" class="column items-center">
      <ListingHeaderLg
        v-if="$q.screen.width > 1020"
        :listingsAmount="listings.length"
        :selectedListingSortKey="listingSortKey"
        :updatedListingBrandFilter="listingBrandFilter"
        @listingBrandFilterUpdated="(val) => listingBrandFilter = val"
        @listingSortKeySelected="(val) => listingSortKey = val"
        @fetchListingsWithBrandFilter="(val) => FetchListings(val.sortKey, val.brandFilter)"
      />
      <ListingHeaderSm
        v-else
        :listingsAmount="listings.length"
        :selectedListingSortKey="listingSortKey"
        :updatedListingBrandFilter="listingBrandFilter"
        @listingBrandFilterUpdated="(val) => listingBrandFilter = val"
        @listingSortKeySelected="(val) => listingSortKey = val"
        @fetchListingsWithBrandFilter="(val) => FetchListings(val.sortKey, val.brandFilter)"
      />
      <div class="profile-main-container column">
        <div class="row q-pa-lg profile-column-name">
          <span class="listings-column-nft">
            NFT
          </span>
          <span 
            v-if="$q.screen.width > 1265"
            class="listings-column-threshold"
          >
            Threshold
          </span>
          <span 
            v-if="$q.screen.width > 600"
            class="listings-column-price"
          >
            Price
          </span>
          <span 
            v-if="$q.screen.width <= 600"
            class="listings-column-yours"
          >
            Yours
          </span>
          <span 
            v-if="$q.screen.width > 1020"
            class="listings-column-highestOffer"
          >
            Highest Offer
          </span>
          <span
            v-if="$q.screen.width > 600"
            class="listings-column-expire"
          >
            Exp On
          </span>
          <span class="listings-column-action">
            Action
          </span>
        </div>
        <q-separator style="background-color: #5e97ec45 !important" inset class="q-mx-xl" />
        <div class="profile-nft-container">
        <div 
          v-for="listing in listings"
          :key="listing.orderHash"
          class="q-px-lg q-py-md row items-center"
        >
          <q-btn 
            flat
            unelevated
            dense
            no-caps
            align="left"
            padding="0px"
            class="listings-column-nft btn--no-hover"
            :to="{ path: '/nft', query: { id: listing.identifierOrCriteria, network: listing.network, contractAddress: listing.contractAddress} }"
          >
            <img v-if="$q.screen.width > 1265" :src="listing.image" class="profile-nft-image q-mr-md"/>
            <span class="profile-nft-brand"> {{ listing.brand }}</span>
          </q-btn>
          <div
            v-if="$q.screen.width > 1265"
            class="row items-center listings-column-threshold"
          >
            <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
            <span class="profile-nft-number"> 0.00 </span>
          </div>
          <div 
            v-if="$q.screen.width > 600"
            class="row items-center listings-column-price"
          >
            <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
            <span class="profile-nft-number"> {{ listing.listingPrice }} </span>
            <q-tooltip 
              v-if="
                $q.screen.width <= 1265 
                && $q.screen.width > 600
              "
              anchor="top start" 
              self="center start"
              class="listing-tooltip-container" 
              :offset="$q.screen.width > 1020 ? [70, 30] : [70, 40]"
            >
              <div class="column">
                <div 
                  v-if="$q.screen.width <= 1020"
                  class="row items-center justify-between"
                >
                  <span class="listing-tooltip-label">
                    Highest Offer
                  </span>
                  <div class="row items-center">
                    <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
                    <span class="listing-tooltip-price-highest q-pl-xs"> {{ !!listing.highestOffer ? listing.highestOffer : '0.00' }} </span>
                  </div>
                </div>
                <div class="row items-center justify-between">
                  <span class="listing-tooltip-label">
                    Threshold
                  </span>
                  <div class="row items-center">
                    <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
                    <span class="listing-tooltip-price-threshold q-pl-xs"> {{ '0.00' }} </span>
                  </div>
                </div>
              </div>
            </q-tooltip>
          </div>
          <div 
            v-if="$q.screen.width > 1020"
            class="row items-center listings-column-highestOffer"
          >
            <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
            <span class="profile-nft-number-highlight"> {{ !!listing.highestOffer ? listing.highestOffer : '0.00' }} </span>
          </div>
          <div 
            v-if="$q.screen.width > 600"
            class="listings-column-expire"
          >
            <span class="profile-nft-number-highlight"> {{ listing.endTime }} </span>
          </div>
          <div 
            v-if="$q.screen.width <= 600"
            class="listings-column-yours column"
          >
            <div class="row q-pb-xs">
              <img src="../../../assets/icons/currencies/USDC-Icon.svg" />
              <span class="profile-nft-number"> {{ listing.listingPrice }} </span>
            </div>
            <span class="profile-nft-number-highlight"> {{ listing.endTime }} </span>
          </div>
          <div style="margin-left: -5px;" class="row items-center listings-column-action">
            <q-btn
              flat
              unelevated
              dense
              @click="OpenDeleteDialog(listing)"
            >
              <img src="../../../assets/trash.svg" />
            </q-btn>
            <q-btn
              flat
              unelevated
              dense
              @click="OpenEditDialog(listing)"
            >
              <img src="../../../assets/edit.svg" />
            </q-btn>
          </div>
          <ListingDialogEdit
            v-model="openEditDialog"
            :brand="singleListing.brand"
            :image="singleListing.image"
            :orderHash="singleListing.orderHash"
            :network="singleListing.network"
            :smartContractAddress="singleListing.contractAddress"
            :tokenID="singleListing.identifierOrCriteria"
            @listing-edit-close="openEditDialog = false"
            @remove-listing="(val) => RemoveRow(val)"
            @listing-error-dialog="HandleError"
          />
          <ListingDialogUnlist
            v-model="openDeleteDialog"
            :orderHash="singleListing.orderHash"
            @listing-delete-close="openDeleteDialog = false"
            @remove-listing="(val) => RemoveRow(val)"
            @listing-error-dialog="HandleError"
          />
        </div>
        </div>
      </div>
      <ErrorDialog
        v-model="openErrorDialog"
        :errorType="errorType"
        :errorTitle="errorTitle"
        :errorMessage="errorMessage"
      />
    </div>
    <div v-else class="column items-center">
      <EmptyView :emptyText="'You have not made any listings yet.'" />
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
import ListingHeaderLg from '../Headers/ListingHeaderLg.vue';
import ListingHeaderSm from '../Headers/ListingHeaderSm.vue';
import OrderLoading from '../OrderLoading.vue';
import EmptyOrders from '../EmptyOrders.vue';
import { useUserStore } from 'src/stores/user-store';
import ListingEdit from '../Popups/ListingEdit.vue';
import ListingUnlist from '../Popups/ListingUnlist.vue';
import { ListingsResponse } from '../models/response.models';
import ProfileErrors from '../Popups/ProfileErrors.vue';

setCssVar('custom', '#5e97ec45');

export default defineComponent({
  components: {
    ListingHeaderLg: ListingHeaderLg,
    ListingHeaderSm: ListingHeaderSm,
    LoadingView: OrderLoading,
    EmptyView: EmptyOrders,
    ListingDialogEdit: ListingEdit,
    ListingDialogUnlist: ListingUnlist,
    ErrorDialog: ProfileErrors
  },

  data() {
    const store = ordersStore();
    const userStore = useUserStore();
    return {
      store,
      userStore,
      listings: store.listings,
      listingSortKey: store.getListingSortKey,

      listingBrandFilter: store.getListingBrandFilter,

      loadingRequest: false,
      emptyRequest: false,

      openEditDialog: false,
      openDeleteDialog: false,

      singleListing: {} as ListingsResponse,

      errorType: '',
      errorTitle: '',
      errorMessage: '',
      openErrorDialog: false
    }
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
        this.loadingRequest = true
      }
    },
    listingBrandFilter: {
      handler: async function (brandFilter) {
        this.store.setListingBrandFilter(brandFilter);
        this.store.setListingBrandFilterStatus(false);
      }
    }
  },

  async mounted() {
    const listingsRequestStatus = this.store.getListingRequestStatus;
    if (listingsRequestStatus == false) {
      await this.FetchListings('', '');
    } else {
      this.$emit('listingsAmount', this.listings.length);
      this.CheckForEmptyRequest();
    }
    this.loadingRequest = true
  },

  methods: {
    async FetchListings(sortKey: string, brandFilter: string) {
      this.loadingRequest = false;
      const address = this.userStore.walletAddress;
      await this.store.setListings(address, sortKey, brandFilter);
      if (this.store.getListings.length == 0 && this.store.listingBrandFilterStatus == true) {
        this.HandleMissingBrand();
      } else {        
        this.listings = this.store.getListings;
        this.$emit('listingsAmount', this.listings.length);
        this.CheckForEmptyRequest();
        this.loadingRequest = true
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
        this.emptyRequest = true 
      }
    },
    HandleError(err: {
      errorType: string,
      errorTitle: string,
      errorMessage: string
    }) {
      this.errorType = err.errorType;
      this.errorTitle = err.errorTitle;
      this.errorMessage = err.errorMessage;
      this.openErrorDialog = true;
      setTimeout(() => { this.openErrorDialog = false }, 2000);
    },
    HandleMissingBrand() {
      this.listingBrandFilter = '';
      this.store.resetListings();
      this.store.setListingBrandFilterStatus(false);
      this.loadingRequest = true;
      this.HandleError({
        errorType: 'filter',
        errorTitle: 'Unable to fetch your orders',
        errorMessage: 'There are no orders under your current filter'
      })
    }
  }
});

</script>

<style scoped>
:deep(.q-btn.btn--no-hover .q-focus-helper) {
	display: none;
}
</style>
