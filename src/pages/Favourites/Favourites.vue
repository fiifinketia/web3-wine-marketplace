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
          <img
            class="favorites-card-image clickable-image"
            :src="nft.image"
          />
          <div
            class="q-pb-sm favorites-brand column justify-center"
            style="text-align: left"
          >
            <span>
              {{ truncateText(nft.brand) }}
            </span>
          </div>
          <q-card-section class="row justify-between q-py-sm favorites-price-container">
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
                <q-img
                  src="../../assets/icons/currencies/USDC-Icon.svg"
                  :style="
                    $q.screen.width > 350
                      ? 'height: 20px; width: 20px'
                      : 'height: 15px; width: 16px'
                  "
                />
                <span class="favorites-b-text-active">
                  {{ ToInt(nft.orderDetails.listingPrice) }}
                </span>
              </div>
            </div>
            <div v-else class="q-pt-sm" style="display: flex">
              <span class="favorites-b-text-inactive">
                Not Listed
              </span>
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
              class="clickable-image"
              :width="$q.screen.width > 350 ? '20px' : '16px'"
              :height="$q.screen.width > 350 ? '20px' : '16px'"
              @click.stop="removeNFT(nft.tokenID, nft.smartContractAddress, nft.network)"
            />
            <q-btn
              v-if="!nft.isOwned && !!nft.orderDetails?.listingPrice && !!nft.orderDetails?.transactionStatus"
              dense
              unelevated
              flat
              no-caps
              :ripple="false"
              class="q-pa-none"
              @click.stop="AcceptOffer(nft.orderDetails.orderHash, nft.brand, nft.image, nft)"
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
    <FavsRemoved v-model="removeDialog" />
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
import FavoritesHeader from './FavoritesHeader.vue';
import EmptyFavorites from './EmptyFavorites.vue';
import RemoveDialog from './RemoveDialog.vue';
import ErrorFavorites from './ErrorFavorites.vue';
import MissingFavorites from './MissingFavorites.vue';
import { SetSessionID } from 'src/shared/amplitude-service';
import { useNFTStore } from 'src/stores/nft-store';
import { AssociateOwned } from 'src/shared/association.helper';

export default defineComponent({
  name: 'FavouritesPage',
  components: {
    FavsRemoved: RemoveDialog,
    FavsHeader: FavoritesHeader,
    FavsEmpty: EmptyFavorites,
    FavsError: ErrorFavorites,
    FavsMissing: MissingFavorites,
  },
  data() {
    const userStore = useUserStore();
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
    };
  },
  mounted() {
    SetSessionID('pageVisitationTracker');
    this.getAllFavoritesWithoutBrand();
  },
  methods: {
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
      try {
        if (nftIndex > -1) {
          this.favNFTs[nftIndex].favoriteLoading = true;
          this.removeDialog = true;
          setTimeout(() => {
            this.removeFavoritesCountdown(nftIndex, {
              tokenID,
              cAddress,
              network,
            });
          }, 2000);
        }
      } catch {
        return 0;
      } finally {
        this.favNFTs[nftIndex].favoriteLoading = false;
      }
    },
    async removeFavoritesCountdown(
      index: number,
      favorite: { tokenID: string; cAddress: string; network: string }
    ) {
      if (!!this.removeDialog) {
        await RemoveFavorites({
          walletAddress: this.userStore.walletAddress,
          tokenID: favorite.tokenID,
          contractAddress: favorite.cAddress,
          network: favorite.network,
        });
        this.favNFTs.splice(index, 1);
      } else {
        this.favNFTs[index].favoriteLoading = false;
      }
      this.removeDialog = false;
      this.CheckForEmptiness(this.favNFTs, '');
    },
    getAllFavoritesWithBrand(brand: string) {
      this.getAllFavorites(this.userStore.walletAddress, brand);
    },
    getAllFavoritesWithoutBrand() {
      this.getAllFavorites(this.userStore.walletAddress, '');
    },
    ToInt(price: string) {
      return parseInt(price);
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
    }
  },
});
</script>

<style></style>
