<template>
  <q-dialog
    position="right"
    transition-show="slide-left"
    transition-hide="slide-right"
    full-height
    class="my-wallet-background"
  >
    <q-card class="my-wallet-container column justify-between">
      <q-card-section class="column no-wrap">
        <q-card-section class="my-wallet-header row items-center justify-between no-wrap q-mb-lg">
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

        <q-card-section
          v-if="user.verificationStatus === 'NOT_STARTED'"
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
          v-if="user.verificationStatus === 'FAILED'"
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
          v-if="user.verificationStatus === 'PENDING'"
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
          v-else
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
      </q-card-section>
      <div class="id-mobile">{{ user.walletAddress.slice(0, 20) + '...' }}</div>

      <q-card-section class="my-wallet-ballance-container column justify-center items-center">
        <img src="../../../public/images/wallet.svg" alt="wallet-icon" />
        <div class="row items-center" :class="$q.screen.width > 600 ? '' : 'justify-between full-width'">
          <div class="balance-container column justify-between">
            <span class="balance-label"> USDC Balance </span>
            <div class="row items-center q-gutter-x-xs">
              <q-icon
                name="app:USDC-icon"
                :size="$q.screen.width > 600 ? '24px' : '20px'"
              />
              <span
                class="balance-number"
                :style="usdcBalance ? '' : 'color: #9D9D9D'"
              >
                {{ usdcBalance ? usdcBalance : '0' }}
              </span>
            </div>
          </div>
          <div class="balance-container column justify-between" :class="$q.screen.width > 600 ? 'q-mx-md' : ''">
            <span class="balance-label"> USDT Balance </span>
            <div class="row items-center q-gutter-x-xs">
              <q-icon
                name="app:USDT-icon"
                :size="$q.screen.width > 600 ? '24px' : '20px'"
              />
              <span
                class="balance-number"
                :style="usdtBalance ? '' : 'color: #9D9D9D'"
              >
                {{ usdtBalance ? usdtBalance : '0' }}
              </span>
            </div>
          </div>
          <div class="balance-container column justify-between">
            <span class="balance-label"> WIVA Balance </span>
            <div class="row items-center q-gutter-x-xs">
              <q-icon
                name="app:WIVA-icon"
                :size="$q.screen.width > 600 ? '24px' : '20px'"
              />
              <span
                class="balance-number"
                :style="wivaBalance ? '' : 'color: #9D9D9D'"
              >
                {{ wivaBalance ? wivaBalance : '0' }}
              </span>
            </div>
          </div>
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WalletDialog',
  props: {
    user: {
      type: Object as () => UserModel,
      required: true,
    },
    usdtBalance: {
      type: String,
      required: true
    },
    usdcBalance: {
      type: String,
      required: true
    },
    wivaBalance: {
      type: String,
      required: true
    },
  },
  emits: ['close-my-wallet', 'fund-wallet', 'logout']
});
</script>
