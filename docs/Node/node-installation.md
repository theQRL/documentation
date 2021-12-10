---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: node-installation
title: QRL Node Installation
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL Node - Installation
sidebar_position: 3
pagination_label: QRL Node - Installation
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Node Installation
keywords:
  - docs
  - Node node-installation
  - Install QRL
image: /assets/img/icons/yellow.png
slug: /node/node-installation
---


:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



Installing QRL is simple, and is possible on most modern operating systems. The install relies on `python3.5` or newer and the `pip3` python package install system. 

:::info Minimum Node Hardware Requirements
There are some basic requirements that must be met to run a QRL node. See the [QRL Node Requirements](node-requirements) documentation for more info.
:::

Follow the directions below to get started running a QRL Node.

<Tabs
    defaultValue="ubuntu"
    groupId="os"
    values={[
        {label: 'Ubuntu', value: 'ubuntu'},
        {label: 'MacOS', value: 'macos'},
        {label: 'RedHat', value: 'redhat'},
    ]}>

<TabItem value="ubuntu">

## QRL Ubuntu Installation
Installation instructions for the QRL Node on Ubuntu.

Tested in the latest LTS version `Ubuntu 20.04`

```bash
# Update && Upgrade Software Packages
sudo apt update && sudo apt upgrade -y

# Install the required packages for QRL
sudo apt-get -y install swig3.0 python3-dev python3-pip build-essential pkg-config libssl-dev libffi-dev libhwloc-dev libboost-dev cmake

# Install latest setuptools
pip3 install -U setuptools

# Install latest service identity package
pip3 install service-identity==21.1.0

# Install QRL
pip3 install -U qrl
```

:::tip 
This is the recommended installation method, and most common way to run a QRL Node. Even functions in Windows subsystem for Linux.
:::

</TabItem>
<TabItem value="macos">

## QRL MacOS Installation
Installation instructions for the QRL Node on MacOS. Tested with the latest MacOS version `Big Sur 11.6`


```bash
# Install Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 

# Update brew
brew update

# Install Required Packages
brew install python3 swig boost hwloc leveldb openssl gcc cmake xcodegen

# Update pip
pip3 install --upgrade pip

# Install latest setuptools
pip3 install -U setuptools

# Install latest service identity package
pip3 install --user service-identity==21.1.0

# Install QRL
pip3 install -U qrl
```

> FIXME!! Need to update install instructions for MacOS

</TabItem>
<TabItem value="redhat">

## QRL RedHat Installation
Installation instructions for the QRL Node on Ubuntu.

```bash
# Update packages
sudo dnf update

# Enable developer tools Codeready linux Builder repo
subscription-manager repos --enable codeready-builder-for-rhel-8-x86_64-rpms

# Install requirements
sudo dnf install swig make gcc gcc-c++ redhat-rpm-config python36-devel python2-devel dnf-plugins-core boost-devel openssl-devel hwloc-devel

# Install latest CMAKE-3.21 from sources
## First remove old cmake if exists
sudo dnf remove cmake
## Get the latest cmkake
wget https://github.com/Kitware/CMake/releases/download/v3.21.3/cmake-3.21.3.tar.gz
## Extract the files
tar -xvf cmake-3.21.3.tar.gz
## Enter the directory and bootstrap the build and install the latest
cd cmake-3.21.3 && ./bootstrap && make && sudo make install

# Upgrade pip to latest
pip3 install --user --upgrade pip

# Install latest service identity package
pip3 install --user service-identity==21.1.0

# Install latest wheel package
pip3 install --user wheel

# Install latest setuptools
pip3 install --user -U setuptools

# Install QRL
pip3 install --user -U qrl
```

> FIXME!! Need to update install instructions for MacOS


</TabItem>
</Tabs>


## Running QRL

After successful installation of the QRL node the command line tools are available immediately. For more information see the [Node CLI Documentation](node-cli).

The node software runs in the current shell, to run the node in the background, use something like `screen` to disconnect the shell from the running node allowing syncing to happen in the background.

See the [screen documentation](https://www.gnu.org/software/screen/manual/screen.html) for more information and installation instructions.

#### `start_qrl`

To begin the syncing process run the node software.

```sh
start_qrl
```

Output looks something like this.

```
2021-09-25 18:22:28,045|2.1.2 python|unsynced|MainThread | INFO : grpc public service - started !
2021-09-25 18:22:28,046|2.1.2 python|unsynced|MainThread | INFO : [TWISTED] P2PFactory starting on 19000
2021-09-25 18:22:28,047|2.1.2 python|unsynced|MainThread | INFO : QRL blockchain ledger 2.1.2 python
2021-09-25 18:22:29,049|2.1.2 python|synced  |MainThread | INFO : Status changed to ESyncState.synced
```

This will start the node software, create a default node directory at `~/.qrl` and begin syncing blocks from the known peers.


#### `start_qrl` Help

The `start_qrl` command has additional advanced configuration that can be passed via the command line. Below is an explanation of each additional option.

```bash
usage: start_qrl [-h] [--mining_thread_count MINING_THREAD_COUNT] [--quiet]
                 [--qrldir QRL_DIR] [--no-colors]
                 [-l {DEBUG,INFO,WARNING,ERROR,CRITICAL}]
                 [--network-type {mainnet,testnet}]
                 [--miningAddress MINING_ADDRESS]
                 [--mockGetMeasurement MEASUREMENT] [--debug] [--mocknet]
```

```

QRL node

optional arguments:
  -h, --help            show this help message and exit
  --mining_thread_count MINING_THREAD_COUNT, -m MINING_THREAD_COUNT Number of threads for mining
  --quiet, -q           Avoid writing data to the console
  --qrldir QRL_DIR, -d QRL_DIR Use a different directory for node data/configuration
  --no-colors           Disables color output
  -l {DEBUG,INFO,WARNING,ERROR,CRITICAL}, --loglevel {DEBUG,INFO,WARNING,ERROR,CRITICAL} Set the logging level
  --network-type {mainnet,testnet} Runs QRL Testnet Node
  --miningAddress MINING_ADDRESS QRL Wallet address on which mining reward has to be credited.
  --mockGetMeasurement MEASUREMENT Warning: Only for integration test, to mock get_measurement
  --debug               Enables fault handler
  --mocknet             Enables default mocknet settings
```

| **Command_Options** |  **Comments** |
|---| --- |
| --mining_thread_count -m MINING_THREAD_COUNT | Number of CPU threads to use for mining|
| --quiet -q | Quiet the output to the console|
| --qrldir -d QRL_DIR | Directory to use for root node data (default `~/.qrl`|
| --no-colors  | Disable colored output to console|
| --loglevel -l | DEBUG,INFO,WARNING,ERROR,CRITICAL} Set the logging level|
| --network-type {mainnet,testnet} | Set the type of node to run setting default node directory to `~/.qrl-testnet`|
| --miningAddress  | |
| --mockGetMeasurement  | |
| --debug  | |
| --mocknet  | |




