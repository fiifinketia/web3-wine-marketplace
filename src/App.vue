<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

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
	'app:caution': 'img:/icons/caution-icon.svg',
	'app:verify-user': 'img:/icons/verify-account-icon.svg',
	'app:verify-complete': 'img:/icons/verification-completed.svg',
	'app:verify-pending': 'img:/icons/verification-pending.svg',
	'app:verify-failed': 'img:/icons/verification-failed.svg'
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
