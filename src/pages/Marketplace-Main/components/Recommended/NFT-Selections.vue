<template>
  <div
    v-if="!isLoading && !erroredOut"
    class="row fit q-mt-xs"
    :class="
      nftSelections.length >= 4 && $q.screen.width > 600
        ? 'justify-between'
        : nftSelections.length == 3 && $q.screen.width > 600
        ? 'justify-evenly'
        : $q.screen.width > 600
        ? 'justify-start q-gutter-x-md'
        : nftSelections.length >= 2
        ? 'justify-around'
        : 'justify-start q-ml-xs'
    "
  >
    <div
      v-for="token in nftSelections"
      :key="
        token.tokenID + ',' + token.network + ',' + token.smartContractAddress
      "
      class="releases-card-container"
      @click="openNFT(token)"
    >
      <q-card class="q-ma-xs releases-nft-card" flat>
        <img :src="token.image" class="releases-card-image clickable-image" />
        <div
          class="q-pb-sm releases-card-brand column justify-center"
          style="text-align: left"
        >
          <span>
            {{ truncateText(token.brand) }}
          </span>
        </div>
        <q-card-section
          class="column items-start releases-price-container q-py-sm"
        >
          <div class="row justify-between" style="width: 100%">
            <span class="releases-price-header q-pb-xs"> Price </span>
            <q-img
              v-if="!!userStore.walletAddress && !!token.favoriteLoading"
              src="../../../../assets/loading-heart.gif"
              :style="
                $q.screen.width > 350
                  ? 'width: 27px; height: 27px; margin: -4px -4px -4px -4px'
                  : 'width: 22px; height: 22px; margin: -3px -3px -4px -4px'
              "
            />
            <q-img
              v-else-if="!!userStore.walletAddress && token.favorited === true"
              src="../../../../../public/images/heart.svg"
              class="clickable-image"
              :width="$q.screen.width > 350 ? '20px' : '16px'"
              :height="$q.screen.width > 350 ? '20px' : '16px'"
              @click.stop="
                addRemoveFavorites(
                  token.tokenID,
                  token.smartContractAddress,
                  token.network,
                  'remove'
                )
              "
            />
            <q-img
              v-else-if="!!userStore.walletAddress"
              src="../../../../../public/images/empty-heart.svg"
              class="clickable-image"
              :width="$q.screen.width > 350 ? '20px' : '16px'"
              :height="$q.screen.width > 350 ? '20px' : '16px'"
              @click.stop="
                addRemoveFavorites(
                  token.tokenID,
                  token.smartContractAddress,
                  token.network,
                  'add'
                )
              "
            />
          </div>
          <div
            v-if="
              !!token.orderDetails?.listingPrice &&
              !!token.orderDetails?.transactionStatus
            "
          >
            <div class="row items-center q-gutter-x-xs q-pt-xs">
              <q-img
                src="../../../../assets/icons/currencies/USDC-Icon.svg"
                :style="
                  $q.screen.width > 350
                    ? 'height: 20px; width: 20px'
                    : 'height: 15px; width: 16px'
                "
              />
              <span class="releases-price-text-b-active">
                {{ ToInt(token.orderDetails.listingPrice) }}
              </span>
            </div>
          </div>
          <div v-else class="q-pt-sm" style="display: flex">
            <span class="releases-price-text-b-inactive"> Not available </span>
          </div>
        </q-card-section>
        <q-menu touch-position context-menu>
          <q-list dense style="min-width: 100px">
            <q-item v-close-popup clickable>
              <q-item-section @click="openNFT(token)">Open</q-item-section>
            </q-item>
            <q-item v-close-popup clickable>
              <q-item-section @click="openNFT(token, 'new-tab')"
                >Open link in New Tab</q-item-section
              >
            </q-item>
            <q-item v-close-popup clickable>
              <q-item-section @click="openNFT(token, 'new-window')"
                >Open link in New Window</q-item-section
              >
            </q-item>
            <q-separator />
            <q-item v-close-popup clickable>
              <q-item-section @click="copyAddress(token)"
                >Copy Link</q-item-section
              >
            </q-item>
            <q-item v-close-popup clickable>
              <q-item-section @click="copyToken(token)"
                >Copy Token Details</q-item-section
              >
            </q-item>
          </q-list>
        </q-menu>
      </q-card>
    </div>
  </div>
  <ErrorView
    v-else-if="!isLoading && !!erroredOut"
    :section-error="sectionError"
    @refetch="RefetchSection()"
  />
  <div
    v-else
    class="row q-pt-none q-px-sm q-gutter-y-md"
    :class="$q.screen.width > 600 ? 'justify-between' : 'justify-around'"
  >
    <div
      v-for="loading in loadingNFTs"
      :key="loading"
      class="releases-loading-card-container"
    >
      <div>
        <q-card class="q-ma-md" flat>
          <img
            src="../../../../assets/loading-card.svg"
            class="releases-card-image"
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
</template>

<script lang="ts">
import { useUserStore } from 'src/stores/user-store';
import { defineComponent, PropType } from 'vue';
import { ListingWithPricingAndImage } from '../../models/Response.models';
import {
  AddFavorites,
  RemoveFavorites,
} from '../../services/FavoritesFunctions';
import NewlyError from './NewlyError.vue';

export default defineComponent({
  components: {
    ErrorView: NewlyError,
  },
  props: {
    nftSelections: {
      type: [] as PropType<ListingWithPricingAndImage[]>,
      default: [],
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    erroredOut: {
      type: Boolean,
      default: false,
    },
    sectionError: {
      type: String,
      default: '',
    },
  },
  emits: ['refetch'],
  data() {
    const userStore = useUserStore();
    return {
      userStore,
      nfts: [] as ListingWithPricingAndImage[],
      loadingNFTs: [0, 1, 2, 3],
    };
  },
  beforeUpdate() {
    this.nfts = this.nftSelections;
  },
  methods: {
    async addRemoveFavorites(
      tokenID: string,
      cAddress: string,
      network: string,
      objective: string
    ) {
      const nftIndex = this.nfts.findIndex(
        nft =>
          nft.smartContractAddress == cAddress &&
          nft.tokenID == tokenID &&
          nft.network == network
      );
      switch (objective) {
        case 'add':
          try {
            this.nfts[nftIndex].favoriteLoading = true;
            await AddFavorites({
              walletAddress: this.userStore.walletAddress,
              tokenID: tokenID,
              contractAddress: cAddress,
              network: network,
            });
            this.nfts[nftIndex].favorited = true;
          } catch {
            return 0;
          } finally {
            this.nfts[nftIndex].favoriteLoading = false;
          }
          break;
        case 'remove':
          try {
            this.nfts[nftIndex].favoriteLoading = true;
            await RemoveFavorites({
              walletAddress: this.userStore.walletAddress,
              tokenID: tokenID,
              contractAddress: cAddress,
              network: network,
            });
            this.nfts[nftIndex].favorited = false;
          } catch {
            return 0;
          } finally {
            this.nfts[nftIndex].favoriteLoading = false;
          }
          break;
      }
    },
    openNFT(token: ListingWithPricingAndImage, where?: string) {
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
    ToInt(price: string) {
      return parseInt(price);
    },
    RefetchSection() {
      this.$emit('refetch');
    },
    copyToken(token: ListingWithPricingAndImage) {
      navigator.clipboard.writeText(JSON.stringify(token));
    },

    copyAddress(token: ListingWithPricingAndImage) {
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
  },
});
</script>

<style></style>
