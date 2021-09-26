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

A QRL node is a dedicated computer running software developed by the QRL team. These computers make up the main building blocks of the network. Every node works in conjunction with other nodes to form a consensus on what the next valid block is in the chain, as well as which transactions to write to into the chains history. This is what makes up the distributed ledger and forms the blockchain

Forming the basic structure for a trust-less network is a complicated thing, and a lot of magic happens behind the scenes with cryptographic calculations and complex algorithms. 

# 

The Peer-To-Peer network that is formed by the QRL nodes allows the basic foundational security to exist in the chain. Through some incredible math and an ultra-secure address scheme using post quantum cryptography QRL has created one of the most secure and trusted blockchains in existence today.

Running a node is simple, see the [installation documentation](node-installation) to get started. 

## Functions

These are the basic functions of the node.

- Validate transactions
- Mint new blocks
- Agree on a unified and immutable history
- Provide that history to all why wish to validate

A node is used every time a transaction is sent to the network. The wallet software uses the holders address to sign the transaction which is then sent to the network via a QRL node. The node listens for these transactions and then includes them in the next block minted into the chain.

When an address balance is looked up or a  transaction is verified, this is simply looking at the history in the chain for the address/transaction involved. All of this data is stored on the chain and is validated and agreed upon by a majority of nodes in the network. 


## Use Cases

- Sending transactions
- Validating funds in wallets
- Keeping everyone honest


