<template>
  <q-dialog
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      class="q-pa-none"
      style="
        min-width: 70%;
        background-color: #ffffff;
        border-radius: 10px;
        max-width: 80%;
      "
    >
      <q-card-section class="row items-center q-pb-none">
        <div class="dialog-title">Edit Listing</div>
        <q-separator spaced="md" size="2px" inset vertical color="accent" />
        <div class="dialog-subtitle">{{ brand }}</div>
        <q-space />
        <q-btn 
          v-close-popup 
          icon="close" 
          flat 
          round 
          dense 
          @click="ResetData()"
        />
      </q-card-section>

      <q-card-section class="row justify-start">
        <div style="width: 55%; align-self: center">
          <q-img :src="image" width="95%" />
        </div>
        <div class="column justify-between q-my-xs q-gutter-y-md" style="width: 45%">
          <div class="column">
            <span class="dialog-label">Your price</span>
            <q-input
              v-model="listingPrice"
              outlined
              dense
              type="number"
              debounce="500"
              class="dialog-input-box"
            />
          </div>
          <div class="column">
            <span class="dialog-label"> Expiration date </span>
            <q-input
              v-model="listingExpirationDate"
              outlined
              dense
              type="date"
              debounce="500"
              class="dialog-date-box"
            />
          </div>
          <div class="column">
            <span class="dialog-label"> Fee </span>
            <span class="dialog-fee"> 2.5% </span>
          </div>
          <q-separator size="2px" color="accent" />
          <div class="column">
            <span class="dialog-label"> Total </span>
            <span class="dialog-total"> 
              {{ 
                !!listingPrice 
                  ? parseInt(listingPrice)
                  : '0.00'
              }} 
            </span>
          </div>
          <div class="row items-center">
            <img src="../../../assets/info-icon.svg" />
            <span class="dialog-info q-ml-sm"> After the expiration, the NFT will be removed from the <br> listing and will be available for listing in DWC. </span>
          </div>
          <q-checkbox v-model="acceptTerms">
            <span class="dialog-terms-conditions"> I agree with the Terms and Conditions </span>
          </q-checkbox>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="row q-mb-sm q-mx-sm">
        <q-btn
          class="dialog-reset"
          no-caps
          outline
          style="color: #3586FF;"
          @click="ResetData()"
        >
          <span> Reset </span>
        </q-btn>
        <q-btn
          class="dialog-confirm"
          no-caps
          flat
          :disable="
            !acceptTerms ||
            listingExpirationDate === '' ||
            listingPrice <= 0 ||
            loadingOffer
          "
          @click="CreateNewOrder()"
        >
          Update
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script lang="ts">
import 'src/css/Profile/Component/dialog.css'
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    orderHash: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    smartContractAddress: {
      type: String,
      required: true
    },
    network: {
      type: String,
      required: true
    },
    tokenID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      listingPrice: '',
      listingExpirationDate: '',
      fee: '',
      acceptTerms: false,
    }
  },
  methods: {
    CancelOrder(orderHash: string) {
      console.log('there')
    },
    CreateNewOrder() {

      this.$emit('listing-edit-close')
    },
    ResetData() {
      this.listingPrice = '';
      this.listingExpirationDate = '';
      this.acceptTerms = false;
    }
  }
})
</script>

<style>

</style>