---
docstatus: DRAFT
id: wallet-api
title: QRL API - Wallet
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL API - Wallet
sidebar_position: 2
pagination_label: QRL API - Wallet
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL API - Wallet
keywords:
  - docs
  - build
  - developers
  - API
  - Wallet
image: /assets/img/icons/yellow.png
slug: /developers/api/wallet-api
---


:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::

The QRL Wallet Daemon allows additional functionality to the QRL Node installation. 

Source code https://github.com/theQRL/QRL/blob/master/src/qrl/daemon/walletd.py

:::info
This API is available with the base QRL Python package install, and when used with the [QRL walletd-rest-proxy](https://github.com/theQRL/walletd-rest-proxy) automatic wallet management is simple.
:::


## WalletD General Info


### Requirements

- QRL Node installed on the localhost, fully synced.


## Getting Started

Running the wallet daemon is simple. Once you have met the requirements above, follow the steps below, ensuring the `wallet-rest-proxy` stays running as this will allow interaction with the GRPC node.

- Run the QRL wallet daemon `qrl_walletd`


| Method Name | Request Type | Response Type | 
| ----------- | ------------ | ------------- | 





## template

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=" "

```

</TabItem>

</Tabs>