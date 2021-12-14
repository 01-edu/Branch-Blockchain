#!/bin/sh

set -e
echo "Exercise: $EXERCISE"

# Depending on testfile intermediate extension, we select the type of test
if test -f "/app/${EXERCISE}".jtest.js; 
then
  node /app/test.mjs "/jail/student" "${EXERCISE}"
else
  cp "/app/${EXERCISE}.test.js" /jail
  cp /app/hardhat.config.js /jail
  cp /app/package.json /jail
  cp /app/solc /jail
  ln -s /app/node_modules/ /jail/node_modules
  
  cd /jail 
  # echo "Situation:"
  # ls
  # df -h
  npx hardhat test "/jail/${EXERCISE}.test.js"
fi
