<template>
	<div class="column items-center">

		<!-- Newly Minted Section -->
		<div class="releases-tab-container column items-center justify-center">
			NEWLY MINTED
		</div>
		<NewlyMintedSection />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewlyMintedVue from './Releases/NewlyMinted.vue';
import '../../../css/Marketplace/containers.css';
import { ListingWithPricingAndImage } from '../models/Response.models';

export default defineComponent({
	components: {
		NewlyMintedSection: NewlyMintedVue
	},

	data() {
		return {
			newNFTs: new Array<ListingWithPricingAndImage>()
		};
	},

	methods: {
	},
});
</script>

<style>
</style>
