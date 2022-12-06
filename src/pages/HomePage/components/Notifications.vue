<template>
	<div
		v-if="skipStep === false"
		class="notification-container flex column q-pt-sm items-center"
	>
		<div class="notification-title-section row justify-between">
			<div class="notifications-title">Notifications</div>
			<div class="images-container flex justify-between">
				<q-img
					class="cursor-pointer"
					src="../../../assets/settings.svg"
					width="20px"
					height="20px"
				/>
				<q-img
					class="cursor-pointer"
					src="../../../assets/close.svg"
					width="20px"
					height="20px"
				/>
			</div>
		</div>
		<div
			v-if="saveSettings === false"
			class="flex column justify-center items-center"
		>
			<div class="q-pt-lg">
				<q-img
					src="../../../assets/notifications1.png"
					width="150px"
					height="150px"
				/>
			</div>
			<div class="notification-start q-pt-lg">
				To start, please select the notifications you would like to recieve.
			</div>
			<div class="input-container flex column q-pt-lg">
				<div class="flex row items-center">
					<input type="checkbox" />
					<div class="q-pl-sm checkbox-text">
						You received an offer on your wine
					</div>
				</div>
				<div class="flex row items-center">
					<input type="checkbox" />
					<div class="q-pl-sm checkbox-text">
						You have successfully placed a bid
					</div>
				</div>
				<div class="flex row items-center">
					<input type="checkbox" />
					<div class="q-pl-sm">Your bid has been accepted</div>
				</div>
				<div class="flex row items-center">
					<input type="checkbox" />
					<div class="q-pl-sm checkbox-text">Your offer has been outbid</div>
				</div>
				<div class="flex row items-center">
					<input type="checkbox" />
					<div class="q-pl-sm checkbox-text">You sold your Wine</div>
				</div>
				<div class="flex row items-center">
					<input type="checkbox" />
					<div class="q-pl-sm checkbox-text">
						Your wine has some changes from the producer
					</div>
				</div>
			</div>
			<div class="save-settings-button-wrapper q-pt-lg">
				<button
					class="save-settings-button cursor-pointer"
					@click="saveSettings = !saveSettings"
				>
					<div class="save-settings-text">Save settings</div>
				</button>
			</div>
		</div>
		<div
			v-else
			class="email-notification-container flex column q-pt-lg items-center"
		>
			<div class="q-pt-lg">
				<q-img
					src="../../../assets/notifications1.png"
					width="150px"
					height="150px"
				/>
			</div>
			<div class="be-notified-text q-pt-md">
				Be notified by email once the wine store is going live
			</div>
			<div class="flex column q-pt-md">
				<div>Your email</div>
				<div class="email-input-button-wrapper">
					<input class="email-input-button" />
				</div>
				<div class="q-pt-sm">
					<button class="keep-me-updated-button cursor-pointer">
						<div class="keep-me-updated-text">Keep me updated</div>
					</button>
				</div>
				<div class="q-pt-sm">
					<button
						class="skip-step-button cursor-pointer"
						@click="skipStep = !skipStep"
					>
						<div class="skip-step-text">Skip this step</div>
					</button>
				</div>
			</div>
		</div>
	</div>
	<div v-else class="notification-container-2 flex column q-pt-sm items-center">
		<div class="notification-title-section row justify-between">
			<div class="flex row">
				<div class="notifications-title">Notifications</div>
				<div class="notifications-title">&nbsp; 283</div>
			</div>
			<div
				class="notifications-search-container flex justify-between items-center"
			>
				<div class="notification-search-wrapper">
					<input class="notification-search" />
				</div>
				<q-img
					class="cursor-pointer"
					src="../../../assets/settings.svg"
					width="20px"
					height="20px"
				/>
				<q-img
					class="cursor-pointer"
					src="../../../assets/close.svg"
					width="20px"
					height="20px"
				/>
			</div>
		</div>
		<div class="sorting-notifications flex row justify-between items-center">
			<div class="flex row items-center sorting justify-between">
				<div class="flex row items-center">
					<div
						:class="
							newFirst === true
								? 'notifications-radio-button-clicked cursor-pointer'
								: 'notifications-radio-button-not-clicked cursor-pointer'
						"
						@click="newFirst = !newFirst"
					></div>
					<div
						:class="
							newFirst === true
								? 'q-pl-sm notifications-active-text'
								: 'q-pl-sm notifications-not-active-text'
						"
					>
						New first
					</div>
				</div>
				<div class="flex row items-center q-pl-lg">
					<div
						:class="
							oldFirst === true
								? 'notifications-radio-button-clicked cursor-pointer'
								: 'notifications-radio-button-not-clicked cursor-pointer'
						"
						@click="oldFirst = !oldFirst"
					></div>
					<div
						:class="
							oldFirst === true
								? 'q-pl-sm notifications-active-text'
								: 'q-pl-sm notifications-not-active-text'
						"
					>
						Old first
					</div>
				</div>
				<div class="flex row items-center q-pl-lg">
					<div
						:class="
							all === true
								? 'notifications-radio-button-clicked cursor-pointer'
								: 'notifications-radio-button-not-clicked cursor-pointer'
						"
						@click="all = !all"
					></div>
					<div
						:class="
							all === true
								? 'q-pl-sm notifications-active-text'
								: 'q-pl-sm notifications-not-active-text'
						"
					>
						All
					</div>
				</div>
				<div class="flex row items-center q-pl-lg">
					<div
						:class="
							offers === true
								? 'notifications-radio-button-clicked cursor-pointer'
								: 'notifications-radio-button-not-clicked cursor-pointer'
						"
						@click="offers = !offers"
					></div>
					<div
						:class="
							offers === true
								? 'q-pl-sm notifications-active-text'
								: 'q-pl-sm notifications-not-active-text'
						"
					>
						Offers
					</div>
				</div>
				<div class="flex row items-center q-pl-lg">
					<div
						:class="
							sale === true
								? 'notifications-radio-button-clicked cursor-pointer'
								: 'notifications-radio-button-not-clicked cursor-pointer'
						"
						@click="sale = !sale"
					></div>
					<div
						:class="
							sale === true
								? 'q-pl-sm notifications-active-text'
								: 'q-pl-sm notifications-not-active-text'
						"
					>
						Sale
					</div>
				</div>
			</div>
			<div
				class="flex row items-center pagination-notification justify-between"
			>
				<div class="notification-search-wrapper-2">
					<input class="notification-search" />
				</div>
				<div class="notifications-pagination-numbers">1-7</div>
				<div class="flex row justify-between notification-pagination">
					<q-img
						src="../../../assets/next.png"
						width="15px"
						height="15px"
						class="back-button cursor-pointer"
					/>
					<q-img
						src="../../../assets/next.png"
						width="15px"
						height="15px"
						class="cursor-pointer"
					/>
				</div>
			</div>
		</div>
		<div class="notification-wrapper">
			<q-card
				v-for="item in notifications"
				:key="item.title"
				class="notification-section flex row q-pa-sm items-center"
			>
				<div>
					<q-img :src="item.image" width="40px" height="40px" />
				</div>
				<div class="flex row items-center item-full-text">
					<div class="item-text">
						{{ item.title }} <span class="item-number">{{ item.price }}</span
						><span class="q-pl-sm">{{ item.name }}</span>
					</div>
				</div>
				<div class="flex column items-end time-notification-container q-pl-lg">
					<div class="notification-date">{{ item.time }}</div>
					<div class="notification-link cursor-pointer q-pt-sm">
						{{ item.go }}
					</div>
				</div>
			</q-card>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue-demi';
import '../../../css/Notifications.css';
export default defineComponent({
	name: 'NotificationsComponent',
	data() {
		return {
			saveSettings: false,
			skipStep: false,
			newFirst: false,
			oldFirst: false,
			all: false,
			offers: false,
			sale: false,
			notifications: [
				{
					image: require('../../../assets/incomingOffer.png'),
					title: 'You have received offer of',
					price: 111.11,
					name: 'Vranac Pro Corde 2017 Montenegro and more words and more words ',
					time: 'May 20 00:00',
					go: 'See offer',
				},
			],
		};
	},
});
</script>

<style></style>
