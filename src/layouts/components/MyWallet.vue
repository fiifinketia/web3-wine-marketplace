<template>
  <div @click="onClickBackground" class="my-wallet-background row justify-end">
    <div
      @click.stop
      class="my-wallet-container column justify-between items-center"
    >
      <div class="my-wallet-header row">
        <div>MY WALLET</div>
        <img src="../../../public/images/metamask-icon.svg" alt="" />
        <div class="wallet-id">walletID</div>
        <img
          @click="onClickBackground"
          class="x-icon"
          src="../../../public/images/x-icon.svg"
          alt=""
        />
        <div class="id-mobile">walletID</div>
      </div>
      <div
        class="my-wallet-ballance-container column justify-center items-center"
      >
        <img src="../../../public/images/wallet.svg" alt="wallet-icon" />
        <div class="ballance-wrapper column">
          <div class="my-wallet-title q-pb-sm">Your balance is</div>
          <div class="my-wallet-balance">$00.00</div>
        </div>
        <button class="my-wallet-btn">Fund wallet</button>
      </div>
      <div class="my-wallet-logout">LOG OUT</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import '../../css/MainLayout/MyWallet.css';
export default defineComponent({
  name: 'MyWallet',
  methods: {
    onClickBackground() {
      this.$emit('clicked', true);
    },
  },
});
</script>

<style></style>
