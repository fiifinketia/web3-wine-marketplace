<template>
  <div class="column items-center q-gutter-y-xl">
    <img class="profile-empty" src="../../assets/no-orders.svg" />
    <span class="profile-loading-text">
      {{ emptyText }}
    </span>
    <q-btn
      v-if="emptyText.includes('listings')"
      dense
      unelevated
      flat
      no-caps
      :ripple="false"
      class="dialog-confirm"
      style="width: 142px"
      @click="OpenListableNFTContainer()"
    >
      List NFT
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'src/css/Profile/shared.css';
import 'src/css/Profile/Component/dialog.css';

export default defineComponent({
  props: {
    emptyText: {
      type: String,
      required: true,
    },
  },
  emits: ['open-listable-container'],
  methods: {
    OpenListableNFTContainer() {
      this.$emit('open-listable-container');
    }
  }
});
</script>

<style></style>
