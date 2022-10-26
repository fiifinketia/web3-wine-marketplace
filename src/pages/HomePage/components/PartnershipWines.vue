<template>
  <div class="flex items-center justify-center q-pt-lg">
    <div class="flex row justify-between partner-container items-center">
      <div class="flex column text-container">
        <div class="first-text">
          Want to try some tasty wines sourced directly from producers?
        </div>
        <div class="second-text">
          Enjoy our specially selected partnership wines are coming soon!
        </div>
      </div>
      <div class="flex row q-gutter-lg">
        <q-card
          class="flex column shadow-0 card-container"
          v-for="item in items"
          :key="item.name"
          :class="item.class"
        >
          <q-img src="../../../assets/circle.png" class="circle" />
          <div class="name q-pt-sm">The full name is in this row</div>
          <div class="description q-pt-sm">Sparkling water</div>
          <div class="q-pt-sm">
            <div class="flex column price-container q-pa-sm">
              <div class="price-title">Price</div>
              <div class="flex row items-center justify-between">
                <div class="flex row items-center">
                  <q-img
                    src="../../../assets/usdc.png"
                    width="18px"
                    height="18px"
                  />
                  <div class="price1 q-pl-sm">00.00</div>
                  <div class="price2 q-pl-sm">/$ 00.00</div>
                </div>
                <div>
                  <q-img
                    class="cursor-pointer trash"
                    src="../../../assets/trash.png"
                    width="30px"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi';
import '../../../css/Homepage/PartnershipWines.css';
export default defineComponent({
  name: 'PartnershipWines',
  data() {
    return {
      items: [
        {
          name: 'Vranac',
          price: 1111,
          class: 'first',
        },
        {
          name: 'Sauvignon',
          price: 1111,
          class: 'second',
        },
      ],
    };
  },
});
</script>

<style></style>
