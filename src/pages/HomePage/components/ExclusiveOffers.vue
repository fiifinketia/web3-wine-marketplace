<template>
  <q-card class="column items-center full-width no-wrap no-shadow">
    <div class="column exclusive-offer-title justify-center">
      <span>Invest in wines to taste & exclusive offers ...</span>
    </div>

    <q-card-section class="q-pt-lg exclusive-offer-container">
      <div v-if="!isLoading" class="row no-wrap justify-center q-gutter-x-sm">
        <div
          v-for="token in exclusiveOffers.slice(0, $q.screen.width > 1024 ? 4 : $q.screen.width > 768 ? 3 : 2)"
          :key="token.tokenID + ',' + token.network + ',' + token.smartContractAddress"
          class="q-pa-sm exclusive-card-container"
        >
          <q-card class="q-ma-xs exclusive-card" flat>
            <img
              :src="token.image"
              class="exclusive-card-image clickable-image"
            />
            <div
              class="q-pb-sm exclusive-card-brand column justify-center"
              style="text-align: left"
            >
              <span>
                {{ truncateText(token.brand) }}
              </span>
            </div>
            <q-card-section class="row justify-between exclusive-price-container q-py-sm">
              <div class="column items-start justify-evenly">
                <span class="exclusive-price-header q-pb-xs"> Price </span>
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
                    <span class="exclusive-price-text-b-active">
                      {{ token.orderDetails.listingPrice }}
                    </span>
                  </div>
                </div>
                <div v-else class="q-pt-sm" style="display: flex">
                  <span class="exclusive-price-text-b-inactive">
                    Not Listed
                  </span>
                </div>
              </div>
              <div class="column items-center justify-between q-gutter-y-xs">
                <q-img
                  v-if="!!userStore.walletAddress && !!token.favoriteLoading"
                  src="../../../assets/loading-heart.gif"
                  :style="
                    $q.screen.width > 350
                      ? 'width: 27px; height: 27px; margin: -4px -4px -4px -4px'
                      : 'width: 22px; height: 22px; margin: -3px -3px -4px -4px'
                  "
                />
                <q-img
                  v-else-if="!!userStore.walletAddress && token.favorited === true"
                  src="../../../../public/images/heart.svg"
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
                  src="../../../../public/images/empty-heart.svg"
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
                    PurchaseListing(
                      token.orderDetails.orderHash,
                      token.brand,
                      token.image,
                      token
                    )
                  "
                >
                  <img
                    src="../../../assets/small-bag-btn.svg"
                    style="border-radius: 0 !important"
                  />
                </q-btn>
                <img
                  v-if="!!token.isOwned"
                  src="../../../assets/owned-tick.svg"
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
      </div>
      <div v-else class="row no-wrap justify-between">
        <div
          v-for="loading in loadingNFTs"
          :key="loading"
          class="no-shadow q-pa-sm exclusive-card-container col-xs-3"
        >
          <div>
            <q-card class="q-ma-md" flat>
              <img
                src="../../../assets/loading-card.svg"
                class="releases-card-image"
              />
              <img
                src="../../../assets/loading-brand.svg"
                :style="
                  $q.screen.width > 1025 ? 'height: 25px' : 'height: 30px'
                "
                class="q-my-md"
              />
              <img src="../../../assets/loading-pricebox.svg" />
            </q-card>
          </div>
        </div>
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
      <OngoingTransactionDialog v-model="ongoingTxn" />
      <KYCUpdate
        v-model="openKYCUpdate"
        @start-veriff="(sessionDetails) =>
          BeginUserVerification(sessionDetails.continueSession, sessionDetails.lastSessionURL)
        "
      />
    </q-card-section>
    <div class="go-to-marketplace-wrapper row justify-center">
      <q-btn
        id="go-to-marketplace"
        class="app-primary-btn-bg app-btn-text-lg q-mt-lg"
        style="width: 270px"
        unelevated
        no-caps
        @click="$router.push('marketplace?tab=nfts');$emit('shepherdRemoveStep', 'go-to-marketplace')"
      >
        Go to Marketplace
      </q-btn>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import 'src/css/Homepage/ExclusiveOffers.css';
import {
  AddFavorites,
  RemoveFavorites,
} from 'src/pages/Favourites/services/FavoritesFunctions';
import { ListingWithPricingAndImage } from 'src/pages/Marketplace-Main/models/Response.models';
import { RetrieveFilteredNFTs } from 'src/pages/Marketplace-Main/services/RetrieveTokens';
import { useTourStore } from 'src/stores/tour-state';
import { useUserStore } from 'src/stores/user-store';
import { useNFTStore } from 'src/stores/nft-store';
import { GetCurrencyLabel } from 'src/shared/currency.helper';
import { AssociateOwned } from 'src/shared/association.helper';
import { FulfillBasicOrder } from 'src/pages/Metadata/services/Orders';
import { HandleUserValidity, StartVeriff, VerificationStatus } from 'src/shared/veriff-service';
import { mapState } from 'pinia';
import OrderAccepted from 'src/pages/SharedPopups/OrderAccepted.vue';
import ProfileErrors from 'src/pages/SharedPopups/ProfileErrors.vue';
import TxnOngoing from 'src/pages/SharedPopups/TxnOngoing.vue';
import KYCUpdate from 'src/pages/SharedPopups/KYCUpdate.vue';

