<template>
  <div class="connect-wallet-background row justify-center items-center">
    <div class="connect-wallet-container column justify-center items-center">
      <img src="../../assets/images/wallet.svg" alt="wallet-icon" />
      <div class="connect-wallet-title">
        Connect your Web3 Wallet to signup.
      </div>
      <div>
        <button class="connect-wallet-btns connect-btn">Connect wallet</button>
        <button class="connect-wallet-btns no-wallet-btn">
          I don't have a wallet
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import '../../css/MainLayout/ConnectWallet.css';
export default defineComponent({
  name: 'ConnectWallet',
});
</script>

<style></style>
