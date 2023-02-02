export interface NewPolygonNFT extends TokenProperties, OrderProperties {
	tokenID: string;
	description: string;
	image: string;
	name: string;
	wivVintage: string;
	brand: string;
	producer: string;
	productionCountry: string;
	region: string;
	appellation: string;
	vintage: string;
	grape: string;
	lwin: string;
	maturity: string;
	heritage: string;
	investmentGrade: string;
	case: string;
	origin: string;
	source: string;
	type: string;
	format: string;
	smartContractAddress: string;
	network: string;
	typeID?: string;
}

export interface NFTWithListingAndFavorites extends NewPolygonNFT, FavoritesAndOrderDetails{}

interface FavoritesAndOrderDetails {
	favorited?: null | boolean;

  orderDetails?: {
    listingPrice: string;
    currency: string;
    orderHash: string;
    transactionStatus: boolean;
    expTime: string;
    highestBid: string;
  };
}

interface TokenProperties {
	amount?: number;
	hasValueToken?: boolean;
	dateAdded?: number;
	isOwner?: boolean;
	tokenType?: TOKENTYPE;
}

export enum TOKENTYPE {
	ERC1155 = 'ERC1155',
	ERC721 = 'ERC721',
}

interface OrderProperties {
	listingPrice?: string;
	currency?: string;
	orderHash?: string;
	transactionStatus?: string;
	expTime?: number;
}
