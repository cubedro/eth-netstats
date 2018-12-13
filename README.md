Ethereum Network Stats based off github.com/cubedro/eth-netstats
============
[![Build Status][travis-image]][travis-url] [![dependency status][dep-image]][dep-url]

This is a visual interface for tracking ethereum network status. It uses WebSockets to receive stats from running nodes and output them through an angular interface. It is the front-end implementation for [eth-net-intelligence-api](https://github.com/gangnamtestnet/eth-net-intelligence-api).


![Screenshot](https://raw.githubusercontent.com/gangnamtestnet/eth-netstats/master/src/images/screenshot.jpg?v=0.0.6 "Screenshot")

## Prerequisite
* node
* npm

## Installation
Make sure you have node.js and npm installed.

Clone the repository and install the dependencies

```bash
git clone https://github.com/gangnamtestnet/eth-netstats
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

## Add nodes to site

For now, the site should be looking blank. For instruction on adding new nodes to the site, refer to [eth-net-intelligence-api](https://github.com/gangnamtestnet/eth-net-intelligence-api).

## Updates since original cubedro/eth-netstats base:

+ Fixed block history if chain is shorted than MAX_HISTORY

+ Fixed broken headings in Markdown files

+ Docker support added (compatible with puppeth)

+ Updated geoip-lite package to latest version (fixed location info)

+ Responsive design patch added for mobile view

+ Bug fixed with charts and formats

## To-do list

+ Update npm libraries for vulnerability patch & performance increase

+ Add average TPS calculation

+ More features with DPOS / POA!

[travis-image]: https://travis-ci.org/gangnamtestnet/eth-netstats.svg
[travis-url]: https://travis-ci.org/gangnamtestnet/eth-netstats
[dep-image]: https://david-dm.org/gangnamtestnet/eth-netstats.svg
[dep-url]: https://david-dm.org/gangnamtestnet/eth-netstats
