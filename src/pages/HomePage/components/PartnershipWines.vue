<template>
  <div class="flex justify-center">
    <div class="flex row justify-between items-center partnership-container">
      <div class="flex column partnership-text-container">
        <div class="first-text">
          Want to try some tasty wines sourced directly from producers?
        </div>
        <div class="second-text">
          Enjoy our specially selected partnership wines are coming soon!
        </div>
      </div>
      <div class="q-card-container row q-gutter-lg">
        <q-card
          class="partnership-card-container column no-shadow"
          v-for="item in items"
          :key="item.name"
          :class="item.class"
        >
          <q-img
            src="../../../assets/circle.png"
            class="partnership-wines-image"
          />
          <div class="partnership-wine-name">The full name is in this row</div>
          <div class="q-pt-sm partnership-wine-desc">Sparkling water</div>
          <div class="q-pt-sm">
            <div class="flex column partnership-border q-pa-sm">
              <div class="partnership-wine-desc">Price</div>
              <div class="flex row justify-between">
                <div class="flex row q-pt-sm">
                  <q-img
                    src="../../../assets/usdc.png"
                    width="25px"
                    height="25px"
                  />
                  <div class="partnership-wine-price q-pl-sm">00.00</div>
                </div>
                <div>
                  <q-img src="../../../assets/trash.png" width="30px" />
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
          class: 'vranac',
        },
        {
          name: 'Sauvignon',
          price: 1111,
          class: 'vranac1',
        },
      ],
    };
  },
});
</script>

<style></style>
