---
id: node-update
title: QRL Node Update
hide_title: false
hide_table_of_contents: false
sidebar_label: Update
sidebar_position: 1
pagination_label: QRL Node Update
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Node/node-update.md
description: QRL Node Update
keywords:
  - docs
  - Node Update
image: /assets/img/icons/yellow.png
slug: /use/node/node-update

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';


Running a QRL node requires maintenance from time to time. Follow these instructions to update.

## Updating

The overall process to updating a node is very simple.

1. Stop the running QRL node process
2. Update the QRL node `pip3 install -U qrl`
3. Restart the QRL Node `start_qrl`


### Stop the QRL Node

Before updating the node the process must be stopped. Below are some variations, depending on how the node is running.


<Tabs
  defaultValue="screen"
  groupID="syntaxSelection"
  values={[
    { label: 'Screen Session', value: 'screen', },
    { label: 'Stop Systemd', value: 'systemd', },
    { label: 'Linux kill command', value: 'kill', },
  ]
}>

<TabItem value="screen">

#### QRL Node Running in `screen`

If you have previously started the QRL node in a `screen` session, enter the session and issue the `ctl +c` command to 
kill the process with the signal `SIGINT`

First find the screen session name with the `screen --list` command.

```bash {4}
$ screen --list

There are screens on:
  2933349.qrl-node  (01/22/2022 12:01:02 AM)  (Detached) 
```

Reattach to the named session.

```bash
$ screen -r qrl-node
```
This will put you in the active node process, enter `ctl +c` to stop the node
```
2022-01-22 15:24:41,944|2.1.2 python|synced  |MainThread | INFO : Added Block #1889674 9841a7fbe388059e3ac74d7deb45940f9129164caa4e82a566b5a12f00000000
2022-01-22 15:24:48,438|2.1.2 python|synced  |MainThread | INFO : >>>Received block from 35.178.79.137:19000 1889675 82b1cbec1f9a474b9ef8ba64d34e894a20a7d24463d9a3daa371ff2701000000
2022-01-22 15:24:48,533|2.1.2 python|synced  |MainThread | INFO : Added Block #1889675 82b1cbec1f9a474b9ef8ba64d34e894a20a7d24463d9a3daa371ff2701000000
2022-01-22 15:25:03,338|2.1.2 python|synced  |MainThread | INFO : A TXN has been Processed 0466a57ee41c8174aeb1fd6fbd2f6ca33e6e350fb15985c23ab55df0dbc4f16f
2022-01-22 15:25:03,339|2.1.2 python|synced  |MainThread | INFO : <<<Transmitting TX: 0466a57ee41c8174aeb1fd6fbd2f6ca33e6e350fb15985c23ab55df0dbc4f16f
2022-01-22 15:27:39,851|2.1.2 python|synced  |MainThread | INFO : >>>Received block from 35.177.182.85:19000 1889676 abc1d3fb94e25c45d4b0bdb1ea0190c8ce01363e1a543407c7e282a101000000
2022-01-22 15:27:39,977|2.1.2 python|synced  |MainThread | INFO : Added Block #1889676 abc1d3fb94e25c45d4b0bdb1ea0190c8ce01363e1a543407c7e282a101000000

$ ^C
$
```
The node is stopped now, you can move on to updating.
</TabItem>


<TabItem value="systemd">

#### QRL Node in Background with `systemd`

If the node has been setup to run in the background with Linux systemd follow these steps to stop the node.

check for the running node process

Stop the running process using the `systemctl` tool

```bash 
systemctl stop qrl-node
```

Check that it is stopped with 

```bash
systemctl status qrl-node`
```

You can now update the node.

</TabItem>

<TabItem value="kill">

#### Linux `kill` Command

To stop the node, use the `kill {PID}` command where {PID} is replaced with the PID of the local process. 

`ps aux |grep start_qrl` shows the running QRL node process on the local machine.

```bash {4}
$ ps aux |grep start_qrl

USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
fr1t2       8219  0.0  0.0   9856  2496 ?        Ss   Jan10   0:18 SCREEN -Sdm qrl-node start_qrl
```
Here the node is running in a `screen` session named `qrl-node` with PID of `8219` on this computer.

For this example the command to stop the node was `kill 8219`.

Ensure the process is gone with:

```bash
ps aux |grep start_qrl

fr1t2     9529  0.0  0.0  14864  1036 pts/0    S+   22:54   0:00 grep --color=auto start_qrl
```

You can now update the node.

</TabItem>
</Tabs>


### Update the QRL Node Software

With the node stopped, issue the update command, which happens to be the same as the initial install command.

```bash
pip3 install -U qrl
```

This will pull in the latest release from [pypi.org](https://pypi.org/project/qrl/) and update any needed dependencies.


Once complete, you can restart the node.

```bash
start_qrl
```

### State Migration

Any time there is a major update there will be a state migration the happens once you start the node.