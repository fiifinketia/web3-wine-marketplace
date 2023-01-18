import { defineStore } from 'pinia';
import { FetchOwnedNFTs } from 'src/shared/blockchain.requests';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
import { ref } from 'vue';

export const useNFTStore = defineStore(
  'nftStore',
  () => {
    const ownedNFTs = ref([] as TokenIdentifier[])
    const fetchNFTs = async (walletAddress: string) => {
			ownedNFTs.value = await FetchOwnedNFTs(walletAddress);
			// ownedNFTs = await FetchOwnedNFTs(walletAddress);
		}
    return {
			ownedNFTs,
			fetchNFTs
		};
  },
  { persist: true }
);
