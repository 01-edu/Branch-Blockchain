## Named Festival

Let's create our first smart contract ! For a beginner friendly environment, I recommend [remix](https://remix.ethereum.org). It is an online IDE that provides many useful functionalities. 

If you want a local environment, more scriptable, you can have a look at [hardhat](https://hardhat.org). 

### Instructions

- First, we need to specify the licence and the solidity version we will be using. If you haven't thought about it, you can use UNLICENSED. 

```js
// SPDX-License-Identifier: UNLICENSED
```
- Pragma specifies the version of solidity we will use. The tests are designed to work with version 0.8.4 of solidity. 
 
```js
pragma solidity ^0.8.4;
```

- Then create a Smart Contract named `NamedFestival`. 

```js
contract NamedFestival {
    //...
}
```

- Create a public function `setName()` that takes a string as parameter and sets the name of the festival


```js
function setName(string memory input) public {
    //...
}
```

- Finally a function `getName()` takes no parameter and retrieves the name
```js
function getName() public view returns (string memory) {
    //...
}
```

### Resources

- [solidity docs](https://docs.soliditylang.org/)
- [learn X in Y](https://learnxinyminutes.com/docs/solidity/)
- [Remix IDE](https://remix.ethereum.org)
- [hardhat](https://hardhat.org)

### Relevance

This is our first smart contract ! 
