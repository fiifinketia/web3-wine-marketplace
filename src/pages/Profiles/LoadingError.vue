<template>
  <q-page-container class="column items-center q-gutter-y-md q-px-lg">
    <span class="profile-error-header"> Ooops </span>
    <span class="profile-error-subheader">
      {{ ReturnErrorMessage() }}
    </span>
    <q-img
      v-if="tabError == 'listings'"
      class="profile-error-icon"
      src="../../assets/notepad.svg"
    />
    <q-img
      v-if="tabError == 'trading'"
      class="profile-error-icon"
      src="../../assets/notebook.svg"
    />
    <q-img
      v-else
      class="profile-error-icon"
      src="../../assets/no-orders.svg"
    />
    <span class="profile-error-subheader"> Let's try to load again </span>
    <q-btn
      dense
      flat
      unelevated
      :ripple="false"
      no-caps
      class="profile-error-btn"
      @click="TryAgain()"
    >
      Try Again
    </q-btn>
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'src/css/Profile/shared.css';
export default defineComponent({
  props: {
    tabError: {
      type: String,
      required: true
    }
  },
  emits: ['reload-tab'],
  methods: {
    ReturnErrorMessage() {
      switch (this.tabError) {
        case 'listings':
          return 'Listings loading failed :(';
        case 'incoming':
          return 'Incoming offers loading failed :(';
        case 'outgoing':
          return 'Outgoing offers loading failed :(';
        case 'trading':
          return 'Trading history loading failed :(';
      }
    },
    TryAgain() {
      this.$emit('reload-tab')
    }
  },
})
</script>

<style>

</style>