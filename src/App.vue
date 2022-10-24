<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'

const customIcons: { [key: string]: string } = {
  'app:price': 'img:/icons/price_icon.svg',
}
export default defineComponent({
  name: 'App',
	setup () {
		const $q = useQuasar()

		$q.iconMapFn = (iconName) => {
			const icon = customIcons[iconName]
			if (icon !== void 0) {
				return { icon: icon }
			}
		}
	}
})
</script>
