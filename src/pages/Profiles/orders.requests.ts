import axios, { AxiosResponse } from 'axios';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
import { IncomingOffersResponse, ListingsResponse, OrdersResponse, OutgoingOffersResponse } from './models/response.models';

async function ReturnListings(walletAddress: string, filter: string) : Promise<ListingsResponse[]> {
  let listingResponse: ListingsResponse[] = [];
  const query = `?walletAddress=${walletAddress}&sortKey=${filter}`;
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

async function ReturnIncomingOffers(ownedNFTs: TokenIdentifier[], filter: string) {
  let incomingOffers: IncomingOffersResponse[] = [];
  const url = <string> process.env.RETRIEVE_INCOMING_OFFERS_URL;
  const body = {
    sortKey: filter,
    ownedNFTs: ownedNFTs
  }
  await axios.post(url, body).then((f: AxiosResponse<IncomingOffersResponse[]>) => incomingOffers = f.data);
  return incomingOffers;
}

async function ReturnOutgoingOffers(walletAddress: string, filter: string) {
  let outgoingOffers: OutgoingOffersResponse[] = [];
  const url = <string> process.env.RETRIEVE_OUTGOING_OFFERS_URL;
  await axios.get(`${url}?walletAddress=${walletAddress}&sortKey=${filter}`).then((f: AxiosResponse<OutgoingOffersResponse[]>) => outgoingOffers = f.data);
  return outgoingOffers;
}

export {
  ReturnListings,
  ReturnIncomingOffers,
  ReturnOutgoingOffers
}