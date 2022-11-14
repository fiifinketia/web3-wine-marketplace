<template>
  <q-page-container class="row justify-between q-pt-none q-px-none q-gutter-y-md">
    <div
      v-for="token in allNFTs"
      :key="token.tokenID + ',' + token.network + ',' + token.smartContractAddress"
      class="col-xl-3 col-md-3 col-sm-4 col-xs-6 main-marketplace-card-container"
    >
      <q-btn
        flat
        dense
        :ripple="false"
        no-caps
        class="btn--no-hover"
				@click="selectCard(token.tokenID)"
      >
        <q-card
          class="q-pa-xs main-marketplace-nft-card"
          flat
        >
          <img class="main-marketplace-card-image" :src="token.image"/>
          <div class="q-px-sm  q-pb-sm main-marketplace-card-brand column justify-center" style="text-align: left;">
            <span>
              {{token.brand}}
            </span>
          </div>
          <q-card-section class="column items-start main-marketplace-price-container q-py-sm q-mx-sm">
            <span class="main-marketplace-price-header q-pb-xs">
              Starting from
            </span>
            <div v-if="!!token.listingPrice">
              <div class="row items-end q-gutter-x-xs">
                <q-img
                  src="../../../assets/icons/currencies/USDC-Icon.svg"
                  style="height: 20px; width: 20px"
                />
                <span class="main-marketplace-price-text-b">
                  0.00
                </span>
                <span class="main-marketplace-price-text-l">
                  /$ 00.00
                </span>
              </div>
            </div>
            <div v-else>
              <span class="main-marketplace-price-text-b">
                Not available
              </span>
            </div>
          </q-card-section>
        </q-card>
      </q-btn>
    </div>
		<q-dialog v-model="card">
      <q-card class="my-card">

        <q-card-actions align="right">
          <q-btn flat color="primary" label="Create Order" @click="CreateListingForERC1155" />
          <!-- <q-btn v-close-popup flat color="primary" round icon="event" /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page-container>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';

import { useUserStore } from 'src/stores/user-store';
import { ListingWithPricingAndImage } from '../models/Response.models';
import { RetrieveAllNFTs } from '../services/RetrieveTokens';
import '../../../css/Marketplace/NFT-Selections.css';
import { CreateOrderERC1155 } from '../services/Orders';

export default defineComponent({
  data() {
		const userStore = useUserStore();
    return {
      allNFTs: new Array<ListingWithPricingAndImage>(),
			card: ref(false),
			stars: ref(3),
			selected: ref(),
			userStore
    }
  },

  async mounted() {
    this.allNFTs = await RetrieveAllNFTs();
    console.log(this.allNFTs)
  },

  methods: {
		selectCard(tokenID: string) {
			this.card = true;
			this.selected = this.allNFTs.filter((x: any) => x.tokenID === tokenID)[0]
			console.log('🚀 ~ file: NFT-Selections.vue ~ line 125 ~ selectCard ~ this.selected', this.selected.tokenID)
		},

		async CreateListingForERC1155() {
      const smartContractAddressStatic = '0x1458DAb28F3e94F8e4Ae3fCb03De803e53Dd443D';
      const amountStatic = '1';
      const address: string = this.userStore.walletAddress;
      CreateOrderERC1155(this.selected.tokenID, smartContractAddressStatic, this.selected.brand, address, amountStatic);
    },
  }
})
</script>

<style scoped>
  :deep(.q-btn.btn--no-hover .q-focus-helper) {
    display: none;
  }
</style>
