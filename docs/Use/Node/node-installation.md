---
id: node-installation
title: QRL Node Installation
hide_title: false
hide_table_of_contents: false
sidebar_label: Installation
sidebar_position: 3
pagination_label: Node - Installation
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Node/node-installation.md
description: QRL Node Installation
keywords:
  - docs
  - Node node-installation
  - Install QRL
image: /assets/img/icons/yellow.png
slug: /use/node/installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Installing QRL is simple, and is possible on most modern operating systems. The install relies on `python3.5` or newer and the `pip3` python package install system. 

:::info Minimum Node Hardware Requirements
There are some basic requirements that must be met to run a QRL node. See the [QRL Node Requirements](/use/node/requirements) documentation for more info.
:::

Follow the directions below to get started running a QRL Node.

## Node Installation

<Tabs
    defaultValue="ubuntu"
    groupId="os"
    values={[
        {label: 'Ubuntu', value: 'ubuntu'},
        {label: 'MacOS', value: 'macos'},
        {label: 'RedHat', value: 'redhat'},
    ]}>

<TabItem value="ubuntu">

#### QRL Ubuntu Installation
Installation instructions for the QRL Node on Ubuntu.

Tested in the latest LTS version `Ubuntu 20.04`

```bash
# Update && Upgrade Software Packages
sudo apt update && sudo apt upgrade -y

# Install the required packages for QRL
sudo apt-get -y install swig3.0 python3-dev python3-pip build-essential pkg-config libssl-dev libffi-dev libhwloc-dev libboost-dev cmake libleveldb-dev

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

#### QRL MacOS Installation
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

</TabItem>
<TabItem value="redhat">

#### QRL RedHat Installation
Installation instructions for the QRL Node on Ubuntu.

```bash
# Update packages
sudo dnf update

# Enable developer tools Codeready Linux Builder repo
subscription-manager repos --enable codeready-builder-for-rhel-8-x86_64-rpms

# Install requirements
sudo dnf install swig make gcc gcc-c++ redhat-rpm-config python36-devel python2-devel dnf-plugins-core boost-devel openssl-devel hwloc-devel

# Install latest CMAKE-3.21 from sources
## First remove old cmake if exists
sudo dnf remove cmake
## Get the latest cmake
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

</TabItem>
</Tabs>


## Running QRL

After successful installation of the node the QRL command line tools are available. For more information see the [QRL Node CLI Documentation](node-cli).

The node software runs in the foreground of the current shell, to run the node in the background, use something like `screen` to disconnect the shell from the running node allowing syncing to happen in the background.


### start_qrl

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

This will start the node software in the foreground of the current shell, create a default node directory at `~/.qrl` and begin syncing blocks from the known peers via the p2p network.


#### start_qrl Help

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


### Screen Session

Run the QRL node in a background screen terminal to allow the node to run after user disconnects from the shell. For more information on [Screen, read the manual here](https://www.gnu.org/software/screen/manual/screen.html)

Install screen if not already installed.

```bash
sudo apt install screen
```

Start the node in a detached screen session named `QRL`:

```bash
screen -dm start_qrl -S QRL
``` 

Reattach to the screen shell:

```bash
screen -r qrl-node
```

Disconnect from the shell using the `ctl + a` then `d` key sequence [described here in the screen docs](https://www.gnu.org/software/screen/manual/screen.html#Detach).


### Systemd Service

Enable the QRL node to start at boot and restart using the `systemd` utility that ships with most Linux systems.

Create the new `qrl.service` file in the `/etc/systemd/system/` directory. This will require `sudo` privileges to write into the directory.


```bash
sudo touch /etc/systemd/system/qrl.service
```

Now modify that file to contain the following, edit for your local user and settings.

```bash {title='qrl.service'}
### save this into /etc/systemd/system/qrl.service
## enable with sudo systemctl enable qrl.service
## start with sudo systemctl start qrl

[Unit]
Description=QRL Node
After=network.target

# Modify the following to suit your user
[Service]
Type=simple
User=ubuntu # Local Username
WorkingDirectory=/home/ubuntu # Local users home directory
ExecStart=/home/ubuntu/.local/bin/start_qrl # Location of the start_qrl executable `which start_qrl`
Restart=always 

[Install]
WantedBy=multi-user.target
```

Enable the script to start at boot an restart if failed:

```bash
sudo systemctl enable qrl.service
```

Now start the node service and begin syncing blocks from the network.

```bash
sudo systemctl start qrl.service
```

Check the status of the node with

```bash
sudo systemctl status qrl.service
```

### Crontab Script

To start the node upon reboot, use a script and crontab to enable a fault tolerant node.

:::tip
Recommended to enable a [system service](#systemd-service) for a more robust monitored node operation.
:::

Create the script below somewhere on your system.

```bash
nano ~/start-node.sh
```

Add the following content to the file, save and exit.

```bash {title="start-node.sh"}
#!/bin/bash

####################
## Start QRL node ##
####################
# 
# Requires modification to function on local system
# Must point to absolute directory for start_qrl 
#
# Typically found at /home/$USER/.local/bin/start_qrl
# locate with `which start_qrl` 

screen -Sdm QRL /home/fr1t2/.local/bin/start_qrl

```

Change the permissions to allow the script to be executed

```bash
chmod +x ~/start-node.sh
```


Modify crontab to enable the script to start at every reboot.

```bash
crontab -e
```

Add the following to the end of the crontab configuration file, changing the user home directory to suite the local installation. Must be an absolute file path.


```bash
@reboot /home/$USER/start-node.sh
```

Now anytime the computer reboots the script will run, starting the node.

## Check for Running Node


On a Linux system, depending on how the node was started you can see if it's running in a few ways.

### QRL Node Log

By default the node will write a log to the home qrl directory `~/.qrl`. The last action of the node is recorded and the log will be fairly constant as the node validates blocks.

To view this log, use the `tail` function that ships with most Linux systems.

```bash
tail -f ~/.qrl/qrl.log
```

This will stream any changes to the log file.

### `ps`  Process Status Command

Using the process status or `ps` command we can see what is running. Combine this with something like `grep` and we can narrow it down to only qrl processes

```bash
ps aux |grep qrl
```

If the node is running it will print the process and related information.

### In a screen Session

If the node is running in a screen service following the guides above one can see what is running using the `screen list` command

```bash
screen -ls
```

Reattach using `screen -r SCREEN_NAME`

### Systemd Service

Print the status of the running systemd service.

```bash
sudo service qrl.service status
```

Or

```bash
sudo systemctl status qrl.service
```

