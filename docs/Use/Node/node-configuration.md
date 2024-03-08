---
id: node-config
title: QRL Node Configuration
hide_title: false
hide_table_of_contents: false
sidebar_label: Config
sidebar_position: 4
pagination_label: Node - Config
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Node/node-configuration.md
description: QRL Node Configuration
keywords:
  - docs
  - node
  - advanced
  - configuration
image: /assets/img/icons/yellow.png
slug: /use/node/config
---

The QRL node allows custom configurable settings to be established by user directives. These configuration settings guide how the node functions and allows for custom integration.


Download the full [example config file](config.yml) and un-comment options needed, or choose from the [example configuration](#example-configuration) at the bottom of this page.

## Configuration Directives

The QRL Node can be configured using a config file (`~.qrl/config.yml`)saved in the local root QRL directory. 

This file allows modification of user configurable directives to be set such as changing the port in which the node listens for incoming transactions. 

:::tip
The node must be restarted to pick up any modifications to the configuration if already running.
:::


### QRL Mining Config

This section covers all of the required settings needed to setup and mine QRL on a local node. This will use the local processor of the machine the node is running on.


#### `mining_enabled`

Set this to enable mining on the local node. Must also pass a QRL address to the `mining_address` directive.

|  Directive  |  Default  |  Description  |
|:------------|:---------------:|:--------------|
| mining_enabled | *False* | Allows the QRL node to mine blocks on the network |

#### `mining_address`

|  Directive  |  Default  |  Description  |
|:------------|:---------------:|:--------------|
| mining_address | *None* | Address of the wallet to mine to (where mining rewards will be sent upon winning a block)

#### `mining_thread_count`

|  Directive  |  Default  |  Description  |
|:------------|:---------------:|:--------------|
| mining_thread_count | *0* | 0 to auto detect thread count based on CPU/GPU number of processors |


#### Mining Config Example

```yaml
##======================================
##   Mining Configuration
##======================================
mining_enabled: False
mining_address: 'Q01050040b1f8b6e87e3c114f61f921f25b9e392f5ae90b7a1e8bbc0551dabd23c76abf27c3f508'
mining_thread_count: 0
```

###  Ephemeral Config

Ephemeral messaging configuration details are shown below. 

:::info This function is still in development and may change at a later date
:::


#### `accept_ephemeral`

Set this to true to enable ephemeral traffic on the node.

| Directive | Default | Description |
|:------------|:---------------:|:--------------|
| accept_ephemeral | *True* | Allow ephemeral traffic |


#### `outgoing_message_expiry`

Set the time before outgoing messages expire.

| Directive | Default | Description |
|:------------|:---------------:|:--------------|
| outgoing_message_expiry | *90* | Outgoing message expires after XX (90) seconds |


#### Ephemeral Config Example

```yaml
##======================================
##   Ephemeral Configuration
##======================================
accept_ephemeral: True
outgoing_message_expiry: 90
```

###  P2P Config

Configure the Peer to Peer settings.

#### `max_redundant_connections`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| max_redundant_connections | *5* | Number of connections allowed from nodes having same IP |

#### `enable_peer_discovery`

If set to `False` node will only connect to the list of peers given in the [`peer_list`](#peer_list)  directive.

| Directive | Default | Description |
|:----------|:-------:|:------------|
| enable_peer_discovery | *True* | Allows to discover new peers from the connected peers |


#### `peer_list`

List of reachable peers to connect P2P functions. The default node list is managed and operated by the QRL foundation.

| Directive | Default | Description |
|:----------|:-------:|:------------|
| peer_list | *35.178.79.137 35.177.182.85 18.130.119.29 18.130.25.64* | List of available peers with open public API ports |


#### `p2p_local_port`

Local P2P port

| Directive | Default | Description |
|:----------|:-------:|:------------|
| p2p_local_port | *19000* | Locally bound port the node will listen on for a connection |

#### `p2p_public_port`

Public P2P port forwarding connections to the server. 

:::tip Port Forwarding
May require additional firewall port forward settings depending on the network configuration.
:::

| Directive | Default | Description |
|:----------|:-------:|:------------|
| p2p_public_port | *19000* | Public port forwarding connections to server |

#### `p2p_q_size`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| p2p_q_size | *10000* |  |


#### `peer_rate_limit`

Maximum number of messages that can be sent between peers. 

| Directive | Default | Description |
|:----------|:-------:|:------------|
| peer_rate_limit | *500* | Max Number of messages per minute per peer |


#### `ban_minutes`

Number of minutes to ban offending peer IP addresses.

| Directive | Default | Description |
|:----------|:-------:|:------------|
| ban_minutes | *20* | Allows to ban a peer's IP who is breaking protocol |

#### `monitor_connections_interval`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| monitor_connections_interval | *30* | Monitor connection every 30 seconds |


#### `max_peers_limit`

Maximum number of allowed peers to connect.

| Directive | Default | Description |
|:----------|:-------:|:------------|
| max_peers_limit | *100* | Number of allowed peers |

#### `ntp_refresh`

Refresh interval for syncing to NTP servers.

| Directive | Default | Description |
|:----------|:-------:|:------------|
| ntp_refresh | *12* | Refresh NTP every *(12)* hours | 

#### `ntp_request_timeout`

Timeout for unavailable network or NTP server.

| Directive | Default | Description |
|:----------|:-------:|:------------|
| ntp_request_timeout | 10 | seconds before accepting NTP timeout |

##### `ntp_servers`

List of NTP servers for the node to use

| Directive | Default | Description |
|:----------|:-------:|:------------|
| ntp_servers | 'pool.ntp.org' 'ntp.ubuntu.com' | Default NTP servers to synchronize clocks to |


#### `chain_state_timeout`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| chain_state_timeout | *180* | |


#### `chain_state_broadcast_period`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| chain_state_broadcast_period | *180* | must be less than ping_timeout |


#### `transaction_pool_size`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| transaction_pool_size | *25000* |  |


#### `transaction_minimum_fee`

Minimum fee allowed by the node to be accepted into a block.

| Directive | Default | Description |
|:----------|:-------:|:------------|
| transaction_minimum_fee | *1000000000* | in shor `int(0 * dev.shor_per_quanta)` |

#### `pending_transaction_pool_size`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| pending_transaction_pool_size | *75000* | 1% of the pending_transaction_pool will be reserved for moving stale txn |


#### `pending_transaction_pool_reserve`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| pending_transaction_pool_reserve | *75* | `int(self.pending_transaction_pool_size * 0.01)` |


#### `stale_transaction_threshold`

Threshold before considering a transaction stale and rejecting.

| Directive | Default | Description |
|:----------|:-------:|:------------|
| stale_transaction_threshold | *15* | 15 blocks threshold |


#### P2P Config Example

```yaml
##======================================
##   PEER Configuration
##======================================
max_redundant_connections: 5
enable_peer_discovery: True
peer_list: 
 - 35.178.79.137
 - 35.177.182.85
 - 18.130.119.29
 - 18.130.25.64
p2p_local_port: 19000
p2p_public_port: 19000
p2p_q_size: 10000
peer_rate_limit: 500
ban_minutes: 20
monitor_connections_interval: 30
max_peers_limit: 100
ntp_refresh: 12
ntp_request_timeout: 10
ntp_servers:
  - 'pool.ntp.org'
  - 'ntp.ubuntu.com'
chain_state_timeout: 180
chain_state_broadcast_period: 180
transaction_pool_size: 25000
transaction_minimum_fee: 1000000000
pending_transaction_pool_size: 75000
pending_transaction_pool_reserve: 75
stale_transaction_threshold: 15
```


### Admin API Config


#### `admin_api_enabled`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| admin_api_enabled | *false* |  |


#### `admin_api_host`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| admin_api_host | *"127.0.0.1"* |  |


#### `admin_api_port`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| admin_api_port | *19008* |  |

#### `admin_api_threads`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| admin_api_threads | *1* |  |

#### `admin_api_max_concurrent_rpc`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| admin_api_max_concurrent_rpc | *100* |  |


#### Admin Config Example

```yaml
##======================================
##       ADMIN API CONFIGURATION
##======================================
admin_api_enabled: False
admin_api_host: "127.0.0.1"
admin_api_port: 19008
admin_api_threads: 1
admin_api_max_concurrent_rpc: 100
```


### Public API Config


#### `public_api_enabled`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| public_api_enabled | *True* | Enable the public API |

#### `public_api_host`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| public_api_host | *"0.0.0.0"* |  |

#### `public_api_port`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| public_api_port | *19009* |  |

#### `public_api_threads`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| public_api_threads | *1* |  |

#### `public_api_max_concurrent_rpc`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| public_api_max_concurrent_rpc | *100* |  |


#### Public API Config Example

```yaml
##======================================
##       PUBLIC API CONFIGURATION
##======================================
public_api_enabled: True
public_api_host: "0.0.0.0"
public_api_port: 19009
public_api_threads: 1
public_api_max_concurrent_rpc: 100
```


### Mining API Config

#### `mining_api_enabled`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| mining_api_enabled | *False* |  |

#### `mining_api_host`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| mining_api_host | *"127.0.0.1"* |  |

#### `mining_api_port`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| mining_api_port | *19007* |  |

#### `mining_api_threads`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| mining_api_threads | *1* |  |

#### `mining_api_max_concurrent_rpc`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| mining_api_max_concurrent_rpc | *100* |  |


#### Mining API Config Example

```yaml
##======================================
##   Mining API Configuration
##======================================
mining_api_enabled: False
mining_api_host: "127.0.0.1"
mining_api_port: 19007
mining_api_threads: 1
mining_api_max_concurrent_rpc: 100
```

### Debug API Config

#### `debug_api_enabled`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| debug_api_enabled | *False* | |

#### `debug_api_host`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| debug_api_host | *"127.0.0.1"* | |

#### `debug_api_port`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| debug_api_port | *52134* | |

#### `debug_api_threads`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| debug_api_threads | *1* | |

#### `debug_api_max_concurrent_rpc`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| debug_api_max_concurrent_rpc | *100* | |


#### Debug API Config Example

```yaml
##======================================
##        DEBUG API CONFIGURATION
##======================================
debug_api_enabled: False
debug_api_host: "127.0.0.1"
debug_api_port: 52134
debug_api_threads: 1
debug_api_max_concurrent_rpc: 100
```

###  GRPC Proxy Config

#### `grpc_proxy_host`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| grpc_proxy_host | *"127.0.0.1"* |  |

#### `grpc_proxy_port`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| grpc_proxy_port | *18090* |  |

#### GRPC Proxy Config Example

```yaml
##======================================
##       GRPC PROXY CONFIGURATION
##======================================
grpc_proxy_host: "127.0.0.1"
grpc_proxy_port: 18090
```

### Wallet Daemon Config

#### `public_api_server`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| public_api_server | *"127.0.0.1:19009"* | |


#### `wallet_daemon_host`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| wallet_daemon_host | *"127.0.0.1"* | |

#### `wallet_daemon_port`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| wallet_daemon_port | *18091* | |

#### `number_of_slaves`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| number_of_slaves | *3* | |


#### Wallet Daemon Config Example

```yaml
##======================================
##      WALLET DAEMON CONFIGURATION
##======================================
public_api_server: "127.0.0.1:19009"
wallet_daemon_host: "127.0.0.1"
wallet_daemon_port: 18091
number_of_slaves: 3
```


### Wallet API Config

#### `wallet_api_host`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| wallet_api_host | *"127.0.0.1"* | |

#### `wallet_api_port`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| wallet_api_port | *19010* | |

#### `wallet_api_threads`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| wallet_api_threads | *1*| |

#### `wallet_api_max_concurrent_rpc`

| Directive | Default | Description |
|:----------|:-------:|:------------|
| wallet_api_max_concurrent_rpc | *100* | |

#### Wallet API Config Example

```yaml
##======================================
##        WALLET API CONFIGURATION
##======================================
wallet_api_host: "127.0.0.1"
wallet_api_port: 19010
wallet_api_threads: 1
wallet_api_max_concurrent_rpc: 100
```

## Example QRL Config

```yaml
## qrl conf.yml file
##
## This is the configuration file for qrl. 
## It is typically found in the ~/.qrl/ directory
## Default settings are shown below. 
## All commands begin with single(#) 
## Un-comment and adjust to suit your needs

##======================================
##   Mining Configuration
##======================================
# mining_enabled: False
# mining_address: 'Q01050040b1f8b6e87e3c114f61f921f25b9e392f5ae90b7a1e8bbc0551dabd23c76abf27c3f508'
# mining_thread_count: 0  # 0 to auto detect thread count based on CPU/GPU number of processors

##======================================
##   Ephemeral Configuration
##======================================
# accept_ephemeral: True

##======================================
##   PEER Configuration
##======================================
# max_redundant_connections: 5  # Number of connections allowed from nodes having same IP
# enable_peer_discovery: True  # Allows to discover new peers from the connected peers
# peer_list: 
#  - 35.178.79.137
#  - 35.177.182.85
#  - 18.130.119.29
#  - 18.130.25.64
# p2p_local_port: 19000
# p2p_public_port: 19000
# peer_rate_limit: 500  # Max Number of messages per minute per peer
# p2p_q_size: 10000
# outgoing_message_expiry: 90  # Outgoing message expires after 90 seconds
# ntp_servers:
#   - pool.ntp.org
#   - ntp.ubuntu.com
# ntp_refresh: 12 * 60 * 60  # 12 hours
# ntp_request_timeout: 10  # 10 seconds NTP timeout
# ban_minutes: 20              # Allows to ban a peer's IP who is breaking protocol
# monitor_connections_interval: 30
# max_peers_limit: 100  # Number of allowed peers
# chain_state_timeout: 180
# chain_state_broadcast_period: 30    # must be less than ping_timeout
# transaction_minimum_fee: 1000000000
# transaction_pool_size: 25000
# pending_transaction_pool_size: 75000
# pending_transaction_pool_reserve: 75
# stale_transaction_threshold: 15   # 15 Blocks

##======================================
##       ADMIN API CONFIGURATION
##======================================
# admin_api_enabled: False
# admin_api_host: "127.0.0.1"
# admin_api_port: 19008
# admin_api_threads: 1
# admin_api_max_concurrent_rpc: 100

##======================================
##       PUBLIC API CONFIGURATION
##======================================
# public_api_enabled: True
# public_api_host: "127.0.0.1"
# public_api_port: 19009
# public_api_threads: 1
# public_api_max_concurrent_rpc: 100

##======================================
##       MINING API CONFIGURATION
##======================================
# mining_api_enabled: False
# mining_api_host: "127.0.0.1"
# mining_api_port: 19007
# mining_api_threads: 1
# mining_api_max_concurrent_rpc: 100

##======================================
##        DEBUG API CONFIGURATION
##======================================
# debug_api_enabled: False
# debug_api_host: "127.0.0.1"
# debug_api_port: 52134
# debug_api_threads: 1
# debug_api_max_concurrent_rpc: 100

##======================================
##       GRPC PROXY CONFIGURATION
##======================================
# grpc_proxy_host: "127.0.0.1"
# grpc_proxy_port: 18090

##======================================
##      WALLET DAEMON CONFIGURATION
##======================================
# public_api_server: "127.0.0.1:19009"
# wallet_daemon_host: "127.0.0.1"
# wallet_daemon_port: 18091
# number_of_slaves: 3

##======================================
##        WALLET API CONFIGURATION
##======================================
# wallet_api_host: "127.0.0.1"
# wallet_api_port: 19010
# wallet_api_threads: 1
# wallet_api_max_concurrent_rpc: 100
```