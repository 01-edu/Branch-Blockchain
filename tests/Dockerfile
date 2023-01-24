FROM ubuntu:jammy

## Base tools for compilation and download
## Google chrome for puppeteer, optimised 
## Node & Ethereum
RUN apt-get update && \
	apt-get install -y software-properties-common apt-utils wget tree sudo && \
	wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
	apt-get install -y --no-install-recommends ./google-chrome-stable_current_amd64.deb libxss1  && \
	rm google-chrome-stable_current_amd64.deb && \
	wget -qO- https://deb.nodesource.com/setup_18.x | sudo -E bash - && \
	add-apt-repository ppa:ethereum/ethereum && \
	apt-get update && \
	apt-get install -y --no-install-recommends solc nodejs && \
	apt-get clean
	# gnupg ca-certificates procps are implicit dependencies required for chrome
	
## Bitcoin node
RUN bitcoinCoreVersion="24.0.1"; \
		wget -q "https://bitcoincore.org/bin/bitcoin-core-$bitcoinCoreVersion/bitcoin-$bitcoinCoreVersion-x86_64-linux-gnu.tar.gz"; \
		tar xzf "bitcoin-$bitcoinCoreVersion-x86_64-linux-gnu.tar.gz"; \
		mv bitcoin-$bitcoinCoreVersion/bin/* /usr/local/bin ; \
		rm -rf bitcoin-$bitcoinCoreVersion/ ; \
		rm "bitcoin-$bitcoinCoreVersion-x86_64-linux-gnu.tar.gz"
	# NB: default ports on regtest are 18443 RPC and 18444 P2P
	# Details at https://github.com/cryptotuxorg/cryptotux/blob/master/install/bitcoin.sh

# ## Preparing user & rights for runtime 
RUN groupadd -r xa && useradd -rm -u 1000 -g xa -G audio,video xa
RUN mkdir -p /app; chown xa:xa /app
	# The partition is read only at runtime and entrypoint is run as user 1000
RUN npm install -g npm 

USER xa 

## Preparing a Bitcoin node (as a user to facilitate runtime)
WORKDIR /home/xa
RUN mkdir -p /home/xa/.bitcoin; echo 'txindex=1\nregtest=1\nserver=1\nrest=1\nrpcallowip=127.0.0.1\nrpcuser=leeloo\nrpcpassword=multipass\nfallbackfee=0.00000003'> /home/xa/.bitcoin/bitcoin.conf
RUN bitcoind -daemon -daemonwait; bitcoin-cli createwallet "testwallet"; address=`bitcoin-cli getnewaddress`; bitcoin-cli generatetoaddress 101 $address; bitcoin-cli getblockchaininfo; bitcoin-cli stop; sleep 2
RUN bitcoind -daemon -daemonwait; bitcoin-cli loadwallet "testwallet"; address=`bitcoin-cli getnewaddress`; bitcoin-cli sendtoaddress "bcrt1qznrqryhtzr66tp8uzrxsuh58mn2vpfmjxpnxgz" 12 "Another tx" "anonymous";  bitcoin-cli generatetoaddress 1 $address; bitcoin-cli stop; sleep 2

## Installing npm modules
WORKDIR /app
COPY package.json .
	# Duplicated but we need at only this file at this stage. Avoids rebuilds when only code changes
RUN npm install --omit=dev	
	# pnpm install --prod == npm --omit=dev
	# pnpm has git as a dependency. Upon testing, gains are not significant and can have more unexpected side effects

## Copy the code
WORKDIR /app
COPY . .

## Entrypoint
USER root
# RUN chown -R xa:xa /app
RUN chmod +x /app/entrypoint.sh
USER 1000
ENTRYPOINT ["/app/entrypoint.sh"]