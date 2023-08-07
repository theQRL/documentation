---
docstatus: DRAFT

id: pow-overview
title: Proof Of Work Overveiw
hide_title: false
hide_table_of_contents: false
sidebar_label: Proof Of Work
sidebar_position: 5
pagination_label: Proof Of Work
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/
description: Proof Of Work (POW) overveiw
keywords:
  - docs
  - mining
  - proof-of-work
image: /assets/img/icons/yellow.png
slug: /learn/blockchain/proof-of-work
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


In a proof-of-work (POW) system, the creator of the next block on the blockchain is chosen based on their computational power, in a process known as mining. 
Miners compete to solve a computationally difficult problem in order to validate transactions and create new blocks on the blockchain. 

The first miner to solve the problem is rewarded with a certain number of coins, and a new block is added to the blockchain. This reward serves as an incentive for miners to continue participating in the network and contributing their computational power to maintain its integrity and security.

:::info
Get started mining QRL either using a [Pool](#) or try your luck with [solo mining](#).
:::

The problem that miners need to solve is designed to be difficult to compute but easy to verify. This means that it takes a lot of computing power to find a solution, but once a solution is found, it can be easily verified by other miners to ensure its validity.

The difficulty of the problem is adjusted dynamically, based on the overall computing power of the network, in order to maintain a consistent rate of block creation. This means that as more miners join the network and the total computing power increases, the difficulty of the problem increases as well, making it more difficult for any individual miner to solve the problem and earn the reward.

In this way, PoW systems ensure that validating transactions and creating new blocks on the blockchain is a competitive and costly process, which helps to secure the network and prevent malicious actors from attacking it.


#### RandomX

RandomX is a proof-of-work (PoW) mining algorithm designed to be resistant to the specialized hardware used in many other PoW algorithms. It is used by the QRL to secure the blockchain and prevent attackers from gaining control of the network.

RandomX uses a combination of random code execution and memory-hard techniques to make it difficult for specialized hardware, such as Application-Specific Integrated Circuits (ASICs), to perform well. 

This means that it is more accessible to miners using standard computer hardware, such as a CPU or GPU.

The goal of using a mining algorithm like RandomX is to create a more decentralized network, where a wider range of participants can contribute to the security and stability of the blockchain. 

This can help to prevent a small group of miners from gaining too much control over the network, and can make it more difficult for attackers to launch successful attacks

