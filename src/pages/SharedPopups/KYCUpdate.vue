<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="identity-popup column no-wrap items-center" style="padding: 16px !important;">
      <div class="row full-width justify-end">
        <q-btn
          v-close-popup
          icon="close"
          flat
          round
          dense
        />
      </div>
      <q-icon :name="`app:${ReturnIconByStatus()}`" size="8rem" />
      <span
        class="identify-popup-title q-mt-md q-mb-xs"
        :style="userStatus == 'FAILED' ? 'color: #212131;' : ''"
      >
        {{ ReturnTitle() }}
      </span>
      <span
        class="identify-popup-subtitle"
        :style="userStatus == 'FAILED' ? 'color: #212131;' : ''"
      >
        {{ ReturnSubtitle() }}
      </span>

      <q-btn
        v-if="IsSectionNeeded()"
        v-close-popup
        class="wiv-primary-button q-mt-md"
        :style="$q.screen.width <= 600 ? 'width: 100%;' : ''"
        unelevated
        no-caps
        :label="
          userStatus == 'NOT_STARTED' || userStatus == 'FAILED'
          ? 'Go to Verification'
          : 'Continue Verification'
        "
        @click="StartSession()"
      />
      <router-link
        v-if="IsSectionNeeded()"
        to="/help/faqs/kyc"
        class="q-mt-md q-mb-xs wrap no-underline identity-popup-route"
      >
        {{
          userStatus == 'NOT_STARTED' || userStatus == 'STARTED'
          ? 'What is KYC?'
          : 'Contact Customer Support'
        }}
      </router-link>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { mapState } from 'pinia';
import { VerificationStatus } from 'src/shared/veriff-service';

export default defineComponent({
  emits: ['start-veriff'],
  computed: {
    ...mapState(useUserStore, {
      userStatus: store => store.user?.verificationStatus,
      sessionURL: store => store.user?.sessionURL,
      sessionToken: store => store.user?.sessionToken,
      sessionID: store => store.user?.sessionID
    })
  },
  methods: {
    ReturnIconByStatus() {
      switch (this.userStatus) {
        case VerificationStatus.NOT_STARTED:
          return 'verify-user';
        case VerificationStatus.STARTED:
          return 'verify-pending';
        case VerificationStatus.PENDING:
          return 'verify-pending';
        case VerificationStatus.FAILED:
          return 'verify-failed';
        default:
          return 'verify-failed';
      }
    },
    ReturnTitle() {
      switch (this.userStatus) {
        case VerificationStatus.NOT_STARTED:
          return 'Please begin your identity verification.';
        case VerificationStatus.STARTED:
          return 'Please complete your identity verification.';
        case VerificationStatus.PENDING:
          return 'Your identity is being verified.';
        case VerificationStatus.FAILED:
          return 'Verification failed';
        default:
          return 'Verification failed';
      }
    },
    ReturnSubtitle() {
      switch (this.userStatus) {
        case VerificationStatus.NOT_STARTED:
          return 'Your information is required to abide by European KYC regulators.';
        case VerificationStatus.STARTED:
          return 'Pick up from where you left off in the verification process.';
        case VerificationStatus.PENDING:
          return 'We will notify you once it is completed.';
        case VerificationStatus.FAILED:
          return 'Reason';
        default:
          return 'Reason';
      }
    },
    IsSectionNeeded() : boolean {
      const status = this.userStatus;
      return status == VerificationStatus.NOT_STARTED
        || status == VerificationStatus.STARTED
        || status == VerificationStatus.FAILED
    },
    StartSession() {
      this.$emit('start-veriff', {
        continueSession: this.userStatus == VerificationStatus.STARTED,
        lastSessionURL: this.userStatus == VerificationStatus.STARTED ? this.sessionURL : ''
      })
    }
  }
})
</script>

<style>

</style>