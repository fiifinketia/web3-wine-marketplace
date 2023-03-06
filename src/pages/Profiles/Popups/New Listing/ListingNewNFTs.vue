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
        <img
          :src="token.image"
          class="new-list-card-image"
        />
        <div
          class="q-pb-sm new-list-card-brand column justify-center"
          style="text-align: left"
        >
          <span class="new-list-brand-text">
            {{ truncateText(token.brand) }}
          </span>
        </div>
        <div class="new-list-history-container row justify-between items-center q-px-sm">
          <span class="new-list-history-text"> Price history </span>
          <q-btn
            unelevated
            flat
            dense
            class="open-link btn--no-hover"
          >
            <img src="../../../../assets/button-right.svg" />
          </q-btn>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { TokenWithBrandImage } from "src/shared/models/entities/NFT.model";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    listableNFTs: { type: [] as PropType<TokenWithBrandImage[]>, required: true }
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
		}
  }
})
</script>

<style>

</style>