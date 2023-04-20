import { Seaport } from '@opensea/seaport-js';
import { ethers, utils } from 'ethers';
import {
  ChainID,
  ItemType,
  OrderListingModel,
  RetrieveListingResponse,
  SeaportInstance,
  UpdateListingRequest,
} from '../models/Orders';

import axios from 'axios';
import {
  OrderComponents,
  OrderParameters,
} from '@opensea/seaport-js/lib/types';
import { APIKeyString } from 'src/boot/axios';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

declare let window: Window;

const RandomIdGenerator = () => {
  return Date.now();
};


export async function GetBlockNumber(): Promise<number> {
	const web3 = new ethers.providers.Web3Provider(window.ethereum);
	return await web3.getBlockNumber();
}

export async function GetWeb3(): Promise<SeaportInstance> {
  const web3 = new ethers.providers.Web3Provider(window.ethereum);
  const chainId = (await web3.getNetwork()).chainId;
  let network = '';
  switch (chainId) {
    case ChainID.ETHEREUM:
      network = 'Ethereum';
      break;
    case ChainID.POLYGON:
      network = 'Polygon';
      break;
    case ChainID.RINKEBY:
      network = 'Rinkeby';
      break;
    case ChainID.MUMBAI:
      network = 'Mumbai';
  }
  const seaport = new Seaport(web3);
  const seaportInstance: SeaportInstance = {
    seaport: seaport,
    network: network,
  };
  return seaportInstance;
}

export async function CreateERC721Listing(
  tokenID: string,
  smartContractAddress: string,
  brand: string,
  image: string,
  address: string,
  listingPrice: string,
  expirationDate: string
) {
  listingPrice = utils.parseEther(listingPrice).toString();
	const { seaport, network } = await GetWeb3();
	const blockNumber = await GetBlockNumber();
	const { executeAllActions } = await seaport.createOrder(
		{
			offer: [
				// owner's offer
				{
					itemType: ItemType.ERC721,
					token: smartContractAddress,
					identifier: tokenID,
				},
			],
			consideration: [
				// owner's ask
				{
					amount: listingPrice,
					recipient: address,
					// TODO: CHANGE IN PRODUCTION
					token: process.env.MARKETPLACE_CURRENCY,
				},
			],
			fees: [
				{
					basisPoints: Number(process.env.WIV_FEE),
					recipient:
						process.env.WIV_FEE_RECEIVER ||
						'0xF0377dF3235e4F5B3e38DB494e601Edf3567eF9A',
				},
			],
			endTime: Math.round(new Date(expirationDate).getTime() / 1000).toString(),
		},
		address
	);
	const order = await executeAllActions();
	const { transact } = seaport.validate([order]);
	const txn = await transact();
	const orderHash = seaport.getOrderHash({ ...order.parameters });
	const db_Order: OrderListingModel = {
		parameters: order.parameters,
		signature: order.signature,
		orderHash: orderHash,
		network: network,
		from: 'Owner', // process env here
		contractAddress: smartContractAddress,
		identifierOrCriteria: tokenID,
		brand: brand,
		image: image,
		nonce: txn.nonce
	};
	const OrderRequest = {
		order: db_Order,
		notificationID: RandomIdGenerator(),
		blockNumber: blockNumber,
		apiKey: APIKeyString
	};
	const createOrderURL = <string>process.env.CREATE_ORDER_URL;
	axios.post(createOrderURL, OrderRequest);
}

export async function InspectListingStatus(nft: TokenIdentifier) : Promise <false | { listingPrice: string, currency: string, transactionStatus: boolean }> {
	const url = <string> process.env.RETRIEVE_LISTING_STATUS;
	let status = false;
	await axios
		.post(url, {...nft, apiKey: APIKeyString})
		.then(res => {
			status = res.data;
		});
	return status;
}

export async function CreateERC1155Listing(
  tokenID: string,
  smartContractAddress: string,
  brand: string,
  image: string,
  address: string,
  listingPrice: string,
  expirationDate: string,
  amount: string
) {
  // const wivaContract = '0xC1d6EF502Ac5410B3F3706beb6a0808131337Fb6';
  // const wivaContract = '0xA00055e6EE4D1f4169096EcB682F70cAa8c29987';
  listingPrice = utils.parseEther(listingPrice).toString();
  // const testDate = new Date('2022-08-24T14:31:18.067Z');
  // const testDate2 = Math.round(testDate.getTime()/1000).toString();

  const { seaport, network } = await GetWeb3();
  const { executeAllActions } = await seaport.createOrder(
    {
      offer: [
        // owner's offer
        {
          itemType: ItemType.ERC1155,
          token: smartContractAddress,
          identifier: tokenID,
          amount: amount,
        },
      ],
      consideration: [
        // owner's ask
        {
          amount: listingPrice,
          recipient: address,
          token: process.env.MARKETPLACE_CURRENCY,
        },
      ],
      fees: [
        {
          basisPoints: Number(process.env.WIV_FEE),
          recipient:
            process.env.WIV_FEE_RECEIVER ||
            '0xF0377dF3235e4F5B3e38DB494e601Edf3567eF9A',
        },
      ],
      endTime: Math.round(new Date(expirationDate).getTime() / 1000).toString(),
    },
    address
  );
  const order = await executeAllActions();
  const { transact } = seaport.validate([order]);
  const txn = await transact();
  const orderHash = seaport.getOrderHash({ ...order.parameters });
  const db_Order: OrderListingModel = {
    parameters: order.parameters,
    signature: order.signature,
    orderHash: orderHash,
    network: network,
    from: 'Owner', // process env here
    contractAddress: smartContractAddress,
    identifierOrCriteria: tokenID,
    brand: brand,
    image: image,
    nonce: txn.nonce,
  };
  const OrderRequest = {
    order: db_Order,
    notificationID: RandomIdGenerator(),
		apiKey: APIKeyString
  };
  const createOrderURL = <string>process.env.CREATE_ORDER_URL;
  axios.post(createOrderURL, OrderRequest);
}

