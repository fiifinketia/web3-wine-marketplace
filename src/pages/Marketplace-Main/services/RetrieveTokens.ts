import axios from 'axios';
import { ListingWithPricingAndImage } from '../models/Response.models';

const GETParams = {
  params: {
    t: new Date().getTime()
  }
}

async function RetrieveAllNFTs() : Promise<ListingWithPricingAndImage[]> {
  let response: ListingWithPricingAndImage[] = [];
  const url = <string> process.env.MARKETPLACE_GET_ALL_NFTS;

  await axios.get(url, GETParams).then((data) => {
    response = data.data.collection;
  })

  return response;
}

export { RetrieveAllNFTs }
