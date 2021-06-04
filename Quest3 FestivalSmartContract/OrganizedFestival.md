## OrganisedFestival

In order for our festival to be properly managed, we need to define an organizer. The organizer will be the only user to have the right to modify certain properties. By default, we will define the organizer to be the deployer of the contract.

### Instructions

- Create a new Smart contract `OrganisedFestival`
- Add a `constructor` function that takes as parameter an `uint` to represent the date of the festival and a `string` to register its place (Like in `TimeAndPlace`)
- Add functions `getStartTime` and `getPlace` that retrieve the starting time and place.
- Add functions `updateStartTime` and `updatePlace` that update the corresponding value only if the caller of the function is the original deployer of the Smart Contract
- 
*Hint: The constructor function might save the address of the deployer of the contract in an internal variable*


### Resources
- [solidity docs: control structures](https://docs.soliditylang.org/en/v0.8.4/control-structures.html)
- [solidity docs: Transaction properties](https://docs.soliditylang.org/en/v0.8.4/units-and-global-variables.html)
### Relevance

We learn constructors and conditions