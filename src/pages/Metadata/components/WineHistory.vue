<template>
  <div class="column items-center justify-center">
    <div class="flex items-start history-container column q-mb-xl">
      <div class="price-history q-pb-lg">Price history</div>
      <div v-if="isError" class="column items-center chart-container" :class="$q.screen.width > 600 ? 'q-pa-lg' : ''">
        <span class="error-header"> Ooops </span>
        <span class="error-subheader q-py-lg"> The price history is not available at the moment. </span>
        <span class="error-subheader q-pb-md"> Let's try to load again. </span>
        <q-btn
          dense
          flat
          unelevated
          :ripple="false"
          no-caps
          class="error-btn"
          @click="TryAgain()"
        >
          Try Again
        </q-btn>
      </div>
      <div
        v-else
        class="column chart-container"
        :class="$q.screen.width > 600 ? 'q-pa-lg' : ''"
      >
        <div class="row items-center justify-between chart1">
          <div v-if="$q.screen.width > 600" class="row items-center q-mb-sm q-gutter-x-sm">
            <q-radio
              v-model="currentTimeline"
              :disable="isLoading || isChartEmpty ? true : false"
              keep-color
              :color="isLoading || isChartEmpty ? 'blue-2' : ''"
              val="three_months"
              :class="isLoading || isChartEmpty ? 'chart-timeline-options-disabled' : 'chart-timeline-options'"
            >
              3 mos.
            </q-radio>
            <q-radio
              v-model="currentTimeline"
              :disable="isLoading || isChartEmpty ? true : false"
              keep-color
              :color="isLoading || isChartEmpty ? 'blue-2' : ''"
              val="six_months"
              :class="isLoading || isChartEmpty ? 'chart-timeline-options-disabled' : 'chart-timeline-options'"
            >
              6 mos.
            </q-radio>
            <q-radio
              v-model="currentTimeline"
              :disable="isLoading || isChartEmpty ? true : false"
              keep-color
              :color="isLoading || isChartEmpty ? 'blue-2' : ''"
              val="one_year"
              :class="isLoading || isChartEmpty ? 'chart-timeline-options-disabled' : 'chart-timeline-options'"
            >
              1 yr.
            </q-radio>
            <q-radio
              v-model="currentTimeline"
              :disable="isLoading || isChartEmpty ? true : false"
              keep-color
              :color="isLoading || isChartEmpty ? 'blue-2' : ''"
              val="five_years"
              :class="isLoading || isChartEmpty ? 'chart-timeline-options-disabled' : 'chart-timeline-options'"
            >
              5 yrs.
            </q-radio>
          </div>
          <div
            :class="$q.screen.width > 600
              ? 'column'
              : !isChartEmpty ? 'row items-center full-width justify-between q-mb-sm' : 'row items-center full-width justify-end q-mb-sm'
            ">
            <span v-if="!isChartEmpty" class="average-price">Average price</span>
            <div class="row items-center justify-end q-gutter-x-xs">
              <span v-if="!isLoading && !isChartEmpty" class="chart-avg-price">{{ averagePrice }}</span>
              <div v-else-if="!!isLoading" class="loading-price-box" />
              <q-select
                v-model="chartCurrency"
                :options="filteredCurrencyOptions"
                dense
                borderless
                popup-content-class="currency-dropdown"
                behavior="menu"
                class="q-pl-sm"
              >
                <template #selected>
                  <div
                    v-if="chartCurrency"
                    dense
                    square
                    color="white"
                    text-color="primary"
                    class="q-ma-none"
                  >
                    <div v-if="chartCurrency.value == 'WIVA'" class="row items-center">
                      <q-icon :name="chartCurrency.icon" size="20px"/>
                      <span class="currency-label q-ml-xs"> {{ chartCurrency.label }} </span>
                    </div>
                    <div v-else class="column">
                      <div class="row items-center">
                        <q-icon :name="chartCurrency.icon[0]" size="20px"/>
                        <span class="currency-label q-ml-xs"> {{ chartCurrency.label[0] }} </span>
                      </div>
                      <div class="row items-center">
                        <q-icon :name="chartCurrency.icon[1]" size="20px"/>
                        <span class="currency-label q-ml-xs"> {{ chartCurrency.label[1] }} </span>
                      </div>
                    </div>
                  </div>
                </template>
                <template #option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    dense
                    class="chart-currency-option q-px-sm row items-center"
                  >
                    <div v-if="chartCurrency.value != 'WIVA'" class="row items-center">
                      <q-icon :name="scope.opt.icon" size="20px"/>
                      <span class="currency-label q-ml-xs"> {{ scope.opt.label }} </span>
                    </div>
                    <div v-else class="column q-py-sm">
                      <div class="row items-center">
                        <q-icon :name="scope.opt.icon[0]" size="20px"/>
                        <span class="currency-label q-ml-xs"> {{ scope.opt.label[0] }} </span>
                      </div>
                      <div class="row items-center">
                        <q-icon :name="scope.opt.icon[1]" size="20px"/>
                        <span class="currency-label q-ml-xs"> {{ scope.opt.label[1] }} </span>
                      </div>
                    </div>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
        </div>
        <div class="real-chart">
          <div v-if="isLoading" class="full-width">
            <div v-for="(loading, index) in [0,1,2,3]" :key="loading" class="row full-width q-pb-md">
              <div class="loading-label-box" />
              <div class="loading-x-axis">
                <div v-if="index == 3">
                  <div
                    v-for="tick in ReturnLoadingTicks($q.screen.width)"
                    :key="tick"
                    class="tick"
                    :style="{ left: tick + '%' }"
                  />
                </div>
              </div>
            </div>
            <div class="row full-width">
              <div class="loading-label-box-inv" />
              <div class="row" style="margin-left: 15px; flex: 1; position: relative">
                <div
                  v-for="loading in ReturnLoadingTicks($q.screen.width)"
                  :key="loading"
                  class="loading-label-box"
                  :style="{ left: 'calc(' + loading + '% - 30px)' }"
                  style="position: absolute"
                />
              </div>
            </div>
          </div>
          <div v-else-if="isChartEmpty" class="column items-center">
            <img src="../../../assets/analytics.svg" class="q-pb-lg"/>
            <span class="metadata-missing-text"> This wine has no price history yet. </span>
          </div>
          <apexchart
            v-else
            id="chart"
            ref="chart"
            :options="chartOptions"
            :series="series"
            height="250"
            width="100%"
          />
        </div>
        <div v-if="$q.screen.width <= 600" class="row items-center q-mb-sm q-gutter-x-sm">
          <q-radio
            v-model="currentTimeline"
            :disable="isLoading || isChartEmpty ? true : false"
            keep-color
            :color="isLoading || isChartEmpty ? 'blue-2' : ''"
            val="three_months"
            :class="isLoading || isChartEmpty ? 'chart-timeline-options-disabled' : 'chart-timeline-options'"
          >
            3 mos.
          </q-radio>
          <q-radio
            v-model="currentTimeline"
            :disable="isLoading || isChartEmpty ? true : false"
            keep-color
            :color="isLoading || isChartEmpty ? 'blue-2' : ''"
            val="six_months"
            :class="isLoading || isChartEmpty ? 'chart-timeline-options-disabled' : 'chart-timeline-options'"
          >
            6 mos.
          </q-radio>
          <q-radio
            v-model="currentTimeline"
            :disable="isLoading || isChartEmpty ? true : false"
            keep-color
            :color="isLoading || isChartEmpty ? 'blue-2' : ''"
            val="one_year"
            :class="isLoading || isChartEmpty ? 'chart-timeline-options-disabled' : 'chart-timeline-options'"
          >
            1 yr.
          </q-radio>
          <q-radio
            v-model="currentTimeline"
            :disable="isLoading || isChartEmpty ? true : false"
            keep-color
            :color="isLoading || isChartEmpty ? 'blue-2' : ''"
            val="five_years"
            :class="isLoading || isChartEmpty ? 'chart-timeline-options-disabled' : 'chart-timeline-options'"
          >
            5 yrs.
          </q-radio>
        </div>
      </div>
    </div>
    <div class="flex items-start history-container column">
      <div class="price-history q-pb-lg">Transaction history</div>
      <div
        v-if="isError"
        class="column items-center chart-container"
        :class="$q.screen.width > 600 ? 'q-pa-lg' : ''"
      >
        <span class="error-header"> Ooops </span>
        <span class="error-subheader q-py-lg"> The transaction history is not available at the moment. </span>
        <img src="../../../assets/notebook.svg"/>
        <span class="error-subheader q-py-md"> Let's try to load again. </span>
        <q-btn
          dense
          flat
          unelevated
          :ripple="false"
          no-caps
          class="error-btn"
          @click="TryAgain()"
        >
          Try Again
        </q-btn>
      </div>
      <div
        v-else-if="!isTxnsEmpty"
        :class="$q.screen.width > 600 ? 'price-table q-px-md q-pt-md' : ''"
        :style="isLoading ? 'padding-bottom: 16px; width: 100%' : ''"
      >
        <q-table
          v-if="!isLoading"
          style="height: auto; width: 100%; max-height: 80vh"
          title=""
          flat
          hide-header
          :rows="nftTxnHistory"
          :columns="[
            {
              name: 'Transactions',
              required: false,
              label: '',
              align: 'left',
              field: row => row,
            },
          ]"
          row-key="index"
        >
          <template #body="props">
            <q-tr
              :key="`e_${props.row.index}`"
              :props="props"
              no-hover
              class="each-price-row price-history-rows"
            >
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                colspan="100%"
              >
                <div class="row">
                  <div
                    class="col-10 text-left"
                    style="word-wrap: break-word; white-space: initial"
                  >
                    <span class="user-ids-bold">{{ col.value.event }}</span> by
                    <span class="user-ids-bold">{{ col.value.from }}</span>
                    <span v-if="col.value.to"> to </span>
                    <span v-if="col.value.to" class="user-ids-bold">{{
                      col.value.to
                    }}</span>
                  </div>
                  <div class="col-2 text-right date-of-transaction">
                    {{ TimestampToDate(col.value.timestamp) }}
                  </div>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <div v-else class="full-width column">
          <div
            v-for="loading in [0,1,2,3,4]"
            :key="loading"
            class="row full-width justify-between items-center each-price-row price-history-rows"
          >
            <div :class="loading % 2 == 1 ? 'loading-event-box-colored' : 'loading-event-box-clear'"/>
            <div :class="loading % 2 == 1 ? 'loading-date-box-colored' : 'loading-date-box-clear'"/>
          </div>
        </div>
      </div>
      <div
        v-else
        class="column items-center chart-container"
        :class="$q.screen.width > 600 ? 'q-pa-lg' : ''"
      >
        <img src="../../../assets/notebook.svg" class="q-py-lg"/>
        <span class="metadata-missing-text"> This wine has no transaction history yet. </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, createApp, PropType, ref } from 'vue';
