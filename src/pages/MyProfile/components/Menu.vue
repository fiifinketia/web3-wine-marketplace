<template>
  <div class="flex justify-center desktop-tabs">
    <q-tabs no-caps class="text-black tabs">
      <q-route-tab to="/my-profile" name="Listing" label="Listing" />
      <q-route-tab
        to="/my-profile/incoming-offers"
        name="Incoming Offers"
        label="Incoming Offers"
      />
      <q-route-tab
        to="/my-profile/outgoing-offers"
        name="Outgoing offers"
        label="Outgoing offers"
      />
      <q-route-tab name="Trading History" label="Trading History" />
    </q-tabs>
  </div>
  <div class="flex row justify-between items-center mobile-tabs">
    <div class="q-pl-lg offer-mobile-text">
      Offer <label class="mobile-nft-number q-pl-sm">283</label>
    </div>
    <div>
      <div class="q-pa-md">
        <q-btn-dropdown label="Incoming offers" no-caps>
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Listing</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Outgoing</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>History</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi';
import '../../../css/MyProfile/Menu.css';
export default defineComponent({
  name: 'MyProfileMenu',
});
</script>

<style>
.q-tab {
  font-family: 'Obviously';
  font-style: normal;
  font-weight: 450;
  font-size: 18px;
  line-height: 28px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  color: #9d9d9d;
  width: 25%;
}

.q-tabs {
  width: 95%;
}

.q-tab__indicator {
  background: #3586ff;
}

.q-tab--active .q-tab__label {
  color: #3586ff;
}
</style>
