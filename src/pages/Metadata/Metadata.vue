<template>
  <q-page v-if="!loadingMetadata">
    <div v-if="tokenExists">
      <WineTrade
        :nft="nft" @open-wallet="openWalletSideBar"
        @refresh-metadata="ValidateAndFetchNFT()"
      />
      <q-tabs v-model="tab" no-caps align="justify" class="tabs-menu" >
        <q-tab name="history" label="NFT history" />
        <q-tab name="about" label="About" />
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="jump-right"
        transition-next="jump-left"
      >
        <q-tab-panel name="history">
          <WineHistory :nft-txn-history="txnHistory" />
        </q-tab-panel>

        <q-tab-panel name="about">
          <WineDetails :nft="nft" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <UnavailableNFT v-else />
  </q-page>
  <q-page v-else>
    <LoadingMetadata />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { NFTWithListingAndFavorites, SeaportTransactionsModel } from './models/Metadata';
import { GetMetadata, GetTokenTXNHistory } from './services/Metadata';
import WineHistory from './components/WineHistory.vue';
import WineTrade from './components/WineTrade.vue';
import WineDetails from './components/WineDetails.vue';
// import WineMaker from './components/WineMaker.vue';
import '../../css/Metadata/StatisticsMenu.css';
import { TokenIdentifier } from 'src/shared/models/entities/NFT.model';
import { Contract } from '@ethersproject/contracts';
import {
  NewPolygonCollectionContract_MumbaiInstance,
  NewPolygonCollectionContract_PolygonInstance,
} from 'src/shared/web3.helper';
import UnavailableNFT from './components/UnavailableNFT.vue';
import LoadingMetadata from './components/LoadingMetadata.vue';

export default defineComponent({
  name: 'MetadataPage',
  components: {
    WineHistory,
    WineDetails,
    // WineMaker,
    WineTrade,
    UnavailableNFT: UnavailableNFT,
    LoadingMetadata: LoadingMetadata,
  },
  emits: ['openWalletSidebar'],

  data() {
    const userStore = useUserStore();
    return {
      nft: {} as NFTWithListingAndFavorites,
      txnHistory: [] as SeaportTransactionsModel[],
      userStore,
      tab: ref('history'),
      tokenExists: false,
      loadingMetadata: true,
    };
  },

  async mounted() {
    await this.ValidateAndFetchNFT();
  },

  methods: {
    async ValidateAndFetchNFT() {
      this.loadingMetadata = true;
      this.tokenExists = false;
      const { id, contractAddress, network } = this.$route.query;
      if (
        typeof id === 'string' &&
        typeof contractAddress === 'string' &&
        typeof network === 'string'
      ) {
        const tokenExistCheck = await this.CheckTokenExistence(
          id,
          contractAddress,
          network
        );
        if (!!tokenExistCheck) {
          await this.SetNFTView(id, contractAddress, network);
          this.tokenExists = true;
        }
        this.loadingMetadata = false;
      }
    },

    async SetNFTView(identifierOrCriteria: string, contractAddress: string, network: string) {
      try {
        const nft = await GetMetadata({
          identifierOrCriteria,
          contractAddress,
          network,
          walletAddress: this.userStore.walletAddress,
        });
        if (!!this.userStore.walletAddress) {
          nft.isOwner = await this.CheckOwnership(
            this.userStore.walletAddress,
            contractAddress,
            identifierOrCriteria
          );
        }
        this.nft = nft;
        this.GetNFTTXNHistory(identifierOrCriteria, contractAddress, network);
      } catch (error) {
        throw error;
      }
    },

    async GetNFTTXNHistory(identifierOrCriteria: string, contractAddress: string, network: string) {
      const txnHistory = await GetTokenTXNHistory({
        identifierOrCriteria,
        contractAddress,
        network
      })
      this.txnHistory = txnHistory;
    },

    async CheckTokenExistence(
      id: string,
      contractAddress: string,
      network: string
    ): Promise<boolean> {
      let exists = true;
      try {
        let contract: Contract;
        switch (contractAddress) {
          case process.env.ERC721_CONTRACT_ADDRESS_MUMBAI:
            contract = NewPolygonCollectionContract_MumbaiInstance;
            await contract.tokenURI(id);
            break;
          case process.env.ERC721_CONTRACT_ADDRESS_POLYGON:
            contract = NewPolygonCollectionContract_PolygonInstance;
            await contract.tokenURI(id);
            break;
        }
        exists = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const nonexistentMessage = err.message
          .toString()
          .includes('URI query for nonexistent token');
        if (nonexistentMessage) {
          const burntNFT: TokenIdentifier = {
            contractAddress: contractAddress,
            identifierOrCriteria: id,
            network: network,
          };
          this.$axios.post(<string>process.env.BURN_NFT_URL, burntNFT);
          exists = false;
        }
      }
      return exists;
    },

    async CheckOwnership(
      walletAddress: string,
      contractAddress: string,
      tokenID: string
    ) {
      let isOwned = false;
      try {
        let actualOwner = '';
        let contract: Contract;
        switch (contractAddress) {
          case process.env.ERC721_CONTRACT_ADDRESS_MUMBAI:
            contract = NewPolygonCollectionContract_MumbaiInstance;
            actualOwner = await contract.ownerOf(tokenID);
            isOwned = actualOwner.toLowerCase() === walletAddress.toLowerCase();
            break;
          case process.env.ERC721_CONTRACT_ADDRESS_MUMBAI:
            contract = NewPolygonCollectionContract_PolygonInstance;
            actualOwner = await contract.ownerOf(tokenID);
            isOwned = actualOwner.toLowerCase() === walletAddress.toLowerCase();
            break;
        }
      } catch (err) {
        throw err;
      } finally {
        return isOwned;
      }
    },

    openWalletSideBar() {
      this.$emit('openWalletSidebar');
    },
  },
});
</script>

<style scoped>
.q-tab-panel {
  padding: 3rem 0 0 !important;
}
</style>
