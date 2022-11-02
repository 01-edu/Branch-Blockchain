## Send transaction to peer

You will send your first peer-to-peer transaction between two students.

### Instructions

- Create manually an address on **Bitcoin testnet** using any wallet. You can use bitcoin-cli configured on testnet or any other wallet.

- Get testnet Bitcoin from a faucet (see below).

- Send a transaction of 0.00001337 bitcoins to another student.

- Retrieve the main information from the transaction from a public API or a node (using for instance `bitcoin-cli gettransaction`)
        - Transaction hash "txid
        - Transaction fee "fee"
        - Transaction amount "amount"
        - Transaction date "time"
    
- Store the

### Usage

```js
exports.tx = {
  "amount": -0.00001337,
  "fee": -0.00000003,
  "txid": "95952d9bf7542dfa0c98486495f1ae432a8738bbd7da051915d0aca1bec1f9",
  "time": 1789670282,
  "timereceived": 1789670282,
  "hex": "02000000000101ab6873a9b39bc5be93ca6f75794aa235000000000feffffff0245e7052a0100000016001fb9bb786ac90f008c513fb4c545f21d561fa00000000146beada555da374454e9460220fced3cbbbd7e8ba02473044022b4a4e68743a0a51edb346228a54c0b7b1c00000000"
}
```

Congrats for your first real peer to peer Bitcoin transaction! 

### Utilities

- A cross platform multi-currency wallet [Bitpay wallet](https://bitpay.com/wallet/)
- A Bitcoin explorer [bitcoin testnet explorer](https://blockstream.info/testnet/)
- [faucet 1](https://kuttler.eu/en/bitcoin/btc/faucet/)
- [faucet 2](https://bitcoinfaucet.uo1.net/)
- [faucet 3](https://testnet-faucet.com/btc-testnet/)