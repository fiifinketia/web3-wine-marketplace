<template>
  <q-dialog
    position="right"
    full-height
    class="my-wallet-background row justify-end"
  >
    <q-card class="my-wallet-container column justify-between items-center">
      <q-card-section class="my-wallet-header row items-center no-wrap">
        <div class="my-wallet-header-container row">
          <div>MY WALLET</div>
          <q-separator spaced="md" size="2px" vertical color="accent" />
          <img src="../../../public/images/metamask-icon.svg" alt="" />
          <q-separator
            class="wallet-id"
            spaced="sm"
            size="2px"
            vertical
            color="accent"
          />
          <div class="wallet-id">
            {{ user.walletAddress.slice(0, 15) + '...' }}
          </div>
        </div>
        <img
          class="x-icon"
          src="../../../public/images/x-icon.svg"
          alt=""
          @click="$emit('close-my-wallet')"
        />
      </q-card-section>
      <div class="id-mobile">{{ user.walletAddress.slice(0, 20) + '...' }}</div>

      <q-card-section
        v-if="user.verificationStatus === 'NOT_STARTED'"
        class="row items-center no-wrap"
      >
        <q-btn
          class="shadow-1 overflow-hidden text-warning"
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
          user.verificationStatus === 'FAILED'
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
        v-if="true"
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
          user.verificationStatus === 'PENDING'
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

      <q-card-section
        class="my-wallet-ballance-container column justify-center items-center"
      >
        <img src="../../../public/images/wallet.svg" alt="wallet-icon" />
        <div class="ballance-wrapper column">
          <div class="my-wallet-title q-pb-sm">Your balance is</div>
          <div class="my-wallet-balance">$ {{ balance.toFixed(4) }}</div>
        </div>
        <q-btn
          class="my-wallet-btn no-box-shadow"
          unelevated
          @click="$emit('fund-wallet')"
          >Fund wallet</q-btn
        >
      </q-card-section>

      <q-card-section class="my-wallet-logout" @click="$emit('logout')">
        LOG OUT
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { UserModel } from 'src/components/models';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'WalletDialog',
  props: {
    user: {
      type: Object as () => UserModel,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  emits: ['close-my-wallet', 'fund-wallet', 'logout'],
  data() {
    return {
      expanded: ref(false),
    };
  },
});
</script>
