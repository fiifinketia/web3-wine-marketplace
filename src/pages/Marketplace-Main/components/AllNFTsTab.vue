<template>
	<div class="fit row wrap justify-start items-start content-start">
		<!-- Header -->
		<div class="col-xs-12">
			<button
				:style="showToogleButton ? 'display: none;' : 'display : block;'"
				@click="toggleSidebar()"
			>
				Side
			</button>
		</div>

		<!-- Sidebar -->

		<section
			class="col-lg-3 col-md-4 col-sm-5"
			:style="openSidebar ? 'display: block;' : 'display: none;'"
		>
			<!-- Sidebar Component -->
			<MarketPlaceSidebar />
		</section>

		<!-- List Section -->
		<section
			class="col-lg-9 col-md-8 col-sm-7 col-xs-12"
			style="overflow: auto"
		>
			<NFTSelections />
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NFTSelections from './NFT-Selections.vue';
import MarketPlaceSidebar from './MarketPlaceSidebar.vue';

export default defineComponent({

	components: {
		NFTSelections: NFTSelections,
		MarketPlaceSidebar: MarketPlaceSidebar,
	},
	data() {
		return {
			openSidebar: this.isMobile() ? ref(true) : ref(false),
			showToogleButton: this.isMobile() ? ref(true) : ref(false),
		};
	},

	watch: {
		'$q.screen.width': {
			handler() {
				this.showToogleButton = this.isMobile() ? true : false;
			},
		},
	},

	// mounted() {

	// },

	methods: {
		toggleSidebar() {
			this.openSidebar = !this.openSidebar;
		},

		isMobile(breakpoint = 880) {
			return this.$q.screen.width > breakpoint;
		},
	},
});
</script>

<style></style>
