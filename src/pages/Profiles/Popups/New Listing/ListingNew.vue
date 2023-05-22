<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
    :maximized="$q.screen.width > 600 ? false : true"
  >
    <q-card
      v-if="isLoading"
      class="new-list-container q-py-md column items-center"
      :class="$q.screen.width > 600 ? 'q-px-md' : ''"
      style="flex-wrap: nowrap"
    >
      <div class="full-width row items-start justify-center q-pb-sm">
        <div class="column items-center q-gutter-y-sm">
          <span class="new-list-header-text"> Listing NFT </span>
        </div>
        <q-btn
          v-close-popup
          flat
          dense
          unelevated
          class="exit-btn btn--no-hover"
        >
          <img src="../../../../assets/exit-light.svg" />
        </q-btn>
      </div>
      <div
        class="row q-pt-md q-px-sm q-gutter-y-md"
        :class="$q.screen.width > 600 ? 'justify-between' : 'justify-around'"
      >
        <div
          v-for="loading in loadingNFTs"
          :key="loading"
          class="new-list-card-container"
        >
          <div>
            <q-card class="q-ma-md" flat>
              <img
                src="../../../../assets/loading-card.svg"
                class="new-list-card-image"
              />
              <img
                src="../../../../assets/loading-brand.svg"
                :style="$q.screen.width > 1025 ? 'height: 25px' : 'height: 30px'"
                class="q-my-md"
              />
              <img src="../../../../assets/loading-pricebox.svg" />
            </q-card>
          </div>
        </div>
      </div>
    </q-card>
    <q-card
      v-else-if="erroredOut"
      class="new-list-container q-py-md column items-center"
      :class="$q.screen.width > 600 ? 'q-px-md' : ''"
      style="flex-wrap: nowrap"
    >
      <div class="full-width row items-start justify-center q-pb-sm">
        <div class="column items-center q-gutter-y-sm">
          <span class="new-list-header-text"> Listing NFT </span>
        </div>
        <q-btn
          v-close-popup
          flat
          dense
          unelevated
          class="exit-btn btn--no-hover"
        >
          <img src="../../../../assets/exit-light.svg" />
        </q-btn>
      </div>
      <NewListingError
        @refetch-nfts="ReFetchNFTs()"
      />
    </q-card>
    <q-card
      v-else-if="listableNFTs.length > 0"
      class="new-list-container q-py-md"
      :class="$q.screen.width > 600 ? 'q-px-md' : ''"
    >
      <div class="full-width row items-start justify-center q-pb-sm">
        <div class="column items-center q-gutter-y-sm">
          <span class="new-list-header-text"> Listing NFT </span>
          <span class="new-list-subheader-text">
            Click on the NFT you want to sell
          </span>
        </div>
        <q-btn
          v-close-popup
          flat
          dense
          unelevated
          class="exit-btn btn--no-hover"
        >
          <img src="../../../../assets/exit-light.svg" />
        </q-btn>
      </div>
      <NewListingHeader
        v-if="$q.screen.width > 600"
        :listable-n-f-ts="listableNFTs"
        @open-norm-sidebar="showFilterSidebar = true"
      />
      <NewListingNFTs
        class="scroll"
        @open-listing-dialog="token => OpenListingDialog(token)"
      />
      <NewListingDialog
        v-model="openListingDialog"
        :brand="brand"
        :image="image"
        :smart-contract-address="smartContractAddress"
        :network="network"
        :token-i-d="tokenID"
        :is-edit="false"
        @listing-error-dialog="HandleError"
        @listing-edit-close="openListingDialog = false"
        @listable-nft-listed="listed => UpdateListableNFTWithPrice(listed)"
        @listing-exists="alreadyListed => UpdateListableNFT(alreadyListed)"
				@open-terms-and-conditions="$emit('open-terms-and-conditions')"
      />
      <ListingStatusDialog
        v-model="openListingStatusDialog"
        :transaction-status="false"
      />
      <ErrorDialog
        v-model="openErrorDialog"
        :error-type="errorType"
        :error-title="errorTitle"
        :error-message="errorMessage"
      />
      <SidebarNormal
        v-if="$q.screen.width > 600"
        v-model="showFilterSidebar"
        :listable-n-f-ts="listableNFTs"
        @close-sidebar="showFilterSidebar = false"
      />
      <SidebarMobile
        v-else
        v-model="showFilterSidebar"
        :listable-n-f-ts="listableNFTs"
      />
      <q-page-sticky
        v-if="$q.screen.width <= 600"
        class="q-mr-md"
        position="bottom-right"
        :offset="[18, 18]"
      >
        <q-card
          rounded
          class="row items-center justify-center q-pa-xs rounded-borders sidebar-sticky-container"
        >
          <span
            class="text-weight-bold text-h6 sidebar-sticky-filter-icon q-pr-xs"
            clickable
            @click="showFilterSidebar = true"
          >
            {{ listableFiltersStore.getAllFiltersArray.length }}</span
          >
          <q-btn
            dense
            class="sidebar-sticky-filter-icon btn--no-hover"
            color="secondary"
            text-color="white"
            icon="app:filter"
            unelevated
            @click="showFilterSidebar = true"
          />
        </q-card>
      </q-page-sticky>
    </q-card>
    <q-card
      v-else
      class="new-list-container q-py-md column items-center"
      :class="$q.screen.width > 600 ? 'q-px-md' : ''"
      style="flex-wrap: nowrap"
    >
      <div class="full-width row items-start justify-center q-pb-sm">
        <span class="new-list-header-text"> Listing NFT </span>
        <q-btn
          v-close-popup
          flat
          dense
          unelevated
          class="exit-btn btn--no-hover"
        >
          <img src="../../../../assets/exit-light.svg" />
        </q-btn>
      </div>
      <NewListingEmpty />
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import 'src/css/Profile/Component/newListing.css';
import ListingNewHeader from './ListingNewHeader.vue';
import ListingNewNFTs from './ListingNewNFTs.vue';
import { ListableToken, TokenIdentifier } from 'src/shared/models/entities/NFT.model';
import ListingEdit from '../../../SharedPopups/ListingEdit.vue';
import ProfileErrors from '../../../SharedPopups/ProfileErrors.vue';
import SidebarNormal from '../Sidebar/SidebarNormal.vue';
import SidebarMobile from '../Sidebar/SidebarMobile.vue';
import { useListableFilters } from 'src/stores/listable-filters';
import ListingNewEmpty from './ListingNewEmpty.vue';
import ListingNewError from './ListingNewError.vue';
import ListingExists from 'src/pages/SharedPopups/ListingExists.vue';

