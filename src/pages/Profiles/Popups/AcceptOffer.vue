<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-pa-sm dialog-confirm-box-long column items-center">
      <q-card-section class="column items-center q-pb-none q-gutter-y-lg">
        <span class="dialog-delete-action"> Please confirm the action. </span>
      </q-card-section>
      <div 
        class="q-mb-sm"
        :class="$q.screen.width > 600 ? 'row justify-between q-mt-md' : 'column items-center reverse q-gutter-y-md q-mt-xs q-px-sm'"
        :style="$q.screen.width > 600 ? 'width: 95%' : 'width: 100%'"
      >
        <q-btn
          class="dialog-reset"
          :style="$q.screen.width > 600 ? '' : 'width: 100%;'"
          unelevated
          no-caps
          outline
          style="color: #3586FF;"
          v-close-popup
        >
          <span class="dialog-cancel-gr-text"> Wait for better offer </span>
        </q-btn>
        <q-btn
          class="dialog-confirm"
          :style="$q.screen.width > 600 ? '' : 'width: 100%'"
          unelevated
          no-caps
          flat
          @click="AcceptOffer()"
        >
          Accept for this price
        </q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import 'src/css/Profile/Component/dialog.css';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';

export default defineComponent({
  props: {
    orderHash: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    token: {
      type: Object as PropType<TokenIdentifier>,
      required: true
    }
  },
  methods: {
    async AcceptOffer() {
      this.$emit('accept-offer', {
        orderHash: this.orderHash,
        brand: this.brand,
        image: this.image,
        token: this.token
      })
    } 
  }
})
</script>

<style>

</style>