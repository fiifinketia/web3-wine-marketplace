<template>
  <div class="flex column justify-center items-center">
    <div class="brand-name">The brand name</div>
    <div class="wine-name">The full name of the wine is here</div>
    <div class="flex row q-pt-lg">
      <div>
        <q-img
          src="../../../assets/Nft-metadata.png"
          width="370px"
          height="370px"
        />
      </div>
      <div class="flex column">
        <div class="flex row">
          <div class="q-pl-lg">
            <q-img src="../../../assets/user.png" width="40px" height="40px" />
          </div>
          <div class="flex column q-pl-sm">
            <div class="owned-by">Owned by</div>
            <div class="user-id">Useridhere</div>
          </div>
        </div>
        <div class="metadata">
          <div class="flex row">
            <div class="metadata-text border">Sparkling wine</div>
            <div class="metadata-text border">00 yrs</div>
            <div class="metadata-text border">Italy</div>
            <div class="metadata-text q-pl-sm">The region name</div>
          </div>
          <div class="wine-description">
            Shiraz from old dry grown wineyards is blended with Viognier,
            complementing the strenths and complexities of these individual
            parcels of fruit...
          </div>
          <div class="flex column price-container">
            <div class="starting-from">Starting from</div>
            <div class="flex row items-center">
              <div>
                <q-img src="../../../assets/ethereum.png" width="20px" />
              </div>
              <div class="price1">00.00</div>
              <div class="price2">/ $ 00.00</div>
            </div>
          </div>
          <div class="bid-container flex column">
            <div class="bid-text">Highest bid from</div>
            <div class="flex row items-center q-pt-sm">
              <div>
                <q-img src="../../../assets/ethereum.png" width="20px" />
              </div>
              <div class="bid-price1">00.00</div>
              <div class="bid-price2">/ $ 00.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pt-lg flex row">
      <div class="q-pr-sm">
        <button class="buy-now-button flex items-center justify-center">
          <div class="buy-now-text">Buy now</div>
        </button>
      </div>
      <div class="q-pl-sm">
        <button class="make-offer-button flex items-center justify-center">
          <div class="buy-now-text">Make an offer</div>
        </button>
      </div>
    </div>
    <div class="q-pt-md update-metadata-text flex row items-center">
      <div class="q-pr-sm cursor-pointer">
        <q-img src="../../../assets/refresh.png" width="24px" />
      </div>
      <div class="update-metadata-text">Update metadata</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import '../../../css/Metadata/WineMetadata.css';
export default defineComponent({
  name: 'WineMetadata',
});
</script>

<style></style>
