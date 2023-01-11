import axios from 'axios';
import { FavoritesModel } from '../../Favourites/models/Response';
const marketPlaceAPI = process.env.MARKETPLACE_API_URL;
async function AddFavorites(body: object) {
	const url = marketPlaceAPI + 'favorite/add';
	await axios.post(url, body);
}
async function RemoveFavorites(body: object) {
	const url = marketPlaceAPI + 'favorite/delete';

	await axios.post(url, body);
}

async function GetAllFavorites(queryParams: string) {
	let nfts: FavoritesModel[] = [];
	const url = marketPlaceAPI + '/favorite/getAll';

	await axios.get(url + queryParams).then((res) => {
		nfts = res.data;
	});

	return {
		result: nfts,
	};
}

export { AddFavorites, RemoveFavorites, GetAllFavorites };
