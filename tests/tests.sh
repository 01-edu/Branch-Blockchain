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