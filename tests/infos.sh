#!/bin/sh

# Practical script to display informations about the environment

echo "    User" $(whoami) $USER
echo "    Path:" $PATH
echo "    Exercise: $EXERCISE"
echo "    Node: $(node --version)"  
tree /jail
tree -a -C -s -h --du -L 2 /app
