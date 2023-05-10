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
      <q-card-section v-if="!isLoading" class="suggested-wines-section row justify-between">
        <q-card
          v-for="item in recommendations"
          :key="item.tokenID"
          class="no-shadow q-pa-sm suggest-card-individual"
        >
          <q-img :src="item.image" alt="wine" aspect-ratio="1" width="100%" />
          <div class="suggest-wine-name q-py-md">
            {{ item.brand }}
          </div>
          <div class="suggest-price-container column q-pa-sm">
            <div class="row justify-between q-pb-sm">
              <div class="suggest-starting-from">Price</div>
              <q-img
              v-if="!!userStore.walletAddress && !!item.favoriteLoading"
              src="../../assets/loading-heart.gif"
              :style="
                $q.screen.width > 350
                  ? 'width: 27px; height: 27px; margin: -4px -4px -4px -4px'
                  : 'width: 22px; height: 22px; margin: -3px -3px -4px -4px'
              "
            />
            <q-img
              v-else-if="!!userStore.walletAddress && item.favorited === true"
              src="../../../public/images/heart.svg"
              class="clickable-image"
              :width="$q.screen.width > 350 ? '20px' : '16px'"
              :height="$q.screen.width > 350 ? '20px' : '16px'"
              @click.stop="
                addRemoveFavorites(
                  item.tokenID,
                  item.smartContractAddress,
                  item.network,
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
                  item.tokenID,
                  item.smartContractAddress,
                  item.network,
                  'add'
                )
              "
            />
            </div>
            <div class="row justify-between">
              <div class="suggest-price">
                <q-img src="../../../public/images/USDT.svg" width="20px" />
                &nbsp; {{ item.orderDetails?.listingPrice || '00.00' }}
              </div>
              <q-img
                src="../../../public/images/mini-button.svg"
                width="24px"
                height="24px"
              />
            </div>
          </div>
        </q-card>
      </q-card-section>
			<q-card-section v-else class="suggested-wines-section row justify-between">
				<div
          v-for="loading in ReturnNumberLoading($q.screen.width)"
          :key="loading"
          :style="$q.screen.width > 1025
            ? 'width: 32%' : $q.screen.width > 600
            ? 'width: 35%;' : 'width: 48%'
          "
        >
          <div>
            <q-card class="q-ma-md" flat>
              <img
                src="../../assets/loading-card.svg"
              />
              <img
                src="../../assets/loading-brand.svg"
                :style="$q.screen.width > 1025 ? 'height: 25px' : 'height: 30px'"
                class="q-my-md"
              />
              <img src="../../assets/loading-pricebox.svg" />
            </q-card>
          </div>
        </div>
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
import { defineComponent, ref } from 'vue';
import '../../css/MainLayout/SuggestedWines.css';
import { RetrieveFilteredNFTs } from 'src/pages/Marketplace-Main/services/RetrieveTokens';
import { ListingWithPricingAndImage } from 'src/pages/Marketplace-Main/models/Response.models';
import { useTourStore } from 'src/stores/tour-state';
import { useUserStore } from 'src/stores/user-store';
import { AddFavorites, RemoveFavorites } from 'src/pages/Favourites/services/FavoritesFunctions';

export default defineComponent({
  name: 'SuggestedWines',
  data() {
    const tourStore = useTourStore();
		const userStore = useUserStore();
    return {
      recommendations: [] as ListingWithPricingAndImage[],
      tourStore,
			userStore,
      isEmpty: false,
      totalView: 4,
      errorLoad: false,
      isLoading: ref(true),
			loadingNFTs: [0, 1, 2, 3]
    };
  },
  mounted() {
    this.fetchSuggestedWines(0);
  },
  methods: {
    async fetchSuggestedWines(calls: number) {
			if(!this.tourStore.suggestedWinesDialog) return;
      try {
        const { result: nfts } = await RetrieveFilteredNFTs();
        this.recommendations = this.filterAndSortListedNFTs(nfts).slice(
          0,
          this.totalView
        );
				this.isLoading = false;
      } catch (error) {
        this.errorLoad = true;
				this.isLoading = true;
				if(calls > 3) {
					// Try again in 30 secs
					setTimeout(()=> {
						this.fetchSuggestedWines(0)
					}, 30000)
				} else {
					setTimeout(()=> {
						this.fetchSuggestedWines(calls + 1)
					}, 5000)
				}
      }
    },
    ReturnNumberLoading(width: number) {
      if (width > 1025) {
        return [0, 1, 2, 3]
      } else if (width > 600) {
        return [0, 1, 2]
      } else {
        return [0, 1]
      }
    },

    filterAndSortListedNFTs(nfts: ListingWithPricingAndImage[]) {
      const filteredNFTs = nfts.filter(
        nft =>
          nft.orderDetails?.listingPrice !== null ||
          nft.orderDetails?.listingPrice !== undefined ||
          nft.orderDetails?.listingPrice !== ''
      );
      const sortedNFTs = filteredNFTs.sort((a, b) => {
        const aPrice = a.orderDetails?.listingPrice as string;
        const bPrice = b.orderDetails?.listingPrice as string;
        return parseFloat(aPrice) - parseFloat(bPrice);
      });
      return sortedNFTs;
    },
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
            this.recommendations[nftIndex].favoriteLoading = true;
            await AddFavorites({
              walletAddress: this.userStore.walletAddress,
              tokenID: tokenID,
              contractAddress: cAddress,
              network: network,
            });
            this.recommendations[nftIndex].favorited = true;
          } catch {
            return 0;
          } finally {
            this.recommendations[nftIndex].favoriteLoading = false;
          }
          break;
        case 'remove':
          try {
            this.recommendations[nftIndex].favoriteLoading = true;
            await RemoveFavorites({
              walletAddress: this.userStore.walletAddress,
              tokenID: tokenID,
              contractAddress: cAddress,
              network: network,
            });
            this.recommendations[nftIndex].favorited = false;
          } catch {
            return 0;
          } finally {
            this.recommendations[nftIndex].favoriteLoading = false;
          }
          break;
      }
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
