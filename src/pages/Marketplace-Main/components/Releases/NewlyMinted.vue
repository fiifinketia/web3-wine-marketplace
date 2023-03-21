<template>
  <div
    class="row fit"
    :class="
      newNFTs.length >= 4 && $q.screen.width > 600
        ? 'justify-between'
        : newNFTs.length == 3 && $q.screen.width > 600
        ? 'justify-evenly'
        : $q.screen.width > 600
        ? 'justify-start q-gutter-x-md'
        : newNFTs.length >= 2
        ? 'justify-around'
        : 'justify-start q-ml-xs'
    "
  >
    <div
      v-for="token in newNFTs"
      :key="
        token.tokenID + ',' + token.network + ',' + token.smartContractAddress
      "
      class="releases-card-container"
    >
      <q-card
        class="q-ma-xs releases-nft-card"
        flat
      >
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
            <span class="releases-price-text-b-inactive">
              Not available
            </span>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios';
import { defineComponent } from 'vue';
import { ListingWithPricingAndImage } from '../../models/Response.models';
import '../../../../css/Releases/Releases-Selections.css';
import { useUserStore } from 'src/stores/user-store';
import { AddFavorites, RemoveFavorites } from '../../services/FavoritesFunctions';

export default defineComponent({
  data() {
    const userStore = useUserStore();
    return {
      userStore,
      newNFTs: new Array<ListingWithPricingAndImage>(),
    };
  },

  mounted() {
    this.GetNewlyMinted();
  },

  methods: {
    async GetNewlyMinted() {
      const url = <string>process.env.RETRIEVE_NEWLY_MINTED_NFTS_URL;
      await axios
        .get(url)
        .then(
          (res: AxiosResponse<ListingWithPricingAndImage[]>) =>
            (this.newNFTs = res.data)
        );
    },
    ToInt(price: string) {
      return parseInt(price);
    },
    async addRemoveFavorites(
      tokenID: string,
      cAddress: string,
      network: string,
      objective: string
    ) {
      const nftIndex = this.newNFTs.findIndex(
        nft =>
          nft.smartContractAddress == cAddress &&
          nft.tokenID == tokenID &&
          nft.network == network
      );
      switch (objective) {
        case 'add':
          try {
            this.newNFTs[nftIndex].favoriteLoading = true;
            await AddFavorites({
              walletAddress: this.userStore.walletAddress,
              tokenID: tokenID,
              contractAddress: cAddress,
              network: network,
            });
            this.newNFTs[nftIndex].favorited = true;
          } catch {
            return 0;
          } finally {
            this.newNFTs[nftIndex].favoriteLoading = false;
          }
          break;
        case 'remove':
          try {
            this.newNFTs[nftIndex].favoriteLoading = true;
            await RemoveFavorites({
              walletAddress: this.userStore.walletAddress,
              tokenID: tokenID,
              contractAddress: cAddress,
              network: network,
            });
            this.newNFTs[nftIndex].favorited = false;
          } catch {
            return 0;
          } finally {
            this.newNFTs[nftIndex].favoriteLoading = false;
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
  },
});
</script>

<style></style>
