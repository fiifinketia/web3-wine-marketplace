<template>
  <MenuVue />
  <div :class="edit === true ? 'content' : ''">
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
            class="flex row items-center cursor-pointer q-pl-lg"
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
  <div :class="edit === true ? 'content' : ''">
    <div class="flex justify-center items-center container-table">
      <table class="table">
        <thead>
          <tr>
            <th class="flex items-start nft-outgoing-title">NFT</th>
            <th class="your-price">Your offer</th>
            <th class="yours">Yours</th>
            <th class="highest-price">Highest Offer</th>
            <th class="from">Exp on</th>
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
                <div class="price1">10.00</div>
              </div>
            </td>
            <td data-label="Age" class="item2">
              <div class="flex row justify-center">
                <q-img src="../../../assets/usdc.png" class="ethereum" />
                <div class="price3">10.00</div>
              </div>
            </td>
            <td data-label="from" class="from">00/00/00</td>

            <td>
              <div class="flex row justify-center action">
                <div class="q-pr-md">
                  <button class="delete-button">
                    <q-img
                      src="../../../assets/trash1.png"
                      width="20px"
                      height="20px"
                    />
                  </button>
                </div>
                <button
                  class="accept-button"
                  style="width: 50px"
                  @click="edit = !edit"
                >
                  <q-img src="../../../assets/tick.png" width="20px" />
                </button>
              </div>
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
            <td data-label="from" class="from">00/00/00</td>
            <td data-label="Accept">
              <div class="flex row justify-center action">
                <div class="q-pr-md">
                  <button class="delete-button">
                    <q-img
                      src="../../../assets/trash1.png"
                      width="20px"
                      height="20px"
                    />
                  </button>
                </div>
                <button
                  class="accept-button"
                  style="width: 50px"
                  @click="edit = !edit"
                >
                  <q-img src="../../../assets/tick.png" width="20px" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="edit === true" class="edit-modal-container flex column">
    <div class="edit-modal flex column">
      <div class="row flex justify-between">
        <div class="flex row">
          <div class="flex row edit-offer-modal q-pt-lg q-pl-md">
            EDIT OFFER
          </div>
          <div class="flex row edit-offer-name q-pl-md">
            The full name of the wine is here and here and here
          </div>
        </div>
        <div class="q-pr-md q-pt-lg cursor-pointer">
          <q-img
            src="../../../assets/close.png"
            class="ethereum-image"
            @click="edit = !edit"
          />
        </div>
      </div>
      <div class="flex row items-center justify-start q-pl-md q-pt-lg">
        <div class="flex row justify-between">
          <div class="modal-image-wrapper">
            <q-img src="../../../assets/nft1.png" class="modal-image" />
          </div>
          <!-- <div class="modal-timer">04:59</div> -->
        </div>
        <div class="flex column q-pl-lg">
          <div class="column">
            <div class="highest-offer-title">Highest offer</div>
            <div class="row items-center q-pt-sm">
              <q-img src="../../../assets/ethereum.png" width="25px" />
              <div class="highest-offer-price1">00.00</div>
            </div>
          </div>
          <div class="column q-pt-md">
            <div class="highest-offer-title">Fee</div>
            <div class="modal-fee-percentage q-pt-sm">00.00 %</div>
          </div>
          <div class="column q-pt-md">
            <div class="your-price-text">Your Price</div>
            <input type="number" class="input q-pt-sm" />
          </div>
          <div class="column q-pt-lg">
            <div class="highest-offer-title">Total</div>
            <div class="row items-center q-pt-sm">
              <q-img src="../../../assets/ethereum.png" width="25px" />
              <div class="modal-total-price1">00.00</div>
            </div>
          </div>
          <div class="flex row items-center q-pt-lg">
            <input type="checkbox" />
            <div class="terms-wrapper q-pl-sm">
              I agree with <label class="terms">Terms and Conditions</label>
            </div>
          </div>
        </div>
        <div class="modal-buttons-wrapper">
          <div class="flex row justify-between q-pt-lg modal-buttons">
            <div>
              <button class="no-border reset-button">
                <div class="reset-button-text">Reset</div>
              </button>
            </div>
            <div>
              <button class="no-border update-offer-button">
                <div class="update-offer-text">Update offer</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },
});
</script>

<style></style>
