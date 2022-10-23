<template>
  <div class="flex justify-center">
    <q-tabs style="width: 80%" no-caps align="justify">
      <q-tab name="history">
        <div class="tab-text-clicked">NFT history</div>
      </q-tab>
      <q-tab class="tab-text-clicked" name="about">About</q-tab>
      <q-tab name="wine-maker" class="tab-text-clicked">Wine-maker</q-tab>
    </q-tabs>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue-demi';
import '../../../css/Metadata/Statistics.css';
export default defineComponent({
  name: 'StatisticsMenu',
  data() {
    return {
      tab: ref('mails'),
    };
  },
});
</script>

<style>
/* .q-tab--active .q-tab__label {
  color: red;
} */

.q-tab--active {
  color: red;
}

.q-tab {
  color: #9d9d9d;
}

.q-tab__indicator {
  color: #3586ff;
}
</style>
