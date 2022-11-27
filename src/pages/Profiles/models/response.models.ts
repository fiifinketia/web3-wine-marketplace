interface OrdersResponse {
  incoming: IncomingOffersResponse[];
  outgoing: OutgoingOffersResponse[];
}

interface ListingsResponse extends ListingModel, HighestOfferModel {}

interface IncomingOffersResponse extends OfferModel, LowestOfferModel {
  offerer: string;
}

interface OutgoingOffersResponse extends OfferModel, HighestOfferModel {}

interface ListingModel extends BaseOrderModel {
  listingPrice: string;
}

interface OfferModel extends BaseOrderModel {
  offer: string;
  offerer: string;
}

interface BaseOrderModel {
  brand: string;
  image: string;
  endTime: string;
  currency: string;
  orderHash: string;
}

interface HighestOfferModel {
  highestOffer?: string | null;
  highestOfferCurrency?: string | null;
}

interface LowestOfferModel {
  lowestOffer?: string | null;
  lowestOfferCurrency?: string | null;
}

export {
  ListingsResponse,
  IncomingOffersResponse,
  OutgoingOffersResponse,
  OrdersResponse
}