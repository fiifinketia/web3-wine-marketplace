<template>
  <div class="burger-menu-background column justify-around items-center">
    <div class="burger-bolder-text" @click="$router.push('/marketplace?tab=nfts'); $emit('closeBurgerMenu')">Marketplace</div>
    <div @click="$router.push('/marketplace?tab=releases'); $emit('closeBurgerMenu')">New Releases</div>
    <div @click="$router.push('/marketplace?tab=releases'); $emit('closeBurgerMenu')">Recommended</div>
    <div class="burger-bolder-text">stats</div>
    <div class="burger-bolder-text">storefront</div>
    <div class="burger-icons row justify-between">
      <img
        class="icons"
        src="../../../public/images/favs-icon.svg"
        alt="favorite-icon"
				@click="$router.push('/favorites'); $emit('closeBurgerMenu')"
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
        @click="$router.push('/orders'); $emit('closeBurgerMenu')"
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
	emits: ['closeBurgerMenu', 'clicked', 'openConnectWallet'],
  data() {
    const userStore = useUserStore();
    return {
      userStore,
      isConnected: false
    }
  },
  async mounted() {
    await this.userStore.checkConnection();
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
      this.$emit('closeBurgerMenu');
      this.$emit('openConnectWallet');
    },
    async Logout() {
			this.userStore.walletAddress = '';
      this.$emit('closeBurgerMenu');
		},
  },
});
</script>

<style></style>
