<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
    :maximized="$q.screen.width > 600 ? false : true"
  >
    <q-card
      class="new-list-container q-py-md"
      :class="$q.screen.width > 600 ? 'q-px-md' : ''"
    >
      <div class="full-width row items-start justify-center q-pb-sm">
        <div class="column items-center q-gutter-y-sm">
          <span class="new-list-header-text"> Listing NFT </span>
          <span class="new-list-subheader-text"> Click on the NFT you want to sell </span>
        </div>
        <q-btn 
          v-close-popup
          flat
          dense
          unelevated
          class="exit-btn btn--no-hover"
        >
          <img
            src="../../../../assets/exit-light.svg"
          />
        </q-btn>
      </div>
      <NewListingHeader 
        v-if="$q.screen.width > 600"
        :listableNFTs="listableNFTs"
        @open-norm-sidebar="showFilterSidebar = true"
      />
      <NewListingNFTs 
        class="scroll"
        :listableNFTs="listableNFTs"
        @open-listing-dialog="(token) => OpenListingDialog(token)"
      />
      <NewListingDialog 
        v-model="openListingDialog"
        :brand="brand"
        :image="image"
        :smartContractAddress="smartContractAddress"
        :network="network"
        :tokenID="tokenID"
        :isEdit="false"
        @listing-error-dialog="HandleError"
        @listing-edit-close="openListingDialog = false"
        @listable-nft-listed="(listed) => RemoveListableNFT(listed)"
      />
      <ErrorDialog
        v-model="openErrorDialog"
        :errorType="errorType"
        :errorTitle="errorTitle"
        :errorMessage="errorMessage"
      />
      <SidebarNormal
        v-model="showFilterSidebar"
      />
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import 'src/css/Profile/Component/newListing.css';
import ListingNewHeader from './ListingNewHeader.vue';
import ListingNewNFTs from './ListingNewNFTs.vue';
import { ListableToken } from 'src/shared/models/entities/NFT.model';
import ListingEdit from '../ListingEdit.vue';
import ProfileErrors from '../ProfileErrors.vue';
import SidebarNormal from './Sidebar/SidebarNormal.vue';

export default defineComponent({
  components: {
    NewListingHeader: ListingNewHeader,
    NewListingNFTs: ListingNewNFTs,
    NewListingDialog: ListingEdit,
    ErrorDialog: ProfileErrors,
    SidebarNormal: SidebarNormal
  },
  props: {
    listableNFTs: { type: [] as PropType<ListableToken[]>, default: [] }
  },
  data () {
    return {
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

      showFilterSidebar: true
    }
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
    RemoveListableNFT(listed: ListableToken) {
      this.$emit('listable-nft-listed', listed);
    }
  }
})
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