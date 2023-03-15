<template>
	<div class="headline-container full-width column justify-center items-center">
		<q-img
			class="grape-img-left"
			src="../../../../public/images/Grape-left.svg"
		/>
		<q-img
			class="grape-img-right"
			src="../../../../public/images/Grape-right.svg"
		/>
		<q-img
			class="grape-mobile"
			src="../../../../public/images/Grape-mobile.svg"
		/>
		<h1 class="headline-title q-mb-xs">WiV Marketplace</h1>
		<p class="headline-paragraph q-mb-lg">We offer the best fine wine investments</p>
		<div class="headline-buttons-container row q-mt-md">
			<q-btn class="headline-buttons" unelevated color="primary" no-caps>Start collection</q-btn>
			<q-btn class="headline-buttons" unelevated color="primary" outline no-caps>Learn about WiV</q-btn>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import '../../../css/Homepage/HeadlineComponent.css';

export default defineComponent({
	name: 'HeadlineComponent',
	data() {
		return {};
	},
});
</script>

<style></style>
