<template>
  <div
    v-if="listableNFTs.length > 0"
		class="row q-pt-none q-px-sm q-gutter-y-md" 
		:class="listable.length >= 4 && $q.screen.width > 600
		? 'justify-between': listable.length == 3 && $q.screen.width > 600
		? 'justify-evenly' : $q.screen.width > 600
		? 'justify-start' : allNFTs.length >= 2
		? 'justify-around' : 'justify-start'"
  >
    <div
      v-for="token in listableNFTs"
      :key="
        token.tokenID + ',' + token.network + ',' + token.smartContractAddress
      "
    >
      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ListingsResponse } from "../../models/response.models";

export default defineComponent({
  props: {
    listableNFTs: { type: {} as PropType<ListingsResponse>, required: true }
  }
})
</script>

<style>

</style>