<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
    :maximized="$q.screen.width > 600 ? false : true"
    @hide="tourStore.setSuggestedWinesDialog()"
  >
    <q-card class="suggested-wines column items-center q-px-md no-wrap">
      <q-card-section class="join-wiv-world">
        <div>We're happy to see you join WiV wine world!</div>
      </q-card-section>
      <q-card-section
        class="suggest-trending-today row justify-center items-center q-gutter-x-sm"
      >
        <q-img src="../../../public/images/trending.svg" width="22px" />
        <span>TRENDING TODAY</span>
      </q-card-section>

      <q-card-section class="suggested-paragraph">
        <div class="suggested-p">
          Check our special offers for you to start with -
        </div>
        <div class="suggested-p">most trending at this moment!</div>
        <div class="suggested-p-mobile">
          Check our special offers for you to start with most trending at this
          moment!
        </div>
      </q-card-section>
      <q-card-section class="suggested-wines-section row justify-between">
        <div
          v-for="token in recommendations.slice(0, $q.screen.width > 1024 ? 4 : $q.screen.width > 600 ? 3 : 2)"
          :key="
            token.tokenID + ',' + token.network + ',' + token.smartContractAddress
          "
          class="suggest-card-individual q-mb-sm"
          @click="openNFT(token)"
        >
          <q-card class="q-ma-xs suggest-nft-card" flat>
            <img
              :src="token.image"
              class="suggest-card-image clickable-image"
            />
            <div
              class="q-pb-sm suggest-card-brand column justify-center"
              style="text-align: left"
            >
              <span>
                {{ truncateText(token.brand) }}
              </span>
            </div>
            <q-card-section
              class="row justify-between suggest-price-container q-py-sm"
            >
              <div class="column items-start justify-evenly">
                <span class="suggest-price-header q-pb-xs"> Price </span>
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
                    <span class="suggest-price-text-b-active">
                      {{ token.orderDetails.listingPrice }}
                    </span>
                  </div>
                </div>
                <div v-else class="q-pt-sm" style="display: flex">
                  <span class="suggest-price-text-b-inactive">
                    Not Listed
                  </span>
                </div>
              </div>
              <div class="column items-center justify-between q-gutter-y-xs">
                <q-img
                  v-if="!!userStore.walletAddress && !!token.favoriteLoading"
                  src="../../assets/loading-heart.gif"
                  :style="
                    $q.screen.width > 350
                      ? 'width: 27px; height: 27px; margin: -4px -4px -4px -4px'
                      : 'width: 22px; height: 22px; margin: -3px -3px -4px -4px'
                  "
                />
                <q-img
                  v-else-if="!!userStore.walletAddress && token.favorited === true"
                  src="../../../public/images/heart.svg"
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
                  src="../../../public/images/empty-heart.svg"
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
                  v-if="
                    userStore.user &&
                    userStore.user.verificationStatus === 'VERIFIED' &&
                    !token.isOwned &&
                    !!token.orderDetails?.listingPrice &&
                    !!token.orderDetails?.transactionStatus
                  "
                  dense
                  unelevated
                  flat
                  no-caps
                  :ripple="false"
                  class="q-pa-none"
                  @click.stop="
                    AcceptOffer(
                      token.orderDetails.orderHash,
                      token.brand,
                      token.image,
                      token
                    )
                  "
                >
                  <img
                    src="../../../src/assets/small-bag-btn.svg"
                    style="border-radius: 0 !important"
                  />
                </q-btn>
                <img
                  v-if="!!token.isOwned"
                  src="../../../src/assets/owned-tick.svg"
                  style="border-radius: 0 !important; padding-top: 6px"
                />
              </div>
            </q-card-section>
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
      </q-card-section>

      <q-card-section
        class="suggested-buttons-container no-wrap q-gutter-x-sm"
        :class="$q.screen.width > 600 ? 'row items-center' : 'full-width column items-center q-gutter-y-sm'"
      >
        <q-btn
          v-close-popup
          no-caps
          class="suggested-skip-button suggested-skip-text"
          unelevated
        >
          Skip
        </q-btn>
        <q-btn
          v-close-popup
          no-caps
          class="suggested-more-button suggested-more-text"
          @click="() => $router.push('/marketplace?tab=recommended')"
        >
          Show more
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import '../../css/MainLayout/SuggestedWines.css';
import { ListingWithPricingAndImage } from 'src/pages/Marketplace-Main/models/Response.models';
import { useTourStore } from 'src/stores/tour-state';
import { useUserStore } from 'src/stores/user-store';
import { AddFavorites, RemoveFavorites } from 'src/pages/Favourites/services/FavoritesFunctions';
import { GetCurrencyLabel } from 'src/shared/currency.helper';
import { useNFTStore } from 'src/stores/nft-store';
import { FulfillBasicOrder } from 'src/pages/Metadata/services/Orders';
import OrderAccepted from 'src/pages/SharedPopups/OrderAccepted.vue';
import ProfileErrors from 'src/pages/SharedPopups/ProfileErrors.vue';
import TxnOngoing from 'src/pages/SharedPopups/TxnOngoing.vue';