import ApexCharts, { ApexOptions } from 'apexcharts';
import '../../../css/Metadata/WineHistory.css';
import App from '../../../App.vue';
import VueApexCharts from 'vue3-apexcharts';
import { NFTHistoryDetails, SeaportTransactionsModel } from '../models/Metadata';
const app = createApp(App);
app.config.globalProperties.$apexcharts = ApexCharts;
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $apexcharts: typeof ApexCharts;
  }
}
export default defineComponent({
  name: 'WineHistory',
  components: { apexchart: VueApexCharts },
  props: {
    nftTxnHistory: {
      type: [Object] as PropType<SeaportTransactionsModel[]>,
      required: true,
    },
    nftChartDataSets: {
      type: Object as PropType<NFTHistoryDetails>,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    erroredOut: {
      type: Boolean,
      default: false
    },
  },
  emits: ['refetch-history'],

  data() {
    return {
      currentTimeline: '',
      chartOptions: {
        chart: {
          id: 'chart',
          background: 'transparent',
          toolbar: {
            show: false,
            tools: {
              download: false,
            },
          },
          zoom: {
            enabled: false
          }
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 1,
          position: 'bottom',
          axisBorder: {
            show: true,
            color: 'rgba(94, 151, 236, 0.27)',
            height: 1,
          },
          labels: {
            format: 'dd/MM/yy',
            show: true,
            overwriteCategories: false,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            minHeight: undefined,
            maxHeight: 120,
            datetimeUTC: true,
            style: {
              colors: '#212131',
              fontSize: '16px',
              fontFamily: 'Inter',
              fontWeight: 400,
              lineHeight: '19px',
              cssClass: 'apexcharts-xaxis-label',
            },
          },
        },
        markers: {
          size: 0,
          colors: '#3586FF',
          strokeColors: 'white',
          showNullDataPoints: true,
          hover: {
            size: 5,
            sizeOffset: 1,
          },
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          width: 3,
          dashArray: 0,
          colors: ['rgba(130, 0, 64, 1)']
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: '#212131',
              fontSize: '16px',
              fontFamily: 'Inter',
              fontWeight: 400,
              lineHeight: '19px',
              cssClass: 'apexcharts-xaxis-label',
            },
          },

          legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            floating: false,
            fontSize: '14px',
            fontFamily: 'Inter',
            fontWeight: 400,
            labels: {
              colors: 'white',
              useSeriesColors: false,
            },
            markers: {
              width: 0,
              height: 0,
              strokeWidth: 0,
              strokeColor: 'white',
              fillColors: 'transparent',
              radius: 12,
            },
            onItemClick: {
              toggleDataSeries: true,
            },
            onItemHover: {
              highlightDataSeries: true,
            },
          },
        },
        colors: ['#3586FF'],
        tooltip: {
          x: {
            format: 'dd/MM/yyyy',
            show: false
          },
          marker: {
            show: false
          }
        },
        selection: {
          enabled: false
        },
        pan: {
          enabled: false
        },
        zoom: {
          enabled: false
        },
        responsive: [{
          breakpoint: 600,
          options: {
            xaxis: {
              labels: {
                style: {
                  fontSize: '14px'
                }
              }
            },
            yaxis: {
              labels: {
                style: {
                  fontSize: '14px'
                }
              }
            },
          },
        }]
      } as ApexOptions,
      chartCurrency: ref(
        {
          label: 'WIVA',
          value: 'WIVA',
          icon: 'app:WIVA-icon'
        }
      ),
      currencyOptions: [
        {
          label: 'WIVA',
          value: 'WIVA',
          icon: 'app:WIVA-icon'
        },
        {
          label: ['USDC', 'USDT'],
          value: 'STABLE',
          icon: ['app:USDC-icon', 'app:USDT-icon']
        }
      ],
    };
  },
  computed: {
    series() {
      const currency = this.chartCurrency.value;
      return [
        {
          data: currency == 'WIVA' ? this.nftChartDataSets.wivaChart : this.nftChartDataSets.stableChart,
          name: 'Sold for'
        }
      ]
    },
    averagePrice() {
      const currency = this.chartCurrency.value;
      const temp = currency == 'WIVA' ? this.nftChartDataSets.wivaChart : this.nftChartDataSets.stableChart;
      if (temp.length > 0) {
        return (temp.reduce((acc, val) => acc + val[1], 0)/temp.length).toFixed(2)
      } else return '00.00'
    },
    isChartEmpty() {
      const currency = this.chartCurrency.value;
      const chartData = currency == 'WIVA' ? this.nftChartDataSets.wivaChart : this.nftChartDataSets.stableChart;
      if (this.isLoading || chartData.length > 0) {
        return false;
      }
      return true
    },
    isTxnsEmpty() {
      if (this.isLoading || this.nftTxnHistory.length > 0) {
        return false;
      }
      return true
    },
    isError() {
      return this.erroredOut
    },
    filteredCurrencyOptions() {
      return this.currencyOptions.filter((option) => option.value !== this.chartCurrency.value);
    },
  },
  watch: {
    currentTimeline: {
      handler(timeline: string) {
        if (!!timeline) {
          this.UpdateData(timeline)
        }
      }
    },
    chartCurrency: {
      handler() {
        this.UpdateColors()
      }
    },
    isChartEmpty: {
      handler(isEmpty: boolean) {
        if (isEmpty) {
          this.currentTimeline = '';
        }
      }
    }
  },
  methods: {
    TimestampToDate(timestamp: number) {
      const date = new Date(timestamp * 1000);
      return date.toDateString();
    },
    UpdateData(timeline: string) {
      const currency = this.chartCurrency.value;
      const chartData = currency == 'WIVA' ? this.nftChartDataSets.wivaChart : this.nftChartDataSets.stableChart;
      const lastDate = chartData[chartData.length - 1][0];
      let convertedLastDate = new Date(lastDate);
      let dateAsked = 0;
      switch (timeline) {
        case 'three_months':
          dateAsked = convertedLastDate.setMonth(convertedLastDate.getMonth() - 3);
          break;
        case 'six_months':
          dateAsked = convertedLastDate.setMonth(convertedLastDate.getMonth() - 6);
          break;
        case 'one_year':
          dateAsked = convertedLastDate.setMonth(convertedLastDate.getMonth() - 12);
          break;
        case 'five_years':
          dateAsked = convertedLastDate.setMonth(convertedLastDate.getMonth() - 60);
          break;
      }
      const chart = this.$refs.chart as ApexCharts;
      chart.zoomX(dateAsked, lastDate);
      chart.updateOptions({
        xaxis: {
          labels: {
            format: timeline.includes('months') ? 'MM/yy' : 'yyyy',
          },
        }
      })
    },
    ReturnLoadingTicks(width: number) {
      if (width > 600) {
        return [0, 30, 60, 90]
      }
      return [0, 40, 80]
    },
    TryAgain() {
      this.$emit('refetch-history')
    },
    UpdateColors() {
      const chart = this.$refs.chart as ApexCharts;
      if (!!chart) {
        const currency = this.chartCurrency.value;
        chart.updateOptions({
          stroke: {
            colors: currency != 'WIVA' ? ['rgba(53, 134, 255, 1)']  : ['rgba(130, 0, 64, 1)']
          }
        })
      }
    }
  },
});
</script>

<style scoped>
  .apexcharts-tooltip {
    background: #f3f3f3;
    color: orange;
  }
</style>
