---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: backup-restore-node-state
title: Backup and Restore QRL Node State
hide_title: false
hide_table_of_contents: false
sidebar_label: Backup and Restore Node 
sidebar_position: 1
pagination_label: Backup and Restore Node 
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Tutorials/Node/backup-restore-node-state.md
description: Tutorial for backing up the QRL Node and restoring the state from a backup.
keywords:
  - tutorials
  - Node
  - walletd
  - linux cli

image: /assets/img/icons/yellow.png
slug: /tutorials/node/backup-restore-node-state
---

Restoring and backing up a QRL node is simple once you have the correct tools to do so. It is always recommended to fully sync the node, not trusting other users for the blockchains immutable truth. 

That said, it does take quite a while to work through all of the blocks validating each one along the way (*thanks to some python limitations*)

Restoring from a backup or *bootstrapping* a QRL node can be a quick way to get up and running with the project.

## Backup QRL State

Using the [QRL_Bootstrap script](https://github.com/0xFF0/QRL_bootstrap) on a system with a fully synced QRL node is the easiest way to backup the node's local state files (*The Blockchain*). 

The QRL uses a LevelDB Database to store block data. This means there is a proper way to backup and validate the data. The script above follows these best practices and ensures the data is not corrupt.


## Restore QRL State

Bootstrapping the QRL node is simple and quickly gets you started using the node.


Follow the backup procedure above on a node that you have already synced, or grab the state files from a source like [https://qrl.co.in/chain](https://qrl.co.in/chain)

Once you have this backup in a zipped (*tar.gz*) file on the computer that you wish to run the node on, unzip the files into the `~/.qrl/` directory

```bash
tar xvf QRL_Mainnet_State.tar.gz && cp -r state/ ~/.qrl/data/
```

This should leave you with the following directory tree `~/.qrl/data/state/...` with the state files living in the state directory.

Restart the node using the files you just added and you should only need to sync a few hundred blocks instead of the millions the chain consists of.

```bash
start_qrl
```