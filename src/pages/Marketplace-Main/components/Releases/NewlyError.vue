<template>
  <div class="column items-center justify-center q-gutter-y-md">
    <span class="releases-error-header"> Oops </span>
    <span class="releases-error-subheader"> {{ sectionError }} failed to load :( </span>
    <q-btn
      dense
      flat
      unelevated
      :ripple="false"
      no-caps
      class="releases-error-btn"
      @click="TryAgain()"
    >
      Try Again
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    sectionError: {
      type: String,
      required: true
    }
  },
  emits: [
    'refetch-release'
  ],
  methods: {
    TryAgain() {
      this.$emit('refetch-release')
    }
  }
})
</script>

<style>

</style>