FROM node

RUN git clone https://github.com/gochain-io/eth-netstats
RUN cd /eth-netstats && npm install  &&\
	npm install -g grunt-cli  &&\
	grunt all

WORKDIR /eth-netstats

CMD ["npm", "start"]
