<template>
  <q-dialog transition-show="scale" transition-hide="scale" persistent>
    <q-card class="q-pa-sm dialog-confirm-box-long column items-center">
      <q-card-section class="column items-center q-pb-none">
        <div class="column items-center q-gutter-y-md">
          <span class="dialog-delete-action" style="font-family: ProximaNova-Regular">
            The offer is in {{ GetCurrencyLabel(currency) }}
          </span>
          <span class="dialog-delete-action row items-center">
            You will receive
            <q-icon :name="`app:${GetCurrencyLabel(currency)}-icon`" class="currency-logo q-px-xs" /> {{ amount }}
          </span>
          <span class="dialog-delete-action row items-center">
            in your wallet.
          </span>
        </div>
      </q-card-section>
			<div class="row items-center" style="flex-wrap: nowrap">
				<span class="dialog-terms-conditions">
					<q-checkbox
						v-model="acceptTerms"
					/>
					I agree with the
					<q-btn
						class="text-blue-underlined"
						dense no-caps flat
						:ripple="false" padding="none"
						@click="$emit('open-terms-and-conditions');">
						terms and conditions
					</q-btn>
				</span>
			</div>
      <div
        class="q-mb-sm"
        :class="
          $q.screen.width > 600
            ? 'row justify-between q-mt-md'
            : 'column items-center reverse q-gutter-y-md q-mt-xs q-px-sm'
        "
        :style="$q.screen.width > 600 ? 'width: 95%' : 'width: 100%'"
      >
        <q-btn
          v-close-popup
          class="dialog-reset"
          :style="$q.screen.width > 600 ? '' : 'width: 100%;'"
          unelevated
          no-caps
          outline
          style="color: #3586ff"
        >
          <span class="dialog-cancel-gr-text"> Wait for better offer </span>
        </q-btn>
        <q-btn
          v-if="!userStore.user"
          class="dialog-confirm"
          :style="$q.screen.width > 600 ? '' : 'width: 100%'"
          unelevated
          no-caps
          flat
          disable
          size="md"
        >
          Please Connect Wallet
        </q-btn>
        <q-btn
          v-else
          class="dialog-confirm"
          :style="$q.screen.width > 600 ? '' : 'width: 100%'"
          unelevated
          no-caps
          flat
					:disable="!acceptTerms"
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
import { useUserStore } from 'src/stores/user-store';
import { GetCurrencyLabel } from 'src/shared/currency.helper';

export default defineComponent({
  props: {
    orderHash: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    token: {
      type: Object as PropType<TokenIdentifier>,
      required: true,
    },
    currency: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    }
  },
  emits: ['accept-offer', 'open-terms-and-conditions'],
  data() {
    return {
      userStore: useUserStore(),
      GetCurrencyLabel,
			acceptTerms: false
    };
  },
  methods: {
    async AcceptOffer() {
			if(!this.acceptTerms) return;
      this.$emit('accept-offer', {
        orderHash: this.orderHash,
        brand: this.brand,
        image: this.image,
        token: this.token,
      });
    },
  },
});
</script>

<style></style>
