---
id: qrl-maintenance 
title: QRL Node Maintenance
hide_title: false
hide_table_of_contents: false
sidebar_label: Maintenance
sidebar_position: 1
pagination_label: Node Maintenance
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Node/qrl-maintenance.md
description: QRL node maintenance overview
keywords:
  - docs
  - maintenance
image: /assets/img/icons/yellow.png
slug: /use/node/maintenance

---

The QRL node requires very little maintenance to keep running. There are a few things that can come up over the life of the node to be aware of and account for.

## State File Growth

The QRL chain continues to grow in size with each new block added. This is the nature of blockchain, and a foundation of the eco-system. This is how we achieve immutability, the 
entire history is there for anyone to see.

On average the blockchain grows by about $2.95$KB a block, with the average block time being around $60$ seconds. At the time of writing the chain consumes about $10$GB of space.

:::note
Plan ahead for the chain to grow, once the disk is full the node will stop syncing blocks. At the time of writing the chain consumes about $10$GB of space at blockheight $1889766$.
:::


## QRL Log

The node writes to a log file, by default stored in the `~/.qrl/qrl.log` file. This log file rolls into a backup at $100$MB. These log files can add up to some additional disk usage 
and may be worth monitoring.

## Periodic Updates

Through the life of the project there will be updates and upgrade required to the node.

### Soft Fork

This is an update to the QRL node software that implements a new feature or fixes some bug while keeping backwards compatibility for old node. This means that all nodes running either 
old or new software can occupy the same network.

Soft fork changes do not require that all node operators update, and may only effect a small percentage of users.

### Hard Fork

A hard fork brings major changes or modifications that cannot be supported without all nodes upgrading to the latest release.

Failure to update by the determined fork blockheight will create 2 networks, one with old chain data and one with the latest code running. Nodes using the old software will not function 
on the network and anything that happens will not be recognized by the main chain. 

:::info
Hard fork updates are well announced prior to the the fork height. Join the mailing list or our support chat on Discord to keep up with the latest updates.
:::
