FROM ubuntu:focal

## Base tools
RUN apt-get update && \
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
	apt-get install -y --no-install-recommends ./google-chrome-stable_current_amd64.deb libxss1  && \
	rm google-chrome-stable_current_amd64.deb
RUN groupadd -r xa && useradd -rm -u 1000 -g xa -G audio,video xa


## Node & Ethereum (changes frequently)
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && \
		add-apt-repository ppa:ethereum/ethereum && \
    apt-get update && \
    apt-get install solc nodejs -y

## Bitcoin node
RUN bitcoinCoreVersion="23.0"; \
		wget -q "https://bitcoincore.org/bin/bitcoin-core-$bitcoinCoreVersion/bitcoin-$bitcoinCoreVersion-x86_64-linux-gnu.tar.gz"; \
		tar xzf "bitcoin-$bitcoinCoreVersion-x86_64-linux-gnu.tar.gz"; \
		mv bitcoin-$bitcoinCoreVersion/bin/* /usr/local/bin ; \
		rm -rf bitcoin-$bitcoinCoreVersion/ ; \
		rm "bitcoin-$bitcoinCoreVersion-x86_64-linux-gnu.tar.gz"
# NB: default ports on regtest are 18443 RPC and 18444 P2P
# Details at https://github.com/cryptotuxorg/cryptotux/blob/master/install/bitcoin.sh

## Installing npm modules
WORKDIR /app
RUN npm install -g npm
COPY package.json .
RUN npm install

## Preparing a Bitcoin node
RUN useradd xa
USER xa
WORKDIR /home/xa
RUN mkdir -p ~/.bitcoin; echo 'txindex=1\nregtest=1\nserver=1\nrest=1\nrpcallowip=127.0.0.1\nrpcuser=leeloo\nrpcpassword=multipass\nfallbackfee=0.00000003'> ~/.bitcoin/bitcoin.conf
RUN bitcoind -daemon -daemonwait; bitcoin-cli createwallet "testwallet"; address=`bitcoin-cli getnewaddress`; bitcoin-cli generatetoaddress 101 $address; bitcoin-cli stop

USER root
WORKDIR /app
COPY . .
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]


