# WiV Marketplace (wiv-marketplace)

The WiV Marketplace is a web application which allows customers to trade their NFT wines using Opensea's Seaport Protocol.

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
npm run dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Build the app for production

```bash
quasar build
```

# ENV File Variables

```
MKTPLACE_API_KEY=

# BASEURL
MARKETPLACE_API_URL=http://localhost:8080/api

# AMPLITUDE
AMP_API_KEY=
API_TOKEN=

# NFT Microservice
RETRIEVE_FILTERS_URL=http://localhost:8080/api/nfts/filters
RETRIEVE_METADATA_URL=http://localhost:8080/api/market/single/investment
RETRIEVE_TXN_HISTORY_URL=http://localhost:8080/api/market/single/investmentTxns
RETRIEVE_FILTERED_NFTS_URL=http://localhost:8080/api/nfts
RETRIEVE_NEWLY_MINTED_NFTS_URL=http://localhost:8080/api/release/newlyMinted
RETRIEVE_NEWLY_LISTED_NFTS_URL=http://localhost:8080/api/release/newlyListed
RETRIEVE_NEWLY_ADDED_REGION_NFTS_URL=http://localhost:8080/api/release/newByRegion
BURN_NFT_URL=http://localhost:8080/api/market/nft/burn
RETRIEVE_MISSING_DETAILS=http://localhost:8080/api/nfts/missingDetails
RETRIEVE_LISTING_STATUS=http://localhost:8080/api/market/single/listingStatus
RETRIEVE_LISTING_CANCELLATION_STATUS=http://localhost:8080/api/market/single/listingCancellationStatus

# Transactions Microservice
CREATE_ORDER_URL=http://localhost:8080/api/market/order/listing/order.list
FULFILL_ORDER_URL=http://localhost:8080/api/market/order/fulfill/order.fulfill
CANCEL_ORDER_URL=http://localhost:8080/api/market/order/cancel/order.cancel
RETRIEVE_ORDER_URL=http://localhost:8080/api/market/single/getOrderParameters

# Orders Microservice
RETRIEVE_LISTINGS_URL=http://localhost:8080/api/orders/listings
RETRIEVE_INCOMING_OFFERS_URL=http://localhost:8080/api/orders/incoming
RETRIEVE_OUTGOING_OFFERS_URL=http://localhost:8080/api/orders/outgoing
RETRIEVE_TRANSACTIONS_URL=http://localhost:8080/api/orders/allTransactions

# Favorites Microservice
ADD_FAVORITE_URL=http://localhost:8080/api/favorite/add
DELETE_FAVORITE_URL=http://localhost:8080/api/favorite/delete
RETRIEVE_FAVORITES_URL=http://localhost:8080/api/favorite/getAll

# Users Microservice
MARKETPLACE_USERS_API=http://localhost:8080/api/market/users

# Suggestions Microservice
RETRIEVE_RECOMMENDATIONS_URL=http://localhost:8080/api/recommendations

# Seaport Constants
WIV_FEE=250
WIV_FEE_RECEIVER=0xF0377dF3235e4F5B3e38DB494e601Edf3567eF9A

# CURRENCIES
WIVA_CURRENCY=0xC1d6EF502Ac5410B3F3706beb6a0808131337Fb6
USDC_CURRENCY=0xE097d6B3100777DC31B34dC2c58fB524C2e76921
USDT_CURRENCY=0x466DD1e48570FAA2E7f69B75139813e4F8EF75c2

# POLYGONSCAN
POLYGON_SCAN_TXN_LINK=https://mumbai.polygonscan.com/tx/
POLYGON_SCAN_API_URL=https://api-testnet.polygonscan.com/api
POLYGON_SCAN_API_KEY=3ZRAMP4CSAQD28PVSQJI6NTD5J88HY8K36

# Blockchain
LOGS_TOPIC_0_ERC1155=0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62
LOGS_TOPIC_0_ERC721=0x4099424f1d46c603584f23b5ff4f55e546a2b73e73393085c1c8953ba3213f13
ERC1155_CONTRACT_ADDRESS=0x1458DAb28F3e94F8e4Ae3fCb03De803e53Dd443D
ERC721_CONTRACT_ADDRESS=0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18
SEAPORT_CONTRACT_ADDRESS=0x00000000000001ad428e4906aE43D8F9852d0dD6
NETWORK=Mumbai
PROVIDER_URL=https://matic-mumbai.chainstacklabs.com
FROM_BLOCK=0
TO_BLOCK=99999999
```
