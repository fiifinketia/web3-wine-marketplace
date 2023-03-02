<template>
  <div 
    class="row profile-column-name"
    :class="$q.screen.width > 600 ? 'q-pa-lg' : 'q-pa-md'"
  >
    <span class="listings-column-nft">
      NFT
    </span>
    <span 
      v-if="$q.screen.width > 600"
      class="listings-column-price"
    >
      Price
    </span>
    <span 
      v-if="$q.screen.width <= 600"
      class="listings-column-yours"
    >
      Yours
    </span>
    <span 
      v-if="$q.screen.width > 1265"
      class="listings-column-highestOffer"
    >
      Highest Offer
    </span>
    <span
      v-if="$q.screen.width > 600"
      class="listings-column-expire"
    >
      Exp On
    </span>
    <span class="listings-column-action">
      Action
    </span>
  </div>
</template>

<script lang="ts">
import 'src/css/Profile/shared.css';
import 'src/css/Profile/Component/listings.css';

export default {

}
</script>

<style>

</style>