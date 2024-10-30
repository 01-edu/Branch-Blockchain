#!/bin/bash

# This script is expected to run in the docker environment provided in the Dockerfile.
# It can be run in this environment with `DEBUG=false EXERCISE=retrieveBlockDate ./entrypoint.sh`

## Constants
CONTENT_FOLDER=/app
export NODE_OPTIONS="--dns-result-order=ipv4first"

shopt -s expand_aliases
alias xx='bunx --bun' # alternatives : 'npx' 'bunx --bun'

## Debugging info
if [ $DEBUG ]; then
  echo ">>> Entrypoint script in debug mode <<<"
  /app/infos.sh
  # set -x # Can be used to identify commands launched
else
  set -e
fi

## Base files for node and solidity tests
cp /app/package.json /jail
ln -s /app/node_modules/ /jail/node_modules

## Distinct test environments are triggered depending in the test file folder
if test -f "/app/btc/${EXERCISE}".test.js; then
  # Bitcoin related tests (Quest 1)
  [ $DEBUG ] && (echo ">> Bitcoin test <<")
  cp -r /home/xa/.bitcoin .
  bitcoind -daemon -daemonwait -datadir=/jail/.bitcoin
  if [ $DEBUG ]; then
    tree -C ~/.bitcoin
    bitcoin-cli loadwallet "testwallet"
    bitcoin-cli getbalance
    bitcoin-cli listwallets
    bitcoin-cli getblockchaininfo
  fi
  npx mocha -b "/app/btc/${EXERCISE}.test.js"

elif test -f "/app/js/$EXERCISE.test.js"; then
  # Pure js tests
  [ $DEBUG ] && (echo ">> Pure JS test <<")
  npx mocha -b "/app/js/${EXERCISE}.test.js"

elif test -f "/app/mjs/${EXERCISE}.test.js"; then
  # Tests relying on the test.mjs (Quest 2)
  [ $DEBUG ] && (echo ">> JS test (test.mjs)<<")
  node /app/test.mjs ${EXERCISE}

elif test -f "/app/sol/$EXERCISE.test.js"; then
  # Pure solidity tests (Quest 3)
  [ $DEBUG ] && (echo ">> Solidity test (HH) <<")
  mkdir -p /jail/test
  cp /app/sol/${EXERCISE}.test.js /jail/test/
  cp /app/hardhat.config.js /jail/
  cd /jail

  # TOCHECK Solution to ensure that only one contract is compiled at the time
  # If /jail/student had only the submitted zip, they could be run directly with ro benefit, with proper hardhat path config
  # We could also adapt subjects to ensure that there is no duplicate contract name either loading prior exercise
  # (but we need to be sure that they are available), or by renaming duplicated contract within a new file.
  mkdir -p /jail/contracts
  cp /jail/student/${EXERCISE}.sol /jail/contracts/

  if [ $DEBUG ]; then
    solc --version
    xx hardhat --version
    df -h
    tree /jail
    xx hardhat --verbose test "/jail/test/${EXERCISE}.test.js"
    tree /jail
  else
    xx hardhat test "/jail/test/${EXERCISE}.test.js"
  fi

elif test -f "/app/web3/${EXERCISE}".test.js; then
  # Interface related tests
  [ $DEBUG ] && (echo ">> Web3 interface test <<")
  mkdir -p /jail/test
  cp /app/hardhat.config.js /jail/
  # When using the default chromium, this brings the configuration to the jail to redirect cache
  # cp /app/puppeteer.config.cjs /jail/

  cp "/app/web3/${EXERCISE}.test.js" /jail/test
  # Launch a local node
  xx hardhat node >/dev/null &
  echo "Waiting for Hardhat server to start..."

  # Loop until the server responds
  until nc -z localhost 8545; do
    echo "Server is not up yet. Retrying in a seconds..."
    sleep 1
  done

  echo "Hardhat server is up!"
  # Launch the tests
  xx hardhat test "/jail/test/${EXERCISE}.test.js"
else
  # Failure
  echo "Entrypoint> No suitable test found for $EXERCISE"
  tree -I node_modules /app
  exit 1
fi
