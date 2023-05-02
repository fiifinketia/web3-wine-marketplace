<template>
  <q-dialog transition-show="scale" transition-hide="scale" persistent>
    <q-card class="q-pa-none dialog-confirm-box column items-center">
      <q-card-section class="column items-center q-pb-none q-gutter-y-lg">
        <img src="../../assets/unlist-order.svg" />
        <span class="dialog-delete-action"> Please confirm the action. </span>
      </q-card-section>
      <div class="row justify-between q-mb-sm q-mt-md" style="width: 95%">
        <q-btn
          v-close-popup
          class="dialog-reset"
          no-caps
          outline
          style="color: #3586ff"
        >
          <span class="dialog-cancel-gr-text"> Cancel </span>
        </q-btn>
        <q-btn class="dialog-delete" no-caps flat @click="CancelOrder()">
          Unlist
        </q-btn>
      </div>
    </q-card>
    <OngoingTransactionDialog v-model="ongoingTxn"/>
  </q-dialog>
</template>

<script lang="ts">
import 'src/css/Profile/Component/dialog.css';
import { defineComponent } from 'vue';
import { CancelSingleOrder } from 'src/pages/Metadata/services/Orders';
import { ErrorMessageBuilder, ErrorModel } from 'src/shared/error.msg.helper';
import { useUserStore } from 'src/stores/user-store';
import TxnOngoing from './TxnOngoing.vue';
export default defineComponent({
  components: {
    OngoingTransactionDialog: TxnOngoing
  },
  props: {
    orderHash: {
      type: String,
      required: true,
    },
  },
  emits: ['remove-listing', 'listing-delete-close', 'listing-error-dialog'],
  data() {
    const userStore = useUserStore();
    return {
      userStore,
      ongoingTxn: false
    };
  },
  methods: {
    async PreventExitDuringTxn(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = '';
    },
    SetPreventingExitListener(action: boolean) {
      if (action) {
        this.ongoingTxn = true;
        window.addEventListener('beforeunload', this.PreventExitDuringTxn);
      } else {
        this.ongoingTxn = false;
        window.removeEventListener('beforeunload', this.PreventExitDuringTxn);
      }
    },
    async CancelOrder() {
      try {
        this.SetPreventingExitListener(true);
        await CancelSingleOrder(this.orderHash, this.userStore.walletAddress);
        this.$emit('remove-listing', this.orderHash);
      } catch (err) {
        this.BuildErrorDialog(err);
      } finally {
        this.SetPreventingExitListener(false);
        this.$emit('listing-delete-close');
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BuildErrorDialog(err: any) {
      const errorDetails: ErrorModel = ErrorMessageBuilder(err);
      this.$emit('listing-error-dialog', errorDetails);
    },
  },
});
</script>

<style></style>
