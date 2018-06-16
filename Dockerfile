FROM node:8.11-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g grunt-cli
RUN grunt
RUN npm start
