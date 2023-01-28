<template>
	<HeadlineComponent />
	<ExclusiveOffers />
	<WineCalculator />
	<TrendingWines class="trending" />
	<PartnershipWines class="partnership" />
	<FAQ class="faq" />
	<LandingPageFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PartnershipWines from './components/PartnershipWines.vue';
import WineCalculator from './components/WineCalculator.vue';
import ExclusiveOffers from './components/ExclusiveOffers.vue';
import TrendingWines from './components/TrendingWines.vue';

import LandingPageFooter from './components/Footer.vue';
import '../../css/Homepage/HomePage.css';
import HeadlineComponent from './components/HeadlineComponent.vue';

import FAQ from './components/FAQ.vue';

export default defineComponent({
	name: 'VueHomepage',
	components: {
		HeadlineComponent,
		ExclusiveOffers,
		WineCalculator,
		TrendingWines,
		LandingPageFooter,
		PartnershipWines,
		FAQ,
	},
});
</script>

<style>
.trending {
	margin-top: 220px;
}
</style>
