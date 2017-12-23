FROM node

RUN git clone https://github.com/cubedro/eth-netstats /eth-netstats
WORKDIR /eth-netstats
RUN npm install
RUN npm install -g grunt-cli
RUN grunt

CMD ["npm", "start"]
