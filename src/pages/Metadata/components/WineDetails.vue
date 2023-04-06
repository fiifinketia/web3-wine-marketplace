<template>
  <div class="flex column items-center justify-center">
    <div class="about-container flex column">
      <div class="about-title q-pb-lg">About</div>
      <div class="paragraph">
        {{ nft.description }}
      </div>
    </div>
    <div class="column properties-container">
      <div class="about-title q-pb-lg">Properties</div>
      <div v-if="$q.screen.width > 600" class="column table-container items-center" style="padding: 32px">
        <div
          v-for="(row, index) in RowsInDesktopAndTablet"
          :key="row"
          class="full-width"
        >
          <div class="row items-center justify-between">
            <div
              v-for="property in ReturnAboutPropertiesByRowIndex(index, 'DesktopAndTablet')"
              :key="property"
              class="column items-center property-container"
            >
              <div class="property-name">
                {{ ReturnNFTProperty(property) }}
              </div>
              <div class="property-value">
                {{ nft[property] }}
              </div>
            </div>
          </div>
          <q-separator v-if="index !== (RowsInDesktopAndTablet.length - 1)" spaced="lg" size="1px" color="rgba(94, 151, 236, 0.27)" style="width: 100%"/>
        </div>
      </div>
      <div v-else class="column items-center" style="flex-wrap: no-wrap">
        <div
          v-for="(row, index) in RowsInMobile"
          :key="row"
          class="full-width"
        >
          <div class="row items-center justify-evenly">
            <div
              v-for="property in ReturnAboutPropertiesByRowIndex(index, 'Mobile')"
              :key="property"
              class="column items-center property-container"
            >
              <div class="property-name">
                {{ ReturnNFTProperty(property) }}
              </div>
              <div class="property-value">
                {{ nft[property] }}
              </div>
            </div>
          </div>
          <q-separator v-if="index !== (RowsInMobile.length - 1)" spaced="lg" size="1px" color="rgba(94, 151, 236, 0.27)" style="width: 100%"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi';
import { NFTWithListingAndFavorites } from '../models/Metadata';
import '../../../css/Metadata/WineDetails.css';
export default defineComponent({
  name: 'AboutWine',
  props: {
    nft: {
      type: Object as PropType<NFTWithListingAndFavorites>,
      required: true,
    },
  },
  data() {
    return {
      aboutProperties: [
        'appellation',
        'brand',
        'case',
        'grape',
        'heritage',
        'maturity',
        'lwin',
        'origin',
        'producer',
        'region',
        'source',
        'type',
        'vintage',
        'productionCountry',
        'format',
        'wivVintage',
      ],
      RowsInDesktopAndTablet: [0,1,2,3],
      RowsInMobile: [0,1,2,3,4,5,6,7],
    };
  },
  methods: {
    ReturnNFTProperty(property: string) {
      switch (property) {
        case 'format':
          return 'Bottle Size';
        case 'wivVintage':
          return 'WiV Vintage';
        case 'productionCountry':
          return 'Production Country';
        default:
          return !!property ? property.charAt(0).toUpperCase() + property.slice(1) : ''
      }
    },
    ReturnAboutPropertiesByRowIndex(index: number, size: string) {
      switch (size) {
        case 'DesktopAndTablet':
          switch (index) {
            case 0:
              return this.aboutProperties.slice(0,4);
            case 1:
              return this.aboutProperties.slice(4,8);
            case 2:
              return this.aboutProperties.slice(8,12);
            case 3:
              return this.aboutProperties.slice(12,16);
          }
        case 'Mobile':
          switch (index) {
            case 0:
              return this.aboutProperties.slice(0,2);
            case 1:
              return this.aboutProperties.slice(2,4);
            case 2:
              return this.aboutProperties.slice(4,6);
            case 3:
              return this.aboutProperties.slice(6,8);
            case 4:
              return this.aboutProperties.slice(8,10);
            case 5:
              return this.aboutProperties.slice(10,12);
            case 6:
              return this.aboutProperties.slice(12,14);
            case 7:
              return this.aboutProperties.slice(14,16);
          }
      }
    }
  }
});
</script>

<style></style>
