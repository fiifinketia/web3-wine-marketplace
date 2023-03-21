import axios from 'axios';
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
    nft = await axios
      .get(
        `${process.env.MARKETPLACE_API_URL}/market/single/investment/?identifierOrCriteria=${req.id}&contractAddress=${req.contractAddress}&network=${req.network}&walletAddress=${req.walletAddress}&timestamp=${timeStamp}`
      )
      .then(res => res.data);
    return nft;
  } catch (error) {
    throw error;
  }
}
