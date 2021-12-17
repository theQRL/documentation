---
docstatus: DRAFT
id: hashchains
title: QRL Hashchains
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL Hashchains
sidebar_position: 2
pagination_label: QRL Hashchains
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Hashchains
keywords:
  - docs
  - Advanced
  - QRL Hashchains
image: /assets/img/icons/yellow.png
slug: /developers/cryptography/hashchains
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::

 
> @theqrl/hashchains

[![Coverage Status](https://coveralls.io/repos/github/theQRL/hashchains/badge.svg?branch=main)](https://coveralls.io/github/theQRL/hashchains?branch=main) [![Build Status](https://www.travis-ci.com/theQRL/hashchains.svg?branch=main)](https://www.travis-ci.com/theQRL/hashchains) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/ad5f3b6ad4124518be69351feb4a8957)](https://www.codacy.com/gh/theQRL/hashchains/dashboard?utm_source=github.com&utm_medium=referral&utm_content=theQRL/hashchains&utm_campaign=Badge_Grade)
 ![npm (scoped)](https://img.shields.io/npm/v/@theqrl/hashchains) ![NPM](https://img.shields.io/npm/l/@theqrl/hashchains)

There's a [live demo on Codepen](https://codepen.io/jplomas/live/187d9ff57e404c38a76373e39b796eb4) to show the package in use.

Browser bundle at `dist/hashchains-browser.js`

Modules in `dist` but installing the npm release and import/requiring @theqrl/hashchains should work with modern toolsets, i.e:

``` bash
npm install @theqrl/hashchains
```

``` javascript
import { HashChain, HashChains } from '@theqrl/hashchains'
```

Exposes two classes:

## 1. HashChain

``` javascript
const hc = new HashChain(hashRoot, hashFunction, length)
```

### hashRoot _(string)_

#### required

The hash of `(secret data + index)` which forms the first hash in the chain and is iteratively hashed.

### hashFunction _(string)_

#### optional, default 'keccack256'

Currently only `keccak256` is implemented.

### length

#### optional, default 64

Number of hashes to generate in the chain.

## 2. HashChains

``` javascript
const hc = new HashChains(mnemonic, numberToCreate, index, hashFunction, length)
```

### mnemomic

#### required

Secret data (eg. BIP39 mnemonic or hexstring) which is hashed along with sequential index to be the start of the hashchains.

### numberToCreate

#### optional, default 2

Number of hashchains to return

### index

#### optional, default 0

Starting index for hashchains.  Starting at index 0 and generating 10 chains then starting at index 8 and generating 5 chains will create two overlapping (i.e. identical) hashchains.

### hashFunction _(string)_

#### optional, default 'keccack256'

Currently only `keccak256` is implemented.

### length

#### optional, default 64

Number of hashes to generate per chain created.

## Also in this repository

After an `npm install`:
### Live demo

``` bash
npm run serve
```
Starts a local vue development environment serving the browser-based demo from the CodePen above.  This may be useful in adding more functionality/hash functions.

### Tests

``` bash
npm run test
```

### Dev environment

``` bash
npm run dev
```

Runs a watched for continuous development: lint code as per repository standards and ensure test cases pass.

### Build

``` bash
npm run build
```

Outputs cjs/umd/esm and browserified JS modules to `dist/` directory.