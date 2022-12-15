<template>
  <div class="burger-menu-background column justify-around items-center">
    <div class="burger-bolder-text">Marketplace</div>
    <div>New Releases</div>
    <div>recommended</div>
    <div class="burger-bolder-text">stats</div>
    <div class="burger-bolder-text">storefront</div>
    <div class="burger-icons row justify-between">
      <img
        class="icons"
        src="../../../public/images/favs-icon.svg"
        alt="favorite-icon"
      />
      <img
        class="icons"
        src="../../../public/images/bell-icon.svg"
        alt="bell-icon"
      />
      <img
        class="icons"
        src="../../../public/images/profile-icon.svg"
        alt="profile-icon"
        @click="$router.push('/orders')"
      />
    </div>
    <div v-if="!isConnected" @click="ConnectWallet()">sign up</div>
    <div class="burger-bolder-text">digital wine cellar</div>
    <div>settings</div>
    <div>contact us</div>
    <div>faqs</div>
    <div v-if="isConnected" @click="Logout()">log out</div>
  </div>
</template>

<script>
import { useUserStore } from 'src/stores/user-store';
import { defineComponent } from 'vue';
import '../../css/MainLayout/BurgerMenu.css';
export default defineComponent({
  name: 'BurgerMenu',
  data() {
    const userStore = useUserStore();
    return {
      userStore,
      isConnected: false
    }
  },
  mounted() {
		const wallet = this.userStore.walletAddress;
		if (!!wallet) {
			this.isConnected = true;
		}
	},
  methods: {
    onClickBackground() {
      this.$emit('clicked', true);
    },
    async ConnectWallet() {
      await this.userStore.connectWallet();
      this.$emit('closeBurgerMenu');
    },
    async Logout() {
			this.userStore.walletAddress = '';
      this.$emit('closeBurgerMenu');
		},
  },
});
</script>

<style></style>
