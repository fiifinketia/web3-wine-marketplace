<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '../css/app.scss';
import NavBar from './components/NavBar.vue';

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {};
  },
  components: {
    NavBar,
  },
});
</script>

<style>
body {
  position: relative;
}
</style>