export default defineComponent({
  name: 'SuggestedWines',
  components: {
    AcceptedOrderDialog: OrderAccepted,
    ErrorDialog: ProfileErrors,
    OngoingTransactionDialog: TxnOngoing
  },
  props: {
    recommendations: {
      type: [] as PropType<ListingWithPricingAndImage[]>,
      default: [],
    }
  },
  emits: ['favorite-action'],
  data() {
    const tourStore = useTourStore();
		const userStore = useUserStore();
		const nftStore = useNFTStore();
    return {
      tourStore,
			userStore,
      nftStore,
      GetCurrencyLabel,

      ongoingTxn: false,
      openOrderAccepted: false,
      openErrorDialog: false,
      errorType: '',
      errorTitle: '',
      errorMessage: '',
    };
  },
  methods: {
		async addRemoveFavorites(
      tokenID: string,
      cAddress: string,
      network: string,
      objective: string
    ) {
      const nftIndex = this.recommendations.findIndex(
        nft =>
          nft.smartContractAddress == cAddress &&
          nft.tokenID == tokenID &&
          nft.network == network
      );
      switch (objective) {
        case 'add':
          try {
            this.$emit('favorite-action', { source: 'suggestions', nftIndex: nftIndex, state: 'processing' })
            await AddFavorites({
              walletAddress: this.userStore.walletAddress,
              tokenID: tokenID,
              contractAddress: cAddress,
              network: network,
            });
            this.$emit('favorite-action', { source: 'suggestions', nftIndex: nftIndex, state: 'favorited' })
          } catch {
            return 0;
          }
          break;
        case 'remove':
          try {
            this.$emit('favorite-action', { source: 'suggestions', nftIndex: nftIndex, state: 'processing' })
            await RemoveFavorites({
              walletAddress: this.userStore.walletAddress,
              tokenID: tokenID,
              contractAddress: cAddress,
              network: network,
            });
            this.$emit('favorite-action', { source: 'suggestions', nftIndex: nftIndex, state: 'unfavorited' })
          } catch {
            return 0;
          }
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
    async AcceptOffer(
      orderHash: string,
      brand: string,
      image: string
    ) {
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
    openNFT(token: ListingWithPricingAndImage) {
      const routeData = this.$router.resolve({
        path: '/nft',
        query: {
          id: token.tokenID,
          network: token.network,
          contractAddress: token.smartContractAddress,
        },
      });
      window.open(routeData.href, '_blank');
    },
  },
});
</script>

<style scoped>
@media screen and (min-width: 600px) {
  .q-dialog__inner--minimized > div {
    max-width: none;
  }
  .q-dialog__inner > div {
    border-radius: 20px;
  }
}
</style>
