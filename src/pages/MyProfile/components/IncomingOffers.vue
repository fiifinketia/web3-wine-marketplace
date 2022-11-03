<template>
  <MenuVue />
  <div :class="accept === true ? 'content' : ''">
    <div class="flex justify-center items-center">
      <div class="flex row justify-between items-center container">
        <div class="flex row items-center offer-container">
          <div class="offers">Offers</div>
          <div class="nft-number q-pl-sm">283</div>
          <div class="q-pl-sm">
            <div class="border"></div>
          </div>
          <div
            class="flex row items-center q-pl-sm"
            @click="clickedNew = !clickedNew"
          >
            <div
              :class="
                clickedNew === true ? 'radio-button-clicked' : 'radio-button'
              "
            ></div>
            <div
              class="radio-button-text q-pl-sm"
              :class="
                clickedNew === true
                  ? 'radio-button-text-clicked'
                  : 'radio-button-text'
              "
            >
              New first
            </div>
          </div>
          <div
            class="flex row items-center q-pl-lg"
            @click="clicked = !clicked"
          >
            <div
              :class="
                clicked === true ? 'radio-button-clicked' : 'radio-button'
              "
            ></div>
            <div
              class="radio-button-text q-pl-sm"
              :class="
                clicked === true
                  ? 'radio-button-text-clicked'
                  : 'radio-button-text'
              "
            >
              Old first
            </div>
          </div>
        </div>
        <div class="flex row items-center item4">
          <div class="search_wrap search_wrap_2">
            <div class="search_box">
              <div class="btn btn_common">
                <q-img
                  src="../../../assets/search.png"
                  width="25px"
                  height="25px"
                  class="search"
                />
              </div>
              <input type="text" class="input" placeholder="Search..." />
            </div>
          </div>
          <div class="button-wrapper">
            <button class="go-button">
              <div class="go-text">GO</div>
            </button>
          </div>
          <div class="q-pl-lg flex row pagination">
            <div class="number">1-6</div>
            <div class="q-pl-sm cursor-pointer">
              <q-img src="../../../assets/back.png" width="15px" />
            </div>
            <div class="q-pl-md cursor-pointer">
              <q-img src="../../../assets/next.png" width="15px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div :class="accept === true ? 'content' : ''">
    <div class="flex justify-center items-center container-table">
      <table class="table">
        <thead>
          <tr class="tr-border">
            <th class="flex items-start">NFT</th>
            <th class="floor-price">Floor Price</th>
            <th>Offered</th>
            <th class="from">From</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="justify-start row item">
              <q-img
                src="../../../assets/nft.png"
                class="nft-image"
                width="60px"
                height="60px"
              />
              <div class="nft-item">The full wine name</div>
            </td>
            <td data-label="Floor-price" class="item2 floor-price">
              <div class="flex row justify-center">
                <q-img src="../../../assets/usdc.png" class="ethereum" />
                <div class="flex row price-mobile-container">
                  <div class="price1">10.00</div>
                </div>
              </div>
            </td>
            <td data-label="Age" class="item2">
              <div class="flex row justify-center">
                <q-img src="../../../assets/usdc.png" class="ethereum" />
                <div class="price3">10.00</div>
              </div>
            </td>
            <td data-label="from" class="from">0x554safdw5</td>
            <td data-label="Staus" class="item4">
              <button class="accept-button">
                <div class="button-accept-text">Accept</div>
                <q-img src="../../../assets/tick.png" class="button-image" />
              </button>
            </td>
          </tr>
          <tr>
            <td class="justify-start row item">
              <q-img
                src="../../../assets/nft.png"
                class="nft-image"
                width="60px"
                height="60px"
              />
              <div class="nft-item">The full wine name</div>
            </td>
            <td data-label="Floor-price" class="item2 floor-price">
              <div class="flex row justify-center">
                <q-img src="../../../assets/usdc.png" class="ethereum" />
                <div class="price1">10.00</div>
              </div>
            </td>
            <td data-label="Age" class="item2">
              <div class="flex row justify-center">
                <q-img src="../../../assets/usdc.png" class="ethereum" />
                <div class="price3">10.00</div>
              </div>
            </td>
            <td data-label="from" class="from">0x554safdw5</td>
            <td data-label="Staus" class="item4">
              <button class="accept-button" @click="accept = !accept">
                <div class="button-accept-text">Accept</div>
                <q-img src="../../../assets/tick.png" class="button-image" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div
    class="flex column justify-center items-center absolute box"
    v-if="accept === true && buy === false"
  >
    <div class="box-text">Please confirm the action</div>
    <div class="flex row justify-between button-container q-pt-lg">
      <div>
        <button class="cancel-button" @click="accept = !accept">
          <div class="cancel-text">Cancel</div>
        </button>
      </div>
      <div>
        <button class="accept-offer-button" @click="this.buy = !buy">
          <div class="accept-text">Accept</div>
        </button>
      </div>
    </div>
  </div>
  <div
    class="flex column justify-center items-center absolute box"
    v-if="buy === true"
  >
    <div class="q-pb-sm">
      <q-img src="../../../assets/box.png" width="90px" height="90px" />
    </div>
    <div class="offer-accepted">Offer has been accepted</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi';
import '../../../css/MyProfile/IncomingOffers.css';
import MenuVue from './Menu.vue';
export default defineComponent({
  name: 'IncomingOffers',
  components: { MenuVue },
  data() {
    return {
      clicked: false,
      clickedNew: false,
      accept: false,
      buy: false,
    };
  },
  methods: {
    // buyNFT() {
    //   this.buy = true;
    //   setInterval(() => {
    //     this.buy = false;
    //     this.accept = false;
    //   }, 3500);
    // },
  },
});
</script>

<style></style>
