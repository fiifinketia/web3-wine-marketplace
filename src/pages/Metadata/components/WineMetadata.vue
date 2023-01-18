<template>
	<div
		class="flex column justify-center items-center q-mt-xl"
		@click="openModal === true ? 'modal' : 'content'"
	>
		<div class="brand-name">{{ nft.brand }}</div>
		<div class="wine-name">{{ nft.name }}</div>
		<div class="flex r q-pt-lg test-class">
			<div class="flex justify-center">
				<q-img :src="nft.image" class="picture" />
			</div>
			<div class="flex column info q-pa-md">
				<div class="flex row">
					<div class="q-pl-lg">
						<q-img src="../../../assets/user.png" width="40px" height="40px" />
					</div>
					<div class="flex column q-pl-sm">
						<div class="owned-by">Owned by</div>
						<div class="user-id">WiV</div>
					</div>
				</div>
				<div class="metadata q-pa-md">
					<div class="row q-pb-sm">
						<div class="metadata-text">{{ nft.type }} wine</div>
						<q-separator spaced="md" size="2px" vertical color="accent" />
						<div class="metadata-text">{{ nft.maturity }} yrs</div>
						<q-separator spaced="md" size="2px" vertical color="accent" />
						<div class="metadata-text">{{ nft.productionCountry }}</div>
						<q-separator spaced="md" size="2px" vertical color="accent" />
						<div class="metadata-text q-pl-sm">{{ nft.region }}</div>
					</div>
					<div class="wine-description">
						{{ nft.description || 'No description' }}
					</div>
					<div class="q-pt-lg q-px-xl">
						<div class="flex column">
							<div class="starting-from">Price</div>
							<div class="flex row items-center">
								<div>
									<q-img
										v-if="nft.orderDetails?.listingPrice"
										src="../../../assets/usdc.png"
										width="20px"
									/>
								</div>
								<div class="price1">
									{{ nft.orderDetails?.listingPrice || 'Not Available' }}
								</div>
							</div>
						</div>
						<div v-if="nft.orderDetails?.listingPrice" class="flex column">
							<div class="bid-text">Highest bid from</div>
							<div class="flex row items-center q-pt-sm">
								<div>
									<q-img src="../../../assets/usdc.png" width="20px" />
								</div>
								<div class="bid-price1">
									{{ nft.orderDetails?.highestBid || '--.--' }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="userStore.walletAddress" class="q-pt-lg row modal-container">
			<div v-if="nft.isOwner" class="q-pt-lg flex row modal-container">
				<div v-if="!nft.orderDetails?.listingPrice" class="q-pr-sm whole-modal">
					<q-btn
						class="buy-now-button flex items-center justify-center cursor-pointer buy-now-text"
						no-caps
						flat
						@click="openCreateListingModal = !openCreateListingModal"
					>
						List For Sale
					</q-btn>
				</div>
				<div v-else class="q-pr-sm whole-modal">
					<q-btn
						class="buy-now-button_outline flex items-center justify-center cursor-pointer buy-now-text_outline"
						no-caps
						outline
						flat
						@click="cancelOrder"
					>
						Unlist
					</q-btn>
				</div>
			</div>
			<div v-else class="row">
				<div class="q-pr-sm whole-modal row">
					<q-btn
						class="buy-now-button flex items-center justify-center cursor-pointer buy-now-text"
						no-caps
						flat
						:disable="!nft.orderDetails?.listingPrice"
						@click="openBuyNowModal = !openBuyNowModal"
					>
						Buy now
					</q-btn>
				</div>
				<div class="q-pl-sm">
					<q-btn
						no-caps
						flat
						class="make-offer-button flex items-center justify-center cursor-pointer buy-now-text"
						@click="openMakeOfferModal = !openMakeOfferModal"
					>
						Make an offer
					</q-btn>
				</div>
			</div>
		</div>
		<div v-else class="q-pt-lg row modal-container">
			<div class="q-pr-sm whole-modal text-warning text-bold">
				Please Connect Wallet to view actions.
			</div>
		</div>
		<q-btn
			class="q-pt-md update-metadata-text flex row items-center"
			flat
			@click="$emit('refresh')"
		>
			<div class="q-pr-sm cursor-pointer">
				<q-img src="../../../assets/refresh.png" width="24px" />
			</div>
			<div class="update-metadata-text">Update metadata</div>
		</q-btn>

		<q-dialog
			v-model="openCreateListingModal"
			transition-show="slide-up"
			transition-hide="slide-down"
			class="modal-bg"
		>
			<q-card
				class="q-pa-none"
				style="
					min-width: 80%;
					background-color: #ffffff;
					border-radius: 10px;
					max-width: 100%;
				"
			>
				<q-card-section class="row items-center q-pb-none">
					<div class="text-subtitle1 text-bold">LIST</div>
					<q-separator spaced="md" size="2px" inset vertical color="accent" />
					<div class="text-subtitle1 text-bold">{{ nft.name }}</div>
					<q-space />
					<q-btn v-close-popup icon="close" flat round dense />
				</q-card-section>
				<q-card-section class="row justify-between">
					<div class="col">
						<q-img :src="nft.image" width="100%" />
					</div>
					<div class="col q-pa-none">
						<div class="row col-8">
							<div class="row">
								<div class="col-6 q-pa-sm">
									<span class="text-weight-thin">Your price</span>
									<q-input
										v-model="listingPrice"
										outlined
										dense
										type="number"
										debounce="500"
										class="col-6"
									/>
								</div>
								<!-- // TODO: Threshold -->
								<!-- <div class="col-6 q-pa-sm">
									<span class="text-weight-thin">Your price</span>
									<q-input
										v-model="listingPrice"
										outlined
										dense
										type="number"
										debounce="500"
										class="col-6"
									/>
								</div> -->
							</div>
						</div>
						<div class="row col-6 q-pa-sm">
							<p class="text-weight-thin col-12 q-mb-xs">Expiration date</p>
							<div class="row">
								<q-input
									v-model="listingExpirationDate"
									outlined
									:error="!!listingExpirationDateErrorMessage"
									:error-message="listingExpirationDateErrorMessage"
									dense
									type="date"
									debounce="500"
								/>
							</div>
						</div>
						<div class="row col-6 q-pa-sm">
							<p class="text-weight-thin col-12 q-mb-xs">Fee</p>
							<p class="text-h6">%{{ wivFee }}</p>
						</div>
						<q-separator size="2px" color="accent" />
						<div class="row col-6 q-pa-sm">
							<p class="text-weight-thin col-12 q-mb-xs">Total</p>
							<p class="text-h6">{{ totalPrice }}</p>
						</div>
						<q-checkbox
							v-model="listTokenTOCAccepted"
							label="I agree with Terms and Conditions"
						/>
					</div>
				</q-card-section>
				<q-card-actions align="right">
					<q-btn
						class="buy-now-button flex items-center justify-center cursor-pointer buy-now-text"
						no-caps
						flat
						:disable="
							!listTokenTOCAccepted ||
							listingExpirationDate === '' ||
							listingPrice <= 0 ||
							listingLoading
						"
						@click="createListing"
					>
						List the NFT
					</q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>

		<q-dialog
			v-model="openListingCompletedModal"
			transition-show="slide-up"
			transition-hide="slide-down"
			class="modal-bg"
		>
			<q-card
				class="q-pa-none"
				style="background-color: #ffffff; border-radius: 10px; min-width: 30%"
			>
				<q-card-section class="row items-center justify-center q-pa-sm">
					<q-img src="/images/listing_completed.png" width="50%" />
				</q-card-section>
				<q-card-section class="row items-center justify-center q-py-sm">
					<p class="row col-7 text-bold text-primary">
						The wine is successfully listed for selling!
					</p>
					<p class="row col-7 text-center">
						You will receive notifications on purchases and offers.
					</p>
				</q-card-section>
			</q-card>
		</q-dialog>

		<q-dialog
			v-model="openListingFailedModal"
			transition-show="slide-up"
			transition-hide="slide-down"
			class="modal-bg"
		>
			<q-card
				class="q-pa-none"
				style="background-color: #ffffff; border-radius: 10px; min-width: 30%"
			>
				<q-card-section class="row items-center justify-center q-pa-sm">
					<q-img src="/images/listing_failed.png" width="50%" />
				</q-card-section>
				<q-card-section class="row items-center justify-center q-py-sm">
					<p class="row col-7 text-bold text-negative">
						Sorry, the listing failed
					</p>
					<p class="row col-7 text-center">{{ errorMessage }}</p>
				</q-card-section>
			</q-card>
		</q-dialog>

		<q-dialog
			v-model="openBuyNowModal"
			transition-show="scale"
			transition-hide="scale"
		>
			<q-card
				class="q-pa-none"
				style="
					min-width: 80%;
					background-color: #ffffff;
					border-radius: 10px;
					max-width: 100%;
				"
			>
				<q-card-section class="row items-center q-pb-none">
					<div class="text-subtitle1 text-bold">Buy Now</div>
					<q-separator spaced="md" size="2px" inset vertical color="accent" />
					<div class="text-subtitle1 text-bold">{{ nft.name }}</div>
					<q-space />
					<q-btn v-close-popup icon="close" flat round dense />
				</q-card-section>
				<div
					v-if="insufficientFundsToBuy"
					class="row items-center justify-center q-pa-none q-ma-none"
				>
					<span>Insufficient funds </span
					><q-btn flat @click="openWalletSideBar">
						Click here to fund wallet</q-btn
					>
				</div>
				<q-card-section class="row justify-between">
					<div class="col">
						<q-img :src="nft.image" width="100%" />
					</div>
					<div class="col q-pa-none">
						<div class="row col-8">
							<div class="row col-12 justify-between">
								<div class="col-5 q-pa-sm">
									<p class="text-weight-thin col-12 q-mb-xs">Price</p>
									<p class="text-h6">{{ nft.orderDetails?.listingPrice }}</p>
								</div>
								<div class="col-7 q-pa-none">
									<!-- // Count down display -->
									<p class="col-12 q-mb-xs text-primary text-right q-pr-md">
										{{ new Date().toLocaleTimeString() }}
									</p>
									<q-card class="row">
										<div class="q-pa-sm q-ma-none col-4" align="left">
											<div class="text-weight-thin q-pa-xs text-caption">
												Ends In
											</div>
										</div>
										<div
											class="row justify-around q-pa-sm q-ma-none col-8"
											align="right"
										>
											<div class="col-3 q-pa-xs days">
												<div class="text-negative text-caption">
													{{ currentCount.days }}
												</div>
												<div class="text-weight-thin">Dd</div>
											</div>
											<div class="col-3 q-pa-xs hours">
												<div class="text-negative text-caption">
													{{ currentCount.hours }}
												</div>
												<div class="text-weight-thin">HH</div>
											</div>
											<div class="col-3 q-pa-xs minutes">
												<div class="text-negative text-caption">
													{{ currentCount.minutes }}
												</div>
												<div class="text-weight-thin">MM</div>
											</div>
											<div class="col-3 q-pa-xs seconds">
												<div class="text-negative text-caption">
													{{ currentCount.seconds }}
												</div>
												<div class="text-weight-thin">SS</div>
											</div>
										</div>
									</q-card>
								</div>
							</div>
						</div>
						<div class="row col-6 q-pa-sm">
							<p class="text-weight-thin col-12 q-mb-xs">Fee</p>
							<p class="text-h6">%{{ wivFee }}</p>
						</div>
						<q-separator size="2px" color="accent" />
						<div class="row col-6 q-pa-sm">
							<p class="text-weight-thin col-12 q-mb-xs">Total</p>
							<p class="text-h6">{{ nft.orderDetails?.listingPrice }}</p>
						</div>
						<q-checkbox
							v-model="buyTokenTOCAccepted"
							label="I agree with Terms and Conditions"
						/>
						<q-card-actions align="right" class="q-mt-xl">
							<q-btn
								class="buy-now-button flex items-center justify-center cursor-pointer buy-now-text"
								no-caps
								flat
								:disable="!buyTokenTOCAccepted"
								@click="buyNow"
							>
								Process Payment
							</q-btn>
						</q-card-actions>
					</div>
				</q-card-section>
			</q-card>
		</q-dialog>

		<q-dialog
			v-model="openBuyNowCompletedModal"
			transition-show="slide-up"
			transition-hide="slide-down"
			class="modal-bg"
		>
			<q-card
				class="q-pa-none"
				style="background-color: #ffffff; border-radius: 10px; max-width: 30%"
			>
				<q-card-section class="row items-center justify-center q-pa-sm">
					<q-img src="/images/buy_now_completed.png" width="50%" />
				</q-card-section>
				<q-card-section class="row items-center justify-center q-py-sm">
					<p class="row col-7 text-bold text-primary">
						NFT is already in your cellar!
					</p>
					<p class="row col-7 text-center">
						You can monitor its growth in your. <a>Digital Wine Cellar</a>
					</p>
				</q-card-section>
			</q-card>
		</q-dialog>
		<q-dialog
			v-model="openBuyNowFailedModal"
			transition-show="slide-up"
			transition-hide="slide-down"
			class="modal-bg"
		>
			<q-card
				class="q-pa-none"
				style="background-color: #ffffff; border-radius: 10px; min-width: 30%"
			>
				<q-card-section class="row items-center justify-center q-pa-sm">
					<q-img src="/images/buy_now_failed.png" width="50%" />
				</q-card-section>
				<q-card-section class="row items-center justify-center q-py-sm">
					<p class="row col-7 text-bold text-negative">
						Sorry, the purchase failed
					</p>
					<p class="row col-7 text-center">{{ errorMessage }}</p>
				</q-card-section>
			</q-card>
		</q-dialog>

		<q-dialog
			v-model="openMakeOfferModal"
			transition-show="scale"
			transition-hide="scale"
		>
			<q-card
				class="q-pa-none"
				style="
					min-width: 80%;
					background-color: #ffffff;
					border-radius: 10px;
					max-width: 100%;
				"
			>
				<q-card-section class="row items-center q-pb-none">
					<div class="text-subtitle1 text-bold">Bid For</div>
					<q-separator spaced="md" size="2px" inset vertical color="accent" />
					<div class="text-subtitle1 text-bold">{{ nft.name }}</div>
					<q-space />
					<q-btn v-close-popup icon="close" flat round dense />
				</q-card-section>
				<div
					v-if="insufficientFundsToMakeOffer"
					class="row items-center justify-center q-pa-none q-ma-none"
				>
					<span>Insufficient funds </span
					><q-btn flat @click="openWalletSideBar">
						Click here to fund wallet</q-btn
					>
				</div>
				<q-card-section class="row justify-between">
					<div class="col">
						<q-img :src="nft.image" width="100%" />
					</div>
					<div class="col q-pa-none">
						<div class="row col-8">
							<div class="row col-12 justify-between">
								<div class="col-6 q-pa-sm">
									<p class="text-weight-thin col-12 q-mb-xs">Price</p>
									<p class="text-h6">{{ nft.orderDetails?.listingPrice }}</p>
								</div>
							</div>
							<div class="row col-12 justify-between">
								<div class="q-pa-sm">
									<span class="text-weight-thin">Your price</span>
									<q-input
										v-model="offerPrice"
										:error="offerValidation"
										:error-message="validationMessage"
										outlined
										dense
										type="number"
										debounce="500"
										class="col-6"
									/>
								</div>
								<!-- // Countdown display -->
								<!-- <div class="col-6 q-pa-sm">
									<p class="col-12 q-mb-xs text-primary text-right q-pr-md">
										{{ new Date().toLocaleTimeString() }}
									</p>
									<q-card class="row">
										<div class="q-pa-sm q-ma-none co-3" align="left">
											<div class="text-weight-thin q-pa-sm">Ends In</div>
										</div>
										<div
											class="row justify-around q-pa-sm q-ma-none col-8"
											align="right"
										>
											<div class="column days">
												<div class="text-negative text-subtitle2">
													{{ currentCount.days }}
												</div>
												<div class="text-weight-thin">Dd</div>
											</div>
											<div class="column hours">
												<div class="text-negative text-subtitle2">
													{{ currentCount.hours }}
												</div>
												<div class="text-weight-thin">HH</div>
											</div>
											<div class="column minutes">
												<div class="text-negative text-subtitle2">
													{{ currentCount.minutes }}
												</div>
												<div class="text-weight-thin">MM</div>
											</div>
											<div class="column seconds">
												<div class="text-negative text-subtitle2">
													{{ currentCount.seconds }}
												</div>
												<div class="text-weight-thin">SS</div>
											</div>
										</div>
									</q-card>
								</div> -->
							</div>
						</div>
						<div class="row col-6 q-pa-sm">
							<p class="text-weight-thin col-12 q-mb-xs">Fee</p>
							<p class="text-h6">%{{ wivFee }}</p>
						</div>
						<div class="row col-6 q-pa-sm">
							<p class="text-weight-thin col-12 q-mb-xs">Keep active till</p>
							<div class="row justify-between">
								<q-input
									v-model="offerExpirationDate"
									outlined
									:error="!!offerExpirationDateErrorMessage"
									:error-message="offerExpirationDateErrorMessage"
									dense
									type="date"
									debounce="500"
									@change="dateCheck"
								/>
								<span
									v-if="falseDate"
									style="color: #cc3300ed; margin: 9px 0 0 10px"
									>Please enter a date in future</span
								>
							</div>
						</div>
						<q-separator size="2px" color="accent" />
						<div class="row col-6 q-pa-sm">
							<p class="text-weight-thin col-12 q-mb-xs">Total</p>
							<p class="text-h6">
								{{
									(
										Number(offerPrice) +
										((offerPrice || 0) * wivFee) / 100
									).toFixed(2) || (0).toFixed(2)
								}}
							</p>
						</div>
						<q-checkbox
							v-model="makeOfferTOCAccepted"
							label="I agree with Terms and Conditions"
						/>
						<q-card-actions align="right" class="q-mt-xl">
							<q-btn
								class="make-offer-button flex items-center justify-center cursor-pointer buy-now-text"
								no-caps
								flat
								:disable="
									!makeOfferTOCAccepted ||
									offerExpirationDate === '' ||
									offerPrice <= 0 ||
									makeOfferLoading ||
									falseDate
								"
								@click="sendOffer"
							>
								Make offer
							</q-btn>
						</q-card-actions>
					</div>
				</q-card-section>
			</q-card>
		</q-dialog>
		<q-dialog
			v-model="openOfferCompletedModal"
			transition-show="slide-up"
			transition-hide="slide-down"
			class="modal-bg"
		>
			<q-card
				class="q-pa-none"
				style="background-color: #ffffff; border-radius: 10px; min-width: 30%"
			>
				<q-card-section class="row items-center justify-center q-pa-sm">
					<q-img src="/images/make_offer_completed.png" width="50%" />
				</q-card-section>
				<q-card-section class="row items-center justify-center q-py-sm">
					<p class="row col-7 text-bold text-primary">
						Your offer is successfully submitted.
					</p>
					<p class="row col-7 text-center">
						We will notify you in case someone outbids you. You can update your
						bid or withdraw it from the offer page.
					</p>
				</q-card-section>
			</q-card>
		</q-dialog>
		<q-dialog
			v-model="openOfferFailedModal"
			transition-show="slide-up"
			transition-hide="slide-down"
			class="modal-bg"
		>
			<q-card
				class="q-pa-none"
				style="background-color: #ffffff; border-radius: 10px; min-width: 30%"
			>
				<q-card-section class="row items-center justify-center q-pa-sm">
					<q-img src="/images/make_offer_failed.png" width="50%" />
				</q-card-section>
				<q-card-section class="row items-center justify-center q-py-sm">
					<p class="row col-7 text-bold text-negative">
						Sorry, making offer failed :(
					</p>
					<p class="row col-7 text-center">{{ errorMessage }}</p>
				</q-card-section>
			</q-card>
		</q-dialog>
	</div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import ContractABI from '../contract/contract.json';
import { useUserStore } from 'src/stores/user-store';
import { defineComponent, ref } from 'vue-demi';
import '../../../css/Metadata/WineMetadata.css';
import { TOKENTYPE } from '../models/Metadata';
import {
	CancelSelectOrders,
	CancelSingleOrder,
	CreateERC1155Listing,
	CreateERC721Listing,
	CreateERC721Offer,
	FulfillBasicOrder,
} from '../services/Orders';
import CountdownTimer from '../services/CountDownTimer';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
export default defineComponent({
	name: 'WineMetadata',
	props: {
		nft: {
			type: Object,
			required: true,
		},
	},
	emits: ['refresh', 'openWallet'],
	setup() {
		const userStore = useUserStore();
		const wivFee = Number(process.env.WIV_FEE) * 0.01;

		// timer.startTimer();
		return {
			openModal: ref(false),
			right: ref(false),
			offerPrice: ref(0),
			openMakeOfferModal: ref(false),
			openCreateListingModal: ref(false),
			openBuyNowModal: ref(false),
			listingPrice: ref(0),
			completedTimeoutModal: 2000,
			listingExpirationDate: ref(''),
			offerExpirationDate: ref(''),
			falseDate: false,
			offerValidation: ref(false),
			listTokenTOCAccepted: ref(false),
			makeOfferTOCAccepted: ref(false),
			buyTokenTOCAccepted: ref(false),
			listingLoading: ref(false),
			makeOfferLoading: ref(false),
			buyNowLoading: ref(false),
			validationMessage: '',
			listingExpirationDateErrorMessage: '',
			offerExpirationDateErrorMessage: '',
			errorMessage: ref(''),
			openListingCompletedModal: ref(false),
			openListingFailedModal: ref(false),
			openOfferCompletedModal: ref(false),
			openOfferFailedModal: ref(false),
			openBuyNowCompletedModal: ref(false),
			openBuyNowFailedModal: ref(false),
			insufficientFundsToBuy: ref(false),
			insufficientFundsToMakeOffer: ref(false),
			userStore,
			wivFee,
			currentCount: ref({
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
			}),
			totalPrice: ref(0),
			currentInterval: ref<NodeJS.Timeout>(),
		};
	},

	watch: {
		openMakeOfferModal: function (val) {
			if (val) {
				this.offerPrice = Number(this.nft.orderDetails?.highestBid) + 1;
			}
		},
		listingPrice: function (val) {
			if (val) {
				this.totalPrice = ((100 - this.wivFee) / 100) * this.listingPrice;
			}
		},
		openBuyNowModal: function (val) {
			if (val === true) {
				const tDate = this.nft.orderDetails?.expTime;
				const timer = new CountdownTimer({
					selector: '#clock1',
					targetDate: new Date(tDate * 1000),
					backgroundColor: 'rgba(0,0,0,.15)',
					foregroundColor: 'rgba(0,0,0,.50)',
				});
				this.currentInterval = setInterval(() => {
					const t = timer.getTimeRemaining();
					this.currentCount = timer.updateTimer(t);
				}, 1000);
			}
			// TODO: Stop Timer
		},
	},

	async updated() {
		try {
			const web3 = new Web3(window.ethereum);
			const contract = new web3.eth.Contract(
				ContractABI as AbiItem[],
				this.nft.smartContractAddress
			);
			const owner = await contract.methods.ownerOf(this.nft.tokenID).call();
			const exists = await contract.methods.tokenURI(this.nft.tokenID).call();
			exists && console.log('Token exists\nTokenID: ' + this.nft.tokenID);

			console.log(owner);
		} catch (err) {
			console.log(err);
		}
	},

	methods: {
		dateCheck() {
			const today = new Date();
			if (today >= new Date(this.offerExpirationDate)) {
				this.falseDate = true;
			} else {
				this.falseDate = false;
			}
		},
		async sendOffer() {
			// const walletBalance = await this.userStore.getWalletBalance();
			// if (walletBalance < this.offerPrice) {
			// 	this.insufficientFundsToMakeOffer = true;
			// 	return;
			// }
			try {
				this.makeOfferLoading = true;
				if (this.offerPrice <= this.nft.orderDetails?.highestBid) {
					this.offerValidation = true;
					this.validationMessage =
						'Please enter a valid price greater than ' +
						this.nft.orderDetails?.highestBid;
					return;
				} else if (this.nft.tokenType === TOKENTYPE.ERC721) {
					try {
						await CreateERC721Offer(
							this.nft.tokenID,
							this.nft.smartContractAddress,
							this.nft.brand,
							this.nft.image,
							this.userStore.walletAddress,
							this.offerPrice.toString(),
							this.offerExpirationDate
						);
					} catch (error) {
						throw error;
					}
				}
				this.offerPrice = 0;
				this.openMakeOfferModal = false;
				this.makeOfferLoading = false;
				this.openOfferCompletedModal = true;
				setTimeout(() => {
					this.openOfferCompletedModal = false;
					this.$emit('refresh');
				}, this.completedTimeoutModal);
			} catch (error: any) {
				this.makeOfferLoading = false;
				this.openOfferFailedModal = true;
				if (error.code === 'ACTION_REJECTED') {
					this.errorMessage = 'User cancelled transaction.';
				}
				else {
					this.errorMessage = error.message || 'Please try again or reconnect wallet.';
				}
				setTimeout(() => {
					this.openOfferFailedModal = false;
					this.openMakeOfferModal = true;
					this.errorMessage = '';
				}, this.completedTimeoutModal);
			}
		},
		async buyNow() {
			try {
				// const walletBalance = await this.userStore.getWalletBalance();
				// if (walletBalance < Number(this.nft.orderDetails?.listingPrice)) {
				// 	this.insufficientFundsToBuy = true;
				// 	return;
				// }
				this.buyNowLoading = true;
				await FulfillBasicOrder(
					this.nft.orderDetails?.orderHash,
					this.nft.brand,
					false,
					this.userStore.walletAddress,
					this.nft.image
				);
				this.openBuyNowModal = false;
				this.openBuyNowCompletedModal = true;
				this.buyNowLoading = false;
				setTimeout(() => {
					this.openBuyNowCompletedModal = false;
					this.$emit('refresh');
				}, this.completedTimeoutModal);
			} catch (error: any) {
				this.buyNowLoading = false;
				this.openBuyNowFailedModal = true;
				if (error.code === 'ACTION_REJECTED') {
					this.errorMessage = 'User cancelled transaction.';
				}
				else if (error.message && error.message.includes('unknown account'))
				{
					this.errorMessage = 'Account locked, please unlock meteamask to continue';
				}
				else {
					this.errorMessage = error.message || 'Please try again or reconnect wallet.';
				}
				setTimeout(() => {
					this.openBuyNowFailedModal = false;
					this.openBuyNowModal = true;
					this.errorMessage = '';
				}, this.completedTimeoutModal);
			}
		},
		async createListing() {
			try {
				if (
					new Date(this.listingExpirationDate).getDate() < new Date().getDate()
				) {
					this.listingExpirationDateErrorMessage = 'Date should be after today';
					return;
				}
				this.listingLoading = true;
				if (this.nft.tokenType === TOKENTYPE.ERC721) {
					await CreateERC721Listing(
						this.nft.tokenID,
						this.nft.smartContractAddress,
						this.nft.brand,
						this.nft.image,
						this.userStore.walletAddress,
						this.listingPrice.toString(),
						this.listingExpirationDate
					);
				} else {
					await CreateERC1155Listing(
						this.nft.tokenID,
						this.nft.smartContractAddress,
						this.nft.brand,
						this.nft.image,
						this.userStore.walletAddress,
						this.listingPrice.toString(),
						this.listingExpirationDate,
						'1'
					);
				}

				this.openCreateListingModal = false;
				this.listingLoading = false;
				this.openListingCompletedModal = true;
				setTimeout(() => {
					this.openListingCompletedModal = false;
					this.$emit('refresh');
				}, this.completedTimeoutModal);
			} catch (error: any) {
				this.listingLoading = false;
				this.openListingFailedModal = true;
				if (error.code === 'ACTION_REJECTED') {
					this.errorMessage = 'User cancelled transaction.';
				}
				else {
					this.errorMessage = error.message || 'Please try again or reconnect wallet.';
				}
				setTimeout(() => {
					this.openListingFailedModal = false;
					this.openCreateListingModal = true;
					this.errorMessage = '';
				}, this.completedTimeoutModal);
			}
		},
		async cancelOrder() {
			await CancelSingleOrder(this.nft.orderDetails?.orderHash);
			this.$emit('refresh');
		},
		async openWalletSideBar() {
			this.buyTokenTOCAccepted = false;
			this.$emit('openWallet');
		},
	},
});
</script>

<style></style>
