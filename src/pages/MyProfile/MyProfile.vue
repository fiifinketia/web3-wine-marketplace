<template>
  <!-- <IncomingOffers /> -->
  <!-- <OutgoingOffers /> -->
  <ListingVue />
</template>

<script>
import { defineComponent } from 'vue-demi';
import IncomingOffers from './components/IncomingOffers.vue';
import OutgoingOffers from './components/OutgoingOffers.vue';
import ListingVue from './components/Listing.vue';
export default defineComponent({
  name: 'MyProfile',
  // components: { IncomingOffers },
  // components: { OutgoingOffers },
  components: { ListingVue },
});
</script>

<style></style>
