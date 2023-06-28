<template>
  <q-infinite-scroll class="column q-gutter-y-sm" @load="onLoad" :offset="250">
    <div
      v-for="notif in notifications"
      :key="notif.id"
      class="column full-width no-wrap q-pa-sm notif-container"
    >
      <div id="notif_details" class="row justify-between no-wrap q-pb-sm">
        <q-icon :name="`${GetNotificationIcon(notif.code)}`" size="40px" />
        <div v-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.LISTING_CREATED_PENDING">
          <span>
            Your listing of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is on its way!
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.LISTING_CREATED_CANCELLED">
          <span>
            You have cancelled your listing of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }}. </span>
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.LISTING_CREATED_COMPLETED">
          <span>
            Your listing of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is live!
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.LISTING_CREATED_ERROR">
          <span>
            There was a problem with your listing of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span>.
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_CREATED_PENDING">
          <span>
            Your offer of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is on its way!
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_CREATED_CANCELLED">
          <span>
            You have cancelled your offer of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span>.
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_CREATED_COMPLETED">
          <span>
            Your offer of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is live!
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_CREATED_ERROR">
          <span>
            There was a problem with your offer of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span>.
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_RECEIVED">
          <span>
            You have received an offer of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span>!
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.LISTING_PURCHASED_OLD_OWNER">
          <span>
            Your listing for <span> {{ notif.brand }} </span> has been successfully purchased!
            You have received <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>.
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.LISTING_PURCHASED_NEW_OWNER">
          <span>
            You have successfully purchased <span> {{ notif.brand }} </span>
            for <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>.
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.LISTING_PURCHASED_ERROR">
          <span>
            There was a problem with your purchase for <span> {{ notif.brand }} </span>
            of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>.
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_ACCEPTED_NEW_OWNER">
          <span>
            Your offer of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> has been successfully accepted!
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_ACCEPTED_OLD_OWNER">
          <span>
            You have successfully accepted an offer for <span> {{ notif.brand }} </span>.
            You have received <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>.
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_ACCEPTED_ERROR">
          <span>
            There was a problem with the offer for <span> {{ notif.brand }} </span>
            of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            that you accepted.
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_LISTING_PENDING">
          <span>
            Your listing of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is currently being cancelled!
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_LISTING_CANCELLED">
          <span>
            You have cancelled your ongoing wine unlisting for <span> {{ notif.brand }} </span>
            of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>.
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_LISTING_COMPLETED">
          <span>
            Your listing of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is removed from the marketplace!
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_LISTING_ERROR">
          <span>
            There was a problem with removing your listing of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span>.
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_OFFER_PENDING">
          <span>
            Your offer of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is currently being cancelled!
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_OFFER_CANCELLED">
          <span>
            You have cancelled your ongoing wine offer withdrawal for <span> {{ notif.brand }} </span>
            of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>.
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_OFFER_COMPLETED">
          <span>
            Your offer of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is removed from the marketplace!
          </span>
        </div>
        <div v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_OFFER_ERROR">
          <span>
            There was a problem with withdrawing your wine offer of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span>.
          </span>
        </div>
      </div>
      <div class="row justify-between no-wrap">
        <span class="notif-time">
          {{ ConvertTimestampToString(notif.dateCreated) }}
        </span>
        <a :href="notif.link">Open Link</a>
      </div>
    </div>
    <template #loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script lang="ts">
import { mapState } from 'pinia';
import { GetCurrencyLabel } from 'src/shared/currency.helper';
import { NOTIFICATION_CODES, TXN_STATUS, NotificationSettingCodeEnum } from 'src/shared/models/entities/notifications.model';
import { useNotificationsStore } from 'src/stores/notifications-store';
import { defineComponent } from 'vue';
import 'src/css/MainLayout/NotificationsDialog.css';
import { ConvertTimestampToString } from 'src/shared/date.helper';

export default defineComponent({
  data() {
    return {
      NotificationSettingCodeEnum,
      GetCurrencyLabel,
      ConvertTimestampToString
    }
  },
  computed: {
    ...mapState(useNotificationsStore, {
      notifications: store => store.notifications
    })
  },
  methods: {
    GetNotificationIcon(code: NOTIFICATION_CODES) {
      switch (code) {
        case NOTIFICATION_CODES.LISTING_CREATED:
          return 'app:listing-notif';
        case NOTIFICATION_CODES.OFFER_CREATED:
          return 'app:offer-notif';
        case NOTIFICATION_CODES.LISTING_REMOVED:
          return 'app:unlist-notif';
        case NOTIFICATION_CODES.OFFER_REMOVED:
          return 'app:revoke-offer-notif';
        case NOTIFICATION_CODES.OFFER_RECEIVED:
          return 'app:receive-offer-notif';
        case NOTIFICATION_CODES.OFFER_OUTBID:
          return 'app:offer-notif';
        case NOTIFICATION_CODES.OFFER_ACCEPTED_NEW_OWNER:
          return 'app:receive-nft-notif';
        case NOTIFICATION_CODES.OFFER_ACCEPTED_OLD_OWNER:
          return 'app:offer-accepted-notif';
        case NOTIFICATION_CODES.LISTING_PURCHASED_NEW_OWNER:
          return 'app:receive-nft-notif';
        case NOTIFICATION_CODES.LISTING_PURCHASED_OLD_OWNER:
          return 'app:listing-purchased-notif';
      }
    },
    GetTransactionType(code: NOTIFICATION_CODES, status: TXN_STATUS) {
      return `${code}:${status}`;
    },
    GetLinkName(code: NOTIFICATION_CODES) {
      switch (code) {
        case NOTIFICATION_CODES.LISTING_CREATED:
          'View NFT'
      }
    }
  }
})
</script>

<style>

</style>