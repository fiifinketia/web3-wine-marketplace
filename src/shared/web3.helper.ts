import { ethers } from 'ethers';
import NewWivPolygonABI from './ABIs/WiVNewPolygon.abi.json';
import NewWivMumbaiABI from './ABIs/WiVNewPolygonMUMBAI.abi.json';
import ERC1155MumbaiABI from './ABIs/WiVERC1155MumbaiContract.abi.json';
import ERC20ABI from './ABIs/ERC20.abi.json';

////////////////// Return providers here //////////////////
const WindowWeb3Provider: ethers.providers.Web3Provider =
  new ethers.providers.Web3Provider(window.ethereum);

const Web3MumbaiProvider: ethers.providers.JsonRpcProvider =
  new ethers.providers.JsonRpcProvider(<string>process.env.MUMBAI_PROVIDER_URL);

const Web3PolygonProvider: ethers.providers.JsonRpcProvider =
  new ethers.providers.JsonRpcProvider(
    <string>process.env.POLYGON_PROVIDER_URL
  );

const NewPolygonCollectionContract_PolygonInstance: ethers.Contract =
  new ethers.Contract(
    <string>process.env.ERC721_CONTRACT_ADDRESS_POLYGON,
    NewWivPolygonABI,
    Web3PolygonProvider
  );

const NewPolygonCollectionContract_MumbaiInstance: ethers.Contract =
  new ethers.Contract(
    <string>process.env.ERC721_CONTRACT_ADDRESS_MUMBAI,
    NewWivMumbaiABI,
    Web3MumbaiProvider
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
    NewWivPolygonABI,
    signer
  )
}

const ERC1155PolygonCollectionContract_MumbaiInstance: ethers.Contract =
  new ethers.Contract(
    <string>process.env.ERC1155_CONTRACT_ADDRESS_MUMBAI,
    ERC1155MumbaiABI,
    Web3MumbaiProvider
  );

export {
  WindowWeb3Provider,
  Web3MumbaiProvider,
  Web3PolygonProvider,
  NewPolygonCollectionContract_MumbaiInstance,
  NewPolygonCollectionContract_PolygonInstance,
  ERC1155PolygonCollectionContract_MumbaiInstance,
  // CURRENCY CONTRACTS
  ERC20_ContractWithSigner,
  ERC721_ContractWithSigner
};
