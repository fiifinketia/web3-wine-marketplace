<template>
  <div class="flex justify-center">
    <q-tabs style="width: 80%" no-caps align="justify">
      <q-tab name="history">
        <div class="tab-text-not-clicked">NFT history</div>
      </q-tab>
      <q-tab class="tab-text-not-clicked" name="about">About</q-tab>
      <q-tab name="wine-maker" class="tab-text-not-clicked">Wine-maker</q-tab>
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

<style>
.q-tab__indicator {
  color: #3586ff;
}
</style>
