#!/bin/sh

set -e
echo "Exercise: $EXERCISE"
# Depending on testfile intermediate extension, we select the type of test
if test -f "/app/${EXERCISE}".jtest.js; 
then
  node /app/test.mjs "/jail/student" "${EXERCISE}"
else
  cd /jail
  npx hardhat test "/jail/tests/${EXERCISE}.test.js"
fi
