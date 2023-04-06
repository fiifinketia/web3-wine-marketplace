import axios from 'axios';
import { APIKeyString } from 'src/boot/axios';
import { NFTWithListingAndFavorites, SeaportTransactionsModel } from '../models/Metadata';

const timeStamp = new Date().getTime();

async function GetMetadata(req: {
  identifierOrCriteria: string;
  contractAddress: string;
  network: string;
  walletAddress: string;
}): Promise<NFTWithListingAndFavorites> {
  try {
    let nft: NFTWithListingAndFavorites = {} as NFTWithListingAndFavorites;
    const { identifierOrCriteria, contractAddress, network, walletAddress } = req;
    const body = {
      apiKey: APIKeyString,
      identifierOrCriteria: identifierOrCriteria,
      contractAddress: contractAddress,
      network: network,
      walletAddress: walletAddress,
    }
    nft = await axios
      .post(
        `${process.env.RETRIEVE_METADATA_URL}/?timestamp=${timeStamp}`,
        body
      )
      .then(res => res.data);
    return nft;
  } catch (error) {
    throw error;
  }
}

async function GetTokenTXNHistory(req: {
  identifierOrCriteria: string,
  contractAddress: string,
  network: string
}) : Promise<{
  txns: SeaportTransactionsModel[],
  chartData: number[][]
}> {
  try {
    let txnHistory = {} as {
      txns: SeaportTransactionsModel[],
      chartData: number[][]
    };
    const { identifierOrCriteria, contractAddress, network } = req;
    const body = {
      apiKey: APIKeyString,
      identifierOrCriteria: identifierOrCriteria,
      contractAddress: contractAddress,
      network: network
    }
    txnHistory = await axios
      .post(
        `${process.env.RETRIEVE_TXN_HISTORY_URL}`,
        body
      )
      .then(res => res.data)
    return txnHistory;
  } catch (error) {
    throw error;
  }
}

export {
  GetMetadata,
  GetTokenTXNHistory
}