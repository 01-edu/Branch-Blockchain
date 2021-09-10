## whatsMyChainAgain

### Instructions

Create a web page, `whatsMyChainAgain.html` that loads an ethereum library, connects to any Ethereum mainnet node and displays basic information :

- In an element with `chainId` as `id`, the number ID of the current network.
- In an element with `lastBlockNumber` as `id`, the number (height) of the last mined block.
- In an element `numberOfTransactions` as `id`, the number of transactions of the last block.

### Hint

Ethers provides some access to remote nodes via `getDefaultProvider`. You can also directly use a service such as Alchemy or Infura. Those services offer a free tier.

### Notions

- [Infura](https://infura.io/)
- [Alchemy](https://www.alchemy.com/supernode)
- [ethers provider](https://docs.ethers.io/v5/api/providers/provider/#Provider--network-methods)
- [web3](https://web3js.readthedocs.io/en/v1.3.4/web3-eth.html)
