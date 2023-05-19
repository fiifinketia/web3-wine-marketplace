<template>
  <q-page
    class="column items-center"
    style="margin-bottom: 10px; min-height: 0"
  >
    <FavsHeader
      :nfts-length="favNFTs.length"
      @brand-search="val => getAllFavoritesWithBrand(val)"
      @reset-search="getAllFavoritesWithoutBrand()"
    />
    <FavsError
      v-if="!isLoading && !!erroredOut"
      @reset-search="getAllFavoritesWithoutBrand()"
    />
    <FavsMissing v-else-if="!isLoading && !!emptySearch" />
    <div
      v-else-if="!isLoading && !emptyRequest"
      id="favorites-container"
      class="row q-gutter-y-md"
      :class="
        favNFTs.length >= 4 && $q.screen.width > 600
          ? 'justify-between q-px-md'
          : favNFTs.length == 3 && $q.screen.width > 600
          ? 'justify-evenly q-px-md'
          : $q.screen.width > 600
          ? 'justify-start q-gutter-x-lg'
          : favNFTs.length >= 2
          ? 'justify-around q-px-sm'
          : 'justify-start q-px-sm'
      "
      style="width: 100%"
    >
      <div
        v-for="nft in favNFTs"
        :key="nft.tokenID"
        class="favorites-card-container"
      >
        <q-card class="q-ma-xs" flat>
          <img class="favorites-card-image clickable-image" :src="nft.image" />
          <div
            class="q-pb-sm favorites-brand column justify-center"
            style="text-align: left"
          >
            <span>
              {{ truncateText(nft.brand) }}
            </span>
          </div>
          <q-card-section
            class="row justify-between q-py-sm favorites-price-container"
          >
            <div class="column items-start justify-evenly">
              <span class="favorites-price-text q-pb-xs"> Price </span>
              <div
                v-if="
                  !!nft.orderDetails?.listingPrice &&
                  !!nft.orderDetails?.transactionStatus
                "
                class="row items-center justify-between full-width"
                @click.stop
              >
                <div class="row items-center q-gutter-x-xs q-pt-xs">
                  <q-icon
                    :name="`app:${GetCurrencyLabel(
                      nft.orderDetails.currency
                    )}-icon`"
                    class="currency-logo"
                  />
                  <span class="favorites-b-text-active">
                    {{ nft.orderDetails.listingPrice }}
                  </span>
                </div>
              </div>
              <div v-else class="q-pt-sm" style="display: flex">
                <span class="favorites-b-text-inactive"> Not Listed </span>
              </div>
            </div>
            <div class="column items-center justify-between q-gutter-y-xs">
              <q-img
                v-if="!!nft.favoriteLoading"
                src="../../assets/loading-heart.gif"
                :style="
                  $q.screen.width > 350
                    ? 'width: 27px; height: 27px; margin: -4px -4px -4px -4px'
                    : 'width: 22px; height: 22px; margin: -3px -3px -4px -4px'
                "
              />
              <q-img
                v-else
                src="../../../public/images/heart.svg"
                class="clickable-image remove-favorite"
                :width="$q.screen.width > 350 ? '20px' : '16px'"
                :height="$q.screen.width > 350 ? '20px' : '16px'"
                @click.stop="
                  removeNFT(nft.tokenID, nft.smartContractAddress, nft.network)
                "
              />
              <q-btn
                v-if="
                  !nft.isOwned &&
                  !!nft.orderDetails?.listingPrice &&
                  !!nft.orderDetails?.transactionStatus
                "
                dense
                unelevated
                flat
                no-caps
                :ripple="false"
                class="q-pa-none"
                @click.stop="
                  AcceptOffer(
                    nft.orderDetails.orderHash,
                    nft.brand,
                    nft.image,
                    nft
                  )
                "
              >
                <img
                  src="../../assets/small-bag-btn.svg"
                  style="border-radius: 0 !important"
                />
              </q-btn>
              <img
                v-if="!!nft.isOwned"
                src="../../assets/owned-tick.svg"
                style="border-radius: 0 !important; padding-top: 6px"
              />
            </div>
          </q-card-section>
          <q-menu touch-position context-menu>
            <q-list dense style="min-width: 100px">
              <q-item v-close-popup clickable>
                <q-item-section @click="openNFT(nft)">Open</q-item-section>
              </q-item>
              <q-item v-close-popup clickable>
                <q-item-section @click="openNFT(nft, 'new-tab')"
                  >Open link in New Tab</q-item-section
                >
              </q-item>
              <q-item v-close-popup clickable>
                <q-item-section @click="openNFT(nft, 'new-window')"
                  >Open link in New Window</q-item-section
                >
              </q-item>
              <q-separator />
              <q-item v-close-popup clickable>
                <q-item-section @click="copyAddress(nft)"
                  >Copy Link</q-item-section
                >
              </q-item>
              <q-item v-close-popup clickable>
                <q-item-section @click="copyToken(nft)"
                  >Copy Token Details</q-item-section
                >
              </q-item>
            </q-list>
          </q-menu>
        </q-card>
        <AcceptedOrderDialog
          v-model="openOrderAccepted"
          :order-accepted="'listing'"
        />
        <ErrorDialog
          v-model="openErrorDialog"
          :error-type="errorType"
          :error-title="errorTitle"
          :error-message="errorMessage"
        />
        <OngoingTransactionDialog v-model="ongoingTxn" />
      </div>
    </div>
    <div
      v-else-if="!isLoading && emptyRequest"
      style="min-height: calc(100vh - 200px); width: 80%"
      class="column items-center justify-center"
    >
      <FavsEmpty />
    </div>
    <div
      v-else
      class="row q-px-md q-pt-sm q-gutter-y-md"
      :class="$q.screen.width > 600 ? 'justify-between' : 'justify-around'"
    >
      <div
        v-for="loading in loadingFavNFTs"
        :key="loading"
        class="favorites-loading-card-container"
      >
        <q-card class="q-ma-xs" flat>
          <img
            src="../../../src/assets/loading-card.svg"
            class="favorites-card-image"
          />
          <img
            src="../../../src/assets/loading-brand.svg"
            style="height: 35px"
            class="q-my-md"
          />
          <img src="../../../src/assets/loading-pricebox.svg" />
        </q-card>
      </div>
    </div>
    <FavsRemoved
      v-model="removeDialog"
      :index="index"
      :network="network"
      :smart-contract-address="smartContractAddress"
      :token-id="tokenID"
      @unfavorite="action => DialogAction(action)"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '../../css/Favorites/Favorites.css';
import { FavoritesModel } from './models/Response';
import {
  RemoveFavorites,
  GetAllFavorites,
} from './services/FavoritesFunctions';
import { useUserStore } from 'src/stores/user-store';
import { useTourStore } from 'src/stores/tour-state';
import FavoritesHeader from './FavoritesHeader.vue';
import EmptyFavorites from './EmptyFavorites.vue';
import RemoveDialog from './RemoveDialog.vue';
import ErrorFavorites from './ErrorFavorites.vue';
import MissingFavorites from './MissingFavorites.vue';
import { SetSessionID } from 'src/shared/amplitude-service';
import { useNFTStore } from 'src/stores/nft-store';
import { AssociateOwned } from 'src/shared/association.helper';
import { FulfillBasicOrder } from '../Metadata/services/Orders';
import OrderAccepted from '../SharedPopups/OrderAccepted.vue';
import ProfileErrors from '../SharedPopups/ProfileErrors.vue';
import TxnOngoing from '../SharedPopups/TxnOngoing.vue';
import { GetCurrencyLabel } from 'src/shared/currency.helper';

export default defineComponent({
  name: 'FavouritesPage',
  components: {
    FavsRemoved: RemoveDialog,
    FavsHeader: FavoritesHeader,
    FavsEmpty: EmptyFavorites,
    FavsError: ErrorFavorites,
    FavsMissing: MissingFavorites,
    AcceptedOrderDialog: OrderAccepted,
    ErrorDialog: ProfileErrors,
    OngoingTransactionDialog: TxnOngoing,
  },
  data() {
    const userStore = useUserStore();
    const tourStore = useTourStore();
    const nftStore = useNFTStore();
    return {
      favNFTs: Array<FavoritesModel & { isOwned?: boolean }>(),
      loadingFavNFTs: [0, 1, 2, 3, 4, 5, 6, 7],
      isLoading: true,
      emptyRequest: false,
      emptySearch: false,
      brandSearch: '',
      userStore,
      nftStore,
      removeDialog: false,
      erroredOut: false,
      tourStore,

      openOrderAccepted: false,
      openErrorDialog: false,

      errorType: '',
      errorTitle: '',
      errorMessage: '',

      ongoingTxn: false,

      GetCurrencyLabel,
      index: 0,
      smartContractAddress: '',
      tokenID: '',
      network: '',
    };
  },
  async mounted() {
    SetSessionID();
    await this.getAllFavoritesWithoutBrand();
    await this.startPageTour();
  },
  methods: {
    async PreventExitDuringTxn(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = '';
    },
    SetPreventingExitListener(action: boolean) {
      if (action) {
        this.ongoingTxn = true;
        window.addEventListener('beforeunload', this.PreventExitDuringTxn);
      } else {
        this.ongoingTxn = false;
        window.removeEventListener('beforeunload', this.PreventExitDuringTxn);
      }
    },
    DialogAction(action: {
      index: number;
      token: { tokenID: string; cAddress: string; network: string };
      cancel: boolean;
    }) {
      this.removeDialog = false;
      const { index, token, cancel } = action;
      this.UnfavoriteNFT(index, token, cancel);
    },
    async getAllFavorites(walletAddress: string, brand: string) {
      this.isLoading = true;
      try {
        const { result: nfts } = await GetAllFavorites(walletAddress, brand);
        this.IncorporateOwnedNFTs(nfts);
        this.CheckForEmptiness(this.favNFTs, brand);
        this.erroredOut = false;
      } catch {
        this.erroredOut = true;
      } finally {
        this.isLoading = false;
      }
    },
    IncorporateOwnedNFTs(nfts: FavoritesModel[]) {
      const nftsFetched = this.nftStore.fetchNFTsStatus;
      if (!!nftsFetched) {
        this.favNFTs = AssociateOwned(nfts, this.nftStore.ownedNFTs);
      } else {
        this.favNFTs = nfts;
      }
    },
    async removeNFT(tokenID: string, cAddress: string, network: string) {
      const nftIndex = this.favNFTs.findIndex(
        nft =>
          nft.smartContractAddress == cAddress &&
          nft.tokenID == tokenID &&
          nft.network == network
      );
      this.tokenID = tokenID;
      this.index = nftIndex;
      this.smartContractAddress = cAddress;
      this.network = network;
      try {
        if (nftIndex > -1) {
          this.favNFTs[nftIndex].favoriteLoading = true;
          this.removeDialog = true;
          await new Promise(resolve => setTimeout(resolve, 1500));
          if (!!this.removeDialog) {
            await this.UnfavoriteNFT(
              nftIndex,
              { tokenID, cAddress, network },
              false
            );
          }
        }
      } catch {
        return 0;
      }
    },
    async UnfavoriteNFT(
      index: number,
      favorite: { tokenID: string; cAddress: string; network: string },
      isCancelled: boolean
    ) {
      if (!isCancelled) {
        try {
          await RemoveFavorites({
            walletAddress: this.userStore.walletAddress,
            tokenID: favorite.tokenID,
            contractAddress: favorite.cAddress,
            network: favorite.network,
          });
          this.favNFTs.splice(index, 1);
          this.CheckForEmptiness(this.favNFTs, '');
        } catch {
          this.favNFTs[index].favoriteLoading = false;
        } finally {
          this.removeDialog = false;
        }
      } else {
        this.favNFTs[index].favoriteLoading = false;
      }
    },
    getAllFavoritesWithBrand(brand: string) {
      this.getAllFavorites(this.userStore.walletAddress, brand);
    },
    async getAllFavoritesWithoutBrand() {
      await this.getAllFavorites(this.userStore.walletAddress, '');
    },
    truncateText(text: string) {
      if (this.$q.screen.width > 1350) {
        if (text.length > 50) {
          return (
            text.trim().substring(0, 50).split(' ').slice(0, -1).join(' ') + '…'
          );
        } else return text;
      } else if (this.$q.screen.width <= 600) {
        if (text.length > 35) {
          return (
            text.trim().substring(0, 35).split(' ').slice(0, -1).join(' ') + '…'
          );
        } else return text;
      } else {
        if (text.length > 40) {
          return (
            text.trim().substring(0, 40).split(' ').slice(0, -1).join(' ') + '…'
          );
        } else return text;
      }
    },
    CheckForEmptiness(favNFTs: FavoritesModel[], brand: string) {
      if (favNFTs.length == 0) {
        if (!!brand) {
          this.emptySearch = true;
        } else {
          this.emptyRequest = true;
        }
      } else {
        this.emptySearch = false;
        this.emptyRequest = false;
      }
    },
    openNFT(token: FavoritesModel, where?: string) {
      const routeData = this.$router.resolve({
        path: '/nft',
        query: {
          id: token.tokenID,
          network: token.network,
          contractAddress: token.smartContractAddress,
        },
      });
      switch (where) {
        case 'here':
          this.$router.push({
            path: '/nft',
            query: {
              id: token.tokenID,
              network: token.network,
              contractAddress: token.smartContractAddress,
            },
          });
          break;
        case 'new-tab':
          window.open(routeData.href, '_blank');
          break;
        case 'new-window':
          window.open(
            routeData.href,
            '_blank',
            'location=yes,status=yes,scrollbars=yes,height=auto,width=auto'
          );
          break;
        default:
          this.$router.push({
            path: '/nft',
            query: {
              id: token.tokenID,
              network: token.network,
              contractAddress: token.smartContractAddress,
            },
          });
          break;
      }
    },
    copyToken(token: FavoritesModel) {
      navigator.clipboard.writeText(JSON.stringify(token));
    },
    copyAddress(token: FavoritesModel) {
      const routeData = this.$router.resolve({
        path: '/nft',
        query: {
          id: token.tokenID,
          network: token.network,
          contractAddress: token.smartContractAddress,
        },
      });
      navigator.clipboard.writeText(window.location.host + routeData.href);
    },
    async startPageTour() {
      if (this.tourStore.favoritesCompleted) return;

      await this.waitForLoad();

      if (this.emptyRequest || this.emptySearch || this.erroredOut) return;

      // Start the tour

      this.$shepherd.addSteps([
        {
          id: 'favorites-search-input',
          attachTo: {
            element: '.favorites-search-input',
            on: 'bottom',
          },
          title: 'Search',
          text: 'Search for your favorite NFTs',
          buttons: [
            {
              text: 'Next',
              action: () => {
                this.$shepherd.next();
                this.$shepherd.removeStep('favorites-search-input');
              },
            },
            {
              text: 'Skip',
              action: () => {
                // Cancel and set favoritesCompleted to true
                this.$shepherd.cancel();
                this.$shepherd.removeStep('favorites-search-input');
                this.tourStore.setFavoritesCompleted();
              },
            },
          ],
        },
        {
          id: 'favorites-search-button',
          attachTo: {
            element: '#favorites-search-button',
            on: 'bottom',
          },
          title: 'Search',
          text: 'Click to Search for your favorite NFTs',
          buttons: [
            {
              text: 'Next',
              action: () => {
                this.$shepherd.next();
                this.$shepherd.removeStep('favorites-search-button');
              },
            },
            {
              text: 'Skip',
              action: () => {
                // Cancel and set favoritesCompleted to true
                this.$shepherd.cancel();
                this.tourStore.setFavoritesCompleted();
                this.$shepherd.removeStep('favorites-search-button');
              },
            },
          ],
        },
      ]);

      // Check if there are any favorites
      if (this.favNFTs.length > 0) {
        this.$shepherd.addSteps([
          {
            id: 'favorites-item',
            attachTo: {
              // Select first element of the children in div id #favorites-container
              element: document.querySelector(
                '#favorites-container > div:first-child'
              ),
              on: 'bottom',
            },
            title: 'Favorite NFT',
            text: 'Click on the NFT to open it in a new tab',
            buttons: [
              {
                text: 'Next',
                action: () => {
                  this.$shepherd.next();
                  this.$shepherd.removeStep('favorites-item');
                },
              },
              {
                text: 'Skip',
                action: () => {
                  // Cancel and set favoritesCompleted to true
                  this.$shepherd.cancel();
                  this.tourStore.setFavoritesCompleted();
                  this.$shepherd.removeStep('favorites-item');
                },
              },
            ],
          },
          {
            id: 'favorites-item-remove',
            attachTo: {
              // Select first element of the children in div id #favorites-container
              element: document.querySelector(
                '#favorites-container > div:first-child .remove-favorite'
              ),
              on: 'bottom',
            },
            title: 'Remove Favorite',
            buttons: [
              {
                text: 'Finish',
                action: () => {
                  // Cancel and set favoritesCompleted to true
                  this.$shepherd.complete();
                  this.tourStore.setFavoritesCompleted();
                  this.$shepherd.removeStep('favorites-item-remove');
                },
              },
            ],
          },
        ]);
      }

      // Start the tour
      setTimeout(() => {
        this.$shepherd.start();
      }, 3000);
      this.tourStore.setFavoritesCompleted();
    },

    async waitForLoad() {
      return new Promise<void>(resolve => {
        const checkValue = () => {
          if (this.isLoading === false && this.tourStore.suggestedWinesDialog) {
            resolve();
          } else {
            setTimeout(checkValue, 100); // wait for 100 milliseconds before checking again
          }
        };
        checkValue();
      });
    },

    async AcceptOffer(orderHash: string, brand: string, image: string) {
      if (!this.userStore.user) throw new Error('User not logged in');
      this.SetPreventingExitListener(true);
      try {
        await FulfillBasicOrder(
          orderHash,
          brand,
          false,
          this.userStore.user,
          image
        );
        this.openOrderAccepted = true;
        setTimeout(() => {
          this.openOrderAccepted = false;
        }, 2000);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        this.HandleError({
          errorType: 'accept',
          errorTitle: 'Sorry, the purchase failed',
          errorMessage:
            'It may be due to insufficient balance, disconnected wallet, etc.',
        });
        this.SetPreventingExitListener(false);
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
      }, 2500);
    },
  },
});
</script>

<style></style>
