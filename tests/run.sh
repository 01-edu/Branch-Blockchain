#!/bin/bash

# This script runs tests in a docker container. 

# Constants that can be adapted depending on the environment.
STORAGE_STUDENT="$(pwd)/student"
TEMP_STUDENT="$(pwd)/student.temp"
rm -rf $TEMP_STUDENT # For debugging purposes, the temporary folder is removed a the beginning of the next run
# These docker options should replicate the production environement
BaseOptions="--read-only --network none --memory 500M --cpus 2.0 --user 1000:1000 --env USERNAME=🧑‍🎓 --env HOME=/jail --env TMPDIR=/jail --workdir /jail --tmpfs /jail:size=100M,noatime,exec,nodev,nosuid,uid=1000,gid=1000,nr_inodes=5k,mode=1700 --volume $TEMP_STUDENT:/jail/student:ro"

# Initialisation of display variables (for clarity)
Results=""
testNumber=0
totalRuntime=0

displayHelp() {
	#Display help (as it is formated here)
	echo "Script to run tests in a docker container
	
Usage: $0 [clean|nuclear|testName|help]
	
Commands:
	clean:		Remove exited docker containers and images
	nuclear:	Remove all stopped containers, images and volumes
	testname:	Run a specific test in debug mode. E.g.: $0 retrieve-block-date
	help: 		Display this help

If no parameters are provided, all tests are run."
}

synthesis() {
	if [ $? -eq 0 ]; then
		currentRuntime=$(($(date +%s%N) - $date))
		totalRuntime=$(($totalRuntime + $currentRuntime))
		if [ $currentRuntime -gt 10000000000 ]; then
			Results="$Results$1 ⏰ $(($currentRuntime / 1000000000)), "
		else
			Results="$Results$1 ✅ $(($currentRuntime / 1000000000)), "
		fi
	else
		Results=$Results$1" ❌, "
		echo "❌ $1 ❌" # Identify errors more easily
		tree $TEMP_STUDENT
	fi
	testNumber=$((testNumber + 1))
}

# Check if there is an argument: 
if [ ! -z "$1" ]; then
	if [ "$1" = "clean" ]; then
		echo "▶️ Clean (docker housekeeping)"
		## Clean and rebuild the docker image. Necessary during development, could be skipped later.
		# Remove exited docker containers
		docker rm $(docker ps -a -f status=exited -q)
		# docker container prune -f
		# Remove docker images
		docker image prune -f
		# Remove temporary student folder
		rm -rf $TEMP_STUDENT
		exit 0
	elif [ "$1" = "nuclear" ]; then
		# Nuclear : Remove stopped containers, images and volumes
		docker system prune -af
		rm -rf $TEMP_STUDENT
		rm -rf node_modules
		exit 0
	elif [ "$1" = "help" ]  || ["$1" = "-h"]; then
		displayHelp
		exit 0
	fi
	# A specific test has been named, we run it with the debug flag
	docker build . -t blockchain --progress=plain
	mkdir -p $TEMP_STUDENT
	cp $STORAGE_STUDENT/$1.{sol,js,html,mjs} $TEMP_STUDENT 2>/dev/null
	time docker run $BaseOptions -e DEBUG=true -e EXERCISE="$1" blockchain:latest
else
	# No specific test has been named, run all tests with a summary at the end
	echo "▶️ Docker build"
	docker build . -t blockchain
	echo "▶️ Running test"
	# -e DEBUG=true available
	mkdir -p $TEMP_STUDENT
	for file in $STORAGE_STUDENT/*; do
		testname=$(basename "${file%.*}")
		rm $TEMP_STUDENT/* # for debugging, the folder is left and removed at the next run
		cp $STORAGE_STUDENT/$testname.{sol,js,html,mjs} $TEMP_STUDENT 2>/dev/null
		sleep 0.1
		date=$(date +%s%N)
		docker run $BaseOptions -e EXERCISE=$testname blockchain:latest
		synthesis $testname
	done
	sleep 1
	echo "▶️ Results"
	echo $Results
	echo "$testNumber tests ran in $(($totalRuntime / 1000000 / $testNumber)) ms avg"
fi
exit 0
