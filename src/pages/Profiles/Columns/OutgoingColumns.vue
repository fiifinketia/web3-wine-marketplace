<template>
  <div 
    class="row profile-column-name"
    :class="$q.screen.width > 600 ? 'q-pa-lg' : 'q-pa-md'"
  >
    <span class="outgoing-column-nft">
      NFT
    </span>
    <span 
      v-if="$q.screen.width > 600"
      class="outgoing-column-own-offer"
    >
      Your offer
    </span>
    <span 
      v-if="$q.screen.width <= 600"
      class="outgoing-column-own-offer"
    >
      Yours
    </span>
    <span 
      v-if="$q.screen.width > 600"
      class="outgoing-column-highest-offer"
    >
      Highest Offer
    </span>
    <span 
      v-if="$q.screen.width > 1265"
      class="outgoing-column-expire"
    >
      Exp On
    </span>
    <span class="outgoing-column-action">
      Action
    </span>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>