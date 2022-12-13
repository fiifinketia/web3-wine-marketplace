<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      class="q-pa-none"
      style="
        min-width: 35%;
        background-color: #ffffff;
        border-radius: 10px;
        max-width: 35%;
      "
    >
      <q-card-section class="column items-center q-pb-none q-gutter-y-lg">
        <img src="../../../assets/unlist-order.svg"/>
        <span class="dialog-delete-action"> Please confirm the action. </span>
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
          Unlist
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