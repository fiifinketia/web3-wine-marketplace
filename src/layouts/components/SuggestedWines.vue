<template>
	<q-dialog v-model="suggestedWines" class="suggested-wines-background">
		<q-card class="suggested-wines column items-center">
			<q-card-section class="join-wiv-world">
				<div>We're happy to see you join WiV wine world!</div>
			</q-card-section>
			<q-card-section
				class="suggest-trending-today row justify-center items-center"
			>
				<q-img src="../../../public/images/trending.svg" width="22px" />

				<div>&nbsp;&nbsp;Trending today</div>
			</q-card-section>

			<q-card-section class="suggested-paragraph">
				<div class="suggested-p">
					Check our special offers for you to start with -
				</div>
				<div class="suggested-p">most trending at this moment!</div>
				<div class="suggested-p-mobile">
					Check our special offers for you to start with most trending at this
					moment!
				</div>
			</q-card-section>
			<q-card-section class="suggested-wines-section row justify-between">
				<q-card
					v-for="item in items"
					:key="item.id"
					:class="item.class"
					class="no-shadow q-pa-sm suggest-card-individual"
				>
					<div class="suggest-card-img"></div>
					<div class="suggest-wine-name q-py-md">
						The full name of the wine is here and here and here
					</div>
					<div class="suggest-price-container column q-pa-sm">
						<div class="row justify-between q-pb-md">
							<div class="suggest-starting-from">Price</div>
							<q-btn
								class="un-favour-btn"
								icon="app:heart"
								flat
								dense
								padding="0"
								@click="
									{
									}
								"
							/>
						</div>
						<div class="row justify-between">
							<div class="suggest-price">
								<q-img src="../../../public/images/USDT.svg" width="20px" />
								&nbsp;00.00
							</div>
							<q-img
								src="../../../public/images/mini-button.svg"
								width="24px"
								height="24px"
							/>
						</div>
					</div>
				</q-card>
			</q-card-section>

			<q-card-section class="suggested-buttons-container row">
				<button
					class="suggested-buttons suggested-skip-btn"
					@click="suggestedWines = false"
				>
					Skip
				</button>
				<button
					class="suggested-buttons suggested-show-btn"
					@click="suggestedWines = false"
				>
					Show more
				</button>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '../../css/MainLayout/SuggestedWines.css';

export default defineComponent({
	name: 'SuggestedWines',
	data() {
		return {
			suggestedWines: true,
			items: [
				{
					id: 1,
					name: 'Vranac',
					price: 1111,
					class: 'suggested-first',
				},
				{
					id: 2,
					name: 'Sauvignon',
					price: 2222,
					class: 'suggested-second',
				},
				{
					id: 3,
					name: 'Moje Vino',
					price: 3333,
					class: 'suggested-third',
				},
				{
					id: 4,
					name: 'Vranac Pro Corde',
					price: 4444,
					class: 'suggested-forth',
				},
			],
		};
	},
});
</script>

<style></style>
