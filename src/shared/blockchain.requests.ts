import axios, { AxiosRequestConfig } from 'axios';
import { ethers, utils } from 'ethers';
import { TokenIdentifier } from './models/entities/NFT.model';
import { MoralisAddressNFTs } from './models/response/moralis.response';
import { EventLog } from './models/response/polygonscan.response';
import {
  ERC1155PolygonCollectionContract_MumbaiInstance,
  NewPolygonCollectionContract_MumbaiInstance,
} from './web3.helper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isInt = (n: any) => {
  return parseInt(n) === n;
};

// Moralis API request builder and response
async function MoralisRequestAndResponse(
  contractAddresses: string[] | string,
  walletAddress: string
): Promise<MoralisAddressNFTs[]> {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `https://deep-index.moralis.io/api/v2/${walletAddress}/nft`,
    params: {
      chain: 'mumbai',
      format: 'decimal',
      token_addresses: contractAddresses,
      normalizeMetadata: 'false',
    },
    headers: {
      accept: 'application/json',
      'X-API-Key':
        'Pw7D7seAn4GwKQCQgX07kdI2kTvSgaBM7OAvvkx6DQF2GRjPjKEYp7O3uu15YVPG',
    },
  };
  const req = await axios.request(options).then(res => res.data.result);
  return <MoralisAddressNFTs[]>req;
}

// Filters out value token IDs as they are not ERC1155 NFTs of interest
function ReturnTokenTransactionDetails(
  v: string,
  index: number
): { tokenID: string; amount: number } | undefined {
  const value = v.substring(0, index) + ',' + v.substring(index);
  const tokenIDAndAmount: string[] = value.split(',');

  // convert hexadecimal to int
  const tokenID = parseInt(tokenIDAndAmount[0], 16);
  const amount = parseInt(tokenIDAndAmount[1], 16);

  if (!isInt(tokenID)) return;

  const tokenDetails = {
    tokenID: tokenID.toString(),
    amount: amount,
  };
  return tokenDetails;
}

// Checks the ownership of the ERC1155 token
async function CheckOwnerOfERC1155Token(
  tokenID: string,
  walletAddress: string,
  ERC1155Contract: ethers.Contract
): Promise<null | string> {
  const { _hex } = <{ _hex: string; _isBigNumber: true }>(
    await ERC1155Contract.balanceOf(walletAddress, tokenID)
  );
  const amount = parseInt(_hex, 16);
  if (amount > 0) {
    return tokenID;
  } else {
    return null;
  }
}

// Deconstructs event log to get the list of ERC1155 tokenIDs
// Checks whether the list of tokenIDs are owned by the wallet as some latest transfer events may equate to not owning the NFT
async function DeconstructEventLog(
  transferredToRes: EventLog[],
  transferredFromRes: EventLog[],
  walletAddress: string
): Promise<string[]> {
  const transferredToAndFromMap: Map<
    string,
    { tokenID: string; amount: number }
  > = new Map();
  const tokensToCheckForValueTokensPromise: Promise<string | null>[] = [];

  // Merge two arrays into a map so we can get unique tokenIDs
  transferredToRes
    .map(f => ReturnTokenTransactionDetails(f.data.slice(2), 64))
    .filter(f => !!f)
    .filter(f => <number>f?.amount > 0)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .forEach(f => transferredToAndFromMap.set(<string>f?.tokenID, f!));
  transferredFromRes
    .map(f => ReturnTokenTransactionDetails(f.data.slice(2), 64))
    .filter(f => !!f)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .forEach(f => transferredToAndFromMap.set(<string>f?.tokenID, f!));

  const ERC1155Contract = ERC1155PolygonCollectionContract_MumbaiInstance;

  transferredToAndFromMap.forEach((v, k) => {
    tokensToCheckForValueTokensPromise.push(
      CheckOwnerOfERC1155Token(k, walletAddress, ERC1155Contract)
    );
  });

  const removeUnowned = await Promise.all(
    tokensToCheckForValueTokensPromise
  ).then(res => {
    return <string[]>res.filter(f => !!f);
  });

  return removeUnowned;
}

// Fetch ERC721 tokens of address using blockchain
async function FetchERC721TokensStandard(
  walletAddress: string
): Promise<Map<string, TokenIdentifier>> {
  const ERC721Map: Map<string, TokenIdentifier> = new Map();
  const ERC721Contract = NewPolygonCollectionContract_MumbaiInstance;
  let { _hex: balance } = <{ _hex: string | number; _isBigNumber: boolean }>(
    await ERC721Contract.balanceOf(walletAddress)
  );

  const asyncFetchTokenID = async (i: number) => {
    return +(await ERC721Contract.tokenOfOwnerByIndex(walletAddress, i));
  };

  const awaitingTokenIDs: Promise<number>[] = [];

  balance = parseInt(<string>balance, 16);

  for (let i = 0; i < balance; i++) {
    awaitingTokenIDs.push(asyncFetchTokenID(i));
  }

  await Promise.all(awaitingTokenIDs).then((tokenIDs: number[]) => {
    const contractAddress = <string>process.env.ERC721_CONTRACT_ADDRESS_MUMBAI;
    tokenIDs.forEach(f => {
      ERC721Map.set(`${f.toString()},${contractAddress},Mumbai`, {
        identifierOrCriteria: f.toString(),
        contractAddress: contractAddress,
        network: 'Mumbai',
      });
    });
  });

  return ERC721Map;
}

