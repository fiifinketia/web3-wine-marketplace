import axios from 'axios';
import { FavoritesModel } from '../../Favourites/models/Response';

async function AddFavorites(body: object) {
	const addFavoriteURL = <string>process.env.ADD_FAVORITE_URL;
	await axios.post(addFavoriteURL, body);
}

async function RemoveFavorites(body: object) {
	const deleteFavoriteURL = <string>process.env.DELETE_FAVORITE_URL;
	await axios.post(deleteFavoriteURL, body);
}

async function GetAllFavorites(walletAddress: string, brand: string) {
	let nfts: FavoritesModel[] = [];
	let queryParams = `?walletAddress=${walletAddress}`;
	if (!!brand) {
		queryParams += `&brand=${brand}`;
	}
	const retrieveFavoritesURL = <string>process.env.RETRIEVE_FAVORITES_URL;
	await axios.get(retrieveFavoritesURL + queryParams).then(res => {
		nfts = res.data;
	});
	return {
		result: nfts,
	};
}

export { AddFavorites, RemoveFavorites, GetAllFavorites };
