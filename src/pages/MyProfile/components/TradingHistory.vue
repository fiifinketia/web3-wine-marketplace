<template>
  <MenuVue />
  <div class="flex justify-center">
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
          <div class="plus-button-wrapper">
            <button class="flex justify-center plus-button">
              <q-img
                src="../../../assets/plus.png"
                width="30px"
                height="30px"
              />
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
  <div class="flex justify-center">
    <div class="flex listing-wrapper justify-center">
      <div class="flex justify-center items-center listing-items">
        <div class="flex column full-width">
          <div
            class="flex row justify-between items-center full-width q-pt-md listing-options"
          >
            <div
              class="nft-listing-title nft-listing-wrapper q-pl-sm trading-history-nft-title"
            >
              NFT
            </div>
            <div
              class="flex row justify-between section-two-container trading-history-section-two-container"
            >
              <div class="nft-listing-title trading-history">Price</div>
              <div class="nft-listing-title trading-history from-to">
                From/to
              </div>
              <div class="nft-listing-title trading-history date-title">Date</div>
            </div>
          </div>
          <div class="q-pt-md">
            <q-card
              class="flex row justify-between items-center full-width q-pt-sm no-shadow q-pb-sm listing-cards"
              v-for="item in items"
              :key="item.name"
            >
              <div
                class="nft-listing-name flex row items-center q-pl-sm trading-history-nft-title"
              >
                <div
                  :class="
                    item.history === 'Buy' ? 'buy q-pr-lg' : 'sell q-pr-lg'
                  "
                >
                  {{ item.history }}
                </div>
                <q-img
                  src="../../../assets/circle.png"
                  width="50px"
                  height="50px"
                  class="listing-wine-image"
                />
                <div
                  class="q-pl-md wine-listing-name trading-history-wine-name"
                >
                  {{ item.name }}
                </div>
              </div>
              <div
                class="flex row justify-between section-two-container trading-history-section-two-container"
              >
                <div class="flex row items-center trading-history">
                  <q-img
                    src="../../../assets/usdc.png"
                    width="20px"
                    height="20px"
                  />
                  <div class="q-pl-sm price-number">{{ item.price }}</div>
                </div>

                <div
                  class="flex row items-center trading-history from-wallet-text from-to"
                >
                  0x0000000000
                </div>
                <div class="trading-history time flex row items-center">
                  <div class="trading-history-date">00/00/00</div>
                  <div class="offer-border"></div>
                  <div class="trading-history-hour">10:30 PM</div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute-center absolute-container" v-if="openModal === true">
      <div class="listing-modal-container">
        <div class="flex column">
          <div class="q-pt-lg q-pl-lg flex row items-center">
            <div class="list-title">List</div>
            <div class="listing-modal-wine-name q-pl-lg">
              The full name of the wine is here and here and here
            </div>
          </div>
          <div class="flex row">
            <div class="q-pl-lg q-pt-lg">
              <q-img
                src="../../../assets/circle.png"
                width="360px"
                height="360px"
              />
            </div>
            <div
              class="flex column q-pl-lg q-pt-lg modal-second-part-container"
            >
              <div class="flex row">
                <div class="flex column">
                  <div class="grey-modal-text">Your price</div>
                  <input class="input-width" id="price" required />
                </div>
                <div class="flex column q-pl-sm">
                  <div class="grey-modal-text">Treshold</div>
                  <input class="input-width" id="tres" required />
                </div>
              </div>
              <div class="expiration-date-wrapper flex column q-pt-md">
                <div class="grey-modal-text q-pb-sm">Expiration date</div>
                <div class="date-input flex row items-center">
                  <input type="date" class="input-date" id="date" required />
                </div>
              </div>
              <div class="flex column q-pt-lg">
                <div class="grey-modal-text">Fee</div>
                <div class="fee-text">00.00 %</div>
              </div>
              <div class="line-container q-pt-sm">
                <div class="flex justify-center">
                  <div class="line"></div>
                </div>
              </div>
              <div class="flex column q-pt-sm">
                <div class="total-price">Total price</div>
                <div class="flex row items-center">
                  <q-img
                    src="../../../assets/usdc.png"
                    width="25px"
                    height="25px"
                  />
                  <div class="total-price-numbers q-pl-sm">00.00</div>
                </div>
              </div>
              <div class="flex row items-center q-pt-lg">
                <q-img
                  src="../../../assets/grape.svg"
                  width="20px"
                  height="20px"
                />
                <div class="expiration-text q-pl-sm">
                  After the expiration, the NFT will be moved to the Digital
                  Wine Cellar. You can edit the NFT listing details anytime.
                </div>
              </div>
              <div class="flex row q-pt-sm">
                <input type="checkbox" />
                <div class="agreement-text q-pl-sm">
                  I agree with
                  <label class="agreement-text-blue"
                    >Terms and conditions</label
                  >
                </div>
              </div>
              <div
                class="modal-buttons flex row items-center justify-between q-pt-lg"
              >
                <div>
                  <button class="reset-button" @click="reset()">
                    <div class="reset-text">Reset</div>
                  </button>
                </div>
                <div>
                  <button class="update-background">
                    <div class="update-text">Update</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../css/MyProfile/TradingHistory.css';
import { defineComponent } from 'vue-demi';
import '../../../css/MyProfile/IncomingOffers.css';
import '../../../css/MyProfile/OutgoingOffers.css';
import MenuVue from './Menu.vue';
export default defineComponent({
  name: 'OutgoingOffers',
  components: { MenuVue },
  data() {
    return {
      edit: false,
      clicked: false,
      clickedNew: false,
      expiring: false,
      items: [
        {
          name: 'The full wine name is here',
          treshold: 111,
          price: 1111,
          offer: 1111,
          exp: '00/00/00',
          history: 'Buy',
        },
        {
          name: 'The full wine name is here',
          treshold: 111,
          price: 1111,
          offer: 1111,
          exp: '00/00/00',
          history: 'Buy',
        },
        {
          name: 'The full wine name is here',
          treshold: 111,
          price: 1111,
          offer: 1111,
          exp: '00/00/00',
          history: 'Sell',
        },
        {
          name: 'The full wine name is here',
          treshold: 111,
          price: 1111,
          offer: 1111,
          exp: '00/00/00',
          history: 'Buy',
        },
        {
          name: 'The full wine name is here',
          treshold: 111,
          price: 1111,
          offer: 1111,
          exp: '00/00/00',
          history: 'Sell',
        },
        {
          name: 'The full wine name is here',
          treshold: 111,
          price: 1111,
          offer: 1111,
          exp: '00/00/00',
          history: 'Buy',
        },
      ],
    };
  },
});
</script>

<style></style>
