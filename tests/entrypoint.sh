#!/bin/bash
# Changed to bash as [] as a test might be a bashism. To be checked later

# This script is expected to run in the docker environment provided in the Dockerfile. 
# It can be run in this environment with 
# `DEBUG=false EXERCISE=retrieveBlockDate ./entrypoint.sh`
CONTENT_FOLDER=/app
# Debugging info 
if [ $DEBUG ]; then
  /app/infos.sh
  set -x
# else 
#   set -e
fi

# Base files are available
cp /app/package.json /jail
ln -s /app/node_modules/ /jail/node_modules
cp -r /root/.cache /jail

# Distinct test environments are triggered depending in the test file folder

if test -f "/app/btc/${EXERCISE}".test.js; 
then
  # Bitcoin related tests (Quest 1)
  [ $DEBUG ] && ( echo ">> Bitcoin test <<" )
  cp -r /home/xa/.bitcoin .
  # bitcoind -conf=/home/xa/.bitcoin/bitcoin.conf -datadir=/home/xa/.bitcoin -daemon -daemonwait 
  bitcoind -daemon -daemonwait 

  npx mocha "/app/btc/${EXERCISE}.test.js"

elif test -f "/app/js/$EXERCISE.test.js"; then
  # Pure js tests (Quest 1)
  [ $DEBUG ] && ( echo ">> Pure JS test <<" )
  npx mocha "/app/js/${EXERCISE}.test.js"

elif test -f "/app/mjs/${EXERCISE}.test.js"; then
  # Tests relying on the test.mjs (Quest 2)
  [ $DEBUG ] && ( echo ">> JS test (test.mjs)<<" )
  node /app/test.mjs ${EXERCISE}

elif test -f "/app/sol/$EXERCISE.test.js"; then
  # Pure solidity tests (Quest 3)
  [ $DEBUG ] && ( echo ">> Solidity test (HH) <<" )
  mkdir -p /jail/test
  cp /app/sol/${EXERCISE}.test.js /jail/test/
  cp /app/hardhat.config.js /jail/
  cd /jail

  if [ $DEBUG ]; then
    echo "> Debug Info <"
    solc --version
    npx hardhat --version
    df -h
    echo "> Launch tests <"
    npx hardhat --verbose test "/jail/test/${EXERCISE}.test.js"
  else 
    npx hardhat test "/jail/test/${EXERCISE}.test.js"
  fi 

# Failure
else 
  echo "Entrypoint> No suitable test found for $EXERCISE"
  tree -I node_modules /app 
  exit 1
fi
