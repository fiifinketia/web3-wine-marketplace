<template>
  <div
    v-if="listableNFTs.length > 0"
		class="row q-mt-md q-pb-md q-px-sm q-gutter-y-md"
		:class="listableNFTs.length >= 4 && $q.screen.width > 600
		? 'justify-between': listableNFTs.length == 3 && $q.screen.width > 600
		? 'justify-evenly' : $q.screen.width > 600
		? 'justify-start q-gutter-x-md' : listableNFTs.length >= 2
		? 'justify-around' : 'justify-start q-ml-xs'"
  >
    <div
      v-for="token in listableNFTs"
      :key="
        token.tokenID + ',' + token.network + ',' + token.smartContractAddress
      "
      class="new-list-card-container"
    >
      <q-card flat>
        <q-btn
          :disable="!!token.listingPrice"
          @click="OpenListingDialog(token)"
          flat
          unelevated
          dense
          :ripple="false"
          no-caps
          class="q-pa-none list-btn btn--no-hover"
          align="left"
        >
          <div class="new-list-card-image">
            <img 
              :src="token.image"
              class="full-width"
              :style="!!token.listingPrice ? 'filter: brightness(0.5);' : ''"
            />
            <img 
              v-if="!!token.listingPrice"
              src="../../../../assets/listing-process.svg"
              class="new-list-card-process-logo"
            />
          </div>
          <div
            class="q-pb-sm new-list-card-brand column justify-center"
            style="text-align: left"
          >
            <span class="new-list-brand-text">
              {{ truncateText(token.brand) }}
            </span>
          </div>
        </q-btn>
        <div class="new-list-history-container row justify-between items-center q-px-sm">
          <span v-if="!token.listingPrice" class="new-list-history-text"> Price history </span>
          <div v-else class="row items-center q-gutter-x-xs">
            <q-img
              src="../../../../assets/processing.svg" 
              :style="$q.screen.width > 350 ? 'height: 34px; width: 23px' : 'height: 15px; width: 16px'"  
            />
            <span class="new-list-history-text"> Loading: </span>
          </div>
          <q-btn
            v-if="!token.listingPrice"
            unelevated
            flat
            dense
            :ripple="false"
            class="open-link btn--no-hover"
          >
            <img src="../../../../assets/button-right.svg" />
          </q-btn>
          <div v-else class="row items-center q-gutter-x-xs">
            <q-img
              src="../../../../assets/icons/currencies/USDC-Icon.svg"
              :style="$q.screen.width > 350 ? 'height: 20px; width: 20px' : 'height: 15px; width: 16px'"
            />
            <span class="new-list-price"> 
              {{ token.listingPrice }}
            </span>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { ListableToken } from "src/shared/models/entities/NFT.model";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    listableNFTs: { type: [] as PropType<ListableToken[]>, required: true }
  },
  methods: {
    truncateText(text: string) {
			if (this.$q.screen.width > 1350) {
				if (text.length > 50) {
					return text.trim().substring(0, 50).split(" ").slice(0, -1).join(" ") + "…";	
				} else return text
			} else if (this.$q.screen.width <= 600) {
				if (text.length > 35) {
					return text.trim().substring(0, 35).split(" ").slice(0, -1).join(" ") + "…";	
				} else return text
			} else {
				if (text.length > 40) {
					return text.trim().substring(0, 40).split(" ").slice(0, -1).join(" ") + "…";
				} else return text
			}
		},
    OpenListingDialog(token: ListableToken) {
      // console.log(token);
      this.$emit('open-listing-dialog', token);
    }
  }
})
</script>

<style scoped>
:deep(.list-btn.btn--no-hover .q-focus-helper) {
	display: none;
}
:deep(.open-link.btn--no-hover .q-focus-helper) {
	display: none;
}
</style>