export default defineComponent({
  components: {
    NewListingHeader: ListingNewHeader,
    NewListingNFTs: ListingNewNFTs,
    NewListingDialog: ListingEdit,
    NewListingEmpty: ListingNewEmpty,
    NewListingError: ListingNewError,
    ErrorDialog: ProfileErrors,
    SidebarNormal: SidebarNormal,
    SidebarMobile: SidebarMobile,
    ListingStatusDialog: ListingExists
  },
  props: {
    listableNFTs: { type: [] as PropType<ListableToken[]>, default: [] },
    erroredOut: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false }
  },
  emits: ['listable-nft-listed', 'refetch-nfts', 'listing-warning-processed', 'listing-warning-processing', 'open-terms-and-conditions'],
  data() {
    const listableFiltersStore = useListableFilters();
    return {
      loadingNFTs: [0, 1, 2],
      openListingDialog: false,
      image: '',
      brand: '',
      smartContractAddress: '',
      network: '',
      tokenID: '',

      errorType: '',
      errorTitle: '',
      errorMessage: '',
      openErrorDialog: false,

      showFilterSidebar: false,

      listableFiltersStore,

      openListingStatusDialog: false
    };
  },
  methods: {
    OpenListingDialog(token: ListableToken) {
      this.image = token.image;
      this.brand = token.brand;
      this.smartContractAddress = token.contractAddress;
      this.network = token.network;
      this.tokenID = token.identifierOrCriteria;
      this.openListingDialog = true;
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
    UpdateListableNFTWithPrice(listed: ListableToken) {
      this.$emit('listable-nft-listed', listed);
    },
    UpdateListableNFT(listed: TokenIdentifier & { listingPrice: string, currency: string, transactionStatus: boolean }) {
      // If still processing, emit listing-warning-processing
      if (!listed.transactionStatus) {
        this.$emit('listing-warning-processing', listed);
        this.openListingStatusDialog = true;
        setTimeout(() => {
          this.openListingStatusDialog = false;
        }, 2000);
      }
      // If already processed, emit listing-warning-processed
      else {
        this.$emit('listing-warning-processed', listed);
      }
    },
    ReFetchNFTs() {
      this.$emit('refetch-nfts')
    }
  },
});
</script>

<style scoped>
@media screen and (min-width: 600px) {
  .q-dialog__inner--minimized > div {
    max-width: none;
  }
}
:deep(.exit-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
