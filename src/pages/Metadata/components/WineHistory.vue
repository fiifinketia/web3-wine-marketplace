<template>
  <div class="column items-center justify-center">
    <div class="flex items-start history-container column q-mb-xl">
      <div class="price-history q-pb-lg">Price history</div>
      <div
        class="column chart-container"
        :class="$q.screen.width > 600 ? 'q-pa-lg' : ''"
      >
        <div class="row items-center justify-between chart1">
          <div v-if="$q.screen.width > 600" class="row items-center q-mb-sm q-gutter-x-sm">
            <q-radio v-model="currentTimeline" val="three_months" class="chart-timeline-options"> 3 mos. </q-radio>
            <q-radio v-model="currentTimeline" val="six_months" class="chart-timeline-options"> 6 mos. </q-radio>
            <q-radio v-model="currentTimeline" val="one_year" class="chart-timeline-options"> 1 yr. </q-radio>
            <q-radio v-model="currentTimeline" val="five_years" class="chart-timeline-options"> 5 yrs. </q-radio>
          </div>
          <div :class="$q.screen.width > 600 ? 'column' : 'row reverse full-width justify-between'">
            <div class="row items-center">
              <span class="price1">00.00</span>
              <span class="price2 q-pl-sm">/ $ 00.00</span>
            </div>
            <span class="average-price">Average price</span>
          </div>
        </div>
        <div class="real-chart">
          <apexchart
            id="chart"
            ref="chart"
            :options="chartOptions"
            :series="series"
            height="250"
            width="100%"
          />
        </div>
        <div v-if="$q.screen.width <= 600" class="row items-center q-mb-sm q-gutter-x-sm">
          <q-radio v-model="currentTimeline" val="three_months" class="chart-timeline-options"> 3 months </q-radio>
          <q-radio v-model="currentTimeline" val="six_months" class="chart-timeline-options"> 6 months </q-radio>
          <q-radio v-model="currentTimeline" val="one_year" class="chart-timeline-options"> 1 year </q-radio>
          <q-radio v-model="currentTimeline" val="five_years" class="chart-timeline-options"> 5 years </q-radio>
        </div>
      </div>
    </div>
    <div class="flex items-start history-container column">
      <div class="price-history q-pb-lg">Transaction history</div>
      <q-table
        :class="$q.screen.width > 600 ? 'price-table' : ''"
        style="height: auto; width: 100%; max-height: 80vh"
        title=""
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
            class="each-price-row price-history-rows"
          >
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              colspan="100%"
            >
              <div class="row">
                <p
                  class="col-10 text-left"
                  style="word-wrap: break-word; white-space: initial"
                >
                  <span class="user-ids-bold">{{ col.value.event }}</span> by
                  <span class="user-ids-bold">{{ col.value.from }}</span>
                  <span v-if="col.value.to"> to </span>
                  <span v-if="col.value.to" class="user-ids-bold">{{
                    col.value.to
                  }}</span>
                </p>
                <p class="col-2 text-right date-of-transaction">
                  {{ TimestampToDate(col.value.timestamp) }}
                </p>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, createApp, PropType, ref } from 'vue';
import ApexCharts from 'apexcharts';
import '../../../css/Metadata/WineHistory.css';
import App from '../../../App.vue';
import VueApexCharts from 'vue3-apexcharts';
import { SeaportTransactionsModel } from '../models/Metadata';
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
  },

  data() {
    return {
      currentTimeline: '',
      pagination: ref({
        rowsPerPage: 10,
      }),
      three_months: 0,
      six_months: 0,
      one_year: 0,
      five_years: 0,
      selectedDate: 0,
      series: [
        {
          data: [
            [1327359600000, 30.95],
            [1327446000000, 31.34],
            [1327532400000, 31.18],
            [1327618800000, 31.05],
            [1327878000000, 31.0],
            [1327964400000, 30.95],
            [1328050800000, 31.24],
            [1328137200000, 31.29],
            [1328223600000, 31.85],
            [1328482800000, 31.86],
            [1328569200000, 32.28],
            [1328655600000, 32.1],
            [1328742000000, 32.65],
            [1328828400000, 32.21],
          ],
          name: 'Overall Value',
        },
      ],
      chartOptions: {
        chart: {
          id: 'chart',
          zoom: {
            autoScaleYaxis: true,
          },
          background: 'transparent',
          toolbar: {
            show: false,
            tools: {
              download: false,
            },
          },
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
        annotations: {
          yaxis: [
            {
              y: 0,
              borderColor: 'transparent',
              fillColor: '#cc3c7c',
            },
          ],
          xaxis: [
            {
              type: 'datetime',
              categories: [],
              x: [Number()],
              tickPlacement: 'on',
              borderColor: 'transparent',
            },
          ],
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
            format: 'dd/MM/yyyy',
            show: true,
            overwriteCategories: false,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            minHeight: undefined,
            maxHeight: 120,
            datetimeUTC: false,
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
          },
        },
      },
      selection: 'three_months',
    };
  },
  methods: {
    TimestampToDate(timestamp: number) {
      const date = new Date(timestamp * 1000);
      return date.toDateString();
    },
    UpdateData(timeline: string, isMobile: boolean) {
      this.selection = timeline;
      this.currentTimeline = timeline;
      let original = new Date(this.selectedDate);
      if (this.currentTimeline === 'three_months') {
        this.three_months = original.setMonth(original.getMonth() - 3);
      } else if (this.currentTimeline === 'six_months') {
        this.six_months = original.setMonth(original.getMonth() - 6);
      } else if (this.currentTimeline === 'one_year') {
        this.one_year = original.setMonth(original.getMonth() - 12);
      } else {
        this.five_years = original.setMonth(original.getMonth() - 60);
      }
      //TODO: Fix variables here
      const options = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.$refs.overallChart as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.$refs.overallChartMobile as any,
      ];
      let chosenOption;
      if (isMobile) {
        chosenOption = options[1];
      } else {
        chosenOption = options[0];
      }
      switch (timeline) {
        case 'three_months':
          chosenOption.zoomX(this.three_months, this.selectedDate);
          chosenOption.updateOptions({
            xaxis: {
              labels: {
                format: 'MM/yyyy',
              },
            },
            tooltip: {
              x: {
                format: 'MM/yyyy',
              },
            },
          });
          break;
        case 'six_months':
          chosenOption.zoomX(this.six_months, this.selectedDate);
          chosenOption.updateOptions({
            xaxis: {
              labels: {
                format: 'MM/yyyy',
              },
            },
            tooltip: {
              x: {
                format: 'MM/yyyy',
              },
            },
          });
          break;
        case 'one_year':
          chosenOption.zoomX(this.one_year, this.selectedDate);
          chosenOption.updateOptions({
            xaxis: {
              labels: {
                format: 'yyyy',
              },
            },
            tooltip: {
              x: {
                format: 'yyyy',
              },
            },
          });
          break;
        case 'five_years':
          chosenOption.zoomX(this.five_years, this.selectedDate);
          chosenOption.updateOptions({
            xaxis: {
              labels: {
                format: 'yyyy',
              },
            },
            tooltip: {
              x: {
                format: 'yyyy',
              },
            },
          });
          break;
        default:
      }
    },
  },
});
</script>

<style></style>
