## Besu Private Network

Besu in an alternative Ethereum client that is compatible with Ethereum mainnet. It facilitates the deployment of private networks. Will we use the QBFT consensus algorithm, a Proof of Authority Byzantine Fault Tolerant algorithm

### Instructions
- It must be a private network of 4 nodes
- It must use the QBFT consensus algorithm
- Chain id must be set to 2222
- blocktime must be set to 2 seconds
- the Lending Platform must be deployed on the network
- The keys to the owner(s) of the Lending Platform must be stored in a file called `keys.json`
- A script must be provided to launch the network using the data in the node folders

The final project should have the following structure
```console
Network/
├── NodeA
│   └── data
├── NodeB
│   └──data
├── NodeC
│   └── data
├── NodeD
|   └──data
├── Contracts
├ genesis.json
├ launch.sh
├ README.md
├ keys.json
```

## Ressources
- [Private network explanation](https://ethereum.org/wiki/private-networks)
- [Launch a private network with Besu tutorial](https://besu.hyperledger.org/en/stable/Tutorials/Private-Network/Create-QBFT-Network/)
- [Overview on industrial usage of private network](https://www.sciencedirect.com/science/article/pii/S209672092200029X)