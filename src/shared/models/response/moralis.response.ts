interface MoralisAddressNFTs {
  contract_type: string;
  token_address: string;
  token_id: string;
  owner_of: string;

  block_number: string;
  block_number_minted: string;
  token_hash: string;
  amount: string;
  name: string;
  symbol: string;
  token_uri: string;
  metadata: string;
  last_token_uri_sync: string;
  last_metadata_sync: string;
  minter_address: string;
}

export { MoralisAddressNFTs };
