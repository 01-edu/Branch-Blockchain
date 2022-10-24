#!/bin/bash

# Script to build the docker image and test one test of each category. It should display 

## Summary display logic
Results=""
synthesis () {
	if [ $? -eq 0 ]; then
  	Results=$Results$1" ✅ "
	else
		Results=$Results$1" ❌ "
	fi
}

echo "> docker build"
docker build . -t blockchain --progress=plain 

# Variable that isdependent on the local environment
LocalStudentFolder="/home/$USER/code/01Branch-Blockchain/tests/student"

# Should replicate the production environement
BaseOptions="--read-only --network none --memory 500M --user 1000:1000 --env HOME=/jail --env TMPDIR=/jail --workdir /jail --tmpfs /jail:size=100M,noatime,exec,nodev,nosuid,uid=1000,gid=1000,nr_inodes=5k,mode=1700 --volume $LocalStudentFolder:/jail/student:ro" 

echo "▶️ BTC test"
# -e DEBUG=true available
docker run $BaseOptions -e EXERCISE=retrieveBlockDate blockchain:latest
synthesis "BTC"

echo "▶️ JS test using test.mjs"
docker run $BaseOptions -e EXERCISE=hash160 blockchain:latest
synthesis "JS (test)"

echo "▶️ JS test using Mocha"
docker run $BaseOptions -e EXERCISE=sendTransaction blockchain:latest
synthesis "JS (mocha)"

echo "▶️ Solidity test"
docker run $BaseOptions -e EXERCISE=namedFestival blockchain:latest
synthesis "Sol"

echo "▶️ Results"$Results