export default defineComponent({
  name: 'ExclusiveOffers',
  components: {
    AcceptedOrderDialog: OrderAccepted,
    ErrorDialog: ProfileErrors,
    OngoingTransactionDialog: TxnOngoing,
    KYCUpdate: KYCUpdate
  },
  emits: [ 'shepherdRemoveStep' ],
  data() {
    return {
      tourStore: useTourStore(),
      userStore: useUserStore(),
      nftStore: useNFTStore(),
      totalView: 4,
      isLoading: ref(true),
      exclusiveOffers: [] as ListingWithPricingAndImage[],
      loadingNFTs: [0, 1, 2, 3],
      GetCurrencyLabel,
      ongoingTxn: false,
      openOrderAccepted: false,
      openErrorDialog: false,
      openKYCUpdate: false,
      errorType: '',
      errorTitle: '',
      errorMessage: ''
    };
  },
  computed: {
    ...mapState(useUserStore, {
      userStatus: store => store.user?.verificationStatus
    })
  },
  mounted() {
    this.fetchRecommendedWines(0);
  },
  methods: {
    async fetchRecommendedWines(calls: number) {
      try {
        const { result: nfts } = await RetrieveFilteredNFTs();
        this.IncorporateOwnedNFTs(nfts);
				this.isLoading = false;
      } catch (error) {
        this.isLoading = true;
				if(calls > 3) {
					// Try again in 30 secs
					setTimeout(()=> {
						this.fetchRecommendedWines(0)
					}, 30000)
				} else {
					setTimeout(()=> {
						this.fetchRecommendedWines(calls + 1)
					}, 5000)
				}
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
    SetPreventingExitListener(action: boolean) {
      if (action) {
        this.ongoingTxn = true;
        window.addEventListener('beforeunload', this.PreventExitDuringTxn);
      } else {
        this.ongoingTxn = false;
        window.removeEventListener('beforeunload', this.PreventExitDuringTxn);
      }
    },
    async PurchaseListing(
      orderHash: string,
      brand: string,
      image: string
    ) {
      if (!this.userStore.user) throw new Error('User not logged in');
      if (this.userStatus == VerificationStatus.VERIFIED) {
        try {
          this.SetPreventingExitListener(true);
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
      } else {
        try {
          const isVerified = await HandleUserValidity();
          if (isVerified) {
            this.PurchaseListing(orderHash, brand, image);
          } else {
            this.openKYCUpdate = true;
          }
        } catch {
          this.HandleError({
            errorType: 'validation_failed',
            errorTitle: 'Failed to verify user KYC status.',
            errorMessage: 'Please try again later.'
          })
        }
      }
    },
    IncorporateOwnedNFTs(nfts: ListingWithPricingAndImage[]) {
      const nftsFetched = this.nftStore.fetchNFTsStatus;
      if (!!nftsFetched) {
        this.exclusiveOffers = AssociateOwned(nfts, this.nftStore.ownedNFTs);
      } else {
        this.exclusiveOffers = nfts;
      }
    },
    async addRemoveFavorites(
      tokenID: string,
      cAddress: string,
      network: string,
      objective: string
    ) {
      const nftIndex = this.exclusiveOffers.findIndex(
        nft =>
          nft.smartContractAddress == cAddress &&
          nft.tokenID == tokenID &&
          nft.network == network
      );
      switch (objective) {
        case 'add':
          try {
            this.exclusiveOffers[nftIndex].favoriteLoading = true;
            await AddFavorites({
              walletAddress: this.userStore.walletAddress,
              tokenID: tokenID,
              contractAddress: cAddress,
              network: network,
            });
            this.exclusiveOffers[nftIndex].favorited = true;
          } catch {
            return 0;
          } finally {
            this.exclusiveOffers[nftIndex].favoriteLoading = false;
          }
          break;
        case 'remove':
          try {
            this.exclusiveOffers[nftIndex].favoriteLoading = true;
            await RemoveFavorites({
              walletAddress: this.userStore.walletAddress,
              tokenID: tokenID,
              contractAddress: cAddress,
              network: network,
            });
            this.exclusiveOffers[nftIndex].favorited = false;
          } catch {
            return 0;
          } finally {
            this.exclusiveOffers[nftIndex].favoriteLoading = false;
          }
          break;
      }
    },
    BeginUserVerification(continueSession: boolean, lastSessionURL: string) {
      this.openKYCUpdate = false;
      StartVeriff(<string> this.userStore.user?.walletAddress, '', continueSession, lastSessionURL);
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
