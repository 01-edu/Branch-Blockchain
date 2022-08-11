## Lending platform

We will create a platforms that allow borrowers tokens from lenders in a decentralized manner around a volatile and a stable token. Lenders will earn a fixed yield of 5% per year. 

### Instructions
- Create or import an implementation of the ERC20 standard mandatory functions with additionally the `name()` optional function. (you can add other optional functions).
- Create a script and the documentation to deploy instances of this ERC20 implementation:
    - `Volatile`
    - `Stable`
    - `lStable` 
    - `lVolatile`

- Expand the `oracle` smart contract from the prior exercise:
    - Add a function `getPrice()` that gives the current value of `Volatile` in `Stable`
    - Add a function `setPrice(uint)` that allow to set the value of `Volatile` in `Stable`

- Create a `LendingPlatform` smart contract with : 
    - A constructor that takes in parameters the addresses the tokens mentioned above
    - A function `registerOracle(address)` that identifies the oracle used
    - A function `depositStable(amount)` that allows a lender to deposit the amount in the Stable token. In exchange, the lender will receive the corresponding amount in lStable. 
    - A function `depositVolatile(amount)` that allows an user to deposit the amount in the Volatile . In exchange, the lender will receive the corresponding amount in lVolatile.
    - A function `borrowStable(amount)` that allows a borrower to borrow the amount in the Stable token. It will be required to have more at 150% of its value in volatile token. 
- Add a `liquidate(address)` function that allows any user to liquidate the full position of any user which current position is below the 150% threshold. The liquidator needs to provide 110% of the value of the position in the Stable token and will receive the reminder of the value

*Optional provide a web interface for the lending platform*

### Resources
- [ERC20 token standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)
- For inspiration, [AAVE documentation](https://docs.aave.com/hub/)

