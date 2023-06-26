import { Seaport } from '@opensea/seaport-js';
import { Contract, ethers, utils } from 'ethers';
import {
  ChainID,
  ItemType,
  OrderModel,
  RetrieveOrderResponse,
  SeaportInstance,
	CancelOrderModel,
} from '../models/Orders';
import { ERC721_PolygonContract } from 'src/shared/web3.helper';
import axios from 'axios';
import {
  OrderComponents,
  OrderParameters,
} from '@opensea/seaport-js/lib/types';
import { APIKeyString } from 'src/boot/axios';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
import { ERC20_ContractWithSigner, WindowWeb3Provider } from 'src/shared/web3.helper';
import { UserModel } from 'src/components/models';
import { NOTIFICATION_CODES, TXN_STATUS } from 'src/shared/models/entities/notifications.model';
import { CancelOrderRequest, CreateOrderRequest, FulfillOrderRequest } from 'src/shared/models/requests/orders.requests';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

declare let window: Window;

function GetOrderPrice(isListing: boolean, parameters: OrderParameters) {
	if (isListing) {
		return {
			orderPrice: (parseFloat(parameters.consideration[0].startAmount) / 0.975).toString(),
			orderCurrency: parameters.consideration[0].token
		}
	}
	return {
		orderPrice: parameters.offer[0].startAmount,
		orderCurrency: parameters.offer[0].token
	}
}

function TimeNow() {
	return new Date().getTime();
}

export function isInputDateTimeAboveCurrentTime(expDate: string, expTime: string): boolean {
  const inputDateTime = `${expDate}T${expTime}:00`;
  const inputTimestamp = Math.round(new Date(inputDateTime).getTime() / 1000);
  const currentTimestamp = Math.round(new Date().getTime() / 1000);
  return inputTimestamp > currentTimestamp;
}

