<template>
  <MenuVue />
  <div class="flex justify-center items-center">
    <div class="flex row justify-between items-center container">
      <div class="flex row items-center offer-container">
        <div class="flex row justify-between offers-container">
          <div class="flex row">
            <div class="offers">Offers</div>
            <div class="nft-number q-pl-sm">283</div>
          </div>
          <div class="flex row items-center search-container">
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
          </div>
        </div>
        <div class="q-pl-sm">
          <div class="offer-border"></div>
        </div>
        <div class="order flex row justify-between">
          <div class="flex row">
            <div
              class="flex row items-center q-pl-sm cursor-pointer clicked-new-radio-button"
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
              class="flex row items-center cursor-pointer q-pl-md"
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
            <div
              class="flex row items-center cursor-pointer q-pl-md"
              @click="expiring = !expiring"
            >
              <div
                :class="
                  expiring === true ? 'radio-button-clicked' : 'radio-button'
                "
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
          <div class="q-pl-sm flex row pagination2">
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
      <div class="flex row items-center item4">
        <div class="flex row items-center search-wrap">
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
        </div>
        <div class="q-pl-sm flex row pagination">
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
  <div :class="accept === true ? 'content' : ''">
    <div class="flex justify-center">
      <div class="flex listing-wrapper justify-center">
        <div class="flex justify-center items-center listing-items">
          <div class="flex column full-width">
            <div
              class="flex row justify-between items-center full-width q-pt-md listing-options"
            >
              <div class="nft-listing-title nft-listing-wrapper q-pl-sm">
                NFT
              </div>
              <div class="flex row justify-between section-two-container">
                <div class="nft-listing-title treshold treshold-title">
                  Floor Price
                </div>
                <div class="nft-listing-title treshold">Offered</div>
                <div class="nft-listing-title from-text treshold">From</div>
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
                    <div class="q-pl-sm treshold-number">
                      {{ item.treshold }}
                    </div>
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
                    class="nft-listing-title flex row items-center from-width highest-offer-container from-wallet"
                  >
                    <div class="q-pl-sm from-wallet">0x000000000</div>
                  </div>
                  <div class="nft-listing-title treshold expires-on-number exp">
                    {{ item.exp }}
                  </div>
                  <div
                    class="nft-listing-title treshold flex row"
                    @click="this.accept = !accept"
                  >
                    Accept
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </div>
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
  methods: {
    buyNFT() {
      this.buy = true;
      setInterval(() => {
        this.buy = false;
        this.accept = false;
      }, 2000);
    },
  },
});
</script>

<style></style>
