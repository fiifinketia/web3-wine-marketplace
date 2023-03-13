<template>
	<div class="row justify-between items-center partnership-container">
		<div class="column col-sm col-xs-12">
			<div class="first-text-partnership q-my-sm">
				Want to try some tasty wines sourced directly from producers?
			</div>
			<div class="second-text q-my-sm">
				Enjoy our specially selected partnership wines are coming soon!
			</div>
		</div>
		<div class="partnership-card-container row col">
			<q-card
				v-for="item in items"
				:key="item.name"
				class="column no-shadow col q-pa-md"
				:class="item.class"
			>
				<q-img
					src="../../../assets/circle.png"
					class="partnership-wines-image"
				/>
				<div class="partnership-wine-name">The full name is in this row</div>
				<div class="q-pt-sm partnership-wine-desc">Sparkling wine</div>
				<div class="q-pt-md">
					<div class="flex column partnership-border q-pa-sm">
						<div class="partnership-wine-desc">Price</div>
						<div class="flex row justify-between">
							<div class="flex row q-pt-sm">
								<q-img
									src="../../../../public/images/USDT.svg"
									height="22px"
									width="22px"
								/>
								<div class="partnership-wine-price q-pl-sm">00.00</div>
							</div>
							<div>
								<q-img src="../../../../public/images/trash.svg" width="30px" />
							</div>
						</div>
					</div>
				</div>
			</q-card>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue-demi';
import '../../../css/Homepage/PartnershipWines.css';
export default defineComponent({
	name: 'PartnershipWines',
	data() {
		return {
			items: [
				{
					name: 'Vranac',
					price: 1111,
					class: 'vranac',
				},
				{
					name: 'Sauvignon',
					price: 1111,
					class: 'vranac1',
				},
			],
		};
	},
});
</script>

<style></style>
