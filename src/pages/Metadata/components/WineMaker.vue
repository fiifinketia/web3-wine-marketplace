<template>
  <div class="flex column items-center justify-center">
    <div class="column about-maker-container">
      <div class="about-title q-pb-lg">About</div>
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
              class="column items-center maker-container"
            >
              <div class="property-name">
                {{ ReturnNFTMakerProperty(property) }}
              </div>
              <div class="property-value">
                {{ ReturnNFTMakerProperty(property) }}
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
              class="column items-center maker-container"
            >
              <div class="property-name">
                {{ ReturnNFTMakerProperty(property) }}
              </div>
              <div class="property-value">
                {{ ReturnNFTMakerProperty(property) }}
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
import { defineComponent } from 'vue';
import '../../../css/Metadata/WineDetails.css';
export default defineComponent({
  name: 'WineMaker',
  data() {
    return {
      wineMakerProperties: [
        'Founded',
        'Founder',
        'Revenue',
        'Product',
        'Grapes',
        'Other services',
        'Awards'
      ],
      RowsInDesktopAndTablet: [0,1,2],
      RowsInMobile: [0,1,2,3],
    };
  },
  methods: {
    ReturnNFTMakerProperty(property: string) {
      return property
    },
    ReturnAboutPropertiesByRowIndex(index: number, size: string) {
      switch (size) {
        case 'DesktopAndTablet':
          switch (index) {
            case 0:
              return this.wineMakerProperties.slice(0,3);
            case 1:
              return this.wineMakerProperties.slice(3,6);
            case 2:
              return this.wineMakerProperties.slice(6,7);
          }
        case 'Mobile':
          switch (index) {
            case 0:
              return this.wineMakerProperties.slice(0,2);
            case 1:
              return this.wineMakerProperties.slice(2,4);
            case 2:
              return this.wineMakerProperties.slice(4,6);
            case 3:
              return this.wineMakerProperties.slice(6,8);
          }
      }
    }
  }
});
</script>

<style></style>
