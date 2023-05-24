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

# Routes
<details closed>
  <summary> <b> Requests (READ) </br> </summary>
  <ul>
    <details closed>
    <summary><b>NFT Microservice</b></summary>
  <ul>
  <details>
  <summary>Retrieve filtered NFTs <pre>/nfts</pre></summary>
  
  * Request: GET
  * Host: ``` /wivmkt-nft-service/retrieveFilteredNFTs ``` <br>
  * Query Parameters:
    ```
    appellation[]
    brand[]
    investmentGrade[]
    lwin[]
    grape[]
    heritage[]
    listed[]
    currency[]
    productionCountry[]
    sortType
    minPrice
    maxPrice
    walletAddress
    generalSearch
    ```
  * Sample Response:
    ```json
    {
      "result": [
          {
              "tokenID": "3",
              "image": "https://wivmetadata.blob.core.windows.net/polygon-wine-icons/3.jpg",
              "brand": "Continuum",
              "lwin": "11865432017",
              "network": "Mumbai",
              "smartContractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
              "orderDetails": {
                  "listingPrice": "20.00",
                  "currency": "0xC1d6EF502Ac5410B3F3706beb6a0808131337Fb6",
                  "orderHash": "0xb63ba44a6410e9e621f975617eb363be78ffb2c43ba7af285901803a5fab8ea0",
                  "transactionStatus": true,
                  "expTime": 1685055900
              },
              "favorited": null
          }
      ],
      "counts": {
          "brand": [
              {
                  "_id": "Continuum",
                  "count": 1
              }
          ]
      }
    }
    ```
  </details>
  <details>
  <summary>Retrieve filter enums <pre>/nfts/filters </pre> </summary>

  * Host: ``` /wivmkt-nft-service/retrieveFilterDetails ``` <br>
  * Response:
    ```json
    {
      "brand": [  "Bartolo Mascarello, Barolo",  ... ],
      "lwin": [  "10119022018", ... ],
      "investmentGrade": [ "Bronze", ...  ],
      "country": [  "America", ... ],
      . . . so on and so forth (all attributes’ unique values will be returned in an array)
    }
    ```
  </details>
  <details>
  <summary>Retrieve filter enums <pre> market/single/investment </pre> </summary>

  * Host: ``` /wivmkt-nft-service/retrieveNFTDetails ``` <br>
  * Body:
    ```json
    {
      "apiKey": "",
      "identifierOrCriteria": "7",
      "contractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
      "network": "Mumbai"
    }
    ```
  * Response:
    ```json
    {
      "tokenID": "18",
      "description":"1 case of 6btl ( 75 cl )...",
      "image": "https://wivmetadata.blob.core.windows.net/polygon-wine-icons/18.png",
      "name": "Domaine Jean Grivot, Vosne-Romanee",
      "brand": "Domaine Jean Grivot, Vosne-Romanee",
      "wivVintage": "WiV Vintage 2022",
      "producer": "Domaine Jean Grivot",
      "productionCountry": "France",
      "region": "Burgundy",
      "appellation": "Vosne-Romanee",
      "vintage": "2016",
      "grape": "Pinot Noir",
      "lwin": "10357402016",
      "maturity": "16",
      "heritage": "OLD WORLD",
      "investmentGrade": "Bronze",
      "case": "6 bottles",
      "origin": "SECONDARYMARKET",
      "source": "MERCHANT",
      "type": "Red",
      "format": "75 cl",
      "network": "Mumbai",
      "smartContractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
      "isBurnt": false,
      "tokenType": "ERC721",
      "listingDetails": {
          "listingPrice": null,
          "currency": null,
          "orderHash": null,
          "transactionStatus": null,
          "expTime": null
      },
      "offerDetails": {
          "highestBid": null,
          "highestBidCurrency": null,
          "highestBidHash": null,
          "highestBidExpTime": null
      },
      "favorited": null
    }
    ```
  </details>
  <details>
  <summary>Retrieve newly minted NFTs <pre>/release/newlyMinted </pre> </summary>

  * Host: ``` /wivmkt-nft-service/retrieveNewNFTs ``` <br>
  * Body:
    ```json
    {
      "walletAddress": "0xA3873a019aC68824907A3aD99D3e3542376573D0",
      "apiKey": ""
    }
    ```
  * Sample Response:
    ```json
    [
      {
          "tokenID": "3",
          "image": "https://wivmetadata.blob.core.windows.net/polygon-wine-icons/3.jpg",
          "brand": "Continuum",
          "lwin": "11865432017",
          "network": "Mumbai",
          "smartContractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
          "orderDetails": null,
          "favorited": true
      },
      ... so on and so forth (returns 5 max)
    ]
    ```
  </details>
  <details>
  <summary>Retrieve latest listed NFTs <pre>/release/newlyListed </pre> </summary>

  * Host: ``` /wivmkt-nft-service/retrieveNewlyListed ``` <br>
  * Body:
    ```json
    {
      "walletAddress": "0xA3873a019aC68824907A3aD99D3e3542376573D0",
      "apiKey": ""
    }
    ```
  * Sample Response:
    ```json
    [
      {
          "tokenID": "10",
          "image": "https://wivmetadata.blob.core.windows.net/polygon-wine-icons/10.jpg",
          "brand": "Mondavi, To Kalon Reserve",
          "lwin": "11863122016",
          "network": "Mumbai",
          "smartContractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
          "orderDetails": {
              "listingPrice": "20.00",
              "currency": "0x466DD1e48570FAA2E7f69B75139813e4F8EF75c2",
              "orderHash": "0xe5c76cfa585e6a3bf57f07ae1b36c4bdd3fe072efacdc38f605a52ad33ce1044",
              "transactionStatus": true,
              "expTime": 1684972800
          },
          "favorited": true
      },
      ... so on and so forth (returns 5 max)
    ]
    ```
  </details>
  <details>
  <summary>Retrieve latest 5 minted NFTs by Region <pre>/release/newByRegion </pre> </summary>

  * Host: ``` /wivmkt-nft-service/retrieveNewByRegion ``` <br>
  * Body:
    ```json
    {
      "walletAddress": "0xA3873a019aC68824907A3aD99D3e3542376573D0",
      "apiKey": "",
      "region": "Tuscany"
    }
    ```
  * Sample Response:
    ```json
    [
      {
          "tokenID": "3",
          "image": "https://wivmetadata.blob.core.windows.net/polygon-wine-icons/3.jpg",
          "brand": "Continuum",
          "lwin": "11865432017",
          "network": "Mumbai",
          "smartContractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
          "orderDetails": null,
          "favorited": true
      },
      ... so on and so forth (returns 5 max)
    ]
    ```
  </details>
  <details>
  <summary>Retrieve NFT Details for Listable Container <pre>/nfts/missingDetails </pre> </summary>

  * Host: ``` /wivmkt-nft-service/retrieveNFTBrandImage ``` <br>
  * Body:
    ```json
    {
      "ownedTokens": [
          {
              "identifierOrCriteria": "18",
              "contractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
              "network": "Mumbai"
          }
      ],
      "apiKey": ""
    }
    ```
  * Sample Response:
    ```json
    [
      {
          "image": "https://wivmetadata.blob.core.windows.net/polygon-wine-icons/18.png",
          "brand": "Domaine Jean Grivot, Vosne-Romanee",
          "producer": "Domaine Jean Grivot",
          "productionCountry": "France",
          "region": "Burgundy",
          "appellation": "Vosne-Romanee",
          "lwin": "10357402016",
          "heritage": "OLD WORLD",
          "investmentGrade": "Bronze",
          "case": "6 bottles",
          "origin": "SECONDARYMARKET",
          "type": "Red",
          "format": "75 cl",
          "identifierOrCriteria": "18",
          "network": "Mumbai",
          "contractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
          "listingPrice": null
      }
    ]
    ```
  </details>
  <details>
  <summary>Check whether NFT is already listed or in the process of listing <pre>/market/single/listingStatus </pre> </summary>

  * Host: ``` /wivmkt-nft-service/inspectListingStatus ``` <br>
  * Returns: ``` true | false ```
  * Body:
    ```json
    {
      "identifierOrCriteria": "3",
      "contractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
      "network": "Mumbai",
      "apiKey": ""
    }
    ```
  * Sample Response:
    ```json
    false
    ```
  </details>
  <details>
  <summary>Checks NFTs Listing Cancellation status <pre>/market/single/listingCancellationStatus </pre> </summary>

  * Host: ``` /wivmkt-nft-service/inspectListingCancellationStatus ``` <br>
  * Returns: ``` false | 'ongoingUnlist' | 'nonexistent' ```
  * Description: false = no cancellation/unlist, "ongoingUnlist" = ongoing unlist, "nonexistent" = orderHash doesn't exist
  * Body:
    ```json
    {
      "identifierOrCriteria": "3",
      "contractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
      "network": "Mumbai",
      "apiKey": ""
    }
    ```
  * Sample Response:
    ```json
    "nonexistent"
    ```
  </details>
  </ul>
  </details>

  <details closed>
  <summary><b>Favorites Microservice</b></summary>
  <ul>
  <details>
  <summary>Retrieves all favorited NFTs by a wallet address <pre>/favorite/getAll </pre> </summary>

  * Host: ``` /favorites/getAllFavorites ``` <br>
  * Body:
    ```json
    {
      "walletAddress": "0xA3873a019aC68824907A3aD99D3e3542376573D0",
      "apiKey": ""
    }
    ```
  * Sample Response:
    ```json
    [
      {
          "walletAddress": "0xA3873a019aC68824907A3aD99D3e3542376573D0",
          "tokenID": "0",
          "network": "Mumbai",
          "brand": "Screaming Eagle, The Flight",
          "image": "https://wivmetadata.blob.core.windows.net/polygon-wine-icons/0.jpg",
          "orderDetails": {
              "listingPrice": null,
              "currency": null,
              "orderHash": null,
              "transactionStatus": null,
              "expTime": null
          },
          "smartContractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18"
      },
      {
          "walletAddress": "0xA3873a019aC68824907A3aD99D3e3542376573D0",
          "tokenID": "10",
          "network": "Mumbai",
          "brand": "Mondavi, To Kalon Reserve",
          "image": "https://wivmetadata.blob.core.windows.net/polygon-wine-icons/10.jpg",
          "orderDetails": {
              "listingPrice": null,
              "currency": null,
              "orderHash": null,
              "transactionStatus": null,
              "expTime": null
          },
          "smartContractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18"
      },
    ]
    ```
  </details>
  </ul>
  </details>

  <details closed>
  <summary><b>Orders Microservice</b></summary>
  <ul>
  <details>
  <summary>Retrieves all incoming offers for NFTs owned by a wallet address <pre>/orders/incoming</pre></summary>

  * Host: ``` /orders/incomingOffers ``` <br>
  * Body:
    ```json
    {
      "ownedNFTs": [
          {
              "identifierOrCriteria": "43",
              "network": "Mumbai",
              "contractAddress": "0x4e6bb36dacb0af7fb2d5240bfb2c72b63c890a18"
          },
          {
              "identifierOrCriteria": "42",
              "network": "Mumbai",
              "contractAddress": "0x4e6bb36dacb0af7fb2d5240bfb2c72b63c890a18"
          }
      ],
      "sortKey": "expireFirst",
      "brandFilter": "",
      "apiKey": ""
    }
    ```
  * Sample Response:
    ```json
    ```
  </details>
  <details>
  <summary>Retrieves all outgoing offers of a wallet address <pre>/orders/outgoing</pre></summary>

  * Host: ``` /orders/outgoingOffers ``` <br>
  * Body:
    ```json
    {
        "walletAddress": "0xA3873a019aC68824907A3aD99D3e3542376573D0",
        "sortKey": "",
        "brandFilter": "",
        "apiKey": "db33f851-9799-4282-90df-7b6dee1496bb"
    }
    ```
  * Sample Response:
    ```json
    [
        {
            "brand": "Screaming Eagle, The Flight",
            "image": "https://wivmetadata.blob.core.windows.net/polygon-wine-icons/0.jpg",
            "endTime": "1685613900",
            "highestOffer": "35.00",
            "highestOfferCurrency": "0xC1d6EF502Ac5410B3F3706beb6a0808131337Fb6",
            "highestOfferExpTime": "1685095620",
            "offer": "30.00",
            "currency": "0xC1d6EF502Ac5410B3F3706beb6a0808131337Fb6",
            "orderHash": "0x42efba45684760c776c8c0a1507b838bac6766a914f9865482969f633ac266b9",
            "contractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
            "identifierOrCriteria": "0",
            "network": "Mumbai"
        },
        {
            "brand": "Screaming Eagle, The Flight",
            "image": "https://wivmetadata.blob.core.windows.net/polygon-wine-icons/0.jpg",
            "endTime": "1685095620",
            "highestOffer": "35.00",
            "highestOfferCurrency": "0xC1d6EF502Ac5410B3F3706beb6a0808131337Fb6",
            "highestOfferExpTime": "1685095620",
            "offer": "35.00",
            "currency": "0xC1d6EF502Ac5410B3F3706beb6a0808131337Fb6",
            "orderHash": "0x5883c0635ffa6a5888af6f2e59b337200aff26d752b5f1105b0bb72989e5d762",
            "contractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
            "identifierOrCriteria": "0",
            "network": "Mumbai"
        }
    ]
    ```
  </details>
  <details>
  <summary>Retrieves all transactions (sales/transfers) of a wallet address <pre>/orders/allTransactions</pre></summary>

  * Host: ``` /transactions/addressTransactions/ ``` <br>
  * Body:
    ```json
    {
        "walletAddress": "0xA3873a019aC68824907A3aD99D3e3542376573D0",
        "sortKey": "",
        "brandFilter": "",
        "apiKey": "db33f851-9799-4282-90df-7b6dee1496bb"
    }
    ```
  * Sample Response:
    ```json
    [
        {
            "event": "Sell",
            "image": "https://wivmetadata.blob.core.windows.net/polygon-wine-icons/6.jpg",
            "brand": "Beringer, Private Reserve",
            "price": "3.67",
            "currency": "0x466DD1e48570FAA2E7f69B75139813e4F8EF75c2",
            "source": "0x37B4044A9238C4DB0A97c551D165aee3E8C9f95A",
            "timestamp": "1684443633",
            "txnHash": "0xd57484d4467b28de785546e0a9d6ac7db662a08e51bf85d275dae8770bf7f2a7",
            "identifierOrCriteria": "6",
            "contractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
            "network": "Mumbai"
        },
        {
            "event": "Sell",
            "image": "https://wivmetadata.blob.core.windows.net/polygon-wine-icons/5.jpg",
            "brand": "Moueix Dominus",
            "price": "20.00",
            "currency": "0xC1d6EF502Ac5410B3F3706beb6a0808131337Fb6",
            "source": "0x37B4044A9238C4DB0A97c551D165aee3E8C9f95A",
            "timestamp": "1684337123",
            "txnHash": "0xfa8675e4818d5ac8bee2a286eb85384fcfa38b93bd13b46bd734b1ea6412dbf9",
            "identifierOrCriteria": "5",
            "contractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
            "network": "Mumbai"
        }
        ... so on and so forth
    ]
    ```
  </details>
  <details>
  <summary>Retrieves all listings made by a wallet address <pre>/orders/listings</pre></summary>

  * Host: ``` /orders/retrieveListOrders/ ``` <br>
  * Body:
    ```json
    {
        "walletAddress": "0xA3873a019aC68824907A3aD99D3e3542376573D0",
        "sortKey": "",
        "brandFilter": "",
        "apiKey": "db33f851-9799-4282-90df-7b6dee1496bb"
    }
    ```
  * Sample Response:
    ```json
    [
        {
            "brand": "Continuum",
            "image": "https://wivmetadata.blob.core.windows.net/polygon-wine-icons/3.jpg",
            "endTime": "1685055900",
            "highestOffer": null,
            "highestOfferCurrency": null,
            "listingPrice": "20.00",
            "currency": "0xC1d6EF502Ac5410B3F3706beb6a0808131337Fb6",
            "orderHash": "0xb63ba44a6410e9e621f975617eb363be78ffb2c43ba7af285901803a5fab8ea0",
            "contractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
            "identifierOrCriteria": "3",
            "network": "Mumbai"
        },
        {
            "brand": "CVNE, Imperial Reserva",
            "image": "https://wivmetadata.blob.core.windows.net/polygon-wine-icons/42.jpg",
            "endTime": "1684973160",
            "highestOffer": null,
            "highestOfferCurrency": null,
            "listingPrice": "30.00",
            "currency": "0x466DD1e48570FAA2E7f69B75139813e4F8EF75c2",
            "orderHash": "0x992afa2b6fc28871f8db67255da837d5de5df5151686da2a0b6934f68c807c7a",
            "contractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
            "identifierOrCriteria": "42",
            "network": "Mumbai"
        }
    ]
    ```
  </details>
  <details>
  <summary>Get next highest bid of an NFT if a new offer is made or if previous offer is expired<pre>/market/next_highest_bid</pre></summary>

  * Host: ``` /orders/nextHighestBid/ ``` <br>
  * Query Parameters:
    ```
    identifierOrCriteria
    network
    contractAddress
    orderHash
    ```
  * Returns:
    ```json
    {
      "nextHighestBid": "value",
      "nextHighestBidHash": "value",
      "nextHighestBidExpTime": 0,
      "nextHighestBidCurrency": "value"
    }
    or
    null
    ```
  * Sample Response:
    ```json
    {
      "nextHighestBid": "20.00",
      "nextHighestBidHash": "0x65bdcdaf34e57766cc3d37c2cee9e8c114928618ea3656ab996dddad1fc92744",
      "nextHighestBidExpTime": 1684870943,
      "nextHighestBidCurrency": "0xE097d6B3100777DC31B34dC2c58fB524C2e76921"
    }
    ```
  </details>
  <details>
  <summary>Retrieves all kinds of transactions (transfers, offers, lists) and 2 chart data (WIVA and USDC/USDT) <pre>/market/single/investmentTxns</pre></summary>

  * Host: ``` /transactions/retrieveTxnHistory/ ``` <br>
  * Body:
    ```json
    {
        "identifierOrCriteria": "54",
        "contractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
        "network": "Mumbai",
        "apiKey": ""
    }
    ```
  * Sample Response:
    ```json
    {
        "txns": [
            {
                "network": "Mumbai",
                "to": "0x37B4044A9238C4DB0A97c551D165aee3E8C9f95A",
                "from": "0xA3873a019aC68824907A3aD99D3e3542376573D0",
                "event": "Transfer",
                "transactionHash": "0xb804e491c6a5a9a20076ee6e10409d74baf8e85c862507f59ff9ec596b4e8c24",
                "contractAddress": "0x4e6Bb36DAcb0Af7fB2d5240BfB2c72b63c890A18",
                "identifierOrCriteria": "54",
                "timestamp": 1680349981,
                "currency": "0xC1d6EF502Ac5410B3F3706beb6a0808131337Fb6"
            }
            ... so on and so forth
        ],
        "stableChart": [],
        "wivaChart": [
            [
                1677101329000,
                169
            ],
            [
                1677182520000,
                169
            ],
            ... so on and so forth
        ]
    }
    ```
  </details>
  </ul>
  </details>
  </ul>
  </ul>
</details>