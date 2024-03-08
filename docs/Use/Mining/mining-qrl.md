---
id: mining-qrl-overview
title: Mining QRL Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Overview
sidebar_position: 1
pagination_label: Mining QRL - Overview
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Mining/mining-qrl.md
description: Mining QRL documentation
keywords:
  - docs
  - mining
image: /assets/img/icons/yellow.png
slug: /use/mining/overview
---

Mining QRL is the basis of the blockchain network and powers the security and utility of the project. This in turn gives back a reward for those that chose to share their computer power for cryptographic hashes.

:::tip Block Rewards
See the [QRL Emission](/build/fundamentals/qrl-emission) documentation for more on the block reward
:::

QRL uses a Proof Of Work consensus algorithm called RandomX which favors mining with traditional CPU hardware. The algorithm is developed to be more efficient on a CPU, limiting other mining devices such as ASICS and GPU's profitability.

Miners simply run some custom mining software and can use most modern computers to earn rewards in return for the block validation they perform.

All mining PC's are working on finding new blocks in the chain along with other miners in a race to the reward. As soon as a miner discovers a new block, the entire chain moves onto the next block starting the sprint again.

Most modern processors can mine QRL using either a full QRL node, or some pool mining software such as XMR-Stak. Each computer that is providing hash-rate, or the amount of hashes you can produce in a given time, increases a miners chances of wining a block.

As a general rule, you will have a better chance at finding blocks using a pool. Solo mining strengthens the QRL network by running a synced node, verifying transactions on the network.  Either way you decide to go, over time your block rewards should even out.



## Solo Mining

Solo mining is referred to a QRL node that is also used for mining new blocks. This method uses the CPU of the node for hashing and is working alone to solve blocks on the network. 

Any block found is submitted through the locally synced QRL node and adds to the decentralization of the network by adding additional validation to the chain. This method is limited to the hash power of the local CPU.

If solo mining node discovers a block that is accepted into the chain the full block reward is given to the miner. This has a larger payout, however is less likely to happen when compared to pool mining.

:::tip Solo Mining Docs
Learn more in our [solo-mining](/use/mining/solo-mining) guide and get started syncing a full QRL node with the [QRL Node Documentation](/use/node/overview)
:::

## Pool Mining

In contrast to solo mining where all of the work and the entire reward is sent to the winning mining PC, a mining pool shares the work and the reward between multiple CPU's.

Each mining PC runs a version of mining software that offloads the node requirements and "pools" the work in finding a new block.

Typically a miner will configure each PC they have running mining software to send all rewards to a common address, or a mining address. This will combine the rewards from each device into a central address.

The payout to an address is dependent on the amount of hashes or hashrate they send to the pool node. The more hashrate the more rewards the miner will earn.

:::tip
Learn more about pool mining in our [pool-mining](/use/mining/pool-mining) guide and see the pool list to find somewhere to send some hashes to!
:::
