import { Seaport } from '@opensea/seaport-js';
import { BigNumber, ethers, utils } from 'ethers';
import { ChainID, ItemType } from '../models/Request.models/Seaport.constants';
import { OpenSeaSDK } from 'opensea-js';
import {
	OrderListingModel,
	OrderRequest,
	SeaportInstance,
	TokenIdentifier,
	UpdateListingRequest,
} from '../models/Request.models/Seaport.Request.models';
import { RetrieveListingResponse } from '../models/Response.models/Seaport.Response.models';
import axios from 'axios';
import { OrderComponents } from '@opensea/seaport-js/lib/types';
import { useUserStore } from 'src/stores/user-store';
import Web3 from 'web3';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

declare let window: any; // eslint-disable-line
const GETParams = {
	params: {
		t: new Date().getTime(),
	},
};

export async function CreateOrder(
	tokenID: string,
	smartContractAddress: string,
	brand: string,
	address: string
) {
	console.log(brand);
	const wivaContract = '0xC1d6EF502Ac5410B3F3706beb6a0808131337Fb6';
	// const wivaContract = '0xA00055e6EE4D1f4169096EcB682F70cAa8c29987';
	const askAmount = utils.parseEther('100').toString();
	const feeReceiver = '0xF0377dF3235e4F5B3e38DB494e601Edf3567eF9A';
	// const testDate = new Date('2022-08-24T14:31:18.067Z');
	// const testDate2 = Math.round(testDate.getTime()/1000).toString();

	const { seaport, network } = await GetWeb3();
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
					amount: askAmount,
					recipient: address,
					token: wivaContract,
				},
			],
			fees: [
				{
					basisPoints: 250,
					recipient: feeReceiver,
				},
			],
			// endTime: testDate2
		},
		address
	);
	const order = await executeAllActions();
	const { transact } = seaport.validate([order]);
	const { hash } = await transact();
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
	};
	const OrderRequest = {
		order: db_Order,
		notificationID: RandomIdGenerator(),
	};
	axios.post(
		'http://localhost:8080/api/market/order/listing/order.list',
		OrderRequest
	);
}

export async function CreateOrderERC1155(
	tokenID: string,
	smartContractAddress: string,
	brand: string,
	address: string,
	amount: string
) {
	const wivaContract = '0xC1d6EF502Ac5410B3F3706beb6a0808131337Fb6';
	// const wivaContract = '0xA00055e6EE4D1f4169096EcB682F70cAa8c29987';
	const askAmount = utils.parseEther('100').toString();
	const feeReceiver = address;
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
					amount: askAmount,
					recipient: address,
					token: wivaContract,
				},
			],
			fees: [
				{
					basisPoints: 250,
					recipient: feeReceiver,
				},
			],
			// endTime: testDate2
		},
		address
	);
	const order = await executeAllActions();
	const { transact } = seaport.validate([order]);
	const { hash } = await transact();
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
	};
	const OrderRequest = {
		order: db_Order,
		notificationID: RandomIdGenerator(),
	};
	axios.post(
		'http://localhost:8080/api/market/order/listing/order.list',
		OrderRequest
	);
}

export async function CreateOffer(
	tokenID: string,
	smartContractAddress: string,
	brand: string,
	address: string
) {
	const wivaContract = '0xC1d6EF502Ac5410B3F3706beb6a0808131337Fb6';
	// const wivaContract = '0xA00055e6EE4D1f4169096EcB682F70cAa8c29987';
	const askAmount = utils.parseEther('100').toString();
	const feeReceiver = '0xF0377dF3235e4F5B3e38DB494e601Edf3567eF9A';

	const { seaport, network } = await GetWeb3();
	const { executeAllActions } = await seaport.createOrder(
		{
			offer: [
				// buyer's offer
				{
					token: wivaContract,
					amount: askAmount,
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
					basisPoints: 250,
					recipient: feeReceiver,
				},
			],
			domain: 'Seaport',
		},
		address
	);
	const order = await executeAllActions();
	const { transact } = seaport.validate([order]);
	const { hash } = await transact();
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
	};
	const OrderRequest = {
		order: db_Order,
		notificationID: RandomIdGenerator(),
	};
	axios.post(
		'http://localhost:8080/api/market/order/listing/order.list',
		OrderRequest
	);
}

export async function FulfillBasicOrder(
	orderHash: string,
	brand: string,
	owner: boolean,
	address: string
) {
	const { seaport, network } = await GetWeb3();
	const order: RetrieveListingResponse = await axios
		.get(
			`http://localhost:8080/api/market/single/getOrderParameters?orderHash=${orderHash}`,
			GETParams
		)
		.then((result) => {
			const data = result.data;
			return {
				parameters: data.parameters,
				signature: data.signature,
				network: data.network,
				identifierOrCriteria: data.identifierOrCriteria,
				contractAddress: data.contractAddress,
			};
		});
	console.log(order);
	const { executeAllActions: executeAllFulfillActions } =
		await seaport.fulfillOrder({
			order: {
				parameters: order.parameters,
				signature: order.signature,
			},
		});
	const { hash } = await executeAllFulfillActions();

	const updateOrder: UpdateListingRequest = {
		notificationID: RandomIdGenerator(),
		identifierOrCriteria: order.identifierOrCriteria,
		contractAddress: order.contractAddress,
		orderHash: orderHash,
		network: order.network,
		brand: brand,
		isOwner: owner,
		walletAddress: address,
	};
	axios.post(
		'http://localhost:8080/api/market/order/fulfill/order.fulfill',
		updateOrder
	);
}

export async function GetWeb3(): Promise<SeaportInstance> {
	const web3 = new ethers.providers.Web3Provider(window.ethereum);
	const signer = web3.getSigner();
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
	const seaport = new Seaport(signer);
	const seaportInstance: SeaportInstance = {
		seaport: seaport,
		network: network,
	};
	return seaportInstance;
}

export async function CancelSelectOrders(orderHashes: string[]) {
	let orders: OrderComponents[] = [];
	await axios
		.post('http://localhost:4200/seaport/cancelSelectOrders/', orderHashes)
		.then((res) => {
			orders = res.data;
		});
	const { seaport } = await GetWeb3();
	const { transact } = seaport.cancelOrders(orders);
	await transact();
	axios.post(
		'http://localhost:4200/seaport/updateCancelledOrders/',
		orderHashes
	);
}

const RandomIdGenerator = () => {
	return Date.now();
};
