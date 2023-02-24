<template>
	<div class="footer-container">
		<div class="q-pl-md q-pt-md">
			<q-img src="../../../../public/images/WiV-logo.svg" width="80px" />
		</div>
		<div class="row justify-between footer-wrapper text-left q-pt-md">
			<div
				class="column col-lg-2 col-md-3 col-sm-4 col-xs-6 q-gutter-md q-pa-md"
			>
				<a
					class="footer-bold"
					:href="$router.resolve('/marketplace?tab=nfts').href"
					>Marketplace</a
				>
				<a
					class="footer-normal"
					:href="$router.resolve('/marketplace?tab=releases').href"
					>New Releases</a
				>
				<a
					class="footer-normal"
					:href="$router.resolve('/marketplace?tab=recommended').href"
					>Recommended</a
				>
				<a class="footer-bold" :href="$router.resolve('/favorites').href"
					>Favourites</a
				>
				<a class="footer-bold">Stats</a>
				<a class="footer-normal">Wine Statistics</a>
			</div>
			<div
				class="column col-lg-2 col-md-3 col-sm-4 col-xs-6 q-gutter-md q-pa-md"
			>
				<a class="footer-bold">Storefront</a>
				<a class="footer-normal">New comings</a>
				<a class="footer-normal">Recommended</a>
			</div>
			<div
				class="column col-lg-2 col-md-3 col-sm-4 col-xs-6 q-gutter-md q-pa-md"
			>
				<a class="footer-bold" :href="$router.resolve('/orders').href"
					>Profile</a
				>
				<a class="footer-normal">Digital Wine Cellar</a>
				<a class="footer-normal" :href="$router.resolve('/orders').href"
					>Offers</a
				>
				<a class="footer-normal" :href="$router.resolve('/orders').href"
					>Trading History</a
				>
				<a class="footer-normal">Notifications</a>
				<a class="footer-bold">Settings</a>
			</div>
			<div
				class="column col-lg-2 col-md-3 col-sm-4 col-xs-6 q-gutter-md q-pa-md"
			>
				<a class="footer-bold">Help</a>
				<a class="footer-normal">Contact us</a>
				<a class="footer-normal">FAQs</a>
				<a class="footer-normal">Privacy Policy</a>
				<a class="footer-normal">Terms & Conditions</a>
			</div>
			<div
				class="column col-lg-2 col-md-3 col-sm-4 col-xs-6 q-gutter-md q-pa-md"
			>
				<div class="footer-bold no-underline">Contact info:</div>
				<div class="footer-normal">email@email.com</div>
				<div class="footer-normal">+ 0 000 000 0000</div>
			</div>
			<div
				class="column col-lg-2 col-md-3 col-sm-4 col-xs-6 q-gutter-md q-pa-md"
			>
				<div class="footer-bold">Integrations</div>
				<div class="row q-pt-xs">
					<div class="q-pr-md">
						<q-img src="../../../../public/images/discord.svg" width="23px" />
					</div>
					<div class="q-px-md">
						<q-img src="../../../../public/images/twitter.svg" width="23px" />
					</div>
					<div class="q-px-md">
						<q-img src="../../../../public/images/instagram.svg" width="23px" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import '../../../css/Homepage/Footer.css';
export default defineComponent({
	name: 'LandingPageFooter',
});
</script>

<style></style>
