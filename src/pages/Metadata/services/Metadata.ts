import axios from 'axios';

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
			`${process.env.MARKETPLACE_API_URL}/market/single/investment/?identifierOrCriteria=${id}&contractAddress=${contractAddress}&network=${network}&walletAddress=${walletAddress}`
		);
		return data;
	} catch (error) {
		throw error;
	}
}
