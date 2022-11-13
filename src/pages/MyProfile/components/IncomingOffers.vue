<template>
  <MenuVue />
  <div :class="accept === true ? 'content' : ''">
    <div class="flex justify-center items-center">
      <div class="flex row justify-between items-center container">
        <div class="flex row items-center offer-container">
          <div class="flex row items-start offer-container-first-part">
            <div class="flex row">
              <div class="offers">Offers</div>
              <div class="nft-number q-pl-sm">283</div>
            </div>

            <div class="flex row items-center search-item-hidden">
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
          <div class="flex row">
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
              class="flex row items-center q-pl-md"
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
        </div>
        <div class="flex row items-center item6">
          <div class="flex row items-center search-item">
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
          <div class="pagination-container">
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
  </div>
  <div :class="accept === true ? 'content' : ''">
    <div class="flex justify-center items-center">
      <div class="container1 flex justify-center items-center">
        <table class="table">
          <thead>
            <tr class="tr-border">
              <th class="flex items-start">NFT</th>
              <th class="floor-price">Floor Price</th>
              <th class="offered">Offered</th>
              <th class="from">From</th>
              <th class="exp-on">Exp on</th>
              <th class="action">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr class="incoming-offer-table">
              <td class="justify-start row item">
                <q-img
                  src="../../../assets/nft.png"
                  class="nft-image"
                  width="60px"
                  height="60px"
                />
                <div class="nft-item">The full wine name is...</div>
              </td>
              <td data-label="Floor-price" class="item2 floor-price">
                <div class="flex row justify-center">
                  <div class="inline cursor-pointer">
                    <div
                      class="fit flex flex-center text-center non-selectable q-pa-md"
                    >
                      <q-img src="../../../assets/usdc.png" class="ethereum" />
                      <div class="flex row price-mobile-container">
                        <div class="price1">101111.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td data-label="Offered" class="item2">
                <div class="flex row justify-center items-center">
                  <q-img src="../../../assets/usdc.png" class="ethereum" />

                  <div class="q-gutter-sm">
                    <div class="price3">1110.00</div>
                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                      class="tooltip-container"
                    >
                      <div class="flex column">
                        <div class="flex row justify-between">
                          <div class="tooltip-title">Floor-price</div>
                          <div class="flex row items-center">
                            <q-img
                              src="../../../assets/usdc.png"
                              width="15px"
                              height="15px"
                            />
                            <div class="tooltip-price">00.00</div>
                          </div>
                        </div>
                        <div class="flex row justify-between">
                          <div class="tooltip-title">From</div>
                          <div class="tooltip-from">0x000000000000</div>
                        </div>
                      </div>
                      <div class="absolute-center triangle"></div>
                    </q-tooltip>
                  </div>
                </div>
              </td>
              <td data-label="from" class="from">0x554safdw5</td>
              <td class="exp-on">00/00/00</td>
              <td data-label="Staus" class="item4">
                <button class="accept-button">
                  <div class="button-accept-text">Accept</div>
                  <q-img src="../../../assets/tick.png" class="button-image" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
