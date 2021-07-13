## Send hash

We will register the hash of a document on the blockchain

### Instructions

Write a node script that provides a function `sendHash()` that:
- create a hash `sha256` of a string provided as parameter
- connects to a local node (`http://localhost:8545`) and
- sends a transaction to an address with the hash of the document in the `data` field

```js
function sendHash(text) {
    //...
}
module.exports = sendHash
```

### Resources

- [hardhat](https://hardhat.org)
- [ganache](https://www.trufflesuite.com/ganache)
- [ethers](https://docs.ethers.io/)
- [web3](https://web3js.readthedocs.io/)
