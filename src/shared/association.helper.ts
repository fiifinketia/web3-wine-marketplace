import { ListingWithPricingAndImage } from 'src/pages/Marketplace-Main/models/Response.models';
import { TokenIdentifier } from './models/entities/NFT.model';
import { FavoritesModel } from 'src/pages/Favourites/models/Response';

function AssociateOwned <T extends FavoritesModel | ListingWithPricingAndImage> (selections: T[], ownedNFTs: TokenIdentifier[]) : T[] {
  const ownedNFTsMap: Map<string, TokenIdentifier> = new Map();
  ownedNFTs.forEach(f => {
    const key = `${f.identifierOrCriteria},${f.contractAddress},${f.network}`
    ownedNFTsMap.set(key, f);
  })

  const retrievedNFTsMap: Map<string, T & { isOwned?: boolean }> = new Map();
  selections.forEach(f => {
    const key = `${f.tokenID},${f.smartContractAddress},${f.network}`
    retrievedNFTsMap.set(key, f);
  })

  ownedNFTsMap.forEach((v, k) => {
    const ownedInSelection = retrievedNFTsMap.get(k);
    if (!!ownedInSelection) {
      ownedInSelection.isOwned = true;
    }
  })

  return Array.from(retrievedNFTsMap.values());
}

export {
  AssociateOwned
}