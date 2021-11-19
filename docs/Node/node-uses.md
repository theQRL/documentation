---
id: node-uses
title: QRL Node Uses
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL Node Uses
sidebar_position: 6
pagination_label: QRL Node Uses
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Node Uses
keywords:
  - docs
  - Node
image: /assets/img/icons/yellow.png
slug: /node/node-uses
---

Ruining a valid, up to date node client will by it's very presence in the blockchain process help secure the network and any transactions routed through the node. We covered the basic functions of the node in previous documents. This document will dive deeper into the uses of a QRL Node.

## Security 

At the core of the QRL blockchain is a decentralized peer to peer network. This network forms consensus of the current blockchain, agreeing on various aspects like blockheight, previous block header hash (previous block in the chain), transactions included in the block, mining rewards payout address. The network security of the blockchain is dependent on the number of peers validating consensus. 

There are known vulnerabilities where the majority of the active nodes in a network are taken over by a malicious actor allowing the manipulation of the chain data being submitted and accepted. This can lead to a variety of exploits for any blockchain. The best solution to this issue is to run as many nodes possible to make the possibility of a bad actor successfully performing any of the attacks this could make possible. 

In addition to the network security provided by as many nodes on network as possible, running a node can additionally secure any transactions being made to the chain on a users behalf as well as ensuring valid chain data is provided un-modified.

### Transaction Security

Running a transaction through a local, secure node ensures that the transaction can not be modified and will be broadcast to the active and accepted network and chain.

> FIX THIS - Add information on how this security is provided through running a node

## Wallet Functions

One of the main uses of a node is to broadcast signed transactions to the network, adding them to a block that is approved and agreed on through the network.

Any transaction that consumes an OTS key, requiring a signature has to be sent through a node. This includes sending quanta, sending message transactions, notarizing data, or creating a colored token. All of these transactions can be sent through a local node. Depending on how you are interacting with the system, the means to signify a custom node vary, however the functionality is present in all QRL wallet tools



## Chain Analytics Functions

To ensure the data provided is correct and provided with no worries of bandwidth a local node should be run to provide this data. This will allow a developer to gather historical data or provide all new chain data to  an integrated system.


## Mining Functions

A full node can be used to mine the coin directly, using the CPU of the PC the node is being ran on to submit hashes for approval, as well as pooling multiple PC's mining activities through a mining pool.



> FIX ME - Need to improve these explanations with references and additional examples of usage