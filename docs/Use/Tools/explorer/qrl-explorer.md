---
id: qrl-explorer
title: QRL Explorer Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Overview
sidebar_position: 1
pagination_label: QRL Explorer
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Tools/explorer/qrl-explorer.md
description: QRL Explorer overview
keywords:
  - docs
  - tools
  - Explorer
image: /assets/img/icons/yellow.png
slug: /use/tools/explorer/overview
---

The Block Explorer is a portal into the QRL blockchain, allowing users to lookup information from the chain directly.

The explorer is connected through a QRL node and the information provided is sourced from the immutable data contained in the blockchain. All transactions, addresses that have seen transactions, tokens, mining payouts etc. are stored and accessible through the explorer. 

:::note
An address that has been generated but has not transacted on-chain, either received or transmitted, will not be found with the explorer. A transaction is required prior to being discoverable by the explorer.

More information can be found in the [Address Documentation.](/use/wallet/check-balance)
:::

The main explorer page can be access through any modern web browser and is located at https://explorer.theqrl.org. 

From the main page there are links along the side bar for all of the various functions of the tool. These link to additional functionality that expands on the main page info.

**Blocks**
: Shows the latest blocks minted onto the chain

**Recent Transactions**
: Shows a list of the latest transactions shown on the chain

**Unconfirmed Transactions**
:Shows any transactions that are in the Mempool awaiting a block to mint

**Peers**
: Gives a list of all peers the explorer node is aware of

**Richlist**
: Full list of all public addresses ranked in total value.

**Wallet**
: This is a link the the QRL Web Wallet



## Network Status

This section gives overall information on the network and is pulled directly from the QRL node that the explorer is using. This helps to verify that the node is synced and up to date, ensuring correct blockchain information is provided.


### Connected Status

This gives confirmation that the node is connected to other peers and is working to secure and further the chain. 

**Example status:** - *Connected: SYNCED*


### Uptime

This gives the connected explorer node's uptime, or how long the node has been connected and functioning on the chain.

This information is provided in Days, Hours and Min that the connected node has been running.

**Example status:** - *Uptime: 1784d 1h 44min*

### Network Code Name

This section gives information on the chain connected to using the chains code name.

For MainNet this will be **The Sleeper Must Awaken**, the code name given to the chain at the time of genesis, or the launch of the chain.

**Example status:** - *The sleeper must awaken*

:::info
TestNet will have a different code name, and this will change each time the test network is re-started. Ensure you are looking at the correct chain information!
:::


### Active Peers

This section prints the number of active peers that are connected to the explorer node. This is not necessarily the total number of peers connected on the entire chain due to how Peer-To-Peer networks.

**Example status:** - *Explorer node active peers: 63*


### Version 

This information refers to the version of core code that the node is running. This can be found in the core code repository located in [The QRL's GitHub](https://github.com/theqrl/qrl). 


**Example status:** - *Version: 4.0.0 python*

:::info
At the time of writing, the latest is **Version 4.0.0**
:::

## Blocks

The blocks section covers information on the connected node related to blocks found in the chain. These blocks contain all transaction minted in that block, as well as the mining reward that is paid to the miner who minted the block. 

### Max Index

The max index section shows the *current blockheight* as seen by the connected node. 

If the Connected status is SYNCED, this will be the agreed and coordinated blockheight of all connected nodes, and the latest block of the chain. 

**Example status:** - *Max Index: 2579678*

:::info
If you are syncing a local node, this number should match once your node is fully synced.
:::

### Block Time 

This gives the last time between minting new blocks, or the time taken to mine and agree on consensus of the chain by all nodes.This time may fluctuate a little depending on network traffic and the amount of mining hashrate seen on the network.

**Example status:** - *Block Time: 58*

### Block Time Std Dev

This shows the standard variation of block time between blocks.

**Example status:** - *Block Time Std Dev: 64*

## Coin Supply

This section shows general information on the emissions of the block rewards and total amount of coins mined and to be mined.

### Emission

This is the percentage of total coin supply that has been distributed, and the total number of $quanta$ that is in circulation.

**Example status:** - *Emission: 74% (77,200,307.48)*

### Unmined

This shows the total supply that is yet to be mined and distributed in block rewards. These $quanta$ will be distributed over the exponential decay curve over the next est. 200 years.

**Example status:** - *Unmined: 27,799,692.52*

### Block Reward

This is the current block reward that is distributed to the miner who mints the next block. This number will continue to diminish according the the [emission algorithm](/build/fundamentals/qrl-emission).

**Example Status** - *Block Reward: 1.733252118*

## Hash Graph

The graph shows various information on the mining status, and difficulty of the chain.

This information changes depending on a few different conditions such as the network hashrate, connected miners and recent changes to the hashrate that effect the difficulty of mining operations. 

## Latest Blocks

This section shows the latest blocks that have been mined. You can select a block by clicking on it to drive into the details for that block.

:::info

See the [Block Lookup documentation](/use/tools/explorer/block-lookup) for more information.

:::

## Latest Transactions

The latest transactions section shows any transactions that have shown up in the mempool since the last block was mined, as well as some of the most recent transactions on the chain.

This list is not inclusive of all transactions however if you have just sent a transaction on-chain it will likely show up here if successful.

