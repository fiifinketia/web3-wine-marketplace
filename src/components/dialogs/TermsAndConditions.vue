<template>
  <q-dialog
    full-height
    class="terms-and-conditions-background"
    transition-show="scale"
    transition-hide="scale"
    persistent
  >
    <q-card class="terms-and-conditions-container column justify-between no-wrap">
      <q-card-section>
        <div class="overflow-scroll" v-html="TermsAndConditions">
	    </div>
      </q-card-section>
      <q-card-actions class="row terms-and-conditions-btns justify-end">
        <q-btn
          class="terms-and-conditions-btn-decline q-ma-xs"
          color="primary"
          size="lg"
          unelevated
          no-caps
          outline
          v-close-popup
        >
          Decline
        </q-btn>
        <q-btn
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

export default defineComponent({
  name: 'TermsAndConditions',
  emits: ['toc-accepted'],
  data() {
    const tourStore = useTourStore();
    return {
      tourStore,
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