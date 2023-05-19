<template>
  <div
    class="row profile-column-name"
    :class="$q.screen.width > 600 ? 'q-pa-lg' : 'q-pa-md'"
  >
    <span class="incoming-column-nft"> NFT </span>
    <span v-if="$q.screen.width > 1020" class="incoming-column-price-floor">
      Floor Price
    </span>
    <span class="incoming-column-price-offered"> Offered </span>
    <span v-if="$q.screen.width > 1265" class="incoming-column-from">
      From
    </span>
    <span v-if="$q.screen.width > 600" class="incoming-column-expire">
      Exp On
    </span>
    <span class="incoming-column-action"> Action </span>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
