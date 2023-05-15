<template>
  <q-dialog
    position="left"
    persistent
    class="settings-background row"
    full-height
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="settings-container column items-center no-wrap">
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
	<div v-if="!loadingSettings">
      <q-tab-panels v-model="tab" animated class="full-width">
        <q-tab-panel name="profile">
          <q-card flat class="column items-center justify-around">
	     <q-card-section
		v-if="userStore.user.verificationStatus === 'NOT_STARTED'"
		class="row items-center no-wrap"
	      >
		<q-btn
		  class="shadow-1 overflow-hidden text-primary"
		  style="border-radius: 10px"
		  icon="warning_amber"
		  no-caps
		  label="Please click to complete your identity verification."
		>
		  <q-menu
		    anchor="bottom start"
		    self="top start"
		    fit
		    :offset="[0, 30]"
		    max-width="80%"
		  >
		    <div class="column no-wrap q-pa-md items-center">
		      <q-icon name="app:verify-user" size="5rem" />

		      <div class="text-subtitle1 text-bold q-mt-md q-mb-xs">
			Please complete your identity verification.
		      </div>
		      <div class="row justify-center">
			<div
			  class="text-caption text-center col-10 wrap q-mt-md q-mb-xs wrap"
			>
			  Your information is required to abide by European KYC
			  regulators.
			</div>
		      </div>

		      <q-btn
			v-close-popup
			class="wiv-primary-button q-mt-md"
			unelevated
			no-caps
			label="Go to Verification"
		      />
		      <router-link
			to="/help/faqs/kyc"
			class="text-caption text-center q-mt-md q-mb-xs wrap text-grey"
			>What is KYC ?</router-link
		      >
		    </div>
		  </q-menu>
		</q-btn>
	      </q-card-section>

	      <q-card-section
		v-if="
		  userStore.user.verificationStatus === 'FAILED'
		"
		class="row items-center no-wrap"
	      >
		<q-btn
		  class="shadow-1 overflow-hidden text-negative"
		  style="border-radius: 10px"
		  icon="warning_amber"
		  no-caps
		  label="Verification failed"
		>
		  <q-menu
		    anchor="bottom middle"
		    self="top middle"
		    fit
		    :offset="[0, 30]"
		    max-width="80%"
		  >
		    <div class="column no-wrap q-pa-md items-center">
		      <q-icon name="app:verify-failed" size="5rem" />

		      <div class="text-subtitle1 text-bold q-mt-md q-mb-xs">
			Verification failed
		      </div>
		      <div class="row justify-center">
			<div
			  class="text-caption text-center col-10 wrap q-mt-md q-mb-xs wrap"
			>
			  Reason
			</div>
		      </div>

		      <q-btn
			v-close-popup
			class="wiv-primary-button q-mt-md"
			unelevated
			no-caps
			label="Go to Verification"
		      />
		      <router-link
			to="/help/faqs/kyc"
			class="text-caption text-center q-mt-md q-mb-xs wrap text-grey"
			>Contact Customer support</router-link
		      >
		    </div>
		  </q-menu>
		</q-btn>
	      </q-card-section>

	      <q-card-section
		v-if="userStore.user.verificationStatus === 'VERIFIED'"
		class="row items-center no-wrap"
	      >
		<q-btn
		  class="shadow-1 overflow-hidden text-primary"
		  style="border-radius: 10px"
		  icon="task_alt"
		  no-caps
		  label="Verified your identity"
		>
		  <q-menu
		    anchor="bottom middle"
		    self="top middle"
		    fit
		    :offset="[0, 30]"
		    max-width="80%"
		  >
		    <div class="column no-wrap q-pa-md items-center">
		      <q-icon name="app:verify-complete" size="5rem" />

		      <div class="text-subtitle1 text-bold q-mt-md q-mb-xs">
			Your identity has been successfully verified.
		      </div>
		      <div class="row justify-center">
			<div
			  class="text-caption text-center col-10 wrap q-mt-md q-mb-xs wrap"
			>
									Enjoy exploring the world of wine!
			</div>
		      </div>

		      <q-btn
			v-close-popup
			class="wiv-primary-button q-mt-md"
			unelevated
			no-caps
			label="Go to Verification"
		      />
		      <router-link
			to="/help/faqs/kyc"
			class="text-caption text-center q-mt-md q-mb-xs wrap text-grey"
			>Contact Customer support</router-link
		      >
		    </div>
		  </q-menu>
		</q-btn>
	      </q-card-section>

	      <q-card-section
		v-if="
		  userStore.user.verificationStatus === 'PENDING'
		"
		class="row items-center no-wrap"
	      >
		<q-btn
		  class="shadow-1 overflow-hidden text-primary"
		  style="border-radius: 10px"
		  icon="pending_actions"
		  no-caps
		  label="Verifying your identity"
		>
		  <q-menu
		    anchor="bottom middle"
		    self="top middle"
		    fit
		    :offset="[0, 30]"
		    max-width="80%"
		  >
		    <div class="column no-wrap q-pa-md items-center">
		      <q-icon name="app:verify-pending" size="5rem" />

		      <div class="text-subtitle1 text-bold q-mt-md q-mb-xs">
			Your identity is being verified.
		      </div>
		      <div class="row justify-center">
			<div
			  class="text-caption text-center col-10 wrap q-mt-md q-mb-xs wrap"
			>
			  We will notify you once it is completed.
			</div>
		      </div>

		      <q-btn
			v-close-popup
			class="wiv-primary-button q-mt-md"
			unelevated
			no-caps
			label="Go to Verification"
		      />
		      <router-link
			to="/help/faqs/kyc"
			class="text-caption text-center q-mt-md q-mb-xs wrap text-grey"
			>Contact Customer support</router-link
		      >
		    </div>
		  </q-menu>
		</q-btn>
	      </q-card-section>


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
                      <q-item v-close-popup clickable>
                        <q-item-section>Delete Avatar</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-icon>
              </q-badge>
              <div class="row q-mt-sm justify-around full-width">
                <div class="col text-body2 q-mx-xs">Wallet</div>
                <div
                  class="col text-bold no-wrap q-mx-xs"
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
                full-width
                label="Save Changes"
                unelevated
                @click="saveProfileSettings"
              />`
            </q-card-section>
          </q-card>
        </q-tab-panel>
        <q-tab-panel name="notifications">
         <q-card flat class="column items-center justify-around fit">
            <q-card-section class="colum q-my-xs items-center">
              <div class="row q-my-md text-bold text-primary justify-center">
                {{ 'Select the notifications you would like to recieve.' }}
              </div>
              <div class="column q-my-sm justify-center items-start q-mx-xl text-caption">
              	<q-checkbox v-model="notificationsStore.settings.offerReceived" label="You received an offer on your wine" />
              	<q-checkbox v-model="notificationsStore.settings.offerMade" label="You have successfully placed a bid" />
              	<q-checkbox v-model="notificationsStore.settings.offerAccepted" label="Your bid has been accepted" />
              	<q-checkbox v-model="notificationsStore.settings.offerOutbidded" label="Your offer has been outbid" />
              	<q-checkbox v-model="notificationsStore.settings.orderFulfilled" label="You sold your Wine" />
              	<q-checkbox v-model="notificationsStore.settings.wineChanged" label="Your wine has some changes from the producer" />
              </div>

	      <div class="row q-my-md text-bold text-primary justify-center">
                {{ 'Be notified by email once the wine store is going live' }}
              </div>
	      <div class="column q-my-sm text-bold text-grey items-center">
                <div class="text-start text-caption">
		{{ 'Your Email' }}
              <q-input
                v-model="notificationsStore.settings.email"
                class="q-mb-md"
                outlined
                dense
								:disabled="!notificationsStore.settings.email"
                lazy-rules
              />
			</div>
              <q-btn
                class="wiv-primary-button q-my-sm"
                label="Save Changes"
                unelevated
                @click="notificationsStore.saveNotificationsSettings(userStore.walletAddress)"
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
import { useNotificationsStore } from 'src/stores/notifications-store';

export default defineComponent({
  name: 'SettingsDialog',
  emits: ['close-settings'],
  data() {
    const userStore = useUserStore();
    const notificationsStore = useNotificationsStore();
    notificationsStore.getNotificationsSettings(userStore.walletAddress)

    return {
      userStore,
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
          val.length <= 12 || 'Please enter a maximum of 12 charaters',
      ],
	notificationsStore,
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
			// eslint-disable-next-line
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
			// eslint-disable-next-line
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
});
</script>
