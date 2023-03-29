import axios, { AxiosResponse } from 'axios';
import { ListingWithPricingAndImage } from '../models/Response.models';
import { APIKeyString } from 'src/boot/axios';

async function GetNFTsFromRegion (walletAddress: string, region: string) {
  const url = <string>process.env.RETRIEVE_NEWLY_ADDED_REGION_NFTS_URL;
  const body = {
    walletAddress: walletAddress,
    region: region,
    apiKey: APIKeyString
  }
  const result = await axios
    .post(url, body)
    .then(
      (res: AxiosResponse<ListingWithPricingAndImage[]>) =>
        res.data
    );
  return result;
}

async function GetNewListings (walletAddress: string) {
  const url = <string>process.env.RETRIEVE_NEWLY_LISTED_NFTS_URL;
  const body = {
    walletAddress: walletAddress,
    apiKey: APIKeyString
  }
  const result = await axios
    .post(url, body)
    .then(
      (res: AxiosResponse<ListingWithPricingAndImage[]>) =>
        res.data
    );
  return result;
}

async function GetLatestMinted (walletAddress: string) {
  const url = <string>process.env.RETRIEVE_NEWLY_MINTED_NFTS_URL;
  const body = {
    walletAddress: walletAddress,
    apiKey: APIKeyString
  }
  const result = await axios
    .post(url, body)
    .then(
      (res: AxiosResponse<ListingWithPricingAndImage[]>) =>
        res.data
    );
  return result;
}

export {
  GetNFTsFromRegion,
  GetNewListings,
  GetLatestMinted
}