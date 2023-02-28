<template>
	<footer class="footer-container q-pb-xl">
		<div class="wiv-image-wrapper">
			<img
				src="../../../../public/images/wiv-footer-logo.svg"
				class="wiv-image"
			/>
		</div>
		<div class="footer-wrapper">
			<div class="footer-item-wrapper">
				<div class="footer-bold" @click="$router.push('/marketplace?tab=nfts')">NFTs</div>
				<div class="item-text q-pt-sm" @click="$router.push('/marketplace?tab=releases')">New Releases</div>
				<div class="item-text q-pt-sm" @click="$router.push('/marketplace?tab=recommended')">Recommended</div>
				<div class="item-title q-pt-md">Favourites</div>
				<div class="item-title q-pt-md"  @click="$router.push('/favorites')">Stats</div>
				<div class="item-text q-pt-sm">Wine Statisctics</div>

				<div class="first-div-appear">
					<div class="footer-bold">Storefront</div>
					<div class="item-text q-pt-sm">New Commings</div>
					<div class="item-text q-pt-sm">Recommended</div>
				</div>

				<div class="footer-item-wrapper fourth-400-item">
					<div class="item-title">Contact info:</div>
					<div class="item-text q-pt-sm">info@wiv.io</div>
					<div class="item-text q-pt-sm">+0 000 000 0000</div>
				</div>
			</div>
			<div class="footer-item-wrapper first-item">
				<div class="item-title">Storefront</div>
				<div class="item-text q-pt-sm">New Commings</div>
				<div class="item-text q-pt-sm">Recommended</div>
			</div>
			<div class="footer-item-wrapper">
				<div class="item-title" @click="$router.push('/orders')">Profile</div>
				<div class="item-text q-pt-sm">Digital Wine Cellar</div>
				<div class="item-text q-pt-sm" @click="$router.push('/orders?tab=incoming')">Offers</div>
				<div class="item-text q-pt-sm" @click="$router.push('/orders?tab=transactions')">Trading History</div>
				<div class="item-text q-pt-sm">Notifications</div>
				<div class="item-title q-pt-md">Settings</div>

				<div class="footer-item-wrapper third-div-wrapper">
					<div class="item-title">Help</div>
					<div class="item-text q-pt-sm">Contract us</div>
					<div class="item-text q-pt-sm">FAQs</div>
					<div class="item-text q-pt-sm">Privacy Policy</div>
					<div class="item-text q-pt-sm">Terms and Conditions</div>
				</div>
				<div class="footer-item-wrapper fifth-item-400">
					<div class="item-title">Integrations</div>
					<div class="row q-pt-md">
						<a href="https://discord.gg/znkRDJDXvr" target="_blank" class="q-pr-sm">
							<q-img src="../../../../public/images/discord.svg" width="23px" />
						</a>
						<a href="https://twitter.com/wivteam" target="_blank" class="q-px-sm">
							<q-img src="../../../../public/images/twitter.svg" width="23px" />
						</a>
						<a href="https://www.instagram.com/wiv.io/" target="_blank" class="q-px-sm">
							<q-img
								src="../../../../public/images/instagram.svg"
								width="23px"
							/>
						</a>
					</div>
				</div>
			</div>
			<div class="footer-item-wrapper third-item">
				<div class="item-title">Help</div>
				<div class="item-text q-pt-sm">Contact us</div>
				<div class="item-text q-pt-sm">FAQs</div>
				<div class="item-text q-pt-sm">Privacy Policy</div>
				<div class="item-text q-pt-sm">Terms and Conditions</div>
			</div>
			<div class="footer-item-wrapper">
				<div class="footer-nft-400-disappear">
					<div class="item-title">Contract info:</div>
					<div class="item-text q-pt-sm">info@wiv.io</div>
					<div class="item-text q-pt-sm">+0 000 000 0000</div>
				</div>
				<div class="footer-item-wrapper fifth-div-wrapper">
					<div class="item-title">Integrations</div>
					<div class="row q-pt-md">
						<a href="https://discord.gg/znkRDJDXvr" target="_blank" class="q-pr-sm">
							<q-img src="../../../../public/images/discord.svg" width="23px" />
						</a>
						<a href="https://twitter.com/wivteam" target="_blank" class="q-px-sm">
							<q-img src="../../../../public/images/twitter.svg" width="23px" />
						</a>
						<a href="https://www.instagram.com/wiv.io/" target="_blank" class="q-px-sm">
							<q-img
								src="../../../../public/images/instagram.svg"
								width="23px"
							/>
						</a>
					</div>
				</div>
			</div>
			<div class="footer-item-wrapper fifth-item">
				<div class="item-title">Integrations</div>
				<div class="row q-pt-md">
						<a href="https://discord.gg/znkRDJDXvr" target="_blank" class="q-pr-sm">
							<q-img src="../../../../public/images/discord.svg" width="23px" />
						</a>
						<a href="https://twitter.com/wivteam" target="_blank" class="q-px-sm">
							<q-img src="../../../../public/images/twitter.svg" width="23px" />
						</a>
						<a href="https://www.instagram.com/wiv.io/" target="_blank" class="q-px-sm">
							<q-img
								src="../../../../public/images/instagram.svg"
								width="23px"
							/>
						</a>
					</div>
			</div>
		</div>
	</footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import '../../../css/Homepage/Footer.css';
export default defineComponent({
	name: 'LandingPageFooter',
});
</script>

<style></style>
