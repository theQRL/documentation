---
docstatus: 30%  # one of {DRAFT, 30%, 90%, COMPLETE}
id: block-lookup
title: QRL Explorer Block Lookup
hide_title: false
hide_table_of_contents: false
sidebar_label: Block Lookup
sidebar_position: 4
pagination_label: Block Lookup
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Explorer Block Lookup
keywords:
  - docs
  - tools
  - explorer
  - block
image: /assets/img/icons/yellow.png
slug: /use/tools/explorer/block-lookup
---

To lookup a block on the chain, simply enter the block number into the search bar at the top of the [QRL Explorer site](https://explorer.theqrl.org). 

This will return all relevant information from that block as found in the immutable blockchain. This information will be the same no matter which node is queried as the chain came to consensus when the block was minted.


## Block Information

At the top of the page will be general information about the block, when it was minted and how many transactions are contained in the block, at least one transaction will be found for every block called a *coinbase* transaction. This is the payout to the miner that minted the block.

- **Transactions** - Example - *2* - The number of transactions contained in the block
- **Timestamp** - Example - *06:16 26 Jun 2018* - When the block was minted on the chain
- **Epoch** - Example - *0* - what epoch the block was made in, increases every 100 blocks
- **Size** - Example - *2.976 KB* - The total size of the block
- **Reward** - Example - *6.656333953 Quanta* - Amount of $Quanta$ given as a block reward to the miner
- **Mining Nonce** - Example - *2781151944* - Nonce that was used for mining the block


## Transactions

Below the information will be a list of all transactions contained in the block queried. This information table is broken into multiple columns.


| Type | Amount | Fee (Shor) | From | To | Txhash |
|---|---|---|---|---|---|
| The type of transaction sent | Amount of $Quanta$ | Fee paid for transaction | From qrl address | To qrl address | Transaction Hash for given transaction |


## Meta Information

Below the table will be a drop down that provides additional meta information related to the block, and all of the transactions contained within. 

This data is what the node returns and is what is used to provide the user friendly information printed above.