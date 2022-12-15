<template>
  <q-page class="column items-center justify-center q-gutter-y-md q-mx-lg">
    <span class="profile-disconnected-text"> Sign up and start your wine <br> collection! </span>
    <q-btn
      no-caps
      class="profile-connect-button"
      @click="ConnectWallet()"
    >
      Start Now 
    </q-btn>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'src/css/Profile/shared.css';
import { useUserStore } from 'src/stores/user-store';

export default defineComponent({
  data() {
    const userStore = useUserStore();
    return {
      userStore
    }
  },
  methods: {
    async ConnectWallet() {
      await this.userStore.connectWallet();
    }
  }
})
</script>

<style>

</style>