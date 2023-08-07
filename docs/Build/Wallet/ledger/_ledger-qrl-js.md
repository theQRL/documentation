---
docstatus: DRAFT
id:  ledger-qrl-js
title: Ledger QRL JS
hide_title: false
hide_table_of_contents: false
sidebar_label: Ledger QRL JS
sidebar_position: 2
pagination_label: Ledger QRL JS
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/
description: Ledger QRL JS
keywords:
  - docs
  - Advanced
  - QRL 
image: /assets/img/icons/yellow.png
slug: /developers/ledger/ledger-qrl-js
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::




For the QRL Ledger Nano S app refer to https://github.com/theQRL/ledger-qrl

----------

## Purpose

Node and browser communication APIs for Ledger Nano S

This repo is based on https://github.com/LedgerHQ/ledgerjs

## Initialization on Node

The communication API relies on node-hid

```javascript
ledger.comm_node.create_async().then(function(comm) {
     ...
});
```

You can also use list_async and create the communication object manually to pick one specific device if several are connected

## Initialization on a browser

The communication API is compatible with every browser supporting FIDO U2F either directly (Chrome, Opera) or through a third party extension (Firefox). Pages shall be served from an HTTPS connection as a requirement of the U2F API.

Make sure to include browser/ledger.min.js and browser/u2f-api.js in your web page and initialize with

```javascript
ledger.comm_u2f.create_async().then(function(comm) {
     ...
});
```

To re-create the browser bindings, use

```
npm run browserify
npm run uglify
npm run browserify-test (to run browser tests)
```

## Usage

Refer to the tests/examples