// Fetch ERC1155 tokens
// First re-calls Moralis, if fails then etherscan
async function FetchERC1155TokensOptions(
  walletAddress: string
): Promise<Map<string, TokenIdentifier>> {
  const ERC1155Map: Map<string, TokenIdentifier> = new Map();

  try {
    const MoralisResponse = await MoralisRequestAndResponse(
      <string>process.env.ERC1155_CONTRACT_ADDRESS_MUMBAI,
      walletAddress
    );

    MoralisResponse.forEach(f => {
      const tokenID = parseInt(f.token_id, 16);
      if (!!isInt(tokenID)) {
        const token: TokenIdentifier = {
          identifierOrCriteria: f.token_id,
          network: 'Mumbai',
          contractAddress: f.token_address,
        };
        ERC1155Map.set(`${f.token_id},${f.token_address},Mumbai`, token);
      }
    });
  } catch {
    const topic0 = <string>process.env.LOGS_TOPIC_0_ERC1155;
    const fromBlock = <string>process.env.FROM_BLOCK;
    const toBlock = <string>process.env.TO_BLOCK;
    const contractAddress = <string>process.env.ERC1155_CONTRACT_ADDRESS_MUMBAI;
    const mumbaiScanURL = <string>process.env.MUMBAI_SCAN_API_URL;

    const hexedAddress = utils.hexZeroPad(walletAddress.toLowerCase(), 32);

    // Get transferred from/to wallet address to get all ERC1155 transfers
    const [transferredToRes, transferredFromRes] = await Promise.all([
      axios
        .post(
          `${mumbaiScanURL}?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${toBlock}&address=${contractAddress}&topic0=${topic0}&topic0_3_opr=and&topic3=${hexedAddress}`
        )
        .then(response => response.data.result),
      axios
        .post(
          `${mumbaiScanURL}?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${toBlock}&address=${contractAddress}&topic0=${topic0}&topic0_2_opr=and&topic2=${hexedAddress}`
        )
        .then(response => response.data.result),
    ]);

    // Check each token for value token existence in smart contract
    // Needed to know whether it's transferrable or not
    const tokensToCheckForValueTokenExistence = await DeconstructEventLog(
      transferredToRes,
      transferredFromRes,
      walletAddress
    );

    tokensToCheckForValueTokenExistence.forEach(f => {
      const token: TokenIdentifier = {
        identifierOrCriteria: f,
        network: 'Mumbai',
        contractAddress: contractAddress.toLowerCase(),
      };
      ERC1155Map.set(`${f},${token.contractAddress},Mumbai`, token);
    });
  }
  return ERC1155Map;
}

async function GetAllNFTsForAddressStandard(walletAddress: string): Promise<{
  ERC1155Map: Map<string, TokenIdentifier>;
  ERC721Map: Map<string, TokenIdentifier>;
}> {
  const [ERC721Map, ERC1155Map]: Map<string, TokenIdentifier>[] =
    await Promise.all([
      FetchERC721TokensStandard(walletAddress),
      FetchERC1155TokensOptions(walletAddress),
    ]);

  return {
    ERC1155Map,
    ERC721Map,
  };
}

// Use Moralis to get all NFTs (1155 or 721s)
async function GetAllNFTsForAddressMoralis(walletAddress: string): Promise<{
  ERC1155Map: Map<string, TokenIdentifier>;
  ERC721Map: Map<string, TokenIdentifier>;
}> {
  const MoralisResponse = await MoralisRequestAndResponse(
    [
      <string>process.env.ERC721_CONTRACT_ADDRESS_MUMBAI,
      <string>process.env.ERC1155_CONTRACT_ADDRESS_MUMBAI,
    ],
    walletAddress
  );

  const ERC1155Map: Map<string, TokenIdentifier> = new Map();
  const ERC721Map: Map<string, TokenIdentifier> = new Map();

  MoralisResponse.forEach(f => {
    const token: TokenIdentifier = {
      identifierOrCriteria: f.token_id,
      network: 'Mumbai',
      contractAddress: utils.getAddress(f.token_address),
    };
    if (
      f.token_address ==
      (<string>process.env.ERC1155_CONTRACT_ADDRESS_MUMBAI).toLowerCase()
    ) {
      const tokenID = parseInt(f.token_id, 16);
      if (!!isInt(tokenID)) {
        ERC1155Map.set(`${f.token_id},${f.token_address},Mumbai`, token);
      }
    } else ERC721Map.set(`${f.token_id},${f.token_address},Mumbai`, token);
  });

  return {
    ERC1155Map,
    ERC721Map,
  };
}

async function FetchOwnedNFTs(walletAddress: string) {
  let ownedTokens: TokenIdentifier[] = [];
  let FinalERC721Map: Map<string, TokenIdentifier> = new Map();
  // let FinalERC1155Map: Map<string, TokenIdentifier> = new Map();
  try {
    await GetAllNFTsForAddressMoralis(walletAddress).then(({ ERC721Map }) => {
      // FinalERC1155Map = ERC1155Map;
      FinalERC721Map = ERC721Map;
    });
  } catch {
    await GetAllNFTsForAddressStandard(walletAddress).then(({ ERC721Map }) => {
      // FinalERC1155Map = ERC1155Map;
      FinalERC721Map = ERC721Map;
    });
  }
  ownedTokens = [...Array.from(FinalERC721Map.values())];
  return ownedTokens;
}

export { FetchOwnedNFTs };
