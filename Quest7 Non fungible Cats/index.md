## Introduction

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

## Content
### Mandatory
1. [Napping cats ](nappingCats/README.md)
2. [Showcase](showcase/README.md)
### Optional
3. [Automated reveal](automatedReveal/README.md)
