---
id: zeus-proxy
title: QRL Zeus Proxy API
hide_title: false
hide_table_of_contents: false
sidebar_label: API - Zeus Proxy
sidebar_position: 5
pagination_label: API - Zeus Proxy
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/API/zeus-proxy.md
description: QRL API - Zeus Proxy web API for programatic interaction with the QRL Blockchain
keywords:
  - docs
  - build
  - developers
  - API
  - Zeus
image: /assets/img/icons/yellow.png
slug: /api/zeus-proxy
---

The QRL Zeus proxy is intended to simplify interaction with the QRL gRPC API's and allow an additional on-road into the QRL Ecosystem.


## Install

- Node JS & NPM
- Meteor https://docs.meteor.com/install.html
- Clone repo at https://github.com/theQRL/zeus

1. Clone repo
2. Install meteor
3. `npm install`
4. `npm start`

This will launch a local interface at 127.0.0.1:3000 with some limited examples. This allows one to place API calls to the Zeus proxy which in turn converts these to gRPC calls and communicates with the QRL Network.


## Usage

Once the proxy is running and accessible either browse to the example page served up at [127.0.0.1:3000](http://127.0.0.1:3001) or make calls through the command line using a tool like cURL, 

:::info
All of the [QRL Public API service](http://127.0.0.1:3000/api/qrl-public-api#publicapiservice) functions will work with the Zeus proxy. Ensure that all default parameters are passed and the data types are correct.
:::

### Usage Examples

The following examples should get you started with the Zeus Proxy.

:::note
Please note, the Zeus proxy is intended to pass through raw data exactly as the gRPC API call expects it. This may make some of the functions a little more complex through the proxy.
:::

#### GetNodeState

```bash
curl -XGET http://127.0.0.1:3000/grpc/mainnet/GetNodeState
```

This will return the state from the node that the proxy is connected to.

```bash
{
  "info": {
    "version": "4.0.0 python",
    "state": "SYNCED",
    "num_connections": 64,
    "num_known_peers": 302,
    "uptime": "35472466",
    "block_height": "2673149",
    "block_last_hash": {
      "type": "Buffer",
      "data": [
        84,
        27,
        172,
        108,
        237,
        14,
        141,
        122,
        44,
        230,
        213,
        26,
        252,
        104,
        176,
        91,
        45,
        28,
        184,
        70,
        109,
        14,
        206,
        249,
        225,
        81,
        133,
        207,
        4,
        0,
        0,
        0
      ]
    },
    "network_id": "The sleeper must awaken"
  }
}
``` 

## Configuring the Proxy

To modify the proxy connection details, modify the file `./server/main.ts` changing the `ipMainnet` and `portMainnet` parameters to a reachable node that you run. Pay attention to the GRPC port and adjust as needed to meet your setup.


```js
// Change the default line
//const ipMainnet = 'mainnet-2.automated.theqrl.org'
// to:
const ipMainnet = 'IP_ADDRESS_OF_NODE'
const portMainnet = '19009'
```


## Run The Proxy

With the configuration pointing to a node you control, start the proxy with:

```bash
npm start
```

