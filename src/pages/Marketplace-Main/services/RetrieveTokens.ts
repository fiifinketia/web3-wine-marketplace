import axios, { AxiosResponse } from 'axios';
import { DynamicKeyWithCount, ListingWithPricingAndImage, ResultAndCountResponse } from '../models/Response.models';

const GETParams = {
  params: {
    t: new Date().getTime()
  }
}

async function RetrieveFilteredNFTs(
	queryParams?: string
): Promise<ResultAndCountResponse> {
	let nfts: ListingWithPricingAndImage[] = [];
	let counts: DynamicKeyWithCount = {};
	const url = <string>process.env.RETRIEVE_FILTERED_NFTS_URL;

	await axios
		.get(url + queryParams)
		.then((res: AxiosResponse<ResultAndCountResponse>) => {
			nfts = res.data.result;
			counts = res.data.counts;
		});

	return {
		result: nfts,
		counts: counts,
	};
}

export { RetrieveFilteredNFTs };
