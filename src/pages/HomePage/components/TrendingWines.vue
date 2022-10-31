<template>
  <div>
    <div class="flex column justify-center items-center">
      <div class="trending-wines-title q-pb-lg">Trending Wines</div>
      <table class="table q-pt-sm">
        <thead>
          <tr>
            <th class="flex items-start q-pl-md">Wine name</th>
            <th class="twentyFour q-pl-md q-pb-sm trending-titles">24hrs</th>
            <th class="three-mos q-pl-md q-pb-sm trending-titles">3mos</th>
            <th class="q-pl-md q-pb-sm trending-titles">6mos</th>
            <th class="trending-wines-price q-pl-md q-pb-sm trending-titles">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="justify-start q-pl-md">
              <div class="wine-name-label">The full wine name here</div>
            </td>
            <td>
              <div class="flex justify-center row items-center">
                <q-img src="../../../assets/up.png" width="20px" />
                <div :class="positive === true ? 'positive' : 'negative'">
                  0,67
                </div>
              </div>
            </td>
            <td class="twentyFour">
              <div class="flex justify-center items-center">
                <q-img src="../../../assets/up.png" width="20px" />
                <div :class="positive === true ? 'positive' : 'negative'">
                  0,67
                </div>
              </div>
            </td>
            <td class="three-mos">
              <div class="flex justify-center items-center">
                <q-img src="../../../assets/up.png" width="20px" />
                <div :class="positive === true ? 'positive' : 'negative'">
                  0,67
                </div>
              </div>
            </td>
            <td class="trending-wines-price">
              <div class="flex justify-center">
                <div class="flex row items-center q-pt-sm">
                  <q-img
                    src="../../../assets/usdc.png"
                    width="20px"
                    height="20px"
                  />
                  <div class="q-pl-sm currency">00.00</div>
                  <div class="price10 q-pl-sm">/ $ 00.00</div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="justify-start q-pl-md">
              <div class="wine-name-label">The full wine name here</div>
            </td>
            <td>
              <div class="flex justify-center row items-center">
                <q-img src="../../../assets/up.png" width="20px" />
                <div :class="positive === true ? 'positive' : 'negative'">
                  0,67
                </div>
              </div>
            </td>
            <td class="twentyFour">
              <div class="flex justify-center items-center">
                <q-img src="../../../assets/up.png" width="20px" />
                <div :class="positive === true ? 'positive' : 'negative'">
                  0,67
                </div>
              </div>
            </td>
            <td class="three-mos">
              <div class="flex justify-center items-center">
                <q-img src="../../../assets/up.png" width="20px" />
                <div :class="positive === true ? 'positive' : 'negative'">
                  0,67
                </div>
              </div>
            </td>
            <td class="trending-wines-price">
              <div class="flex justify-center">
                <div class="flex row items-center q-pt-sm">
                  <q-img
                    src="../../../assets/usdc.png"
                    width="20px"
                    height="20px"
                  />
                  <div class="q-pl-sm currency">00.00</div>
                  <div class="price10 q-pl-sm">/ $ 00.00</div>
                </div>
              </div>
            </td>
          </tr>
          <td class="justify-start q-pl-md">
            <div class="wine-name-label">The full wine name here</div>
          </td>
          <td>
            <div class="flex justify-center row items-center">
              <q-img src="../../../assets/up.png" width="20px" />
              <div :class="positive === true ? 'positive' : 'negative'">
                0,67
              </div>
            </div>
          </td>
          <td class="twentyFour">
            <div class="flex justify-center items-center">
              <q-img src="../../../assets/up.png" width="20px" />
              <div :class="positive === true ? 'positive' : 'negative'">
                0,67
              </div>
            </div>
          </td>
          <td class="three-mos">
            <div class="flex justify-center items-center">
              <q-img src="../../../assets/up.png" width="20px" />
              <div :class="positive === true ? 'positive' : 'negative'">
                0,67
              </div>
            </div>
          </td>
          <td class="trending-wines-price">
            <div class="flex justify-center">
              <div class="flex row items-center q-pt-sm">
                <q-img
                  src="../../../assets/usdc.png"
                  width="20px"
                  height="20px"
                />
                <div class="q-pl-sm currency">00.00</div>
                <div class="price10 q-pl-sm">/ $ 00.00</div>
              </div>
            </div>
          </td>
          <tr>
            <td class="justify-start q-pl-md">
              <div class="wine-name-label">The full wine name here</div>
            </td>
            <td>
              <div class="flex justify-center row items-center">
                <q-img src="../../../assets/up.png" width="20px" />
                <div :class="positive === true ? 'positive' : 'negative'">
                  0,67
                </div>
              </div>
            </td>
            <td class="twentyFour">
              <div class="flex justify-center items-center">
                <q-img src="../../../assets/up.png" width="20px" />
                <div :class="positive === true ? 'positive' : 'negative'">
                  0,67
                </div>
              </div>
            </td>
            <td class="three-mos">
              <div class="flex justify-center items-center">
                <q-img src="../../../assets/up.png" width="20px" />
                <div :class="positive === true ? 'positive' : 'negative'">
                  0,67
                </div>
              </div>
            </td>
            <td class="trending-wines-price">
              <div class="flex justify-center">
                <div class="flex row items-center q-pt-sm">
                  <q-img
                    src="../../../assets/usdc.png"
                    width="20px"
                    height="20px"
                  />
                  <div class="q-pl-sm currency">00.00</div>
                  <div class="price10 q-pl-sm">/ $ 00.00</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="q-pt-md">
        <button class="see-market-button">
          <div class="see-market-button-text">See market statistics</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { remove } from '@vue/shared';
import { defineComponent, ref } from 'vue-demi';
import '../../../css/Homepage/TrendingWines.css';
export default defineComponent({
  name: 'TrendingWines',
  data() {
    return {
      items: [
        {
          name: 'Vranac',
          twenty: 0.5,
          three: 5,
          six: 0.5,
          price: 23235,
        },
        {
          name: 'Vranac',
          twenty: 0.5,
          three: 5,
          six: 0.5,
          price: 23235,
        },
        {
          name: 'Vranac',
          twenty: 0.5,
          three: 5,
          six: 0.5,
          price: 23235,
        },
        {
          name: 'Vranac',
          twenty: 0.5,
          three: 5,
          six: 0.5,
          price: 23235,
        },
        {
          name: 'Vranac',
          twenty: 0.5,
          three: 5,
          six: 0.5,
          price: 23235,
        },
        {
          name: 'Vranac',
          twenty: 0.5,
          three: 5,
          six: 0.5,
          price: 23235,
        },
        {
          name: 'Vranac',
          twenty: 0.5,
          three: 5,
          six: 0.5,
          price: 23235,
        },
      ],
    };
  },
  data() {
    return {
      positive: true,
    };
  },
});
</script>

<style></style>
