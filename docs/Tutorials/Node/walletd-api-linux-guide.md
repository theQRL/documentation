---
id: walletd-api-linux-guide
title: QRL walletD API + Linux Command Line
hide_title: false
hide_table_of_contents: false
sidebar_label: WalletD Linux CLI
sidebar_position: 1
pagination_label: WalletD Linux CLI
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Tutorials/Node/walletd-api-linux-guide.md
description: Tutorial for using the QRL walletD API in a linux command line with grpcurl.
keywords:
  - tutorials
  - Node
  - walletd
  - linux cli

image: /assets/img/icons/yellow.png
slug: /tutorials/node/walletd-api-linux-guide
---



Using the QRL walletD API in a Linux command line is simple with the [gRPCurl](https://github.com/fullstorydev/grpcurl) tools.

This guide will go over setting up and using the gRPCurl tools in a Linux system to interact with the [QRL walletD API](/api/wallet-api. 

:::info
This guide was written with using Ubuntu, however most OS's should work.
:::


## Installation

Following the instructions provided by the gRPCurl tools to get started, install the tools on your system.


### From Source

I used the ["From Source" method](https://github.com/fullstorydev/grpcurl#from-source) to get started.

With golang installed and functional:

```bash
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
```


This installs the command into the bin sub-folder of wherever your $GOPATH environment variable points. (If you have no GOPATH environment variable set, the default install location is $HOME/go/bin). If this directory is already in your $PATH, then you should be good to go.

## Setup gRPCurl

There are a few things needed to use the tools.

The QRL does not have reflection enabled by default, in order to use the `grpcurl` tools the QRL proto files must be available. 

### Clone the QRL repo 

```bash
git clone https://github.com/theQRL/qrl
```

### Add Required Google Proto Files

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

### Test gRPCurl

Validate the local setup is correctly working.

#### List Available Functions

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


#### Add New Address

```bash
~/go/bin/grpcurl -plaintext -import-path ~/qrl/src/qrl/protos/ -proto ~/qrl/src/qrl/protos/qrlwallet.proto -d '{"height": "6", "hash_function": "sha2_256"}' localhost:19010 qrl.WalletAPI.AddNewAddress
```
