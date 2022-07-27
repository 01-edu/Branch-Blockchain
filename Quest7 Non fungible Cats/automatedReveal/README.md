## Automated reveal. 

In some auctions, NFT images are only revealed once purchased. 

For this we will create a node server that will serve the images only once they are purchased.


### Instructions
- Create a node server file index.js 
- Listen on port 3030 and connect to a local node 8545
- Add the nappingCats exercise, modifying tokenURI to match the local node server
- The server is launched with a smart contract address as parameter
- For each request for an image X.jpg, only return it if the token has an owner.
- Optionnally, using IPFS
    - The Json file contain the futur hash of tokens on IPFS
    - The server periodically monitor the smart contract for new owners
    - Once a new owner is found, the image is published on a local or remote IPFS server

### Resources

- [Express documentation](https://expressjs.com/en/4x/api.html)
- [IPFS documentation](https://docs.ipfs.tech/reference/)
- [Pinata documentation (commercial pining serivce)](https://docs.pinata.cloud/pinata-api/pinning-services-api)