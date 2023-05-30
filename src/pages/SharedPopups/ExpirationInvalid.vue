<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-pa-sm dialog-confirm-box column items-center" style="width: 425px;">
      <span class="error-header"> Oops </span>
      <div class="column items-center q-gutter-y-md full-width">
        <span class="error-subheader q-py-md" style="width: 90%">
          Looks like the expiration date you've chosen is invalid.
        </span>
        <img src="../../assets/listing-process-blue.svg"/>
        <span class="error-subtext q-py-md" style="width: 70%">
          Please choose a date in the future.
        </span>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import 'src/css/Profile/Component/dialog.css';
import { defineComponent } from 'vue';
export default defineComponent({})
</script>

<style>

</style>
