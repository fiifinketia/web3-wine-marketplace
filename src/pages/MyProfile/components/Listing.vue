<template>
  <MenuVue />
  <div class="flex justify-center items-center">
    <div class="flex row justify-between items-center container">
      <div class="flex row items-center offer-container">
        <div class="offers">Offers</div>
        <div class="nft-number q-pl-sm">283</div>
        <div class="q-pl-sm">
          <div class="offer-border"></div>
        </div>
        <div
          class="flex row items-center q-pl-sm cursor-pointer"
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
          class="flex row items-center cursor-pointer q-pl-lg"
          @click="clicked = !clicked"
        >
          <div
            :class="clicked === true ? 'radio-button-clicked' : 'radio-button'"
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
        <div
          class="flex row items-center cursor-pointer q-pl-lg"
          @click="expiring = !expiring"
        >
          <div
            :class="expiring === true ? 'radio-button-clicked' : 'radio-button'"
          ></div>
          <div
            class="radio-button-text q-pl-sm"
            :class="
              expiring === true
                ? 'radio-button-text-clicked'
                : 'radio-button-text'
            "
          >
            Expiring first
          </div>
        </div>
      </div>
      <div class="flex row items-center item4">
        <div class="plus-button-wrapper">
          <button class="flex justify-center plus-button">
            <q-img src="../../../assets/plus.png" width="30px" height="30px" />
          </button>
        </div>
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
  <div class="flex justify-center">
    <div class="flex listing-wrapper justify-center">
      <div class="flex justify-center items-center listing-items">
        <div class="flex column full-width">
          <div
            class="flex row justify-between items-center full-width q-pt-md listing-options"
          >
            <div class="nft-listing-title nft-listing-wrapper q-pl-sm">NFT</div>
            <div class="flex row justify-between section-two-container">
              <div class="nft-listing-title treshold treshold-title">
                Treshold
              </div>
              <div class="nft-listing-title treshold">Price</div>
              <div class="nft-listing-title treshold highest-offer-title">
                Highest offer
              </div>
              <div class="nft-listing-title treshold exp">Exp on</div>
              <div class="nft-listing-title treshold">Action</div>
            </div>
          </div>
          <div class="q-pt-md">
            <q-card
              class="flex row justify-between items-center full-width q-pt-sm no-shadow q-pb-sm listing-cards"
              v-for="item in items"
              :key="item.name"
            >
              <div class="nft-listing-name flex row items-center q-pl-sm">
                <q-img
                  src="../../../assets/circle.png"
                  width="50px"
                  height="50px"
                  class="listing-wine-image"
                />
                <div class="q-pl-md wine-listing-name">{{ item.name }}</div>
              </div>
              <div class="flex row justify-between section-two-container">
                <div
                  class="nft-listing-title flex row items-center treshold treshold-property"
                >
                  <q-img
                    src="../../../assets/usdc.png"
                    width="20px"
                    height="20px"
                  />
                  <div class="q-pl-sm treshold-number">{{ item.treshold }}</div>
                </div>
                <div class="nft-listing-title flex row items-center treshold">
                  <q-img
                    src="../../../assets/usdc.png"
                    width="20px"
                    height="20px"
                  />
                  <div class="q-pl-sm price-number">{{ item.price }}</div>
                </div>

                <div
                  class="nft-listing-title flex row items-center treshold highest-offer-container"
                >
                  <q-img
                    src="../../../assets/usdc.png"
                    width="20px"
                    height="20px"
                  />
                  <div class="q-pl-sm highest-offer-number">
                    {{ item.offer }}
                  </div>
                </div>
                <div class="nft-listing-title treshold expires-on-number exp">
                  {{ item.exp }}
                </div>
                <div class="nft-listing-title treshold q-pl-sm">Action</div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi';
import '../../../css/MyProfile/Listing.css';
import MenuVue from './Menu.vue';
export default defineComponent({
  name: 'ListingComponent',
  components: { MenuVue },
  data() {
    return {
      clickedNew: false,
      clicked: false,
      expiring: false,
      items: [
        {
          name: 'The full wine name is here',
          treshold: 111,
          price: 1111,
          offer: 1111,
          exp: '00/00/00',
        },
        {
          name: 'The full wine name is here',
          treshold: 111,
          price: 1111,
          offer: 1111,
          exp: '00/00/00',
        },
        {
          name: 'The full wine name is here',
          treshold: 111,
          price: 1111,
          offer: 1111,
          exp: '00/00/00',
        },
        {
          name: 'The full wine name is here',
          treshold: 111,
          price: 1111,
          offer: 1111,
          exp: '00/00/00',
        },
        {
          name: 'The full wine name is here',
          treshold: 111,
          price: 1111,
          offer: 1111,
          exp: '00/00/00',
        },
        {
          name: 'The full wine name is here',
          treshold: 111,
          price: 1111,
          offer: 1111,
          exp: '00/00/00',
        },
      ],
    };
  },
});
</script>

<style></style>
