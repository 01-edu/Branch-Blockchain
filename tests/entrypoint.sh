#!/bin/sh

## Debugging info 
DEBUG=false

if [ $DEBUG = true ]; then
  echo ">>> Entrypoint <<<"
  echo "    User" $(whoami) $USER
  echo "    Path:" $PATH
  echo "    Exercise: $EXERCISE"
  echo "    Node: $(node --version)"  
  tree /jail
  set -x
else 
  set -e
fi

# testfiles in the main folder are regular js tests
if test -f "/app/${EXERCISE}".test.js; 
then
  echo ">> Node test <<"
  node /app/test.mjs "/jail/student" "${EXERCISE}"

elif test -f "/app/test/${EXERCISE}".test.js; then
  echo ">> Solidity (HH) test <<"
  mkdir -p /jail/test
  cp "/app/test/${EXERCISE}.test.js" /jail/test

  # Might be optionnal
  cp /app/hardhat.config.js /jail
  cp /app/package.json /jail

  ln -s /app/node_modules/ /jail/node_modules
  
  cd /jail 
  if [ $DEBUG = true ]; then
    echo "> DEBUG: Folder & tool <"
    tree 
    ls -al
    solc --version
    npx hardhat --version
    df -h
    echo "> Launch tests <"
    npx hardhat --verbose test "/jail/test/${EXERCISE}.test.js"
  else 
    npx hardhat test "/jail/test/${EXERCISE}.test.js"
  fi 
else 
  echo "Entrypoint> No suitable test found"
fi
