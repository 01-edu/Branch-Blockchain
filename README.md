# ⛓️ Branch Blockchain

[![🐳 On Master - Build and Test Docker Image](https://github.com/01-edu/Branch-Blockchain/actions/workflows/ga-image-build-master.yml/badge.svg?branch=master)](https://github.com/01-edu/Branch-Blockchain/actions/workflows/ga-image-build-master.yml)

Repository for the blockchain branch content and tests.

## Content 📖

Exercises increase progressively in difficulty. They are designed to teach the fundamentals of blockchains, as well as the main technologies and tools used in the industry.

The content is organized into *quests*, that offer several exercises on a topic, *raids*, that are larger collaborative exercises, and *projects*, to explore further. It should take two to three weeks to complete the *quests* and *raids*.

- Quest 1: Experiment with basic Bitcoin transactions
- Quest 2: Learn fundamental cryptography
- Quest 3: Create a complete Smart Contract
- Quest 4: Scripted interactions with the Ethereum blockchain
- Quest 5: Create a complete decentralised application
- Raid 1: Create a signing service
- Quest 6: Create your first token
- Quest 7: Develop an NFT based DApp
- Quest 8: Learn the basics of DeFi and security
- Quest 9: Explore other blockchains
- Raid 2: Create a tracking service

For more details, see the [introductions](introductions.md) for each quest and the corresponding [subjects](https://github.com/01-edu/public/tree/master/subjects/blockchain).


## Tests ⚙️

Within the `tests/` folder, `run.sh` builds a docker image and runs the tests. Solutions are expected to be in a `tests/student` folder. For each available solution file, the appropriate test will be launched individually. The Docker daemon or Docker Desktop needs to be running.

### Run tests collectively
```shell
cd tests
./run.sh
```

The final output will provide a summary of your test results as well as performance indicators. For example:

```shell
artists-do-work ✅ 4, basic-swap ✅ 4, basic-wallet ✅ 0, buy-tickets ✅ 2, check-document ✅ 6, 
connect-to-metamask ✅ 5, donation ✅ 6, eventful-token ✅ 3, fun-and-profit ✅ 3
tests ran: 9 in 4261 ms on average.
```

### Run tests individually
It is possible to run a test individually by specifying the exercise. Debug mode will be enabled by default.
```shell
cd tests
./run.sh retrieve-block-date 
```

### Underlying commands
The following underlying commands can be executed from the `tests/` folder:

```shell
# build the docker image
docker build . -t blockchain 

# Run a specific Bitcoin test
docker run --read-only --network none --memory 500M --user 1000:1000 -e DEBUG=true -e EXERCISE=retrieve-block-date --env HOME=/jail --env TMPDIR=/jail --workdir /jail --tmpfs /jail:size=100M,noatime,exec,nodev,nosuid,uid=1000,gid=1000,nr_inodes=5k,mode=1700 --volume $PWD/student.all:/jail/student:ro blockchain:latest

# Explore the docker image
docker run -it --entrypoint /bin/bash blockchain:latest
```

## Author ✍️

Xavier Lavayssière - [🐙](https://github.com/Xalava) [🐦](https://twitter.com/xavierlava)
