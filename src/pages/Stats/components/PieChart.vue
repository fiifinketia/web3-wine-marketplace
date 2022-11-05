<template>
  <div class="pie-chart-width">
    <apexchart
      ref="chart"
      id="chart"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, createApp } from 'vue-demi';
import ApexCharts from 'apexcharts';
import App from '../../../App.vue';
import VueApexCharts from 'vue3-apexcharts';
const app = createApp(App);
app.config.globalProperties.$apexcharts = ApexCharts;
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $apexcharts: typeof ApexCharts;
  }
}
export default defineComponent({
  name: 'PieChart',
  components: { apexchart: VueApexCharts },
  data() {
    return {
      series: [44, 55, 41, 17, 15, 14, 21, 68],
      chartOptions: {
        chart: {
          type: 'donut',
        },
        labels: [
          'Region 1',
          'Region 2',
          'Region 3',
          'Region 4',
          'Region 5',
          'Region 6',
          'Region 7',
          'Region 8',
        ],
        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            donut: {
              size: '90%',
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                  label: 'Total Return Value',
                  fontSize: '18px',
                  fontFamily: 'Obviously',
                  fontWeight: 600,
                  color: '#212131',
                  formatter: function (w: any) {
                    return w.globals.seriesTotals.reduce((a: any, b: any) => {
                      return a + b;
                    }, 0);
                  },
                },
              },
            },
          },
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'round',
          // colors: ['#212131'],
          // width: 1,
          // dashArray: 0,
        },
        colors: [
          '#212131',
          '#3586FF',
          '#8CBAFF',
          '#DCE8FB',
          '#8EE7BC',
          '#FAB233',
          '#0CC361',
          'rgba(142, 231, 188, 0.3)',
        ],
        // legend: {
        //   offsetX: -100,
        // },
      },
    };
  },
});
</script>

<style>
.apexcharts-pie-area {
  background-color: red;
  border-radius: 8px;
}
.apexcharts-series,
.apexcharts-pie-series,
.apexcharts-slices {
  background-color: red;
  border-radius: 8px;
  color: red;
  width: 100px;
}
</style>
