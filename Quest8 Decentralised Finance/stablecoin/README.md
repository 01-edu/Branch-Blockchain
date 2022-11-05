## Sablecoin

The purpose of this exercise is to create a fully collateralised stablecoin. We will use an oracle smart contract to get the current value of any volatile token

### Instructions
First, we need a very basic oracle smart contract.
- Create a smart contract `oracle`
- Add a function getEthPrice() that gives the current value of Ether
- Add a function setEthPrice() that allows the owner of the contract to set the value of Ether

Then, we will create a stablecoin smart contract. It will allow user to mint and burn the stablecoin providing they have the correct amount of collateral.
- Create a `stablecoin` smart contract that inherit from the ERC20 standard
- Add a function `registerOracle` that identifies the oracle smart contract
- Add a payable function `deposit()` that allow the user to deposit Ether to the contract
- Add a `withdraw(amount)` function that allows any user to receive the corresponding value in Ether providing the user has a sufficient position.
- Add a function `mint(amount)` that allow the user to mint the stablecoin for up to half the value deposited in Ether
- add a `burn(amount)` function that allows any user to burn the corresponding value in stablecoin providing the user has a sufficient position.

And, the keystone, we allow any user to punish users that issued more tokens than they should.
- Add a `liquidate(user)` function that allows any user to liquidate the position of any user which current position is below this 1:2 ratio. The liquidator must provide the corresponding value in stablecoin and receives 80% of the outstanding deposit in Ether.


### Resources
- [ERC20 token standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)
- For inspiration, [MakerDao documentation](https://docs.makerdao.com/)