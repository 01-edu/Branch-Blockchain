#!/bin/bash

# Script to build the docker image and run one or all tests and display a summary of the outcome

## Summary display logic
Results=""
synthesis () {
	if [ $? -eq 0 ]; then
  	Results=$Results$1" ✅ | "
	else
		Results=$Results$1" ❌ | "
	fi
}

## Clean and rebuild the docker image. Necessary during development, could be skipped later. 
echo "▶️ Docker housekeeping"
# Nuclear : Remove stopped containers, images and volumes
# docker system prune -a
# Remove exited docker containers
docker rm $(docker ps -a -f status=exited -q)
# docker container prune -f
# Remove docker images
docker image prune -f

echo "▶️ Docker build"
#docker build . -t blockchain --progress=plain 
docker build . -t blockchain  

# Variable that is dependent on the local environment
LocalStudentFolder="$(pwd)/student"

# Should replicate the production environement
BaseOptions="--read-only --network none --memory 500M --user 1000:1000 --env HOME=/jail --env TMPDIR=/jail --workdir /jail --tmpfs /jail:size=100M,noatime,exec,nodev,nosuid,uid=1000,gid=1000,nr_inodes=5k,mode=1700 --volume $LocalStudentFolder:/jail/student:ro" 


if [ ! -z "$1" ]; then
	# A specific test has been named, we run it with the debug flag
	docker run $BaseOptions -e DEBUG=true -e EXERCISE="$1" blockchain:latest
	synthesis "$1"
else 
	# no specific test has been named. run all tests
	echo "▶️ BTC test"
	# -e DEBUG=true available
	docker run $BaseOptions -e EXERCISE=retrieveBlockDate blockchain:latest
	synthesis "BTC 1"
	docker run $BaseOptions -e EXERCISE=retrieveTransactionValue blockchain:latest
	synthesis "BTC 2"

	echo "▶️ JS test using test.mjs"
	docker run $BaseOptions -e EXERCISE=hash160 blockchain:latest
	synthesis "JS (test) 1"
	docker run $BaseOptions -e EXERCISE=hashFile blockchain:latest
	synthesis "JS (test) 2"

	echo "▶️ JS test using Mocha"
	docker run $BaseOptions -e EXERCISE=sendTransaction blockchain:latest
	synthesis "JS (mocha)"

	echo "▶️ Solidity test"
	docker run $BaseOptions -e EXERCISE=namedFestival blockchain:latest
	synthesis "Sol"

	echo "▶️ Interface test"
	docker run $BaseOptions -e EXERCISE=localNodeInfo blockchain:latest
	synthesis "web3"
fi
echo "▶️ Results "$Results