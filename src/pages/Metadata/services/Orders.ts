import { Seaport } from '@opensea/seaport-js';
import { ethers, utils } from 'ethers';
import {
  ChainID,
  ItemType,
  OrderModel,
  RetrieveListingResponse,
  SeaportInstance,
  FulfillOrderRequest,
} from '../models/Orders';

import axios from 'axios';
import {
  OrderComponents,
  OrderParameters,
} from '@opensea/seaport-js/lib/types';
import { APIKeyString } from 'src/boot/axios';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
import { balanceAndApprovals, HandleFulfillmentApprovals } from 'src/shared/balanceAndApprovals';
import { ERC20_ContractWithSigner, ERC721_ContractWithSigner, WindowWeb3Provider } from 'src/shared/web3.helper';
import { UserModel } from 'src/components/models';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

declare let window: Window;

const RandomIdGenerator = () => {
  return Date.now();
};

function SetExpDate(expDate: string) : string{
	return (
		Math.round(new Date(expDate).getTime() / 1000) + 24 * 60 * 60
	).toString()
}

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
  const seaport = new Seaport(web3, { balanceAndApprovalChecksOnOrderCreation: false, seaportVersion: '1.4' });
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
	listingCurrency: string,
  expirationDate: string
) {
	const signer = WindowWeb3Provider?.getSigner();
  if(!signer) throw new Error('Please reconnect/install Metamask wallet to continue');
	const ERC721Contract = ERC721_ContractWithSigner(smartContractAddress, signer);
	const ERC20Contract = ERC20_ContractWithSigner(listingCurrency, signer);
	const decimalOfToken = <number> await ERC20Contract.decimals();

	await balanceAndApprovals(
		address,
		'ERC721',
		ERC721Contract,
		tokenID
	)
	listingPrice = utils.parseUnits(<string> listingPrice, decimalOfToken).toString();

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
					token: listingCurrency,
				},
			],
			fees: [
				{
					basisPoints: Number(process.env.WIV_FEE),
					recipient: <string> process.env.WIV_FEE_RECEIVER
				},
			],
			endTime: SetExpDate(expirationDate),
		},
		address
	);
	const order = await executeAllActions();
	const { transact } = seaport.validate([order]);
	const txn = await transact();
	const orderHash = seaport.getOrderHash({ ...order.parameters });
	const db_Order: OrderModel = {
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

export async function InspectListingStatus(
  nft: TokenIdentifier
): Promise<
  false | { listingPrice: string; currency: string; transactionStatus: boolean }
> {
  const url = <string>process.env.RETRIEVE_LISTING_STATUS;
  let status = false;
  await axios.post(url, { ...nft, apiKey: APIKeyString }).then(res => {
    status = res.data;
  });
  return status;
}

export async function CreateERC721Offer(
  tokenID: string,
  smartContractAddress: string,
  brand: string,
  image: string,
  address: string,
  offerPrice: string,
	offerCurrency: string,
  expirationDate: string,
  user: UserModel
) {
  if (
    user.verificationStatus === 'NOT_STARTED' ||
    user.verificationStatus === 'FAILED' ||
    user.verificationStatus === 'PENDING'
  ) {
    throw new Error('User is not verified');
  }

	const signer = WindowWeb3Provider?.getSigner();
	if(!signer) throw new Error('Please reconnect/install Metamask wallet to continue');
	const contract = ERC20_ContractWithSigner(offerCurrency, signer);
	const decimalOfToken = <number> await contract.decimals();

	await balanceAndApprovals(
		address,
		'ERC20',
		contract,
		'',
		offerPrice,
		decimalOfToken
	)

	offerPrice = utils.parseUnits(<string> offerPrice, decimalOfToken).toString();

	const blockNumber = await GetBlockNumber();
	const { seaport, network } = await GetWeb3();
	const { executeAllActions } = await seaport.createOrder(
		{
			offer: [
				// buyer's offer
				{
					amount: offerPrice,
					token: offerCurrency,
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
					recipient: <string> process.env.WIV_FEE_RECEIVER
				},
			],
			endTime: SetExpDate(expirationDate),
		},
		address
	);
	const order = await executeAllActions();
	const { transact } = seaport.validate([order]);
	const txn = await transact();
	const orderHash = seaport.getOrderHash({ ...order.parameters });
	const db_Order: OrderModel = {
		parameters: order.parameters,
		signature: order.signature,
		orderHash: orderHash,
		network: network,
		from: 'Buyer', // process env here
		contractAddress: smartContractAddress,
		identifierOrCriteria: tokenID,
		brand: brand,
		image: image,
		offerPrice: offerPrice,
		offerCurrency: offerCurrency,
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
  user: UserModel,
  image: string
) {
  if (!user.walletAddress) {
    throw 'Check Metamask connection.';
  }
  if (
    user.verificationStatus === 'NOT_STARTED' ||
    user.verificationStatus === 'FAILED' ||
    user.verificationStatus === 'PENDING'
  ) {
    throw 'User is not verified';
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

	await HandleFulfillmentApprovals(owner, user.walletAddress, order);

	const { executeAllActions: executeAllFulfillActions } =
		await seaport.fulfillOrder({
			order: {
				parameters: order.parameters,
				signature: order.signature,
			},
			exactApproval: false
		});

	const txn = await executeAllFulfillActions();

	const updateOrder: FulfillOrderRequest & { apiKey: string } = {
		notificationID: RandomIdGenerator(),
		identifierOrCriteria: order.identifierOrCriteria,
		contractAddress: order.contractAddress,
		orderHash: orderHash,
		network: order.network,
		brand: brand,
		isOwner: owner,
		walletAddress: user.walletAddress,
		offerer: order.parameters.offerer,
		image: image,
		nonce: txn.nonce,
		blockNumber: blockNumber,
		apiKey: <string> APIKeyString
	};
	const fulfillOrderURL = <string>process.env.FULFILL_ORDER_URL;
	axios.post(fulfillOrderURL, updateOrder);
}

export async function CancelSingleOrder(
  orderHash: string,
  walletAddress: string
) {
  if (!!walletAddress) {
    const retrieveOrderUrl = <string>process.env.RETRIEVE_ORDER_URL;
    const body = {
      apiKey: APIKeyString,
      orderHash: orderHash,
    };
    const order: OrderComponents = await axios
      .post(retrieveOrderUrl, body)
      .then(result => {
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
      apiKey: APIKeyString,
    };
    axios.post(cancelOrderURL, requestToCancel);
  } else {
    throw new Error('Please reconnect/install Metamask wallet to continue')
  }
}
