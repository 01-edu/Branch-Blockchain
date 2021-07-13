## Introduction

Today we will build our first Smart Contracts. Smart Contracts are programs deployed on a blockchain network to provide additional functionalities. In the context of this quest, we will focus on Ethereum Smart Contracts. There main development language is Solidity.

We will create step by step the functionalities of a Smart Contract. The festival consists of information that will be stored in the smart contract such as a name, a lineup of artists, a date and the Smart Contract will provide the minimal capabilities of buying tickets and share benefits.

Each exercise requires a distinct Smart Contract.

## Content

### Mandatory

1. [NamedFestival](NamedFestival.md)
2. [TimeAndPlace](TimeAndPlace.md)
3. [Lineup](Lineup.md)
4. [OrganizedFestival](OrganizedFestival.md)
5. [BuyTickets](BuyTickets.md)
6. [FunAndProfit](FunAndProfit.md)

### Optional

7. [ArtistsDoWork](ArtistsDoWork.md)
8. [TimeIsMoney](TimeIsMoney.md)

## Integration

In this Quest, tests can be run with:

```
npm i # Once
npx hardhat test tests/<exercise>.test.js
```
