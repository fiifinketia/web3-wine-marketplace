<template>
  <!-- <IncomingOffers /> -->
  <OutgoingOffers />
</template>

<script>
import { defineComponent } from 'vue-demi';
import IncomingOffers from './components/IncomingOffers.vue';
import OutgoingOffers from './components/OutgoingOffers.vue';
export default defineComponent({
  name: 'MyProfile',
  // components: { IncomingOffers },
  components: { OutgoingOffers },
});
</script>

<style></style>
