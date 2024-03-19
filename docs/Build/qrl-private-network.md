---
id:  qrl-private-network
title: QRL Private Network
hide_title: false
hide_table_of_contents: false
sidebar_label: Private Network
pagination_label: Private QRL Network
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Build/qrl-private-network.md
description: QRL private network setup and operation.
keywords:
  - docs
  - Advanced
  - QRL Private Network
  - Testing
image: /assets/img/icons/yellow.png
slug: /build/private-network
---


Setting up a private QRL network allows a developer to test making QRL transactions without placing funds at risk or relying on external infrastructure. This is intended to help the development and advancement of external systems.


This documentation assumes that you have already followed the [QRL node installation instructions](/use/node/installation)


## config.yml

In order to run a private chain, you need to create `~/.qrl/config.yml` with following content at minimum. See 

```yml
genesis_difficulty: 500
mining_enabled: True
peer_list: []
```


#### Description:

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| genesis_difficulty | UInt64 | Initial difficulty to mine the block. The lower the value the easier it will be to mine the first block. |
| mining_enabled | Boolean | Enable or disables mining |
| peer_list | String[] | List of strings containing "ip:port". It overrides the default peer list. |


**Note:** If you previously ran QRL mainnet on the same node then you need to delete `~/.qrl/data/`


## Running QRL Node

```bash
start_qrl --miningAddress Q010800dd14a340e6daf28d4dab9e42a534177db5bf06ef1bb300452f606a17331bacca9453aac1 --mockGetMeasurement 1000000000
```


#### Description:

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| miningAddress | String | Any valid QRL address on which mining rewards will be credited. |
| mockGetMeasurement | Uint64 | A higher mockGetMeasurement eases it for the hardware to mine the blocks. It simply makes the difficulty constant. The value 1000000000 is enough to mine using very low end hardware. |

