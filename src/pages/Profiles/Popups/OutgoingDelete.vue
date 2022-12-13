<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      class="q-pa-none"
      style="
        min-width: 40%;
        background-color: #ffffff;
        border-radius: 10px;
        max-width: 40%;
      "
    >
      <q-card-section class="column items-center q-pb-none q-gutter-y-lg">
        <img src="../../../assets/delete-order.svg"/>
        <span class="dialog-delete-action"> Please confirm the action. </span>
        <span class="dialog-delete-text-light q-px-xs">
          You will 
          <span class="dialog-delete-text-bold">
            not be able to undo 
          </span>
          this action and will have to place a bid again for this NFT once you change your mind.
        </span>
      </q-card-section>
      <q-card-actions align="center" class="row q-mb-sm q-mx-sm q-mt-md">
        <q-btn
          class="dialog-reset"
          no-caps
          outline
          style="color: #3586FF;"
          v-close-popup
        >
          <span> Cancel </span>
        </q-btn>
        <q-btn
          class="dialog-delete"
          no-caps
          flat
          @click="CancelOrder()"
        >
          Delete
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script lang="ts">
import 'src/css/Profile/Component/dialog.css'
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    orderHash: {
      type: String,
      required: true
    }
  },
  methods: {
    CancelOrder() {
      console.log(this.orderHash)
    }
  }
})
</script>

<style>

</style>