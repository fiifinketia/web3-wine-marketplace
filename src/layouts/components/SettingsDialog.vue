<template>
  <q-dialog
    position="left"
    persistent
    class="settings-background row"
    full-height
    transition-show="scale"
    transition-hide="scale"
    @show="FetchNotificationSettings()"
  >
    <q-card class="settings-container column items-center no-wrap">
      <q-card-section
        class="settings-header full-width row justify-between items-center no-wrap"
      >
        <div class="settings-header-container col">
          <span class="settings-main-header">SETTINGS</span>
        </div>
        <img
          class="x-icon col-auto"
          src="../../../public/images/x-icon.svg"
          alt=""
          @click="$emit('close-settings')"
        />
      </q-card-section>
      <q-tabs
        v-model="tab"
        class="text-grey settings-tab-value full-width"
        style="border-bottom: 1px solid rgba(157, 157, 157, 0.5);"
        active-color="primary"
        indicator-color="primary"
        no-caps
      >
        <q-tab style="width: 50%;" label="Profile" name="profile"></q-tab>
        <q-tab style="width: 50%;" label="Notifications" name="notifications"></q-tab>
      </q-tabs>
      <q-separator />
      <div v-if="!loadingSettings" class="full-width">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="profile" :class="$q.screen.width <= 470 ? 'q-px-sm' : ''">
            <q-card flat class="column items-center justify-around no-wrap">
              <VerificationStatus class="full-width" />

              <q-card-section class="column q-mb-md q-mt-lg items-center">
                <q-avatar size="8em">
                  <img class="col-auto" :src="getUserAvatar" />
                  <q-badge
                    color="primary"
                    rounded
                    class="q-pa-sm absolute-bottom-right"
                    style="cursor: pointer"
                  >
                    <q-icon name="app:edit" size="xs" dense round color="white">
                      <q-menu v-model="imageUploadMenu">
                        <q-list style="max-width: 130px">
                          <q-item clickable dense>
                            <q-file
                              v-model="imageFile"
                              label="Update Avatar"
                              class="settings-avatar-option no-padding"
                              borderless
                              max-files="1"
                              accept="image/*"
                              dense
                              item-aligned
                            />
                          </q-item>
                          <q-item
                            v-close-popup
                            clickable
                            dense
                            class="settings-avatar-option"
                          >
                            Delete Avatar
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-icon>
                  </q-badge>
                </q-avatar>
                <div class="row q-mt-sm justify-around full-width">
                  <div class="col settings-label q-mx-xs">{{ userStore.user.username ? 'User Id' : 'Wallet' }}</div>
                  <div
                    class="col settings-label-value no-wrap q-mx-xs"
                    style="min-width: fit-content"
                  >
                    {{
                      userStore.user.username ||
                      userStore.walletAddress.slice(0.12)
                    }}
                  </div>
                </div>
                <div class="row settings-sublabel">New User</div>
              </q-card-section>
              <q-card-section class="column q-my-md items-center full-width">
                <div class="row q-mb-md settings-set-username justify-center">
                  You can set your username
                </div>
                <div class="column no-wrap q-pb-sm items-start" :class="$q.screen.width <= 470 ? 'full-width' : ''">
                  <span class="row settings-username-header q-mb-xs">
                    Username
                  </span>
                  <q-input
                    v-model="username"
                    class="settings-actions"
                    hide-bottom-space
                    outlined
                    dense
                    :rules="usernameRules"
                    lazy-rules
                  />
                </div>
                <q-btn
                  class="wiv-primary-button q-my-sm settings-actions"
                  no-caps
                  label="Save Changes"
                  unelevated
                  @click="saveProfileSettings"
                />
              </q-card-section>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="notifications" :class="$q.screen.width <= 470 ? 'q-px-sm' : ''">
            <q-card flat class="column items-center justify-around no-wrap">
              <q-card-section class="column q-my-xs items-center">
                <div class="row q-my-md settings-notifications-header justify-center">
                  Select the notifications you would like to receive.
                </div>
                <div class="column q-mt-sm q-mb-md q-pr-md settings-notification-options">
                  <q-checkbox
                    v-model="notificationSettings.OFFER_ACCEPTED_NEW_OWNER"
                    label="Your offer has been accepted"
                  />
                  <q-checkbox
                    v-model="notificationSettings.OFFER_ACCEPTED_OLD_OWNER"
                    label="You have successfully accepted an offer for your Wine"
                  />
                  <q-checkbox
                    v-model="notificationSettings.LISTING_PURCHASED_OLD_OWNER"
                    label="You sold your Wine"
                  />
                  <q-checkbox
                    v-model="notificationSettings.LISTING_PURCHASED_NEW_OWNER"
                    label="You have successfully purchased your new Wine"
                  />
                  <q-checkbox
                    v-model="notificationSettings.OFFER_RECEIVED"
                    label="You received an offer on your Wine"
                  />
                  <q-checkbox
                    v-model="notificationSettings.OFFER_CREATED_COMPLETED"
                    label="You have successfully placed a Wine offer"
                  />
                  <q-checkbox
                    v-model="notificationSettings.REMOVE_OFFER_COMPLETED"
                    label="You have successfully withdrawn your Wine offer"
                  />
                  <q-checkbox
                    v-model="notificationSettings.LISTING_CREATED_COMPLETED"
                    label="You have successfully made a Wine listing"
                  />
                  <q-checkbox
                    v-model="notificationSettings.REMOVE_LISTING_COMPLETED"
                    label="You have successfully unlisted your Wine"
                  />
                  <q-checkbox
                    v-model="notificationSettings.LISTING_CREATED_PENDING"
                    label="Your Wine listing is on its way"
                  />
                  <q-checkbox
                    v-model="notificationSettings.OFFER_CREATED_PENDING"
                    label="Your Wine offer is on its way"
                  />
                  <q-checkbox
                    v-model="notificationSettings.REMOVE_LISTING_PENDING"
                    label="Your Wine is being unlisted"
                  />
                  <q-checkbox
                    v-model="notificationSettings.REMOVE_OFFER_PENDING"
                    label="Your Wine offer is being withdrawn"
                  />
                  <q-checkbox
                    v-model="notificationSettings.LISTING_CREATED_CANCELLED"
                    label="You have cancelled your ongoing Wine listing"
                  />
                  <q-checkbox
                    v-model="notificationSettings.OFFER_CREATED_CANCELLED"
                    label="You have cancelled your ongoing Wine offer"
                  />
                  <q-checkbox
                    v-model="notificationSettings.REMOVE_LISTING_CANCELLED"
                    label="You have cancelled your ongoing Wine unlisting"
                  />
                  <q-checkbox
                    v-model="notificationSettings.REMOVE_OFFER_CANCELLED"
                    label="You have cancelled your ongoing Wine offer withdrawal"
                  />
                  <q-checkbox
                    v-model="notificationSettings.LISTING_CREATED_ERROR"
                    label="There was a problem with your Wine listing"
                  />
                  <q-checkbox
                    v-model="notificationSettings.LISTING_CREATED_ERROR"
                    label="There was a problem with listing your Wine"
                  />
                  <q-checkbox
                    v-model="notificationSettings.OFFER_CREATED_ERROR"
                    label="There was a problem with creating your Wine offer"
                  />
                  <q-checkbox
                    v-model="notificationSettings.LISTING_PURCHASED_ERROR"
                    label="There was a problem with purchasing a Wine listing"
                  />
                  <q-checkbox
                    v-model="notificationSettings.OFFER_ACCEPTED_ERROR"
                    label="There was a problem with accepting a Wine offer"
                  />
                  <q-checkbox
                    v-model="notificationSettings.REMOVE_LISTING_ERROR"
                    label="There was a problem with unlisting your Wine"
                  />
                  <q-checkbox
                    v-model="notificationSettings.REMOVE_OFFER_ERROR"
                    label="There was a problem with withdrawing your Wine offer"
                  />
                </div>
                <q-btn
                  class="wiv-primary-button q-my-sm settings-actions"
                  label="Update settings"
                  no-caps
                  unelevated
                  @click="
                    notificationsStore.saveNotificationSettings(
                      userStore.walletAddress
                    )
                  "
                />

                <div class="row q-mb-md q-mt-lg settings-notifications-header justify-center">
                  Stay Updated with Email Notifications
                </div>
                <div v-if="!notificationSettings.email" class="column q-my-sm no-wrap settings-actions">
                  <span class="q-mb-xs settings-username-header"> Your Email </span>
                  <q-input
                    v-model="email"
                    class="q-mb-md settings-actions"
                    outlined
                    dense
                    lazy-rules
                  />
                  <q-btn
                    class="wiv-primary-button q-my-sm settings-actions"
                    label="Verify Email"
                    no-caps
                    unelevated
                  />
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import '../../css/MainLayout/SettingsDialog.css';
import { useUserStore } from 'src/stores/user-store';
import VerificationStatus from './VerificationStatus.vue';
import { useNotificationsStore } from 'src/stores/notifications-store';
import { mapState } from 'pinia';

