import { defineStore } from 'pinia';
import { FetchOwnedNFTs } from 'src/shared/blockchain.requests';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
import { ref } from 'vue';

export const useNFTStore = defineStore(
  'nftStore',
  () => {
    const ownedNFTs = ref([] as TokenIdentifier[]);
    const fetchNFTsStatus = ref(false);
    const fetchNFTs = async (walletAddress: string) => {
			ownedNFTs.value = await FetchOwnedNFTs(walletAddress);
      fetchNFTsStatus.value = true;
		}
    return {
			ownedNFTs,
			fetchNFTs,
      fetchNFTsStatus
		};
  },
  { persist: true }
);
