# Branch-Blockchain

Repository for the Blockchain branch content. 

Subjects are organised in Quests, Raids and Projects. Automated tests are available in the tests/ folder. 

## Pedagogy
Those subjects are progressive in difficulty, designed to learn the fundamental of blockchains as well as the main technologies and tools used in the industry.

## Tests
Within the `tests/` folder, the runDemoTests.sh script should automatically build the docker image and run sample test from the docker image with options similar to the production environment. Solutions are expected to be in a tests/student/ folder (ignored by git).

A few commands are available in the `tests/` folder:

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