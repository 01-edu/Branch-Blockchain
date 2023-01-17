#!/bin/bash

# Script to build the docker image and run one or all tests and display a summary of the outcome

## Summary display logic
Results=""
synthesis () {
	if [ $? -eq 0 ]; then
  	Results=$Results$1" ✅, "
	else
		Results=$Results$1" ❌, "
	fi
}

# Variable that is dependent on the local environment
LocalStudentFolder="$(pwd)/student"

# Should replicate the production environement
BaseOptions="--read-only --network none --memory 500M --user 1000:1000 --env HOME=/jail --env TMPDIR=/jail --workdir /jail --tmpfs /jail:size=100M,noatime,exec,nodev,nosuid,uid=1000,gid=1000,nr_inodes=5k,mode=1700 --volume $LocalStudentFolder:/jail/student:ro" 

if [ ! -z "$1" ]; then
	if [ "$1" = "clean" ]; then
		echo "▶️ Clean (docker housekeeping)"
		## Clean and rebuild the docker image. Necessary during development, could be skipped later. 
		# Nuclear : Remove stopped containers, images and volumes
		# docker system prune -a
		# Remove exited docker containers
		docker rm $(docker ps -a -f status=exited -q)
		# docker container prune -f
		# Remove docker images
		docker image prune -f
		exit 0
	elif [ "$1" = "help" ]; then
		echo "Script to build the docker image and run one or all the tests"
		echo ""
		echo "Usage: ./runTests.sh [ clean | help | testName ]"
		echo "testName: one test is run in debug mode, e.g. retrieve-block-date"
		echo "clean: clean the docker environment"
		echo "help: display this help"
		echo "If no parameter is provided, all tests are run"
		exit 0
	fi
	# A specific test has been named, we run it with the debug flag
	docker build . -t blockchain --progress=plain 
	docker run $BaseOptions -e DEBUG=true -e EXERCISE="$1" blockchain:latest
else 
	# No specific test has been named. Run all tests with a summary at the end
	echo "▶️ Docker build"
	docker build . -t blockchain  
	echo "▶️ Running test"
	# -e DEBUG=true available
	for file in ./student/*
	do	
	testname=$(basename "${file%.*}")
	docker run $BaseOptions -e EXERCISE=$testname blockchain:latest
	synthesis $testname
	done
 	echo "▶️ Results"
	echo $Results
fi
exit 0