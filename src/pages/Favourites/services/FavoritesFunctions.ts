import axios from 'axios';
import { FavoritesModel } from '../models/Response';
import { APIKeyString } from 'src/boot/axios';

async function AddFavorites(body: object) {
  const addFavoriteURL = <string>process.env.ADD_FAVORITE_URL;
  await axios.post(addFavoriteURL, {...body, apiKey: APIKeyString});
}

async function RemoveFavorites(body: object) {
  const deleteFavoriteURL = <string>process.env.DELETE_FAVORITE_URL;
  await axios.post(deleteFavoriteURL, {...body, apiKey: APIKeyString});
}

async function GetAllFavorites(walletAddress: string, brand: string) {
  let nfts: FavoritesModel[] = [];
  const body = {
    ...(!!brand ? { brand } : {}),
    walletAddress: walletAddress,
    apiKey: APIKeyString
  }
  const retrieveFavoritesURL = <string>process.env.RETRIEVE_FAVORITES_URL;
  await axios
    .post(retrieveFavoritesURL, body)
    .then(res => {
      nfts = res.data;
    });
  return {
    result: nfts,
  };
}

export { AddFavorites, RemoveFavorites, GetAllFavorites };
