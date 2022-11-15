# Raid 2 Wallet

The goal is to create a fully functional command line wallet for a blockchain of your choice. You can choose any of the major alternative blockchains: Solana, Tezos, Poladot, Cosmos... The executable `clillet` must follow and implement the help description below. Our wallet consists of the following subcommands
- `generate` to generate a new wallet
- `import <file>` to import a wallet from a file
- `connect <endpoint>` to connect to an existing blockchain node
- `balance` to list in the main currency and common tokens of the platform
- `send <destination> <amount>` a high level command to send assets over the network. 

The documentation must provide an endpoint to connect to a blockchain node of the testnet network with necessary information to create an account to access this endpoint if needed and to retrieve tokens from a faucet.

## Output and functionalities
    
```console
$ clillet --help
NAME:
   clillet - the multicurrency wallet

   Copyright 2022-today The authors of clillet

USAGE:
    clillet [options] [command] [<arguments>...]

VERSION:
   0.0.1

FLAGS:
    -h, --help
            Prints help information

    -V, --version
            Prints version information


COMMANDS:
   generate                      Generates a new wallet and prints the mnemonic
   import <file>                 Imports a wallet from a file
   export <file>                 Export the wallet to a file
   connect <endpoint>            Connect to a blockchain node
   balance                       Get the balance for the current loaded wallet
   send <destination> <amount>   sends assets to a destination

## Deliverable
The project must provide an executable file that complies with the specifications