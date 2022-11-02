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
    <div>sign up</div>
    <div class="burger-bolder-text">digital wine cellar</div>
    <div>settings</div>
    <div>contact us</div>
    <div>faqs</div>
    <div>log out</div>
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
