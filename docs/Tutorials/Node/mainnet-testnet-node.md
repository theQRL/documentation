---
id: dual-node-host
title: Dual Node Shared Host
hide_title: false
hide_table_of_contents: false
sidebar_label: Dual Node Host 
sidebar_position: 1
pagination_label: Dual Node Host 
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Tutorials/Node/mainnet-testnet-node.md
description: Tutorial for installing both Mainnet and Testnet QRL Nodes on a single host PC running Ubuntu.
keywords:
  - tutorials
  - Node
  - Mainnet
  - Testnet
image: /assets/img/icons/yellow.png
slug: /tutorials/node/dual-node-host
---

There are many reason a person would want to run multiple versions of the node software on a single host. This could be to aid in development of on-chain tooling, to use the local nodes to create a new tool or to test broadcasting multiple scripted transactions on a test network before actually sending real funds.


This tutorial will cover installing both Mainnet and Testnet QRL Nodes on a single host PC running Ubuntu. 

## Mainnet Node Setup

It is assumed that you have a working installation of Ubuntu 20.04 and have followed the [guides for installing a mainnet node on Ubuntu](/use/node/installation).

You can verify that the node is running and check it's syncing status by running the following command `qrl --json state`. 


```json {3,5}
{
  "info": {
    "blockHeight": "1824551",
    "blockLastHash": "zwDD8TaIr/bWq6W1wCISo8GO3jZkdOlcpuhU8wAAAAA=",
    "networkId": "The sleeper must awaken",
    "numConnections": 23,
    "numKnownPeers": 70,
    "state": "SYNCED",
    "uptime": "257106",
    "version": "2.1.2 python"
  }
}
```
This command has called the installed QRL node software and requested the local nodes state information. 

:::tip
To see where your local node is in blockheight, compare the `    "blockHeight": "1824551"` to what [The QRL Explorer](https://explorer.theqrl.org) shows.
:::

### Mainnet Node Ports

We can see from a quick `netstat` query that we have open ports

```bash
netstat -tulnp
```

```bash {3,6}
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -                   
tcp        0      0 0.0.0.0:19000           0.0.0.0:*               LISTEN      111069/python3      
tcp6       0      0 :::80                   :::*                    LISTEN      -                   
tcp6       0      0 :::22                   :::*                    LISTEN      -                   
tcp6       0      0 :::19009                :::*                    LISTEN      111069/python3      

```

We can see that the node is using the ports `19000` and `19009` for various functions. 

- Port `19000` is used for Peer to Peer communications and chain syncing.
- Port `19009` is used for qrl command line functions and chain interaction through programming languages
  - Things like submitting a transaction or querying the node's `state`


### Mainnet Node File Location

Unless specified, the node will by default store all node related files in the users home directory.

```bash
ls /home/$USER/.qrl
```

```bash
banned_peers.qrl  data/  qrl.log 
```

The `data/state` directory is where the state files are located "the blockchain" as well as the known peers list your node will use to sync blocks and transmit things with.

You can add a config file to the directory and restart the node to accept the custom configurations. That is exactly how we will run dual nodes on a single host.

## Testnet Node

Before we start the testnet node we need to set a few things up. First of all we do not need to install any more software. We already have a working qrl node, we simply need to give some additional configuration parameters to start using the testnet network.

The QRL node software comes with a bunch of functionality built in, including the ability to specify the network type for the node. This will grab a genesis file, create a config.yaml file and begin to sync the chain using the same ports as the mainnet node that is already running.

:::tip
Check out all of the functions with `qrl --help` or see the [Node CLI Documentation](/use/node/node-cli#cli-help)
:::

### Generate Testnet Directory

Run the following to create the directory and required files. 

```bash
start_qrl --network-type testnet
```
It will fail and give a giant error, disregard the error and check out the new testnet directory.

```bash
ls /home/$USER/.qrl-testnet
```
### Testnet Ports

Now we need to change the ports the testnet node is using to not clash with the already running node.

Edit the configuration file for the testnet node with a text editor, adding the following lines to the end of the file.

```bash
p2p_local_port: 19001
public_api_port: 19019
```

This sets the ports for the testnet node P2P functions to `19001` and the node API port to `19019`.

To see the state of the testnet node we now need to specify the port to use.

```bash
qrl --json --port_pub 19019 state
```


```json {3,5}
{
  "info": {
    "blockHeight": "934180",
    "blockLastHash": "TTJxNqveqa5HzosKq6DtvVzRxjGA7rtUQgIIdtzqAgA=",
    "networkId": "The Random Genesis",
    "numConnections": 3,
    "numKnownPeers": 78,
    "state": "SYNCED",
    "uptime": "563",
    "version": "2.1.2 python"
  }
}
```

From this output you can see the testnet node is running, the blockheight is different form the mainnet node running and the networkID is different.

:::tip 
Check the node blockHeight against the [QRL Testnet Explorer](https://testnet-explorer.theqrl.org)
:::

## Final Thoughts

You now have a dual node single host setup running, this will take some time to sync up to date with the chain. Simply add the port for the testnet node to any `qrl` commands to send it across the testnet network.


Overall this is a fairly simple thing to accomplish once you know the ports involved and how to configure them.

:::warning Never share mainnet and testnet addresses! OTS keys are to be used only **ONE** time
:::
