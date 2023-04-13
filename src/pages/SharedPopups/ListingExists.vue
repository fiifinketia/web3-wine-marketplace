<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-pa-sm dialog-confirm-box column items-center" style="width: 425px;">
      <span class="error-header"> Oops </span>
      <div v-if="transactionStatus" class="column items-center full-width">
        <span class="error-subheader q-py-md" style="width: 90%">
          Looks like this NFT has been listed earlier.
        </span>
        <img src="../../assets/shopping.svg"/>
        <span class="error-subtext q-py-md" style="width: 70%">
          If this NFT isn't appearing on the list, Click refresh <img src="../../assets/refresh-blue.svg"/> on the listing page to load recent listings.
        </span>
      </div>
      <div v-else class="column items-center q-gutter-y-md full-width">
        <span class="error-subheader q-py-md" style="width: 90%">
          Looks like NFT listing is already in progress.
        </span>
        <img src="../../assets/listing-process-blue.svg"/>
        <span class="error-subtext q-py-md" style="width: 70%">
          Once it's listed, you will find it on the list.
        </span>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import 'src/css/Profile/Component/dialog.css';
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    transactionStatus: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<style>

</style>