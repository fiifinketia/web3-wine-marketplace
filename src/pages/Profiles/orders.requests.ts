import axios, { AxiosResponse } from 'axios';
import { APIKeyString } from 'src/boot/axios';
import {
  TokenIdentifier,
  ListableToken,
} from 'src/shared/models/entities/NFT.model';
import {
  IncomingOffersResponse,
  ListingsResponse,
  OutgoingOffersResponse,
  TransactionResponse,
} from './models/response.models';

async function ReturnListings(
  walletAddress: string,
  sortKey: string,
  brandFilter: string
): Promise<ListingsResponse[]> {
  let listingResponse: ListingsResponse[] = [];
  const body = {
    walletAddress: walletAddress,
    sortKey: sortKey,
    brandFilter: brandFilter,
    apiKey: APIKeyString
  }
  const url = <string>process.env.RETRIEVE_LISTINGS_URL;
  await axios
    .post(url, body)
    .then((f: AxiosResponse<ListingsResponse[]>) => (listingResponse = f.data));
  return listingResponse;
}

async function ReturnIncomingOffers(
  ownedNFTs: TokenIdentifier[],
  sortKey: string,
  brandFilter: string
) {
  let incomingOffers: IncomingOffersResponse[] = [];
  const url = <string>process.env.RETRIEVE_INCOMING_OFFERS_URL;
  const body = {
    sortKey: sortKey,
    ownedNFTs: ownedNFTs,
    brandFilter: brandFilter,
    apiKey: APIKeyString
  };
  await axios
    .post(url, body)
    .then(
      (f: AxiosResponse<IncomingOffersResponse[]>) => (incomingOffers = f.data)
    );
  return incomingOffers;
}

async function ReturnOutgoingOffers(
  walletAddress: string,
  sortKey: string,
  brandFilter: string
) {
  let outgoingOffers: OutgoingOffersResponse[] = [];
  const url = <string>process.env.RETRIEVE_OUTGOING_OFFERS_URL;
  const body = {
    walletAddress: walletAddress,
    sortKey: sortKey,
    brandFilter: brandFilter,
    apiKey: APIKeyString
  }
  await axios
    .post(url, body)
    .then(
      (f: AxiosResponse<OutgoingOffersResponse[]>) => (outgoingOffers = f.data)
    );
  return outgoingOffers;
}

async function ReturnTransactions(
  walletAddress: string,
  sortKey: string,
  brandFilter: string
) {
  let transactions: TransactionResponse[] = [];
  const url = <string>process.env.RETRIEVE_TRANSACTIONS_URL;
  const body = {
    walletAddress: walletAddress,
    sortKey: sortKey,
    brandFilter: brandFilter,
    apiKey: APIKeyString
  }
  await axios
    .post(url, body)
    .then((f: AxiosResponse<TransactionResponse[]>) => (transactions = f.data));
  return transactions;
}

async function ReturnMissingNFTDetails(ownedTokens: TokenIdentifier[]) {
  let updatedOwnedNFTs: ListableToken[] = [];
  const url = <string>process.env.RETRIEVE_MISSING_DETAILS;
  const body = {
    ownedTokens: ownedTokens,
    apiKey: APIKeyString
  }
  await axios
    .post(url, body)
    .then((f: AxiosResponse<ListableToken[]>) => (updatedOwnedNFTs = f.data));
  return updatedOwnedNFTs;
}

export {
  ReturnListings,
  ReturnIncomingOffers,
  ReturnOutgoingOffers,
  ReturnTransactions,
  ReturnMissingNFTDetails,
};
