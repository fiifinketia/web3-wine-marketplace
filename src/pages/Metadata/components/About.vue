<template>
	<div class="flex column items-center justify-center">
		<div class="about-container flex column">
			<div class="about-title">About</div>
			<div class="q-pt-lg paragraph">
				{{ nft.description }}
			</div>
		</div>
		<div class="flex column properties-container">
			<div class="about-title q-pb-lg">Properties</div>
			<div class="flex row table-container items-center">
				<div
					v-for="property in aboutProperties"
					:key="property"
					class="col-xs-6 col-sm-4 col-md-3 justify-between property-container q-my-sm"
				>
					<div
						v-if="property === 'format'"
						class="flex column text-center items-center"
					>
						<div class="property-name">Bottle Size</div>
						<div class="property-value">{{ nft[property] }}</div>
					</div>
					<div
						v-else-if="property === 'wivVintage'"
						class="flex column text-center items-center"
					>
						<div class="property-name">WiV Vintage</div>
						<div class="property-value">{{ nft[property] }}</div>
					</div>
					<div
						v-else-if="property === 'productionCountry'"
						class="flex column text-center items-center"
					>
						<div class="property-name">Production Country</div>
						<div class="property-value">{{ nft[property] }}</div>
					</div>
					<div v-else class="flex column text-center items-center">
						<div class="property-name">
							{{ property.charAt(0).toUpperCase() + property.slice(1) }}
						</div>
						<div class="property-value">
							{{ nft[property as keyof typeof nft] }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi';
import { NFTWithListingAndFavorites } from '../models/Metadata';
import '../../../css/Metadata/About.css';
export default defineComponent({
	name: 'AboutWine',
	props: {
		nft: {
			type: Object as PropType<NFTWithListingAndFavorites>,
			required: true,
		},
	},
	data() {
		return {
			aboutProperties: [
				'appellation',
				'brand',
				'case',
				'format',
				'grape',
				'heritage',
				'maturity',
				'lwin',
				'origin',
				'producer',
				'productionCountry',
				'region',
				'source',
				'type',
				'vintage',
				'wivVintage',
			],
		};
	},
});
</script>

<style></style>
