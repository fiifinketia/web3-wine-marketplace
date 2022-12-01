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
									<q-img v-if="nft.orderDetails?.listingPrice" src="../../../assets/ethereum.png" width="20px" />
								</div>
								<div class="price1">{{ nft.orderDetails?.listingPrice || 'Not Available' }}</div>
							</div>
						</div>
						<div v-if="nft.orderDetails?.listingPrice" class="flex column">
							<div class="bid-text">Highest bid from</div>
							<div class="flex row items-center q-pt-sm">
								<div>
									<q-img src="../../../assets/ethereum.png" width="20px" />
								</div>
								<div class="bid-price1">{{ nft.orderDetails?.highestBid || '--.--' }}</div>
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
		<q-btn class="q-pt-md update-metadata-text flex row items-center" flat @click="$emit('refresh')">
			<div class="q-pr-sm cursor-pointer">
				<q-img src="../../../assets/refresh.png" width="24px" />
			</div>
			<div class="update-metadata-text">Update metadata</div>
		</q-btn>

		<q-dialog
			v-model="openCreateListingModal"
			transition-show="slide-up"
			transition-hide="slide-down"
		>
			<q-card
				class="q-pa-md"
				style="width: 400px; max-width: 100%; background-color: #f5f5f5; border-radius: 10px;"
			>
				<q-card-section>
					<div class="text-h6">List For Sale</div>
				</q-card-section>
				<q-card-section>
					<q-input
						v-model="listingPrice"
						label="Listing Price"
						stack-label
						outlined
						type="number"
						debounce="500"
					/>
				</q-card-section>
				<q-card-section>
					<q-btn
						class="buy-now-button flex items-center justify-center cursor-pointer buy-now-text"
						no-caps
						flat
						@click="createListing"
					>
						List
					</q-btn>
				</q-card-section>
			</q-card>
		</q-dialog>

		<q-dialog
			v-model="openBuyNowModal"
			transition-show="scale"
			transition-hide="scale"
		>
			<q-card
				class="q-pa-md"
				style="width: 400px; max-width: 100%; background-color: #f5f5f5; border-radius: 10px;"
			>
				<q-card-section>
					<q-btn
						class="buy-now-button flex items-center justify-center cursor-pointer buy-now-text"
						no-caps
						flat
						@click="buyNow"
					>
						Buy Now
					</q-btn>
				</q-card-section>
			</q-card>
		</q-dialog>

		<q-dialog
			v-model="openMakeOfferModal"
			transition-show="scale"
			transition-hide="scale"
		>
			<q-card
				class="q-pa-md"
				style="width: 400px; border-radius: 15px; background-color: #f5f5f5"
			>
				<div class="text-h6">Make an offer</div>
				<div class="q-pt-md">
					<q-input
						v-model="offerPrice"
						:error="offerValidation"
						:error-message="validationMessage"
						label="Price"
						stack-label
						outlined
						type="number"
						debounce="500"
					/>
				</div>
				<div class="q-pt-md flex row justify-end">
					<q-btn
						class="cancel-button flex items-center justify-center cursor-pointer"
						no-caps
						flat
						@click="openMakeOfferModal = !openMakeOfferModal"
					>
						Cancel
					</q-btn>
					<q-btn
						class="send-button flex items-center justify-center cursor-pointer"
						no-caps
						flat
						@click="sendOffer"
					>
						Send
					</q-btn>
				</div>
			</q-card>
		</q-dialog>
	</div>
</template>

<script lang="ts">
import { QImg, QSeparator, QBtn, QDialog, QCard, QCardSection, QInput } from 'quasar';
import { useUserStore } from 'src/stores/user-store';
import { defineComponent, ref } from 'vue-demi';
import '../../../css/Metadata/WineMetadata.css';
import { TOKENTYPE } from '../models/Metadata';
import { CancelSelectOrders, CreateERC1155Listing, CreateERC721Listing, CreateERC721Offer, FulfillBasicOrder } from '../services/Orders';
export default defineComponent({
	name: 'WineMetadata',
	props: {
		nft: {
			type: Object,
			required: true,
		},
	},
	emits: ['refresh'],
	data() {
		const userStore = useUserStore();
		return {
			openModal: false,
			right: ref(false),
			offerPrice: ref(0),
			highestBid: ref(Number(this.nft.orderDetails?.highestBid) || 0),
			openMakeOfferModal: false,
			openCreateListingModal: false,
			openBuyNowModal: false,
			listingPrice: ref(0),
			offerValidation: false,
			validationMessage: '',
			userStore
		};
	},
	watch: {
		openMakeOfferModal: function (val) {
			if (val) {
				this.offerPrice = Number(this.nft.orderDetails?.highestBid) + 1;
			}
		},
	},
	methods: {
		async sendOffer() {
			if(this.offerPrice <= this.highestBid)  {
				this.offerValidation = true;
				this.validationMessage = 'Please enter a valid price greater than ' + this.highestBid;
				return;
			} else if (this.nft.tokenType === TOKENTYPE.ERC721) {
				await CreateERC721Offer(this.nft.tokenID, this.nft.smartContractAddress, this.nft.brand, this.nft.image,this.userStore.walletAddress, this.offerPrice.toString());
			}
			this.offerPrice = 0;
			this.openMakeOfferModal = false;
			this.$emit('refresh');
		},
		async buyNow() {
			await FulfillBasicOrder(this.nft.orderDetails?.orderHash, this.nft.brand, false, this.userStore.walletAddress);
			this.openBuyNowModal = false
			this.$emit('refresh');
		},
		async createListing() {
			if (this.nft.tokenType === TOKENTYPE.ERC721) {
				await CreateERC721Listing(
					this.nft.tokenID,
					this.nft.smartContractAddress,
					this.nft.brand,
					this.nft.image,
					this.userStore.walletAddress,
					this.listingPrice.toString()
				);
			} else {
				await CreateERC1155Listing(
					this.nft.tokenID,
					this.nft.smartContractAddress,
					this.nft.brand,
					this.nft.image,
					this.userStore.walletAddress,
					this.listingPrice.toString(),
					'1'
				);
			}

			this.openCreateListingModal = false;
			this.$emit('refresh');
		},
		async cancelOrder() {
			await CancelSelectOrders([this.nft.orderDetails?.orderHash])
			this.$emit('refresh')
		}
	},
});
</script>

<style></style>
