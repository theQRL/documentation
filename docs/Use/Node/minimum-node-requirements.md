---
id: node-requirements
title: QRL Node Requirements
hide_title: false
hide_table_of_contents: false
sidebar_label: Requirements
sidebar_position: 2
pagination_label: Node - Requirements
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Node/minimum-node-requirements.md
description: QRL Node Requirements
keywords:
  - docs
  - Node
image: /assets/img/icons/yellow.png
slug: /use/node/requirements
---

In order to run a QRL node, the computer must meet some basic requirements. This doc will cover these minimum requirements and give some known working examples.

The main QRL node software is developed in python, though it relies on some code that is not yet ported to Windows. For now the QRL node will need to be ran from a Linux/Unix system.


## Hardware Requirements

These are the basic hardware requirements to run a QRL Node.

### AES-NI and AVX2

An AES-NI enabled processor is required for cryptographic functions of the system. AES provides XXXXX while AVX2 is used by the keccak library for hashing functions.


#### Compatibility Check


Using the `grep` command, run the following from a UNIX shell to validate if your processor supports `AES-NI` and `avx2`

```bash
grep -m1 -o -E 'avx|aes' /proc/cpuinfo
```

Alternatively, read the file manually or use `lscpu`

```bash
lscpu |grep -E  'aes|avx'
```
The prompt will show compatible support if available.

### HDD Storage

Enough storage is required for the current () and future chain growth. The node software will sync each block from the genesis block on June 2018 till current block height as agreed across the network.



### Reliable Network Connection

The node will send information and request information from other nodes in the network periodically. This is critical to the functionality of the node. Each node must keep up to date with each other in consensus to the current blockheight. 


#### Externally Reachable Node

Advanced configuration is required for the node to validate blocks and share block information via the p2p network. Additional ports need to be reachable and a static IP address is preferred


### Modern 64 bit Processor

A newer processor is required as listed above to support AES-NI.



## Software Requirements

- Python 3.6 or later
