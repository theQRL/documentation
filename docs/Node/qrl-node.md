---
id: qrl-node
title: QRL Node
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL Node
sidebar_position: 1
pagination_label: QRL Node
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Node
keywords:
  - docs
  - Node
image: /assets/img/icons/yellow.png
slug: /node
---

A QRL node is a dedicated computer running software developed by the QRL team. These computers make up the core building blocks of the network and strengthen the consensus method used as validators to each block. 

Each node works in conjunction with other nodes to form a consensus on what the next valid block is in the chain, as well as which transactions to write to into the chains history from the transaction mempool. This is what makes up the distributed ledger and forms the core blockchain.

:::note
For more information on the p2p interaction between nodes take a look at the QRL [White Paper](https://github.com/theQRL/Whitepaper/blob/f1b0f61b7cf61195fa9489aeaf1a2e05643c12ec/QRL_whitepaper.pdf) 
:::

## QRL Network

The Peer-To-Peer network that is formed by the QRL nodes allows the basic foundational security to exist in the chain. Through some incredible math and an ultra-secure address scheme using post quantum cryptography QRL has created one of the most secure and trusted blockchains in existence today.

Running a node is simple, see the [installation documentation](node-installation) to get started. 

## Functions

These are the basic functions of the node.

- Validate transactions
- Mint new blocks
- Agree on a unified and immutable history
- Provide that history to all who wish to validate
- Provides an API to send transitions onto the blockchain by applications and validate transactions
- Sending transactions
- Validating funds in wallets

### Node Transactions

A node is interacted with every time a transaction is sent to the network, no matter the source. 

For instance, the wallet software uses a private key to sign a transaction which is then sent to the network via a QRL node operated by the foundation. The node listens for these incoming transactions from the wallet application from users and broadcasts them to be minted into a future block.

#### Broadcasting Transactions

When a new transaction is created the node runs through a few verification checks prior to sending the transaction to the mempool. If the address OTS key used to sign the transaction is already known to the blockchain the node will reject the transaction, protecting the address from broadcasting a OTS key re-use.

:::info
OTS key information can be found in the [OTS Key Documentation](#)
:::

If there are enough funds in the address to cover the fee and any fund transfer the node will send the transaction to it's peers to be added to the next available block. 

#### Chain Data Lookup

When an address balance is looked up or a  transaction is verified, this is simply looking at the history in the chain for the address/transaction involved. All of this data is stored on the chain and is validated and agreed upon by a majority of nodes in the network. 

These transactions are stored in the nodes chain state files which compose a level database that has been verified through a p2p syncing process. These historical transactions are validated by verifying cryptographic hashes provided by peers on the network.
