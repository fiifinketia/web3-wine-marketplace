<template>
  <div @click="onClickBackground" class="my-wallet-background row justify-end">
    <div
      @click.stop
      class="my-wallet-container column justify-between items-center"
    >
      <div class="my-wallet-header row">
        <div>MY WALLET</div>
        <img src="../../assets/images/metamask-icon.svg" alt="" />
        <div>walletID</div>
        <img
          @click="onClickBackground"
          class="x-icon"
          src="../../assets/images/x-icon.svg"
          alt=""
        />
      </div>
      <div
        class="my-wallet-ballance-container column justify-center items-center"
      >
        <img src="../../assets/images/wallet.svg" alt="wallet-icon" />
        <div class="ballance-wrapper column">
          <div class="my-wallet-title q-pb-sm">Your balance is</div>
          <div class="my-wallet-balance"> ${{ balance }}</div>
        </div>
        <button class="my-wallet-btn">Fund wallet</button>
      </div>
      <div class="my-wallet-logout">LOG OUT</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import '../../css/MainLayout/MyWallet.css';
export default defineComponent({
  name: 'MyWallet',
  data() {

    const userStore = useUserStore();
    return {
      balance: 0,
      userStore
    };
  },
  async beforeMount() {
    this.balance = await this.userStore.getWalletBalance();
  },
  methods: {
    onClickBackground() {
      this.$emit('clicked', true);
    },
  },
});
</script>

<style></style>
