---
id: node-installation
title: QRL Node Installation
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL Node Installation
sidebar_position: 2
pagination_label: QRL Node Installation
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Node Installation
keywords:
  - docs
  - Node node-installation
  - Install QRL
image: /assets/img/icons/yellow.png
slug: /node-installation
---

:::tip Minimum Node Hardware Requirements
There are some basic requirements that must be met to run a QRL node. See the [QRL Node Requirements](node-requirements) documentation for more info.
:::


Installing QRL is simple, and is possible on most modern operating systems. The install relies on `python3.5` or newer and the `pip3` python package install system. 


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    defaultValue="ubuntu"
    values={[
        {label: 'Ubuntu', value: 'ubuntu'},
        {label: 'MacOS', value: 'macos'},
        {label: 'BSD', value: 'bsd'},
        {label: 'RedHat', value: 'redhat'},
    ]}>

<TabItem value="ubuntu">

## QRL Ubuntu Installation
Installation instructions for the QRL Node on Ubuntu.

```bash
# Update && Upgrade Software Packages
sudo apt update && sudo apt upgrade -y

# Install the required packages for QRL
sudo apt-get -y install swig3.0 python3-dev python3-pip build-essential pkg-config libssl-dev libffi-dev libhwloc-dev libboost-dev cmake

# Install latest setuptools
pip3 install -U setuptools

# Install QRL
pip3 install -U qrl
```

:::tip Recommended Installation Method
:::

</TabItem>
<TabItem value="macos">

## QRL MacOS Installation
Installation instructions for the QRL Node on Ubuntu.

```bash
# Update && Upgrade Software Packages
sudo apt update && sudo apt upgrade -y

# Install the required packages for QRL
sudo apt-get -y install swig3.0 python3-dev python3-pip build-essential pkg-config libssl-dev libffi-dev libhwloc-dev libboost-dev cmake

# Install latest setuptools
pip3 install -U setuptools

# Install QRL
pip3 install -U qrl
```

</TabItem>
<TabItem value="bsd">

## QRL BSD Installation
Installation instructions for the QRL Node on Ubuntu.

```bash
# Update && Upgrade Software Packages
sudo apt update && sudo apt upgrade -y

# Install the required packages for QRL
sudo apt-get -y install swig3.0 python3-dev python3-pip build-essential pkg-config libssl-dev libffi-dev libhwloc-dev libboost-dev cmake

# Install latest setuptools
pip3 install -U setuptools

# Install QRL
pip3 install -U qrl
```
</TabItem>
<TabItem value="redhat">

## QRL RedHat Installation
Installation instructions for the QRL Node on Ubuntu.

```bash
# Update && Upgrade Software Packages
sudo apt update && sudo apt upgrade -y

# Install the required packages for QRL
sudo apt-get -y install swig3.0 python3-dev python3-pip build-essential pkg-config libssl-dev libffi-dev libhwloc-dev libboost-dev cmake

# Install latest setuptools
pip3 install -U setuptools

# Install QRL
pip3 install -U qrl
```
</TabItem>
</Tabs>