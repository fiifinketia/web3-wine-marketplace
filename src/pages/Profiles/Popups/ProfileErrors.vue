<template>
	<q-dialog transition-show="slide-up" transition-hide="slide-down">
		<q-card class="q-pa-none profile-error-container q-pa-md">
			<q-card-section class="column justify-center items-center">
				<q-img
					v-if="errorType == 'accept'"
					src="../../../assets/purchase_failed.svg"
					:style="$q.screen.width > 360 ? 'width: 20%' : 'width: 25vw'"
				/>
				<q-img
					v-else
					src="../../../assets/make_offer_failed.svg"
					:style="$q.screen.width > 360 ? 'width: 20%' : 'width: 25vw'"
				/>
			</q-card-section>
			<q-card-section class="column items-center justify-center q-gutter-y-sm">
				<span
					v-if="errorTitle"
					:class="
						errorType == 'filter'
							? 'profile-warning-title'
							: 'profile-error-title'
					"
				>
					{{ errorTitle }}
				</span>
				<span class="profile-error-text"> {{ errorMessage }} </span>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'src/css/Profile/Component/errorDialog.css';

export default defineComponent({
	props: {
		errorType: {
			type: String,
			required: true,
		},
		errorTitle: {
			type: String,
			required: true,
		},
		errorMessage: {
			type: String,
			required: true,
		}
	},
});
</script>

<style></style>
