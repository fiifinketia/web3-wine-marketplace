import axios, { AxiosResponse } from 'axios';
import { IncomingOffersResponse, ListingsResponse, OrdersResponse, OutgoingOffersResponse } from './models/response.models';

async function ReturnListings(walletAddress: string) : Promise<ListingsResponse[]> {
  let listingResponse: ListingsResponse[] = [];
  const query = `?walletAddress=${walletAddress}`;
  const url = <string> process.env.RETRIEVE_LISTINGS_URL;
  await axios.get(url + query).then((f: AxiosResponse<ListingsResponse[]>) => listingResponse = f.data);
  // listingResponse.push(listingResponse[0])
  // listingResponse[1].orderHash = '2'
  // listingResponse.push(listingResponse[0])
  // listingResponse[2].orderHash = '3'
  // listingResponse.push(listingResponse[0])
  // listingResponse[3].orderHash = '4'
  // listingResponse.push(listingResponse[0])
  // listingResponse[4].orderHash = '5'
  // listingResponse.push(listingResponse[0])
  // listingResponse[5].orderHash = '6'
  // listingResponse.push(listingResponse[0])
  // listingResponse[6].orderHash = '7'
  return listingResponse;
}

async function ReturnOffers(walletAddress: string) : Promise<OrdersResponse> {
  const offers: OrdersResponse = {
    incoming: [],
    outgoing: []
  }
  const query = `?walletAddress=${walletAddress}`;
  const url = <string> process.env.RETRIEVE_INCOMING_OFFERS_URL;
  await axios.get(url + query).then((f: AxiosResponse<OrdersResponse>) => {
    offers.incoming = f.data.incoming;
    offers.outgoing = f.data.outgoing;
  })
  return offers;
}

export {
  ReturnListings,
  ReturnOffers
}