### Transactions Quest

_Sometimes science is more art than science. - Rick Sanchez_

Welcome and congratulations for choosing to learn blockchains and cryptocurrencies.

Today we get a first experience in the most core element, transactions. We will use the actual Bitcoin software to create transactions and send them. We will learn to interact with command lines, APIs and wallets to move cryptocurrencies around.

Most open blockchains offer three categories of networks:

- The main network `mainnet` on which value is transacted
- One or several `testnet`, that work more or less similarly to the mainnet with no value
- Local networks, to test locally with a node. It is called `regtest` on Bitcoin.

_🚨 Caution 🚨_
You should not use any crypto with value for any exercise of the module. If you already own crypto, we recommend that you use a new separate wallet to avoid any loss of funds. We will never use the main network of any blockchain `mainnet`.

#### Mandatory

1. [sendTransaction](https://github.com/01-edu/public/blob/master/subjects/blockchain/send-transaction/README.md) _Send a Bitcoin transaction_
2. [retrieveBlockDate](retrieveBlockDate/README.md) _get a block date_
3. [retrieveTransactionValue](retrieveTransactionValue/README.md) _get the value of a transaction_
4. [sendTransactionToPeer](sendTransactionToPeer/README.md) _send a bitcoin transaction to a peer_
5. [sendEthTransaction](sendEthTransaction/README.md) _Send a transaction to an address on a testnet_

#### Optional

6. [retrieveTransactionInOut](retrieveTransactionInOut/README.md) _get inputs and outputs from a transaction_

### Crypto Quest

_When in doubt, use brute force. - Ken Thompson_

Today , we will learn the fundamentals of cryptography that underlies all blockchain projects. We will practice binary variables, hash functions and digital signatures. By the end of the quest, you should be able to create a basic wallet to generate keys, store them and sign transaction.

Buffers are a builtin type in nodejs used to represent binary objects. You create a buffer from any object by using the function `Buffer.from()`. As usual in JavaScript there are a lot of implicit conversions. Be aware for instance that a string representing a number is different from the actual number.

For cryptography, you may have heard how it is used the encryption and decryption of messages. While this is often true, in the blockchain and cryptoassets industries this is not how we will primarily use it. The two families of algorithms we will see are:

**Cryptographic hash** functions are algorithms that take as input any data and produce an unique fingerprint of this data. Those functions are meant to be fast, one way, deterministic.

**Digital signatures** allow to identify the author of a message. It relies on asymmetric cryptography. You first generate randomly a key pair with a public key and a private key. The public key is shared publicly. The private key will allow you to sign a message. More precisely the hash of this message. The public key will allow anyone to verify that this message was properly signed.

From a practical point of view, for today, you only need the builtin library `crypto`.

#### Mandatory

1. [Increment](increment/README.md) _Binary variables in nodejs_
2. [hashFile](hashFile/README.md) _Hash functions, file read in nodejs_
3. [hash160](hash160/README.md) _Hash functions, double hash, sha256, Ripemd160_
4. [semiBrute](semiBrute/README.md) _Hash bruteforce_
5. [signer](signer/README.md) _ECDSA_

#### Optional

6. [generateAddress](generateAddress/README.md) _Key generation, Crypto address_
7. [basicWallet](basicWallet/README.md) _Key storage, transaction signature_

#### Integration:

Launch tests with

```sh
node test.mjs <exercices>
```

### Festival Smart Contract Quest

_We didn't take the Bastille to make an opera out of it! - Pierre Desproges_

Today we will build our first Smart Contracts. Smart Contracts are programs deployed on a blockchain network to provide additional functionalities. In the context of this quest, we will focus on Ethereum Smart Contracts. There main development language is Solidity.

We will create step by step the functionalities of a Smart Contract. The festival consists of information that will be stored in the smart contract such as a name, a lineup of artists, a date and the Smart Contract will provide the minimal capabilities of buying tickets and share benefits.

Each exercise requires a distinct Smart Contract.

#### Mandatory

1. [NamedFestival](NamedFestival.md)
2. [TimeAndPlace](TimeAndPlace.md)
3. [Lineup](Lineup.md)
4. [OrganizedFestival](OrganizedFestival.md)
5. [BuyTickets](BuyTickets.md)
6. [FunAndProfit](FunAndProfit.md)

#### Optional

7. [ArtistsDoWork](ArtistsDoWork.md)
8. [TimeIsMoney](TimeIsMoney.md)

#### Integration

In this Quest, tests can be run with:

```bash
npm i
npx hardhat test
```

Individual tests can be run with

```bash
npx hardhat test tests/<exercise>.test.js
```

### Anchoring

A simple use of blockchains is to anchor documents. We will hash documents and store them in a blockchain.

For this, we will use a local test node and interact with it using JavaScript

#### Mandatory

1. [localNode](localNode.md)
2. [getAccount](getAccount.md)
3. [sendEther](sendEther.md)
4. [sendHash](sendHash.md)
5. [checkDocument](checkDocument.md)
6. [register](register.md)

Keep for later 8. [registerWithEvents](registerWithEvents.md)

#### Integration

In this Quest, tests can be run with

```sh
npm i
npx hardhat node&
npx mocha sendHash.test.js
```

### Connect Interface

_Any problem in computer science can be solved with another layer of indirection. But that usually will create another problem. - David Wheeler_

Today we will learn how to create basic interfaces. All those exercises consist in a single HTML page with Javascript. You will need an Ethereum JavaScript Library, ethers.js and web3.js should be suitable.

#### Mandatory

1. [localNodeInfo](localNodeInfo/README.md)
2. [Random wallet](randomWallet/README.md)
3. [Donation](donation/README.md)
4. [Connect to MetaMask](connectToMetaMask/README.md)
5. [Tip](tip/README.md)

#### Optional

6. [Read a Secret](readSecret/README.md)

#### Integration

In this Quest, tests can be run with

```sh
npm i
npx hardhat node
npx mocha <exercice>.test.js
```

### Simple Tokens

_Listen, I'm not the nicest guy in the universe because I'm the smartest. And being nice is something stupid people do to hedge their bets. - Rick Sanchez_

On of the key factors of blockchain success over the past years has been the creation of standards. Those token standards allow interoperability and composability of smart contracts.

Today, We will start by creating a Minimal Token that provides the basic functionalities of a token. From this, we will build basic services using this token. This will allow us to learn more advanced functionalities of Smart Contracts.

#### Mandatory

1. [Minimal Token](minimalToken/README.md)
2. [Token Sale](tokenSale/README.md)
3. [Usable token](usableToken/README.md)
4. [Basic Swap](basicSwap/README.md)

#### Optional

5. [Eventful token](eventfulToken/README.md)
6. [Transfers History](transfersHistory/README.md)

#### Integration

In this Quest, tests can be run with

```sh
npm i
npx hardhat test tests/<exercice>.test.js
```

### Non Fungible Cats

Today's quest objective is to master Non Fungible Tokens, NFTs.

To represent a simple token, we used a smart contract with with each blockchain address amount of tokens. We talk about fungible token because each token has the same value. A Non-Fungible Token is a token with a unique identifier, usually part of a collection. NFTs are used to represent playing cards, works of art, financial securities and even physical objects.

Internally fungible token that we have seen in the prior quest are represented with a mapping from addresses to an amount:

    Address    ---> Amount
    0x2FE34         20

Non-Fungible Tokens are represented with a mapping of unique identifiers to an owner

    Identifier ---> Address
    123455          0x2FE34

In addition, each token is linked to an Uniform Resource Identifier (URI) where additional information about the NFT can be found, such as metadata, an image...

    Identifier ---> Address
    123455          0x2FE34
               ---> URI
                    bafkreiajlq3

#### Mandatory

1. [Napping cats ](nappingCats/README.md)
2. [Showcase](showcase/README.md)

#### Optional

3. [Automated reveal](automatedReveal/README.md)

### Decentralized Finance

_I accidentally killed it - devops199_

It is time for us to advance beyond basic contracts for integrate with actual DeFi smart contract. For this we will need to use current standards and implementations.

First, we will create a simple stablecoin, following the ERC20 standard and an oracle. We will then create a decentralised exchange that will allow us to exchange our stablecoin. Finally, we will create the tests for this project.

#### Content

1. [stablecoin](stablecoin/README.md)
2. [Lending Platform](lendingPlatform/README.md)
3. [Test and coverage](testsAndCoverage/README.md)

#### Integration

-> Audited

#### Exploring blockchains.

_If you don't believe it or don't get it, I don't have the time to try to convince you, sorry. — Satoshi Nakamoto_

While we have focused on fundamentals and the two main public blockchains, other alternatives and projects have been build over the years. I can only recommend you to try and test various alternatives. Most reuse the same principles that we have seen in the previous quests.

In this course, we will focus on two solutions provided by the Hyperledger project. The Hyperledger project is an umbrella that regroup vastly different technical solution. The solutions we will explore are both lego sets that allow you to create varied projects

#### Content

2. [Private network](privateNetwork/README.md)
1. [Command line wallet](clillet/README.md)

#### Integration

-> Audited
