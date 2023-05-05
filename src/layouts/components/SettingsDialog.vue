<template>
  <q-dialog
    position="left"
    persistent
    class="settings-background row"
    full-height
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="settings-container column items-center">
      <q-card-section
        class="settings-header full-width row justify-between items-center no-wrap"
      >
        <div class="settings-header-container col">
          <div>SETTINGS</div>
        </div>
        <img
          class="x-icon col-auto"
          src="../../../public/images/x-icon.svg"
          alt=""
          @click="$emit('close-settings')"
        />
      </q-card-section>
      <q-tabs v-model="tab" class="text-primary">
        <q-tab label="Profile" name="profile"></q-tab>
        <q-tab label="Notifications" name="notifications"></q-tab>
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated class="full-width">
        <q-tab-panel name="profile">
          <q-card flat class="column items-center justify-around">
            <q-card-section class="column q-my-md items-center">
              <q-avatar size="8em">
                <img class="col-auto" :src="getUserAvatar" />
              </q-avatar>
              <q-badge
                floating
                color="primary"
                align="bottom"
                rounded
                class="q-pa-sm"
              >
                <q-icon name="app:edit" size="xs" dense round color="white">
                  <q-menu v-model="imageUploadMenu">
                    <q-list style="min-width: 100px">
                      <q-item clickable>
                        <q-item-section
                          >
                            <q-file
                              v-model="imageFile"
                              label="Update Avatar"
                              borderless
                              max-files="1"
                              accept="image/*" />
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>Delete Avatar</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-icon>
              </q-badge>
              <div class="row q-mt-sm justify-around full-width">
                <div class="col text-body2">Wallet</div>
                <div
                  class="col text-bold no-wrap"
                  style="min-width: fit-content"
                >
                  {{
                    userStore.user.username ||
                    userStore.walletAddress.slice(0.12)
                  }}
                </div>
              </div>
              <div class="row text-caption">New User</div>
            </q-card-section>
            <q-card-section class="colum q-my-md items-center">
              <div class="row q-my-md text-bold text-primary justify-center">
                {{ 'You can set your username' }}
              </div>
              <div class="row q-my-sm text-bold text-grey">
                {{ 'Username' }}
              </div>
              <q-input
                v-model="username"
                class="q-mb-md"
                outlined
                dense
                :rules="usernameRules"
                lazy-rules
              />
              <q-btn
                class="wiv-primary-button q-my-sm"
                @click="saveProfileSettings"
                full-width
                label="Save"
                unelevated
              />
            </q-card-section>
          </q-card>
        </q-tab-panel>
        <q-tab-panel name="notifications">
          With so much content to display at once, and often so little screen
          real-estate, Cards have fast become the design pattern of choice for
          many companies, including the likes of Google and Twitter.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { UserModel } from 'src/components/models';
import { defineComponent, ref } from 'vue';
import '../../css/MainLayout/SettingsDialog.css';
import { useUserStore } from 'src/stores/user-store';
export default defineComponent({
  name: 'SettingsDialog',
  emits: ['close-settings'],
  data() {
    const userStore = useUserStore();
    return {
      userStore,
      tab: ref('profile'),
      imageFile: ref(null),
      imageUploadMenu: false,
      username: ref(''),
      usernameRules: [
        (val: string) =>
          (val && val.length > 4) ||
          'Please type something greater than 3 characters',
        (val: string) =>
          val.length <= 12 || 'Please enter a maximum of 12 charaters',
      ],
    };
  },
  computed: {
	getUserAvatar() {
  		const timestamp = new Date().getTime();
      		return `${this.userStore.user?.avatar || 'https://source.boringavatars.com/beam/40/'}?${timestamp}`;
	}
  },
  watch: {
    imageFile() {
    	this.uploadProfileAvatar()
    },
  },
  methods: {
    saveProfileSettings() {
      if (
        !this.userStore.user ||
        this.userStore.user.username === this.username
      )
        return;
      try {
        this.userStore.updateUsername(this.username);
      } catch (error: any) {
        throw new Error(error);
      }
    },
    async uploadProfileAvatar() {
      const formData = new FormData();
      if (this.imageFile !== null) formData.append('image', this.imageFile);
      try {
        await this.userStore.uploadAvatar(formData);
	this.imageUploadMenu = false
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
});
</script>
