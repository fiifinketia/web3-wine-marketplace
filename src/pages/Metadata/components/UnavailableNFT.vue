<template>
	<q-page-container class="column items-center q-gutter-y-lg q-px-lg">
		<span class="unavailable-nft-header"> Ooops </span>
		<span class="unavailable-nft-subheader">
			The NFT is no longer available.
		</span>
		<q-img
			class="unavailable-nft-icon"
			src="../../../assets/unavailableNFT.svg"
		/>
		<span class="unavailable-nft-text">
			We can notify you once this NFT is back on the Marketplace
		</span>
	</q-page-container>
</template>

<script lang="ts">
import '../../../css/Metadata/UnavailableNFT.css';
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style></style>
