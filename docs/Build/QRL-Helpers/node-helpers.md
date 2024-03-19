---
id:  node-helpers
title: QRL Node Helpers
hide_title: false
hide_table_of_contents: false
sidebar_label: Node Helpers
sidebar_position: 10
pagination_label: Node Helpers
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Build/QRL-Helpers/node-helpers.md
description: QRL Node Helpers
keywords:
  - docs
  - Advanced
  - QRL Node Helpers
image: /assets/img/icons/yellow.png
slug: /build/helpers/node-helpers
---


[![Coverage Status](https://coveralls.io/repos/github/theQRL/node-helpers/badge.svg?branch=master)](https://coveralls.io/github/theQRL/node-helpers?branch=master) [![npm version](https://badge.fury.io/js/%40theqrl%2Fnode-helpers.svg)](https://badge.fury.io/js/%40theqrl%2Fnode-helpers) ![GitHub](https://img.shields.io/github/license/theqrl/node-helpers)

A helper library for interacting with QRL nodes via GRPC

## Installation

  `npm install @theqrl/node-helpers`

## Usage

Import the helper class:

```javascript
var QrlNode = require("@theqrl/node-helpers")
// or for ES6 style imports: import QrlNode from '@theqrl/node-helpers'
```

instantiate a new class object:

```javascript
var ip = 'testnet-1.automated.theqrl.org'
var port = '19009'
var testnet = new QrlNode(ip, port)
```

make a connection to the node:

```javascript
testnet.connect().then(() => {
  console.log(testnet.connection) // true if connection successful
})
```

make an API call (needs a node connection):

```javascript
testnet.api('GetStats').then((result) => {
  console.log(result)
})
```

Complete example:

```javascript
// example.js (requires node v10)

var QrlNode = require("@theqrl/node-helpers")

var ip = 'testnet-1.automated.theqrl.org'
var port = '19009'
var testnet = new QrlNode(ip, port)

testnet.connect().then(() => {
  console.log(testnet.connection); // true if connection successful
  
  // we can now start using the API
  testnet.api('GetStats').then((result) => {
    console.log(result);
  });

});
```

## Development of this module

Development requires node version > 10.  If using nvm (which is recommended) then `nvm use` inside the cloned repo will set a correct node version.

`npm install` to install dependencies

`npm run dev` will run a nodemon server with continual linting, testing and coverage on file updating

`npm run build` will transpile ES6 JS using babel for the deployed module

Contact jp@theqrl.org if you are interested in contributing.  PRs welcomed.