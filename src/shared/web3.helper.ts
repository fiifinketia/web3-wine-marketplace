import { ethers } from 'ethers';
import NewWivPolygonABI from './ABIs/WiVNewPolygon.abi.json';
import NewWivMumbaiABI from './ABIs/WiVNewPolygonMUMBAI.abi.json';
import ERC1155MumbaiABI from './ABIs/WiVERC1155MumbaiContract.abi.json';

////////////////// Return providers here //////////////////
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

const ERC1155PolygonCollectionContract_MumbaiInstance: ethers.Contract =
	new ethers.Contract(
		<string>process.env.ERC1155_CONTRACT_ADDRESS_MUMBAI,
		ERC1155MumbaiABI,
		Web3MumbaiProvider
	);

export {
	Web3MumbaiProvider,
	Web3PolygonProvider,
	NewPolygonCollectionContract_MumbaiInstance,
	NewPolygonCollectionContract_PolygonInstance,
	ERC1155PolygonCollectionContract_MumbaiInstance,
};
