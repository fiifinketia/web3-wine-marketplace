import axios from 'axios';
import { APIKeyString } from 'src/boot/axios';
import { NFTWithListingAndFavorites } from '../models/Metadata';

const timeStamp = new Date().getTime();

export async function GetMetadata(req: {
  id: string;
  contractAddress: string;
  network: string;
  walletAddress: string;
}): Promise<NFTWithListingAndFavorites> {
  try {
    let nft: NFTWithListingAndFavorites = {} as NFTWithListingAndFavorites;
    const body = {
      apiKey: APIKeyString,
      identifierOrCriteria: req.id,
      contractAddress: req.contractAddress,
      network: req.network,
      walletAddress: req.walletAddress,
    }
    nft = await axios
      .post(
        `${process.env.MARKETPLACE_API_URL}/market/single/investment/?timestamp=${timeStamp}`,
        body
      )
      .then(res => res.data);
    return nft;
  } catch (error) {
    throw error;
  }
}
