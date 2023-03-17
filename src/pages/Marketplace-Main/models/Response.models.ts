interface DynamicKeyWithCount {
	[key: string]: [
		{
			_id: string;
			count: number;
		}
	];
}

interface ListingWithPricingAndImage {
	smartContractAddress: string;
	tokenID: string;
	image: string;
	lwin: string;
	network: string;
	brand: string;

	favorited?: null | boolean;
	favoriteLoading?: null | boolean;

	orderDetails?: {
		listingPrice: string;
		currency: string;
		orderHash: string;
		transactionStatus: string;
		expTime: string;
	};
}

interface ResultAndCountResponse {
	result: ListingWithPricingAndImage[];
	counts: DynamicKeyWithCount;
}

export {
	ListingWithPricingAndImage,
	ResultAndCountResponse,
	DynamicKeyWithCount,
};
