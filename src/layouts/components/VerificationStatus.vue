<template>
  <q-card-section
    v-if="userStatus === 'NOT_STARTED'"
    class="row items-center justify-center no-wrap"
  >
    <q-btn
      class="shadow-1 overflow-hidden identity-label text-warning"
      style="border-radius: 10px"
      icon="warning_amber"
      no-caps
      align="left"
      label="Please click to complete your identity verification."
    >
      <q-menu
        anchor="bottom middle"
        self="top middle"
        fit
        :offset="[0, 15]"
        max-width="80%"
        class="identity-popup"
      >
        <div class="column no-wrap q-pa-md items-center">
          <q-icon name="app:verify-user" size="7rem" />
          <span class="identify-popup-title q-mt-md q-mb-xs">
            Please complete your identity verification.
          </span>
          <span class="identify-popup-subtitle">
            Your information is required to abide by European KYC regulators.
          </span>

          <q-btn
            v-close-popup
            class="wiv-primary-button q-mt-md"
            unelevated
            no-caps
            label="Go to Verification"
          />
          <router-link
            to="/help/faqs/kyc"
            class="q-mt-md q-mb-xs wrap no-underline identity-popup-route"
          >
            What is KYC ?
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
      icon="warning_amber"
      no-caps
      align="left"
      label="Verification failed"
    >
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
            class="wiv-primary-button q-mt-md"
            unelevated
            no-caps
            label="Go to Verification"
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
      icon="pending_actions"
      no-caps
      align="left"
      label="Verifying your identity"
    >
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
      icon="task_alt"
      no-caps
      align="left"
      label="Your identity is verified"
    >
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

export default defineComponent({
  computed: {
    ...mapState(useUserStore, {
      userStatus: store => store.user?.verificationStatus
    })
  }
})
</script>

<style>

</style>