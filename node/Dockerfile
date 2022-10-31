FROM node:15

WORKDIR /usr/src/app

COPY ./package*.json .
COPY ./server.js .

RUN npm install

EXPOSE 3000