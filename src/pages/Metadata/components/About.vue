<template>
  <StatisticsMenu />
  <div class="flex column items-center justify-center">
    <div class="about-container flex column">
      <div class="about-title">About</div>
      <div class="q-pt-lg paragraph">
        The highlighted clans used a "RunRig" system to distribute land amogst
        their clansmen in a series of widely dispersed holdings. The emphasis
        was not an any one farm but rather the communal element of the whole.
      </div>
      <div class="q-pt-lg paragraph">
        The highlighted clans used a "RunRig" system to distribute land amogst
        their clansmen in a series of widely dispersed holdings. The emphasis
        was not an any one farm but rather the communal element of the whole.
      </div>
      <div class="q-pt-lg paragraph">
        The highlighted clans used a "RunRig" system to distribute land amogst
        their clansmen in a series of widely dispersed holdings. The emphasis
        was not an any one farm but rather the communal element of the whole.
      </div>
    </div>
    <div class="flex column properties-container">
      <div class="properties-title">Properties</div>
      <div class="flex table-container column items-center">
        <div
          class="flex row justify-between property-container q-pt-lg q-pb-lg"
        >
          <div class="flex column text-center items-center">
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
          <div class="flex column text-center items-center">
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
          <div class="flex column text-center items-center">
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
import '../../../css/Metadata/About.css';
export default defineComponent({
  name: 'AboutWine',
  components: { StatisticsMenu },
});
</script>

<style></style>
