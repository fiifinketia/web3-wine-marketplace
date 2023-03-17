import { OrderWithCounter } from '@opensea/seaport-js/lib/types';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';

export interface RetrieveListingResponse
	extends OrderWithCounter,
		TokenIdentifier {
	network: string;
}

export interface ListingWithPricingAndImage {
	smartContractAddress: string;
	tokenID: string;
	image: string;
	lwin: string;
	// priceData: number;
	listingPrice: string;
	priceCurrency: string;
	brand: string;
	network: string;
}

export interface SeaportListingModel {
	from: string;
	contractAddress?: string;
	identifierOrCriteria?: string;
	parameters: {
		offerer: string;
		zone: string;
		orderType: string;
		startTime: string;
		endTime: string;
		zoneHash: string;
		salt: string;
		conduitKey: string;
		totalOriginalConsiderationItems: string;
		counter: string;
		offer: [
			{
				itemType: string;
				token: string;
				startAmount: string;
				endAmount: string;
				identifierOrCriteria: string;
			}
		];
		consideration: [
			{
				itemType: string;
				token: string;
				startAmount: string;
				endAmount: string;
				identifierOrCriteria: string;
				recipient: string;
			}
		];
	};
	signature: string;
	orderHash?: string;
	network?: string;
}

export interface ListingsDTO {
	orderHash: string;
	listPrice: string;
	listCurrency: string;
	timeLeft: string;
	usdPrice?: string;
	from: string;
}

export interface SeaportTransactionsModel {
	network: string;
	to?: string;
	from: string;
	event: string;
	transactionHash: string;
	contractAddress: string;
	identifierOrCriteria: string;
	price?: string;
	timestamp: number;
	currency: string;
}
