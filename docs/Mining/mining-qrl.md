---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: mining-qrl
title: Mining QRL
hide_title: false
hide_table_of_contents: false
sidebar_label: Mining QRL
sidebar_position: 1
pagination_label: Mining QRL
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: Mining QRL
keywords:
  - docs
  - mining
image: /assets/img/icons/yellow.png
slug: /mining/
---


:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>

:::

QRL uses a Proof Of Work consensus algorithm called RandomX. Miners can run specialized software on most modern computers and earn rewards in return for the block validation they perform.

The algorithm is developed to be more efficient on a CPU, limiting any other mining devices such as ASICS and GPU's virtually useless to mine QRL with. This allows more overall participation and decentralization due to accessibility.

All mining PC's are working on finding new blocks in the chain along with all of the other miners in a race to the reward. As soon as a miner discovers a new block, the entire chain moves onto the next block starting the sprint again.

Most modern processors can mine QRL using either a full QRL node, or some mining software such as XMR-Stak. Each computer that is providing hash-rate, or the amount of hashes you can produce in a given time, increases a miners chances of wining a block.

## Full Node Mining

The QRL Full Node supports solo mining, where the local computer, using a local fully synced QRL node can submit valid hashes to the chain for consensus. If this single mining node discovers a block that is adopted into the chain the full block reward is given to the address the node is mining for. 

The benefit of earning a full block is outweighed by the amount of time it may take to find this block. Since you are competing against the entire mining network in search for the next block it is a bit of a luck game. It has been shown that the rewards typically average out between pool mining and solo node mining. 

:::tip
Learn more about solo mining in our [solo-mining](#) guide and get started syncing a full QRL node with the [QRL Node Documentation](/docs/node)
:::

## Pool Mining

In contrast to solo mining where all of the work and the entire reward is sent to the winning mining PC, a pool shares the work, and the reward.

Each mining PC runs a version of mining software that offloads the node requirements and "pools" the work in finding a new block.

Typically a miner will configure each PC they have running mining software to send all rewards to a common address, or a mining address. This will combine the rewards from each device into a central address.

The payout to an address is dependent on the amount of hashes or hashrate they send to the pool node. The more hashrate the more rewards the miner will earn.

:::tip
Learn more about pool mining in our [pool-mining](#) guide and see the pool list to find somewhere to send some hashes to!
:::




> FIX-ME - add links to the list of pools that we have
