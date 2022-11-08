# Branch Blockchain 🟩

Repository for the blockchain branch content. 

## Content 👀
Those subjects are progressive in difficulty, designed to learn the fundamental of blockchains as well as the main technologies and tools used in the industry.
- Quest 1: Experiment basic Bitcoin transactions
- Quest 2: Learn fundamental cryptography 
- Quest 3: Create a complete Smart Contract
- Quest 4: Scripted interactions with the Ethereum blockchain
- Quest 5: Create a complete Decentralised application
- Raid 1: Create a signing service
- Quest 6: Create a first token
- Quest 7: An NFT based DApp
- Quest 8: Learn the basics of DeFi and security
- Quest 9: Explore other blockchains
- Raid 1: Create a tracking service

## Tests ⚙️
Within the `tests/` folder, `runTests.sh` builds a docker image and run the test given as parameter or series of sample test from the docker image with options similar to the production environment. Solutions are expected to be in the `tests/student` folder (ignored by git).
```shell
./runTests.sh retrieveBlockDate
```

### Advanced commands
Advanced commands are available in the `tests/` folder:

**Build the docker image**
```shell
docker build . -t blockchain 
```

**Run an example BTC test**
```shell
docker run --read-only --network none --memory 500M --user 1000:1000 -e DEBUG=true -e EXERCISE=retrieveBlockDate --env HOME=/jail --env TMPDIR=/jail --workdir /jail --tmpfs /jail:size=100M,noatime,exec,nodev,nosuid,uid=1000,gid=1000,nr_inodes=5k,mode=1700 --volume /home/$USER/code/01Branch-Blockchain/tests/student:/jail/student:ro blockchain:latest
```
**Explore the docker image**
```shell
docker run -it --entrypoint /bin/bash blockchain:latest
```

## Authors ✍️
Xavier Lavayssière - [🐙](https://github.com/Xalava) [🐦](https://twitter.com/Xalava)