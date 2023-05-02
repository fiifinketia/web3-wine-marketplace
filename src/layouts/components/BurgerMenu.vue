<template>
  <div class="burger-menu-background column justify-around items-center">
    <div v-if="isConnected" class="burger-bolder-text" @click="openMyWallet()">
      <q-avatar size="40px"> <img :src="userStore.user?.avatar" /> </q-avatar>
      {{ userStore.user.username || userStore.walletAddress.slice(0, 10) }}
    </div>
		<div
      class="burger-bolder-text"
      @click="
        $router.push('/');
        $emit('closeBurgerMenu');
      "
    >
      Home
    </div>
    <div
      class="burger-bolder-text"
      @click="
        $router.push('/marketplace?tab=nfts');
        $emit('closeBurgerMenu');
      "
    >
      Marketplace
    </div>
    <div
      @click="
        $router.push('/marketplace?tab=releases');
        $emit('closeBurgerMenu');
      "
    >
      New Releases
    </div>
    <div
      @click="
        $router.push('/marketplace?tab=recommended');
        $emit('closeBurgerMenu');
      "
    >
      Recommended
    </div>
    <div class="burger-bolder-text">stats</div>
    <div class="burger-bolder-text">storefront</div>
    <div
      v-if="userStore.walletAddress"
      class="burger-icons row justify-between"
    >
      <img
        class="icons"
        src="../../../public/images/favs-icon.svg"
        alt="favorite-icon"
        @click="
          $router.push('/favorites');
          $emit('closeBurgerMenu');
        "
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
        @click="
          $router.push('/orders');
          $emit('closeBurgerMenu');
        "
      />
    </div>
    <div v-if="!isConnected" @click="ConnectWallet()">sign up</div>
    <div class="burger-bolder-text">digital wine cellar</div>
    <div @click="$emit('closeBurgerMenu');$emit('openSettings')">settings</div>
    <div>contact us</div>
    <div>faqs</div>
    <div v-if="isConnected" @click="Logout()">log out</div>
    <div>&nbsp;</div>
    <div>&nbsp;</div>
  </div>
</template>

<script lang="ts">
import { useNFTStore } from 'src/stores/nft-store';
import { useUserStore } from 'src/stores/user-store';
import { defineComponent } from 'vue';
import '../../css/MainLayout/BurgerMenu.css';
import { ordersStore } from 'src/stores/orders-store';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
export default defineComponent({
  name: 'BurgerMenu',
  emits: ['closeBurgerMenu', 'clicked', 'openConnectWallet', 'openMyWallet', 'openSettings'],
  data() {
    const userStore = useUserStore();
    const nftStore = useNFTStore();
    const orderStore = ordersStore();
    return {
      userStore,
      nftStore,
      orderStore,
      isConnected: false,
    };
  },
  async mounted() {
    await this.userStore.checkConnection();
    const wallet = this.userStore.walletAddress;
    if (!!wallet) {
      this.isConnected = true;
    } else {
      this.ClearStore();
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
    async openMyWallet() {
      this.$emit('closeBurgerMenu');
      this.$emit('openMyWallet');
    },
    async Logout() {
      this.userStore.walletAddress = '';
      this.ClearStore();
      this.$emit('closeBurgerMenu');
    },
    ClearStore() {
      this.nftStore.ownedNFTs = [] as TokenIdentifier[];
      this.nftStore.fetchNFTsStatus = false;
      this.orderStore.$reset();
    },
  },
});
</script>

<style></style>
