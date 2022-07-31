FROM ubuntu:focal

RUN apt-get update && \
		apt-get install software-properties-common apt-utils curl sudo -y 
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && \
		add-apt-repository ppa:ethereum/ethereum && \
    apt-get update && \
    apt-get install solc tree nodejs wget -y

## For foundry, should work 
RUN add-apt-repository ppa:ubuntu-mozilla-security/rust-next && \
		apt-get update && \
		apt-get install cargo -y && \
		curl https://raw.githubusercontent.com/gakonst/foundry/master/foundryup/install | bash && \
		/root/.foundry/bin/foundryup
RUN npm install -g npm
RUN useradd xa

WORKDIR /app
COPY . .
RUN npm install

ENTRYPOINT ["/app/entrypoint.sh"]