function SetExpDate(expDate: string, expTime: string) : string{
	const inputDateTime = `${expDate}T${expTime}:00`
	return (
		Math.round(new Date(inputDateTime).getTime() / 1000)
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
  const seaport = new Seaport(web3, { seaportVersion: '1.4' });
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
  expirationDate: string,
	expirationTime: string
) {
	const signer = WindowWeb3Provider?.getSigner();
  if(!signer) throw new Error('Please reconnect/install Metamask wallet to continue');
	// const ERC721Contract = ERC721_ContractWithSigner(smartContractAddress, signer);
	const ERC20Contract = ERC20_ContractWithSigner(listingCurrency, signer);
	const decimalOfToken = <number> await ERC20Contract.decimals();

	// await balanceAndApprovals(
	// 	address,
	// 	'ERC721',
	// 	ERC721Contract,
	// 	tokenID
	// )
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
			endTime: SetExpDate(expirationDate, expirationTime),
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
		nonce: txn.nonce,
		orderPrice: GetOrderPrice(true, order.parameters).orderPrice,
		orderCurrency: listingCurrency
	};
	const OrderRequest: CreateOrderRequest = {
		order: db_Order,
		blockNumber: blockNumber,
		apiKey: <string> APIKeyString,
		timestamp: TimeNow()
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

export async function ValidateUnlist(
  nft: TokenIdentifier,
	ownerAddress: string
): Promise<
  false | 'ongoingUnlist' | 'unlisted' | 'purchased'
> {
  const url = <string>process.env.RETRIEVE_LISTING_CANCELLATION_STATUS;
	let status: false | 'ongoingUnlist' | 'nonexistent' = 'nonexistent';
  await axios.post(url, { ...nft, apiKey: APIKeyString }).then(res => {
    status = res.data;
  });
	if (status == 'nonexistent') {
		let isUnlisted = false;
		try {
			let actualOwner = '';
			const contract: Contract = ERC721_PolygonContract;
			actualOwner = await contract.ownerOf(nft.identifierOrCriteria);
			// if still the same owner, then listing is nonexistent because it was unlisted
			// else it was bought
			isUnlisted = actualOwner.toLowerCase() === ownerAddress.toLowerCase();
			if (!!isUnlisted) {
				return 'unlisted'
			}
			return 'purchased'
		} catch (err) {
			throw err;
		}
	}
	// is either false or ongoingUnlist
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
	expirationTime: string,
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

	// await balanceAndApprovals(
	// 	address,
	// 	'ERC20',
	// 	contract,
	// 	'',
	// 	offerPrice,
	// 	decimalOfToken
	// )

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
			endTime: SetExpDate(expirationDate, expirationTime),
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
		orderPrice: offerPrice,
		orderCurrency: offerCurrency,
		nonce: txn.nonce
	};
	const OrderRequest: CreateOrderRequest = {
		order: db_Order,
		blockNumber: blockNumber,
		apiKey: <string> APIKeyString,
		timestamp: TimeNow()
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
	const order: RetrieveOrderResponse = await axios
		.post(retrieveOrderUrl, body)
		.then(result => {
			const data = result.data;
			return {
				from: data.from,
				parameters: data.parameters,
				signature: data.signature,
				network: data.network,
				identifierOrCriteria: data.identifierOrCriteria,
				contractAddress: data.contractAddress,
				brand: data.brand
			};
		});
	const blockNumber = await GetBlockNumber();

	// await HandleFulfillmentApprovals(owner, user.walletAddress, order);

	const { executeAllActions: executeAllFulfillActions } =
		await seaport.fulfillOrder({
			order: {
				parameters: order.parameters,
				signature: order.signature,
			},
			exactApproval: false
		});

	const txn = await executeAllFulfillActions();

	const updateOrder: FulfillOrderRequest = {
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
		let orderParameters = {} as OrderComponents;
		let from = '';
		let brand = '';
		const tokenDetails = {} as TokenIdentifier;
    const orderComponents: OrderComponents = await axios
      .post(retrieveOrderUrl, body)
      .then(result => {
        const data = <RetrieveOrderResponse> result.data;
				orderParameters = data.parameters;
				from = data.from;
				brand = data.brand;
				tokenDetails['contractAddress'] = data.contractAddress;
				tokenDetails['identifierOrCriteria'] = data.identifierOrCriteria;
				tokenDetails['network'] = data.network;
        return {
          ...orderParameters,
          signature: <string>data.signature,
        };
      });
    const { seaport } = await GetWeb3();
    const blockNumber = await GetBlockNumber();
    const { transact } = seaport.cancelOrders([orderComponents]);
    const txn = await transact();

		const { orderCurrency, orderPrice } = from == 'Owner' ? GetOrderPrice(true, orderParameters) : GetOrderPrice(false, orderParameters);
    const cancelOrderURL = <string>process.env.CANCEL_ORDER_URL;
    const cancelOrderDetails: CancelOrderModel = {
      orderHash: orderHash,
      walletAddress: walletAddress,
      nonce: txn.nonce,
      blockNumber: blockNumber,
      apiKey: <string> APIKeyString,
			identifierOrCriteria: tokenDetails.identifierOrCriteria,
			network: tokenDetails.network,
			contractAddress: tokenDetails.contractAddress,
			orderPrice: orderPrice,
			orderCurrency: orderCurrency,
			brand: brand
    };
		const cancelRequest: CancelOrderRequest = {
			order: cancelOrderDetails,
			status: TXN_STATUS.TRANSACTION_PENDING,
			notificationCode: from == 'Owner' ? NOTIFICATION_CODES.LISTING_REMOVED : NOTIFICATION_CODES.OFFER_REMOVED,
			apiKey: <string> APIKeyString,
			timestamp: TimeNow()
		}
    axios.post(cancelOrderURL, cancelRequest);
  } else {
    throw new Error('Please reconnect/install Metamask wallet to continue')
  }
}
