#!/bin/sh

# Practical script to display informations about the environment

echo " 🤓 User: $(whoami) $USER, Path: $PATH, Exercise: $EXERCISE"
echo "    Node: $(node --version)"  
# Print jail/ : all (a), size (s h du) with color (C)
tree -a -s -C -h --du /jail
# Print all app/ limited to 2 depth and without node_modules
tree -a -C -s -h --du -L 2 -I node_modules /app 
