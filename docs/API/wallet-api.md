---
docstatus: DRAFT
id: wallet-api
title: QRL API - Wallet
hide_title: false
hide_table_of_contents: false
sidebar_label: API - Wallet
sidebar_position: 3
pagination_label: API - Wallet
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL API - Wallet
keywords:
  - docs
  - build
  - developers
  - API
  - Wallet
image: /assets/img/icons/yellow.png
slug: /api/wallet-api
---


:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



The QRL Wallet Daemon allows additional functionality to the QRL Node installation. 

Source code https://github.com/theQRL/QRL/blob/master/src/qrl/daemon/walletd.py

:::info
This API is available with the base QRL Python package install, and when used with the [QRL walletd-rest-proxy](https://github.com/theQRL/walletd-rest-proxy) automatic wallet management is simple.
:::


## WalletD General Info


### Requirements

- QRL Node installed on the localhost, fully synced.


## Getting Started

Running the wallet daemon is simple. Once you have met the requirements above, follow the steps below, ensuring the `wallet-rest-proxy` stays running as this will allow interaction with the GRPC node.

- Run the QRL wallet daemon `qrl_walletd`


| Method Name | Request Type | Response Type | 
| ----------- | ------------ | ------------- | 
| [AddNewAddress](#addnewaddress) | AddNewAddressReq | AddNewAddressResp | |
| [AddNewAddressWithSlaves](#AddNewAddressWithSlaves) | AddNewAddressWithSlavesReq | AddNewAddressWithSlavesResp | |
| [AddAddressFromSeed](#AddAddressFromSeed) | AddAddressFromSeedReq | AddAddressFromSeedResp | |
| [ListAddresses](#ListAddresses) | ListAddressesReq | ListAddressesResp | |
| [RemoveAddress](#RemoveAddress) | RemoveAddressReq | RemoveAddressResp | |
| [IsValidAddress](#IsValidAddress) | IsValidAddressReq | IsValidAddressResp | |
| [GetRecoverySeeds](#GetRecoverySeeds) | GetRecoverySeedsReq | GetRecoverySeedsResp | |
| [GetWalletInfo](#GetWalletInfo) | GetWalletInfoReq | GetWalletInfoResp | |
| [RelayTransferTxn](#RelayTransferTxn) | RelayTransferTxnReq | RelayTransferTxnResp | |
| [RelayTransferTxnBySlave](#RelayTransferTxnBySlave) | RelayTransferTxnBySlaveReq | RelayTransferTxnBySlaveResp | |
| [RelayMessageTxn](#RelayMessageTxn) | RelayMessageTxnReq | RelayMessageTxnResp | |
| [RelayMessageTxnBySlave](#RelayMessageTxnBySlave) | RelayMessageTxnBySlaveReq | RelayMessageTxnBySlaveResp | |
| [RelayTokenTxn](#RelayTokenTxn) | RelayTokenTxnReq | RelayTokenTxnResp | |
| [RelayTokenTxnBySlave](#RelayTokenTxnBySlave) | RelayTokenTxnBySlaveReq | RelayTokenTxnBySlaveResp | |
| [RelayTransferTokenTxn](#RelayTransferTokenTxn) | RelayTransferTokenTxnReq | RelayTransferTokenTxnResp | |
| [RelayTransferTokenTxnBySlave](#RelayTransferTokenTxnBySlave) | RelayTransferTokenTxnBySlaveReq | RelayTransferTokenTxnBySlaveResp | |
| [RelaySlaveTxn](#RelaySlaveTxn) | RelaySlaveTxnReq | RelaySlaveTxnResp | |
| [RelaySlaveTxnBySlave](#RelaySlaveTxnBySlave) | RelaySlaveTxnBySlaveReq | RelaySlaveTxnBySlaveResp | |
| [EncryptWallet](#EncryptWallet) | EncryptWalletReq | EncryptWalletResp | |
| [LockWallet](#LockWallet) | LockWalletReq | LockWalletResp | |
| [UnlockWallet](#UnlockWallet) | UnlockWalletReq | UnlockWalletResp | |
| [ChangePassphrase](#ChangePassphrase) | ChangePassphraseReq | ChangePassphraseResp | |
| [GetTransactionsByAddress](#GetTransactionsByAddress) | GetTransactionsByAddressReq | GetTransactionsByAddressResp | |
| [GetTransaction](#GetTransaction) | GetTransactionReq | GetTransactionResp | |
| [GetBalance](#GetBalance) | GetBalanceReq | GetBalanceResp | |
| [GetTotalBalance](#GetTotalBalance) | GetTotalBalanceReq | GetTotalBalanceResp | |
| [GetOTS](#GetOTS) | GetOTSReq | GetOTSResp | |
| [GetHeight](#GetHeight) | GetHeightReq | GetHeightResp | |
| [GetBlock](#GetBlock) | GetBlockReq | GetBlockResp | |
| [GetBlockByNumber](#GetBlockByNumber) | GetBlockByNumberReq | GetBlockByNumberResp | |
| [GetAddressFromPK](#GetAddressFromPK) | GetAddressFromPKReq | GetAddressFromPKResp | |
| [GetNodeInfo](#GetNodeInfo) | GetNodeInfoReq | GetNodeInfoResp | |











## Grpc Bash Tools

Accessing the Grpc commands using a basic linux command line can be accomplished using a 3rd party tool. For this guide we are using a [tool called `grpcurl`](https://github.com/fullstorydev/grpcurl)

:::info

From the [gRPCurl Docs](https://github.com/fullstorydev/grpcurl#grpcurl):


> `grpcurl` is a command-line tool that lets you interact with gRPC servers. It's basically curl for gRPC servers.
>
> The main purpose for this tool is to invoke RPC methods on a gRPC server from the command-line. gRPC servers use a binary encoding on the wire (protocol buffers, or "protobufs" for short). So they are basically impossible to interact with using regular curl (and older versions of curl that do not support HTTP/2 are of course non-starters). This program accepts messages using JSON encoding, which is much more friendly for both humans and scripts.

:::

### Install gRPCurl

Install the `grpcurl` tools following the [installation directions](https://github.com/fullstorydev/grpcurl#installation)


```bash
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
```

This installs the command into the bin sub-folder of wherever your $GOPATH environment variable points. (If you have no GOPATH environment variable set, the default install location is $HOME/go/bin). If this directory is already in your $PATH, then you should be good to go.

:::info
Golang is required for this method to work.
:::

### Setup gRPCurl

There are a few things needed to use the tools.

The QRL does not have reflection enabled by default, in order to use the `grpcurl` tools the QRL proto files must be available. 

#### Clone the QRL repo 


```bash
git clone https://github.com/theQRL/qrl
```

#### Add Required Google Proto Files

There are two proto files that we need to gather from the main grpc repository for the system to function.

First create the required directory for the google api proto files.

```bash {title="Create api directory"}
mkdir ~/~/qrl/src/qrl/proto/google/api
```

```bash {title="Annotations proto File"}
wget -O ~/~/qrl/src/qrl/protos/google/api/annotations.proto https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/annotations.proto
```

```bash {title="HTTP proto File"}
wget -O ~/~/qrl/src/qrl/protos/google/api/http.proto https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/http.proto
```

### Test gRPCurl

Validate the local setup is correctly working.

#### List Available Functions

```bash
~/go/bin/grpcurl -plaintext -import-path ~/qrl/src/qrl/protos/ -proto ~/qrl/src/qrl/protos/qrlwallet.proto describe qrl.WalletAPI
```

```bash
  rpc AddNewAddress ( .qrl.AddNewAddressReq ) returns ( .qrl.AddNewAddressResp );
  rpc AddNewAddressWithSlaves ( .qrl.AddNewAddressWithSlavesReq ) returns ( .qrl.AddNewAddressResp );
  rpc ChangePassphrase ( .qrl.ChangePassphraseReq ) returns ( .qrl.ChangePassphraseResp );
  rpc EncryptWallet ( .qrl.EncryptWalletReq ) returns ( .qrl.EncryptWalletResp );
  rpc GetAddressFromPK ( .qrl.AddressFromPKReq ) returns ( .qrl.AddressFromPKResp );
  rpc GetBalance ( .qrl.BalanceReq ) returns ( .qrl.BalanceResp );
  rpc GetBlock ( .qrl.BlockReq ) returns ( .qrl.BlockResp );
  rpc GetBlockByNumber ( .qrl.BlockByNumberReq ) returns ( .qrl.BlockResp );
  rpc GetHeight ( .qrl.HeightReq ) returns ( .qrl.HeightResp );
  rpc GetNodeInfo ( .qrl.NodeInfoReq ) returns ( .qrl.NodeInfoResp );
  rpc GetOTS ( .qrl.OTSReq ) returns ( .qrl.OTSResp );
  rpc GetRecoverySeeds ( .qrl.GetRecoverySeedsReq ) returns ( .qrl.GetRecoverySeedsResp );
  rpc GetTotalBalance ( .qrl.TotalBalanceReq ) returns ( .qrl.TotalBalanceResp );
  rpc GetTransaction ( .qrl.TransactionReq ) returns ( .qrl.TransactionResp );
  rpc GetTransactionsByAddress ( .qrl.TransactionsByAddressReq ) returns ( .qrl.TransactionsByAddressResp );
  rpc GetWalletInfo ( .qrl.GetWalletInfoReq ) returns ( .qrl.GetWalletInfoResp );
  rpc IsValidAddress ( .qrl.ValidAddressReq ) returns ( .qrl.ValidAddressResp );
  rpc ListAddresses ( .qrl.ListAddressesReq ) returns ( .qrl.ListAddressesResp );
  rpc LockWallet ( .qrl.LockWalletReq ) returns ( .qrl.LockWalletResp );
  rpc RelayMessageTxn ( .qrl.RelayMessageTxnReq ) returns ( .qrl.RelayTxnResp );
  rpc RelayMessageTxnBySlave ( .qrl.RelayMessageTxnBySlaveReq ) returns ( .qrl.RelayTxnResp );
  rpc RelaySlaveTxn ( .qrl.RelaySlaveTxnReq ) returns ( .qrl.RelayTxnResp );
  rpc RelaySlaveTxnBySlave ( .qrl.RelaySlaveTxnBySlaveReq ) returns ( .qrl.RelayTxnResp );
  rpc RelayTokenTxn ( .qrl.RelayTokenTxnReq ) returns ( .qrl.RelayTxnResp );
  rpc RelayTokenTxnBySlave ( .qrl.RelayTokenTxnBySlaveReq ) returns ( .qrl.RelayTxnResp );
  rpc RelayTransferTokenTxn ( .qrl.RelayTransferTokenTxnReq ) returns ( .qrl.RelayTxnResp );
  rpc RelayTransferTokenTxnBySlave ( .qrl.RelayTransferTokenTxnBySlaveReq ) returns ( .qrl.RelayTxnResp );
  rpc RelayTransferTxn ( .qrl.RelayTransferTxnReq ) returns ( .qrl.RelayTxnResp );
  rpc RelayTransferTxnBySlave ( .qrl.RelayTransferTxnBySlaveReq ) returns ( .qrl.RelayTxnResp );
  rpc RemoveAddress ( .qrl.RemoveAddressReq ) returns ( .qrl.RemoveAddressResp );
  rpc UnlockWallet ( .qrl.UnlockWalletReq ) returns ( .qrl.UnlockWalletResp );
```

#### Describe Functions

```bash
~/go/bin/grpcurl -plaintext -import-path ~/qrl/src/qrl/protos/ -proto ~/qrl/src/qrl/protos/qrlwallet.proto describe qrl.RelayTransferTokenTxnBySlaveReq
```
```bash
qrl.RelayTransferTokenTxnBySlaveReq is a message:
message RelayTransferTokenTxnBySlaveReq {
  repeated string addresses_to = 1;
  string token_txhash = 2;
  repeated uint64 amounts = 3;
  uint64 fee = 4;
  string master_address = 5;
}
```


#### Query Local Node

```bash
~/go/bin/grpcurl -plaintext -import-path ~/qrl/src/qrl/protos/ -proto ~/qrl/src/qrl/protos/qrlwallet.proto localhost:19010  qrl.WalletAPI.GetNodeInfo
```

```bash
{
  "version": "3.0.1 python",
  "numConnections": "4",
  "numKnownPeers": "5",
  "uptime": "4475717",
  "blockHeight": "119014",
  "blockLastHash": "bb0d5e7e59c3c5455881245849b0c1536f361793c4491d4b7931ef39c8040400",
  "networkId": "Testnet 2022"
}

```























## template

Check if a QRL address is valid. Returns `{"valid": "True"}` if the QRL Address is valid. 

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---

---










## AddNewAddress

Adds new randomly generated address to the wallet located at `~/.qrl/walletd.json`. 

Will create a new wallet if none is found.

#### AddNewAddress Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| height | UInt64 | Height of the newly generated XMSS tree |
| hash_function | String | Hash function for XMSS. Possible values are shake128, shake256 |

#### AddNewAddress Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | UInt32 | Error Code. Only appears if any exception is triggered. |
| error | String | Error Message. Only appears if any exception is triggered. |


#### AddNewAddress Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| address | String | Return the newly added QRL address |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="AddNewAddress"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">

This function will create a single address with no slave keys. For use when outgoing transactions will not exceed addresses tree height. 

By default this will generate a new address with:

- OTS key height `{"height": 10}` or $1,024$ outgoing transactions
- Using the `{"hash_function": "shake_128"}`

The newly generated address will be added to the `~/.qrl/walletd.json` file. This file will be created if not existing.


:::note
This address is limited to the initial OTS height given when generated.
:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="AddNewAddress-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 localhost:19010 \
                 qrl.WalletAPI.AddNewAddress
```

#### With Options Defined

```bash
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"height": "6", "hash_function": "sha2_256"}' \
                 localhost:19010 \
                 qrl.WalletAPI.AddNewAddress
```

</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```python
import json
import grpc
from qrl.generated import qrl_pb2_grpc, qrlwallet_pb2_grpc, qrl_pb2, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
add_new_address_req = qrlwallet_pb2.AddNewAddressReq()
add_new_address_resp = peer_stub.AddNewAddress( add_new_address_req, timeout=10)
print(add_new_address_resp)

```

#### With Options Defined

```py {}
import json
import grpc
from qrl.generated import qrl_pb2_grpc, qrlwallet_pb2_grpc, qrl_pb2, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
add_new_address_req = qrlwallet_pb2.AddNewAddressReq(height=6, hash_function="sha2_256")
add_new_address_resp = peer_stub.AddNewAddress( add_new_address_req, timeout=10)
print(add_new_address_resp)

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 
{
  "address": "Q010500d5899d4353e39bdb59505c32cdad5f221ff507fe7dd327fe9cc37f221beba7c6d1fba245"
}
```
</TabItem>
<TabItem value="err" label="Error" default>

```json title="Odd height given (19) must be even between 6 - 18"
{
  "code": 1,
  "error": "For BDS traversal, H - K must be even, with H > K >= 2!"
}
```

```json title="Incorrect hash function given"
{ 
  "code": 1, 
  "error": "XMSS does not support this hash function!"
}
```
</TabItem>
</Tabs>

#### Optional Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `height` | `10` | **Min**: `6`, **Max**: `18` |
| `hash_function` | `shake128` | **Options**: `shake128`, `sha256`, `sha2_256` |



</TabItem>
</Tabs>
<br />

---


## AddNewAddressWithSlaves

Adds a new address into the `~/.qrl/walletd.json` wallet file and generates slaves for the address. 

 
:::info
These slaves are not valid for use until they are broadcast onto the network in a `RelaySlaveTxn` transaction. 
:::

#### AddNewAddressWithSlaves Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| height | UInt64 | Height of the newly generated XMSS tree (Min 8) |
| number_of_slaves | UInt64 | Number of slaves to be generated (Max 100, Default 3) |
| hash_function | String | Hash function for XMSS. Possible values are shake128, shake256, sha2_256. |

#### AddNewAddressWithSlaves Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | UInt32 | Error Code. Only appears if any exception is triggered. |
| error | String | Error Message. Only appears if any exception is triggered. |


#### AddNewAddressWithSlaves Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| address | String | Return the newly added QRL address |

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="AddNewAddressWithSlaves"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">


By default this function will generate a new address with: 

- Tree height 10 `{"height": 10}` or $1,024$ outgoing transactions
- Three slave keys each with height 10 `{"number_of_slaves":3}` 
- Using the shake-128 hash function  `{"hash_function": "shake_128"}` 
- The first five slave OTS keys will be preserved, beginning at `{"index": 5}`
  - Keys `{0 - 4}` are saved for backup or recovery for each slave generated.

This address and slave keys will be added to the \~/.qrl/walletd.json file, *this file will be created if not existing*.

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="AddNewAddressWithSlaves-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 localhost:19010 \
                 qrl.WalletAPI.AddNewAddressWithSlaves
```


#### With Options Defined

```bash
~/go/bin/grpcurl -plaintext  \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"height": "6", "number_of_slaves": "10", "hash_function": "sha2_256"}' \
                 localhost:19010 \
                 qrl.WalletAPI.AddNewAddressWithSlaves
```

</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {5} 

```

</TabItem>
<TabItem value="pyreq" label="Python Request" default>

#### Default Options


```py {}
import json
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
add_new_address_with_slaves_req = qrlwallet_pb2.AddNewAddressWithSlavesReq()
add_new_address_with_slaves_resp = peer_stub.AddNewAddressWithSlaves( add_new_address_with_slaves_req, timeout=10 )
print(add_new_address_with_slaves_resp)

```

#### With Options Defined

```py {}
import json
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
add_new_address_with_slaves_req = qrlwallet_pb2.AddNewAddressWithSlavesReq(height=6, 
                                                                           number_of_slaves=10, 
                                                                           hash_function="sha2_256")
add_new_address_with_slaves_resp = peer_stub.AddNewAddressWithSlaves( add_new_address_with_slaves_req, timeout=10 )
print(add_new_address_with_slaves_resp)

```

</TabItem>
<TabItem value="resp" label="Response" default>

```json 
{
  "address":"Q0103006fa2d29c4acb9bc192581694a616d394f7ef2f35dd5ab5a4dddd865740a3f3293e54c560"
}
```

</TabItem>
<TabItem value="err" label="Error" default>

```json title="Odd height given (19) must be even between 6 - 18"
{
  "code": 1,
  "error": "For BDS traversal, H - K must be even, with H > K >= 2!"
}
```

```json title="Incorrect hash function given"
{ 
  "code": 1, 
  "error": "XMSS does not support this hash function!"
}
```

```json title="Number greater than 100 given for slave count"
{
  "code":1,
  "error":"Number of slaves cannot be more than 100"
}
```

</TabItem>
</Tabs>

#### Optional Configurations 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `height` | `10` | **Min**: `6`, **Max**: `18` |
| `number_of_slaves` | `3` | **Min**: `1`, **Max**: `100` | 
| `hash_function` | `shake128` | **Options**: `shake128`, `sha256`, `sha2_256` |

</TabItem>
</Tabs>
<br />

---


## AddAddressFromSeed

:::warning
Not implemented at this time
:::

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="AddAddressFromSeed"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">


</TabItem>

<TabItem value="code" label="Code">

:::note
Non-functional in base code. Needs development for full functionality
:::


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="AddAddressFromSeed-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

#### Using Mnemonic 

```bash
~/go/bin/grpcurl -plaintext  \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"seed": "absorb drank known sunny artist zebra before cradle away user mare stout gypsy dirt than suite mortar eighty chant spare become invade upward glossy infer lose debris edge marry novice arch eighth needle tend"}' \
                 localhost:19010 \
                 qrl.WalletAPI.AddAddressFromSeed
```

#### Using Hexseed

```bash
~/go/bin/grpcurl -plaintext  \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"seed": "010400786db00bbff61443210f2efe872d7b6393d2e20da68fd454271d0e13b718ef55e46fb8233844458789790a4453946e0f"}' \
                 localhost:19010 \
                 qrl.WalletAPI.AddAddressFromSeed

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `seed` | N/A | Can be either Hexseed or Mnemonic |


</TabItem>
</Tabs>
<br />

---


## ListAddresses

List all addresses found in wallet file.

#### ListAddresses Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | UInt32 | Error Code. Only appears if any exception is triggered. |
| error | String | Error Message. Only appears if any exception is triggered. |

#### ListAddresses Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| addresses | Repeated String | Return list of addresses added into your wallet in an array |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="ListAddresses"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">

Returns an array of public addresses found in the `walletd.json` wallet file.

:::note
This function will return results from the `walletd.json` file located in the default location when the `walletd-rest-proxy` was started.
Any manual changes to this file will require the proxy to be restarted to pickup the changes. 
:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="ListAddresses-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 localhost:19010 \
                 qrl.WalletAPI.ListAddresses
```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}
import json
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
list_addresses_req = qrlwallet_pb2.ListAddressesReq()
list_addresses_resp = peer_stub.AListAddresses( list_addresses_req, timeout=10 )
print(list_addresses_resp)

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 
{
  "addresses": [
    "Q00030062fc430c2726f0d40848f5b18af994e97a72d24fd4418d6da0ce86ee5b45bb574e169d89",
    "Q000300a37a5b958a4ae3bc5d0932e0b817906d45c13a0885ef6e7fb1e35448bad87b73f01fc50d",
    "Q00030044c4248510f58ebc4b7ff2b28d6392a3c6d0eb57568cf428f196b5b9cbcd65cbf844b44d",
    "Q0002008815fa2cedae25de933ce25f4536ea988e768baa5031af59cef4816e13a81fb79241294c",
    "Q01050043b7341061810f95468e5d33e805fc238334b2836351f451c0564668c975fe03f1157efc"
  ]
}
```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

</TabItem>
</Tabs>
<br />

---


## RemoveAddress

Permanently remove a given address, including all private and slave keys, from the `walletd.json` file.

:::danger This action is irreversible and potentially destructive! 
Backup the address keys prior file to removing using the [GetRecoverySeeds](#getrecoveryseeds) function.
:::

#### RemoveAddress Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| address | String | QRL address to be removed from the wallet |

#### RemoveAddress Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | UInt32 | Error Code. Only appears if any exception is triggered. |
| error | String | Error Message. Only appears if any exception is triggered. |


<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="RemoveAddress"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">

Removes given address from the the `walletd.json` wallet file. Requires a QRL address that exists in the `~/.qrl/walletd.json` file.

:::note
The address to be removed must be given to the function `{"address": ""}`. This action is permanent. 
::: 


</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="RemoveAddress-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
~/go/bin/grpcurl -plaintext  \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"address": "Q01050043b7341061810f95468e5d33e805fc238334b2836351f451c0564668c975fe03f1157efc"}' \
                 localhost:19010 \
                 qrl.WalletAPI.RemoveAddress
```

</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```

</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}
import json
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
remove_address_req = qrlwallet_pb2.RemoveAddressReq(address="Q01050043b7341061810f95468e5d33e805fc238334b2836351f451c0564668c975fe03f1157efc")
remove_address_resp = peer_stub.RemoveAddress( remove_address_req, timeout=10 )
print(remove_address_resp)

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 
{}
```

:::info
Gives an empty array `{}` on successful removal of the address from the wallet. 
:::


</TabItem>
<TabItem value="err" label="Error" default>

```json title="Address Not Found in walletd.json file"
{"code":1,"error":"No such address found"}
```

</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `address` | N/A | Provide QRL address in $Q$ Hex format |


</TabItem>
</Tabs>
<br />

---


## IsValidAddress

Check if a QRL address is valid. Returns `{"valid": "True"}` if the QRL Address is valid. 

#### ValidAddress Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| address | String | QRL Address |

#### ValidAddressResp Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | UInt32 | Error Code. Only appears if any exception is triggered. |
| error | String | Error Message. Only appears if any exception is triggered. |

#### IsValidAddress Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| valid | String | Returns True for valid QRL address otherwise False. |


<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="IsValidAddress"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">

This function requires a QRL address to lookup. 
Validates the public address given meets all requirements and is valid to be used as recipient of a transaction.

:::note
`IsValidAddress` expects a `Q` hex address format, example: `Q0103006fa2d29c4acb9bc192581694a616d394f7ef2f35dd5ab5a4dddd865740a3f3293e54c560` 
:::

</TabItem>

<TabItem value="IsValidAddress-code" label="Code">

Example code below. Enter details for the address to lookup  `{"address": ""}`.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="IsValidAddress-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
~/go/bin/grpcurl -plaintext  \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"address": "Q0002008815fa2cedae25de933ce25f4536ea988e768baa5031af59cef4816e13a81fb79241294c"}' \
                 localhost:19010 \
                 qrl.WalletAPI.IsValidAddress
```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}
import json
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
is_valid_address_req = qrlwallet_pb2.ValidAddressReq(address="Q0002008815fa2cedae25de933ce25f4536ea988e768baa5031af59cef4816e13a81fb79241294c")
is_valid_address_resp = peer_stub.IsValidAddress( is_valid_address_req, timeout=10 )
print(is_valid_address_resp)

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 
{"valid": "True"}
```
</TabItem>
<TabItem value="err" label="Error" default>

```json title="Invalid QRL address"
{
  "code":1,
  "error":"Invalid QRL Address",
  "valid":"False"
}
```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `address` | N/A | Provide QRL address in $Q$ Hex format. |


</TabItem>
</Tabs>
<br />

---


## GetRecoverySeeds

Print out the recovery seeds, or secret keys for the given QRL address if it exists in the local wallet file.

:::note
The address must exist in the wallet.
:::

#### GetRecoverySeeds Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| address | String | QRL Address |

#### GetRecoverySeeds Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | UInt32 | Error Code. Only appears if any exception is triggered. |
| error | String | Error Message. Only appears if any exception is triggered. |

#### GetRecoverySeeds Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| hexseed | String | Hexseed for the given address |
| mnemonic | String | Mnemonic words for the given address |


<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="GetRecoverySeeds"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">

Returns the backup or recovery seeds for the address given. 

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="GetRecoverySeeds-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
~/go/bin/grpcurl -plaintext  \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"address": "Q00030044c4248510f58ebc4b7ff2b28d6392a3c6d0eb57568cf428f196b5b9cbcd65cbf844b44d"}' \
                 localhost:19010 \
                 qrl.WalletAPI.GetRecoverySeeds
```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_recovery_seeds_req = qrlwallet_pb2.GetRecoverySeedsReq(address="Q00030044c4248510f58ebc4b7ff2b28d6392a3c6d0eb57568cf428f196b5b9cbcd65cbf844b44d")
get_recovery_seeds_resp = peer_stub.GetRecoverySeeds( get_recovery_seeds_req, timeout=10 )
print(get_recovery_seeds_resp)

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 
{
  "hexseed": "0003003c8ac64dac39770fff5154ba479ba9ce5e0df2042d7e5c31f165c4e35eed8345ea4b9e6703b6bcd8b7063352d50dd295",
  "mnemonic": "aback core differ pulsar faulty series khaki zurich fix facial envoy rose sodium ten verbal dwell libya sense vein genus thirst uphill lucid gold facer told afloat horse strike inmate crew cobalt august chord"
}
```
</TabItem>
<TabItem value="err" label="Error" default>

```json title="No Address Found in wallet file"
{"code": 1, "error": "No such address found in wallet"}
```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `address` | N/A | Provide QRL address in $Q$ Hex format |


</TabItem>
</Tabs>
<br />

---


## GetWalletInfo

Print info on the wallet.

#### GetWalletInfo Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | UInt32 | Error Code. Only appears if any exception is triggered. |
| error | String | Error Message. Only appears if any exception is triggered. |


#### GetWalletInfo Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| version | UInt32 | Wallet version number |
| address\_count | UInt64 | Number of addresses into the wallet |
| is\_encrypted | Boolean | True if wallet is already encryptedFalse if wallet is not encrypted |


<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="GetWalletInfo"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">

Returns JSON array of information on the wallet located at `/home/$USER/.qrl/walletd.json`

- Wallet Version
- Address count
- Encryption 

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="GetWalletInfo-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
~/go/bin/grpcurl -plaintext  \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 localhost:19010 \
                 qrl.WalletAPI.GetWalletInfo
```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_wallet_info_req = qrlwallet_pb2.GetWalletInfoReq()
get_wallet_info_resp = peer_stub.GetWalletInfo( get_wallet_info_req, timeout=10 )
print(get_wallet_info_resp)

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 
{
  "version": 1,
  "addressCount": "21",
  "isEncrypted": true
}
```
</TabItem>
<TabItem value="err" label="Error" default>

```json title="Encrypted wallet, unlock using passphrase."
{ "code": 1, "error": "Failed: Passphrase Missing"}
```
</TabItem>
</Tabs>

</TabItem>
</Tabs>
<br />

---


## RelayTransferTxn

Send or Transfer funds from a QRL address in the wallet to another QRL address. 
This function will use the root OTS keys for the address. 



#### `RelayTransferTxn` Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| addresses\_to | String | Array of receiver&#39;s addresses |
| amounts | UInt64 | Array of amounts in Shor to be received by receiver. Must be in same order as of addresses\_to |
| fee | UInt64 | Transaction Fee in Shor |
| master\_address | String | This is an optional field, only need to be filled with QRL address, if the transaction is signed from slave address. |
| signer\_address | String | QRL Address signing the transaction. QRL Address must be already added into wallet. |
| ots\_index | UInt64 | One Time Signature Index to be used to sign the transaction. |

#### `RelayTransferTxn` Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | UInt32 | Error Code. Only appears if any exception is triggered. |
| error | String | Error Message. Only appears if any exception is triggered. |

:::info `RelayTransferTxn` Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| tx  | Transaction | Return the transaction that has been relayed to the network. |
:::


<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="RelayTransferTxn"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">


Use this function to send QRL from an address contained in the `/home/$USER/.qrl/walletd.json` file to another QRL address, up to 100 recipients are allowed per transaction.

You must provide the `ots_index` for the transaction, keeping track of keys that have already been used to avoid any attempted key reuse.

Another method to gather the next available OTS key uses the [`GetOTS` function](#getots) which will return the next expected OTS key from the address. This method expects the keys to be used incrementally from OTS key 0.

:::info
For a more flexible address allowing additional levels of OTS slave keys, use an address created with the [AddNewAddressWithSlaves](#addnewaddresswithslaves) and the [RelayTransferTxnBySlave](#relaytransfertxnbyslave) function. 
:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="RelayTransferTxn-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
~/go/bin/grpcurl -plaintext  \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"addresses_to": "Q0103007f44eb8e11de8a0a6d69c21088245951bdb77637a082b713abbf9bdf35f13ac2c8d58d55",  "Q010300010e65015a34e2711c3ffc9bde650f7361fde192c5845df991da56940ff411cfd155ddaf",
                        "amounts": '[10000, 100000]',
                        "fee": 100,
                        "master_address": "",
                        "signer_address": "Q000300c37ba50e616cd36c9e4ca6e35c533da903df9f3f73e80352162795bd8872e464e09b8091",
                        "ots_index": 1}' \
                 localhost:19010 \
                 qrl.WalletAPI.RelayTransferTxn
```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_wallet_info_req = qrlwallet_pb2.RelayTransferTxnReq(addresses_to=["Q0103007f44eb8e11de8a0a6d69c21088245951bdb77637a082b713abbf9bdf35f13ac2c8d58d55"],
                        amounts=[1],
                        fee=1,
                        master_address="",
                        signer_address="Q000300c37ba50e616cd36c9e4ca6e35c533da903df9f3f73e80352162795bd8872e464e09b8091",
                        ots_index=1)
get_wallet_info_resp = peer_stub.RelayTransferTxn( get_wallet_info_req, timeout=10 )
print(get_wallet_info_resp)

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

#### Array Required for `addresses_to` and `amounts`

Both `addresses_to` and `amounts` must be given as an array, even for single address transactions. This error will result:

```json title="Value not given as array"
{"error":"json: cannot unmarshal number into Go value of type []json.RawMessage","code":3,"message":"json: cannot unmarshal number into Go value of type []json.RawMessage"}
```

#### Invalid `amounts`

Each `address_to` must have a corresponding `amounts` value to send the address.

```json title="Count of array values in addresses_to and amounts do not match"
{"code":1,"error":"Custom validation failed"}
```

#### Invalid `addresses_to`

```json title="QRL address_to is invalid, wrong number of characters"
{"code":1,"error":"hex string is expected to have an even number of characters"}
```

#### Invalid `signer_address`

The `signer_address` is either not found in the `/home/$USER/.qrl/walletd.json` file or it is invalid.

```json title="QRL address_to is invalid or not found"
{"code":1,"error":"('Signer Address Not Found ', 'Q010300133082645e43fa1cc0aa1e00f269c2aa8ec76cce87175b7e4099723913d50f7d87e9187')"}
```
#### Attempted OTS Re-Use

The OTS key has already been used, and cannot be re-used for transactions. Use the [GetOTS](#getots) function to see the addresses OTS index

```json title="OTS Keys CANNOT be reused"
{"code":1,"error":"cannot rewind"}
```

</TabItem>
</Tabs>

#### Required Data

| Configuration | Default | Notes |
| :---: | :---: | :---: |
| `address` | N/A | Provide QRL address in $Q$ Hex format to send transaction from |
| `addresses_to` | N/A | Recipient QRL addresses array  |
| `amounts` | N/A | Amount for each address in an array |
| `fee` | N/A | Fee to pay for transaction |
| `signer_address` | N/A | Address that is signing and sending the transaction |
| `ots_index` | N/A | Unused OTS key index to sign the transaction |


</TabItem>
</Tabs>
<br />

---


## RelayTransferTxnBySlave

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## RelayMessageTxn

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## RelayMessageTxnBySlave

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## RelayTokenTxn

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## RelayTokenTxnBySlave

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## RelayTransferTokenTxn

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## RelayTransferTokenTxnBySlave

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## RelaySlaveTxn

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## RelaySlaveTxnBySlave

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## EncryptWallet

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## LockWallet

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## UnlockWallet

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## ChangePassphrase

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## GetTransactionsByAddress

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## GetTransaction

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## GetBalance

Retrieve balance information for the address given. 

#### GetBalance Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| address | String | QRL Address |

#### GetBalance Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | UInt32 | Error Code. Only appears if any exception is triggered. |
| error | String | Error Message. Only appears if any exception is triggered. |


#### GetBalance Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| balance | UInt64 | Balance in Shor |


<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="GetBalance"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">

Retrieve balance information for the address given. 

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="GetBalance-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
~/go/bin/grpcurl -plaintext  \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"address":"Q000300c37ba50e616cd36c9e4ca6e35c533da903df9f3f73e80352162795bd8872e464e09b8091"}' \
                 localhost:19010 \
                 qrl.WalletAPI.GetBalance

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_balance_req = qrlwallet_pb2.BalanceReq(address="Q000300c37ba50e616cd36c9e4ca6e35c533da903df9f3f73e80352162795bd8872e464e09b8091")
get_balance_resp = peer_stub.GetBalance( get_balance_req, timeout=10 )
print(get_balance_resp)

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  "balance": "100000099999"
}
```

:::note
Balance is returned in shor. 
$1$ QRL $= 1000000000$ shor **OR** QRL $\times 10^9$
:::

</TabItem>
<TabItem value="err" label="Error" default>

```json title="Invalid Address"
{"code": 1,  "error": "<_Rendezvous of RPC that terminated with (StatusCode.INVALID_ARGUMENT, Invalid Address)>"}
```
```json title="No address given"
{"code": 1, "error": "'' has type str, but expected one of: bytes"}
```

</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `address` | N/A | QRL Address |


</TabItem>
</Tabs>
<br />

---


## GetTotalBalance

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## GetOTS

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## GetHeight



#### GetHeight Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | uint64 |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
~/go/bin/grpcurl -plaintext  -import-path ~/qrl/src/qrl/protos/ -proto ~/qrl/src/qrl/protos/qrlwallet.proto localhost:19009 qrl.PublicAPI.GetHeight
```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}
import grpc
from qrl.generated import qrl_pb2_grpc, qrl_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19009', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrl_pb2_grpc.PublicAPIStub(peer_grpc_channel)
block_height_req = qrl_pb2.GetHeightReq()
block_height_resp = peer_stub.GetHeight( block_height_req, timeout=10)
print(block_height_resp)

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 
height: 117346
```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## GetBlock

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## GetBlockByNumber

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
~/go/bin/grpcurl -plaintext  -import-path ~/qrl/src/qrl/protos/ -proto ~/qrl/src/qrl/protos/qrlwallet.proto -d '{"block_number":1400}' localhost:19009 qrl.PublicAPI.GetBlockByNumber
```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## GetAddressFromPK

#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash

```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---


## GetNodeInfo
#### A Request

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |

#### A Response

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| | |  |
|  |  |  |

#### A Response Data

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
|  |  |  |



<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="A"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">



:::note

:::

</TabItem>

<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="A-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
~/go/bin/grpcurl -plaintext -import-path ~/qrl/src/qrl/protos/ -proto ~/qrl/src/qrl/protos/qrlwallet.proto localhost:19010  qrl.WalletAPI.GetNodeInfo
```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 

```
</TabItem>
<TabItem value="err" label="Error" default>

```json title=""

```
</TabItem>
</Tabs>

#### Required Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `A` |  |  |


</TabItem>
</Tabs>
<br />

---
