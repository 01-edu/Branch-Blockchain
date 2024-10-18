FROM ubuntu:jammy
# See ./Dockerfile.notes for more details on different options

## Base tools installations
RUN apt-get update && \
	apt-get install -y software-properties-common apt-utils wget tree sudo && \
	# ca-certificates is required for wget downloads, apt utils for ppa additions. Optimisations here don't end well
	## Google direct
	wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
	apt-get install -y --no-install-recommends ./google-chrome-stable_current_amd64.deb libxss1 netcat  && \
	rm google-chrome-stable_current_amd64.deb && \
	## Node ppa
	wget -qO- https://deb.nodesource.com/setup_18.x | bash - && \
	apt-get update && \
	apt-get install -y --no-install-recommends nodejs && \
	## solc direct
	wget -q https://github.com/ethereum/solidity/releases/download/v0.8.17/solc-static-linux && \
	mv solc-static-linux /usr/bin/solc && \
	chmod +x /usr/bin/solc && \
	## Cleaning
	apt-get clean && \ 
	rm -rf /var/lib/apt/lists/*

## Bitcoin node
RUN bitcoinCoreVersion="24.0.1"; \
	wget -q "https://bitcoincore.org/bin/bitcoin-core-$bitcoinCoreVersion/bitcoin-$bitcoinCoreVersion-x86_64-linux-gnu.tar.gz"; \
	tar xzf "bitcoin-$bitcoinCoreVersion-x86_64-linux-gnu.tar.gz"; \
	mv bitcoin-$bitcoinCoreVersion/bin/* /usr/local/bin ; \
	rm -rf bitcoin-$bitcoinCoreVersion/ ; \
	rm "bitcoin-$bitcoinCoreVersion-x86_64-linux-gnu.tar.gz"
	# NB: default ports on regtest are 18443 RPC and 18444 P2P
	# Details at https://github.com/cryptotuxorg/cryptotux/blob/master/install/bitcoin.sh

## Preparing user & rights for runtime 
RUN groupadd -r xa -g 1000 && useradd -rm -u 1000 -g xa -G audio,video xa 
RUN mkdir -p /app; chown xa:xa /app
	# The partition is read only at runtime and entrypoint is run as user 1000
RUN npm install -g bun
	# After tests, we use bun for execution and npm for installation
	# bun faster than npm for execution, does not work for install
	# pnpm runs faster and results in smaller footprint for installation but requires tweaking

USER xa 

## Preparing a Bitcoin node (as a user to facilitate runtime)
WORKDIR /home/xa
RUN mkdir -p /home/xa/.bitcoin; echo 'txindex=1\nregtest=1\nserver=1\nrest=1\nrpcallowip=127.0.0.1\nrpcuser=leeloo\nrpcpassword=multipass\nfallbackfee=0.00000003'> /home/xa/.bitcoin/bitcoin.conf
RUN bitcoind -daemon -daemonwait; bitcoin-cli createwallet "testwallet"; address=`bitcoin-cli getnewaddress`; bitcoin-cli generatetoaddress 101 $address; bitcoin-cli getblockchaininfo; bitcoin-cli stop; sleep 2; \
		bitcoind -daemon -daemonwait; bitcoin-cli loadwallet "testwallet"; address=`bitcoin-cli getnewaddress`; bitcoin-cli sendtoaddress "bcrt1qznrqryhtzr66tp8uzrxsuh58mn2vpfmjxpnxgz" 12 "Another tx" "anonymous";  bitcoin-cli generatetoaddress 1 $address; bitcoin-cli stop; sleep 2

## Copy the code
WORKDIR /app
# COPY --chown=xa:xa package.json .
	# Duplicated copy when we want to avoid npm install on every change
COPY --chown=xa:xa . .
	# xa:xa ownership is not necessary locally but might prevent some issues in production

## Installing npm modules
RUN npm install --loglevel verbose --omit=dev	
	# pnpm install --prod == npm install --omit=dev
	# pnpm has git as a dependency. Upon testing, gains are not significant and can have more unexpected side effects

## Entrypoint
# USER root 
# RUN chown -R xa:xa /app 
	# Both commands should not be required now that we have copied files with user ownership
RUN chmod +x /app/entrypoint.sh
USER 1000
	# Necessary for production environment 
ENTRYPOINT ["/app/entrypoint.sh"]