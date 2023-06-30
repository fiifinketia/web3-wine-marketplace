import { ethers } from 'ethers';
import ERC721ABI from './ABIs/ERC721.json';
import ERC1155ABI from './ABIs/ERC1155.abi.json';
import ERC20ABI from './ABIs/ERC20.abi.json';
import { TOKENTYPE } from 'src/pages/Metadata/models/Metadata';
import { Magic } from 'magic-sdk';

////////////////// Return providers here //////////////////
// TODO: checkout
const magic = new Magic(<string>process.env.MAGIC_LINK_API_KEY, {
  network: {
    rpcUrl: <string>process.env.PROVIDER_URL,
    chainId: parseInt(<string>process.env.PROVIDER_CHAIN_ID),
  },
});

const getMagicProvider = async () => await magic.wallet.getProvider();

const GetWeb3Provider = async () =>
  new ethers.providers.Web3Provider(await getMagicProvider());

const JSONWeb3Provider: ethers.providers.JsonRpcProvider =
  new ethers.providers.JsonRpcProvider(<string>process.env.PROVIDER_URL);

const ERC721_PolygonContract: ethers.Contract = new ethers.Contract(
  <string>process.env.ERC721_CONTRACT_ADDRESS,
  ERC721ABI,
  JSONWeb3Provider
);

const ERC1155_PolygonContract: ethers.Contract = new ethers.Contract(
  <string>process.env.ERC1155_CONTRACT_ADDRESS,
  ERC1155ABI,
  JSONWeb3Provider
);

const ERC20_ContractWithSigner = (
  currencyAddress: string,
  signer: ethers.Signer
) => {
  return new ethers.Contract(currencyAddress, ERC20ABI, signer);
};

const ERC721_ContractWithSigner = (
  tokenAddress: string,
  signer: ethers.Signer
) => {
  return new ethers.Contract(tokenAddress, ERC721ABI, signer);
};

const GetTokenOwnerAddress = async (tokenID: string, tokenType?: TOKENTYPE) => {
  let contract: ethers.Contract;
  if (tokenType === 'ERC721') {
    contract = ERC721_PolygonContract;
  } else if (tokenType === 'ERC1155') {
    throw new Error('ERC1155 not supported yet');
  } else {
    throw new Error('Invalid token type');
  }

  const ownerAddress = await contract.ownerOf(tokenID);
  return ownerAddress as string;
};

export {
  GetWeb3Provider,
  getMagicProvider,
  magic,
  JSONWeb3Provider,
  ERC721_PolygonContract,
  ERC1155_PolygonContract,
  ERC20_ContractWithSigner,
  ERC721_ContractWithSigner,
  GetTokenOwnerAddress,
};
