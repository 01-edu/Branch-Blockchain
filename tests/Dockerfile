FROM node:16-alpine

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . .

# for local testing
# COPY ./dft.solutions /jail/student

ENTRYPOINT ["/app/entrypoint.sh"]
