<template>
  <div :class="!notificationsFetched ? 'full-width' : 'column items-center q-pa-md'">
    <div v-if="!notificationsFetched" class="column q-gutter-y-sm no-wrap full-width">
      <div
        v-for="loadingNotif in loadingNotifs"
        id="viewed-notif"
        :key="loadingNotif"
        class="column no-wrap full-width q-pa-sm"
      >
        <div class="row justify-start no-wrap q-pb-sm">
          <img src="../../assets/loading-icon.svg"/>
          <img src="../../assets/loading-brand.svg" style="margin-left: 10px;" :style="$q.screen.width >= 768 ? 'width: 30vw' : 'width: 70vw'"/>
        </div>
        <div class="row justify-between no-wrap q-pb-sm">
          <img src="../../assets/loading-brand.svg" style="width: 150px">
          <img src="../../assets/loading-link.svg" style="height: 20px; width: 50px;"/>
        </div>
      </div>
    </div>
    <img
      v-else-if="!!notificationsFetched && notifications.length == 0 && !notificationsErrorEncountered"
      src="../../assets/sleeping-bell.svg"
    />
    <img
      v-else-if="!!notificationsErrorEncountered"
      src="../../assets/ringing-bell.svg"
    />
    <span
      v-if="
        !!notificationsFetched && notifications.length == 0 ||
        !!notificationsErrorEncountered
      "
      class="notif-state-text q-py-md"
    >
      {{ GetStateText() }}
    </span>
    <q-btn
      v-if="!!notificationsErrorEncountered"
      dense
      flat
      unelevated
      :ripple="false"
      no-caps
      class="notif-error-btn"
      @click="$emit('refetch-notifications')"
    >
      Try Again
    </q-btn>
  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia';
import { useNotificationsStore } from 'src/stores/notifications-store';
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['refetch-notifications'],
  data() {
    return {
      loadingNotifs: [0, 1, 2, 3, 4]
    }
  },
  computed: {
    ...mapState(useNotificationsStore, {
      notifications: store => store.notifications,
      notificationsFetched: store => store.notificationsFetched,
      notificationsErrorEncountered: store => store.notificationsErrorEncountered
    })
  },
  methods: {
    GetStateText() {
      if (this.notificationsFetched && this.notifications.length == 0 && !this.notificationsErrorEncountered) {
        return 'You do not have any notifications yet.'
      } else {
        return 'There was a problem fetching your notifications.'
      }
    }
  }
})
</script>

<style>

</style>