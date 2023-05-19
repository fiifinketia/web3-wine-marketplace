<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-pa-sm dialog-confirm-box column items-center" style="width: 425px;">
      <span class="error-header"> Oops </span>
      <div v-if="invalidStatus == 'unlisted'" class="column items-center full-width">
        <span class="error-subheader q-py-md" style="width: 90%">
          Looks like this NFT had already been unlisted earlier.
        </span>
        <img src="../../assets/light_bulb_update.svg"/>
        <span class="error-subtext q-py-md" style="width: 70%">
          You may create a new listing for your NFT!
        </span>
      </div>
      <div v-else-if="invalidStatus == 'purchased'" class="column items-center full-width">
        <span class="error-subheader q-py-md" style="width: 90%">
          Looks like this NFT had already been bought!
        </span>
        <img src="../../assets/shopping.svg"/>
        <span class="error-subtext q-py-md" style="width: 70%">
          The NFT had already been transferred to its new owner.
        </span>
      </div>
      <div v-else class="column items-center q-gutter-y-md full-width">
        <span class="error-subheader q-py-md" style="width: 90%">
          Looks like NFT unlisting is already in progress.
        </span>
        <img src="../../assets/listing-process-blue.svg"/>
        <span class="error-subtext q-py-md" style="width: 70%">
          Once it's unlisted, you may create a new listing for your NFT.
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
    invalidStatus: {
      type: String,
      required: true
    }
  }
})
</script>

<style>

</style>
