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

- QRL Node software installed on the localhost.
- Access to a synced node with the walletd running and access to port default wallet daemon port `19010`



## Getting Started

Running the wallet daemon is simple. The `qrl_walletd` daemon comes default with the node software. 

Simply execute the function after successfully installing a node.

```bash
qrl_walletd
```

this will create the local `~/.qrl/qrl_walletd.pid`  and `~/.qrl/walletd.log` files in the default QRL directory.

Wallet files will show here as well when created using the `qrl_walletd` API.

### Grpc Bash Tools

Accessing the Grpc commands using a basic linux command line can be accomplished using a 3rd party tool. For this guide we are using a [tool called `grpcurl`](https://github.com/fullstorydev/grpcurl)

:::info
From the [gRPCurl Docs](https://github.com/fullstorydev/grpcurl#grpcurl):

> `grpcurl` is a command-line tool that lets you interact with gRPC servers. It's basically curl for gRPC servers.
:::


<details>
  <summary>Install gRPCurl</summary>
  <p>

:::info
Golang is required for this method to work.
:::

Install the `grpcurl` tools following the [installation directions](https://github.com/fullstorydev/grpcurl#installation)

```bash
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
```

This installs the command into the bin sub-folder of wherever your $GOPATH environment variable points. (If you have no GOPATH environment variable set, the default install location is $HOME/go/bin). If this directory is already in your $PATH, then you should be good to go.


#### Setup gRPCurl

There are a few things needed to use the tools.

The QRL does not have reflection enabled by default, in order to use the `grpcurl` tools the QRL proto files must be available. 

##### Clone the QRL repo 

```bash
git clone https://github.com/theQRL/qrl
```

##### Add Required Google Proto Files

There are two proto files that we need to gather from the main grpc repository for the system to function.

First create the required directory for the google api proto files.

```bash {title="Create api directory"}
mkdir ~/qrl/src/qrl/protos/google/api
```

```bash {title="Annotations proto File"}
wget -O ~/qrl/src/qrl/protos/google/api/annotations.proto https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/annotations.proto
```

```bash {title="HTTP proto File"}
wget -O ~/qrl/src/qrl/protos/google/api/http.proto https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/http.proto
```

#### Test gRPCurl

Validate the local setup is correctly working.

##### List Available Functions

```bash
~/go/bin/grpcurl -plaintext -import-path ~/qrl/src/qrl/protos/ -proto ~/qrl/src/qrl/protos/qrlwallet.proto describe qrl.WalletAPI
```

```go
service WalletAPI {
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
  rpc GetPaginatedTransactionsByAddress ( .qrl.PaginatedTransactionsByAddressReq ) returns ( .qrl.PaginatedTransactionsByAddressResp );
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
}
```

##### Describe Functions

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

##### Query Local Node

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


##### Add New Address

```bash
~/go/bin/grpcurl -plaintext -import-path ~/qrl/src/qrl/protos/ -proto ~/qrl/src/qrl/protos/qrlwallet.proto -d '{"height": "6", "hash_function": "sha2_256"}' localhost:19010 qrl.WalletAPI.AddNewAddress
```
  </p>
</details>


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































---
---


## Call

Short description

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="Call"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Usage details

<Tabs
  groupId="Call-usage"
  defaultValue="method"
  values={[
    {label: 'Call', value: 'method'},
    {label: 'CallReq', value: 'request'},
    {label: 'CallResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go

```
  
  </TabItem>
  <TabItem value="request">

```go
  
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `param` | [PARAM OBJECT](#call) | NO | <dl><dt>PARAM Object contains:</dt><dd style={{ display:'list-item' }}>X</dd><dd style={{ display:'list-item' }}>Y</dd><dd style={{ display:'list-item' }}>Z</dd></dl> |
| `param` | TYPE | YES | Details |


  </TabItem>
  <TabItem value="response">

```go

```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `param` | [PARAM OBJECT](#call) | <dl><dt>PARAM Object contains:</dt><dd style={{ display:'list-item' }}>X</dd><dd style={{ display:'list-item' }}>Y</dd><dd style={{ display:'list-item' }}>Z</dd></dl> |
| `param` | TYPE | Details |

:::note 
Please refer to the [PARAM](#call) content for more details.
:::

  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="Call-code"
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

#### With Options Defined

```bash 

```

</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js 

```

#### With Options Defined

```js 

```

</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```python 

```

#### With Options Defined

```python 

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json

```
</TabItem>
<TabItem value="err" label="Error" default>

```json {title="ERROR-1"}

```
</TabItem>
</Tabs>

#### Optional Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `CONF` | `DEF_VAL` | NOTES |
| `CONF` | `DEF_VAL` | NOTES |

</TabItem>
</Tabs>
<br />

---
---














































## AddNewAddress

Adds new randomly generated address to the wallet located at `~/.qrl/walletd.json`. 

<Tabs
    groupId="AddNewAddress"
    defaultValue="usage"
    className="unique-tabs"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">

This function will create a single QRL address. For use when outgoing transactions will not exceed addresses one time signature tree height. 

This address is limited to the initial OTS height given when generated and cannot be changes at a later time.

Using default settings this will generate a new address with:

- OTS key height `{"height": 10}` or $1,024$ outgoing transactions
- Using the `{"hash_function": "shake_128"}`

The newly generated address will be added to the `~/.qrl/walletd.json` file. This file will be created if it does not already exist.


:::note
Ensure the tree height is large enough for your needs and transfer all funds out of the address before all [OTS keys](build/fundamentals/ots-keys) are used!
:::


<Tabs
  groupId="AddNewAddressUsage"
  defaultValue="method"
  values={[
    {label: 'AddNewAddress', value: 'method'},
    {label: 'AddNewAddressReq', value: 'request'},
    {label: 'AddNewAddressResp', value: 'response'},
  ]}>
  <TabItem value="method">

  
```go
service WalletAPI {
    rpc AddNewAddress(AddNewAddressReq) returns (AddNewAddressResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message AddNewAddressReq {
    uint64 height = 1;
    string hash_function = 2;
}
```

| Field | Type | Required | Details | 
| :--: | :---: | :--: | :--- |
| `height` | UInt64 | NO | Height of the newly generated XMSS tree |
| `hash_function` | String | NO | Hash function for XMSS. Possible values are shake128, shake256 |

  </TabItem>
  <TabItem value="response">

```go
message AddNewAddressResp {
    uint32 code = 1;
    string error = 2;
    string address = 3;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `address` | String | Returns the newly added QRL address |

**Error Response:**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | UInt32 | Error Code. Only appears if any exception is triggered. |
| error | String | Error Message. Only appears if any exception is triggered. |


  </TabItem>
</Tabs>


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

```js

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

```py 
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

:::caution NEED HELP!
Add more details on this funciton:
- How are the slaves broadcast onto the network?
- Where is the slaves file located?
:::

Adds a new address into the `~/.qrl/walletd.json` wallet file and generates slaves for the address. 
 
:::info
These slaves are not valid for use until they are broadcast onto the network in a `RelaySlaveTxn` transaction. 
:::

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="AddNewAddressWithSlaves"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

By default this function will generate a new address with: 

- Tree height 10 `{"height": 10}` or $1,024$ outgoing transactions
- Three slave keys each with height 10 `{"number_of_slaves":3}` 
- Using the shake-128 hash function  `{"hash_function": "shake_128"}` 
- The first five slave OTS keys will be preserved, beginning at `{"index": 5}`
  - Keys `{0 - 4}` are saved for backup or recovery for each slave generated.

This address and slave keys will be added to the \~/.qrl/walletd.json file, *this file will be created if not existing*.

<Tabs
  groupId="addnewaddresswithslaves"
  defaultValue="method"
  values={[
    {label: 'AddNewAddressWithSlaves', value: 'method'},
    {label: 'AddNewAddressWithSlavesReq', value: 'request'},
    {label: 'AddNewAddressWithSlavesResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc AddNewAddressWithSlaves(AddNewAddressWithSlavesReq) returns (AddNewAddressResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message AddNewAddressWithSlavesReq {
    uint64 height = 1;  // Height of Master Address
    uint64 number_of_slaves = 2;
    string hash_function = 3;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `height` | UInt64 | NO | Height of the newly generated XMSS tree (Min 8) |
| `number_of_slaves` | UInt64 | NO | Number of slaves to be generated (Max 100, Default 3) |
| `hash_function` | String | NO | Hash function for XMSS. Possible values are shake128, shake256, sha2_256. |

  </TabItem>
  <TabItem value="response">

```go
message AddNewAddressResp {
    uint32 code = 1;
    string error = 2;
    string address = 3;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `address` | String | Return the newly added QRL address |

**Error Response**

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | UInt32 | Error Code. Only appears if any exception is triggered. |
| `error` | String | Error Message. Only appears if any exception is triggered. |


  </TabItem>
</Tabs>

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

```js {} 

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
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Usage details

<Tabs
  groupId="AddAddressFromSeed-usage"
  defaultValue="method"
  values={[
    {label: 'AddAddressFromSeed', value: 'method'},
    {label: 'AddAddressFromSeedReq', value: 'request'},
    {label: 'AddAddressFromSeedResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI
{
    //rpc AddAddressFromSeed(AddAddressFromSeedReq) returns (AddAddressFromSeedResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
  message AddAddressFromSeedReq {
    string seed = 1;  // Seed can be either hexseed or mnemonic
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `seed` | String | YES | Seed can be either hexseed or mnemonic |


  </TabItem>
  <TabItem value="response">

```go
message AddAddressFromSeedResp {
    uint32 code = 1;
    string error = 2;
    string address = 3;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | uint32 | Returns code from call |
| `error` | string | Error |
| `address` | string | Address created |



  </TabItem>
</Tabs>


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

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="ListAddresses"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Returns an array of public addresses found in the `walletd.json` wallet file.

:::note
This function will return results from the `walletd.json` file located in the default location when the `walletd-rest-proxy` was started.
Any manual changes to this file will require the proxy to be restarted to pickup the changes. 
:::

<Tabs
  groupId="ListAddresses-usage"
  defaultValue="method"
  values={[
    {label: 'ListAddresses', value: 'method'},
    {label: 'ListAddressesReq', value: 'request'},
    {label: 'ListAddressesResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
  rpc ListAddresses(ListAddressesReq) returns(ListAddressesResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message ListAddressesReq {

}
```

  </TabItem>
  <TabItem value="response">

```go
message ListAddressesResp {
    uint32 code = 1;
    string error = 2;
    repeated string addresses = 3;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `addresses` | Repeated String | Return list of addresses added into your wallet in an array |
| `code` | UInt32 | Error Code. Only appears if any exception is triggered. |
| `error` | String | Error Message. Only appears if any exception is triggered. |


  </TabItem>
</Tabs>


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

```json

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

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="RemoveAddress"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Removes given address from the the `walletd.json` wallet file. Requires a QRL address that exists in the `~/.qrl/walletd.json` file.

:::note
The address to be removed must be given to the function `{"address": ""}`. This action is permanent. 
::: 

<Tabs
  groupId="RemoveAddress-usage"
  defaultValue="method"
  values={[
    {label: 'RemoveAddress', value: 'method'},
    {label: 'RemoveAddressReq', value: 'request'},
    {label: 'RemoveAddressResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc RemoveAddress(RemoveAddressReq) returns (RemoveAddressResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message RemoveAddressReq {
    string address = 1;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `address` | String | YES | QRL address to be removed from the local wallet |


  </TabItem>
  <TabItem value="response">

```go
message RemoveAddressResp {
    uint32 code = 1;
    string error = 2;
}
```

:::info
Gives an empty array `{}` on successful removal of the address from the wallet. 
:::

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | UInt32 | Error Code. Only appears if any exception is triggered. |
| `error` | String | Error Message. Only appears if any exception is triggered. |


  </TabItem>
</Tabs>


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

:::info
Gives an empty array `{}` on successful removal of the address from the wallet. 
:::

</TabItem>
</Tabs>
<br />

---

## IsValidAddress

Check if a QRL address is valid. Returns `{"valid": "True"}` if the QRL Address is valid. 

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="IsValidAddress"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

This function requires a QRL address to lookup. 
Validates the public address given meets all requirements and is valid to be used as recipient of a transaction.

:::note
`IsValidAddress` expects a `Q` hex address format, example: `Q0103006fa2d29c4acb9bc192581694a616d394f7ef2f35dd5ab5a4dddd865740a3f3293e54c560` 
:::

<Tabs
  groupId="IsValidAddress-usage"
  defaultValue="method"
  values={[
    {label: 'IsValidAddress', value: 'method'},
    {label: 'IsValidAddressReq', value: 'request'},
    {label: 'IsValidAddressResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
 rpc IsValidAddress(ValidAddressReq) returns (ValidAddressResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message ValidAddressReq {
    string address = 1;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `address` | String | YES | QRL Address |


  </TabItem>
  <TabItem value="response">

```go
message ValidAddressResp {
    uint32 code = 1;
    string error = 2;
    string valid = 3;
}
```

| Field | Type | Details | 
| `code` | UInt32 | Error Code. Only appears if any exception is triggered. |
| `error` | String | Error Message. Only appears if any exception is triggered. |
| `valid` | String | Returns True for valid QRL address otherwise False. |


  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

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

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="GetRecoverySeeds"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Returns the backup or recovery seeds for the address given. 

<Tabs
  groupId="GetRecoverySeeds-usage"
  defaultValue="method"
  values={[
    {label: 'GetRecoverySeeds', value: 'method'},
    {label: 'GetRecoverySeedsReq', value: 'request'},
    {label: 'GetRecoverySeedsResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
   rpc GetRecoverySeeds(GetRecoverySeedsReq) returns (GetRecoverySeedsResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message GetRecoverySeedsReq {
    string address = 1;
}
```





| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| address | String | YES | QRL Address |




  </TabItem>
  <TabItem value="response">

```go
message GetRecoverySeedsResp {
    uint32 code = 1;
    string error = 2;
    string hexseed = 3;
    string mnemonic = 4;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | UInt32 | Error Code. Only appears if any exception is triggered. |
| `error` | String | Error Message. Only appears if any exception is triggered. |
| `hexseed` | String | Hexseed for the given address |
| `mnemonic` | String | Mnemonic words for the given address |

  </TabItem>
</Tabs>


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

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="GetWalletInfo"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Returns JSON array of information on the wallet located at `/home/$USER/.qrl/walletd.json`

- Wallet Version
- Address count
- Encryption 

<Tabs
  groupId="GetWalletInfo-usage"
  defaultValue="method"
  values={[
    {label: 'GetWalletInfo', value: 'method'},
    {label: 'GetWalletInfoReq', value: 'request'},
    {label: 'GetWalletInfoResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
   rpc GetWalletInfo(GetWalletInfoReq) returns (GetWalletInfoResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message GetWalletInfoReq {

}
```


  </TabItem>
  <TabItem value="response">

```go
message GetWalletInfoResp {
    uint32 code = 1;
    string error = 2;
    uint32 version = 3;
    uint64 address_count = 4;
    bool is_encrypted = 5;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | UInt32 | Error Code. Only appears if any exception is triggered. |
| `error` | String | Error Message. Only appears if any exception is triggered. |
| `version` | UInt32 | Wallet version number |
| `address_count` | UInt64 | Number of addresses into the wallet |
| `is_encrypted` | Boolean | True if wallet is already encryptedFalse if wallet is not encrypted |


  </TabItem>
</Tabs>


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

```js 

```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py
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


<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="RelayTransferTxn"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Use this function to send QRL from an address contained in the `/home/$USER/.qrl/walletd.json` file to another QRL address, up to 100 recipients are allowed per transaction.

You must provide the `ots_index` for the transaction, keeping track of keys that have already been used to avoid any attempted key reuse.

Another method to gather the next available OTS key uses the [`GetOTS` function](#getots) which will return the next expected OTS key from the address. This method expects the keys to be used incrementally from OTS key 0.

:::info
For a more flexible address allowing additional levels of OTS slave keys, use an address created with the [AddNewAddressWithSlaves](#addnewaddresswithslaves) and the [RelayTransferTxnBySlave](#relaytransfertxnbyslave) function. 
:::

<Tabs
  groupId="RelayTransferTxn-usage"
  defaultValue="method"
  values={[
    {label: 'RelayTransferTxn', value: 'method'},
    {label: 'RelayTransferTxnReq', value: 'request'},
    {label: 'RelayTransferTxnResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc RelayTransferTxn(RelayTransferTxnReq) returns (RelayTxnResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message RelayTransferTxnReq {
    repeated string addresses_to = 1;
    repeated uint64 amounts = 2;
    uint64 fee = 3;
    string master_address = 4;
    string signer_address = 5;
    uint64 ots_index = 6;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `addresses_to` | String | YES | Array of receiver&#39;s addresses |
| `amounts` | UInt64 | YES | Array of amounts in Shor to be received by receiver. Must be in same order as of addresses\_to |
| `fee` | UInt64 | YES | Transaction Fee in Shor |
| `master_address` | String | NO | This is an optional field for slave address, only need to be filled if the transaction is sent from a slave address.  |
| `signer_address` | String | YES | QRL Address signing the transaction. QRL Address must be already added into wallet. |
| `ots_index` | UInt64 | YES | One Time Signature Index to be used to sign the transaction. |


  </TabItem>
  <TabItem value="response">

```go
message RelayTxnResp {
    uint32 code = 1;
    string error = 2;
    PlainTransaction tx = 3;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | UInt32 | Error Code. Only appears if any exception is triggered. |
| `error` | String | Error Message. Only appears if any exception is triggered. |
| `tx` | [PlainTransaction OBJECT](#plaintransaction) | Return the transaction that has been relayed to the network. <dl><dt>PlainTransaction Object contains:</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}>signer_addr</dd>  <dd style={{ display:'list-item' }}> <dt>Transfer</dt>  <dd style={{ display:'list-item' }}>addrs_to</dd><dd style={{ display:'list-item' }}>amounts</dd> </dd>   </dl> |




:::note 
Please refer to the [PlainTransaction](#plaintransaction) content for more details.
:::

  </TabItem>
</Tabs>


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
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \ 
                 -d '{"addresses_to": ["Q0103007f44eb8e11de8a0a6d69c21088245951bdb77637a082b713abbf9bdf35f13ac2c8d58d55", "Q0105005475198feb2456a80b2ea6c40cc40d698361031c3de52f7c1f9dcdc2aab8e712c02adb67"], 
                 "amounts": [2000, 100000], 
                 "fee": 0, 
                 "master_address": "", 
                 "signer_address": "Q0105005475198feb2456a80b2ea6c40cc40d698361031c3de52f7c1f9dcdc2aab8e712c02adb67", 
                 "ots_index": 3}' \
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

Short description

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="Call"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Usage details

<Tabs
  groupId="Call-usage"
  defaultValue="method"
  values={[
    {label: 'Call', value: 'method'},
    {label: 'CallReq', value: 'request'},
    {label: 'CallResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
   rpc RelayTransferTxnBySlave(RelayTransferTxnBySlaveReq) returns (RelayTxnResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message RelayTransferTxnBySlaveReq {
    repeated string addresses_to = 1;
    repeated uint64 amounts = 2;
    uint64 fee = 3;
    string master_address = 4;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `addresses_to` | String | YES | Array of receiver&#39;s addresses |
| `amounts` | UInt64 | YES | Array of amounts in Shor to be received by receiver. This array index is related directly to the `addresses_to` field |
| `fee` | UInt64 | YES | Transaction Fee in Shor |
| `master_address` | String | NO | This is an optional field for slave address, only need to be filled if the transaction is sent from a slave address.  |

  </TabItem>
  <TabItem value="response">

```go
message RelayTxnResp {
    uint32 code = 1;
    string error = 2;
    PlainTransaction tx = 3;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | UInt32 | Error Code. Only appears if any exception is triggered. |
| `error` | String | Error Message. Only appears if any exception is triggered. |
| `tx` | [PlainTransaction OBJECT](#plaintransaction) | Return the transaction that has been relayed to the network. <dl><dt>PlainTransaction Object contains:</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}>signer_addr</dd>  <dd style={{ display:'list-item' }}> <dt>Transfer</dt>  <dd style={{ display:'list-item' }}>addrs_to</dd><dd style={{ display:'list-item' }}>amounts</dd> </dd>   </dl> |

:::note 
Please refer to the [PlainTransaction](#plaintransaction) content for more details.
:::

  </TabItem>
</Tabs>

</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="Call-code"
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
                 -d '{"addresses_to": ["Q0103007f44eb8e11de8a0a6d69c21088245951bdb77637a082b713abbf9bdf35f13ac2c8d58d55", "Q0105005475198feb2456a80b2ea6c40cc40d698361031c3de52f7c1f9dcdc2aab8e712c02adb67"], 
                 "amounts": [2000, 100000], 
                 "fee": 0, 
                 "master_address": "Q0105005475198feb2456a80b2ea6c40cc40d698361031c3de52f7c1f9dcdc2aab8e712c02adb67"}' \
                 localhost:19010 \
                 qrl.WalletAPI.RelayTransferTxnBySlave
```

</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js 

```

</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```python 

```

</TabItem>
<TabItem value="resp" label="Response" default>

```json
{ 
  "tx": {
    "masterAddr": "Q0105005475198feb2456a80b2ea6c40cc40d698361031c3de52f7c1f9dcdc2aab8e712c02adb67",
    "publicKey": "01050091c744a2b170c1bc39565cc0b38df1770b8370681d3ecc1e859baac5362ab5a6c980d3b03c4097adce26614643e0e3ec7f44c933b9005070bd18ccdaa04bc83b",   
    "signature": "00000000ff7c5aa32ceb8ccbddd23f4a034e1bf00b015544d61e094f9c0dceb5d8f5bd8eed552f8a063c7df3d44b2b2c2d909b08bf749414741aa7ef7fccb842d0f644f9399fb258e076101591763e4b6144728af80110b3e7d129c0e2132463b1e83f6a367a6fe5824b1f2fd5a4ac253f0a7be3a1cc3a2794117813922c27f3fa3f432a33b9b1c60532a631931f729608979bfa30638e46a3fdc6553b5f60ec0c06c6040cf28edd2ecf8beba870aa4edb2eebb36d5e47f8ee8a7c1ef60848e11440c847dc215e2519f45e30fddb2a55940937c14bbb0946a2963941f940f7f806796d4ce8914be663fe0190189771ae3b9b35e6b262c5dea04a075275bf6efd37082fafc793a910d27e90a5fa0ad7f332bd641c81ba4db621ffe6a225d60fa3ed7f534babf42b5d5a437d00f3496a0e83bd43b662feb8efa5284f6a5b0c0f39bfbdda92bf99eb2d09169b59533b96643e470d13a0bf72cfb500978a4b53ec41806dd9c170754cf029aac8abf0508bc4ce765bdb31e9c6d79516bc22b97386701f4978b3cafe68481708fb16c9f20e7cda60a41c2486cb1f28f7bdd7945de971364d781c22b900ecbd17524a7b09a02935a86925de02726106c36446077f5b491581e477d87bc25a9cb427c6116f0002f16a579c3f7303649aeeca8310f50c39017edda4b0ee4f34ad9b65ffd1aacef0397a8aea089e0137f4d2a2bd17a1c18d145c962399b15468e49e477681392f84bfe913d6233ed57a3ac8fd57a5bccbda6e4a4404518ddfea739fb1946b6ead25883cfecd3465e2e28f91dc348103359fd66d2291a3dd501ca99b85a19f85aecb858052db12b600215eff0fb49011e20adaab1460e00265d61e2009c010dccc841546fbda118456537bfeb21a7b1e58bcbe049f67c273ea681cee4db19efd235cf6de80f35455fd0108e9747fb56f8587777c608fe7a9a3c65bae06aac1e4e3033707d3713199412e18472cf43d45fc1d6e031e9a5675f83ce3be695dbe370e41fc41fc3275f2dd3de34a70832d89cf4edaaddaf937392259e9321a6a115473e6a559a4f8bb322fd931bd84999644359d5ef05c1a36455809f7bfe6bf8064f16c4f817ac042d2055e74c87c013a2910ef338b0c036ba755fd7107ea3aed0e883362fa9bf6bc228a22740a2a190dfaf772d6444d6f7b2e614a65b15df6cd13a2147313b7df86b5bd873eb76a83b1608df78f4d6e3dc1a4fcf6efc6e99a085446264dcdd36da8f69eb07fd01b3f18d5114957ee02421fa1fa7c997f8c336c836bc01950fb3842134f2ee6101134db65963347ef8734b93cd82181fc858a8833e65a2b2ff2a3a6ef3479fa5d79014274d5a65de369b8dbd10754a62b4da30d93bc3ab605a690fd4f2225fa6946640a56787d2526ee8e6c4e307147f8091d90e22b0c06274953acbfb635112b9133f72f34ee8c1d10cc4f58e8a3ba055b1ab2cbee9fd31a25e9b4352528d144b625585048002118011afd7c82ebaef9b028ae6711281fd7457bfe918b8ef6d12e13b0de63ed802560ac6eb03beecf542d0497a9931e91a0ba84b78db7694d789f8824d80904e71c2b3935421b530956de453f504939a76f00baf62abaa4b412393a213c91ad3928a613ed7cec1be8d597f4e441148e0b2e42ae944b9c275dbd9468c230cb7137761a3b3bbf5cc55ccfbc3b72fea4533219428ae917bf27a6f8bfc3ac00b7d79136ffae346e463878042c25859af2737399603750a241fc52034ec0c7620a23c7dcb8f6d3db3ba5b0eb7c6d71b2c58b6e06c6ea92e1bca056648b0a9ff91539233c7897b20e845813381ad8a53248d5b8b41668dd3e16fe6edfb6b224087e9c240068d2fae350b18f0d3edf8829ca9e08438070c6d4d96fdb4cd325e82b5b0e235592e2eac1848962131c6cb2b81c8ea2589b3294e413e38d8fce6ce39855a090604138504e5d7dd832cd1a9a3884acc09352eee3d3af1d298b9eafa505c212b794b21ffa4f212705e8d0bfb72c60b94126657c15765ecd7e0e0be6e69f609c170a84fe9d5692efac53ad3013599afc98ac0e0420f74b1aa8c0f979691e768a2f82269650fa015d77237effc068adabf8bd609c379a2f37f9aadcced594482e590760fdadfda012a2ce2c095ecf9c098b7e0bacf888f128d0ada2e9e60ec0e5ee79ad2a55c1c189fc9a45821a8ae5d096c88090358bffc6f80f0b9cea8275cf77c155c51baed5829e8663ea600169109f484c0035f39eb99ede5447dedb65bfd699efbd19b37efea2cc3b69007929c71cb535bcfaf4a8f5681b42f55b70dbcd148a127b2a9face2be4aa96bfad93be1527ed9c3fc15fef9f3e759db296530ddc4b8c61a48b69601171429c4ae4b2dafc871737f38ac79096672c909d8a21259bccac32ce85074a63ae113299cee1537eae1402a0a37a2a82cfa0f6caaf9fcf99be6e87fe99fb82e235003694a983772566421d28b6f3f8c1318b6bf9f88e450751a3bc5d3396a81b1ca71d19778a87434b6193f54e946c495b1bebe5ff54e4d120ca823fa702b0e8ffa4464e4dc22ecd080b40a052c15ac6976282e5fb4bd958d00fded51f059e267739c758a70857cacf408acc90e93da15db9006a4e974c96e421fb4afa0d9b5797ee07c5adc32a59911d2179959c61d66fffe80ec6dabc6b2d59afb1526a64b272608911375537c8ef5902e6fd1238a34fa457d5f75d37d5bd7f06ee914c3b7646e879dff82b1ad74d30c818ad4f4bc915ac5a0ca9a87a19869fad58525bce9bcecaf2441991bcb2bcc35c4d4b52f2b47527d6d9465350541125e30555c7c3ff4a78e6afd3ea9dcf080e465213ff8406f809631d0f96078588133d5a377760ec4c1461adebc6e3a58b479ca747f8bbd8a5e4478b03dcb912214dc9b03e6e7b2c73de1ea25ad693048f75df2785d4e5abb40588a43e0c2bb499c976274c8f9c569bb80241cd2bb00410d534847a4272b946d243b21da9e43f829dd18e8a27731b752c8ad11a66dd5eaf7e61c75aaef153cde81422f62027180fd582882307a83c8af75b97ed28831973807270e9b225e9c053881d520b36073460d0851a9b50c06e52ef46c520c50d2dfd03f24e7f389bf33465c14e2183915b96cb0a147633ca69e06687d60de8b99bf6397c227bb452576dd2122e844026b5badd0d5146529e5c92d3ca3babf4c8e245232c40dbea677012fe2e52ee2a07be1449a08a18dc9687be673226d053ad7e6a44f69113a9f858da57ca159bff5eeb7f9d385e74b23fb75ff245fc8c114e16df16fb69cb01e8bd7d94c5b5c79ebe93f02a4c8d28d9a9bd085ecf2726ea2da4bfe1d1ec7a2e7d44c6334185ba7052d6c61a1e1a0e49ae985b97ae4b38cb3c95a5e46db3379955915dbf14540f57603820d5572bb684eae354e12bf82778bb83c57ba5bb0f81d744de5ae0c891e8bc2daa86b38cd5a9c6af797dda06f6c5b3049040dd0dfb390b0a6ca896f5547fbb5b4693e8da5d8b9742eaf3e0ae2df8a390d4004d1f2c7dfc540758263f03f3c8b643035",
    "transactionHash": "4c17ec991f6906942a459fb5f1198ef35d6bc39408248e8a3e531b7efd94f4db",
    "signerAddr": "Q010500f37f4933d8dfc2b682baab2ebfc8722d83d9f290d8397caea7744fbd0bd98048d05c4e38",
    "transfer": {
      "addrsTo": [
        "Q0103007f44eb8e11de8a0a6d69c21088245951bdb77637a082b713abbf9bdf35f13ac2c8d58d55",
        "Q0105005475198feb2456a80b2ea6c40cc40d698361031c3de52f7c1f9dcdc2aab8e712c02adb67"
      ],
      "amounts": [
        "2000",
        "100000"
      ]

```
</TabItem>
<TabItem value="err" label="Error" default>

```json {title="ERROR-1"}

```
</TabItem>
</Tabs>

#### Optional Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `CONF` | `DEF_VAL` | NOTES |
| `CONF` | `DEF_VAL` | NOTES |

</TabItem>
</Tabs>
<br />

---





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



### PlainTransaction

```go
message PlainTransaction {
    string master_addr = 1;
    uint64 fee = 2;
    string public_key = 3;
    string signature = 4;
    uint64 nonce = 5;
    string transaction_hash = 6;
    string signer_addr = 7;

    oneof transactionType {
        Transfer transfer = 8;
        CoinBase coinbase = 9;
        LatticePublicKey latticePK = 10;
        Message message = 11;
        Token token = 12;
        TransferToken transfer_token = 13;
        Slave slave = 14;
    }

    //////////
    message Transfer {
        repeated string addrs_to = 1;
        repeated uint64 amounts = 2;
    }

    message CoinBase {
        string addr_to = 1;
        uint64 amount = 2;
    }

    message LatticePublicKey {
        string kyber_pk = 1;
        string dilithium_pk = 2;
    }

    message Message {
        string message_hash = 1;
    }

    message Token {
        string symbol = 1;
        string name = 2;
        string owner = 3;
        uint64 decimals = 4;
        repeated PlainAddressAmount initial_balances = 5;
    }

    message TransferToken {
        string token_txhash = 1;
        repeated string addrs_to = 2;
        repeated uint64 amounts = 3;
    }

    message Slave {
        repeated string slave_pks = 1;
        repeated uint32 access_types = 2;
    }
}
```

---



