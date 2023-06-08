<template>
  <q-page v-if="!loadingMetadata">
    <div v-if="tokenExists">
      <WineTrade
        :nft="nft"
        @open-wallet="openWalletSideBar"
        @refresh-metadata="ValidateAndFetchNFT()"
        @connect-wallet="ConnectWallet()"
        @listing-exists="listed => UpdateListingStatus(listed)"
        @nft-listed="nft.listingDetails.transactionStatus = false"
        @unlist-failed="unlisted => InvalidUnlist(unlisted.status)"
        @favorite-action="FavoriteAction"
				@shepherd-remove-step="(id) => shepherd.removeStep(id)"
				@open-terms-and-conditions="showTermsAndConditions = true"
      />
      <ListingStatusDialog
        v-model="openListingStatusDialog"
        :transaction-status="listingTransactionStatus"
      />
      <UnlistingStatusDialog
        v-model="openListingUnavailableDialog"
        :invalid-status="listingUnavailableStatus"
      />
			<wiv-toc-dialog
				v-model="showTermsAndConditions"
				close-button
			/>
      <q-tabs v-model="tab" no-caps align="justify" class="tabs-menu" >
        <q-tab name="about" label="About" />
        <q-tab id="history" name="history" label="NFT history" />
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="jump-right"
        transition-next="jump-left"
      >
        <q-tab-panel name="about">
          <WineDetails
            :nft="nft"
            :style="$q.screen.width > 600 ? 'padding-bottom: 3rem' : ''"
          />
        </q-tab-panel>
        <q-tab-panel name="history">
          <WineHistory
            :nft-txn-history="txnHistory"
            :nft-chart-data-sets="chartDataSets"
            :is-loading="loadingPrices"
            :errored-out="errorLoadingHistory"
            style="padding-bottom: 3rem"
            @refetch-history="
              GetNFTTXNHistory(
                nft.tokenID,
                nft.smartContractAddress,
                nft.network
              )
            "
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <UnavailableNFT v-else />
  </q-page>
  <q-page v-else>
    <LoadingMetadata />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useShepherd, Tour } from 'vue-shepherd';
import { useUserStore } from 'src/stores/user-store';
import {
  ListingDetails,
  NFTWithListingAndFavorites,
  OfferDetails,
  SeaportTransactionsModel,
} from './models/Metadata';
import { GetMetadata, GetTokenTXNHistory } from './services/Metadata';
import WineHistory from './components/WineHistory.vue';
import WineTrade from './components/WineTrade.vue';
import WineDetails from './components/WineDetails.vue';
// import WineMaker from './components/WineMaker.vue';
import '../../css/Metadata/StatisticsMenu.css';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
import { Contract } from '@ethersproject/contracts';
import { ERC721_PolygonContract } from 'src/shared/web3.helper';
import UnavailableNFT from './components/UnavailableNFT.vue';
import LoadingMetadata from './components/LoadingMetadata.vue';
import ListingExists from '../SharedPopups/ListingExists.vue';
import { useTourStore } from 'src/stores/tour-state';
import { StepOptions } from 'vue-shepherd';
import { useListingStore } from 'src/stores/listing-store';
import ListingUnavailable from '../SharedPopups/ListingUnavailable.vue';

