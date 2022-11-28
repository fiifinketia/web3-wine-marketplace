import axios from 'axios';
import { FavoritesModel } from '../../Favourites/models/Response';

async function AddFavorites(body: object) {
	const url = 'http://localhost:3100/favorites/addFavorite';

	await axios.post(url, body);
}
async function RemoveFavorites(body: object) {
	const url = 'http://localhost:3100/favorites/deleteFavorite';

	await axios.post(url, body);
}

async function GetAllFavorites(queryParams: string) {
	let nfts: FavoritesModel[] = [];
	const url = 'http://localhost:3100/favorites/getAllFavorites';

	await axios.get(url + queryParams).then((res) => {
		nfts = res.data;
	});

	return {
		result: nfts,
	};
}

export { AddFavorites, RemoveFavorites, GetAllFavorites };