export async function CreateERC721Offer(
  tokenID: string,
  smartContractAddress: string,
  brand: string,
  image: string,
  address: string,
  offerPrice: string,
  expirationDate: string
) {
  // const wivaContract = '0xC1d6EF502Ac5410B3F3706beb6a0808131337Fb6';
  // const wivaContract = '0xA00055e6EE4D1f4169096EcB682F70cAa8c29987';
  // const feeReceiver = '0xF0377dF3235e4F5B3e38DB494e601Edf3567eF9A';
  offerPrice = utils.parseEther(offerPrice).toString();

	const blockNumber = await GetBlockNumber();
	const { seaport, network } = await GetWeb3();
	const { executeAllActions } = await seaport.createOrder(
		{
			offer: [
				// buyer's offer
				{
					amount: offerPrice,
					token: process.env.MARKETPLACE_CURRENCY,
				},
			],
			consideration: [
				// buyer's ask
				{
					itemType: ItemType.ERC721,
					token: smartContractAddress,
					identifier: tokenID,
					recipient: address, // recipient for token is the buyer
				},
			],
			fees: [
				{
					basisPoints: Number(process.env.WIV_FEE),
					recipient:
						process.env.WIV_FEE_RECEIVER ||
						'0xF0377dF3235e4F5B3e38DB494e601Edf3567eF9A',
				},
			],
			domain: 'Seaport',
			endTime: Math.round(new Date(expirationDate).getTime() / 1000).toString(),
		},
		address
	);
	const order = await executeAllActions();
	const { transact } = seaport.validate([order]);
	const txn = await transact();
	const orderHash = seaport.getOrderHash({ ...order.parameters });
	const db_Order: OrderListingModel = {
		parameters: order.parameters,
		signature: order.signature,
		orderHash: orderHash,
		network: network,
		from: 'Buyer', // process env here
		contractAddress: smartContractAddress,
		identifierOrCriteria: tokenID,
		brand: brand,
		image: image,
		highestBid: offerPrice,
		nonce: txn.nonce
	};
	const OrderRequest = {
		order: db_Order,
		notificationID: RandomIdGenerator(),
		blockNumber: blockNumber,
		apiKey: APIKeyString
	};
	const createOrderURL = <string>process.env.CREATE_ORDER_URL;
	await axios.post(createOrderURL, OrderRequest);
}

export async function FulfillBasicOrder(
  orderHash: string,
  brand: string,
  owner: boolean,
  address: string,
  image: string
) {
	if (!address) {
		throw 'Check Metamask connection.'
	}
	const { seaport } = await GetWeb3();
	const retrieveOrderUrl = <string>process.env.RETRIEVE_ORDER_URL;
	const body = {
		apiKey: APIKeyString,
		orderHash: orderHash
	}
	const order: RetrieveListingResponse = await axios
		.post(retrieveOrderUrl, body)
		.then(result => {
			const data = result.data;
			return {
				parameters: data.parameters,
				signature: data.signature,
				network: data.network,
				identifierOrCriteria: data.identifierOrCriteria,
				contractAddress: data.contractAddress,
			};
		});
	const blockNumber = await GetBlockNumber();
	const { executeAllActions: executeAllFulfillActions } =
		await seaport.fulfillOrder({
			order: {
				parameters: order.parameters,
				signature: order.signature,
			},
		});

  const txn = await executeAllFulfillActions();

	const updateOrder: UpdateListingRequest & { apiKey: string } = {
		notificationID: RandomIdGenerator(),
		identifierOrCriteria: order.identifierOrCriteria,
		contractAddress: order.contractAddress,
		orderHash: orderHash,
		network: order.network,
		brand: brand,
		isOwner: owner,
		walletAddress: address,
		offerer: order.parameters.offerer,
		image: image,
		nonce: txn.nonce,
		blockNumber: blockNumber,
		apiKey: <string> APIKeyString
	};
	const fulfillOrderURL = <string>process.env.FULFILL_ORDER_URL;
	axios.post(fulfillOrderURL, updateOrder);
}

export async function CancelSingleOrder(orderHash: string, walletAddress: string) {
	if (!!walletAddress) {
		const retrieveOrderUrl = <string>process.env.RETRIEVE_ORDER_URL;
		const body = {
			apiKey: APIKeyString,
			orderHash: orderHash
		}
		const order: OrderComponents = await axios
			.post(retrieveOrderUrl, body)
			.then((result) => {
				const data = result.data;
				return {
					...(<OrderParameters & { counter: number }>data.parameters),
					signature: <string>data.signature,
				};
			});
		const { seaport } = await GetWeb3();
		const blockNumber = await GetBlockNumber();
		const { transact } = seaport.cancelOrders([order]);
		const txn = await transact();
		const cancelOrderURL = <string>process.env.CANCEL_ORDER_URL;
		const requestToCancel = {
			orderHash: orderHash,
			walletAddress: walletAddress,
			nonce: txn.nonce,
			blockNumber: blockNumber,
			apiKey: APIKeyString
		};
		axios.post(cancelOrderURL, requestToCancel);
	}
}
