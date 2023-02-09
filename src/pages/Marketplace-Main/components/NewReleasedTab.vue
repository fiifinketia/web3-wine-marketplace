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

export default defineComponent({
	components: {
		NewlyMintedSection: NewlyMintedVue
	},
	emits: [ 'totalTokens' ]
});
</script>

<style>
</style>
