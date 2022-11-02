<template>
  <div
    class="flex column justify-center items-center"
    @click="openModal === true ? 'modal' : 'content'"
  >
    <div class="brand-name">The brand name</div>
    <div class="wine-name">The full name of the wine is here</div>
    <div class="flex r q-pt-lg test-class">
      <div class="flex justify-center">
        <q-img src="../../../assets/Nft-metadata.png" class="picture" />
      </div>
      <div class="flex column info">
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
    <div
      class="q-pt-lg flex row modal-container"
      :style="openModal === true ? '' : ''"
    >
      <div class="q-pr-sm whole-modal">
        <button
          @click="openModal = !openModal"
          class="buy-now-button flex items-center justify-center cursor-pointer"
        >
          <div class="buy-now-text">Buy now</div>
        </button>
        <div v-if="openModal == true" class="wine-container absolute">
          <div class="flex row items-center">
            <div class="buy-now-modal q-pl-lg q-pr-sm">Buy now</div>
            <div class="border-container">
              <div class="border-modal"></div>
            </div>
            <div
              class="flex row justify-between items-center close-container q-pl-sm"
            >
              <div class="wine-name-modal">
                The full name of the wine is here and here and here
              </div>
              <div class="close-button-wrapper" @click="openModal = !openModal">
                <q-img
                  src="../../../assets/closeButton.png"
                  width="20px"
                  height="20px"
                  class="close-button cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div class="flex row" :class="openModal === true ? '' : ''">
            <div class="image-container q-pb-lg q-pl-lg">
              <q-img
                src="../../../assets/Nft-metadata.png"
                class="modal-picture"
                width="380px"
              />
            </div>
            <div class="process-container flex column">
              <div class="q-pt-md timer">04:59</div>
              <div class="modal-price flex column q-pl-lg">
                <div class="modal-price">Price</div>
                <div class="flex row justify-start items-center q-pt-sm">
                  <div class="">
                    <q-img src="../../../assets/ethereum.png" width="20px" />
                  </div>
                  <div class="modal-price1">00.00</div>
                  <div class="modal-price2 q-pl-sm">/ $ 00.00</div>
                </div>
                <div class="q-pt-lg q-pl-sm flex column">
                  <div>Fee</div>
                  <div class="modal-price1 q-pt-sm">00.00 %</div>
                </div>
              </div>
              <div class="modal-border q-pt-lg">
                <div class="border-modal"></div>
              </div>
              <div class="flex column q-pt-lg">
                <div class="total q-pl-lg">Total</div>
                <div class="flex row q-pl-lg items-center q-pt-sm">
                  <div>
                    <q-img src="../../../assets/ethereum.png" width="25px" />
                  </div>
                  <div class="modal-total-price1">00.00</div>
                  <div class="modal-total-price2 q-pl-sm">/ $ 00.00</div>
                </div>
                <div class="q-pl-lg flex row q-pt-lg">
                  <input type="checkbox" />
                  <div class="q-pl-sm">
                    I agree with
                    <label class="terms">Terms and Conditions</label>
                  </div>
                </div>
              </div>
              <div class="flex payment">
                <div class="payment-text">Process payment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-pl-sm">
        <button
          class="make-offer-button flex items-center justify-center cursor-pointer"
        >
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
import { filter } from 'compression';
import { defineComponent, ref } from 'vue-demi';
import '../../../css/Metadata/WineMetadata.css';
export default defineComponent({
  name: 'WineMetadata',
  data() {
    return {
      openModal: false,
      right: ref(false),
    };
  },
  methods: {},
});
</script>

<style></style>
