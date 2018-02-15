FROM node:8-alpine

RUN apk add --update git

WORKDIR /kusd-netstats
ADD . .

RUN npm install
RUN npm install -g grunt-cli
RUN grunt

EXPOSE 3000

CMD ["npm", "start"]
