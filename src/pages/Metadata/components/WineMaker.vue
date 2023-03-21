<template>
  <div class="flex justify-center">
    <div class="flex column winemaker-container">
      <div class="winemaker-text">Wine-maker</div>
      <div class="flex table-container column items-center">
        <div class="flex row table-container items-center">
          <div
            v-for="property in wineMakerProperties"
            :key="property"
            class="col-xs-6 col-sm-4 col-md-3 justify-between property-container q-my-sm"
          >
            <div
              v-if="property === 'format'"
              class="flex column text-center items-center"
            >
              <div class="property-name">Bottle Size</div>
              <div class="property-value">{{ nft[property] }}</div>
            </div>
            <div
              v-else-if="property === 'wivVintage'"
              class="flex column text-center items-center"
            >
              <div class="property-name">WiV Vintage</div>
              <div class="property-value">{{ nft[property] }}</div>
            </div>
            <div
              v-else-if="property === 'productionCountry'"
              class="flex column text-center items-center"
            >
              <div class="property-name">Production Country</div>
              <div class="property-value">{{ nft[property] }}</div>
            </div>
            <div v-else class="flex column text-center items-center">
              <div class="property-name">
                {{ property.charAt(0).toUpperCase() + property.slice(1) }}
              </div>
              <div class="property-value">
                {{ nft[property as keyof typeof nft] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi';
import '../../../css/Metadata/WineMaker.css';
import { NFTWithListingAndFavorites } from '../models/Metadata';
export default defineComponent({
  name: 'WineMaker',
  props: {
    nft: {
      type: Object as PropType<NFTWithListingAndFavorites>,
      required: true,
    },
  },
  data() {
    return {
      wineMakerProperties: [
        'appellation',
        'brand',
        'heritage',
        'lwin',
        'producer',
        'productionCountry',
        'region',
        'source',
        'vintage',
      ],
    };
  },
});
</script>

<style></style>
