import { ethers } from 'ethers';
import ERC721ABI from './ABIs/ERC721.json';
import ERC1155ABI from './ABIs/ERC1155.abi.json';
import ERC20ABI from './ABIs/ERC20.abi.json';

////////////////// Return providers here //////////////////
const WindowWeb3Provider: ethers.providers.Web3Provider | undefined =
  window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : undefined;

const JSONWeb3Provider: ethers.providers.JsonRpcProvider =
  new ethers.providers.JsonRpcProvider(<string>process.env.PROVIDER_URL);

const ERC721_PolygonContract: ethers.Contract =
  new ethers.Contract(
    <string>process.env.ERC721_CONTRACT_ADDRESS,
    ERC721ABI,
    JSONWeb3Provider
  );

const ERC1155_PolygonContract: ethers.Contract =
new ethers.Contract(
  <string>process.env.ERC1155_CONTRACT_ADDRESS,
  ERC1155ABI,
  JSONWeb3Provider
);

const ERC20_ContractWithSigner = (currencyAddress: string, signer: ethers.Signer) => {
  return new ethers.Contract(
    currencyAddress,
    ERC20ABI,
    signer
  )
}

const ERC721_ContractWithSigner = (tokenAddress: string, signer: ethers.Signer) => {
  return new ethers.Contract(
    tokenAddress,
    ERC721ABI,
    signer
  )
}

export {
  WindowWeb3Provider,
  JSONWeb3Provider,
  ERC721_PolygonContract,
  ERC1155_PolygonContract,
  ERC20_ContractWithSigner,
  ERC721_ContractWithSigner
};