export default defineComponent({
  name: 'SettingsDialog',
  components: {
    VerificationStatus: VerificationStatus
  },
  emits: ['close-settings'],
  data() {
    const userStore = useUserStore();
    const notificationsStore = useNotificationsStore();

    return {
      userStore,
      notificationsStore,
      tab: ref('profile'),
      loadingSettings: ref(false),
      imageFile: ref(null),
      imageUploadMenu: false,
      username: ref(''),
      usernameRules: [
        (val: string) =>
          (val && val.length > 4) ||
          'Please type something greater than 3 characters',
        (val: string) =>
          val.length <= 12 || 'Please enter a maximum of 12 characters',
      ],
      email: '',
      fetchingSettings: false
    };
  },
  computed: {
    getUserAvatar() {
      const timestamp = new Date().getTime();
      return `${
        this.userStore.user?.avatar ||
        'https://source.boringavatars.com/beam/40/'
      }?${timestamp}`;
    },
    ...mapState(useNotificationsStore, {
      notificationSettings: store => store.notificationSettings,
      settingsFetched: store => store.settingsFetched
    })
  },
  watch: {
    imageFile() {
      this.uploadProfileAvatar();
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
        // eslint-disable-next-line
      } catch (error: any) {
        throw new Error(error);
      }
    },
    async FetchNotificationSettings() {
      if (!this.settingsFetched) {
        this.fetchingSettings = true;
        await this.notificationsStore.getNotificationsSettings(this.userStore.walletAddress);
        this.fetchingSettings = false;
      }
    },
    async uploadProfileAvatar() {
      const formData = new FormData();
      if (this.imageFile !== null) formData.append('image', this.imageFile);
      try {
        await this.userStore.uploadAvatar(formData);
        this.imageUploadMenu = false;
        // eslint-disable-next-line
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
});
</script>
