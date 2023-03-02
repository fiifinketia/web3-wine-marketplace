<template>
  <div 
    class="row profile-column-name"
    :class="$q.screen.width > 600 ? 'q-pa-lg' : 'q-pa-md'"
  >
    <span class="transaction-column-nft">
      NFT
    </span>
    <span class="transaction-column-price">
      Price
    </span>
    <span 
      v-if="$q.screen.width > 1020"
      class="transaction-column-source"
    >
      From/To
    </span>
    <span class="transaction-column-date">
      Date
    </span>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>