<template>
  <div class="column justify-center items-center">
    <div class="trending-wines-title">Trending Wines</div>
    <div class="table column justify-center items-center">
      <div class="flex row first justify-between items-center">
        <div class="wine-name-container q-pa-md">
          <div class="wine-name">Wine name</div>
        </div>
        <div class="flex row justify-between wine-statistics-container">
          <div class="wine-name twentyFour-title">24 hrs</div>
          <div class="wine-name three-mos">3 mos</div>
          <div class="wine-name">6 mos</div>
          <div class="wine-name price-name">Price</div>
        </div>
      </div>
      <div class="wine-wrapper justify-center items-center">
        <div class="card q-pa-md flex row" v-for="item in items" :key="item.id">
          <div class="wine-name-container">
            <div class="name">{{ item.name }}</div>
          </div>
          <div class="flex row justify-between wine-statistics-wrapper">
            <div class="twentyFour">
              <div class="flex items-center row justify-center">
                <div class="q-pl-sm">5%</div>
                <div class="q-pl-sm">
                  <q-img
                    src="../../../assets/up.png"
                    width="14.5px"
                    height="7.5px"
                  />
                </div>
              </div>
            </div>
            <div class="three">
              <div class="flex items-center row justify-center">
                <div class="">5%</div>
                <div class="q-pl-sm">
                  <q-img
                    src="../../../assets/up.png"
                    width="14.5px"
                    height="7.5px"
                  />
                </div>
              </div>
            </div>
            <div class="six">
              <div class="flex items-center row justify-center">
                <div class="">5%</div>
                <div class="q-pl-sm">
                  <q-img
                    src="../../../assets/up.png"
                    width="14.5px"
                    height="7.5px"
                  />
                </div>
              </div>
            </div>
            <div class="price">
              <div class="flex row items-center justify-center">
                <q-img src="../../../assets/ethereum.png" width="20px" />
                <div class="price1">00.00</div>
                <div class="price2">/ $ 00.00</div>
              </div>
            </div>
          </div>
        </div>
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
});
</script>

<style></style>
