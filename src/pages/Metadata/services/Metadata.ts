import axios from 'axios';

const timeStamp = new Date().getTime();

export async function GetMetadata({
	id,
	contractAddress,
	network,
	walletAddress,
}: {
	id: string;
	contractAddress: string;
	network: string;
	walletAddress: string;
}) {
	try {
		const { data } = await axios.get(
			`${process.env.MARKETPLACE_API_URL}/market/single/investment/?identifierOrCriteria=${id}&contractAddress=${contractAddress}&network=${network}&walletAddress=${walletAddress}&timestamp=${timeStamp}`
		);
		return data;
	} catch (error) {
		throw error;
	}
}
