## Napping Cats

In this exercice we will create a basic NFT smart contract, and use it to instantiate an NFT collection with some custom functoins

### Instructions

#### Basic NFT
- Create a smart contract `basicNFT`
- Create a `constructor` function that takes a string that will be used as a name for the NFT. 
- Create a public function `ownerOf()` that associate a token to the address of its owner
- Create a public function `TokenURI()` that associate a token to a ressource
- Create a function `transfer(uint, address)` that takes as parameters an identifier (a positive integer) and an address to allow the owner of a NFT to transfert it.

*Optionally you can implement or reuse the full ERC721 sandard*

#### Napping cats
- Create a smart contract `Napping Cats` that inherits from basicNFT
- Its constructor function takes a new parameter, initial price, that fixes the initial sale price of the NFT collection
- Instantiate the first three cats inside the smart contract with for each a json file (0.json, 1.json, 2.json) that contain a field name and a field image that points to a local or online image. NFTs initially don't have an owner

#### Trading functions
- Add to `Napping Cats` a function `listToken(uint256 id, uint256 price)` that lists the token for sale at the proposed price
- Add to `Napping Cats` a function `buyToken(uint256 id)`, payable, that allows an user to buy a token 
    - For the initial sale price defined by the constructor for new tokens
    - For the listed price by the function listToken

*Optionnaly, the price for new tokens is an auction. It starts at 100x of the initial sale price or the last paid price for a new token and decreases over time to reach 0 after 24 hours.*

### Resources
- [ERC721 standart](https://eips.ethereum.org/EIPS/eip-721)
- [Uniform Ressource Identifier Definition](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)

