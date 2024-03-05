---
id: pool-mining
title: Pool Mining QRL
hide_title: false
hide_table_of_contents: false
sidebar_label: Pool Mining
sidebar_position: 2
pagination_label: Pool Mining
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Mining/pool-mining.md
description: Mining QRL
keywords:
  - docs
  - mining
image: /assets/img/icons/yellow.png
slug: /use/mining/pool-mining

---


Pool mining is the process of multiple users pooling their CPU resources in order to create larger processing power. The miners then split the rewards the pool collects, distributed relative to the input of each miner.

In order to mine QRL using a PC without syncing the entire blockchain, you can connect to a QRL Pool and offer your hash power to the pool. This will allow you to utilize almost any piece of hardware without the need to run a full node.

There are lightweight binaries and scripts that use the local processor to perform work for the pool. This pooled work then gets submitted to the network and the rewards are shared between the workers.

:::info RANDOMX
 QRL Uses the RandomX (rx/0) algorithm to validate work on the QRL network. More information can be found here: https://github.com/tevador/RandomX
:::

## Mining Pool Info

A few things to know about pools:

* There is no **Official** QRL pool. The team will only run a *TestNet* pool if necessary for testing.
* Most pools charge fee to use the service. This should go towards things like server costs and power consumption for the pool systems and the fee is set by the pool.
* Pools can change the payout minimum amounts. Be sure to read the fine print and make sure you understand the rules.
* Do not leave any amount of QRL on the pool. If there is an option to transfer to your wallet, do so at the minimum amount.

To connect to a pool you will need a QRL address that will collect the rewards of the pool mining. You will enter this as the user for the pool. You can also search the stats of your miner by entering this into the bottom of most mining pool sites.

## Requirements

- Computer to use for mining
- Mining Software used to interact with the pool
- QRL wallet address to send the rewards

Pool mining is possible using both CPU's and GPU's. The benefit of one over the other is debatable and outside this guides scope.

Download a mining software package for your operating system and follow the software's documentation, making sure to change out the QRL address with your QRL address.

## Mining Software

There are a few different mining software packages out there available for windows, Mac and Linux. We will not cover all of the options here. Follow the mining software installation and configuration instructions to get started, entering QRL information where applicable.

| Software      | GUI or CLI | Arch | Windows     | Linux |  OSX   |  Links | Notes |
|:-------------:|:--:|:-----:|:-----------:|:-----:|:------:|:------:|:-------:|
|   xmrig   | CLI | CPU, GPU (NVIDIA & AMD) |  YES     |  YES     |  YES      | [GitHub](https://github.com/xmrig/xmrig) | guided start, Open Source, TLS support, HTML statistics page, JSON API |


> **Note** This list is not exhaustive, and is not a promotion or endorsement for a project. Any RandomX mining software \*should work. *YMMV*

Most pools also have a getting started section to help get everything going. Drop by the [QRL Chat](https://theqrl.org/discord) for additional help from our community if needed.





