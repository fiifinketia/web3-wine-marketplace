<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import 'shepherd.js/dist/css/shepherd.css'

const customIcons: { [key: string]: string } = {
  'app:price': 'img:/icons/price_icon.svg',
  'app:filter': 'img:/icons/filter_icon.svg',
  'app:down_arrow': 'img:/icons/down_arrow.svg',
  'app:dropdown_arrow': 'img:/icons/dropdown_arrow.svg',
  'app:profile': 'img:/images/profile-icon.svg',
  'app:heart': 'img:/images/heart.svg',
  'app:search': 'img:/images/search.svg',
  'app:bell-icon': 'img:/images/bell-icon.svg',
  'app:USDC-icon': 'img:/currencies/USDC-icon.svg',
  'app:USDT-icon': 'img:/currencies/USDT-icon.svg',
  'app:WIVA-icon': 'img:/currencies/WIVA-icon.svg',
  'app:spinning-icon': 'img:/icons/spinning-icon.gif',
	'app:caution': 'img:/icons/caution-icon.svg',
	'app:edit': 'img:/icons/edit-icon.svg',
	'app:verify-user': 'img:/icons/verify-account-icon.svg',
	'app:verify-complete': 'img:/icons/verification-completed.svg',
	'app:verify-pending': 'img:/icons/verification-pending.svg',
	'app:verify-failed': 'img:/icons/verification-failed.svg',
	'app:request-call': 'img:/icons/request-call.svg',
	'app:chat-us': 'img:/icons/chat-us.svg',
	'app:email-us': 'img:/icons/email-us.svg',
	'app-rocket': 'img:/icons/rocket.svg',
	'app-shopping-bag': 'img:/icons/shopping-bag.svg',
	'app-lock': 'img:/icons/lock.svg',
	'app-person-avatar': 'img:/icons/person-avatar.svg',
	'app-seller-tag': 'img:/icons/seller-tag.svg',
	'app-barrel-top': 'img:/icons/barrel-top.svg',

  'app:listing-notif': 'img:/notification_icons/listing-notif.svg',
  'app:offer-notif': 'img:/notification_icons/offer-notif.svg',
  'app:unlist-notif': 'img:/notification_icons/unlist-notif.svg',
  'app:revoke-offer-notif': 'img:/notification_icons/revoke-offer-notif.svg',
  'app:receive-offer-notif': 'img:/notification_icons/receive-offer-notif.svg',
  'app:receive-nft-notif': 'img:/notification_icons/receive-nft-notif.svg',
  'app:offer-accepted-notif': 'img:/notification_icons/offer-accepted-notif.png',
  'app:listing-purchased-notif': 'img:/notification_icons/listing-purchased-notif.svg',
};
export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();

    $q.iconMapFn = iconName => {
      const icon = customIcons[iconName];
      if (icon !== void 0) {
        return { icon: icon };
      }
    };
  },
});
</script>
