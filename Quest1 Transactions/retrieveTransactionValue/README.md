## Signer 

### Instructions

Using a public bitcoin API of Bitcoin testnet

Create a function `retrieveTxValue` that takes as input a hash of a simple transaction, and returns the total value transfered in this transaction in bitcoins.


#### Example

```js
txHash = 'd030023d96b9170af9ec2fe5d9b62a5eacbcbf144c68f3f45d68bca72d1d3649'
retrieveTxValue(txHash) // Expected : 0.001
```

*Nota bene: Internally, Bitcoin uses satoshis, 1 satoshi = 10^-8 bitcoin*


### Relevance

- Satoshi

### Notions

- [blockcypher API](https://www.blockcypher.com/dev/bitcoin/#blockchain-api)
- [Node.js https module](https://nodejs.org/api/https.html)
- [Async function in Javascript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function)