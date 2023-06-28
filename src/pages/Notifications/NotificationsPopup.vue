<template>
  <q-menu
    class="column no-wrap notifications-container"
    max-width="360px"
    max-height="600px"
    :offset="[50, 10]"
  >
    <div class="row q-pa-md justify-between">
      <div class="row items-center justify-center notifications-header">
        <span> NOTIFICATIONS </span>
        <q-separator
          class="q-mx-md"
          size="1px"
          vertical
          color="accent"
          style="height: 15px; margin-top: auto; margin-bottom: auto"/>
        <span> 0 </span>
      </div>
      <div class="row items-center">
        <q-btn
          v-close-popup
          flat
          dense
          unelevated
          class="btn--no-hover no-padding gear-btn"
        >
          <img src="../../assets/gear.svg" />
        </q-btn>
        <!-- <q-btn
          v-close-popup
          flat
          dense
          unelevated
          class="btn--no-hover no-padding"
        >
          <img src="../assets/exit-light.svg" />
        </q-btn> -->
      </div>
    </div>
    <NotificationsOptions />
    <NotificationsList />
  </q-menu>
</template>

<script lang="ts">
import 'src/css/MainLayout/NotificationsDialog.css';
import NotificationsOptions from './NotificationsOptions.vue';
import NotificationsList from './NotificationsList.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    NotificationsOptions,
    NotificationsList
  },
})
</script>

 <style scoped>
  :deep(.gear-btn.btn--no-hover .q-focus-helper) {
    display: none;
  }
</style>