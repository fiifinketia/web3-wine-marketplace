<template>
  <div
    @click="onClickBackground"
    class="burger-menu-background column justify-between items-center"
  >
    <div>Marketplace</div>
    <div>Marketplace</div>
    <div>Marketplace</div>
    <div>Marketplace</div>
    <div>Marketplace</div>
    <div class="row justify-between">
      <img
        class="icons"
        src="../../assets/images/favs-icon.svg"
        alt="favorite-icon"
      />
      <img
        class="icons"
        src="../../assets/images/bell-icon.svg"
        alt="bell-icon"
      />
      <img
        class="icons"
        src="../../assets/images/profile-icon.svg"
        alt="profile-icon"
      />
    </div>
    <div>Marketplace</div>
    <div>Marketplace</div>
    <div>Marketplace</div>
    <div>Marketplace</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import '../../css/MainLayout/BurgerMenu.css';
export default defineComponent({
  name: 'BurgerMenu',
  methods: {
    onClickBackground() {
      this.$emit('clicked', true);
    },
  },
});
</script>

<style></style>