export default defineComponent({
  name: 'MetadataPage',
  components: {
    WineHistory,
    WineDetails,
    // WineMaker,
    WineTrade,
    UnavailableNFT: UnavailableNFT,
    LoadingMetadata: LoadingMetadata,
    ListingStatusDialog: ListingExists,
    UnlistingStatusDialog: ListingUnavailable,
  },
  emits: ['openWalletSidebar', 'openConnectWallet'],

  data() {
    const userStore = useUserStore();
    const tourStore = useTourStore();
    const listingsStore = useListingStore();
    const shepherd = useShepherd({
			useModalOverlay: true,
    }) as Tour;
    return {
      nft: {} as NFTWithListingAndFavorites,
      txnHistory: [] as SeaportTransactionsModel[],
      chartDataSets: {
        wivaChart: [] as number[][],
        stableChart: [] as number[][],
      },
      userStore,
		shepherd,
			tourStore,
      tab: ref('about'),
      listingsStore,
      tokenExists: false,
      loadingMetadata: true,
      loadingPrices: true,
      errorLoadingHistory: false,
			showTermsAndConditions: false,

      openListingStatusDialog: false,
      listingTransactionStatus: false,
      openListingUnavailableDialog: false,
      listingUnavailableStatus: '',
    };
  },

  async mounted() {
    await this.ValidateAndFetchNFT();
    if (!this.tourStore.metadataCompleted && !this.nft.isOwner) {
      this.metadataTour();
    }
  },

  methods: {
    async ValidateAndFetchNFT() {
      this.loadingMetadata = true;
      this.tokenExists = false;
      const {
        id,
        contractAddress,
        network,
        highlight: target,
      } = this.$route.query;
      if (
        typeof id === 'string' &&
        typeof contractAddress === 'string' &&
        typeof network === 'string'
      ) {
        const tokenExistCheck = await this.CheckTokenExistence(
          id,
          contractAddress,
          network
        );
        if (!!tokenExistCheck) {
          await this.SetNFTView(id, contractAddress, network);
          if (target && !sessionStorage.getItem('scrolledToTarget')) {
            this.$nextTick(() => {
              this.tab = 'history';
              this.$nextTick(() => {
                const anchor = document.getElementById(<string>target);
                if (anchor) {
                  anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  return;
                }
              });
              sessionStorage.setItem('scrolledToTarget', 'scrolled');
            });
          }
          this.tokenExists = true;
        }
        this.loadingMetadata = false;
      }
    },

    async InvalidUnlist(status: 'ongoingUnlist' | 'unlisted' | 'purchased') {
      if (status == 'ongoingUnlist') {
        this.nft.listingDetails.listingCancellationStatus = true;
      } else {
        Object.keys(this.nft.listingDetails).forEach(prop => {
          this.nft.listingDetails[prop as keyof ListingDetails] = null;
        });
        if (status == 'purchased') {
          Object.keys(this.nft.offerDetails).forEach(prop => {
            this.nft.offerDetails[prop as keyof OfferDetails] = null;
          });
          this.nft.isOwner = false;
        }
      }
      this.listingUnavailableStatus = status;
      this.openListingUnavailableDialog = true;
      setTimeout(() => {
        this.openListingUnavailableDialog = false;
      }, 2000);
    },

    async SetNFTView(
      identifierOrCriteria: string,
      contractAddress: string,
      network: string
    ) {
      try {
        const nft = await GetMetadata({
          identifierOrCriteria,
          contractAddress,
          network,
          walletAddress: this.userStore.walletAddress,
        });
        if (!!this.userStore.walletAddress) {
          nft.isOwner = await this.CheckOwnership(
            this.userStore.walletAddress,
            contractAddress,
            identifierOrCriteria
          );
        }
        this.nft = nft;
        this.GetNFTTXNHistory(identifierOrCriteria, contractAddress, network);
      } catch (error) {
        throw error;
      }
    },

    UpdateListingStatus(
      listed: TokenIdentifier & {
        listingPrice: string;
        currency: string;
        transactionStatus: boolean;
      }
    ) {
      this.nft.listingDetails.listingPrice = listed.listingPrice;
      this.nft.listingDetails.transactionStatus = listed.transactionStatus;
      this.listingTransactionStatus = listed.transactionStatus;
      this.nft.listingDetails.currency = listed.currency;

      this.listingTransactionStatus = listed.transactionStatus;
      this.openListingStatusDialog = true;
      setTimeout(() => {
        this.openListingStatusDialog = false;
      }, 2000);
    },

    async GetNFTTXNHistory(
      identifierOrCriteria: string,
      contractAddress: string,
      network: string
    ) {
      try {
        this.loadingPrices = true;
        this.errorLoadingHistory = false;
        const txnHistory = await GetTokenTXNHistory({
          identifierOrCriteria,
          contractAddress,
          network,
        });
        const { txns, stableChart, wivaChart } = txnHistory;
        this.txnHistory = txns;
        this.chartDataSets.stableChart = stableChart;
        this.chartDataSets.wivaChart = wivaChart;
      } catch {
        this.errorLoadingHistory = true;
      } finally {
        this.loadingPrices = false;
      }
    },

    async CheckTokenExistence(
      id: string,
      contractAddress: string,
      network: string
    ): Promise<boolean> {
      let exists = true;
      try {
        let contract: Contract = ERC721_PolygonContract;
        await contract.tokenURI(id);
        exists = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const nonexistentMessage = err.message
          .toString()
          .includes('URI query for nonexistent token');
        if (nonexistentMessage) {
          const burntNFT: TokenIdentifier = {
            contractAddress: contractAddress,
            identifierOrCriteria: id,
            network: network,
          };
          this.$axios.post(<string>process.env.BURN_NFT_URL, burntNFT);
          exists = false;
        }
      }
      return exists;
    },

    async CheckOwnership(
      walletAddress: string,
      contractAddress: string,
      tokenID: string
    ) {
      let isOwned = false;
      try {
        let actualOwner = '';
        let contract: Contract = ERC721_PolygonContract;
        actualOwner = await contract.ownerOf(tokenID);
        isOwned = actualOwner.toLowerCase() === walletAddress.toLowerCase();
      } catch (err) {
        throw err;
      } finally {
        return isOwned;
      }
    },

    openWalletSideBar() {
      this.$emit('openWalletSidebar');
    },

    ConnectWallet() {
      this.$emit('openConnectWallet');
    },
    metadataTour() {
      this.shepherd.complete();
      const steps: StepOptions[] = [
        {
          id: 'metadata-details',
          attachTo: {
            element: '#metadata-details',
            on: 'top',
          },
          text: 'You can read the brief details of the wine',
          classes: 'tour-style',
          buttons: [
            {
              text: 'Continue',
              action: () => {
                this.shepherd.next();
                this.shepherd.removeStep('metadata-details');
              },
            },
            {
              text: 'Skip',
              action: () => {
                this.tourStore.setMetadataCompleted();
                this.shepherd.removeStep('metadata-details');
                this.shepherd.cancel();
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
          text: 'This is the listing price of the wine if you want to purchase immediately',
          classes: 'tour-style',
          buttons: [
            {
              text: 'Continue',
              action: () => {
                this.shepherd.next();
                this.shepherd.removeStep('metadata-listing-price');
              },
            },
            {
              text: 'Skip',
              action: () => {
                this.tourStore.setMetadataCompleted();
                this.shepherd.cancel();
                this.shepherd.removeStep('metadata-listing-price');
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
          classes: 'tour-style',
          buttons: [
            {
              text: 'Continue',
              action: () => {
                this.shepherd.next();
                this.shepherd.removeStep('metadata-bidding-price');
              },
            },
            {
              text: 'Skip',
              action: () => {
                this.tourStore.setMetadataCompleted();
                this.shepherd.cancel();
                this.shepherd.removeStep('metadata-bidding-price');
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
          classes: 'tour-style',
          buttons: [
            {
              text: 'Finish',
              action: () => {
                this.tourStore.setMetadataCompleted();
                this.shepherd.complete();
                this.shepherd.removeStep('metadata-checkout-buttons');
              },
            },
          ],
        },
      ];

      this.shepherd.addSteps(steps);
      this.shepherd.start();
      this.tourStore.setMetadataCompleted();
    },
    FavoriteAction(state: 'favorited' | 'unfavorited' | 'processing') {
      if (state == 'favorited') {
        this.nft.favorited = true;
        this.nft.favoriteLoading = false;
      } else if (state == 'unfavorited') {
        this.nft.favorited = false;
        this.nft.favoriteLoading = false;
      } else if (state == 'processing') {
        this.nft.favoriteLoading = true;
      }
    },
  },
});
</script>

<style scoped>
.q-tab-panel {
  padding: 3rem 0 0 !important;
}
</style>
