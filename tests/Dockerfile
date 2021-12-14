FROM node:16-alpine

WORKDIR /jail
COPY package.json .
COPY hardhat.config.js .
RUN npm install
RUN mkdir -p ./tests
COPY ./*.test.js ./tests/

WORKDIR /app
COPY . .

ENTRYPOINT ["/app/entrypoint.sh"]
