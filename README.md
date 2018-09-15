Ethereum Network Stats
============
[![Build Status][travis-image]][travis-url] [![dependency status][dep-image]][dep-url]

This is a visual interface for tracking ethereum network status. It uses WebSockets to receive stats from running nodes and output them through an angular interface. It is the front-end implementation for [eth-net-intelligence-api](https://github.com/cubedro/eth-net-intelligence-api).

![Screenshot](https://raw.githubusercontent.com/eosclab/eth-netstats/master/src/images/screenshot.jpg?v=0.0.6 "Screenshot")

## Prerequisite
* node
* npm

## Installation
Make sure you have node.js and npm installed.

Clone the repository and install the dependencies

```bash
git clone https://github.com/eosclab/eth-netstats
cd eth-netstats
npm install
```

## Build the resources

To build run
```bash
npm run dist
```

## Run

```bash
npm start
```

see the interface at http://localhost:3000

[travis-image]: https://travis-ci.org/eosclab/eth-netstats.svg
[travis-url]: https://travis-ci.org/eosclab/eth-netstats
[dep-image]: https://david-dm.org/eosclab/eth-netstats.svg
[dep-url]: https://david-dm.org/eosclab/eth-netstats
