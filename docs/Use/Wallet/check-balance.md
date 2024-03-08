---
id: check-balance
title: Check QRL Wallet Balance
hide_title: false
hide_table_of_contents: false
sidebar_label: Check Balance
sidebar_position: 2
pagination_label: Check Balance
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Wallet/check-balance.md
description: Check a wallet balance
keywords:
  - docs
  - wallet
  - balance
image: /assets/img/icons/yellow.png
slug: /use/wallet/check-balance
---


The QRL blockchain holds all balance information on any QRL wallet address and is the source of truth. Every time a transaction is sent to or from an address it is immutably recorded on the chain. 

To find an address balance, a lookup must be performed on the blockchain which searches through all of the blocks to find the latest information on any funds contained in the address.

If there are no transactions found for a given address, either incoming or outgoing, the address will not be found even if you possess the private keys. 

This does not mean the address has not been created, just that it is not yet found on-chain. Send some funds to the address and it will show up.

:::tip A public address will start with a `Q` 

An example public QRL address: Q01040007a591a62c23ed27adfe3df8eb812ee5e4b73e47fb8471e8d78ecd9b4cadc325ca36d86e

Do not use a private key to lookup an address balance in any explorer or webpage, this could compromise the funds contained in the address.

Additional information on QRL [Public Addresses can be found here.](/use/wallet/qrl-address-overview) 

:::

## Balance Lookup Methods

Below are the methods used for searching the blockchain for a given address to attain the balance information.


### QRL Block Explorer

The Block Explorer provides a user interface through the web page, allowing the user to lookup blockchain details. The easiest method of looking up a QRL address balance is to enter the public address into the [QRL Block Explorer](https://explorer.theqrl.org).

This will show the current balance and all transactions that have happened with the given address.

:::info 
For more information and full documentation of the [QRL Block Explorer](https://explorer.theqrl.org) usage [see the explorer documentation](/use/tools/explorer/overview).
:::


### QRL Wallet

The balance for an opened address will be shown in all of the the QRL wallets available once secret keys have been loaded.


:::note
This is not recommended for only a balance lookup as the secret keys are used and it is unnecessary for a simple balance lookup. Use the [QRL Block Explorer](/use/tools/explorer/overview) and the public address for a balance lookup.
:::



### QRL Command line Tools

There are multiple advanced methods to lookup an address balance, each one using a different method or command depending on the tool used. 

:::note Use the public key where possible for a balance lookup

When possible prefer to use the public address to lookup a balance of the given wallet. THis reduces any risk associated with the secret keys being exposed for this function.
:::

Each of these methods are documented in the following links.

- [The QRL-CLI](/build/qrl-cli/overview#qrl-cli-balance-address) - `qrl-cli balance`
- [QRL node CLI](/use/node/node-cli/overview#wallet_ls) - `wallet_ls`
- [QRL Wallet API](/api/wallet-api#getba/use/node/node-cli/overview#wallet_lslance)  - `GetBalance`
- [QRL Wallet-rest-proxy](/api/walletd-rest-proxy#getbalance) `GetBalance`
- [QRL Zeus Proxy API](/api/zeus-proxy) 
- [QRL Explorer API](/api/explorer-api#address-by-number) - `Address By Number`
