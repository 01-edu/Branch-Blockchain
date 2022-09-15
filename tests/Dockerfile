FROM ubuntu:focal

## Base tools
RUN apt-get update && \
		apt-get install software-properties-common apt-utils curl wget tree sudo -y 

## Node & Ethereum (changes frequently)
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && \
		add-apt-repository ppa:ethereum/ethereum && \
    apt-get update && \
    apt-get install solc nodejs -y

## Bitcoin node
RUN bitcoinCoreVersion="23.0"; wget -q "https://bitcoincore.org/bin/bitcoin-core-$bitcoinCoreVersion/bitcoin-$bitcoinCoreVersion-x86_64-linux-gnu.tar.gz"; tar xzf "bitcoin-$bitcoinCoreVersion-x86_64-linux-gnu.tar.gz"; mv bitcoin-$bitcoinCoreVersion/bin/* /usr/local/bin ; rm -rf bitcoin-$bitcoinCoreVersion/ ; rm "bitcoin-$bitcoinCoreVersion-x86_64-linux-gnu.tar.gz"
RUN mkdir -p ~/.bitcoin; echo -e 'txindex=1\nregtest=1\nserver=1\nrest=1\nrpcallowip=127.0.0.1\nrpcuser=leeloo\nrpcpassword=multipass'> ~/.bitcoin/bitcoin.conf
# NB: default ports on regtest are 18443 RPC and 18444 P2P
# Details at https://github.com/cryptotuxorg/cryptotux/blob/master/install/bitcoin.sh

## Foundry 
# RUN add-apt-repository ppa:ubuntu-mozilla-security/rust-next && \
# 		apt-get update && \
# 		apt-get install cargo -y && \
# 		curl https://raw.githubusercontent.com/gakonst/foundry/master/foundryup/install | bash && \
# 		/root/.foundry/bin/foundryup

RUN npm install -g npm
RUN useradd xa

WORKDIR /app
COPY . .
RUN npm install

ENTRYPOINT ["/app/entrypoint.sh"]
