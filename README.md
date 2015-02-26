Ethereum Network Stats
============
[![Build Status][travis-image]][travis-url] [![dependency status][dep-image]][dep-url]

Visual interface for tracking ethereum network status. This is the front-end for [eth-net-intelligence-api](https://github.com/cubedro/eth-net-intelligence-api).

## Prerequisite
* node
* npm

## Installation
To install via Docker

create a docker image via

```
docker build --tag="eth-netstats" path/to/eth-netstats-repo
```

run it via

```
docker run --publish=3000:3000 eth-netstats
```

see the interface at http://localhost:3000

[travis-image]: https://travis-ci.org/cubedro/eth-netstats.svg
[travis-url]: https://travis-ci.org/cubedro/eth-netstats
[dep-image]: https://david-dm.org/cubedro/eth-netstats.svg
[dep-url]: https://david-dm.org/cubedro/eth-netstats