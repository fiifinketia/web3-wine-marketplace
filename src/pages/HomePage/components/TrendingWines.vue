<template>
	<div>
		<div class="flex column justify-center items-center">
			<div class="trending-wines-title q-pb-lg">Trending wines</div>
			<div v class="trending-table">
				<div class="row trending-header-row">
					<div class="trending-wine-name">Wine Name</div>
					<div class="trending-twentyFour">24 hrs</div>
					<div class="trending-three">3 mos</div>
					<div>6 mos</div>
					<div class="trending-wines-price">Price</div>
				</div>
				<div class="trending-separator"></div>
				<div class="column trending-wine-rows">
					<div
						v-for="item in items"
						:key="item.id"
						class="row each-trending-row"
					>
						<div class="trending-wine-name trending-wine-name-label">
							{{ item.name }}
						</div>
						<div
							class="trending-twentyFour"
							:class="positive === true ? 'positive' : 'negative'"
						>
							{{ item.twenty }}%&nbsp;
							<q-img
								v-if="positive"
								src="../../../../public/images/up.svg"
								width="13px"
							/>
							<q-img
								v-if="!positive"
								src="../../../../public/images/down.svg"
								width="13px"
							/>
						</div>
						<div
							class="trending-three"
							:class="positive === true ? 'positive' : 'negative'"
						>
							{{ item.three }}%&nbsp;
							<q-img
								v-if="positive"
								src="../../../../public/images/up.svg"
								width="13px"
							/>
							<q-img
								v-if="!positive"
								src="../../../../public/images/down.svg"
								width="13px"
							/>
						</div>
						<div :class="positive === true ? 'positive' : 'negative'">
							{{ item.six }}%&nbsp;

							<q-img
								v-if="positive"
								src="../../../../public/images/up.svg"
								width="13px"
							/>
							<q-img
								v-if="!positive"
								src="../../../../public/images/down.svg"
								width="13px"
							/>
						</div>
						<div class="trending-wines-price trending-price">
							<q-img
								src="../../../../public/images/USDT-black.svg"
								width="19px"
								class="q-mr-xs"
							/>
							{{ item.price }}
						</div>
					</div>
				</div>
			</div>

			<q-btn
				class="see-market-button"
				color="primary"
				no-caps
				outline
				unelevated
				>See market statistics</q-btn
			>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue-demi';
import '../../../css/Homepage/TrendingWines.css';
export default defineComponent({
	name: 'TrendingWines',
	data() {
		return {
			items: [
				{
					name: 'The full wine name here',
					twenty: 0.67,
					three: 0.67,
					six: 0.67,
					price: '00.00',
					id: 0,
				},
				{
					name: 'The full wine name here',
					twenty: 0.67,
					three: 0.67,
					six: 0.67,
					price: '00.00',
					id: 1,
				},
				{
					name: 'The full wine name here',
					twenty: 0.67,
					three: 0.67,
					six: 0.67,
					price: '00.00',
					id: 2,
				},
				{
					name: 'The full wine name here',
					twenty: 0.67,
					three: 0.67,
					six: 0.67,
					price: '00.00',
					id: 3,
				},
				{
					name: 'The full wine name here',
					twenty: 0.67,
					three: 0.67,
					six: 0.67,
					price: '00.00',
					id: 4,
				},
				{
					name: 'The full wine name here',
					twenty: 0.67,
					three: 0.67,
					six: 0.67,
					price: '00.00',
					id: 5,
				},
			],
			positive: true,
		};
	},
});
</script>

<style></style>
