<template>
  <div class="flex-block column justify-center items-center">
    <div class="trending-wines-title">Trending Wines</div>
    <div class="q-pa-lg table">
      <q-table
        :rows="rows"
        :columns="columns"
        virtual-scroll
        row-key="index"
        @virtual-scroll="onScroll"
        :loading="loading"
        v-model:pagination="pagination"
        hide-bottom
        v-model="separator"
        :separator="separator"
        :class="columns[0].class"
        :style="isDown === true ? 'color: red' : 'color: green'"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue-demi';
import '../../../css/Homepage/TrendingWines.css';
export default defineComponent({
  name: 'TrendingWines',
  data() {
    return {
      columns,
      rows,
      pagination: ref({
        rowsPerPage: 0,
      }),
      separator: ref('none'),
      isDown: false,
    };
  },
  methods: {
    // onScroll({ to, ref }) {
    //   const lastIndex = rows.value.length - 1;
    //   if (
    //     loading.value !== true &&
    //     nextPage.value < lastPage &&
    //     to === lastIndex
    //   ) {
    //     loading.value = true;
    //     setTimeout(() => {
    //       nextPage.value++;
    //       nextTick(() => {
    //         ref.refresh();
    //         loading.value = false;
    //       });
    //     }, 500);
    //   }
    // },
  },
});

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Wine Name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    class: 'columns',
  },
  {
    name: '24h',
    align: 'center',
    label: '24h',
    field: 'twentyFour',
  },
  { name: '3mos', label: '3mos', field: 'threeMos' },
  { name: '6mos', label: '6mos', field: 'sixMos' },
  { name: 'Price', label: 'Price', field: 'price' },
];

const rows = [
  {
    name: 'Sauvignon',
    twentyFour: '1%',
    threeMos: '14%',
    sixMos: '39%',
    price: 1505,
    class: 'rows',
  },
  {
    name: 'Vranac',
    twentyFour: '1%',
    threeMos: '14%',
    sixMos: '39%',
    price: 1505,
  },
  {
    name: 'Pro Corde',
    twentyFour: '1%',
    threeMos: '14%',
    sixMos: '39%',
    price: 1505,
  },
  {
    name: 'Rose',
    twentyFour: '1%',
    threeMos: '14%',
    sixMos: '39%',
    price: 1505,
  },
  {
    name: 'Moje Vino',
    twentyFour: '1%',
    threeMos: '14%',
    sixMos: '39%',
    price: 1505,
  },
  {
    name: 'Sjekloca',
    twentyFour: '1%',
    threeMos: '14%',
    sixMos: '39%',
    price: 1505,
  },
];
</script>

<style></style>
