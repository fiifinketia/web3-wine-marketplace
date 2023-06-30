<template>
  <q-card-section class="row items-center justify-center no-wrap">
    <q-btn
      :class="
        changeEmail
          ? 'shadow-1 overflow-hidden identity-label text-primary'
          : 'shadow-1 overflow-hidden identity-label text-warning'
      "
      style="border-radius: 10px"
      no-caps
      align="left"
    >
      <div v-if="changeEmail" class="row items-center no-wrap q-gutter-x-sm">
        <q-icon name="task_alt" />
        <span style="text-align: left"> Your email has been verified </span>
      </div>
      <div v-else class="row items-center no-wrap q-gutter-x-sm">
        <q-icon name="warning_amber" />
        <span style="text-align: left">
          Please click to verify your email.
        </span>
      </div>
      <q-menu
        anchor="bottom middle"
        self="top middle"
        fit
        :offset="[0, 15]"
        max-width="80%"
        class="identity-popup"
      >
        <q-tab-panels v-model="tab">
          <q-tab-panel name="code">
            <div class="row justify-center">
              <p class="text-caption text-center">
                We sent a verification code to your email,
                <span class="text-primary text-bold">{{ email }}</span
                >. If this email is incorrect,
                <span
                  class="text-primary underline cursor-pointer"
                  @click="editEmail"
                  >please edit your email</span
                >.
              </p>
            </div>
            <code-input
              :disabled="verifying"
							:loading="verifying"
							:error="verifyError"
              class="input"
              required
              :fields="6"
              @complete="verifyEmail"
							@change="val => code = val"
            />
            <div class="row justify-center q-mt-sm">
              <p class="text-caption text-center">
                Didn't receive an email? Check your spam folder or
                <span
                  :class="
                    minutes === 0 &&
                    seconds === 0
                      ? 'text-primary text-bold underline cursor-pointer'
                      : 'text-grey text-bold underline cursor-not-allowed'
                  "
                  @click="resendEmail"
                  >resend</span
                >
                in
                <span class="text-primary text-bold underline"
                  >{{ minutes }}:{{ seconds}}</span
                >.
              </p>
            </div>
          </q-tab-panel>
          <q-tab-panel name="email" class="row justify-center">
            <p class="col-12 q-mb-xs settings-username-header text-center">
              {{ changeEmail ? 'Change' : 'Enter' }} Your Email
            </p>
						<p v-if="verifyError" class="col-12 text-caption text-center text-negative">
							Cannot change email now, please try again later.
						</p>
            <q-input
              v-model="email"
              class="q-mb-sm settings-actions"
              outlined
              dense
              lazy-rules
              :rules="[
                val => /.+@.+\..+/.test(val) || 'Please enter a valid email',
              ]"
            />
            <q-btn
              class="wiv-primary-button q-my-sm settings-actions"
              label="Verify Email"
              no-caps
              unelevated
              :disable="!isValidEmail"
              :loading="sendingCode"
              @click="sendCode"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-menu>
    </q-btn>
  </q-card-section>
</template>
<script lang="ts">
import axios from 'axios';
import { mapState } from 'pinia';
import { useUserStore } from 'src/stores/user-store';
import { EmailVerificationStatus } from 'src/types/EmailVerificationStatus';
import { defineComponent, ref } from 'vue';
import CodeInput from 'src/components/CodeInput.vue';

export default defineComponent({
  name: 'EmailVerification',
  components: {
    CodeInput,
  },
  props: {
    changeEmail: {
      type: Boolean,
      default: false,
    },
    currentEmail: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      status: undefined as EmailVerificationStatus | undefined,
      email: ref(''),
      code: ref(''),
      tab: ref('email'),
      isValidEmail: ref(false),
      intervalID: undefined,
      sendingCode: false,
			verifying: false,
			verifyError: false,
			userStore: useUserStore(),
      remainingTime: {
        minutes: 0,
        seconds: 0,
      },
    };
  },
  computed: {
    ...mapState(useUserStore, {
      walletAddress: store => store.walletAddress,
    }),
    minutes() {
      return this.remainingTime.minutes;
    },
    seconds() {
      return this.remainingTime.seconds;
    },
  },
  watch: {
    email: function (val) {
      this.isValidEmail = /.+@.+\..+/.test(val) && val !== this.currentEmail;
    },
  },
  async mounted() {
    this.status = await this.fetchStatus();
    if (this.status) {
      this.StartTimer();
      this.tab = 'code';
    } else {
      this.tab = 'email';
    }
  },
  unmounted() {
    this.StopTimer();
  },
  methods: {
    async fetchStatus() {
      const marketplaceUsersUrl = process.env.MARKETPLACE_USERS_API;
      try {
        const response = await this.$axios.get<EmailVerificationStatus>(
          `${marketplaceUsersUrl}/email/status/${this.walletAddress}`
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            this.status = undefined;
          }
        }
      }
    },
    async sendCode() {
      // Check if it is a valid email
      if (!this.isValidEmail) return;
      this.sendingCode = true;
      // Send the code
      const marketplaceUsersUrl = process.env.MARKETPLACE_USERS_API;
      try {
        const response = await this.$axios.post<EmailVerificationStatus>(
          `${marketplaceUsersUrl}/email/verification/${this.walletAddress}`,
          {
            email: this.email,
            apiKey: process.env.MKTPLACE_API_KEY,
          }
        );
        if (response.status === 201 || response.status === 200) {
          this.status = response.data;
          this.StartTimer();
          this.tab = 'code';
        }
      } catch (error) {
        this.sendingCode = false;
				if (axios.isAxiosError(error)) {
					if (error.response?.status === 400) {
						this.verifyError = true;
					}
				}
        throw error;
      }
      this.sendingCode = false;
    },
    editEmail() {
      this.tab = 'email';
			this.verifyError = false;
    },
    async verifyEmail(isComplete: boolean, ) {
			if(!isComplete) return;
			const marketplaceUsersUrl = process.env.MARKETPLACE_USERS_API;
			try {
				this.verifying = true;
				await this.$axios.post<EmailVerificationStatus>(
          `${marketplaceUsersUrl}/email/verify/${this.walletAddress}`,
          {
            code: this.code,
            apiKey: process.env.MKTPLACE_API_KEY,
          }
        );
				this.verifying = false
				await this.userStore.fetchUser()
				this.tab = 'email'
			} catch (error) {
				this.verifyError = true;
				this.verifying = false;
				throw error;
			}
    },
    resendEmail() {
      this.sendCode()
    },
    GetTimeRemaining(expTime: number) {
      const total = expTime - Date.now();
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const seconds = Math.floor((total / 1000) % 60);
      if (minutes < 0 && seconds < 0)
        return {
          minutes: 0,
          seconds: 0,
        };
      return {
        minutes,
        seconds,
      };
    },
    StartTimer() {
      if (this.status) {
        this.intervalID = setInterval(() => {
          if (this.status?.lastRetry)
            (this.remainingTime = this.GetTimeRemaining(
              this.status.lastRetry + 300000
            )),
              1000;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any; // eslint-disable-line}
      }
    },
    StopTimer() {
      if (!!this.intervalID) {
        clearInterval(this.intervalID);
      }
    },
  },
});
</script>
