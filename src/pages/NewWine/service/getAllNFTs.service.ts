import axios from 'axios';

export async function getAllNFTs(lwin: string) {
	const result = await axios
		.post('http://localhost:3600/suggestion/getAllWines', [lwin])
		.then((res) => {
			return res;
		});
	return result;
}

export async function getListCount() {
	const getCount = await axios.get('http://localhost:3600/suggestion/count');
	return getCount.data;
}
