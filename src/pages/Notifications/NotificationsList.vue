<template>
  <q-infinite-scroll class="column q-gutter-y-sm" @load="onLoad" :offset="250">
    <div
      v-for="notif in notifications"
      :id="notif.viewed ? 'viewed-notif' : 'unviewed-notif'"
      :key="notif._id"
      class="column full-width no-wrap q-pa-sm notif-container"
    >
      <div id="notif_details" class="row justify-start no-wrap q-pb-sm">
        <q-icon :name="`${GetNotificationIcon(notif.code)}`" size="40px" />
        <a
          v-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.LISTING_CREATED_PENDING"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            Your listing of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is on its way!
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.LISTING_CREATED_CANCELLED"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            You have cancelled your listing of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }}. </span>
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.LISTING_CREATED_COMPLETED"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            Your listing of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is live!
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.LISTING_CREATED_ERROR"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            There was a problem with your listing of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span>.
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_CREATED_PENDING"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            Your offer of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is on its way!
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_CREATED_CANCELLED"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            You have cancelled your offer of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span>.
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_CREATED_COMPLETED"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            Your offer of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is live!
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_CREATED_ERROR"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            There was a problem with your offer of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span>.
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_RECEIVED"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            You have received an offer of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span>!
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.LISTING_PURCHASED_OLD_OWNER"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            Your listing for <span> {{ notif.brand }} </span> has been successfully purchased!
            You have received <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>.
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.LISTING_PURCHASED_NEW_OWNER"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            You have successfully purchased <span> {{ notif.brand }} </span>
            for <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>.
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.LISTING_PURCHASED_ERROR"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            There was a problem with your purchase for <span> {{ notif.brand }} </span>
            of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>.
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_ACCEPTED_NEW_OWNER"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            Your offer of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> has been successfully accepted!
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_ACCEPTED_OLD_OWNER"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            You have successfully accepted an offer for <span> {{ notif.brand }} </span>.
            You have received <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>.
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.OFFER_ACCEPTED_ERROR"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            There was a problem with the offer for <span> {{ notif.brand }} </span>
            of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            that you accepted.
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_LISTING_PENDING"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            Your listing of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is currently being cancelled!
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_LISTING_CANCELLED"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            You have cancelled your ongoing wine unlisting for <span> {{ notif.brand }} </span>
            of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>.
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_LISTING_COMPLETED"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            Your listing of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is removed from the marketplace!
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_LISTING_ERROR"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            There was a problem with removing your listing of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span>.
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_OFFER_PENDING"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            Your offer of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is currently being cancelled!
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_OFFER_CANCELLED"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            You have cancelled your ongoing wine offer withdrawal for <span> {{ notif.brand }} </span>
            of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>.
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_OFFER_COMPLETED"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            Your offer of <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span> is removed from the marketplace!
          </span>
        </a>
        <a
          v-else-if="GetTransactionType(notif.code, notif.status) == NotificationSettingCodeEnum.REMOVE_OFFER_ERROR"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          <span>
            There was a problem with withdrawing your wine offer of
            <span id="price"> {{ ` ${notif.orderPrice} ${GetCurrencyLabel(notif.orderCurrency)} ` }} </span>
            for <span> {{ notif.brand }} </span>.
          </span>
        </a>
      </div>
      <div class="row justify-between no-wrap">
        <span class="notif-time">
          {{ ConvertTimestampToString(notif.dateCreated) }}
        </span>
        <a
          class="notif-link"
          :href="notif.link"
          @click="Viewed(notif._id, notif.viewed)"
        >
          {{GetLinkName(notif.code)}}
        </a>
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
    const notificationsStore = useNotificationsStore();
    return {
      NotificationSettingCodeEnum,
      GetCurrencyLabel,
      ConvertTimestampToString,
      notificationsStore
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
      if (
        code == NOTIFICATION_CODES.LISTING_CREATED ||
        code == NOTIFICATION_CODES.LISTING_REMOVED ||
        code == NOTIFICATION_CODES.OFFER_CREATED ||
        code == NOTIFICATION_CODES.OFFER_RECEIVED ||
        code == NOTIFICATION_CODES.OFFER_REMOVED ||
        code == NOTIFICATION_CODES.OFFER_OUTBID
      ) {
        return 'See NFT';
      } else if (
        code == NOTIFICATION_CODES.LISTING_PURCHASED_NEW_OWNER ||
        code == NOTIFICATION_CODES.LISTING_PURCHASED_OLD_OWNER ||
        code == NOTIFICATION_CODES.OFFER_ACCEPTED_NEW_OWNER ||
        code == NOTIFICATION_CODES.OFFER_ACCEPTED_OLD_OWNER
      ) {
        return 'See TXN'
      }
    },
    Viewed(notifID: string, isAlreadyViewed: boolean) {
      if (!isAlreadyViewed) {
        this.notificationsStore.updateNotificationAsViewed(notifID);
      }
    }
  }
})
</script>

<style>

</style>