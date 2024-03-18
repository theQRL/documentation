---
id: wallet-api
title: QRL API - Wallet
hide_title: false
hide_table_of_contents: false
sidebar_label: API - Wallet
sidebar_position: 3
pagination_label: API - Wallet
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/API/wallet-api.md
description: QRL API - Wallet API for programatic interaction with the QRL Blockchain
keywords:
  - docs
  - build
  - developers
  - API
  - Wallet
image: /assets/img/icons/yellow.png
slug: /api/wallet-api
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The QRL Wallet Daemon allows additional functionality to the QRL Node installation giving access to wallet functions and advanced control of accounts.

Source code https://github.com/theQRL/QRL/blob/master/src/qrl/daemon/walletd.py

:::info
This API is available with the base QRL Python package install, and when used with the [QRL walletd-rest-proxy](https://github.com/theQRL/walletd-rest-proxy) automatic wallet management is simple.
:::



## Getting Started

Running the wallet daemon is simple. The `qrl_walletd` daemon comes default with the node software. 

Simply execute the function after successfully installing a node.

```bash
qrl_walletd
```

this will create the local `~/.qrl/qrl_walletd.pid`  and `~/.qrl/walletd.log` files in the default QRL directory. Wallet files will be created here as well when using the `qrl_walletd` API.

### Requirements

- QRL Node software installed on the localhost.
- Access to a synced node with the walletd running and access to port default wallet daemon port `19010`

### Grpc Bash Tools

Accessing the Grpc commands using a basic Linux command line can be accomplished using a 3rd party tool. For this guide we are using a [tool called `grpcurl`](https://github.com/fullstorydev/grpcurl)

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


## Methods

| Method Name | Request Type | Response Type | 
| ----------- | ------------ | ------------- | 
| [AddNewAddress](#addnewaddress) | AddNewAddressReq | AddNewAddressResp |
| [AddNewAddressWithSlaves](#addnewaddresswithslaves) | AddNewAddressWithSlavesReq | AddNewAddressResp |
| [AddAddressFromSeed](#addaddressfromseed) | AddAddressFromSeedReq | AddAddressFromSeedResp |
| [ListAddresses](#listaddresses) | ListAddressesReq | ListAddressesResp |
| [RemoveAddress](#removeaddress) | RemoveAddressReq | RemoveAddressResp |
| [IsValidAddress](#isvalidaddress) | ValidAddressReq | ValidAddressResp |
| [GetRecoverySeeds](#getrecoveryseeds) | GetRecoverySeedsReq | GetRecoverySeedsResp |
| [GetWalletInfo](#getwalletinfo) | GetWalletInfoReq | GetWalletInfoResp |
| [RelayTransferTxn](#relaytransfertxn) | RelayTransferTxnReq | RelayTxnResp |
| [RelayTransferTxnBySlave](#relaytransfertxnbyslave) | RelayTransferTxnBySlaveReq | RelayTxnResp |
| [RelayMessageTxn](#relaymessagetxn) | RelayMessageTxnReq | RelayTxnResp |
| [RelayMessageTxnBySlave](#relaymessagetxnbyslave) | RelayMessageTxnBySlaveReq | RelayTxnResp |
| [RelayTokenTxn](#relaytokentxn) | RelayTokenTxnReq | RelayTxnResp |
| [RelayTokenTxnBySlave](#relaytokentxnbyslave) | RelayTokenTxnBySlaveReq | RelayTxnResp |
| [RelayTransferTokenTxn](#relaytransfertokentxn) | RelayTransferTokenTxnReq | RelayTxnResp |
| [RelayTransferTokenTxnBySlave](#relaytransfertokentxnbyslave) | RelayTransferTokenTxnBySlaveReq | RelayTxnResp |
| [RelaySlaveTxn](#relayslavetxn) | RelaySlaveTxnReq | RelayTxnResp |
| [RelaySlaveTxnBySlave](#relayslavetxnbyslave) | RelaySlaveTxnBySlaveReq | RelayTxnResp |
| [EncryptWallet](#encryptwallet) | EncryptWalletReq | EncryptWalletResp |
| [LockWallet](#lockwallet) | LockWalletReq | LockWalletResp |
| [UnlockWallet](#unlockwallet) | UnlockWalletReq | UnlockWalletResp |
| [ChangePassphrase](#changepassphrase) | ChangePassphraseReq | ChangePassphraseResp |
| [GetTransactionsByAddress](#gettransactionsbyaddress) | TransactionsByAddressReq | TransactionsByAddressResp |
| [GetTransaction](#gettransaction) | TransactionReq | TransactionResp |
| [GetBalance](#getbalance) | BalanceReq | BalanceResp |
| [GetTotalBalance](#gettotalbalance) | TotalBalanceReq | TotalBalanceResp |
| [GetOTS](#getots) | OTSReq | OTSResp |
| [GetHeight](#getheight) | HeightReq | HeightResp |
| [GetBlock](#getblock) | BlockReq | BlockResp |
| [GetBlockByNumber](#getblockbynumber) | BlockByNumberReq | BlockResp |
| [GetAddressFromPK](#getaddressfrompk) | AddressFromPKReq | AddressFromPKResp |
| [GetNodeInfo](#getnodeinfo) | NodeInfoReq | NodeInfoResp |


### AddNewAddress

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
Ensure the tree height is large enough for your needs and transfer all funds out of the address before all [OTS keys](/build/fundamentals/ots-keys) are used!
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


### AddNewAddressWithSlaves

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

### AddAddressFromSeed

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

### ListAddresses

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

### RemoveAddress

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

### IsValidAddress

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




### GetRecoverySeeds

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

### GetWalletInfo

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


### RelayTransferTxn

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
                 "ots_index": 4}' \
                 localhost:19010 \
                 qrl.WalletAPI.RelayTransferTxn
```
</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_relaytransfertxn_req = qrlwallet_pb2.RelayTransferTxnReq(addresses_to=["Q0103007f44eb8e11de8a0a6d69c21088245951bdb77637a082b713abbf9bdf35f13ac2c8d58d55"],
                        amounts=[1],
                        fee=1,
                        master_address="",
                        signer_address="Q000300c37ba50e616cd36c9e4ca6e35c533da903df9f3f73e80352162795bd8872e464e09b8091",
                        ots_index=1)
get_relaytransfertxn_resp = peer_stub.RelayTransferTxn( get_relaytransfertxn_req, timeout=10 )
print(get_relaytransfertxn_resp)

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 
{
  "tx": {
    "publicKey": "010500d4e376e27096e01cd59acf20ecce16a3dc8c7e48d8e10bced7c9e8fd6a09a2c6512a5b6f64c37320fe02ca375c3de2cce4148b16a398b11cd2bd6f77cc2d8df6",
    "signature": "00000004b022a72b36e39f22e8ce9add5d95c8515b440e87482edfec8e4e363028c8f21a4750c778af427aeb449cd9a43597fd1aa9bc19b153fb3ad450953447b0e77d238f888f0e27c2ef1c3d41ad9bf149f95e7f24f5ccfae3f6475682be736d9b03554f9fd5f03a1bfeeab30c5a5f7748ff2858c2a7d5325f710d979b95454ad57fe287551951fae8a1d53892e100bbe9ae55303831133a6dda1e5d59ee700d781e8e7ec8c960a88eb868a2d8526604aa7d70d193ce29e6860f64f2349eebe5549b6b9c0adfadce66f4b48e91acc6b652e16f5b95dea31ca5446925726c16acdad2299dc01bde8efc0c55c0c40431031bcb6ccb7347b2bd3a11aac25a840bb0194dc6a5ab277f86b20482ef086360f4d0110d5513d481ae8f1704e465e8d31df13d0d698e9825b9c1a91cfcd547590fa0e542b2df7aebf957758b09252cbaad8bd4abdec1a042db6dcfe5aa396ee29c701b888592ea492629399844c4e6a36f22a38047c47a186e279051e62a88b3e56b8baa8671bdf8bc6b1bf4363ebcc9c8169a24f684d990e4157d5dc96c7018c5505462054a986b49d50b194333164eb7ca8ac97ac228e270d4d9ba4933dac3a02e025c7f3b324c40aa9ebc6a0d896f020f044466432789de2623b144ff5134c092688f7831c1eb3ed0e7e5974858f27976a9e9bd14ec086931b7893653ec32f295904d36232ed5a4282087e5fdb135deafe93f30ea40302b60bea3deacceb4199ee31d30f087ba7b4ae0bde2bb98f450d9e50aae5917b6a2202df9ea36cc264ad2afb23b1bec0407db7f5bc351a47a97d5fd687215630c184ab5a859e6560b325c3ff2603aaa3dab2138549e709877f5cbc4aaf4bc1eb3ace2d64558d2394ee4c45802244cddb033b91c5f041b81db174ff953cf50d0b61d530d71d28074726bf3d2880590a6819c3f0193712782676c60e5fda169a383e5ad7780da5dc4faee05eb61f881d1c449ed02d8a1e442841e62ccb6343ee2606e0aaaf5f6a7146022c27484db6b54f1e5c46974e9533f328ed9cec361c64f285e007fd8918df18d07cc7cfcb9e02e562aa3ff1f8449c638b42345b166b95c9611babe984e97e350310c54815295bf053c171af6e08ae1acf87106d5c5755b3fd0510853e55feecf77c5e1501e1329486b50920df174100eb8efb7b25a8154ab89c68a2df1661529f019eb9f1db0d177361cbc478bb999dd52ca3b2671a2115ba301c0d3877a9198586b7218ca10aab59cab01a6b018a6e1b9f061f5ed0c64b9386dd7c4eec741a945a799e3a33612740226d4f9be57ab4ae37025be6bc45b36dc8fbf6a4bac495f81acabfd27627076a00612860b0a49e360291f1902c0bf3422a10145c43e1f2321ff65ba99804f54bb9d21418b4ef0726fad5f0e031490a3e2249d242e7a078054396204321c87fdfa41fd5a09f81b5cd74dbb4fe7ab37233b21beba3e93c395462ba2718b1a68e8e440018b89fb17ebe6ce97f44b0a6eea14f96f8df64b0d8f59ef1d08c34b418c593a4cbb99e3ed6667277b07fe8cee1d133a49a428f72c78c93b39f495bf4760b5084c58608559fce807168ef8266d14eef96e07dad5d2a7cf618623ff0c84c71c576dab3cf26ffe21ed2500a817a74e4afe43b9369886ec90b8b1efd8fc67b7d4a76bed6181d8e27bad5dbd12771c382d35cd7428395fb18b00674d60ef219457332c25230f0335041cbfc216e96608d7a718fc2b1cec9691555181e4f4abc76b6d8ef57c20327e2a37d106c3508fdbc209a7a2b8457e5dc94395a0cf51c56ddf4174cca5c2b6f5d74de53f5ea93297c45297c090b1f774cad8f6291a14a050cdbb93816220d598e59fc6a295aaa466f3aa260712648a208d311321bde058478df01bef867d99bab8f133d22393b7173245c9687aa2f26e13a9297a76c69932742f7819c698ff575a0c3c6cc59334e439f5f8bfaae90ab846f33c4493307376185e49f2bf74900907076a0f70ee43f7b44f8257af507d43817db0f406695347d2623d6f0a090c7018d0733c5a2458a093103ec7e25acf2aa918722be9e557f2b486fd2c5d411ffcdfe05ab05a3c539f85d2e1710949debe67d5c011ddc8dc4064ae16f157c445dc76bafa952b21aee1142fb18d44a864b95832aa87648f1bdc627cadfcdc5af63f3cf9c03040f546c11131bcbbf70ed2ced198d0fa5a0443f14044fafbe63e6893a3d8ad9802780ceca3f627dd32c2445fbe0e5c93f65c53131cac70527aee5c91378ea7f1adfd15843a33b5120a5ce05923186b0ac7f851280ec5fc71f9d747c64a11c697950c7101e153b167a06d7930178d084a6015d82e05e0a009bf7d357cec69a2a08a1176bd5f28246021ec47cf7f7bd5666ca9f282501c858c3a6946de0edb1b430e3470729dd3f08634bbc471d7b5ccfda396d2d0b459707b842738af8545c93c3eecf81764c1cf8fc345e21f1d9b5a324091dddfa75eaf8e68cc31daa8cd6a2459b871249da46946b8eb6b36cf400942c25170bb99e2932a40f88905169b842ed93975912eecdc375aa730e6adb3e0a31a16649b5bd41760938a2de8ef71a2e06e328e87f02ac948bad6fae05c69f2fb3a8d4b6e8b229b31c34ef1a3452e38913e55fd76ce0ae1c912b5c9a10ad4fb8c9e9fb85bbadcd97194c0f59e6b91e4ab9ddc2089c88617a6ea97c96986d0388ac2daef6e33e86366adaeb614ac40fdce583eb5e6524d9885a4becbee8d83be3fdeb8a1d28e07d8a233debb6415f51ebe646ff2f462a175322a8a7d3ec1b167a7995b315454a566ad64eeb08af77f4a3ad4677aa5dca138c910723416c97aadc8311e1919022da4539f40fb9817a1bb7d019f205c882c090212cca98bfd1a1853b4305a0f98a739ecddd337d81a430224ebbda016965e57703a4bf3a92fbb42de71266b529cdc0b9b1a076ad0f2e7fe65bc272882b0b425bea89eebb5a82ea638151c470537f2741c550004c221de09faee14617773782e9de5bfd30facafd18f26016570f3685352237728ba4b9bd55eca3eff818f6fc244c9c9d461274b3ddd0d178a7fac47f12fe224c98de6e9bcf980d8e4c2234da4e27670f764307b7d801368235f46693756480ae483eb3a20bccb8ab97b3f16b923c2eb495fc0508073fce27d4c740493b89492fcda10e06494be9b1d12a5e73466ebb7e50977b2ed4509fd6da743bbb670cd638cbb072cbf3aa433a0eda2bf53d48c09b9bac06fba27e57ac41118e899286e33159ec6e63761d681a563e1b7e84fc9383409eb56cc05153da7dd15f2a8f9e8d3c3eabd84d468ab267948d1c526b14e030a6c2e8b4a6f95346d49b45f1bce5d290c5e5501ee81d238d14ffe486232f06b37b41cc62ce36983b2f776deaeed67ed880edeb14188dc3b6e6bcaa9894226659804c126717e7726c06c7751da4728e36363a994a4630b9633e9d1ad89c48c8034c667cf365762c09b4901b232d28785c6b530aeaa315b0971962d6ca3ad2384c09f85eab4883491276a16a38992b3bc9bebfd2d3e86",
    "transactionHash": "94638182778c0fd1c31352fa074c7be7e00dd5ccfd323d9a08652fafe36f74a4",
    "signerAddr": "Q0105005475198feb2456a80b2ea6c40cc40d698361031c3de52f7c1f9dcdc2aab8e712c02adb67",
    "transfer": {
      "addrsTo": [
        "Q0103007f44eb8e11de8a0a6d69c21088245951bdb77637a082b713abbf9bdf35f13ac2c8d58d55",
        "Q0105005475198feb2456a80b2ea6c40cc40d698361031c3de52f7c1f9dcdc2aab8e712c02adb67"
      ],
      "amounts": [
        "2000",
        "100000"
      ]
    }
  }
}
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

| Field | Type |  Details | 
| :--: | :---: |  :--- |
| `address` | string |  Provide QRL address in $Q$ Hex format to send transaction from |
| `addresses_to` | uint64 |  Recipient QRL addresses array  |
| `amounts` | uint64 |  Amount for each address in an array |
| `fee` | string |  Fee to pay for transaction |
| `signer_address` | string |  Address that is signing and sending the transaction |
| `ots_index` | UInt64 |  One Time Signature Index to be used to sign the transaction. |


</TabItem>
</Tabs>
<br />

---

### RelayTransferTxnBySlave

Relay a transfer transaction using a slave address contained in the local wallet.

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="RelayTransferTxnBySlave"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

This function will use a previously created address with slaves. This function will send funds from the master QRL address using the slave address to send.

:::note
OTS Key use for slave addresses is automatically tracked using this system. 
:::



<Tabs
  groupId="RelayTransferTxnBySlave-usage"
  defaultValue="method"
  values={[
    {label: 'RelayTransferTxnBySlave', value: 'method'},
    {label: 'RelayTransferTxnBySlaveReq', value: 'request'},
    {label: 'RelayTransferTxnBySlaveResp', value: 'response'},
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
| `master_address` | String | YES | Master QRL Slave address to send the transaction from. Must exist under one of the addresses in the local wallet created with the `AddNewAddressWithSlaves` method |


:::note
This will increment through the OTS keys contained in the slaves found under the address. 
:::

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
    groupId="RelayTransferTxnBySlave-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
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

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_relaytransfertxnbyslave_req = qrlwallet_pb2.RelayTransferTxnBySlaveReq(addresses_to=["Q0103007f44eb8e11de8a0a6d69c21088245951bdb77637a082b713abbf9bdf35f13ac2c8d58d55"],
                        amounts=[1],
                        fee=1,
                        master_address="Q01050088236f34080ba9df5b2cb2a32a5aaed4118538d8e4d6ce5d3ae80575184c4d3d80a7449e")
get_relaytransfertxnbyslave_resp = peer_stub.RelayTransferTxnBySlave( get_relaytransfertxnbyslave_req, timeout=10 )
print(get_relaytransfertxnbyslave_resp)
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

The `master_address` is either not found in the `/home/$USER/.qrl/walletd.json` file or it is invalid.

```json title="QRL address_to is invalid or not found"
{"code":1,"error":"('Signer Address Not Found ', 'Q010300133082645e43fa1cc0aa1e00f269c2aa8ec76cce87175b7e4099723913d50f7d87e9187')"}
```

</TabItem>
</Tabs>

#### Required Data

| Field | Type |  Details | 
| :--: | :---: |  :--- |
| `addresses_to` | String | Array of receiver&#39;s addresses |
| `amounts` | UInt64 | Array of amounts in Shor to be received by receiver. This array index is related directly to the `addresses_to` field |
| `fee` | UInt64 | Transaction Fee in Shor |
| `master_address` | String | This is the Slave address to send the transaction from, must be a slave owned by the address you intend to send from.  |

</TabItem>
</Tabs>
<br />

---


### RelayMessageTxn

Send up to 80 bytes of message data onto the chain.

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="RelayMessageTxn"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Send message data onto the chain. Allows up to 80 Bytes of data to be sent onto the QRL blockchain.

:::info Message Encoding
For more information on the QRL Message Encoding please see the [Message documentation](/use/tools/messages/overview)
:::

<Tabs
  groupId="RelayMessageTxn-usage"
  defaultValue="method"
  values={[
    {label: 'RelayMessageTxn', value: 'method'},
    {label: 'RelayMessageTxnReq', value: 'request'},
    {label: 'RelayMessageTxnResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
  rpc RelayMessageTxn(RelayMessageTxnReq) returns (RelayTxnResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message RelayMessageTxnReq {
    string message = 1;
    uint64 fee = 2;
    string master_address = 3;
    string signer_address = 4;
    uint64 ots_index = 5;
}
```


| Field | Type | Required | Details | 
| :--: | :---: | :--: | :--- |
| `message` | string  | YES | Message data in a string format. Can be up to $80$ bytes |
| `fee` | UInt64 | YES | Transaction Fee in Shor |
| `master_address` | String | NO | This is an optional field for slave address, only need to be filled if the transaction is sent from a slave address.  |
| `signer_address` | string  | YES | QRL Address to send message transaction from |
| `ots_index` | uint64  | YES | Details |


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
| `tx` | [PlainTransaction OBJECT](#plaintransaction) | Return the transaction that has been relayed to the network. <dl><dt>PlainTransaction Object contains:</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}>signer_addr</dd>  <dd style={{ display:'list-item' }}> <dt>Message</dt><dd style={{ display:'list-item' }}>message_hash</dd> </dd>   </dl> |

:::note 
Please refer to the [PlainTransaction](#plaintransaction) `Message` content for more details.
:::


  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="RelayMessageTxn-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"message": "hey", 
                      "fee": 0, 
                      "signer_address": "Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b46", 
                      "ots_index": 1}' \
                      localhost:19010 \
                      qrl.WalletAPI.RelayMessageTxn
```

</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_relaymessagetxn_req = qrlwallet_pb2.RelayMessageTxnReq(addresses_to=["Q0103007f44eb8e11de8a0a6d69c21088245951bdb77637a082b713abbf9bdf35f13ac2c8d58d55"],
                        amounts=[1],
                        fee=1,
                        master_address="Q01050088236f34080ba9df5b2cb2a32a5aaed4118538d8e4d6ce5d3ae80575184c4d3d80a7449e")
get_relaymessagetxn_resp = peer_stub.RelayMessageTxn( get_relaymessagetxn_req, timeout=10 )
print(get_relaymessagetxn_resp)
```

</TabItem>
<TabItem value="resp" label="Response" default>

```json
{ 
  "tx": {
    "publicKey": "000300fb954380c1f76a516d365bace3d68f80e48c9c9d454cbb8e595f113cac4f9eba66c424f91ec2fe3c6927ede984c33c5b8e0eecb2ac5ec67db5e9957b2654e4ad",
    "signature": "0000000117b3aa1f51fb31c55a35b9424f7abc65a12c5307798e199bfa6e96e196df4209a8c09c6b9b7c670e0bf8a6f5584946070bd545be1a05da0aa212a3dd1f25e4070042980e6b3c10764c7694f59314a670a48bbbb25c758e12fad0f31cb8244af9cef8b5a6b7e708c25205fa35aed72ab7e3540fdb3ba300fcd37edb87b882927279dab8881f5cc2f1f1b521ceff83d74187599a855eb564b19906a4cf3c4cfad1bdeb3a1a6b5ebd6cd83aed864cee0930390742607d6f18c3e43b7d57786793c0cc29e772f50a7bc3efd6bcc00906c11b91b45efb834d8f58258d86688d14f91406596fb969ffc1137273e0baf5f9a6abde01540eaf938d7ff5ce381682e9f1c7d15c9ea31b9db593d1d2a42a3a819a210e226e80fc1004137ceee6e81925434e0c510a4372e222c4e7b2234704ebce7fb8bb25a41f7ae94915c451e85c2e4144b84b92efbeab4a44f740f66244b7284adbd917ae69f2c3cf8316c0e0338aaf823d84f2e403579196973495d04787197faf3d2424de09fe2b25795829fa83bbb36b4c5cead70641b795d733a2e6f8e6e733466523667f89e79a9b1f475634e8996c937b8aa83389dad17cc6af84af27f7afa59303a145c1098dbc60545d08774cf58315a808a4e661e0aed00c896ee1273f4e012abb72a1e2dc91935eacc220794ef82e404d2b70b228b52155f75455db44380c79993bac905260a8089ed27f68f9389d0b7afdad02c17fa012eb0b43f15c5a18535bff495cd3266a2a88eef71c903a919b00f23ec02c7528ec433e9591113fb665f17ebb77cb85fd30913b8112b71d02c3110832038d70ac18560d4965559f4d86d135e4c02531b0dcf8d01de263ac0bdc14af300cf0ad3cb9e0100d636058dbb9ee636edf89877be87621a7a3118d3263596ee5547289c1bcbfe3f8b687958303ac49ad2f3cc456eaaaa029e5ed78712c0e7481e3228b596c3f97600c38792f054a5c0b73881a878416c7903b1f64dd98443e300a629eec0e977d689e5a9bd413814be01d497fb648ec788daef6d390c44053b626ec0026bb7c0f1a4f77a73ccbc71a83d96c482e1071fe8c833486651b48552a92397771dbe709c47d6323a757fba53d8fea82a68d47d0b48e57ca2dc122ea82d50a51a816cbb59b9a9de81b4393bd17b336db1431bd0bb75bb943847886087682414597b206dcdd63e37ea877ab1c1ee834702086fd34feb684841119c853fcfb2089f040c2baff6ac98c8a61fbb0e1e176834e0a1699249e93c05a0668ccff3383952445d2115278fef2ad3b16d8ca277221b54e850cc812722eb060f54746922f8b9aca94ec5874d50ef6ca4bc73da11f9526a337c98c725548f2a59b38eee7cec9bcad0d8b716cfbf71f7adcdcb06eea25cc2aac1b715c40b10b709d52b995fd185ad10eed308e282e4c695ddfcb0a9405b09dcfe53d900da993f9f7b6d0ece980917a57475e232ec6e32f6bbff877f89c9b76850429caebd32c47949b823c047d217b43a922561bc2b85b9cc2eb735408f0010e5c03394c02bd2bab06f8f603a5d3647b4a53f5203bc6677b3150d238a49e0271c3b45141900c848965d96852dc8a2fd739289069c130ee2c4a50e69fa34b9fa33f68fd3e62646897d78f94c5edfe90316881a233952e4f8c1cdb9ae93217169da76101bc7eb1db6984dd4a05d49338dd05608b756d9784236011902e4fe4a1bf6085c17e9d7d8edde0fcaaa9d9a841f8fd699a869387d163a5a6535146db090e02d43a0b8de93e3f917f170ed58b95d165183bd1ae428159dcf8d8ef6e0cfb441fcf20bc33410d57fca34f244f772e11694074072f073e1769e96b09502dc9dfb86a8725621af30a23a17402d4b34d10b23aaa7eb367f64b8d447691aeaa2af4dc1c37aad53df1db1a7c9ad7f52b7e4520a432b4fe56bfb2344be569ef21747004054bb69446a08136cd269ffaa3e8b48c999672e562e96a4dac68f70c5c005f1d288617bfdc9af685cc06e81b6017bb2e3910da8d5c0837e65255a84d8cf0b3fe43dad2e579c2896acbda5beb87186e124e3d257c4f5add59872bf8fa314e1b4e803225bb4f71ac9f0bf5bd3fe1fbe51df7dcb7c947cae9b378e5c01586014ae1d6ca49a486b540dd5570e3f8bfdbbc7fe19add6cfa45f68774968cf494cb86f7ab6c88bdd93738a75e8f11912bb56c824d57140309e4895fd8aa34f1453fe6364d5762155e2c91650722497ed57162b2e1e492ce6942c6f0442c8e8cb5c0c81ddf771f330bfc164e2cfa70a7315c9a934f0af6de53348dadedc8baa45c082e6e3af5c0043c4657f55127e5fe220f7403133e007eee0d0cf56a60a33e7ceddbe04e84a909f10b0652c94b9a553bd2d69cae2f722a569c52fa218b9a98cfc4d4a183aa71ef970002fbbf910e024fb6fcc6b972e11553d6fc458235f13f4e6c30c5eba420277d57a9c7f73a658c0736f20db56f516a604d3ee300d9ac10f3aa346b82452afa214cf1fcee79a11196be96398a72641b391126143e4ae288e098771d16bd07902ac35c8602d5b16b5ee9347d31cb9ca9fd9f6d667ab2f544734d66aa06804afe72a6c3048fd6a6b92e4302e2baf782b1b20607151683d2845930cbe58b7eca47a1ba47bbdb66d01779ca9dce6a3b50b93334b2473706de1bdc630a4a91f2e34b2f05a8f7372cd271bfc15bafa1f3896a10619855b3454cb944d1441bc08fd61d4484c84c21573796cf6cf6e383336469ea9f2da01f640a9f6c3b34f4a60ad5f2ea7f44310ab271e6bc53c86246b8cd8220714df25b69b68c0f569fe99f16fd0c7649d64d5034e10e57b5c8fe42e4f12be98fe7696a8ed23fafd73faf227e4c6a364459774b62fe02a7e517f63755b6ebfa78af19a1ac421eb5d258fe7c86d494f6019f69ad0b1471ae5950a7611b458ad4cacaa0f5511f60d8870c651c957ceb32775041f467a635a9abfa93e16ba794f35ff27329ec2d87d1147431064f9e3291570e25cba1652a8437f8d255eec41e398de4153ddd4d972fdc03a20f65d998d24e5deed0b907adc467465532c59262fb651b7306a4261eccf0499eb65f30c82a3cc394183eae8fd747f2f58365f8fed9c77092fe18a7d66cc73d33c89c9ead6fd96af6b1830ff5c50d10e146255f42ffb063a7221a13ee1e2359e30d0773d22df47bba952efbddd2d82a2ee17b2b76b451195360212670f7b5d5ee4bb487e8803922b24d1c0aedc282977a243beecb1605fc214d259735d44a3b23df3656e54e4814f6648aba189b805be9e4b2f425bfe43f2392430481b814689417e047b5e774426effe0dfc2a203c88da2e41cc199d1efc316a223e4aa2d676f804a",
    "transactionHash": "f2112544c44fef42ba3ecdca9a38f45c914b6dd97986781f343b7f216a7040c4",
    "signerAddr": "Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b46",
    "message": {
      "messageHash": "686579"
    }
  }
}
```
</TabItem>
<TabItem value="err" label="Error" default>

#### OTS Key Reuse Error

triggered when the QRL `walletd` detects an attempted OTS key reuse. This should not be relied on and a separate method of tracking OTS keys used. 

```json {title="OTS Key Reuse"}
{
  "code": 1,
  "error": "cannot rewind"
}
```

#### Message Length Exceeds 80 Bytes

There is no error detection for this error, and while the transaction may seem to succeed on the CLI, the node will not transmit the message with an error on the node 

```bash
WARNING : Message length cannot be more than 80
2023-07-26 12:15:39,309|4.0.2 python|synced  |MainThread | WARNING : Found message length 241
```

This error will be shown on the QRL Node log and local output.


#### Address Not Found or Incorrect

This error will trigger when the address is not found in the local `~/.qrl/wallet.json` file or the address is not valid as entered.

```json {title="Address not found or Invalid"}
{
  "code": 1,
  "error": "('Signer Address Not Found ', 'Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b26')"
}
```

#### Fee Exceeds Available Funds

If the address does not contain enough funds to send the transaction an error will be shown on the node log similar to below:

```json {title="Fee Exceeds Available Funds"}
2023-07-26 12:22:10,669|4.0.2 python|synced  |MainThread | INFO : balance: 0, amount: 10000000000
```

:::note 
This error will not show up in the CLI, and will only display any issue in the node logs. The CLI will display a successful transaction however the explorer and chain will never see it as the node rejected the transaction.
:::

This indicates that we attempted to send with the fee in shor of $10.000000000$ or $10.000000000$ QRL when the address contained $0$ shor.

</TabItem>
</Tabs>

#### Optional Data 

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `master_address` |  N/A | Only needed if the transaction is using a slave address to sign |

</TabItem>
</Tabs>
<br />

---

### RelayMessageTxnBySlave

Send up to 80 bytes of message data onto the chain using a slave address.

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="RelayMessageTxnBySlave"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Send message data onto the chain. Allows up to 80 Bytes of data to be sent onto the QRL blockchain using a slave address.

:::info Message Encoding
For more information on the QRL Message Encoding please see the [Message documentation](build/messages)
:::


<Tabs
  groupId="RelayMessageTxnBySlave-usage"
  defaultValue="method"
  values={[
    {label: 'RelayMessageTxnBySlave', value: 'method'},
    {label: 'RelayMessageTxnBySlaveReq', value: 'request'},
    {label: 'RelayMessageTxnBySlaveResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc RelayMessageTxnBySlave(RelayMessageTxnBySlaveReq) returns (RelayTxnResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message RelayMessageTxnBySlaveReq {
    string message = 1;
    uint64 fee = 2;
    string master_address = 3;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `message` | string | YES | Message data in a string format. Can be up to $80$ bytes |
| `fee` | UInt64 | YES | Transaction Fee in Shor |
| `master_address` | string | YES | Master QRL Slave address to send the message from. Must exist under one of the addresses in the local wallet created with the `AddNewAddressWithSlaves` method |


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
| `tx` | [PlainTransaction OBJECT](#plaintransaction) | Return the transaction that has been relayed to the network. <dl><dt>PlainTransaction Object contains:</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}>signer_addr</dd>  <dd style={{ display:'list-item' }}> <dt>Message</dt><dd style={{ display:'list-item' }}>message_hash</dd> </dd>   </dl> |

:::note 
Please refer to the [PlainTransaction](#plaintransaction) `Message` content for more details.
:::

  </TabItem>
</Tabs>

</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="RelayMessageTxnBySlave-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"message": "hey again", 
                      "fee": 0, 
                      "master_address": "Q010500ef0460016e66288852307d127add2763e7e9b0a4f4adf71ffa9f0d9e07ac34b586d93437"}' \
                      localhost:19010 \
                      qrl.WalletAPI.RelayMessageTxnBySlave
```


</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_relaymessagetxnbyslave_req = qrlwallet_pb2.RelayMessageTxnBySlaveReq(addresses_to=["Q0103007f44eb8e11de8a0a6d69c21088245951bdb77637a082b713abbf9bdf35f13ac2c8d58d55"],
                        amounts=[1],
                        fee=1,
                        master_address="Q01050088236f34080ba9df5b2cb2a32a5aaed4118538d8e4d6ce5d3ae80575184c4d3d80a7449e")
get_relaymessagetxnbyslave_resp = peer_stub.RelayMessageTxnBySlave( get_relaymessagetxnbyslave_req, timeout=10 )
print(get_relaymessagetxnbyslave_resp)
```

</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  "tx": {
    "masterAddr": "Q010500ef0460016e66288852307d127add2763e7e9b0a4f4adf71ffa9f0d9e07ac34b586d93437",
    "publicKey": "010500983a4553922addd3eb28b521dc01e861a272f227cf3f2a512caf96b3d3060cb1e71bfca2aa151b75a3f982cc8fd262a6afa3f991406e28df2b5fed85148ba93f",
    "signature": "000000002e66790f9236796a9b2893db57fbf2a18d0362b507915a6ace17cbd37e2f8d2bc96385330d6111cf583dc3869909c9e91d962de3effd9774ab6b131d714249d7e9333c4de34086336150c3f2b9427aa14fff9e62d01f98be5c1a08a0d764237e9670d817a6e7ef31f8828b697c68cb3655e29dbe8542f51e5d2f2b2a5b5fa704f008d81da4fa2908621edbfea23d2b2f4a3d30dddb912378c8b180a97d7398dd1fd4cc71030e48a86c2d5d2f14f7c3ebb4446af2ee4bfdc620d0dc938c7b7a00567db58f18200ae45b0bfac8a0b2754e41022ec8af093af156f0b765517c633659d6ad9587f846eac649b1049f6a3b113c156b5385dfdb5c874445e6bf66acc62bb41408e8aac42e54bf88dc34a9bdf99a4e879dbfe9585f680af1f9d78555d4a67721be6ce0f7da39157f966642c60eeb73b26a8f3deef247a8f746bfbfccb6d46ee21f5d56f1adb5672b5d471854a638530e188113608068a69c8b4e7cb10dc865f65e6ccd95d849ff1f2d4d4b333a9dae6d14023e307bd60ee9c486f3e11a0be41b19a31dc325c6f332d4d931f429d2bdfb4a261e6dd5c23cb23b20845c35e66d311ee0d9fc5c1b654a85c4cb4c5ab05b52411acfa4aeac9836df5763b2cc2dbe5c4645d4af52a7eeb8d9505c53a86042d7570076da3c76478f45615a614eef579db6ea44e40a76c31ff35960c07c481f951195a6830bfa3e226bded158afed000ed8b691a692fd80dc44fa77d4d784ccd444b144d3dfa9cfa7bce7384e9966492cc89a0082c00963fb48a80807154b9a02a36c16dad09d8487c563437614e92173a9a865aef264d6354dee0e06693f8023a5739d4efbc2c1f630f61444fec8841786a10226e31f136165c797e3fb6392a8632cc5e58d52c44bc3a8083eb735a63eba32e0a8272a722c1102c8ff91824b5935c847e857411eece2e720062271b47242a18ca9ec6df8bcbab0d390837dcad21f3bc4a965f78f5f2d2db524590ae08575093c86d2ac7d3b2cc8b1965aefdecbc83128ea8902c01a744544d0c2056ea5e1d2fd7bfb7cf9d758bb9bf04d99714e5cfa0a5a9885a3f2dc853391b203f402046985d238078a94193ec4e6ca88497dd0c2ee19d0d688d16f1d5543be9eea846ce361c8757cc4c19faaf368c998538324f6fc2687baf9d972ebea408799f11c6bdbd54d759a3a7a063908967cd44b5601c2367ece76bbd5d0d29a6d35bd1132dcb8444df410421d5d3f476cb4b25cc6951db542c173089041548dc6f22c448756d90ad7ca08e89f9255d0b90dac4aa149f4237df04aa9dea641ef9f888339eb1f9ca4df4b2ccb483c587b7bcd09a5ac0772738e2cca7c3bb7e82e9b134131951428a322de8c1e2edb33d5a20a9b746032fdba0967bbbe78e8b972f2f930142c3a5ae8b33b44124df8aeb0811b16fb1496c92f715af212a260724c47d51acf7f1b8520243466ee0d5d40d302553136bc66079266b932d27b003d461f82744042f5c56b8fc64c5ba2b6b4438f2cf18e386e44941862a8269b81c4c7dd8d4c738486ea423d0d5de79ae59f44fe877c9c91f68035f2202c41c1fee3abe07c77fb6fd49ed63b0e1b43e40f5da24a307f2ac3f63c43050d6e7e922f55e401fc8b283aaaa6f350979f8d42ac0169849ce9e25eaad3b0bbbb3599bc4fbf9a32aeedb15d9ba7432bf73189fd0053381ea884d710a4642a11d6aa9dbf67dcb83e1ce4a8e1cb42eeb664ce1770657485e15918188f84ad5c0c4e6897239bcb5fd78b3d3ef3aa001b2d3372f0bd6a6548207e3dad097a359e03f25e45101ff2e3e95b4c5ef67c432a26a2d2c46c6bfe575e5b7c4b79166308bb56161bbbc92b4fb879bc18d85b6281d46d54dff315327881bfb3b98f057fc43e2f5f955b73db7e2008cbf90e3dfbcacec6606713d3c3b500cb674d91ac19e96f72aa732f8c9b031f766fa7f330a81cf0267a1250910610d0efa587a6812446405b33c3d5a3ab906565980f01d6b609976db01c022cff641d6dacc0ba24c1ad4cb09042ab3320f1e0c8db1d47ef23fa54b787d482ae04d576ff265d79ecdba10d81610510164c12aa9246a5933378d03d5be114adf34a308ec1ea2989b81b39c969a84456f900e16014114497166a237766efa9d0144cd95595acd42bff5e4bf52800004f2460a0c034da9c86975973a5b18671e71d887ba53d5c71cfbddfe3e6ab04762a9e3079945c2b37910b95cd21a2a00d659ead23d82551b486fca8fb3c38c46b413729ddc3baddae665771d8a623a9b68d519267f02a62947585b34e5adc5f18db94cd2e3a50393e66190a21360227d34cb73bd0ce384402a503544ae66aee04a39ad0efbe60997b6bb91174f6e7603046457e0e7bba044171eaa35e5960df92c11376f16055015f84500e57936f5fba96e617ff5baf4a9499df06c87d9b781e8b1cbb59db1c1ac354e950148fbe40257bde8c63e5f080d3755c2b0f4e6f97dbfe277e7c45d1b5980a133339e5f225da4cfa884003192753841113cb8549bc1206928ad3586b1c6bac60a23292a4c90fc64d0f31fc26705614f01d4ea70e419675f449a8ee063f28a27e574ebe00885d86a78c856fb0728c78035bc37b9c67c82dab6f0d7904a63b9f1ffd02be09e1b6958c8aa9d32dcfaafa20d169c8aad6b83ad102092d209947bc41489a9167c2df71974bb89456f16e7893b5cff43c4adc817446ad3c46a07955b915ef0c1d348f04d40b1bc0c272bddc9e5da8d355168e83ae708fec58ecdd22e9399b4f15b33b4b581d0470da90836a0ca5269ae76196c60e3757096c2f92cbda1854e55a9f2175141c0dadfa83dc2350948be5e2104ba4f083255e8b0e01c0238bdd3f378eb5baf4e3d76d5fab6c7bcee5c65b600efca5390325a0304ed4f7c3bf521b937f377dde1a9f8bb8cafa959c29a1c61ab32b54e2e5a5c6c35095da06bf4f6fe211419a9ce874057ba5be7f2c5d62e401355d59f4cd5e1aa39f71a6683b9ef8e1e01f92d5bce057ff84dadb32361119799aa22c038617223567408c51a05a3a647aa7d401dd4e3cdc2c23b6f75b1aae47f1539e5faaf60b14a367892990685ec20663fdb85a5e0624a86e5d1ba1ae6f339247aa7a046129313a91bc1ff855e21b4486642ce4fc4d4cf07553ffc97259e55e184e856052949be31c02ff9d7c16288a29ed5fcd4dace3fab8aeb1838d973499fc4f3dcdcba47cd9384df16016db6ac90492ea2a3fb9514e794b933996a54bc317975973d8bc817cdc34adb2486fcea17dced5fd9b51c58767a8384bcf708eed9585d438a39420b21d4df66865669c806fbf7fbac4995d026009c6071d2395cd72fb1e7fcc88c532e9492269951a0917c09aa9a81ac0bef3586699b6850de57bc282b9f558e64586154310fbcbfebbcc6c753e07f8b00754c94726b429fbef7946766a79ddc00c93a42215a48bddc4ccb79f8ca14014de98a77ef1de319d409b99215c8d6e440165cd5e360ce084ffddb6c9a9616c3f62e1d04ed2aed4ef4205488c4b40d691d3",
    "transactionHash": "c4b8ee6614acabe4c8f3d95e22531aa18b0a233a38ea58719ffa85711b3952d3",
    "signerAddr": "Q01050088236f34080ba9df5b2cb2a32a5aaed4118538d8e4d6ce5d3ae80575184c4d3d80a7449e",
    "message": {
      "messageHash": "68657920616761696e"
    }
  }
}
```
</TabItem>
<TabItem value="err" label="Error" default>


#### Message Length Exceeds 80 Bytes

There is no error detection for this error, and while the transaction may seem to succeed on the CLI, the node will not transmit the message with an error on the node 

```bash
WARNING : Message length cannot be more than 80
2023-07-26 12:15:39,309|4.0.2 python|synced  |MainThread | WARNING : Found message length 241
```

This error will be shown on the QRL Node log and local output.


#### Address Not Found or Incorrect

This error will trigger when the address is not found in the local `~/.qrl/wallet.json` file or the address is not valid as entered.

```json {title="Address not found or Invalid"}
{
  "code": 1,
  "error": "('Signer Address Not Found ', 'Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b26')"
}
```

#### Fee Exceeds Available Funds

If the address does not contain enough funds to send the transaction an error will be shown on the node log similar to below:

```json {title="Fee Exceeds Available Funds"}
2023-07-26 12:22:10,669|4.0.2 python|synced  |MainThread | INFO : balance: 0, amount: 10000000000
```

:::note 
This error will not show up in the CLI, and will only display any issue in the node logs. The CLI will display a successful transaction however the explorer and chain will never see it as the node rejected the transaction.
:::

This indicates that we attempted to send with the fee in shor of $10.000000000$ or $10.000000000$ QRL when the address contained $0$ shor.

</TabItem>
</Tabs>

</TabItem>
</Tabs>
<br />

---


### RelayTokenTxn


Create colored token on the QRL Blockchain.

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="RelayTokenTxn"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

QRL Tokens can be created on the QRL blockchain using this method.

These tokens can be initially owned by up to 100 addresses and have a variety of values that may be defined.


:::info
Tokens can be transferred between addresses however the initial details cannot be changed after the initial creation.
:::

<Tabs
  groupId="RelayTokenTxn-usage"
  defaultValue="method"
  values={[
    {label: 'RelayTokenTxn', value: 'method'},
    {label: 'RelayTokenTxnReq', value: 'request'},
    {label: 'RelayTokenTxnResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI
{
    rpc RelayTokenTxn(RelayTokenTxnReq) returns (RelayTxnResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
  message RelayTokenTxnReq {
    string symbol = 1;
    string name = 2;
    string owner = 3;
    uint64 decimals = 4;
    repeated string addresses = 5;
    repeated uint64 amounts = 6;
    uint64 fee = 7;
    string master_address = 8;
    string signer_address = 9;
    uint64 ots_index = 10;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `symbol` | string | YES | User defined Token symbol, max length $10$ $bytes$ |
| `name` | string | YES | User defined Token name, max length $30$ $bytes$ |
| `owner` | string | YES | Address shown to be the owner of the token, different from the initial token holding addresses |
| `decimals` | uint64 | YES | Amount of decimals supported for the token, max $9$ or $(10 ** 9)$|
| `addresses` | String | YES | Array of initial token receiver's addresses limited to 100 QRL addresses |
| `amounts` | repeated uint64 | YES | Amount of tokens each address will initially hold. Total token supply is a sum of these values |
| `fee` | uint64 | YES | Initial token creation transaction fee |
| `master_address` | String | NO | This is an optional field for slave address, only need to be filled if the transaction is sent from a slave address.  |
| `signer_address` | string | YES | QRL address that is creating the token, may differ from the `owner` and `addresses` previously defined |
| `ots_index` | uint64 | NO | This function will auto increment the OTS key from the last used. Otherwise a specific OTS Key can be used for this token transaction |

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
| `tx` | [PlainTransaction OBJECT](#plaintransaction) | Return the transaction that has been relayed to the network. <dl><dt>PlainTransaction Object contains:</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}>signer_addr</dd>  <dd style={{ display:'list-item' }}> <dt>Token</dt><dd style={{ display:'list-item' }}>symbol</dd><dd style={{ display:'list-item' }}>name</dd><dd style={{ display:'list-item' }}>owner</dd><dd style={{ display:'list-item' }}>decimals</dd><dd style={{ display:'list-item' }}> <dt>repeated PlanAddressAmount</dt> <dd style={{ display:'list-item' }}>address</dd><dd style={{ display:'list-item' }}>amount</dd></dd> <dd style={{ display:'list-item' }}>initial_balances</dd> </dd>   </dl> |


:::note 
Please refer to the [PlainTransaction](#plaintransaction) `Token` and [PlanAddressAmount](#planaddressamount)content for more details.
:::

  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="RelayTokenTxn-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"symbol": "TST",
                      "name": "Test",
                      "owner": "Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b46",
                      "decimals": 1,
                      "addresses": ["Q000300e2acf7cab2b722f350af276468c6657610625f4b247e40e17607df20735bce04d08d285c", "Q000300e1a3b0f1d891f2f5be6daabd6a134f95055e89f560c7c9698d516059a7df7e4c35420743"],
                      "amounts": [100, 100],
                      "fee": 0,
                      "master_address": "",
                      "signer_address": "Q000300e2acf7cab2b722f350af276468c6657610625f4b247e40e17607df20735bce04d08d285c",
                      "ots_index": 0}' \
                      localhost:19010 \
                      qrl.WalletAPI.RelayTokenTxn
```

</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_relaytokentxn_req = qrlwallet_pb2.RelayTokenTxnReq(
        symbol="TST",
        name="Test",
        owner="Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b46",
        decimals=1,
        addresses=["Q000300e2acf7cab2b722f350af276468c6657610625f4b247e40e17607df20735bce04d08d285c", "Q000300e1a3b0f1d891f2f5be6daabd6a134f95055e89f560c7c9698d516059a7df7e4c35420743"],
        amounts=[100, 100],
        fee=0,
        master_address="",
        signer_address="Q000300e2acf7cab2b722f350af276468c6657610625f4b247e40e17607df20735bce04d08d285c",
        ots_index=0)
get_relaytokentxn_resp = peer_stub.RelayTokenTxn( get_relaytokentxn_req, timeout=10 )
print(get_relaytokentxn_resp)
```


</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  "tx": {
    "publicKey": "0003001b3db18e77b427a208d5cb49134b58698fbe9e8cfc328589ee736c8a7a3aefbd3fe8288fbe728a69f3cabf9efc52f86eae6ee8024d811047fb3a35d569577658",
    "signature": "00000000c8ad53d4b6c7c082f3b70cd0c387e2516162d4bc3f2f849fcfdcdc2aecd5083283450ae08f79ad433792a1a6a411675507687aaa4b2a1b9ecb6a5a6dd564dd6dcce21e1d0d56ba3c439ea8fe9192385e660ea778ac2c660f7e638e87b282fb7634085ee1dd594ef95af5b2db41b9aedd34c548e7ff13377f96c3bc29e6549c1ad50f0b49455278d02772bfbf0466b1bd69366d19c414d5221212d6c0618cf78ba4034c1a3e0651d19c9c99e893f7a47e46beb5f80d28f372376c964b8adbdf519e67ec3b3a96339493f7e1be0e0072e1274f7426556f6579b1cb43aa8a776df398ff3f319b3af07ff75c3f47cf2a826bd0e79c59574e3611968ec0697f9a4682cf9b2e57f197ad3ffa6ccf1dd6fa68210753bbd8906a3283851cde158c698aff80733c6ec5125dddaa59fbda35e6be0694d803cd7c4ec88b3fecc2874923ab4483123645df9b1216c49c088be33ea0b82c64ccfafebef1980963dec20771a0947c0e975d5b06b735d1019b78dd9f7d473642534df9edb9746fb053e7b9f0aaca6b3454b4025445bf11e33c5ca88abd91e3594ff5018a2c8af7d7b8d1e17bee1c59b98ed425cf9b3249ee0a81686e9b2d6da821da02575c7f86dea61da04ce048e62f252aa9b0ecb88f702702c384c68d63ceeaf8a8ea5ee187f92ee90707cfd27e5cbf9d2419e4a15f64f0cfd70cb7e919949ceba7715c196c27f0caaaebed9e4499a070fa7a970b8991d3347ec88a0f62185b1ee5dd842ce606aae6a94e1a77661b0acbd3f202613b7fcb2603adcbd6a31a071d604364af2a828dedd6ac31bf667f6a06a9196011655d00b374f572fa19cfd9382f0b0bb3200a212c356cd220c404255fc13ed95503e916fd81cc157b0a84fc8438fd6389fd22f1e2a9fbb5c2ce0d3f112b5efbe9cc467b6401a97d35c25fea8e4fa7a8fd716dccf3672ef60ee821c12891ffc468f3c5c7fa7cec08197fbe6bfc1b742b1c6a8add882ed1cc3ad94d44a480194c29a6241396d61f502cbe2864760c5261ad1cdd6a1654ffa9fbf8942a1b4d713cf9a8e51ade61a41fafc647b4b529870ca6b011253774ec3c35ae08493b8d2ffc294c2aa1254e5400b4abde150630b30194d968e949a465584e3140892eb4c39e9626b7cf0bdcbaf0b8d34e7ffabef7a3b0364ebc54541a7ca626de249fdfa66b8ab982516bac8eb4ab0405994f7330e36217cc16163b2c40e766fc3c33b355468adc5992084bf476007c6ceda1af40d9d6fa796c97e0d045adf6c19a425a45e08e291631dc1f77b4f7197f17664c84a9beb5f944812f427cce01a1c9436cd1cf506d9458b2427414a16cb27fcea54a7f4b0bfdaf5284d4eab18477ce948768ab4a2ffe6c4ee3a3f05054d5c312d6b902ee8aab8d8cf289bd38bccda76270198cfb03c2f7be9753d8638c82b4bdd41eeeeb600b48e7744b0d45eb4e120ed4b316071829bc7b38900038ee4893c90ef9eb58df087c0cd8e488ae4983c9680c5d33daa4c83cdfc2b2c5636fc18d6d41af50e5bc8883477ea2dd08e4a79ba2754a09d124bcf510899bf3f96bce6f86e1fc539f96aff88863141de1a5e7f9ab4931858dcf6e9a2599ad6e7627fc46a8ab2276ecf38d038d439557d1e4116043295e2276a1e544a6cca315f4ccd070a7e88195282e50bc6d6dabaa3e06cebb2efb640a304d4c29ae77655ad421f2f7a89a6e8e0a29cba3a00a091465539946aa1f6b32939fa2f205bd543288c042e237b65a0c24497c418f542ef99f3f74c547c6861a9123918690c0791e410495f035220bdcbc2d761ad10a9cbede06222653451f5900d5c0c918b4b99ac2ed7d738aed0a1c67f5a61af123db58f2cf1aea0ebdf492c07da7c183c5c7ff01bf2ea406789b00ff62aa22542483b5458dd4146a6f77742bc10adca4c57c473386b72f525437a3f1ae900cfd638b8cd9bc80fc687cccd3a90eb6c9518619115655cd643757047125431c93ecb2fdfaa938acddd7d9fac77daf9ccd9c88a2f4423a9c4fd5764f372809fb0defabacf64acd5784c6fdd143b1e7ae21a4882e73ae540b1da6a061295770a1a06569c90736736401729cf0f9b6db6bb0ab7e8c73062633216ab6fe12a50a8f6fddb897f25cf8f66c9988cec6c3613f5db3546ae3e08e2be20a7898c87c2c76d63b47d2a2e9fe3fded94de73bd01d5d5757c14816a005c407a487f99b1ec3abd659104678be7eb9b8a1181dea5489e73adb4dffef47403f3ded0979a1cea49a464b1198bc00e7073168ee9542b0536d2d62883f614ab7a6fbd19c4477772e785a48678dea6010b6523f4a2cf3e2c6f449494af6b3d91062e3c8c5bc13d1538f3036c4d24af36438a8d823fa6d11997aeb666c3546366c0b5a1a0e26bf4f8a83b8f79aa6cbf31f8639a8226dbde60c3afd82bfefa8f37a97fe118030eba0177c4628d1d912ce1caa3f3e02da5f7854801f87ac9bd08bb8acbf0ff28a13057faa030be3f24b8b182a00760b3041a7cbf697c763eafd6075485a89e25d5e6faeefead28b5ac751bed967ff3788d6cfa9546dac404fe2e1e3616b3b80320697562145dca6c379cbe7b4e99343455247566cafa5a08095610c10149abb7d979d8407c8e12680d7456795f78521dd615b9879367ebefc1aa22722a7bc497a2eb368f9a3d0e4973cefd4537b863d7e883339e2f313c666c0ed72fba0b5dcca8e7dbcfe09cbf7980684da75a4b9195ba872b00644743845ef4c5529a909398c78dfee0cd1ba9839b956d6b33b4b0b806bd790421fc34e15853e144a2e7d12304ed420ac66929e9886d87b2ec1d7c9d57bd770042a877ed8c1cc32076154f377ab0ee2a9471ec0eedb64e5e240491e41fbaab9761b68ac047eeea5512b5aefaf003fe1192c0df1e88f40e1edd92c6dcad9323a58094ee15d4b65c6c60ff02661bf4bd91f30cad0f60fc565bee045dbf1474ebcaf7090cadb44e91c927556be162d7afd7f2e3167cf568e7fae826ad7536a3914f950011e27fb59a8dd65dc36e9243ea0151a3478621a6c7342d60956d14d4c9ec95cd394d5a0c6d934f7ecfa338765baefe4cffd950765c00f26ddf54071c8a741e8d1407c3e63a99537e5e14737d20ac56555ff4c1b7c3bb84dae69ccb83335fc5bbccf78a3ceb93aa15c79aa573f633371db1e7fc7576ca86540520c0a632c46da6a1e9e39e8eb33ba1d0e0f6058bb0a6d86802fccd3d1bedafe46c1bab5a689289ba6155fdcffa38c4ab0aea2c0b7dbda7ecf8a5be7c36ffe410432c42c4083d600d23f8e298f88ddd330371f909baa32ed3770f387959e52750339737859d1f73e3c1372189ad8324f3e04aca42b540913dc98b653",
    "transactionHash": "fac9785c8eeb3a2765e1e1b81956bd6aa75f742138a799a601f08c38bac7ec81",
    "signerAddr": "Q000300e2acf7cab2b722f350af276468c6657610625f4b247e40e17607df20735bce04d08d285c",
    "token": {
      "symbol": "TST",
      "name": "Test",
      "owner": "Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b46",
      "decimals": "1",
      "initialBalances": [
        { 
          "address": "000300e2acf7cab2b722f350af276468c6657610625f4b247e40e17607df20735bce04d08d285c",
          "amount": "100"
        },
        { 
          "address": "000300e1a3b0f1d891f2f5be6daabd6a134f95055e89f560c7c9698d516059a7df7e4c35420743",
          "amount": "100"
        }
      ]
    }
  }
}
```
</TabItem>
<TabItem value="err" label="Error" default>

#### Address Not Found or Incorrect

This error will trigger when the address is not found in the local `~/.qrl/wallet.json` file or the address is not valid as entered.

```json {title="Address not found or Invalid"}
{
  "code": 1,
  "error": "('Signer Address Not Found ', 'Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b26')"
}
```

#### Fee Exceeds Available Funds

If the address does not contain enough funds to send the transaction an error will be shown on the node log similar to below:

```json {title="Fee Exceeds Available Funds"}
2023-07-26 12:22:10,669|4.0.2 python|synced  |MainThread | INFO : balance: 0, amount: 10000000000
```

:::note 
This error will not show up in the CLI, and will only display any issue in the node logs. The CLI will display a successful transaction however the explorer and chain will never see it as the node rejected the transaction.
:::

This indicates that we attempted to send with the fee in shor of $10.000000000$ or $10.000000000$ QRL when the address contained $0$ shor.
</TabItem>
</Tabs>


</TabItem>
</Tabs>
<br />


---

### RelayTokenTxnBySlave

Create colored token on the QRL Blockchain.

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="RelayTokenTxnBySlave"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

QRL Tokens can be created on the QRL blockchain using this method will use the slave addresses associated to the local wallet address. this address must be created using the [AddNewAddressWithSlaves method](#addNewaddresswithslaves)

These tokens can be initially owned by up to 100 addresses and have a variety of values that may be defined.

:::info
Tokens can be transferred between addresses however the initial details cannot be changed after the initial creation.
:::

<Tabs
  groupId="RelayTokenTxnBySlave-usage"
  defaultValue="method"
  values={[
    {label: 'RelayTokenTxnBySlave', value: 'method'},
    {label: 'RelayTokenTxnBySlaveReq', value: 'request'},
    {label: 'RelayTokenTxnBySlaveResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc RelayTokenTxnBySlave(RelayTokenTxnBySlaveReq) returns (RelayTxnResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
  message RelayTokenTxnBySlaveReq {
    string symbol = 1;
    string name = 2;
    string owner = 3;
    uint64 decimals = 4;
    repeated string addresses = 5;
    repeated uint64 amounts = 6;
    uint64 fee = 7;
    string master_address = 8;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `symbol` | string | YES | User defined Token symbol, max length $10$ $bytes$ |
| `name` | string | YES | User defined Token name, max length $30$ $bytes$ |
| `owner` | string | YES | Address shown to be the owner of the token, different from the initial token holding addresses |
| `decimals` | uint64 | YES | Amount of decimals supported for the token, max $9$ or $(10 ** 9)$|
| `addresses` | String | YES | Array of initial token receiver's addresses limited to 100 QRL addresses |
| `amounts` | repeated uint64 | YES | Amount of tokens each address will initially hold. Total token supply is a sum of these values |
| `fee` | uint64 | YES | Initial token creation transaction fee |
| `master_address` | string | YES | QRL address with available slaves that is creating the token, may differ from the `owner` and `addresses` previously defined |


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
| `tx` | [PlainTransaction OBJECT](#plaintransaction) | Return the transaction that has been relayed to the network. <dl><dt>PlainTransaction Object contains:</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}>signer_addr</dd>  <dd style={{ display:'list-item' }}> <dt>Token</dt><dd style={{ display:'list-item' }}>symbol</dd><dd style={{ display:'list-item' }}>name</dd><dd style={{ display:'list-item' }}>owner</dd><dd style={{ display:'list-item' }}>decimals</dd><dd style={{ display:'list-item' }}> <dt>repeated PlanAddressAmount</dt> <dd style={{ display:'list-item' }}>address</dd><dd style={{ display:'list-item' }}>amount</dd></dd> <dd style={{ display:'list-item' }}>initial_balances</dd> </dd>   </dl> |


:::note 
Please refer to the [PlainTransaction](#plaintransaction) `Token` and [PlanAddressAmount](#planaddressamount)content for more details.
:::

  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="RelayTokenTxnBySlave-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"symbol": "TST",
                      "name": "Test",
                      "owner": "Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b46",
                      "decimals": 1,
                      "addresses": ["Q000300e2acf7cab2b722f350af276468c6657610625f4b247e40e17607df20735bce04d08d285c", "Q000300e1a3b0f1d891f2f5be6daabd6a134f95055e89f560c7c9698d516059a7df7e4c35420743"],
                      "amounts": [100, 100],
                      "fee": 0,
                      "master_address": "Q010500ef0460016e66288852307d127add2763e7e9b0a4f4adf71ffa9f0d9e07ac34b586d93437"}' \
                      localhost:19010 \
                      qrl.WalletAPI.RelayTokenTxnBySlave
```


</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_relaytokentxnbyslave_req = qrlwallet_pb2.RelayTokenTxnBySlaveReq(
        symbol="TST",
        name="Test",
        owner="Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b46",
        decimals=1,
        addresses=["Q000300e2acf7cab2b722f350af276468c6657610625f4b247e40e17607df20735bce04d08d285c", "Q000300e1a3b0f1d891f2f5be6daabd6a134f95055e89f560c7c9698d516059a7df7e4c35420743"],
        amounts=[100, 100],
        fee=0,
        master_address="",
        signer_address="Q000300e2acf7cab2b722f350af276468c6657610625f4b247e40e17607df20735bce04d08d285c",
        ots_index=0)
get_relaytokentxnbyslave_resp = peer_stub.RelayTokenTxnBySlave( get_relaytokentxnbyslave_req, timeout=10 )
print(get_relaytokentxnbyslave_resp)
```

</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  "tx": {
    "masterAddr": "Q010500ef0460016e66288852307d127add2763e7e9b0a4f4adf71ffa9f0d9e07ac34b586d93437",
    "publicKey": "010500983a4553922addd3eb28b521dc01e861a272f227cf3f2a512caf96b3d3060cb1e71bfca2aa151b75a3f982cc8fd262a6afa3f991406e28df2b5fed85148ba93f",
    "signature": "00000002838afdaeef2d240d6d26ce4c0e595cc0e1df653fd3655cfcf3d40b5ac3c89bc108151839ada9e7696686d7b1ae7155d5bb7ba56894b8a9b3bdae958b44b6a269eccc7a0e2dad1cf677e832009178f519dc4c75bd2c639dc760bfbcd44e0859219937e1d424e8b8f70f0b8abe5da80a46446c8015db9b9f5ebf8096d3cccc7b600d1cbc04106e1ac5d3af412d464af48a2f9e6d95feb95142f1a2475f505f09bc55a4832a5e392091bac4135c6e1787fb3430913bbb18c2b9a31e4f48b8834f4e98491274e3169026b5837f373f334fea3132802d6904fc3854e5850570bd4767dd88b35a538367b141f5f55578a1e5e8d8935d565c55f303a1db0da27d950a0469161c43a2a79c0b7eb2a05272a23061a7580fbd78d80dcd7e05c68db3178100dfce4baec368b3fe5545f21bd11a4a2dc847369273ea710bb80d7d48978a9af2b93960fef2da35bdb5840e2890359b31d15c5ee4e1bb7fea7e9df7b16b28cbb5ab061cd8f0c0e3be37b92bc10aa62f3efb8aaefcaa3decd4c4a13ed2f3cbbb2caa2c428659788ad3a340b72de6dd17725fb5453662cd60b0bcfcbe82fc2679293f6ee5c45247f5ca9f1a946555bc24101669864a3e0a7622e3ff925a06ceec7274a40d3905f04a0eca401cfa2d540d05b4c287c440c6c65ab438a85acb654ca8d489fd8dea49c6dce26c100f51814bd3d71151cc8b0664df5e6e690766439f439a79cde217834645d1b1cedaf9e0174824ee31c91b29e5e52592d995fdedb5fd7d2dcf7021eada08f35b03060f325bbb7f0fc6500a5052f3a4761f9091e04e7fc223470f1d9e4a08082d5f2cdf9137c2aef4b9236269def2f4e090d4fc582836ca90a034414d4941d93fbbdc10f8b6abe18dcf00dee2b4d9c73378d77c8615c5b1e9e493437d4ed6e6a1a4116f3288e67b6d016f07a706256a840b3848068e33e7eb45ab42d192ccefab8bd01cdeade5e4a6142e12e324fedd8c1f0ee37b77506c11ea15761d5752212b8ad70db215f75f3fdf7414becb73bc6e1f0f114399e57c8175203835193c2c8ca10f5b3c6eca7e223d65f47ed73781c51ccffc5aa29dcbe8bacb2d2fafdf02400ff1ef2385e118ec39ecbab9ffa5602b16a3e0b967d95a823cebd4b7bfd0a6309b2a88c8532915427983219490e6c4ff5db39854abd09d9b2a40091660d257f749ff28925a5128af45d46d23e7636170ae167dfdff5b297cce7e3159019f981b4dfaedb41d0736d2271e76aad2d97c9347cf365f78cb270ed4ea998813e57ac3b4009235d79076ff7892c0b3f512235fffc87fbc708e4ac58d32fb00e37caf5ea5ec268fa8cfbaa1b2cb7071433345cb2d6d7480b9e992ef956594673f6097623b21c10c20a08508af6093eac23b04ddb7b2bb652bc80998e2b929a0932cd1fe77042c6d36fda8e3fd006ad471805e5f1e7f6da80fda0dfe3ccf858c5e53abb9de486bb4f84feff3acad3be2f23565f0b88969a081829fcaa3487883a91234dc2c717cd8f46e5fb211e34f5b32a7103de33886deb5e8af5a4388c07d74dab9f5685c2a69821e3cfdad4d6c4ca70b568b30d101dc447c5d0923056f230c8f318bc3cd9bab9b06e632f8ef2b9c082aa8152d8cef2ffd3221c7ce7748ed70c2f004a2ec84b21ee327fd9fa0fe0061d1f86d1470b08b9487f7c01e0e9badbf83dd5a51d557663897bbd84fd7e05a43b9792ad1ebe1392ae98b1bb8a716237b2ead035e3e0492711873706fc7b785e3c4c3313fed097a387cc5f6f8ae3fe813c68bbdf2b106411f0079590cf5894d2ed1d1fd13884961511039153207101d07e51b4ec0e58a5eb36feed8e5db650372ac09fa9c1a8a007ebaa471112e2c137a9272fc452a9b70d36b954246c9852e12efde003175bd92500ef745d2ff8e99cd85844c06c962fdecb2cbecf4cc1ba2c6cc6593a2ef0b3f44f47f5451c678e7b22a0bdf1ba065e0e745fe99093b58e8302699ad5620dcd97b78be402e31f9960df3f786b437598cccd1337f9175e76f8ba08fc70437d47361190f0406d7ccdc7d5ddeb6345ca224814d2c51db76e6eea8e8f195e5d52661e9057c01d1a023624c53389fa3c3fad770e2f9b0c77c96facb0cd5423a406601bb129af0076c76cbba1f4e1e968d9f5c1ddb217dff7e9180bd6fe7d69a117d4135dca6f3e32fcc6f9288ea45611af799bedaced0839685ffd4cb6b4280b9a9ec7b9058b33a7bf118a03afb75b2f395a88a71eb2ced35a698287152470e5f0ed56812f0e1b9ef945e15b6549df83d7ee73f2148d75c8e830f1bfda096346c02b6df00a707988dd67e8bdedaef98528a723fc6a1089f10b6ce951d7bcefcdb724c9e73674e454e3a852ba66fa9fa224aa7a7c37c31668de603c13601473c73d20730f1218cbfbaad02b0c63bf7ca09cf3764f3e32e802427957ac06febfd591d6dedb007b9e0d9b35920b9f3f26256d3935a66dfc2ac6de7b08e144f21c57795815f2775e8f232ef7d1fa54853e14cf35c61be44521e1705f7f9df416d1f9aca156be6d3170416a930a497d5afb9f392a25e4a860b1e81d0808a5a277a2a75f5f2de6430609a3e6739426e0000d6bf879c25c27ed2cb85d8f8d23edd1aa358d4a40f6b3ae4ec1b96bb25580f54a4f9606956c82e20b7331fc73ffbf9d5e7055be49fa81a225b520039f017fa54bddf70bd03a56d4d089d1f9532ef769ef964dcaabf8e8272ff324f5e50da1fb5d5a0d79e1e235630560dd2268a21c648e66cbb6b2d6eed82af8560963e7337db53c3d44d66c17745c5f3806d9670533be38d5e3c19292c84629b8f6ee2ede693c4032cc093a13ca4056e4798fd41b410446181f3908b809fe6f8b0e45c4ec50545b19d611fd34fbdda876311a7c58d5871ab001e236ce8f431e28044dcd117473737481878c5a3be26f81b8e0df50c09f181077d9c0f6786dff55385b005c8736efd8d1a72e8f19a1c22d558d958647cef9ebcf8b6974ccd5747f21db660add76c7c8c38f53d3d8fbab86ca755240154c1ea47e2879b7190d80d7ac543de4595069c9bf0056fab95b5d37e6d99437abad1641866162b7c8d609929d6510fe2cffecd3c928d2ed3482a6b7dfc3438e7edfd1eb871f7be9ee39f7f33a3f0ef609178a8e0ec3778e06be43526fe2354d07cdfdd291e994ae31c02ff9d7c16288a29ed5fcd4dace3fab8aeb1838d973499fc4f3dcdcba47cd9384df16016db6ac90492ea2a3fb9514e794b933996a54bc317975973d8bc817cdc34adb2486fcea17dced5fd9b51c58767a8384bcf708eed9585d438a39420b21d4df66865669c806fbf7fbac4995d026009c6071d2395cd72fb1e7fcc88c532e9492269951a0917c09aa9a81ac0bef3586699b6850de57bc282b9f558e64586154310fbcbfebbcc6c753e07f8b00754c94726b429fbef7946766a79ddc00c93a42215a48bddc4ccb79f8ca14014de98a77ef1de319d409b99215c8d6e440165cd5e360ce084ffddb6c9a9616c3f62e1d04ed2aed4ef4205488c4b40d691d3",
    "transactionHash": "2f697db9b3a48e7bfe1817a6bdb8f20fc383acd055cb4ce2e74b2df206641b5c",
    "signerAddr": "Q01050088236f34080ba9df5b2cb2a32a5aaed4118538d8e4d6ce5d3ae80575184c4d3d80a7449e",
    "token": {
      "symbol": "TST",
      "name": "Test",
      "owner": "Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b46",
      "decimals": "1",
      "initialBalances": [
        {
          "address": "000300e2acf7cab2b722f350af276468c6657610625f4b247e40e17607df20735bce04d08d285c",
          "amount": "100"
        },
        {
          "address": "000300e1a3b0f1d891f2f5be6daabd6a134f95055e89f560c7c9698d516059a7df7e4c35420743",
          "amount": "100"
        }
      ]
    }
  }
}

```
</TabItem>
<TabItem value="err" label="Error" default>



#### State validation failed Insufficient funds


If the address does not contain enough funds to send the transaction an error will be shown on the node log similar to below:

```json {title="Fee Exceeds Available Funds"}
2023-07-26 12:22:10,669|4.0.2 python|synced  |MainThread | INFO : balance: 0, amount: 10000000000
```

:::note 
This error will not show up in the CLI, and will only display any issue in the node logs. The CLI will display a successful transaction however the explorer and chain will never see it as the node rejected the transaction.
:::

This indicates that we attempted to send with the fee in shor of $10.000000000$ or $10.000000000$ QRL when the address contained $0$ shor.

```bash
TokenTxn State validation failed for %s because: Insufficient funds
```

#### Address Not Found or Incorrect

This error will trigger when the address is not found in the local `~/.qrl/wallet.json` file or the address is not valid as entered.

```json {title="Address not found or Invalid"}
{
  "code": 1,
  "error": "('Signer Address Not Found ', 'Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b26')"
}
```

Additional errors shown below are mostly self explanatory.

```bash
Missing Token Symbol
```

```bash
Missing Token Name
```

```bash
Invalid Token Transaction, without any initial balance
```

```bash
Token decimals cannot be more than 19
```

```bash
Invalid Initial Amount in Token Transaction
```

```bash
Decimal is greater than maximum allowed decimal
```

```bash
TokenTransaction [%s] Invalid Fee = %d
```

```bash
Token Symbol Length exceeds maximum limit
```

```bash
Token Name Length exceeds maximum limit
```

```bash
Invalid address addr_from: %s
```

```bash
Invalid address owner_addr: %s
```

```bash
Invalid address in initial_balances: %s
```

</TabItem>
</Tabs>


</TabItem>
</Tabs>
<br />

---


### RelayTransferTokenTxn


Transfer tokens held in the local QRL wallet address to another QRL address.

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="RelayTransferTokenTxn"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

This method will transfer tokens held in a QRL Address in the local wallet. Using this method you can transfer tokens between addresses.

:::note
To find all addresses held by an address use the [QRL Block Explorer](https://explorer.theqrl.org) to look up the address and list all tokens held. 

Additionally you can use another API to lookup the address details and tokens held by address. For instance the [GetTokensByAddresss Method](/api/qrl-public-api#gettokensbyaddress) will return a list of tokens held by that address.
:::

:::info Requires token transaction hash
This method requires the token transaction hash from the token creation. This ensures the correct token is used for the transaction
:::

<Tabs
  groupId="RelayTransferTokenTxn-usage"
  defaultValue="method"
  values={[
    {label: 'RelayTransferTokenTxn', value: 'method'},
    {label: 'RelayTransferTokenTxn', value: 'request'},
    {label: 'RelayTransferTokenTxn', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI
{
    rpc RelayTransferTokenTxn(RelayTransferTokenTxnReq) returns (RelayTxnResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message RelayTransferTokenTxnReq {
    repeated string addresses_to = 1;
    string token_txhash = 2;
    repeated uint64 amounts = 3;
    uint64 fee = 4;
    string master_address = 5;
    string signer_address = 6;
    uint64 ots_index = 7;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `addresses_to` | repeated string | YES | Array of addresses to send tokens to, max addresses allowed: 100 |
| `token_txhash` | string | YES | The transaction hash from the initial token creation transaction |
| `amounts` | repeated uint64 | YES | Array of amounts to be sent to each address, index of amount correlates to the address_to array |
| `fee` | uint64 | YES | Transaction fee for the token transfer |
| `master_address` | string | NO | Master address is only needed if sending from a slave address |
| `signer_address` | string | YES | QRL address that holds the tokens and is sending the transfer transaction |
| `ots_index` | uint64 | YES | OTS keys to use for the transfer transaction, must be unused |

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
| `tx` | [PlainTransaction OBJECT](#plaintransaction) | Return the transaction that has been relayed to the network. <dl><dt>PlainTransaction Object contains:</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}>signer_addr</dd>  <dd style={{ display:'list-item' }}> <dt>TransferToken</dt><dd style={{ display:'list-item' }}>token_txhash</dd><dd style={{ display:'list-item' }}>addrs_to</dd><dd style={{ display:'list-item' }}>amounts</dd></dd>   </dl> |


:::note 
Please refer to the [PlainTransaction](#plaintransaction) `TransferToken`.
:::


  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="RelayTransferTokenTxn-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"addresses_to": ["Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b46"],
                      "token_txhash": "2f697db9b3a48e7bfe1817a6bdb8f20fc383acd055cb4ce2e74b2df206641b5c",
                      "amounts": [1],
                      "fee": 0,
                      "master_address": "",
                      "signer_address": "Q000300e2acf7cab2b722f350af276468c6657610625f4b247e40e17607df20735bce04d08d285c",
                      "ots_index": 4}' \
                      localhost:19010 \
                      qrl.WalletAPI.RelayTransferTokenTxn
```



</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_relaytransfertokentxn_req = qrlwallet_pb2.RelayTransferTokenTxnReq(addresses_to=["Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b46"],
        token_txhash="2f697db9b3a48e7bfe1817a6bdb8f20fc383acd055cb4ce2e74b2df206641b5c",
        amounts=[1],
        fee=0,
        master_address="",
        signer_address="Q000300e2acf7cab2b722f350af276468c6657610625f4b247e40e17607df20735bce04d08d285c",
        ots_index=4)
get_relaytransfertokentxn_resp = peer_stub.RelayTransferTokenTxn( get_relaytransfertokentxn_req, timeout=10 )
print(get_relaytransfertokentxn_resp)
```


</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  "tx": {
    "publicKey": "0003001b3db18e77b427a208d5cb49134b58698fbe9e8cfc328589ee736c8a7a3aefbd3fe8288fbe728a69f3cabf9efc52f86eae6ee8024d811047fb3a35d569577658",
    "signature": "000000041862f98740a16ecce10e7660b164e949ec98365f7e2cc1c1161ca7971bfdc99113878f2174ce88fd85276eb6d9375406115b21333db027eb0fb4cd43cbf64aca93467f4bd5343184399d4b58b67dab94dd3112b97d7d6fd3a2c496214b15cd13987c90a4c8880a2139d427e7441a142e3f16271b5771adb1142ed978bf99ae049e132aaa693232d496bd556bf215eabf0f1fbb92e86c7ea1f4ff777fadbe2674ff91f48933aec09e8d964fd6878c0925ed9821575f556ffccba3f9e017d68b68eb9c94bb1d639bda2c151cd761ebddc539b22bbca831bff173f7200ef4e77b95d8febe10a9295dc490766487ddb67641e69c69f89b611945cce1f8eaae0c95367ad2d745f127b248f538c82ea4933043fc04feccb7755a133b877f80cd188a84374914afba280b532c282b04e6d4be9a247f882072c272d16c1b9a455cf9ae4396cd8d40258db4ed0a56fcd4782e1169dedb505e768c68ba294d51aa0dc67520615bdc501674f86a71aac250e3a49dd07bd5f00029de99b0a5c282bcfb08e8867c4f74fe89cd65b99c053cd59a44548745a1f65372119b1f8f3654ad3d9f46a5df05bcb3dd21f169a2e1d9a36da0d6ffcd0327c65e05fac48a5f88f96cd56712550179cd70368be165c66ef2e756a3663ffa1e8e865be8c2ee971bdb990db7b846d852328b55a7d74e2b9bf645a6c4912909dd4ec1a27d49b8c11d8e02767124b5a4b8518e46bd9b256e348219e32fc3114dd10dd7bee5a4edb7383c4ac5af26193c5a38ed69b6e66513e5a4d566489acbeb621f80d9a64b4c0acd1c472231d7807a0449fb84d2f58776205f41f5e190cd49df2edd3f66f445ab7f1410debd54292734b3eae81254dca52bb624c1d1dba14df2945c26e6db2b46be5dd85c59b5a1c94cebcc05923305bacccaaf590b52daa422c21644c3ee01cab3a04abf6b68a78d026ac7279479049ea0ee3180f968603e427f5dba6922baead89c836aacb477d63025f8a0d6a7a45f9f388daf10f2108d0aefe833508c97808acca4f65dc547ba7ae0c7af71031d360fee57191f95f12bf311de838675f721d5661116a16d824d92305f91e0094c9ca4931ed1e81dc18e4a08e79738c7d4a15ca7894454fdb596afc4af56635230d767b893cbc31847a0d342508d5298abcf883dcd651444be64a1461a62c77db54b5b5d4a04a53554ff17a5da2ab6c07c39a9c621366a0fd8035da5f2c43d59ee9b6d8b075bb109aadd5ea05143ba3239fb589c8795d69de0f531baf3da1537e42826bebdd1475e0351666da2abc8b83909fb80b3cd73b33edc34cb61240c3a73d361f7dd25ed460e7fbc30950c13532296fac1defd82bb9abd9ea818ea6fb3058e1eb5b1641b506c038faeafdf710eb0af2dccad9e35997fff9720ddcb7e9f784d37aa1a1e6fe9985428273d4820ceff5ae610e953deea99218465dcab50bef0289276869bf7b66471c008e35fade705167c7e917159a02431b2d2d93350e4ea65e4645138aed84f9fe8742adfbd5b7aca6b2d828b57e4ab2039843a06c4a81c7831db2497a03d9a6b589895682df5980fece765a9ca0efb5a140bdec31df46ca8e6756da91f6e399a6c76af5446a11255e7bd9ee1cc25e7145ea8f65017715c531053d43a34d36b20e2aa2aaffbf60f6db7c45b08c25f24070fe5d42cf6b11cbd12c14bbca6f1a57f814a4d85826dd09f39c6d10675a86de792194230b247c2da53c2d3dd32f3a1af2acf7084cf927a20ec445c16073b6a4844a30e1a88ccfb9c48fb08d852e7cd8f41b0083c45eadf78820df37493ed2307003743ce85656be3fda0aee0eecf876553d6bb2b193a2932933f8d00f0f70e183aee73b5144d7bc1cd7d3f3d54fdddfbf8a46c3a3beb278b11dd75f04a813fd79b5530d096bd3fc3a5f9b13a111e7159ae7df3e252599e5e60a708140bcc6282d98be41669cfd4fb7e44b8c4f9dbbcdd91c31b4973f8631fe333f4cc9f9afe2644ef1484e809c2e7f47a85ecb1b46d21d394486e5ce611c1e3afe32403c1a8dee3822abfde9f0b7fb1623843b0eb17e5cc6da879e7bbf6320e856b16018e1a56d1c09f17de1b64d98a054eb690d4c768a7657d1efb80643493b1b916b6b284db1aef415b71e930a5ef0d8b9ed415d93015794d3ea3c38662158c16fd00f434c6f302a24a439094c21cb959b42383b6b499b3d3211ae976d969cd13015b52fc02580a61771e249d6c1e9339fca4a6877bb8aeef6636f8633aae583d18affdc27e5fb490b9fc0699d4cdf3885af387984a57dce53110fe5745a10b41a1a5689bed5c95bfff24602d30dfa4dfce1972f3252888c9cb618d1f803eacb92e19ed45b269eb5b63d6a6921e07a1ba699ce40a252ae7ee868feac6429240db46cb59b5268377a393a307ad033d0a513a0737950285dbc86f1e78ae3028c1bbc20b8840154582f56bd5714ec85e0d8c6ceb66c39ca69f1ea356ee31f87cc4ff56bb89bbf38cc04764d38d372583d8e8400f7d82382e5c00d01193f47663e54b834bdd202ba4faf9a2aaf9aec6b1468f28610257cc2f66323870786c7376592bc6539b338ae5cf5e7303771aa72f0424d31e82c215484d922124e344f4cd37f5796f1d10260ea69fcabbf09739872c947e15f77828f5f96170fe4473a1f67d2424513bc003a18f8b673efde3724d2884bd7fd5be601bb860dd7263f207a23ec6f744ad66ad20bda3f65c5ebe5ed38bda069c5ff1d4940a4190ae1eca5901df7c6e2597a34af187759e07a9a72c5aa0e02492aefe1cdcbc7dbf3d1a61d66343c9a5a201a705acc4b2ff447ef69d2e47881f46ffcfe7c1dc041cc7fcfae66ccdb860c0379b2c8acb6c3eb7f968ab2125321767041856b9304a46956fddb5b67185bce9d78aedc78c5e7ff91c83d35a6a4c562c6fa89ba0df1933ca6c16f8e7cc971cc8fb7c4047d3583d88e153b903e9bd46696e5996ed8010550f9abdb2851ac6c1ef715593157cf0a9cb0994598da61185a58873582ac127a400b88c244f2df1e03d0e90c53a1b58acf521733e701a8b15dc3c638bf157b056c6caf1d93e342384ba520359473965fbae2e9275e0de7dc902986113036e09b10e28e3dfbefccb04601cc40fda29ccdfdfada55eb52b445e12e69b82cb6ddd9a682519cef946892844cfbeaeb8d74b1a95ba70b09a1a403aee0fc827f1a19e90df4cd241b5bac6686ebdd1bedafe46c1bab5a689289ba6155fdcffa38c4ab0aea2c0b7dbda7ecf8a5be7c36ffe410432c42c4083d600d23f8e298f88ddd330371f909baa32ed3770f387959e52750339737859d1f73e3c1372189ad8324f3e04aca42b540913dc98b653",
    "transactionHash": "610473402c5a29a10de289d83a2b41e64e301e9728bc603e17c6478ec4e344a8",
    "signerAddr": "Q000300e2acf7cab2b722f350af276468c6657610625f4b247e40e17607df20735bce04d08d285c",
    "transferToken": {
      "tokenTxhash": "2f697db9b3a48e7bfe1817a6bdb8f20fc383acd055cb4ce2e74b2df206641b5c",
      "addrsTo": [
        "Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b46"
      ],
      "amounts": [
        "1"
      ]
    }
  }
}
```
</TabItem>
<TabItem value="err" label="Error" default>

#### OTS Key Reuse

```json {title="OTS Key Reuse Attempt"}
{
  "code": 1,
  "error": "cannot rewind"
}
```

#### Address Not Found or Incorrect

This error will trigger when the address is not found in the local `~/.qrl/wallet.json` file or the address is not valid as entered.

```json {title="Address not found or Invalid"}
{
  "code": 1,
  "error": "('Signer Address Not Found ', 'Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b26')"
}
```

#### Fee Exceeds Available Funds

If the address does not contain enough funds to send the transaction an error will be shown on the node log similar to below:

```json {title="Fee Exceeds Available Funds"}
2023-07-26 16:01:51,807|4.0.2 python|synced  |MainThread | INFO : [TransferTokenTransaction] State validation failed for 868d9def15233d685c23254805e6a66e77531d4b7ec15155a22566f647aebe44 because: Insufficient funds
```

:::note 
This error will not show up in the CLI, and will only display any issue in the node logs. The CLI will display a successful transaction however the explorer and chain will never see it as the node rejected the transaction.
:::

This indicates that we attempted to send with the fee in shor greater than the available balance in the address.


</TabItem>
</Tabs>

</TabItem>
</Tabs>
<br />

---


### RelayTransferTokenTxnBySlave


Transfer tokens held in the local QRL wallet address to another QRL address using a slave address.


<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="RelayTransferTokenTxnBySlave"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

This method will transfer tokens held in a QRL Address in the local wallet with a slave address. Using this method you can transfer tokens between addresses on the QRL blockchain.

This requires that the address that holds the tokens, was also created using the [`AddNewAddressWithSlaves` method](#addnewaddresswithslaves).

:::note
To find all addresses held by an address use the [QRL Block Explorer](https://explorer.theqrl.org) to look up the address and list all tokens held. 

Additionally you can use another API to lookup the address details and tokens held by address. For instance the [GetTokensByAddresss Method](api/qrl-public-api#gettokensbyaddress) will return a list of tokens held by that address.
:::

:::info Requires token transaction hash
This method requires the token transaction hash from the token creation. This ensures the correct token is used for the transaction
:::

<Tabs
  groupId="RelayTransferTokenTxnBySlave-usage"
  defaultValue="method"
  values={[
    {label: 'RelayTransferTokenTxnBySlave', value: 'method'},
    {label: 'RelayTransferTokenTxnBySlaveReq', value: 'request'},
    {label: 'RelayTransferTokenTxnBySlaveResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc RelayTransferTokenTxnBySlave(RelayTransferTokenTxnBySlaveReq) returns (RelayTxnResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message RelayTransferTokenTxnBySlaveReq {
    repeated string addresses_to = 1;
    string token_txhash = 2;
    repeated uint64 amounts = 3;
    uint64 fee = 4;
    string master_address = 5;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `addresses_to` | repeated string | YES | Array of addresses to send tokens to, max addresses allowed: 100 |
| `token_txhash` | string | YES | The transaction hash from the initial token creation transaction |
| `amounts` | repeated uint64 | YES | Array of amounts to be sent to each address, index of amount correlates to the address_to array |
| `fee` | uint64 | YES | Transaction fee for the token transfer |
| `master_address` | string | YES | Master address must be an addresses that contains Slave keys created with the `AddNewAddressWithSlaves` |

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
| `tx` | [PlainTransaction OBJECT](#plaintransaction) | Return the transaction that has been relayed to the network. <dl><dt>PlainTransaction Object contains:</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}>signer_addr</dd>  <dd style={{ display:'list-item' }}> <dt>TransferToken</dt><dd style={{ display:'list-item' }}>token_txhash</dd><dd style={{ display:'list-item' }}>addrs_to</dd><dd style={{ display:'list-item' }}>amounts</dd></dd>   </dl> |


:::note 
Please refer to the [PlainTransaction](#plaintransaction) `TransferToken`.
:::

  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="RelayTransferTokenTxnBySlave-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"addresses_to": ["Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b46"],
                      "token_txhash": "2f697db9b3a48e7bfe1817a6bdb8f20fc383acd055cb4ce2e74b2df206641b5c",
                      "amounts": [10],
                      "fee": 0,
                      "master_address": "Q010500ef0460016e66288852307d127add2763e7e9b0a4f4adf71ffa9f0d9e07ac34b586d93437"}' \
                      localhost:19010 \
                      qrl.WalletAPI.RelayTransferTokenTxnBySlave
```

</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_relaytransfertokentxnbyslave_req = qrlwallet_pb2.RelayTransferTokenTxnBySlaveReq(addresses_to=["Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b46"],
        token_txhash="2f697db9b3a48e7bfe1817a6bdb8f20fc383acd055cb4ce2e74b2df206641b5c",
        amounts=[10],
        fee=0,
        master_address="Q010500ef0460016e66288852307d127add2763e7e9b0a4f4adf71ffa9f0d9e07ac34b586d93437")
get_relaytransfertokentxnbyslave_resp = peer_stub.RelayTransferTokenTxnBySlave( get_relaytransfertokentxnbyslave_req, timeout=10 )
print(get_relaytransfertokentxnbyslave_resp)
```

</TabItem>
<TabItem value="resp" label="Response" default>

```json
{ 
  "tx": {
    "masterAddr": "Q010500ef0460016e66288852307d127add2763e7e9b0a4f4adf71ffa9f0d9e07ac34b586d93437",
    "publicKey": "010500983a4553922addd3eb28b521dc01e861a272f227cf3f2a512caf96b3d3060cb1e71bfca2aa151b75a3f982cc8fd262a6afa3f991406e28df2b5fed85148ba93f",
    "signature": "000000039a6c9b3687def12775203fc123c4f3a4404800bb8a5e89c0d08f0a159af7a7d824b7c715b1aaadb046449850139567493fac0ab18a5c43f6a01406344ede3e4c64da0c89c3c8b5ecbab61bb9cf8f6cd2a403aa46711a53d150b0a3b56bf1fe28f150997be214fcc3c2c85ac658b5f7306b45abcc41c5c62bf912f4a700101ca665a47e231fd7ee289cc8612cb2eb389541ae2e618af67ead3de858b20193fbd06577d3110f74344cc28ca50cb65dac9fbc27c7d15406ccf0e9d525a46087085425275e742e677785b4a9a0d8e3ef0bcd9a466f0b67428f1376f11d7cc0782a2f3f8a70d60de675df8c07027145ed14d4b52310abc00e90b4a3032ea65d19cdbe4203dcc5bb1f82937031d7d7febe12588c11225d2ebc54b8777cceab82b1c5e892e824f9a0e58460be420ae555484bf1149e59a3636d05679c80283d9d2df304c9dc981ca2a4e7c0eb3a1efc1c15006379bceca1f48165fb2e8483f4a1850dc2431e6cc37681fcdb9625730d3393443171c8a891b2e83790d54ee6fca65741cd7ef01874d134ab9cafc2d1d35f3f74b1cda02a0a95c6a6fb075f2046393978f0c7dfdf82ddd74a974c6334a029a362b60745295b148f48e706210d07eb5f1d925f3e39e88204e08dd40d37f379b9b459d49d04f942d9c51f80e7ac9f3512066247c3b845bbc75bce3e46fa706eec56614b959a08a4e241f9effdc530c26de6119b3b977681800b41db954fdd91a1f910d95e13117131bf8145c7734e2533c2e7df227e9d8471acd3702259d01cb985a0d99fb0f8ca3c16834df989af45f099b320d61b77de8f2ae3ee292e4093abc8277e09fb620ec60d9f5cce5ed4c1cca6682dc26ced20f2930889d5924146a532784d28ab18d6f38acf27c41a1c56e71694ef191115b0654d07bbdec7d598087a944ef437e49c179aa6f7f9818f6e827225f93e5531d4d8b21c053f2be6a49b42ccde9410953ebe85b0dd40e8253d14e37cb0a40886c252614aca9d158a3c884ba9faeae50e6d43d827656041c2e278d385fda119cded7c82972fde3f2a9f1287369c942860f1348b24a468fbff01781bb9ef1bdb5d45dbdf45e3d869849dca5af52e7f6e0aade23116fb66711785ae6853297c86ada762be34433e307c0c9b94ed4e41fd8fcc06c6730cda6115318ab5a3090cfcbe20342c516e77e58984a5ded45431375241303d7b23f639ec9d106aae49ace7578fde8e133e69a636d94d9776838b502febdcff09067527d8b4a1119795e3fcfcaebdfce65c3ccf56135303d27cbf2fdc28d67d8b77b473371cac8d8aa17a803033724008551bf4e10b08c255fa4c9e3576907df14a4de66a9dd7477375a6b242d80e73c807bbe1398f2260655eecd088c3d0c11879683ed8aea7ac90bf94b3bf0437782d28b709d23ba919cf85e734cb155202c62a28c33707d19e1ba36984a5ebc8b13d6ef6778228d7678b57a71e83a0bc04fbcac9825c84c15998f8761f5749ad73b0cea499b0aff98ad0573fab72c30f0e3caed611e2a999e98357acd6cfdc8696efd4e90438a278af027ea39cbc2cec43aed4d03a1296c592df57ecdbc79fa0582696b5d94f73a08a1592f043f8a1c5837f35d0940b594ce3a4b7bc0b11eb493d004db3d7a43b0a1ff16994dc3af7e6ad40234d64db7c76cb23c5b73b453a58c85eba4d49e87af735709e5906521152b9a3c1ae1d581c54b0e7dc8a5d979356929814dd010108cf3890b85ba788a4360e6294e06fab5c1475c2fc6d1324edf53acd7a056ae2fd5e87e25ae98bbf8b6d76d61b886b89b7a8a889f2b7f397e2abcb2f8f681d6f126f9b939ed70cfd983917459126d6776949c015eda822e1b52ba8703f2c14a6c8fddd668a7a0becf53a40fe461bb2d2ae239de5d40334d9d74ef6acc646cbebe6b774278bc8d0e9d9954ee4724a7f15e85303e0b23747dd16104d596f1656359e860dca211b1cccceb66f2561d414ee19ea15acea122e829d8ee397063647f0d91e93756cc31c406ac65598447abde7a1865cd679290ec35818c33eeb85fea29fbeb90b9a19d5f39344549cc741833a5ef9a553c24b7e1c5548f8613ecc08772bbf1d94121e032d006074488940d7abe38a4dbeee2e04c9f505cba9afbef62cbf46ef65787a6bc79bec096493b5146784e3619b5bbff6eef9c3f05de84f818f784c5e390a95f01ce4e00c445fded0e96fdce9bc6c0d8b57277089981e20d24f65e705995fc82d0ce38e4667084968719c7edd7182178b2e99c42397b1769bcf2ba44a4ad376653a5831e83d2f96e1b7326842810363aefbc3644394a1d9cffac81abe9423983f1d9b91a4b20d9fcdfa2d9a61b10f98743701add1a83324afe0d4ad2dbb3860cb79b724a066d8e3217398ba5d5f6146e52ad87b3d6a66e8667a61d9b0826967f9a6453492db0541379094a762f110d281ec54db282a44a3d66cf5c74083bdb2d39c5fb5a68635454a850f7e50660698b6834a4abbda5a58f6b3243566d0720f40a2395d9aa48b5676dd44c0626f34045c7e175dd74b91017fc5f7930df1631726a7adcd92b2d28bec09f00d055669d5611f4346f811ce9c721f0ca253db98a3682a54d77b13734b39701b13fc2a1ab5309139191e7400f1dec4a033d2301a1a858871ae69cf2006814f2f1cf80fe8309b45b632fc3ed35d4a37728c94480a3a43fb90ddee2282d4db4e311598b9ea40dbc11bb1306aa4ed5ad69664030f5028eec929cf4b97c621cca3f25dbe53de68340dca9f80c3ea5a242ad178649120b0025dfe88aabad8235e523f2c83b204291511a131958a3a7c7ae31308c8c175c8b80d93545a0481decf2b2e5173b845601c5908af417d1f8f346e4f811e66b5f83e6d4e5e39d3d951e88d99bfbba360cdd99f0036b36c197e3133d2fed31fd8588b102390886c8f32c29475a3062d41110c288eda6a37a6581b60492b73c0781af756c9ded256bae460890c113311c981e172c3889829443bea1f8ee0cb7d7a6a35778544b744e130713767fe183a0213d70110e9e1edee0316b90f8b498bb816365cb13d68c4c227c3be9cba01ac89e414b212d415593044fd48848c965e31b0d4db4981817edb7cd0ef470f73ab9ee39f7f33a3f0ef609178a8e0ec3778e06be43526fe2354d07cdfdd291e994ae31c02ff9d7c16288a29ed5fcd4dace3fab8aeb1838d973499fc4f3dcdcba47cd9384df16016db6ac90492ea2a3fb9514e794b933996a54bc317975973d8bc817cdc34adb2486fcea17dced5fd9b51c58767a8384bcf708eed9585d438a39420b21d4df66865669c806fbf7fbac4995d026009c6071d2395cd72fb1e7fcc88c532e9492269951a0917c09aa9a81ac0bef3586699b6850de57bc282b9f558e64586154310fbcbfebbcc6c753e07f8b00754c94726b429fbef7946766a79ddc00c93a42215a48bddc4ccb79f8ca14014de98a77ef1de319d409b99215c8d6e440165cd5e360ce084ffddb6c9a9616c3f62e1d04ed2aed4ef4205488c4b40d691d3",
    "transactionHash": "7841bd8bdd75c4eb42edc03d4450b54cc8eb211f8e2ca81322b48d92b7d79b19",
    "signerAddr": "Q01050088236f34080ba9df5b2cb2a32a5aaed4118538d8e4d6ce5d3ae80575184c4d3d80a7449e",
    "transferToken": {
      "tokenTxhash": "2f697db9b3a48e7bfe1817a6bdb8f20fc383acd055cb4ce2e74b2df206641b5c",
      "addrsTo": [
        "Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b46"
      ],
      "amounts": [
        "10"
      ]
    }
  }
}

```
</TabItem>
<TabItem value="err" label="Error" default>










#### Wrong Token Transaction Hash

If the transaction hash is not correct and does not point to a token on the blockchain the transfer will not work,


There is a log printed in the node output that indicates the error.

```json {title="Wrong Token TX Hash Node Output"}
2023-07-27 13:29:34,037|4.0.2 python|synced  |MainThread | INFO : 010500ef0460016e66288852307d127add2763e7e9b0a4f4adf71ffa9f0d9e07ac34b586d93437 doesnt own any such token 77270e58cc7f86387f632e677cb8f0a6d1826d0393b2b882372b341877b5eb84 
```


#### Address Not Found or Incorrect

This error will trigger when the address is not found in the local `~/.qrl/wallet.json` file or the address is not valid as entered.

```json {title="Address not found or Invalid"}
{
  "code": 1,
  "error": "('Signer Address Not Found ', 'Q00030095e434327d8f22b05b23e4e50131e6265707bec7adf99035d3583da5f93c2c86744e1b26')"
}
```

#### Fee Exceeds Available Funds

If the address does not contain enough funds to send the transaction an error will be shown on the node log similar to below:

```json {title="Fee Exceeds Available Funds"}
2023-07-26 16:01:51,807|4.0.2 python|synced  |MainThread | INFO : [TransferTokenTransaction] State validation failed for 868d9def15233d685c23254805e6a66e77531d4b7ec15155a22566f647aebe44 because: Insufficient funds
```

:::note 
This error will not show up in the CLI, and will only display any issue in the node logs. The CLI will display a successful transaction however the explorer and chain will never see it as the node rejected the transaction.
:::

This indicates that we attempted to send with the fee in shor greater than the available balance in the address.

</TabItem>
</Tabs>

</TabItem>
</Tabs>
<br />

---
















### RelaySlaveTxn

Relays a generated hypertree XMSS slave address onto the QRL blockchain.

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="RelaySlaveTxn"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

This function allows the address given to submit a slave address to the chain, authorizing the slave XMSS OTS keys to send transactions as the master address.



<Tabs
  groupId="RelaySlaveTxn-usage"
  defaultValue="method"
  values={[
    {label: 'RelaySlaveTxn', value: 'method'},
    {label: 'RelaySlaveTxnReq', value: 'request'},
    {label: 'RelaySlaveTxnResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc RelaySlaveTxn(RelaySlaveTxnReq) returns (RelayTxnResp);
}    
```
  
  </TabItem>
  <TabItem value="request">

```go
message RelaySlaveTxnReq {
    repeated bytes slave_pks = 1;
    repeated uint32 access_types = 2;
    uint64 fee = 3;
    string master_address = 4;
    string signer_address = 5;
    uint64 ots_index = 6;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `slave_pks` | repeated bytes | YES | Array of slave PK's generated using a function similar to the [QRL Node CLI `slave_tx_generate`](/use/node/node-cli/overview#slave_tx_generate) command. |
| `access_types` | repeated uint32 | YES | Array of Access type, oneof: `1` |
| `fee` | uint64 | YES | Details |
| `master_address` | string | NO | This field is only required if sending this transaction with an already generated slave address |
| `signer_address` | string | YES | Details |
| `ots_index` | uint64 | YES | Details |


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
| `tx` | [PlainTransaction OBJECT](#plaintransaction) | Return the transaction that has been relayed to the network. <dl><dt>PlainTransaction Object contains:</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}>signer_addr</dd>  <dd style={{ display:'list-item' }}> <dt>Slave</dt><dd style={{ display:'list-item' }}>slave_pks</dd><dd style={{ display:'list-item' }}>access_types</dd></dd>   </dl> |



:::note 
Please refer to the [PlainTransaction](#plaintransaction) `Slave`.
:::


  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">


:::caution Need Code Examples
:::


Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="RelaySlaveTxn-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 

```


</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 

```

</TabItem>
<TabItem value="resp" label="Response" default>

```json

```
</TabItem>
<TabItem value="err" label="Error" default>


#### Number of Slaves in Array is NOT Equal to Access Type Array

```
Number of slave pks are not equal to the number of access types provided
```
#### Duplicate Slave Keys Found 

```
Duplicate Slave PKS found
```

#### Invalid Access Types Given

Must be either:

- `0` - 
- `1` - 

```
Invalid Access type %s
```

#### Fee Exceeds Wallet Value

The fee for the slave transaction exceeds the value held in the wallet. Lower the fee or deposit funds into the address to cover the fee.

```
Slave: State validation failed for %s because: Negative send
Slave: State validation failed for %s because: Insufficient funds
```

#### Number of slaves exceeds Allowable Quantity

```
List has more than %s slave pks or access_types
```

#### Slave PK length Is Longer Than Allowed

```
Slave Transaction Slave PK length is beyond limit
```

#### Slave PK is already authorized for the Address

This indicated a duplicate slave key is discovered in the transaction. Ensure the slaves are not already connected to the address.

```
Slave Transaction Invalid slave transaction as %s is already a slave for this address
```

</TabItem>
</Tabs>


</TabItem>
</Tabs>
<br />

---


### RelaySlaveTxnBySlave


Relays a generated hypertree XMSS slave address onto the QRL blockchain using an already generated slave address.


<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="RelaySlaveTxnBySlave"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

This function allows the slave address given to submit a slave address to the chain, authorizing the slave XMSS OTS keys to send transactions as the master address.


<Tabs
  groupId="RelaySlaveTxnBySlave-usage"
  defaultValue="method"
  values={[
    {label: 'RelaySlaveTxnBySlave', value: 'method'},
    {label: 'RelaySlaveTxnBySlaveReq', value: 'request'},
    {label: 'RelaySlaveTxnBySlaveResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
   rpc RelaySlaveTxnBySlave(RelaySlaveTxnBySlaveReq) returns (RelayTxnResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message RelaySlaveTxnBySlaveReq {
    repeated bytes slave_pks = 1;
    repeated uint32 access_types = 2;
    uint64 fee = 3;
    string master_address = 4;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `slave_pks` | repeated bytes | YES | Array of slave PK's |
| `access_types` | repeated uint32 | YES | Array of slave access types, Oneof: `0` or `1` |
| `fee` | uint64 | YES | Fee for slave transaction |
| `master_address` | string | YES | Slave address to send transaction from |


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
| `tx` | [PlainTransaction OBJECT](#plaintransaction) | Return the transaction that has been relayed to the network. <dl><dt>PlainTransaction Object contains:</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}>signer_addr</dd>  <dd style={{ display:'list-item' }}> <dt>Slave</dt><dd style={{ display:'list-item' }}>slave_pks</dd><dd style={{ display:'list-item' }}>access_types</dd></dd>   </dl> |



:::note 
Please refer to the [PlainTransaction](#plaintransaction) `Slave`.
:::

  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

:::caution Need Code Examples
:::


Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="RelaySlaveTxnBySlave-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 

```

</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

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


</TabItem>
</Tabs>
<br />

---


### EncryptWallet


Encrypt the local wallet file using AES encryption and a passphrase.

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="EncryptWallet"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Using this method to encrypt the wallet will give additional security to the file at rest.

:::warning
Once encrypted the passphrase is required to access the wallet and all addresses contained within. If this passphrase is lost there is nothing that can be done to recover it!
:::

While this will encrypt the `walletd.json` file the wallet Daemon uses, the file is accessible through the WalletD while running after you have unlocked the address.


<Tabs
  groupId="EncryptWallet-usage"
  defaultValue="method"
  values={[
    {label: 'EncryptWallet', value: 'method'},
    {label: 'EncryptWalletReq', value: 'request'},
    {label: 'EncryptWalletResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc EncryptWallet(EncryptWalletReq) returns (EncryptWalletResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message EncryptWalletReq {
    string passphrase = 1;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `passphrase` | string | YES | User defined passphrase to encrypt the wallet file with using AES|


  </TabItem>
  <TabItem value="response">

```go
message EncryptWalletResp {
    uint32 code = 1;
    string error = 2;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | UInt32 | Error Code. Only appears if any exception is triggered. |
| `error` | String | Error Message. Only appears if any exception is triggered. |

:::note
This method returns no response if executed correctly. The file contents will change, now reflecting encrypted fields in the `JSON` file
:::

  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="EncryptWallet-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
~/go/bin/grpcurl -plaintext  \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"passphrase": "PASSWORD123"}' \
                 localhost:19010 \
                 qrl.WalletAPI.EncryptWallet
```


</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_encrypt_wallet_req = qrlwallet_pb2.EncryptWalletReq(passphrase="PASSWORD123")
get_encrypt_wallet_resp = peer_stub.EncryptWallet( get_encrypt_wallet_req, timeout=10 )
print(get_encrypt_wallet_resp)
```

</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  
}
```
</TabItem>
<TabItem value="err" label="Error" default>

#### Wallet Already Encrypted

This error happens when the wallet is already encrypted.

```json {title="Wallet Already Encrypted"}
{
  "code": 1,
  "error": "Wallet Already Encrypted"
}
```

#### Missing Passphrase

No passphrase given to method

```json
{
  "code": 1,
  "error": "Missing Passphrase"
}
```

#### Empty Address Array Found

This error indicates the address file is empty

```json
{
  "code": 1,
  "error": "Cannot be encrypted as wallet does not have any address"
}
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>
<br />

---


### LockWallet


Lock an [encrypted wallet](#encryptwallet) that has previously been [unlocked](#unlockwallet).

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="LockWallet"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Usage details

<Tabs
  groupId="LockWallet-usage"
  defaultValue="method"
  values={[
    {label: 'LockWallet', value: 'method'},
    {label: 'LockWalletReq', value: 'request'},
    {label: 'LockWalletResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
   rpc LockWallet(LockWalletReq) returns (LockWalletResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message LockWalletReq {
}
```

  </TabItem>
  <TabItem value="response">

```go
message LockWalletResp {
    uint32 code = 1;
    string error = 2;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | UInt32 | Error Code. Only appears if any exception is triggered. |
| `error` | String | Error Message. Only appears if any exception is triggered. |

:::note
This method returns no response if executed correctly.
:::


  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="LockWallet-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
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
                 qrl.WalletAPI.LockWallet
```

</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
lock_wallet_req = qrlwallet_pb2.LockWalletReq()
lock_wallet_resp = peer_stub.LockWallet( lock_wallet_req, timeout=10 )
print(lock_wallet_resp)
```


</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  
}
```
</TabItem>
<TabItem value="err" label="Error" default>

```json {title="ERROR-1"}

```
</TabItem>
</Tabs>


</TabItem>
</Tabs>
<br />

---


### UnlockWallet


Short description

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="UnlockWallet"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Usage details

<Tabs
  groupId="UnlockWallet-usage"
  defaultValue="method"
  values={[
    {label: 'UnlockWallet', value: 'method'},
    {label: 'UnlockWalletReq', value: 'request'},
    {label: 'UnlockWalletResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
  rpc UnlockWallet(UnlockWalletReq) returns (UnlockWalletResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message UnlockWalletReq {
    string passphrase = 1;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `passphrase` | string | YES | Passphrase used to encrypt the wallet. This must be exactly as entered when initial encryption was set |


  </TabItem>
  <TabItem value="response">

```go
message UnlockWalletReq {
    uint32 code = 1;
    string error = 2;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | UInt32 | Error Code. Only appears if any exception is triggered. |
| `error` | String | Error Message. Only appears if any exception is triggered. |

:::note
This method returns no response if executed correctly.
:::


  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="UnlockWallet-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"passphrase":"PASSWORD123"}' \
                 localhost:19010 \
                 qrl.WalletAPI.UnlockWallet
```


</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
unlock_wallet_req = qrlwallet_pb2.UnlockWalletReq(passphrase="PASSWORD123")
unlock_wallet_resp = peer_stub.UnlockWallet( unlock_wallet_req, timeout=10 )
print(unlock_wallet_resp)
```

</TabItem>
<TabItem value="resp" label="Response" default>

```json
{

}
```
</TabItem>
<TabItem value="err" label="Error" default>

```json {title="ERROR-1"}

```
</TabItem>
</Tabs>


</TabItem>
</Tabs>
<br />

---


### ChangePassphrase


Changes the encryption Passphrase previously established for a wallet.

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="ChangePassphrase"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Usage details

<Tabs
  groupId="ChangePassphrase-usage"
  defaultValue="method"
  values={[
    {label: 'ChangePassphrase', value: 'method'},
    {label: 'ChangePassphraseReq', value: 'request'},
    {label: 'ChangePassphraseResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc ChangePassphrase(ChangePassphraseReq) returns (ChangePassphraseResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message ChangePassphraseReq {
    string oldPassphrase = 1;
    string newPassphrase = 2;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `oldPassphrase` | string | YES | Old passphrase used to initially encrypt the wallet |
| `newPassphrase` | string | YES | New passphrase to encrypt the wallet with. |


  </TabItem>
  <TabItem value="response">

```go
message ChangePassphraseResp {
    uint32 code = 1;
    string error = 2;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | UInt32 | Error Code. Only appears if any exception is triggered. |
| `error` | String | Error Message. Only appears if any exception is triggered. |

:::note
This method returns no response if executed correctly.
:::


  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="ChangePassphrase-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"oldPassphrase":"PASSWORD123", 
                      "newPassphrase":"321DROWSSAP"}' \
                 localhost:19010 \
                 qrl.WalletAPI.ChangePassphrase
```


</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
change_passphrase_req = qrlwallet_pb2.ChangePassphraseReq(passphrase="PASSWORD123")
change_passphrase_resp = peer_stub.ChangePassphrase( change_passphrase_req, timeout=10 )
print(change_passphrase_resp)
```

</TabItem>
<TabItem value="resp" label="Response" default>

```json
{

}
```
</TabItem>
<TabItem value="err" label="Error" default>

```json {title="ERROR-1"}

```
</TabItem>
</Tabs>


</TabItem>
</Tabs>
<br />

---


### GetTransactionsByAddress


Get all transactions by QRL Address

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="GetTransactionsByAddress"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Returns all transactions found by a given address.


<Tabs
  groupId="GetTransactionsByAddress-usage"
  defaultValue="method"
  values={[
    {label: 'GetTransactionsByAddress', value: 'method'},
    {label: 'GetTransactionsByAddressReq', value: 'request'},
    {label: 'GetTransactionsByAddressResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc GetTransactionsByAddress(TransactionsByAddressReq) returns (TransactionsByAddressResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message TransactionsByAddressReq {
    string address = 1;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `address` | string | YES | QRL Address for lookup |


  </TabItem>
  <TabItem value="response">

```go
message TransactionsByAddressResp {
    uint32 code = 1;
    string error = 2;
    repeated MiniTransaction mini_transactions = 3;
    uint64 balance = 4;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | UInt32 | Error Code. Only appears if any exception is triggered. |
| `error` | String | Error Message. Only appears if any exception is triggered. |
| `mini_transactions` | repeated [MiniTransaction Message](#minitransaction) | <dl><dt>MiniTransaction Object contains:</dt><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}>out</dd><dd style={{ display:'list-item' }}>amount</dd></dl> |
| `balance` | uint64 | Address Balance up to current block |



:::note 
Please refer to the [MiniTransaction Message](#minitransaction)  content for more details.
:::

  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="GetTransactionsByAddress-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
~/go/bin/grpcurl -plaintext  \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"address": "Q010500ef0460016e66288852307d127add2763e7e9b0a4f4adf71ffa9f0d9e07ac34b586d93437"}' \
                 localhost:19010 \
                 qrl.WalletAPI.GetTransactionsByAddress
```


</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import json
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_transactions_by_address_req = qrlwallet_pb2.TransactionsByAddressReq(address="Q0002008815fa2cedae25de933ce25f4536ea988e768baa5031af59cef4816e13a81fb79241294c")
get_transactions_by_address_resp = peer_stub.GetTransactionsByAddress( get_transactions_by_address_req, timeout=10 )
print(get_transactions_by_address_resp)

```

</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  "miniTransactions": [
    {
      "transactionHash": "7841bd8bdd75c4eb42edc03d4450b54cc8eb211f8e2ca81322b48d92b7d79b19"
    },
    {
      "transactionHash": "05671910d2c51c5eda3ff0bc16860ff3e674a7e9d6b3febc592126a49dd864cb"
    },
    {
      "transactionHash": "2f697db9b3a48e7bfe1817a6bdb8f20fc383acd055cb4ce2e74b2df206641b5c"
    },
    {
      "transactionHash": "b722cb33c514f08a3ce2ffaa3d3aff3ac1fdfc6d6116142b5329e29355095c3d"
    },
    {
      "transactionHash": "c4b8ee6614acabe4c8f3d95e22531aa18b0a233a38ea58719ffa85711b3952d3"
    },
    {
      "transactionHash": "1e30eab4f1fa5737946f150560c0559ab7d1bdec969f20b69c66714ad764e041"
    }
  ]
}
```
</TabItem>
<TabItem value="err" label="Error" default>

```json {title="Invalid QRL Address"}
{
  "code": 1,
  "error": "hex string is expected to have an even number of characters"
}
```
</TabItem>
</Tabs>

</TabItem>
</Tabs>
<br />

---


### GetTransaction


Lookup a transaction on the QRL Blockchain using the transaction Hash
<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="GetTransaction"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Usage details

<Tabs
  groupId="GetTransaction-usage"
  defaultValue="method"
  values={[
    {label: 'GetTransaction', value: 'method'},
    {label: 'GetTransactionReq', value: 'request'},
    {label: 'GetTransactionResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc GetTransaction(TransactionReq) returns (TransactionResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message TransactionReq {
    string tx_hash = 1;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `tx_hash` | string | YES | Transaction hash to lookup |


  </TabItem>
  <TabItem value="response">

```go
message TransactionResp {
    uint32 code = 1;
    string error = 2;
    PlainTransaction tx = 3;
    string confirmations = 4;
    uint64 block_number = 5;
    string block_header_hash = 6;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | UInt32 | Error Code. Only appears if any exception is triggered. |
| `error` | String | Error Message. Only appears if any exception is triggered. |
| `tx` | [PlainTransaction OBJECT](#plaintransaction) | Return the transaction that has been relayed to the network. <dl><dt>PlainTransaction Object contains:</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}>signer_addr</dd>  <dd style={{ display:'list-item' }}> <dt>TRANSACTION_TYPE</dt></dd>   </dl> |
| `confirmations` | string | Details |
| `block_number` | uint64 | Details |
| `block_header_hash` | string | Details |



:::note 
Please refer to the [PlainTransaction Message](#plaintransaction) for more information and all available transaction types.
:::


  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="GetTransaction-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"tx_hash": "1e30eab4f1fa5737946f150560c0559ab7d1bdec969f20b69c66714ad764e041"}' \
                 localhost:19010 \
                 qrl.WalletAPI.GetTransaction
```

</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import json
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_transactions_req = qrlwallet_pb2.TransactionReq(tx_hash="1e30eab4f1fa5737946f150560c0559ab7d1bdec969f20b69c66714ad764e041")
get_transactions_resp = peer_stub.GetTransaction( get_transactions_req, timeout=10 )
print(get_transactions_resp)

```

</TabItem>
<TabItem value="resp" label="Response" default>

#### Transaction NOT Found

```json
{
  "tx": {
    
  },
  "confirmations": "0"
}
```

#### Transaction Found

```json
{
  "tx": {
    "publicKey": "010500d7a065ef79cdde072c3a0856722c49e40faadad72b540d8b8342e9662de8f11bd56c2eac4cd14dd9f6abe660ae63b5d0f1587cb1fd01827804b591f5b262822c",
    "signature": "0000000045e85cb618a995e8cc2c53b6f9fcf26ca15a5555155c3e4d255554b24c56c424ed1e8bf7cf86f8c5166615985450e3d74de70ce6aebb10d6dc19ff1e2a385ee1f4a9e33aad7aae6e8d360920f154eba0be83143be1f40c5d685f887a007257b091280ed30d37fa7f902d87a9f2e3178a4e78838ba59ce4be3956bc96bab6dd2753ba7a55108a51f9bfb97971677adfbb5eb1653cb3987d7c6d9f79d947bd02a5e9713523e375cbea8fe4845baa41f15ac476c45f9772596619e230e6595b2069011cac74b861a849bdc6d7b602b99f1a5490d06159bc354e148c66bb6a3257903395204cdc09cc38c603f84b7cd72c552f3dec21fe18e9214506d0031463e29ef858a9ed02db3352e4b407b1c365f25d4b0003102683b559230dd0eb716b6cb54ba5322019b7bbed23498822fee6d4d1c6d8380787522627906f35b3916acbbcb0b4df0e0c2e4cf53df61a0bf62099a137db52905eea1791443a9a8c1d13f2a6b35a7ad4264ace605f70b2df49db3bc6170ccaf3686b7b34c4086870c399fa45ae874238e1af84151320ef736dd1f450344bfd7dcd814d278015acecc25184a7b3e58ee2944f7ffd80030b962cb2f901072fc10bc491680397bfb26ee86ad06225bdf189367450eb40f98999934292096be4f3ea6fb26c4b2b8c169e928daeac6a7fc9a66ed8fc475ab4105b6dd09a7e2a9ba8eaac4dff661467bd283ca4e5f93ca2c5cb009d4f9ef011b0c96b69f1914a40e05e408ea30a2a2b374efe2337ccedde6e85bd8057dae6f829c5f8bc4b5963623dcd1cb1b8866532e436769b139ef941d37b8369ebec657d9da0dc307a6bf59c6ea925d0dd8c1065d8b550569619c5d2ca4eb6af712580fa2edf5317ddf2828a09815a384c48f51023f176558a8a52c1061e1085f73657da961802080fcdc4524427e7478aaa6ad25deef2fd70c3e90f117e781e27cf003dd95ee5e23dcb10f1dcf280c7b9a3add0671e5e9381a63bfcb337426c08a637572483aff6701ff0cd180d7def37d3cf20b5b5a4cd6bafa4e3f9e2cbaf198954b465669da4252e4794de935413dfbf3229d30bf6c14eeedc6841e805d786cf121e59b581578cf0a97335af0a23eb48104317e9e9c1a897f98972934721199a12565a749fdaad41fcf5be2124d67bab7825402f708175e0c0f6c1e74e83acf388a460eb920e43eecd4676eb3e92a1aa1342250a78d9b851b649c309e47cfa45f7b7edcd0b6831924c536f0ddc4bb18e23dc297f6211c6db41b6034f78253a063a6e5f8d72fbaae7a9cef287974dbac5249eb751a291947f621e15613109747a3e01dc563cf60d0b503610ea5150f38eb6b502349435f40b0da9e952111dede0d72527027ba7bf8d150c0e3e58053f4ab02d62d1a8c331e75cb4ab3c6b34e8a143c46d9c7c407d9e007dc1518607ebd6f3784ec7f76655a8680caa2c5e1215badcb803a2e00f85bce54a3de6d3d680ee99e9fecbee1be2b14112ed845c81275f35b2a5dc3a4259ead60b3e62e5e581d7103cd65b568bb3f2bb6ad902af8743b5106a9b1f094979b4a402e3771565d0c575b5f7bb6c9309f729e86462281632f6971fa3e8db74dadf4da518c7d8f59a4005d2ac7453e5503195f17c92f0a13d985c326d269034bff276698abdd835876f4498fbae744fc48695940dd62dc74f91514b8c2245c5959c37ac0531d51a21a041e84f055f38be3c16363ed483241b8faea4726f9f2781b1e88533b928e0049fbb346e0fb10d8eb4dfb6d65717b21e5527cb591e847824b39786a00e3fc7f88860d329e030df8ca0343bf96042a6c326c0eacdbdf0cd919d285765ac8cb9a40a4bbe4acea63f1e247b33646d2ebf1172d4194d2ff9c8d462439df8c1527b0fa5c2c46eeb817a50fe22d98fa56fe33655d6bc6cb7dbc3b4d180a01e698e171ff290a3049462397f94019b5f107a6974d8591b367225f4d0cf6d24596f2e75a10547400bc1a697f7fabae9fbbb8438f2077c7100b363cf0790b703e4c8265a66d6de5545613c840b04ea59f32ad034cbc269950b316f464e19852b17c9fe0d3446adc08db8174d35c8622b965b3b77e661e0e83da72abb42604156c4983bedfa43eb78ac831e621ba971a5ca7c309ee26360dea381b5b4fbf9033a9414e94669b71097eabf1d2ff7b3ba2f6639eff12f366e757cbbced9e8b3f8e0b7cf7fb1460a6708a194051490c5081a5789218fc14538566b29444951ad772e4c4ddc44e59e786df9ae0ce08f3f6d3e5d75ec948e1bf943990fa7d55d4f491b40aab264ac779f0f2cf80d3bf2a5519205ff1ebff693bb3359e4661537e15092894ad26bce6dadc99a94b57770c7f240a81ac29d90dda889bf36328327875327a416fb367032afcf6b073eab6e2670cc9a076a1dc9f311f340972c46ec7da5977f905350910115f7b53a455cfdf7fc449b511c449f3ec77f35ef2a7930238e1075aac9d130ca70f17a8e3ea1776f846fbdda507083f73f2659c281a05e1f1b907538be062b316059662d2712b8bfccb7c8af210184830aad5a27c317fec08d5dfad0710be32e741ff146ae7fca173cb603cb4fd616c61715373fa0f6598703427808d3277fd06d60cfbc6bb3e6c308bbf0eb80682eb9a660bbe550939c4d17c4f4803d0e0c12df56b1112021c1e5998c0b1b009ae80af3faa1c2fbb697e37974d9b7dc3dd0e3499a7b97633ee82ef93edc01463ae72f4e71148b69f717beb560cdb40f78156668436bc8b4d02b00fb27191daf91f1574c3a80a8b1649439d0a3f80050908389faddd1f2fe1301120172bca28c0fe6efa8820eceb69637f427e5a0f1d574e40bbe05a8cdc1593fa30b38e67f11a3351bbd27816652277f9d89664dc52c6b8c6178f69d4c372c103f5bc81bb5751d873c251a76f1fec92d17bcc28795e5365cfb742219347f750865b88a49d2b8576bd5ca00330303d916f980cb3665a82e2816ef7fb096f2045bfb562489b060342b3ea42040e11aa2216be56e9b7f9ac3aeff2c30dd665f6459fe5e797ed704c33052608d19f98b08231742a457c2b1d6fa5495f6f758cce184b3d86878f4550426dd6bfb28323dea37654614ae9e67e5c255b72fcaf052e4462ecc0489d5bf2f4dc0441bc70186a647f9cfe7794b31dcd7c004a0b9237ae663e5a19739067744b54a0c52d80645ccfbf31f7c2e3f683528e9c70383d289e8a3347e64bb6a9ef310a96a20d7fe8d315571d821be05a626e0c35ec14c19ce27480acf874ee783093f70599910517e0df47bdc9079ad4f5da3015497c06149da27d6dfab00397bca16d2c19833cf53318327fc2c6124fb3cb048d8c8cdad23e127f82af4681c38bddc79184cbae82c229d2673aebd814ddbc4ddbea8f3cb4ec73c393d284b5a3dbb40dc704a94601020aca0c764aca7b641cb7acad674b1729f0708e588ab44803ecad300cc698daa4c3c17015b10adb7ad0156bc2aedbef6df94a2dc1e270fb576e4bffe16e6d86eed2d679cb8038195bd1956fdbaa38d766d1959",
    "nonce": "1",
    "transactionHash": "1e30eab4f1fa5737946f150560c0559ab7d1bdec969f20b69c66714ad764e041",
    "signerAddr": "Q010500ef0460016e66288852307d127add2763e7e9b0a4f4adf71ffa9f0d9e07ac34b586d93437",
    "slave": {
      "slavePks": [
        "010500983a4553922addd3eb28b521dc01e861a272f227cf3f2a512caf96b3d3060cb1e71bfca2aa151b75a3f982cc8fd262a6afa3f991406e28df2b5fed85148ba93f",
        "010500ba0a745e05eb067ad36c2d6c371ba3207b4860358d070a141b71732e9bed3103a454bae738eca216651004f7cbef9dd656c3c8a94dae8c1e260438c9dc57bc71",
        "010500415875ba2516fe10f0f929cc2e62af6745dd99c1389047490b2a88a791cd0f91275dc28fbcaaaeaf4cb5dbe238de02b62884f89d45c8f3d34f820f75d414ba4e"
      ],
      "accessTypes": [
        0,
        0,
        0
      ]
    }
  },
  "confirmations": "1904",
  "blockNumber": "2684639",
  "blockHeaderHash": "5fc64f48b49c7f0f1c1092c51411c394a0dab3c262b4c3a1ef1720a504000000"
}
```
</TabItem>
<TabItem value="err" label="Error" default>

```json {title="Invalid tx_hash"}
{
  "code": 1,
  "error": "hex string is expected to have an even number of characters"
}

```
</TabItem>
</Tabs>

</TabItem>
</Tabs>
<br />

---


### GetBalance

Retrieve balance information for the address given.

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="GetBalance"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Returns the address balance in $shor$ if any available funds exist in this address.


:::info
Additional validation for an address can be found using the [QRL Block explorer](https://explorer.theqrl.org)
:::

<Tabs
  groupId="GetBalance-usage"
  defaultValue="method"
  values={[
    {label: 'GetBalance', value: 'method'},
    {label: 'GetBalanceReq', value: 'request'},
    {label: 'GetBalanceResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc GetBalance(BalanceReq) returns (BalanceResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message BalanceReq {
    string address = 1;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `address` | string | YES | QRL Address for balance lookup |


  </TabItem>
  <TabItem value="response">

```go
message BalanceResp {
    uint32 code = 1;
    string error = 2;
    string balance = 3;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | uint32 | Error Code. Only appears if any exception is triggered. |
| `error` | string | Error Message. Only appears if any exception is triggered. |
| `balance` | string | QRL Balance returned for the address queried in $Shor$ |


  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="GetBalance-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"address": "Q010500ef0460016e66288852307d127add2763e7e9b0a4f4adf71ffa9f0d9e07ac34b586d93437"}' \
                 localhost:19010 \
                 qrl.WalletAPI.GetBalance
```



</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
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

#### Balance not found

```json
{
  "balance": "0"
}
```

#### Balance Found

```json
{
  "balance": "1244552760000"
}
```

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

</TabItem>
</Tabs>
<br />

---


### GetTotalBalance

Return the balance for all QRL addresses contained in the main wallet.

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="Call"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

This method returns the sum of all balances found in the wallet.


<Tabs
  groupId="GetTotalBalance-usage"
  defaultValue="method"
  values={[
    {label: 'GetTotalBalance', value: 'method'},
    {label: 'GetTotalBalanceReq', value: 'request'},
    {label: 'GetTotalBalanceResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc GetTotalBalance(TotalBalanceReq) returns (TotalBalanceResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message TotalBalanceReq {
}
```

  </TabItem>
  <TabItem value="response">

```go
message TotalBalanceResp {
    uint32 code = 1;
    string error = 2;
    string balance = 3;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | uint32 | Error Code. Only appears if any exception is triggered. |
| `error` | string | Error Message. Only appears if any exception is triggered. |
| `balance` | string | Summed balance of all addresses in wallet in $shor$ |


  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="GetTotalBalance-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
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
                 qrl.WalletAPI.GetTotalBalance
```

</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_total_balance_req = qrlwallet_pb2.TotalBalanceReq()
get_total_balance_resp = peer_stub.GetTotalBalance( get_total_balance_req, timeout=10 )
print(get_total_balance_resp)
```


</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  "balance": "1000000000"
}

```
</TabItem>
<TabItem value="err" label="Error" default>

```json {title="ERROR-1"}

```
</TabItem>
</Tabs>



</TabItem>
</Tabs>
<br />

---


### GetOTS


Return 

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="GetOTS"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Usage details

<Tabs
  groupId="GetOTS-usage"
  defaultValue="method"
  values={[
    {label: 'GetOTS', value: 'method'},
    {label: 'GetOTSReq', value: 'request'},
    {label: 'GetOTSResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc GetOTS(OTSReq) returns (OTSResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message OTSReq {
    string address = 1;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `address` | string | YES | QRL Address to lookup OTS keys |

  </TabItem>
  <TabItem value="response">

```go
message OTSResp {
    uint32 code = 1;
    string error = 2;
    repeated OTSBitfieldByPage ots_bitfield_by_page = 3;
    uint64 next_unused_ots_index = 4;
    bool unused_ots_index_found = 5;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | uint32 | Error Code. Only appears if any exception is triggered. |
| `error` | string | Error Message. Only appears if any exception is triggered. |
| `ots_bitfield_by_page` | [OTSBitfieldByPage OBJECT](#otsbitfieldbypage) | <dl><dt>OTSBitfieldByPage</dt><dd style={{ display:'list-item' }}>ots_bitfield</dd><dd style={{ display:'list-item' }}>page_number</dd></dl> |
| `next_unused_ots_index` | uint64 | Next unused OTS key available for use |
| `unused_ots_index_found` | bool | Returns true if there are available OTS keys in the address |

:::note 
Please refer to the [OTSBitfieldByPage Message](#otsbitfieldbypage) content for more details.
:::

  </TabItem>
</Tabs>

</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="GetOTS-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"address": "Q000300e2acf7cab2b722f350af276468c6657610625f4b247e40e17607df20735bce04d08d285c"}' \
                 localhost:19010 \
                 qrl.WalletAPI.GetOTS
```



</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_ots_req = qrlwallet_pb2.OTSReq(address="Q000300c37ba50e616cd36c9e4ca6e35c533da903df9f3f73e80352162795bd8872e464e09b8091")
get_ots_resp = peer_stub.GetOTS( get_ots_req, timeout=10 )
print(get_ots_resp)
```

</TabItem>
<TabItem value="resp" label="Response" default>


#### No used OTS Keys

```json
{
  "unusedOtsIndexFound": true
}
```

#### Address with OTS Keys Used

```json
{
  "nextUnusedOtsIndex": "5",
  "unusedOtsIndexFound": true
}
```

</TabItem>
<TabItem value="err" label="Error" default>

```json {title="ERROR-1"}

```
</TabItem>
</Tabs>


</TabItem>
</Tabs>
<br />

---







### GetHeight

Returns the block height of the `walletd` connected node

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="GetHeight"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

This method will return the latest block height known the the node that is connected to the walletd.


<Tabs
  groupId="GetHeight-usage"
  defaultValue="method"
  values={[
    {label: 'GetHeight', value: 'method'},
    {label: 'GetHeightReq', value: 'request'},
    {label: 'GetHeightResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc GetHeight(HeightReq) returns (HeightResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message GetHeightReq {
}
```

  </TabItem>
  <TabItem value="response">

```go
message GetHeightResp {
    uint64 height = 1;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `height` | uint64 | Block height from node |


  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="GetHeight-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
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
                 qrl.WalletAPI.GetHeight
```



</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_height_req = qrlwallet_pb2.GetHeightReq()
get_height_resp = peer_stub.GetHeight( get_height_req, timeout=10 )
print(get_height_resp)
```


</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  "height": "2686599"
}
```
</TabItem>
<TabItem value="err" label="Error" default>

```json {title="ERROR-1"}

```
</TabItem>
</Tabs>



</TabItem>
</Tabs>
<br />

---

### GetBlock


Return block data for given block header hash

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="GetBlock"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Returns PlainBlock details for a given block header hash

<Tabs
  groupId="GetBlock-usage"
  defaultValue="method"
  values={[
    {label: 'GetBlock', value: 'method'},
    {label: 'GetBlockReq', value: 'request'},
    {label: 'GetBlockResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc GetBlock(BlockReq) returns (BlockResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message BlockReq {
    string header_hash = 1;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `header_hash` | string | YES | Block header hash for lookup |


  </TabItem>
  <TabItem value="response">

```go
message BlockResp {
    uint32 code = 1;
    string error = 2;
    PlainBlock block = 3;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | uint32 | Error Code. Only appears if any exception is triggered. |
| `error` | string | Error Message. Only appears if any exception is triggered. |
| `block` | [PlainBlock OBJECT](#plainblock) | <dl><dt>PlainBlock Object contains:</dt> <dd style={{ display:'list-item' }}> <dt>header</dt> <dd style={{ display:'list-item' }}>hash_header</dd><dd style={{ display:'list-item' }}>block_number</dd><dd style={{ display:'list-item' }}>timestamp_seconds</dd><dd style={{ display:'list-item' }}>hash_header_prev</dd><dd style={{ display:'list-item' }}>reward_block</dd><dd style={{ display:'list-item' }}>reward_fee</dd><dd style={{ display:'list-item' }}>merkle_root</dd><dd style={{ display:'list-item' }}>mining_nonce</dd><dd style={{ display:'list-item' }}>extra_nonce</dd></dd> <dd style={{ display:'list-item' }}>          <dt>transactions</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}>signer_addr</dd>  <dd style={{ display:'list-item' }}> <dt>TRANSACTION_TYPE</dt></dd></dd><dd style={{ display:'list-item' }}><dt>genesis_balance</dt>  <dd style={{ display:'list-item' }}>address</dd><dd style={{ display:'list-item' }}>balance</dd></dd></dl> |

:::note 
Please refer to the following messages related to the block response:

- [PlainBlock message](#plainblock)
- [PlainBlockHeader Message](#plainblockheader) 
- [PlainGenesisBalance message](#plaingenesisbalance) 
:::

  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="GetBlock-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
~/go/bin/grpcurl -plaintext \
                 -import-path ~/qrl/src/qrl/protos/ \
                 -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                 -d '{"header_hash": "e962ac52d457196a8832cfd57304fc080537f3851a6fc34c3b007bc0ca000000"}' \
                 localhost:19010 \
                 qrl.WalletAPI.GetBlock
```

</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_block_req = qrlwallet_pb2.BlockReq()
get_block_resp = peer_stub.GetBlock( get_block_req, timeout=10 )
print(get_block_resp)
```

</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  "block": {
    "header": {
      "hashHeader": "e962ac52d457196a8832cfd57304fc080537f3851a6fc34c3b007bc0ca000000",
      "blockNumber": "15",
      "timestampSeconds": "1530015361",
      "hashHeaderPrev": "cb81bf3bf3a3d7df8039934c178c8f2f6c55765fd3408f84ac18e18a15000000",
      "rewardBlock": "6656333953",
      "rewardFee": "1000000",
      "merkleRoot": "fe046e2eef141801badb5c6f180ecce2b66659bb0ca29862437c4fa6b4d52645",
      "miningNonce": 2781151944,
      "extraNonce": "16980399104"
    },
    "transactions": [
      {
        "masterAddr": "Q0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "16",
        "transactionHash": "269f1f53a87dcaa87aa27ca6abf945109abf5d11cf28a6e3f9dae6bc73a2e606",
        "coinbase": {
          "addrTo": "Q0106001d34628da087339ddd650a843e131fa4a3f3b107e9b6222d609f6dad3860b4798cc5b361",
          "amount": "6657333953"
        }
      },
      {
        "fee": "1000000",
        "publicKey": "000600b3a4edefe61e5fab0465f4de68a500305ed1014447eca85cb36be74d6db72eb5417fe14215eafcedcad872c531f6eade1c7ba04c6f89fed2b07183c180c93abf",
        "signature": "000000007f137e3b767bfe09fb179cf1e5a58165cf94f3aab91bbe459cf9c93de15dd545deec21bdbc5ab30f688faf92a40c23cb520249d94179e7dab12f7bd247abfc3bc1ccb5fddebc80c4723aebe5aa650f5a8fb81254486a4f3ca53330e3fc8e0fdf849c690ee4c1117fe90dc39c0fea886feae337393261de53fa41a7ffa780431c33f7054ab08d404f94b3b07b4a9d96b3a8a78b1df2f9219baf39ec04359d4dcc48a6ae24ff439df55201140d3db61fecbcb6426c7e5819f67b21ba13e0d431ee14e700d2cd4cba38ced917daee81f16905ac9dcb57a552dc2ef0ee946e848b6548897fb2554c8588b38028d5a7335bd02f0932d65ea9beac6ab72a4b06ab4225fae4d56b8fabb1ee926d253d3c8027369f18771f08e161a8738d1a029081906c762a7c690a900c91222837c2ee0af8db281b5dd42b121a572fe42520793513041551b55e9d892e3dd6aa59d378d9c83001b3ed5fecad58e2f045ed70e0e3b8e2f44287a785eb28725e7e75b5f497232efbeaa15d0b97cdcc66f9d056e13312ca8236c5296008b76a44db87b2d3b0980759eea9d338a3804a9e44b191a3e6f3d38e73fef4670bc4ce66b3ef8c539ec0ddc8808c3695a57d80a1284b70ff715bf8c1234fe28c666fcc0e264482249b0082f843a49571ff734241f37d92ae1432fdc737bf59186084eee2992a165ec4033cc6084cb7c8b76b761cec61237ab654cea8ee7bac7cde86eff5c4983d2e64f92f28b1255cd6e7c0ec3b4b3049e4fe75930d4790199b25a9e1a8fadf7614122f29f4a2a60a011c785e13fb9e0c6496c8404c705f808543518b255422119757cbf3d1ddcafa0055101b0a79649f3e8052c385618556e1cf1f71f14ecb727a94d241051bf0916fe06d2733f20d5e95971ef35d12f384c8353391f275d7285b902acc2da93c02e9ad3e7a0d9d9417cb16946b8617e59f2d9266cd4505ad8c2ffa3464dc1d643c20a7fa331563402747b6a4d1ce07d160e87ffbf6f3472ee9de8d29f791e7e18c6e7f7041b219c926683698aa12eac73c57c700e38629680f5e3fd09ee06de49c9ff0c6e5915b3666c42fb2978dea8287cf539c4659011feafb534b4249edfbfad6615884ce1112df85a1c5dfddb8e27cfd3caab00564d0de8ce0e3c9c2cd5e59816a1aa9f26a8a4ef965a1f6de2eb62762b7021fd28c7d71862f83d92ca9e687e6c7968956127f18e21c4e95591f46362f05a91f12c0204be31012d90de2d1aa1f04f64dacf5d35e0f01b3bdd0ef071596f9235e3a61be09a4bdfcc29baf7ca301475eb530d9fb2cb3bcbcebf8699136481c92244e97a182317c52fe2a53f8317a861a6da45a8991dbe1edbd20a5edd4707d46a92e5ac4d7170fe381db62c0d833ecf9cfa99632fc501e3f560e8be2ecebddc28215de43028524c0f4347c82a3a0b4322d67d52bb038c97612c5eda67cfc3eafc84246030462dcd094628e2604b3c5e449e15ea1e79a88305a1fafcd6dfb462c871e7531c1058324f73cd513255e71a3213ebf2825e3aef09e614af62e3f8af0e21a34a822b91b118c2e61ffcddbb4e589ecf3232cccb28356a496091a9b81e9d776d5668df323036c4e53adf63027f9034f3d4b734e829a0feb701b79be1a094dfe469e03afc19a6d74a882805a43c234fd319040ca6032148716a2c7efac64b6123d15918bf337b0473bf56c1265573bb2e9cd6169c73af3e1b9b0e02df3ba0231696ea614ee0eaad3a038fb31bce5bbb4bd7c51b9c64c30eee78eb1e75b7d17c37bd4de8150969144996059f12f9ae77c325c12be7cd0ba3e0048ab2178aa1564f182431e99095bdcc1c23cad13c9d2913578c020fea9ec5faef26f444404483cd3dde4f661f5a8a84296a8f927c062b45ba4cd5f09afef131607ccca4b62d3840aa8b59447e92f55d732556d2b12aec3b6f82b7c9155c6ae2a16c59f385a3dd1e6d181821c0b6ce4c195f3ff8f12856d4232109ea152208585823faa86b28b78fd4dd8750a1867845fb821ddf6421ccc7a642f3bffb6b8ac6fbb7084e60ad99910fddd374d441cfbe75408f84b2800c2d3ec6c7a2d4a8754b778ab53673bbf61405afe601ba7b7429866895566812732a521926c8f5244a369da01287303e8c11588370681aa8db3b9fed19f8cafb95e3895f083aee11b6317e8cdb754000d31a80480fc38b9bd5f645d69eeba4719a916f23e1aa4b5551ce89b24d8fc1cd597b449402d023c65386522191d73f7bb9922258a8e2388d624bae85a5dde48f17ebbbb619892a1a53e26d27fef74bbfa90db6891b08044eb77e06e3371bfd28de824755c485669903e8e0582b5c153a38e867b76416c467b0d62fa1310ccfd4e3e0879e9c3c9fb454295d465020b3afd285a85a71a9dcc209d05472df69bba7a372987ee6f287fc687a1fb3013465709704aec65a010474bac5f6fb868e9416acef3b5a9f363087dffe7459cdcc84b6717ed9937f654ee3f7a65b55dd7c5bc7f56680f3debc161af8589fadb8f59267f53cf1dadbdac88b6af7648461cf39d5d64ae0cebe716bf6a20ad53945a7295690d42b1d1b2b3ac70394282595b4bcbfd18e835629d97fca0c6157cd96b57a56aa25aceeaf8dd0ea4b72036448cfd3b697ffd1de4b54d92304f5f0766a787e3a2cf7f955323518c944d177a02f36371204b7f7110ef70b23ea8407f1d506fbf59d743bdbc462d045e870447612f0ebf42d6388166ed953ae4633f37a8d5031a08006a4028a92413605945cc1ef4c0bcad46c02c5083cab88120e47ccc8a7929629e8248f2fb3ca0d89c14996755e99b5ab098b7ffad9fd503db2820ba49705e9c1bbfe5b2a478379da8299366ec8b4100677c096805f0bc5c70444b31cafaba496976bb7a3e968caebb7db635b810780fbf1c662f49a2a66fb0a3492065d84b43a5023becbcd870566612d0fef03337247cdaf39fe0d31e1534be46cd9e944cbb6977507f8375f198d72ba81a7fa6925860304af4d2bbf45a1d0e942501694f4449163ec57b5fc224c731bb8ba8c7c53222b8ed0dcab6f5ca23d67dafe89e3389551a78c16e3254e63cbd63a44dacf5ccd06a477999d119de6c758aaf8ff4c0d3348d5dd6699774f7a7acfc3d67ac3110cad0276fa39195bc4a02a5ffdb31d67b1320082833ba3d63cf934922430a43186d2a71c13d36c2cf5654cdf2fdb4f8f316a010f7db21aeeb145ddb9eb8b5e3a08545567fa050b031e7eb8348853b1118aab5ce4b81579ecb3780df913f8121cd2aabb5bfcdb6c4683fef472c613ebd9cccc71d58f04a7682d3f18eb397ac152ed2e1091a38c8244ba31988a740a98909f6724dfb0a98d7924dc5b981d2d53b0b65e374a1b1575991723b7101dc52f49358bab04fc3b978cef880a97ce62ff4a8febc095276b0d0bfe085af76be01025eed7a96a0cab8ac9d192b2c16f16e089a40e88cc410892fbaa57e08b704b68df99e4c2b8c197861918cfe7466a08d72fea4afa89c7d3cda0c91e659190b2816d3e08176207b9defe695fd236919de1818f733573867730ea11496a4d554760b9c175da377887d14b3df5f88a0ebc6d1008efd0beef6bc2db9908896d9e14167d17381665ac8fd254b",
        "nonce": "1",
        "transactionHash": "bc64bd33a69ead60a8123d01a9b5b923067b8f2c388e9102109fdbd6e2f9a1cd",
        "signerAddr": "Q0006003c7a58a7e75cfdf557a3c3a2dcb9da04f0e108254487afc7f2606eba809b3337df630d6b",
        "token": {
          "symbol": "Fr1t2",
          "name": "Fr1t2",
          "owner": "Q0006003c7a58a7e75cfdf557a3c3a2dcb9da04f0e108254487afc7f2606eba809b3337df630d6b",
          "decimals": "10",
          "initialBalances": [
            {
              "address": "0006003c7a58a7e75cfdf557a3c3a2dcb9da04f0e108254487afc7f2606eba809b3337df630d6b",
              "amount": "1000000000000000000"
            }
          ]
        }
      }
    ]
  }
}
```
</TabItem>
<TabItem value="err" label="Error" default>

```json {title="Invalid Hex String"}
{
  "code": 1,
  "error": "hex string is expected to have an even number of characters"
}
```



```json {title="No Block Found"}
{
  "block": {
    "header": {
      
    }
  }
}
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>
<br />

---


### GetBlockByNumber

Get QRL block data by block number from the QRL Blockchain.

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="GetBlockByNumber"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Using a previously mined block number to lookup block data on-chain.


<Tabs
  groupId="GetBlockByNumber-usage"
  defaultValue="method"
  values={[
    {label: 'GetBlockByNumber', value: 'method'},
    {label: 'GetBlockByNumberReq', value: 'request'},
    {label: 'GetBlockByNumberResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc GetBlockByNumber(BlockByNumberReq) returns (BlockResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message BlockByNumberReq {
    uint64 block_number = 1;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `block_number` | uint64 | YES | Block number to lookup |


  </TabItem>
  <TabItem value="response">

```go
message BlockResp {
    uint32 code = 1;
    string error = 2;
    PlainBlock block = 3;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | uint32 | Error Code. Only appears if any exception is triggered. |
| `error` | string | Error Message. Only appears if any exception is triggered. |
| `block` | [PlainBlock OBJECT](#plainblock) | <dl><dt>PlainBlock Object contains:</dt> <dd style={{ display:'list-item' }}> <dt>header</dt> <dd style={{ display:'list-item' }}>hash_header</dd><dd style={{ display:'list-item' }}>block_number</dd><dd style={{ display:'list-item' }}>timestamp_seconds</dd><dd style={{ display:'list-item' }}>hash_header_prev</dd><dd style={{ display:'list-item' }}>reward_block</dd><dd style={{ display:'list-item' }}>reward_fee</dd><dd style={{ display:'list-item' }}>merkle_root</dd><dd style={{ display:'list-item' }}>mining_nonce</dd><dd style={{ display:'list-item' }}>extra_nonce</dd></dd> <dd style={{ display:'list-item' }}>          <dt>transactions</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}>signer_addr</dd>  <dd style={{ display:'list-item' }}> <dt>TRANSACTION_TYPE</dt></dd></dd><dd style={{ display:'list-item' }}><dt>genesis_balance</dt>  <dd style={{ display:'list-item' }}>address</dd><dd style={{ display:'list-item' }}>balance</dd></dd></dl> |




:::note 
Please refer to the following messages related to the block response:

- [PlainBlock message](#plainblock)
- [PlainBlockHeader Message](#plainblockheader) 
- [PlainGenesisBalance message](#plaingenesisbalance) 
:::

  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="GetBlockByNumber-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
 ~/go/bin/grpcurl -plaintext \
                  -import-path ~/qrl/src/qrl/protos/ \
                  -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                  -d '{"block_number": 15}' \
                  localhost:19010 \
                  qrl.WalletAPI.GetBlockByNumber
```

</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_block_by_num_req = qrlwallet_pb2.BlockByNumberReq()
get_block_by_num_resp = peer_stub.GetBlockByNumber( get_block_by_num_req, timeout=10 )
print(get_block_by_num_resp)
```


</TabItem>
<TabItem value="resp" label="Response" default>

```json
{ 
  "block": {
    "header": {
      "hashHeader": "e962ac52d457196a8832cfd57304fc080537f3851a6fc34c3b007bc0ca000000",
      "blockNumber": "15",
      "timestampSeconds": "1530015361",
      "hashHeaderPrev": "cb81bf3bf3a3d7df8039934c178c8f2f6c55765fd3408f84ac18e18a15000000",
      "rewardBlock": "6656333953",
      "rewardFee": "1000000",
      "merkleRoot": "fe046e2eef141801badb5c6f180ecce2b66659bb0ca29862437c4fa6b4d52645",
      "miningNonce": 2781151944,
      "extraNonce": "16980399104"
    },
    "transactions": [
      { 
        "masterAddr": "Q0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "16",
        "transactionHash": "269f1f53a87dcaa87aa27ca6abf945109abf5d11cf28a6e3f9dae6bc73a2e606",
        "coinbase": {
          "addrTo": "Q0106001d34628da087339ddd650a843e131fa4a3f3b107e9b6222d609f6dad3860b4798cc5b361",
          "amount": "6657333953"
        }
      },
      { 
        "fee": "1000000",
        "publicKey": "000600b3a4edefe61e5fab0465f4de68a500305ed1014447eca85cb36be74d6db72eb5417fe14215eafcedcad872c531f6eade1c7ba04c6f89fed2b07183c180c93abf",
        "signature": "000000007f137e3b767bfe09fb179cf1e5a58165cf94f3aab91bbe459cf9c93de15dd545deec21bdbc5ab30f688faf92a40c23cb520249d94179e7dab12f7bd247abfc3bc1ccb5fddebc80c4723aebe5aa650f5a8fb81254486a4f3ca53330e3fc8e0fdf849c690ee4c1117fe90dc39c0fea886feae337393261de53fa41a7ffa780431c33f7054ab08d404f94b3b07b4a9d96b3a8a78b1df2f9219baf39ec04359d4dcc48a6ae24ff439df55201140d3db61fecbcb6426c7e5819f67b21ba13e0d431ee14e700d2cd4cba38ced917daee81f16905ac9dcb57a552dc2ef0ee946e848b6548897fb2554c8588b38028d5a7335bd02f0932d65ea9beac6ab72a4b06ab4225fae4d56b8fabb1ee926d253d3c8027369f18771f08e161a8738d1a029081906c762a7c690a900c91222837c2ee0af8db281b5dd42b121a572fe42520793513041551b55e9d892e3dd6aa59d378d9c83001b3ed5fecad58e2f045ed70e0e3b8e2f44287a785eb28725e7e75b5f497232efbeaa15d0b97cdcc66f9d056e13312ca8236c5296008b76a44db87b2d3b0980759eea9d338a3804a9e44b191a3e6f3d38e73fef4670bc4ce66b3ef8c539ec0ddc8808c3695a57d80a1284b70ff715bf8c1234fe28c666fcc0e264482249b0082f843a49571ff734241f37d92ae1432fdc737bf59186084eee2992a165ec4033cc6084cb7c8b76b761cec61237ab654cea8ee7bac7cde86eff5c4983d2e64f92f28b1255cd6e7c0ec3b4b3049e4fe75930d4790199b25a9e1a8fadf7614122f29f4a2a60a011c785e13fb9e0c6496c8404c705f808543518b255422119757cbf3d1ddcafa0055101b0a79649f3e8052c385618556e1cf1f71f14ecb727a94d241051bf0916fe06d2733f20d5e95971ef35d12f384c8353391f275d7285b902acc2da93c02e9ad3e7a0d9d9417cb16946b8617e59f2d9266cd4505ad8c2ffa3464dc1d643c20a7fa331563402747b6a4d1ce07d160e87ffbf6f3472ee9de8d29f791e7e18c6e7f7041b219c926683698aa12eac73c57c700e38629680f5e3fd09ee06de49c9ff0c6e5915b3666c42fb2978dea8287cf539c4659011feafb534b4249edfbfad6615884ce1112df85a1c5dfddb8e27cfd3caab00564d0de8ce0e3c9c2cd5e59816a1aa9f26a8a4ef965a1f6de2eb62762b7021fd28c7d71862f83d92ca9e687e6c7968956127f18e21c4e95591f46362f05a91f12c0204be31012d90de2d1aa1f04f64dacf5d35e0f01b3bdd0ef071596f9235e3a61be09a4bdfcc29baf7ca301475eb530d9fb2cb3bcbcebf8699136481c92244e97a182317c52fe2a53f8317a861a6da45a8991dbe1edbd20a5edd4707d46a92e5ac4d7170fe381db62c0d833ecf9cfa99632fc501e3f560e8be2ecebddc28215de43028524c0f4347c82a3a0b4322d67d52bb038c97612c5eda67cfc3eafc84246030462dcd094628e2604b3c5e449e15ea1e79a88305a1fafcd6dfb462c871e7531c1058324f73cd513255e71a3213ebf2825e3aef09e614af62e3f8af0e21a34a822b91b118c2e61ffcddbb4e589ecf3232cccb28356a496091a9b81e9d776d5668df323036c4e53adf63027f9034f3d4b734e829a0feb701b79be1a094dfe469e03afc19a6d74a882805a43c234fd319040ca6032148716a2c7efac64b6123d15918bf337b0473bf56c1265573bb2e9cd6169c73af3e1b9b0e02df3ba0231696ea614ee0eaad3a038fb31bce5bbb4bd7c51b9c64c30eee78eb1e75b7d17c37bd4de8150969144996059f12f9ae77c325c12be7cd0ba3e0048ab2178aa1564f182431e99095bdcc1c23cad13c9d2913578c020fea9ec5faef26f444404483cd3dde4f661f5a8a84296a8f927c062b45ba4cd5f09afef131607ccca4b62d3840aa8b59447e92f55d732556d2b12aec3b6f82b7c9155c6ae2a16c59f385a3dd1e6d181821c0b6ce4c195f3ff8f12856d4232109ea152208585823faa86b28b78fd4dd8750a1867845fb821ddf6421ccc7a642f3bffb6b8ac6fbb7084e60ad99910fddd374d441cfbe75408f84b2800c2d3ec6c7a2d4a8754b778ab53673bbf61405afe601ba7b7429866895566812732a521926c8f5244a369da01287303e8c11588370681aa8db3b9fed19f8cafb95e3895f083aee11b6317e8cdb754000d31a80480fc38b9bd5f645d69eeba4719a916f23e1aa4b5551ce89b24d8fc1cd597b449402d023c65386522191d73f7bb9922258a8e2388d624bae85a5dde48f17ebbbb619892a1a53e26d27fef74bbfa90db6891b08044eb77e06e3371bfd28de824755c485669903e8e0582b5c153a38e867b76416c467b0d62fa1310ccfd4e3e0879e9c3c9fb454295d465020b3afd285a85a71a9dcc209d05472df69bba7a372987ee6f287fc687a1fb3013465709704aec65a010474bac5f6fb868e9416acef3b5a9f363087dffe7459cdcc84b6717ed9937f654ee3f7a65b55dd7c5bc7f56680f3debc161af8589fadb8f59267f53cf1dadbdac88b6af7648461cf39d5d64ae0cebe716bf6a20ad53945a7295690d42b1d1b2b3ac70394282595b4bcbfd18e835629d97fca0c6157cd96b57a56aa25aceeaf8dd0ea4b72036448cfd3b697ffd1de4b54d92304f5f0766a787e3a2cf7f955323518c944d177a02f36371204b7f7110ef70b23ea8407f1d506fbf59d743bdbc462d045e870447612f0ebf42d6388166ed953ae4633f37a8d5031a08006a4028a92413605945cc1ef4c0bcad46c02c5083cab88120e47ccc8a7929629e8248f2fb3ca0d89c14996755e99b5ab098b7ffad9fd503db2820ba49705e9c1bbfe5b2a478379da8299366ec8b4100677c096805f0bc5c70444b31cafaba496976bb7a3e968caebb7db635b810780fbf1c662f49a2a66fb0a3492065d84b43a5023becbcd870566612d0fef03337247cdaf39fe0d31e1534be46cd9e944cbb6977507f8375f198d72ba81a7fa6925860304af4d2bbf45a1d0e942501694f4449163ec57b5fc224c731bb8ba8c7c53222b8ed0dcab6f5ca23d67dafe89e3389551a78c16e3254e63cbd63a44dacf5ccd06a477999d119de6c758aaf8ff4c0d3348d5dd6699774f7a7acfc3d67ac3110cad0276fa39195bc4a02a5ffdb31d67b1320082833ba3d63cf934922430a43186d2a71c13d36c2cf5654cdf2fdb4f8f316a010f7db21aeeb145ddb9eb8b5e3a08545567fa050b031e7eb8348853b1118aab5ce4b81579ecb3780df913f8121cd2aabb5bfcdb6c4683fef472c613ebd9cccc71d58f04a7682d3f18eb397ac152ed2e1091a38c8244ba31988a740a98909f6724dfb0a98d7924dc5b981d2d53b0b65e374a1b1575991723b7101dc52f49358bab04fc3b978cef880a97ce62ff4a8febc095276b0d0bfe085af76be01025eed7a96a0cab8ac9d192b2c16f16e089a40e88cc410892fbaa57e08b704b68df99e4c2b8c197861918cfe7466a08d72fea4afa89c7d3cda0c91e659190b2816d3e08176207b9defe695fd236919de1818f733573867730ea11496a4d554760b9c175da377887d14b3df5f88a0ebc6d1008efd0beef6bc2db9908896d9e14167d17381665ac8fd254b",
        "nonce": "1",
        "transactionHash": "bc64bd33a69ead60a8123d01a9b5b923067b8f2c388e9102109fdbd6e2f9a1cd",
        "signerAddr": "Q0006003c7a58a7e75cfdf557a3c3a2dcb9da04f0e108254487afc7f2606eba809b3337df630d6b",
        "token": {
          "symbol": "Fr1t2",
          "name": "Fr1t2",
          "owner": "Q0006003c7a58a7e75cfdf557a3c3a2dcb9da04f0e108254487afc7f2606eba809b3337df630d6b",
          "decimals": "10",
          "initialBalances": [
            { 
              "address": "0006003c7a58a7e75cfdf557a3c3a2dcb9da04f0e108254487afc7f2606eba809b3337df630d6b",
              "amount": "1000000000000000000"
            }
          ]
        }
      }
    ]
  }
}
```
</TabItem>
<TabItem value="err" label="Error" default>


</TabItem>
</Tabs>

</TabItem>
</Tabs>
<br />

---


### GetAddressFromPK


Returns typical QRL Address `Q00010...` from PK address `01060089256a7ea3...`

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="Call"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'Code', value: 'code'},
    ]}>

<TabItem value="usage">

Provide the PK of a QRL address and return the typical address prepended with a `Q`.

<Tabs
  groupId="GetAddressFromPK-usage"
  defaultValue="method"
  values={[
    {label: 'GetAddressFromPK', value: 'method'},
    {label: 'GetAddressFromPKReq', value: 'request'},
    {label: 'GetAddressFromPKResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc GetAddressFromPK(AddressFromPKReq) returns (AddressFromPKResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message AddressFromPKReq {
    string pk = 1;
}
```

| Field | Type | Required| Details | 
| :--: | :---: | :--: | :--- |
| `pk` | string | YES | QRL raw PK string `01060089256a7ea3...` |


  </TabItem>
  <TabItem value="response">

```go
message AddressFromPKResp {
    uint32 code = 1;
    string error = 2;
    string address = 3;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | uint32 | Error Code. Only appears if any exception is triggered. |
| `error` | string | Error Message. Only appears if any exception is triggered. |
| `address` | string | Returns correctly formatted QRL address `Q00010...` |


  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="GetAddressFromPK-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash 
 ~/go/bin/grpcurl -plaintext \
                  -import-path ~/qrl/src/qrl/protos/ \
                  -proto ~/qrl/src/qrl/protos/qrlwallet.proto \
                  -d '{"pk": "01060089256a7ea32fd0634d21f519b257bbf1fd73d9a4dc873031b5a6b3369acdd860397bb5c938a60d70d815f8be5c9f34afd2b7f29abaf991d1c3c2e3367d81580e"}' \
                  localhost:19010 \
                  qrl.WalletAPI.GetAddressFromPK
```

</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_address_from_pk_req = qrlwallet_pb2.AddressFromPKReq()
get_address_from_pk_resp = peer_stub.GetAddressFromPK( get_address_from_pk_req, timeout=10 )
print(get_address_from_pk_resp)
```


</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  "address": "Q010600cdb476b0a5a8a69e480266023e2595fe44f42218e03ebdc8a3d5581eb4505bdd598c89e7"
}
```
</TabItem>
<TabItem value="err" label="Error" default>

```json {title="ERROR-1"}

```
</TabItem>
</Tabs>

</TabItem>
</Tabs>
<br />

---


### GetNodeInfo



Returns the node information for the connected QRL node.

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
  groupId="GetNodeInfo-usage"
  defaultValue="method"
  values={[
    {label: 'GetNodeInfo', value: 'method'},
    {label: 'GetNodeInfoReq', value: 'request'},
    {label: 'GetNodeInfoResp', value: 'response'},
  ]}>
  <TabItem value="method">

```go
service WalletAPI {
    rpc GetNodeInfo(NodeInfoReq) returns (NodeInfoResp);
}
```
  
  </TabItem>
  <TabItem value="request">

```go
message NodeInfoReq {
}
```

  </TabItem>
  <TabItem value="response">

```go
message NodeInfoResp {
    uint32 code = 1;
    string error = 2;

    string version = 3;
    string num_connections = 4;
    string num_known_peers = 5;
    uint64 uptime = 6;               // Uptime in seconds
    uint64 block_height = 7;
    string block_last_hash = 8;
    string network_id = 9;
}
```

| Field | Type | Details | 
| :--: | :---: | :--- |
| `code` | uint32 | Error Code. Only appears if any exception is triggered. |
| `error` | string | Error Message. Only appears if any exception is triggered. |
| `version` | string | Version of the [QRL software](https://github.com/theQRL/QRL/releases/latest) running on the node i.e. `4.0.2 python` |
| `num_connections` | string | Number of connections known to the QRL node |
| `num_known_peers` | string | Number of known peers seen recently by the node |
| `uptime` | uint64 | Length of time in seconds |
| `block_height` | uint64 | Last Blockheight know to node, this will advance as new blocks are mined |
| `block_last_hash` | string | Last block header hash |
| `network_id` | string | String ID of the version of code |


  </TabItem>
</Tabs>


</TabItem>
<TabItem value="code" label="Code">

Example code below.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="GetNodeInfo-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
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
                 qrl.WalletAPI.GetNodeInfo
```



</TabItem>    

<TabItem value="pyreq" label="Python Request" default>

```python 
import grpc
from qrl.generated import qrlwallet_pb2_grpc, qrlwallet_pb2

peer_grpc_channel = grpc.insecure_channel( '127.0.0.1:19010', options=(('grpc.enable_http_proxy', 0),))
peer_stub = qrlwallet_pb2_grpc.WalletAPIStub(peer_grpc_channel)
get_node_info_req = qrlwallet_pb2.NodeInfoReq()
get_node_info_resp = peer_stub.GetNodeInfo( get_node_info_req, timeout=10 )
print(get_node_info_resp)
```


</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  "version": "4.0.2 python",
  "numConnections": "21",
  "numKnownPeers": "22",
  "uptime": "81945",
  "blockHeight": "2687766",
  "blockLastHash": "a14f5561ac9a8fc99194ec809a7eb26909c127d482466a3712d59e8705000000",
  "networkId": "The sleeper must awaken"
}
```
</TabItem>
<TabItem value="err" label="Error" default>

#### QRL Node Not Running

```json {title="InactiveRpcError of RPC that terminated"}
{
  "code": 1,
  "error": "\u003c_InactiveRpcError of RPC that terminated with:\n\tstatus = StatusCode.UNAVAILABLE\n\tdetails = \"failed to connect to all addresses; last error: UNKNOWN: ipv4:127.0.0.1:19009: Failed to connect to remote host: Connection refused\"\n\tdebug_error_string = \"UNKNOWN:failed to connect to all addresses; last error: UNKNOWN: ipv4:127.0.0.1:19009: Failed to connect to remote host: Connection refused {grpc_status:14, created_time:\"2023-07-28T12:09:31.780424373-06:00\"}\"\n\u003e"
}

```
</TabItem>
</Tabs>



</TabItem>
</Tabs>
<br />

---







## Messages

These golang messages support the methods above.



| Message Name | Details | 
| :-----------: | :------------ | 
| [PlainTransaction](#plaintransaction) | This is the main transaction method and includes *Transfer, CoinBase, LatticePublicKey, Message, Token, TransferToken, and Slave* transaction types  |
| [PlainAddressAmount](#plainaddressamount) | Returns address and amount for balance lookup |
| [MiniTransaction](#minitransaction) | Returns transaction_hash, outgoing or incoming and the amount of the transaction |
| [OTSBitfieldByPage](#otsbitfieldbypage) | Returns ots_bitfield and page_number by page for an address |
| [PlainBlockHeader](#plainblockheader) | Returns hash_header, block_number, timestamp_seconds, hash_header_prev, reward_block, reward_fee, merkle_root, mining_nonce, extra_nonce from block given  |
| [PlainBlock](#plainblock) | returns [PlainBlockHeader](#plainblockheader),[ PlainTransaction](#plaintransaction), [PlainGenesisBalance](#plaingenesisbalance) |
| [PlainGenesisBalance](#plaingenesisbalance) | returns the address, balance from Genesis |





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

### PlainAddressAmount

```go
message PlainAddressAmount {
    string address = 1;
    uint64 amount = 2;
}
```


### MiniTransaction

```go
message MiniTransaction {
    string transaction_hash = 1;
    bool out = 2;
    uint64 amount = 3;
}
```

### OTSBitfieldByPage

```go
message OTSBitfieldByPage {
    repeated bytes ots_bitfield = 1;
    uint64 page_number = 2;
}
```

### PlainBlockHeader

```go
message PlainBlockHeader {
    // Header
    string hash_header = 1;

    uint64 block_number = 2;
    uint64 timestamp_seconds = 3;
    string hash_header_prev = 4;
    uint64 reward_block = 5;
    uint64 reward_fee = 6;
    string merkle_root = 7;

    uint32 mining_nonce = 8;
    uint64 extra_nonce = 9;
}
```
### PlainBlock

```go
message PlainBlock {
    PlainBlockHeader header = 1;
    repeated PlainTransaction transactions = 2;

    repeated PlainGenesisBalance genesis_balance = 3;
}
```

### PlainGenesisBalance

```go
message PlainGenesisBalance {
    string address = 1;
    uint64 balance = 2;
}
```