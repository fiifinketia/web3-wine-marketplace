<template>
  <q-menu
    class="column no-wrap notifications-container"
    max-width="360px"
    max-height="600px"
    :offset="[50, 10]"
    @show="FetchNotificationsOnLoad()"
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
        <span> {{ notifications.filter(f => !f.viewed).length }} </span>
      </div>
      <div class="row items-center">
        <q-btn
          v-close-popup
          flat
          dense
          unelevated
          class="btn--no-hover no-padding gear-btn"
          @click="$emit('open-settings')"
        >
          <img src="../../assets/gear.svg" />
        </q-btn>
      </div>
    </div>
    <NotificationsOptions />
    <NotificationsList v-if="!!notificationsFetched && notifications.length > 0 && !notificationsErrorEncountered" />
    <NotificationsState v-else @refetch-notifications="RefetchNotifications()"/>
  </q-menu>
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
  emits: ['open-settings'],
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
      notifications: store => store.storedNotifications
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