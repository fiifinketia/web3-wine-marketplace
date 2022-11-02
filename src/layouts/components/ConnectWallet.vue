<template>
  <div
    @click="onClickBackground"
    class="connect-wallet-background row justify-center items-center"
  >
    <div
      @click.stop
      class="connect-wallet-container column justify-center items-center"
    >
      <img src="../../assets/images/wallet.svg" alt="wallet-icon" />
      <div class="connect-wallet-title">
        Connect your Web3 Wallet to signup.
      </div>
      <div>
        <q-btn class="connect-wallet-btns connect-btn" @click="userStore.magic.connect()" >Connect wallet</q-btn>
        <button class="connect-wallet-btns no-wallet-btn">
          I don't have a wallet
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import '../../css/MainLayout/ConnectWallet.css';
export default defineComponent({
  name: 'ConnectWallet',
  data (){
    const userStore = useUserStore();
    const email = ref('kelvinnketiaachiampong@gmail.com');
    return {
      email,
      userStore
    }
  },
  methods: {
    onClickBackground() {
      this.$emit('clicked', true);
    },
  },
});
</script>

<style></style>
