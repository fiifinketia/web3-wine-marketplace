import { Seaport } from '@opensea/seaport-js';
import { OrderWithCounter } from '@opensea/seaport-js/lib/types';
import { Transaction } from 'ethers';

export interface OrderListingModel extends OrderWithCounter, TokenIdentifier {
	orderHash: string;
	network: string;
	from: string;
	brand: string;
	image: string;
	highestBid?: string;
}

export interface OrderRequest {
	Input: {
		conduitKey?: string;
		zone?: string;
		startTime?: string;
		endTime?: string;
		offer: OfferModel;
		consideration: ConsiderationModel;
		counter?: number;
		allowPartialFills?: boolean;
		restrictedByZone?: boolean;
		fees?: Fee[];
		salt?: string;
	};
	accountAddress: string;
}

interface OfferModel {
	item_type: number;
	token: string;
	identifier_or_criteria: string;
	startAmount?: number;
	endAmount?: number;
}

interface ConsiderationModel extends OfferModel {
	recipient: string;
}

interface Fee {
	recipient: string;
	basisPoints: number;
}

export interface SeaportInstance {
	seaport: Seaport;
	network: string;
}

export interface TokenIdentifier {
	readonly contractAddress: string;
	readonly identifierOrCriteria: string;
	readonly network: string;
}

export interface UpdateListingRequest extends TokenIdentifier {
	readonly notificationID: number;
	readonly brand: string;
	readonly orderHash: string;
	readonly isOwner: boolean;
	readonly walletAddress: string;
}

export interface UnverifiedFulfillment extends TokenIdentifier {
	readonly transaction: Transaction;
	readonly network: string;
}
