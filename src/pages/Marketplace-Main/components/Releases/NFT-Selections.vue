<template>
  <div
    v-if="!isLoading && !erroredOut"
    class="row fit"
    :class="
      nfts.length >= 4 && $q.screen.width > 600
        ? 'justify-between'
        : nfts.length == 3 && $q.screen.width > 600
        ? 'justify-evenly'
        : $q.screen.width > 600
        ? 'justify-start q-gutter-x-md'
        : nfts.length >= 2
        ? 'justify-around'
        : 'justify-start q-ml-xs'
    "
  >
    <div
      v-for="token in nfts"
      :key="
        token.tokenID + ',' + token.network + ',' + token.smartContractAddress
      "
      class="releases-card-container"
      @click="openNFT(token)"
    >
      <q-card class="q-ma-xs releases-nft-card" flat>
        <img
          :src="token.image"
          class="releases-card-image clickable-image"
        />
        <div
          class="q-pb-sm releases-card-brand column justify-center"
          style="text-align: left"
        >
          <span>
            {{ truncateText(token.brand) }}
          </span>
        </div>
        <q-card-section class="row justify-between releases-price-container q-py-sm">
          <div class="column items-start justify-evenly">
            <span class="releases-price-header q-pb-xs"> Price </span>
            <div
              v-if="
                !!token.orderDetails?.listingPrice &&
                !!token.orderDetails?.transactionStatus
              "
              class="row items-center justify-between full-width"
              @click.stop
            >
              <div class="row items-center q-gutter-x-xs q-pt-xs">
                <q-icon :name="`app:${GetCurrencyLabel(token.orderDetails.currency)}-icon`" class="currency-logo" />
                <span class="releases-price-text-b-active">
                  {{ ToInt(token.orderDetails.listingPrice) }}
                </span>
              </div>
            </div>
            <div v-else class="q-pt-sm" style="display: flex">
              <span class="releases-price-text-b-inactive">
                Not Listed
              </span>
            </div>
          </div>
          <div class="column items-center justify-between q-gutter-y-xs">
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
            <q-btn
              v-if="!token.isOwned && !!token.orderDetails?.listingPrice && !!token.orderDetails?.transactionStatus"
              dense
              unelevated
              flat
              no-caps
              :ripple="false"
              class="q-pa-none"
              @click.stop="AcceptOffer(token.orderDetails.orderHash, token.brand, token.image, token)"
            >
              <img
                src="../../../../assets/small-bag-btn.svg"
                style="border-radius: 0 !important"
              />
            </q-btn>
            <img
              v-if="!!token.isOwned"
              src="../../../../assets/owned-tick.svg"
              style="border-radius: 0 !important; padding-top: 6px"
            />
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
    <OngoingTransactionDialog v-model="ongoingTxn"/>
  </div>
  <ErrorView
    v-else-if="!isLoading && !!erroredOut"
    :section-error="sectionError"
    @refetch-release="RefetchSection()"
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
        <q-card class="q-ma-xs" flat>
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
import { AddFavorites, RemoveFavorites } from '../../../Favourites/services/FavoritesFunctions';
import NewlyError from './NewlyError.vue';
import { GetCurrencyLabel } from 'src/shared/currency.helper';
import { FulfillBasicOrder } from 'src/pages/Metadata/services/Orders';
import OrderAccepted from 'src/pages/SharedPopups/OrderAccepted.vue';
import ProfileErrors from 'src/pages/SharedPopups/ProfileErrors.vue';
import TxnOngoing from 'src/pages/SharedPopups/TxnOngoing.vue';

export default defineComponent({
  components: {
    ErrorView: NewlyError,
    AcceptedOrderDialog: OrderAccepted,
    ErrorDialog: ProfileErrors,
    OngoingTransactionDialog: TxnOngoing
  },
  props: {
    nftSelections: {
      type: [] as PropType<ListingWithPricingAndImage[]>,
      default: [],
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    erroredOut: {
      type: Boolean,
      default: false
    },
    sectionError: {
      type: String,
      default: ''
    }
  },
  emits: [
    'refetch-release'
  ],
  data() {
    const userStore = useUserStore();
    return {
      userStore,
      nfts: [] as ListingWithPricingAndImage[],
      loadingNFTs: [0, 1, 2, 3],

      openOrderAccepted: false,
      openErrorDialog: false,
      GetCurrencyLabel,

      errorType: '',
      errorTitle: '',
      errorMessage: '',

      ongoingTxn: false
    };
  },
  beforeUpdate() {
    this.nfts = this.nftSelections;
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
      this.$emit('refetch-release')
    },
    async AcceptOffer(
      orderHash: string,
      brand: string,
      image: string
    ) {
      this.SetPreventingExitListener(true);
      const address = this.userStore.walletAddress;
      try {
        await FulfillBasicOrder(orderHash, brand, false, address, image);
        this.openOrderAccepted = true;
        setTimeout(() => {
          this.openOrderAccepted = false;
        }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        this.SetPreventingExitListener(false);
        this.HandleError({
          errorType: 'accept',
          errorTitle: 'Sorry, the purchase failed',
          errorMessage: 'It may be due to insufficient balance, disconnected wallet, etc.'
        });
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
  }
})
</script>

<style>

</style>