FROM node:16-alpine

WORKDIR /app
COPY . .
RUN npm install

RUN  wget -O solc https://github.com/ethereum/solidity/releases/download/v0.8.10/soljson.js
# For native compiler should be : https://binaries.soliditylang.org/linux-amd64/solc-linux-amd64-v0.8.7+commit.e28d00a7 

ENTRYPOINT ["/app/entrypoint.sh"]
