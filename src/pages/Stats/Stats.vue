<template>
  <div class="flex justify-center items-center">
    <div class="stats-container flex column justify-center items-center">
      <div class="market-overview">Market overview</div>
      <div class="market-overview-desc flex column">
        <div class="market-overview-desc-text">
          The wine market is projected to register a CAGR of 4.28% during the
          forecast period (2022- 2027).
        </div>
        <div class="market-overview-desc-text q-pt-lg q-pb-lg">
          On the other hand, the current environment may allow the wine industry
          to recapture lost consumer attention. As per the analysis, the total
          wine volumes are up by Y-o-Y as more people purchase wine to enjoy
          with meals at home, majorly in European and North American countries.
          On the other hand, there is uncertainty if the current boost in the
          off-trade will continue after pantry loading depletes, the on-trade
          slowly reopens, and consumption behavior returns to pre-COVID-19
          levels
        </div>
        <q-img src="../../assets/farm.png" />
        <div class="market-overview-desc-text q-pt-lg">
          The wine market is likely to be driven by the increasing demand due to
          its health benefits and premiumization of wine products, coupled with
          innovation in flavor and more advanced distribution networks globally.
        </div>
        <div class="market-overview-desc-text q-pt-lg">
          Changing tastes and new preferences among consumers and increasing
          demand for new and exotic flavors, such as Riesling wine and other
          tropical fruit wines, are expected to fuel the growth of the wine
          market.
        </div>
      </div>
      <div class="flex column full-width q-pt-lg">
        <div class="price-history justify-start items-start q-pt-lg">
          Price History
        </div>
        <div class="q-pt-lg">
          <Chart />
        </div>
      </div>
      <div class="flex column q-pt-lg">
        <div class="market-overview">Growth opportunity</div>
        <div class="market-overview-desc-text">
          The wine market is a highly competitive market due to many global and
          domestic companies operating in various countries. The prominent
          companies in the market are E. & J. Gallo Winery, Constellation Brands
          Inc., and The Wine Group LLC.
        </div>
        <div class="q-pt-lg market-overview-desc-text">
          These companies have a significant share in the market due to their
          wide range of wine prices. As every region has several domestic
          players with robust distribution channels, global players seeking a
          higher market share prefer acquiring them. New product development is
          another strategy followed by companies, as product differentiation
          helps increase the consumer base.
        </div>
      </div>
      <div class="q-pt-lg flex column full-width">
        <div class="wine-region-return">Wine regions return</div>
        <PieChart />
      </div>
      <div class="flex column full-width q-pt-lg">
        <div class="flex row justify-between q-pb-md">
          <div class="top-five">Top 5 most sold wines</div>
          <div class="last-five-days">last 5 days</div>
        </div>
        <div class="top-five-container flex column">
          <div class="flex justify-center">
            <div class="top-five-wrapper">
              <div class="flex row justify-between top-five-header">
                <div class="wine-name-container">
                  <div>Wine name</div>
                </div>
                <div class="flex row justify-between region-price-container">
                  <div>Region</div>
                  <div>Price</div>
                </div>
              </div>
              <div class="">
                <q-card
                  class="no-shadow top-five-wine-container"
                  v-for="item in items"
                  :key="item.name"
                >
                  <div class="flex row justify-between q-pa-sm">
                    <div class="wine-name-container">
                      <div>The full wine name here</div>
                    </div>
                    <div
                      class="flex row justify-between region-price-container"
                    >
                      <div>Region</div>
                      <div>00.00</div>
                    </div>
                  </div>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi';
import '../../css/Stats/Stats.css';
import Chart from './components/Chart.vue';
import PieChart from './components/PieChart.vue';
export default defineComponent({
  name: 'StatsPage',
  components: { Chart, PieChart },
  data() {
    return {
      items: [
        {
          name: 'Vranac',
          region: 'Montenegro',
          price: 1111,
        },
        {
          name: 'Vranac',
          region: 'Montenegro',
          price: 1111,
        },
        {
          name: 'Vranac',
          region: 'Montenegro',
          price: 1111,
        },
        {
          name: 'Vranac',
          region: 'Montenegro',
          price: 1111,
        },
      ],
    };
  },
});
</script>

<style></style>
