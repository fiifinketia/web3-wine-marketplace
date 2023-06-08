<template>
  <q-dialog
    position="right"
    transition-show="slide-left"
    transition-hide="slide-right"
    full-height
    class="my-wallet-background"
    @show="UpdateVerificationStatus()"
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

        <VerificationStatusMenu />
      </q-card-section>
      <div class="id-mobile">{{ user.walletAddress.slice(0, 20) + '...' }}</div>

      <q-card-section class="my-wallet-ballance-container column justify-center items-center">
        <img src="../../../public/images/wallet.svg" alt="wallet-icon" />
        <div v-if="$q.screen.width > 600" class="row items-center">
          <div class="balance-container column justify-between">
            <span class="balance-label"> USDC Balance </span>
            <div class="row items-center q-gutter-x-xs no-wrap">
              <q-icon name="app:USDC-icon" size="24px" />
              <span
                class="balance-number"
                :style="usdcBalance ? '' : 'color: #9D9D9D'"
              >
                {{ usdcBalance ? usdcBalance : '0' }}
              </span>
            </div>
          </div>
          <div class="balance-container column justify-between q-mx-md">
            <span class="balance-label"> USDT Balance </span>
            <div class="row items-center q-gutter-x-xs no-wrap">
              <q-icon name="app:USDT-icon" size="24px" />
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
            <div class="row items-center q-gutter-x-xs no-wrap">
              <q-icon name="app:WIVA-icon" size="24px"/>
              <span
                class="balance-number"
                :style="wivaBalance ? '' : 'color: #9D9D9D'"
              >
                {{ wivaBalance ? wivaBalance : '0' }}
              </span>
            </div>
          </div>
        </div>
        <div v-else class="column items-center no-wrap full-width q-gutter-y-md">
          <div :class="$q.screen.width > 350 ? 'row justify-center q-gutter-x-md full-width' : 'column items-center q-gutter-y-md'">
            <div class="balance-container column justify-between q-ml-none q-mt-none">
              <span class="balance-label"> USDC Balance </span>
              <div class="row items-center q-gutter-x-xs no-wrap">
                <q-icon name="app:USDC-icon" size="24px" />
                <span
                  class="balance-number"
                  :style="usdcBalance ? '' : 'color: #9D9D9D'"
                >
                  {{ usdcBalance ? usdcBalance : '0' }}
                </span>
              </div>
            </div>
            <div class="balance-container column justify-between">
              <span class="balance-label"> USDT Balance </span>
              <div class="row items-center q-gutter-x-xs no-wrap">
                <q-icon name="app:USDT-icon" size="24px" />
                <span
                  class="balance-number"
                  :style="usdtBalance ? '' : 'color: #9D9D9D'"
                >
                  {{ usdtBalance ? usdtBalance : '0' }}
                </span>
              </div>
            </div>
          </div>
          <div class="row justify-center">
            <div class="balance-container column justify-between">
              <span class="balance-label"> WIVA Balance </span>
              <div class="row items-center q-gutter-x-xs no-wrap">
                <q-icon name="app:WIVA-icon" size="24px"/>
                <span
                  class="balance-number"
                  :style="wivaBalance ? '' : 'color: #9D9D9D'"
                >
                  {{ wivaBalance ? wivaBalance : '0' }}
                </span>
              </div>
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
import VerificationStatusVue from './VerificationStatus.vue';
import { HandleUserValidity, VerificationStatus } from 'src/shared/veriff-service';
import { mapState } from 'pinia';
import { useUserStore } from 'src/stores/user-store';

export default defineComponent({
  name: 'WalletDialog',
  components: {
    VerificationStatusMenu: VerificationStatusVue
  },
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
  emits: ['close-my-wallet', 'fund-wallet', 'logout'],
  data() {
    return {
      HandleUserValidity
    }
  },
  computed: {
    ...mapState(useUserStore, {
      verificationStatus: store => store.user?.verificationStatus
    })
  },
  methods: {
    UpdateVerificationStatus() {
      if (!!this.verificationStatus) {
        if (this.verificationStatus !== VerificationStatus.VERIFIED) {
          HandleUserValidity();
        }
      }
    }
  }
});
</script>
