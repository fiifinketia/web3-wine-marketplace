import { Seaport } from '@opensea/seaport-js';
import { Contract, ethers, utils } from 'ethers';
import {
  ChainID,
  ItemType,
  OrderModel,
  RetrieveOrderResponse,
  SeaportInstance,
  FulfillOrderRequest,
	CreateOrderRequest,
	CancelOrderRequest,
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
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

declare let window: Window;

function GetOrderPrice(isListing: boolean, parameters: OrderParameters) {
	if (isListing) {
		return {
			listingPrice: (parseFloat(parameters.consideration[0].startAmount) / 0.975).toString(),
			listingCurrency: parameters.consideration[0].token
		}
	}
	return {
		offerPrice: parameters.offer[0].startAmount,
		offerCurrency: parameters.offer[0].token
	}
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
		listingPrice: GetOrderPrice(true, order.parameters).listingPrice,
		listingCurrency
	};
	const OrderRequest: CreateOrderRequest = {
		order: db_Order,
		blockNumber: blockNumber,
		apiKey: <string> APIKeyString
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
		offerPrice: offerPrice,
		offerCurrency: offerCurrency,
		nonce: txn.nonce
	};
	const OrderRequest: CreateOrderRequest = {
		order: db_Order,
		blockNumber: blockNumber,
		apiKey: <string> APIKeyString
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
	const orderPriceDetails = owner ? GetOrderPrice(false, order.parameters) : GetOrderPrice(true, order.parameters);

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
	owner ? () => {
		updateOrder['offerCurrency'] = orderPriceDetails.offerCurrency;
		updateOrder['offerPrice'] = orderPriceDetails.offerPrice;
	} : () => {
		updateOrder['listingCurrency'] = orderPriceDetails.listingCurrency;
		updateOrder['listingPrice'] = orderPriceDetails.listingPrice;
	}
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
		const tokenDetails = {} as TokenIdentifier;
    const order: OrderComponents = await axios
      .post(retrieveOrderUrl, body)
      .then(result => {
        const data = <RetrieveOrderResponse> result.data;
				orderParameters = data.parameters;
				from = data.from;
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
    const { transact } = seaport.cancelOrders([order]);
    const txn = await transact();

		const orderPriceDetails = from == 'Owner' ? GetOrderPrice(true, orderParameters) : GetOrderPrice(false, orderParameters);
    const cancelOrderURL = <string>process.env.CANCEL_ORDER_URL;
    const requestToCancel: CancelOrderRequest = {
      orderHash: orderHash,
      walletAddress: walletAddress,
      nonce: txn.nonce,
      blockNumber: blockNumber,
      apiKey: <string> APIKeyString,
			identifierOrCriteria: tokenDetails.identifierOrCriteria,
			network: tokenDetails.network,
			contractAddress: tokenDetails.contractAddress
    };
		from == 'Owner' ? () => {
			requestToCancel['listingCurrency'] = orderPriceDetails.listingCurrency;
			requestToCancel['listingPrice'] = orderPriceDetails.listingPrice;
		} : () => {
			requestToCancel['offerCurrency'] = orderPriceDetails.offerCurrency;
			requestToCancel['offerPrice'] = orderPriceDetails.offerPrice;
		}
    axios.post(cancelOrderURL, requestToCancel);
  } else {
    throw new Error('Please reconnect/install Metamask wallet to continue')
  }
}
