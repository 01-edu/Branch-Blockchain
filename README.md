# Branch Blockchain 🟩

Repository for the blockchain branch.

## Content 📖

Exercises are progressive in difficulty. They are designed to learn the fundamentals of blockchains as well as the main technologies and tools used in the industry.

- Quest 1: Experiment with basic Bitcoin transactions
- Quest 2: Learn fundamental cryptography
- Quest 3: Create a complete Smart Contract
- Quest 4: Scripted interactions with the Ethereum blockchain
- Quest 5: Create a complete decentralised application
- Raid 1: Create a signing service
- Quest 6: Create a first token
- Quest 7: An NFT based DApp
- Quest 8: Learn the basics of DeFi and security
- Quest 9: Explore other blockchains
- Raid 1: Create a tracking service

For more details see the [introductions](introductions.md) and the [subjects](https://github.com/01-edu/public/tree/master/subjects/blockchain)

## Tests ⚙️

Within the `tests/` folder, `run.sh` builds a docker image and runs the tests. Solutions are expected to be in a `tests/student` folder. For each available solution file, the appropriate test will be launched individually. The docker daemon or docker desktop needs to be running.

```shell
cd tests
./run.sh
```

The final output should be similar to:

```shell
artists-do-work ✅ 4, basic-swap ✅ 4, basic-wallet ✅ 0, buy-tickets ✅ 2, check-document ✅ 6, connect-to-metamask ✅ 5, donation ✅ 6, eventful-token ✅ 3, fun-and-profit ✅ 3,
tests ran:9 in avg 4261 ms
```

It is also possible to run tests individually (with debug mode on):

```shell
./run.sh retrieve-block-date 
```

### Commands

The following underlying commands can be launched individually from `tests/` folder:

```shell
# build the docker image
docker build . -t blockchain 

# Run a BTC test
docker run --read-only --network none --memory 500M --user 1000:1000 -e DEBUG=true -e EXERCISE=retrieve-block-date --env HOME=/jail --env TMPDIR=/jail --workdir /jail --tmpfs /jail:size=100M,noatime,exec,nodev,nosuid,uid=1000,gid=1000,nr_inodes=5k,mode=1700 --volume $PWD/student.all:/jail/student:ro blockchain:latest

# Explore the docker image
docker run -it --entrypoint /bin/bash blockchain:latest
```

## Authors ✍️

Xavier Lavayssière - [🐙](https://github.com/Xalava) [🐦](https://twitter.com/xavierlava)