<template>
  <q-dialog
    class="column no-wrap"
    maximized
    transition-show="slide-left"
    transition-hide="slide-right"
    @show="FetchNotificationsOnLoad()"
  >
    <q-card class="column no-wrap">
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
          <q-btn
            v-close-popup
            flat
            dense
            unelevated
            class="btn--no-hover no-padding"
          >
            <img src="../../assets/exit-light.svg" />
          </q-btn>
        </div>
      </div>
      <NotificationsOptions />
      <NotificationsList v-if="!!notificationsFetched && notifications.length > 0 && !notificationsErrorEncountered" />
      <NotificationsState v-else @refetch-notifications="RefetchNotifications()"/>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import 'src/css/MainLayout/NotificationsDialog.css';
import NotificationsOptions from './NotificationsOptions.vue';
import NotificationsList from './NotificationsList.vue';
import NotificationsState from './NotificationsState.vue';
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useNotificationsStore } from 'src/stores/notifications-store';
import { useUserStore } from 'src/stores/user-store';

export default defineComponent({
  components: {
    NotificationsOptions,
    NotificationsList,
    NotificationsState
  },
  data() {
    const notificationsStore = useNotificationsStore();
    return {
      notificationsStore
    }
  },
  computed: {
    ...mapState(useNotificationsStore, {
      notificationsFetched: store => store.notificationsFetched,
      notificationsErrorEncountered: store => store.notificationsErrorEncountered,
      notifications: store => store.notifications
    }),
    ...mapState(useUserStore, {
      walletAddress: store => store.walletAddress
    })
  },
  methods: {
    FetchNotificationsOnLoad() {
      if (!this.notificationsFetched) {
        this.notificationsStore.getUserNotifications(this.walletAddress);
      }
    },
    RefetchNotifications() {
      this.notificationsStore.getUserNotifications(this.walletAddress);
    }
  }
})
</script>

 <style scoped>
  :deep(.gear-btn.btn--no-hover .q-focus-helper) {
    display: none;
  }
</style>