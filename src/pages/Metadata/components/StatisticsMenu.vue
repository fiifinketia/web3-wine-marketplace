<template>
  <div class="flex justify-center">
    <q-tabs no-caps align="justify" class="tabs-menu">
      <q-route-tab to="/metadata" name="history" label="History" />
      <q-route-tab
        to="/metadata/about"
        class="tab-text-not-clicked"
        name="about"
        label="About"
      />
      <q-route-tab
        to="/metadata/winemaker"
        name="wine-maker"
        class="tab-text-not-clicked"
        label="Wine-maker"
      />
    </q-tabs>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue-demi';
import '../../../css/Metadata/StatisticsMenu.css';
export default defineComponent({
  name: 'StatisticsMenu',
  data() {
    return {
      tab: ref('mails'),
    };
  },
  methods: {},
});
</script>

<style></style>
