<template>
  <q-card class="column items-center full-width no-wrap no-shadow">
    <div class="column exclusive-offer-title justify-center">
      <div>Our wines are selected using 20+ years of historic</div>
      <div>wine data to offer the best opportunities</div>
    </div>

    <q-card-section
      class="q-pt-lg exclusive-offer-container"
    >
      <div v-if="!isLoading" class="row no-wrap justify-between">
        <q-card
          v-for="item in exclusiveOffers"
          :key="item.tokenID"
          class="no-shadow q-pa-sm exclusive-card-container col-xs-3"
        >
          <q-img :src="item.image" alt="wine" aspect-ratio="1" width="100%" />
          <div class="exclusive-wine-name q-py-md">
            {{ item.brand }}
          </div>
          <div class="exclusive-price-container column q-pa-sm">
            <div class="row justify-between q-pb-sm">
              <div class="exclusive-starting-from">Price</div>
              <q-img
                v-if="!!userStore.walletAddress && !!item.favoriteLoading"
                src="../../../assets/loading-heart.gif"
                :style="
                  $q.screen.width > 350
                    ? 'width: 27px; height: 27px; margin: -4px -4px -4px -4px'
                    : 'width: 22px; height: 22px; margin: -3px -3px -4px -4px'
                "
              />
              <q-img
                v-else-if="!!userStore.walletAddress && item.favorited === true"
                src="../../../../public/images/heart.svg"
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
                src="../../../../public/images/empty-heart.svg"
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
              <div class="exclusive-price">
                <q-img src="../../../../public/images/USDT.svg" width="20px" />
                &nbsp; {{ item.orderDetails?.listingPrice || '00.00' }}
              </div>
            </div>
          </div>
        </q-card>
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
    </q-card-section>
    <div class="go-to-marketplace-wrapper row justify-center">
      <q-btn
        id="go-to-marketplace"
        class="go-to-marketplace q-mt-lg"
        unelevated
        no-caps
        @click="$router.push('marketplace?tab=nfts')"
      >
        Go to Marketplace
      </q-btn>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import '../../../css/Homepage/ExclusiveOffers.css';
import {
  AddFavorites,
  RemoveFavorites,
} from 'src/pages/Favourites/services/FavoritesFunctions';
import { ListingWithPricingAndImage } from 'src/pages/Marketplace-Main/models/Response.models';
import { RetrieveFilteredNFTs } from 'src/pages/Marketplace-Main/services/RetrieveTokens';
import { useTourStore } from 'src/stores/tour-state';
import { useUserStore } from 'src/stores/user-store';
export default defineComponent({
  name: 'ExclusiveOffers',
  data() {
    return {
      tourStore: useTourStore(),
      userStore: useUserStore(),
      totalView: 4,
      isLoading: ref(true),
      exclusiveOffers: [] as ListingWithPricingAndImage[],
      loadingNFTs: [0, 1, 2, 3],
    };
  },
  mounted() {
    this.fetchRecommendedWines(0);
  },
  methods: {
    async fetchRecommendedWines(calls: number) {
      try {
        const { result: nfts } = await RetrieveFilteredNFTs();
        this.exclusiveOffers = this.filterAndSortListedNFTs(nfts).slice(
          0,
          this.totalView
        );
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
  },
});
</script>

<style></style>
