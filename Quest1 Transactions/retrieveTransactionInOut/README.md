## Retrieve Transaction In and OUt 

### Explanation

A Bitcoin transaction consists of one or several inputs and one or several outputs. The sum of the inputs is slightly superior to the sum of output to take into account the fee. Some transactions, called "coinbase", are financing miners and do not have a valid input. Some outputs might be null too.

This model is referred to as `UTXO` for "Unspend Transaction Outputs", as there is a ongoing list of unspend outputs.

#### A simple transaction:
|  -> In	|  Out ->	|
|----       |----	|
|   0.50 	|  0.30	|
|   	    |  0.19	|

*+ 0.01 fee*

### Instructions

Using a public bitcoin API of Bitcoin testnet

Create a function `retrieveTxValue` that takes as input a hash of a simple transaction, and returns an object with an array of inputs values and an array outputs values in this transaction.

#### Example:

```js
txHash = 'd030023d96b9170af9ec2fe5d9b62a5eacbcbf144c68f3f45d68bca72d1d3649'
retrieveTxData(txHash) 
/* Expected : 
    { 
      in: [ 0.18075094 ], 
      out: [ 0.001, 0.1797493 ] 
    }
*/
```

### Relevance
Discover a Bitcoin transaction structure

### Notions

- [blockcypher API](https://www.blockcypher.com/dev/bitcoin/#blockchain-api)
- [Node.js https module](https://nodejs.org/api/https.html)
- [Node.js axios module](https://github.com/axios/axios)
- [Async function in Javascript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function)