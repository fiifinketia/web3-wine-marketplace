<template>
  <q-card-section
    v-if="userStatus === 'NOT_STARTED'"
    class="row items-center justify-center no-wrap"
  >
    <q-btn
      class="shadow-1 overflow-hidden identity-label text-warning"
      style="border-radius: 10px"
      no-caps
      align="left"
    >
      <div class="row items-center no-wrap q-gutter-x-sm">
        <q-icon name="warning_amber" />
        <span style="text-align: left"> Please click to begin your identity verification. </span>
      </div>
      <q-menu
        anchor="bottom middle"
        self="top middle"
        fit
        :offset="[0, 15]"
        max-width="80%"
        class="identity-popup"
      >
        <div class="column no-wrap items-center">
          <q-icon name="app:verify-user" size="7rem" />
          <span class="identify-popup-title q-mt-md q-mb-xs">
            Please begin your identity verification.
          </span>
          <span class="identify-popup-subtitle">
            Your information is required to abide by European KYC regulators.
          </span>

          <q-btn
            v-close-popup
            class="wiv-primary-button identify-popup-button q-mt-md"
            unelevated
            no-caps
            label="Go to Verification"
            @click="BeginUserVerification()"
          />
          <router-link
            to="/help/faqs/kyc"
            class="q-mt-md q-mb-xs wrap no-underline identity-popup-route"
          >
            What is KYC?
          </router-link>
        </div>
      </q-menu>
    </q-btn>
  </q-card-section>

  <q-card-section
    v-else-if="userStatus === 'STARTED'"
    class="row items-center justify-center no-wrap"
  >
    <q-btn
      class="shadow-1 overflow-hidden identity-label text-warning"
      style="border-radius: 10px"
      no-caps
      align="left"
    >
      <div class="row items-center no-wrap q-gutter-x-sm">
        <q-icon name="warning_amber" />
        <span style="text-align: left"> Please click to complete your identity verification. </span>
      </div>
      <q-menu
        anchor="bottom middle"
        self="top middle"
        fit
        :offset="[0, 15]"
        max-width="80%"
        class="identity-popup"
      >
        <div class="column no-wrap items-center">
          <q-icon name="app:verify-pending" size="7rem" />
          <span class="identify-popup-title q-mt-md q-mb-xs">
            Please complete your identity verification.
          </span>
          <span class="identify-popup-subtitle">
            Pick up from where you left off in the verification process.
          </span>

          <q-btn
            v-close-popup
            class="wiv-primary-button identify-popup-button q-mt-md"
            unelevated
            no-caps
            label="Continue Verification"
            @click="BeginUserVerification()"
          />
          <router-link
            to="/help/faqs/kyc"
            class="q-mt-md q-mb-xs wrap no-underline identity-popup-route"
          >
            What is KYC?
          </router-link>
        </div>
      </q-menu>
    </q-btn>
  </q-card-section>

  <q-card-section
    v-else-if="userStatus === 'FAILED'"
    class="row items-center justify-center no-wrap"
  >
    <q-btn
      class="shadow-1 identity-label overflow-hidden text-negative"
      style="border-radius: 10px"
      no-caps
      align="left"
    >
      <div class="row items-center no-wrap q-gutter-x-sm">
        <q-icon name="warning_amber" />
        <span style="text-align: left"> Verification failed. </span>
      </div>
      <q-menu
        anchor="bottom middle"
        self="top middle"
        fit
        :offset="[0, 15]"
        max-width="80%"
        class="identity-popup"
      >
        <div class="column no-wrap items-center">
          <q-icon name="app:verify-failed" size="7rem" />

          <span class="identify-popup-title q-mt-md q-mb-xs" style="color: #212131;">
            Verification failed
          </span>
          <span class="identify-popup-subtitle" style="color: #212131;">
            Reason
          </span>

          <q-btn
            v-close-popup
            class="wiv-primary-button identify-popup-button q-mt-md"
            unelevated
            no-caps
            label="Go to Verification"
            @click="BeginUserVerification()"
          />
          <router-link
            to="/help/faqs/kyc"
            class="q-mt-md q-mb-xs wrap no-underline identity-popup-route"
            >Contact Customer support</router-link
          >
        </div>
      </q-menu>
    </q-btn>
  </q-card-section>

  <q-card-section
    v-else-if="userStatus === 'PENDING'"
    class="row items-center justify-center no-wrap"
  >
    <q-btn
      class="shadow-1 identity-label overflow-hidden"
      style="border-radius: 10px"
      no-caps
      align="left"
    >
      <div class="row items-center no-wrap q-gutter-x-sm">
        <q-icon name="pending_actions" />
        <span style="text-align: left"> Verifying your identity </span>
      </div>
      <q-menu
        anchor="bottom middle"
        self="top middle"
        fit
        :offset="[0, 15]"
        max-width="80%"
        class="identity-popup"
      >
        <div class="column no-wrap items-center">
          <q-icon name="app:verify-pending" size="7rem" />

          <span class="identify-popup-title q-mt-md q-mb-xs">
            Your identity is being verified.
          </span>
          <span class="identify-popup-subtitle">
            We will notify you once it is completed.
          </span>
        </div>
      </q-menu>
    </q-btn>
  </q-card-section>

  <q-card-section
    v-else-if="userStatus === 'VERIFIED'"
    class="row items-center justify-center no-wrap"
  >
    <q-btn
      class="shadow-1 identity-label overflow-hidden text-primary"
      style="border-radius: 10px"
      no-caps
      align="left"
    >
      <div class="row items-center no-wrap q-gutter-x-sm">
        <q-icon name="task_alt" />
        <span style="text-align: left"> Your identity is verified </span>
      </div>
      <q-menu
        anchor="bottom middle"
        self="top middle"
        fit
        :offset="[0, 15]"
        max-width="80%"
        class="identity-popup"
      >
        <div class="column no-wrap items-center">
          <q-icon name="app:verify-complete" size="7rem" />
          <span class="identify-popup-title q-mt-md q-mb-xs">
            Your identity has been successfully verified.
          </span>
          <span class="identify-popup-subtitle">
            Enjoy exploring the world of wine!
          </span>
        </div>
      </q-menu>
    </q-btn>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { mapState } from 'pinia';
import { StartVeriff, VerificationStatus } from 'src/shared/veriff-service';

export default defineComponent({
  data() {
    const userStore = useUserStore();
    return {
      userStore
    }
  },
  computed: {
    ...mapState(useUserStore, {
      userStatus: store => store.user?.verificationStatus,
      sessionURL: store => store.user?.sessionURL,
      sessionToken: store => store.user?.sessionToken,
      sessionID: store => store.user?.sessionID
    })
  },
  methods: {
    BeginUserVerification() {
      const continueSession = this.userStatus == VerificationStatus.STARTED;
      const lastSessionURL = this.userStatus == VerificationStatus.STARTED ? this.sessionURL : '';
      StartVeriff(<string> this.userStore.user?.walletAddress, '', continueSession, lastSessionURL);
    }
  }
})
</script>

<style>

</style>