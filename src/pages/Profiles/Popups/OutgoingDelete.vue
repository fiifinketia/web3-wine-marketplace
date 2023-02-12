<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-pa-none dialog-confirm-box column items-center">
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
      <div class="row justify-between q-mb-sm q-mt-md" style="width: 95%">
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
      </div>
    </q-card>
  </q-dialog>

</template>

<script lang="ts">
import 'src/css/Profile/Component/dialog.css'
import { defineComponent } from 'vue';
import { CancelSingleOrder } from 'src/pages/Metadata/services/Orders';
import { ErrorMessageBuilder, ErrorModel } from 'src/shared/error.msg.helper';
import { useUserStore } from 'src/stores/user-store';
export default defineComponent({
  props: {
    orderHash: {
      type: String,
      required: true
    }
  },
  data() {
    const userStore = useUserStore();
    return {
      userStore
    }
  },
  methods: {
    async CancelOrder() {
      try {
        await CancelSingleOrder(this.orderHash, this.userStore.walletAddress);
        this.$emit('remove-offer', this.orderHash);
      } catch (err) {
        this.BuildErrorDialog(err);
      } finally {
        this.$emit('outgoing-delete-close')
      }
    },
    BuildErrorDialog(err: any) {
      const errorDetails: ErrorModel = ErrorMessageBuilder(err);
      this.$emit('outgoing-error-dialog', errorDetails);
    }
  }
})
</script>

<style>

</style>