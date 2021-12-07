#!/bin/sh


set -e
echo "Exercise: $EXERCISE"

# Depending on testfile intermediate extension, we select the type of test
if test -f "/app/${EXERCISE}".jtest.js; 
then
  node /app/test.mjs "/jail/student" "${EXERCISE}"
else
  # We copy locally contracts for hardhat (compilation and testing tool). Might be improved
  mkdir /app/contracts
  cp "/jail/student/${EXERCISE}.sol" /app/contracts/
  # Luanching tests
  npx hardhat test "/app/${EXERCISE}.test.js"
fi
