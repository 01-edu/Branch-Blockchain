## getAccount

We will now interact with our node's API

### Instructions

Create a node script that :
- loads an ethereum javascript library. I recommand `ethers.js`. `Web3.js` is a common alternative.
- create a function `getAccount()` that connects to a local node (`http://localhost:8545`) and that returns the address of the first account available
- export the function


```js
function getAccount() {
    //...
}
module.exports = getAccount
```

### Resources

- [hardhat](https://hardhat.org)
- [ganache](https://www.trufflesuite.com/ganache)
- [ethers](https://docs.ethers.io/)
- [web3](https://web3js.readthedocs.io/)