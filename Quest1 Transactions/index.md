## Introduction

Today we get a first experience in the most core element of blockchains and cryptocurrencies transactions. We will use actual client software to create a transaction and send it to a local network. 

We will learn to interact with public APIs and wallets to move cryptocurrencies around.

Most blockchains offer three categories of networks:

- The main network `mainnet` on which value is transacted
- One or several `testnet`, that work more or less similarly to the mainnet with no value
- Local networks, to test locally with a node. It is called `regtest` on Bitcoin. 

*🚨 Caution 🚨*
You should not use any crypto with value for any exercise of the module. If you already own crypto, we recommend that you create a new separate wallet, configured to testnets, to avoid any loss of funds. We will never use `mainnet` wallets for any exercise.

## Content

### Mandatory

1. [sendTransaction](sendTransaction/README.md) _Send a Bitcoin transaction_
2. [retrieveBlockDate](retrieveBlockDate/README.md) _get a block date_
3. [retrieveTransactionValue](retrieveTransactionValue/README.md) _get the value of a transaction_
4. [sendTransactionToPeer](sendTransactionToPeer/README.md) _send a bitcoin transaction to a peer
5. [sendEthTransaction](sendEthTransaction/README.md) _Send a transaction to an address on Kovan testnet_
### Optional
6. [retrieveTransactionInOut](retrieveTransactionInOut/README.md) _get inputs and outputs from a transaction_
