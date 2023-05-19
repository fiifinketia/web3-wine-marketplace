import { ListingWithPricingAndImage } from '../models/Response.models';

interface Recommendation {
  title: string;
  metadataField: string;
  metadataValue: string;
  nfts: ListingWithPricingAndImage[];
}

export {
	Recommendation,
}
