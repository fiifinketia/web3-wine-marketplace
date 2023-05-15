<template>
  <q-dialog
    v-model="dialog"
    position="left"
    full-height
    persistent
    class="my-wallet-background help-center-dialog row justify-end"
  >
    <q-card class="q-pa-md" style="width: 100%">
      <q-card-section class="row justify-between no-wrap">
        <div class="col-8">
          <div
            class="font-proxima-bold font-weight-700 font-size-18 line-height-26 spacing-02 dark-blue-color"
          >
            HELP CENTER
          </div>
          <q-separator spaced="md" size="2px" vertical color="accent" />
        </div>
        <img
          class="x-icon col-auto q-pa-sm"
          src="../../../public/images/x-icon.svg"
          alt=""
          @click="$emit('close-help-center')"
        />
      </q-card-section>
      <q-card-section class="row justify-center no-wrap q-mt-lg">
        <div
          class="font-proxima-bold font-weight-700 font-size-20 line-height-24 spacing-02 text-primary"
        >
          How can we help you?
        </div>
      </q-card-section>
      <q-card-section class="column justify-center no-wrap q-mt-lg q-mx-auto">
        <div
          class="font-proxima-regular font-weight-400 font-size-18 line-height-22 spacing-02 text-center"
        >
          Search for a question or topic,or find relevant ones below.
        </div>
        <div class="row q-my-xs justify-center">
          <q-input
            v-model="search"
            outlined
            class="col-9 q-mr-xs"
            placeholder="Search"
            dense
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            color="primary"
            label="GO"
            class="col-auto q-py-xs"
            unelevated
          />
        </div>
      </q-card-section>
      <q-card-section class="row q-my-md justify-evenly q-gutter-sm">
        <q-card
          v-for="topic in faqs"
          :key="topic.icon + topic.title"
          class="col-md-3 col-xs-5 topic-card"
          flat
          bordered
        >
          <q-card-section class="q-ma-md">
            <div
              class="font-obviously-normal font-weight-400 font-size-18 line-height-26 spacing-02"
            >
              {{ topic.title }}
            </div>
          </q-card-section>
          <q-card-section class="q-ma-md">
            <div
              v-for="subtitle in topic.subtitles"
              :key="topic.title + subtitle"
              class="font-proxima-regular text-caption"
            >
              {{ subtitle }}
            </div>
          </q-card-section>
          <q-card-section class="row q-mx-md justify-end">
            <q-icon :name="topic.icon" color="primary" size="32px" />
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-section class="column justify-center">
        <div class="text-body text-center">Can't find your answer?</div>
        <div class="text-bold text-center">Ask our team!</div>
        <div class="row col-4 justify-center">
          <q-btn color="primary" label="Contact Support" no-caps unelevated />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import faqs from 'src/shared/faqs.json';

export default defineComponent({
  name: 'WalletDialog',
  emits: ['close-help-center', 'open-contact-us'],
  data() {
    return {
      search: ref(''),
      faqs,
    };
  },
});
</script>
<style>
.topic-card {
  background: rgba(255, 255, 255, 0.85);
  /* Primary/blue */
  border: none;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1) !important;
  border-radius: 14px;
  height: 168px !important;
}

.topic-card:hover {
  border: 1px solid #3586ff;
}

@media screen and (min-width: 800px) {
  .help-center-dialog .q-dialog__inner {
    min-width: 70vw !important;
  }
}
@media screen and (max-width: 799px) {
  .help-center-dialog .q-dialog__inner {
    min-width: 100vw !important;
  }
}
</style>
