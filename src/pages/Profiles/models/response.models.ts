interface ListingsResponse extends ListingModel, HighestOfferModel {}

interface ListingModel extends BaseOrderModel {
  listingPrice: string;
}

interface BaseOrderModel {
  brand: string;
  image: string;
  endTime: string;
  currency: string;
  orderHash: string;
}

interface HighestOfferModel {
  highestOffer: string | null;
  highestOfferCurrency: string | null;
}

export {
  ListingsResponse
}