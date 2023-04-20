FROM node:16-alpine

RUN mkdir /server
WORKDIR /server

COPY package.json package.json
RUN npm install && mv node_modules /node_modules

COPY . .

LABEL maintainer="LEROY DUCARDONNOY Paul"

CMD node server.js
