<template>
  <q-dialog persistent>
    <q-card class="q-pa-sm q-py-lg dialog-confirm-box column items-center" style="width: 425px;">
      <span class="error-header"> Submitting transaction </span>
      <img
        src="../../assets/loading-metadata.gif"
        style="width: 90px"
      />
      <span class="error-subheader q-py-md" style="width: 90%">
        Please do not close the browser tab until submission is completed.
      </span>
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