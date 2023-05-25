<!-- eslint-disable vue/no-v-html -->
<template>
  <q-dialog
    full-height
    class="terms-and-conditions-background"
    transition-show="scale"
    transition-hide="scale"
    persistent
		full-width
  >
    <q-card class="terms-and-conditions-container column justify-between no-wrap no-scroll">
      <q-card-section class="row wrap" style="overflow-y: scroll;">
        <div v-html="TermsAndConditions">
	    	</div>
      </q-card-section>
			<q-card-actions v-if="closeButton" class="row terms-and-conditions-btns justify-end">
				<q-btn
					v-close-popup
          class="terms-and-conditions-btn-decline q-ma-xs"
          color="primary"
          size="lg"
          unelevated
          no-caps
          outline
        >
          Close
        </q-btn>
      </q-card-actions>
      <q-card-actions v-else class="row terms-and-conditions-btns justify-end">
        <q-btn
					v-close-popup
          class="terms-and-conditions-btn-decline q-ma-xs"
          color="primary"
          size="lg"
          unelevated
          no-caps
          outline
        >
          Decline
        </q-btn>
        <q-btn
					v-close-popup
          class="terms-and-conditions-btn-accept q-ma-xs"
          color="primary"
          size="lg"
          unelevated
          no-caps
          @click="acceptTermsAndConditions"
        >
          Accept
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import 'src/css/Profile/Component/dialog.css';
import { defineComponent } from 'vue';
import { useTourStore } from 'src/stores/tour-state';
import TermsAndConditionsJson from 'src/TermsAndConditions.json';

export default defineComponent({
  name: 'TermsAndConditions',
	props: {
		closeButton: {
			type: Boolean,
			required: false,
		},
	},
  emits: ['toc-accepted'],
  data() {
    const tourStore = useTourStore();
    return {
      tourStore,
			TermsAndConditions: TermsAndConditionsJson.data,
    }
  },
  methods: {
    acceptTermsAndConditions() {
      this.$emit('toc-accepted');
      this.tourStore.setTermsAndConditionsAgreed();
    },
  }
})
</script>

<style>

</style>
