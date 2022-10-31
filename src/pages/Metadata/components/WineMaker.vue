<template>
  <StatisticsMenu />
  <div class="flex justify-center">
    <div class="flex column winemaker-container">
      <div class="winemaker-text">Wine-maker</div>
      <div class="flex table-container column items-center">
        <div
          class="flex row justify-between property-container q-pt-lg q-pb-lg"
        >
          <div class="flex column text-center items-center column1">
            <div class="property-name">Property name</div>
            <div class="property-value">Property value</div>
          </div>
          <div class="flex column text-center items-center">
            <div class="property-name">Property name</div>
            <div class="property-value">Property value</div>
          </div>
          <div class="flex column text-center items-center">
            <div class="property-name">Property name</div>
            <div class="property-value">Property value</div>
          </div>
        </div>
        <div id="border" />
        <div
          class="flex row justify-between property-container q-pt-lg q-pb-lg"
        >
          <div class="flex column text-center items-center column1">
            <div class="property-name">Property name</div>
            <div class="property-value">Property value</div>
          </div>
          <div class="flex column text-center items-center">
            <div class="property-name">Property name</div>
            <div class="property-value">Property value</div>
          </div>
          <div class="flex column text-center items-center">
            <div class="property-name">Property name</div>
            <div class="property-value">Property value</div>
          </div>
        </div>
        <div id="border" />
        <div class="flex row justify-between property q-pt-lg">
          <div class="flex column text-center items-center column1">
            <div class="property-name">Property name</div>
            <div class="property-value">Property value</div>
          </div>
          <div class="flex column text-center items-center">
            <div class="property-name">Property name</div>
            <div class="property-value">Property value</div>
          </div>
          <div class="flex column text-center items-center">
            <div class="property-name">Property name</div>
            <div class="property-value">Property value</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi';
import StatisticsMenu from './StatisticsMenu.vue';
import '../../../css/Metadata/WineMaker.css';
export default defineComponent({
  name: 'WineMaker',
  components: { StatisticsMenu },
});
</script>

<style></style>
