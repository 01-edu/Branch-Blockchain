FROM ubuntu:focal

RUN apt-get update && \
		apt-get install software-properties-common apt-utils curl sudo -y 
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && \
	add-apt-repository ppa:ethereum/ethereum && \
    apt-get update && \
    apt-get install solc tree nodejs wget -y
RUN npm install -g npm

WORKDIR /app
COPY . .
RUN npm install

ENTRYPOINT ["/app/entrypoint.sh"]
