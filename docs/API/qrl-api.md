---
docstatus: 30%
id: qrl-public-api
title: QRL Public API
hide_title: false
hide_table_of_contents: false
sidebar_label: API - Public
sidebar_position: 2
pagination_label: API - Public 
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Public API
keywords:
  - docs
  - build
  - developers
  - API
image: /assets/img/icons/yellow.png
slug: /api/qrl-public-api
---


:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!

- Rework intro and code usage examples with functional examples.

</span>
:::


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';




## Introduction


The QRL Public API allows developers to interact with the QRL blockchain network, perform various operations, and access blockchain data.

While there is no authentication required to interact with most of the QRL's API's, you will need to be able to reach a node at the API service IP and port. It is recommended that you run a local QRL node and serve the API from the local node.

This may require additional configuration through your network and settings will differ depending on your configuration. This is out of scope for this document.


## Prerequisites

Before using the API, make sure you have the following prerequisites:

- Connection to a synced QRL Node (*remote or local*)
- Open API port (*Default enabled at port 19009)
- Basic understanding of the QRL blockchain and gRPC

## Base URL

The base URL for accessing the QRL API running on a local node is: `127.0.0.1:19009`


## Protobuf Definition

The API follows the protobuf definition found in [qrl.proto](https://github.com/theQRL/QRL/blob/master/src/qrl/protos/qrl.proto).



## Example Usage

Here's an example of how to use the QRL API in different programming languages:

<Tabs
  groupId="examplelang"
  defaultValue="python"
  values={[
    {label: 'Python', value: 'python'},
    {label: 'javascript', value: 'javascript'},
    {label: 'go', value: 'go'},
  ]}>
  <TabItem value="python">

  ```python
  import grpc
  from qrl.protos import qrl_pb2, qrl_pb2_grpc

  # Establish a gRPC channel
  channel = grpc.insecure_channel('127.0.0.1:19009')

  # Create a stub for the QRL service
  qrl_stub = qrl_pb2_grpc.QRLServiceStub(channel)

  # Make a request to get block information
  block_request = qrl_pb2.GetBlockInfoRequest(block_number=123456)
  block_info = qrl_stub.GetBlockInfo(block_request)

  # Print the block information
  print(block_info)

  ```
  </TabItem>
  
  <TabItem value="javascript">

  ```javascript
  const grpc = require('grpc')
  const qrl_proto = require('./qrl_pb')
  const qrl_grpc = require('./qrl_grpc_pb')

  // Create a gRPC client
  const client = new qrl_grpc.QRLServiceClient('127.0.0.1:19009', grpc.credentials.createInsecure())

  // Make a request to get block information
  const blockRequest = new qrl_proto.GetBlockInfoRequest()
  blockRequest.setBlockNumber(123456)

  client.getBlockInfo(blockRequest, (error, response) => {
    if (error) {
      console.error(error)
    } else {
      console.log(response.toObject())
    }
  })
  ```

  </TabItem>
  
  <TabItem value="go">

  ```go
  package main

  import (
    "log"

    "google.golang.org/grpc"
    qrlpb "github.com/theQRL/QRL/src/qrl/protos"
  )

  func main() {
    // Connect to the gRPC server
    conn, err := grpc.Dial("127.0.0.1:19009", grpc.WithInsecure())
    if err != nil {
      log.Fatalf("Failed to connect: %v", err)
    }
    defer conn.Close()

    // Create a client for the QRL service
    client := qrlpb.NewQRLServiceClient(conn)

    // Make a request to get block information
    blockRequest := &qrlpb.GetBlockInfoRequest{
      BlockNumber: 123456,
    }

    blockInfo, err := client.GetBlockInfo(context.Background(), blockRequest)
    if err != nil {
      log.Fatalf("Error while calling GetBlockInfo: %v", err)
    }

    log.Println(blockInfo)
  }
  ```
  </TabItem>

</Tabs>



Note: Make sure to import the appropriate Protobuf and gRPC client libraries in your code.

Please refer to the [qrl.proto](https://github.com/theQRL/QRL/blob/master/src/qrl/protos/qrl.proto) file for the complete API definition.


## PublicAPIService

The PublicAPIService service provides public API methods for interacting with the QRL node.


| Method | Request | Response |
| :---: | :---: | :--- |
| [GetNodeState](#getnodestate) | [GetNodeStateReq](#getnodestate) | [GetNodeStateResp](#getnodestate) |
| [GetKnownPeers](#getknownpeers) | [GetKnownPeersReq](#getknownpeers) | [GetKnownPeersResp](#getknownpeers) |
| [GetPeersStat](#getpeersstat) | [GetPeersStatReq](#getpeersstat) | [GetPeersStatResp](#getpeersstat) |
| [GetStats](#getstats) | [GetStatsReq](#getstats) | [GetStatsResp](#getstats) |
| [GetAddressState](#getaddressstate) | [GetAddressStateReq](#getaddressstate) | [GetAddressStateResp](#getaddressstate) |
| [GetOptimizedAddressState](#getoptimizedaddressstate) | [GetAddressStateReq](#getoptimizedaddressstate) | [GetOptimizedAddressStateResp](#getoptimizedaddressstate) |
| [GetMultiSigAddressState](#getmultisigaddressstate) | [GetMultiSigAddressStateReq](#getmultisigaddressstate) | [GetMultiSigAddressStateResp](#getmultisigaddressstate) |
| [IsSlave](#isslave) | [IsSlaveReq](#isslave) | [IsSlaveResp](#isslave) |
| [GetObject](#getobject) | [GetObjectReq](#getobject) | [GetObjectResp](#getobject) |
| [GetLatestData](#getlatestdata) | [GetLatestDataReq](#getlatestdata) | [GetLatestDataResp](#getlatestdata) |
| [PushTransaction](#pushtransaction) | [PushTransactionReq](#pushtransaction) | [PushTransactionResp](#pushtransaction) |
| [TransferCoins](#transfercoins) | [TransferCoinsReq](#transfercoins) | [TransferCoinsResp](#transfercoins) |
| [ParseAddress](#parseaddress) | [ParseAddressReq](#parseaddress) | [ParseAddressResp](#parseaddress) |
| [GetChainStats](#getchainstats) | [GetChainStatsReq](#getchainstats) | [GetChainStatsResp](#getchainstats) |
| [GetAddressFromPK](#getaddressfrompk) | [GetAddressFromPKReq](#getaddressfrompk) | [GetAddressFromPKResp](#getaddressfrompk) |
| [GetMultiSigCreateTxn](#getmultisigcreatetxn) | [MultiSigCreateTxnReq](#getmultisigcreatetxn) | [TransferCoinsResp](#getmultisigcreatetxn) |
| [GetMultiSigSpendTxn](#getmultisigspendtxn) | [MultiSigSpendTxnReq](#getmultisigspendtxn) | [TransferCoinsResp](#getmultisigspendtxn) |
| [GetMultiSigVoteTxn](#getmultisigvotetxn) | [MultiSigVoteTxnReq](#getmultisigvotetxn) | [TransferCoinsResp](#getmultisigvotetxn) |
| [GetMessageTxn](#getmessagetxn) | [MessageTxnReq](#getmessagetxn) | [TransferCoinsResp](#getmessagetxn) |
| [GetTokenTxn](#gettokentxn) | [TokenTxnReq](#gettokentxn) | [TransferCoinsResp](#gettokentxn) |
| [GetTransferTokenTxn](#gettransfertokentxn) | [TransferTokenTxnReq](#gettransfertokentxn) | [TransferCoinsResp](#gettransfertokentxn) |
| [GetSlaveTxn](#getslavetxn) | [SlaveTxnReq](#getslavetxn) | [TransferCoinsResp](#getslavetxn) |
| [GetLatticeTxn](#getlatticetxn) | [LatticeTxnReq](#getlatticetxn) | [TransferCoinsResp](#getlatticetxn) |
| [GetTransaction](#gettransaction) | [GetTransactionReq](#gettransaction) | [GetTransactionResp](#gettransaction) |
| [GetMiniTransactionsByAddress](#getminitransactionsbyaddress) | [GetMiniTransactionsByAddressReq](#getminitransactionsbyaddress) | [GetMiniTransactionsByAddressResp](#getminitransactionsbyaddress) |
| [GetTransactionsByAddress](#gettransactionsbyaddress) | [GetTransactionsByAddressReq](#gettransactionsbyaddress) | [GetTransactionsByAddressResp](#gettransactionsbyaddress) |
| [GetTokensByAddress](#gettokensbyaddress) | [GetTransactionsByAddressReq](#gettokensbyaddress) | [GetTokensByAddressResp](#gettokensbyaddress) |
| [GetSlavesByAddress](#getslavesbyaddress) | [GetTransactionsByAddressReq](#getslavesbyaddress) | [GetSlavesByAddressResp](#getslavesbyaddress) |
| [GetLatticePKsByAddress](#getlatticepksbyaddress) | [GetTransactionsByAddressReq](#getlatticepksbyaddress) | [GetLatticePKsByAddressResp](#getlatticepksbyaddress) |
| [GetMultiSigAddressesByAddress](#getmultisigaddressesbyaddress) | [GetTransactionsByAddressReq](#getmultisigaddressesbyaddress) | [GetMultiSigAddressesByAddressResp](#getmultisigaddressesbyaddress) |
| [GetMultiSigSpendTxsByAddress](#getmultisigspendtxsbyaddress) | [GetMultiSigSpendTxsByAddressReq](#getmultisigspendtxsbyaddress) | [GetMultiSigSpendTxsByAddressResp](#getmultisigspendtxsbyaddress) |
| [GetVoteStats](#getvotestats) | [GetVoteStatsReq](#getvotestats) | [GetVoteStatsResp](#getvotestats) |
| [GetInboxMessagesByAddress](#getinboxmessagesbyaddress) | [GetTransactionsByAddressReq](#getinboxmessagesbyaddress) | [GetInboxMessagesByAddressResp](#getinboxmessagesbyaddress) |
| [GetBalance](#getbalance) | [GetBalanceReq](#getbalance) | [GetBalanceResp](#getbalance) |
| [GetTotalBalance](#gettotalbalance) | [GetTotalBalanceReq](#gettotalbalance) | [GetTotalBalanceResp](#gettotalbalance) |
| [GetOTS](#getots) | [GetOTSReq](#getots) | [GetOTSResp](#getots) |
| [GetHeight](#getheight) | [GetHeightReq](#getheight) | [GetHeightResp](#getheight) |
| [GetBlock](#getblock) | [GetBlockReq](#getblock) | [GetBlockResp](#getblock) |
| [GetBlockByNumber](#getblockbynumber) | [GetBlockByNumberReq](#getblockbynumber) | [GetBlockByNumberResp](#getblockbynumber) |




### GetNodeState

Retrieves the current state of the QRL node queried.

<Tabs
  groupId="getnodestate"
  defaultValue="method"
  values={[
    {label: 'GetNodeState', value: 'method'},
    {label: 'GetNodeStateReq', value: 'request'},
    {label: 'GetNodeStateResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetNodeState
  
  ```go
  service PublicAPI
  {
      rpc GetNodeState (GetNodeStateReq) returns (GetNodeStateResp) {
        option (google.api.http) = {
          get: "/node-state"
        };
      };
  }
  ```
  
  </TabItem>
  
  <TabItem value="request">

  #### GetNodeStateReq  

  No additional request parameters needed. 

  ```go
  /**
   * Represents the reply message to node state query
  */
  message GetNodeStateReq {
    // No request parameters required
  }
  ```

  </TabItem>
  
  <TabItem value="response">

  #### GetNodeStateResp

  `GetNodeStateResp` returns [NodeInfo](#nodeinfo) data from the connected node.



| Field | Type | Details | 
| :--: | :---: | :--- |
| `info` | [NodeInfo Object](#nodeinfo) | <dl><dt>NodeInfo object contains:</dt><dd style={{ display:'list-item' }}>version</dd><dd style={{ display:'list-item' }}>state</dd><dd style={{ display:'list-item' }}>num_connections</dd><dd style={{ display:'list-item' }}>num_known_peers</dd><dd style={{ display:'list-item' }}>uptime</dd><dd style={{ display:'list-item' }}>block_height</dd><dd style={{ display:'list-item' }}>block_last_hash</dd><dd style={{ display:'list-item' }}>network_id</dd></dl> |




  ```go
  /**
   * Represents the reply message to node state query
  */
  message GetNodeStateResp {
      NodeInfo info = 1;
  }
  ```

:::note 
Please refer to the [NodeInfo](#nodeinfo) content for more details.
:::

  </TabItem>

</Tabs>




### GetKnownPeers

:::caution Need clarification
Does this return a list of Peers IP's from the `Peer` function? Or detailed information from the `PeerInfo` function? 
:::

Returns data on known peers connected to the node queried.

<Tabs
  groupId="getknownpeers"
  defaultValue="method"
  values={[
    {label: 'GetKnownPeers', value: 'method'},
    {label: 'GetKnownPeersReq', value: 'request'},
    {label: 'GetKnownPeersResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetKnownPeers
  
  ```go
  service PublicAPI
  {
      rpc GetKnownPeers (GetKnownPeersReq) returns (GetKnownPeersResp) {
        option (google.api.http) = {
          get: "/known-peers"
        };
      };
  }
  ```
  </TabItem>
  
  <TabItem value="request">

  #### GetKnownPeersReq  

  ```go
  /**
   * Represents a query to get known peers
  */
  message GetKnownPeersReq {
    // No request parameters required
  }
```

  </TabItem>
  
  <TabItem value="response">

  #### GetKnownPeersResp

| Field | Type | Details | 
| :--: | :---: | :--- |
| `node_info` | [NodeInfo Object](#nodeinfo) | <dl><dt>NodeInfo object contains:</dt><dd style={{ display:'list-item' }}>version</dd><dd style={{ display:'list-item' }}>state</dd><dd style={{ display:'list-item' }}>num_connections</dd><dd style={{ display:'list-item' }}>num_known_peers</dd><dd style={{ display:'list-item' }}>uptime</dd><dd style={{ display:'list-item' }}>block_height</dd><dd style={{ display:'list-item' }}>block_last_hash</dd><dd style={{ display:'list-item' }}>network_id</dd></dl> |
| `known_peers` | [Repeated Peer Object](#peer) | List of Peer objects containing peer nodes detailed information |


  
  ```go
  /**
   * Represents the reply message to known peers query
  */
  message GetKnownPeersResp {
      NodeInfo node_info = 1;             // NodeInfo object containing node state information
      repeated Peer known_peers = 2;      // List of Peer objects containing peer nodes detailed information
  }

  ```


:::note 
Please refer to the [NodeInfo function](#nodeinfo) and [Peers function](#peers) content for more details.
:::

  </TabItem>
</Tabs>






### GetPeersStat

Returns stats on known peers.

<Tabs
  groupId="getpeerstat"
  defaultValue="method"
  values={[
    {label: 'GetPeersStat', value: 'method'},
    {label: 'GetPeersStatReq', value: 'request'},
    {label: 'GetPeersStatResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetPeersStat

  ```go
  service PublicAPI
  {
      rpc GetPeersStat (GetPeersStatReq) returns (GetPeersStatResp) {
        option (google.api.http) = {
          get: "/peers-stat"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### GetPeersStatReq  
  ```go
  /**
   * Represents a query to get connected peers stat
  */
  message GetPeersStatReq {
    // No request parameters required
  }
  ```


  </TabItem>
  
  <TabItem value="response">

 
  #### GetPeersStatResp
  
| Field | Type | Details | 
| :--: | :---: | :--- |
| `peers_stat` | [repeated PeerStat Object](#peerstat) | <dl><dt>PeerState object contains:</dt><dd style={{ display:'list-item' }}>peer_ip</dd><dd style={{ display:'list-item' }}>port</dd><dd style={{ display:'list-item' }}>node_chain_state</dd></dl> |


  ```go
  /**
   * Represents the reply message to peers stat query
  */
  message GetPeersStatResp {
      repeated PeerStat peers_stat = 1;    // PeerState object contains peer_ip, port and peer state information
  }

  ```

:::note
Please refer to the [PeerStat function](#peerstat) for more information.
:::

  </TabItem>
</Tabs>



### GetStats

Returns Node stats for the QRL Node queried with optional block timeseries data returned

<Tabs
  groupId="getstats"
  defaultValue="method"
  values={[
    {label: 'GetStats', value: 'method'},
    {label: 'GetStatsReq', value: 'request'},
    {label: 'GetStatsResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetStats
  
  ```go
  service PublicAPI
  {
      rpc GetStats (GetStatsReq) returns (GetStatsResp) {
        option (google.api.http) = {
          get: "/stats"
        };
      };
  }
  ```
  
  </TabItem>
  
  <TabItem value="request">

  #### GetStatsReq  

| Field | Type | Details | 
| :--: | :---: | :--- |
| `include_timeseries` | bool | Boolean to define if block timeseries should be included in reply or not |


  ```go
  /**
   * Represents a query to get statistics about node
  */
  message GetStatsReq {
      bool include_timeseries = 1;            // Boolean to define if block timeseries should be included in reply or not
  }

  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetStatsResp
  
| Field | Type | Details | 
| :--: | :---: | :--- |
| `node_info` | [NodeInfo Object](#nodeinfo) | <dl><dt>NodeInfo object contains:</dt><dd style={{ display:'list-item' }}>version</dd><dd style={{ display:'list-item' }}>state</dd><dd style={{ display:'list-item' }}>num_connections</dd><dd style={{ display:'list-item' }}>num_known_peers</dd><dd style={{ display:'list-item' }}>uptime</dd><dd style={{ display:'list-item' }}>block_height</dd><dd style={{ display:'list-item' }}>block_last_hash</dd><dd style={{ display:'list-item' }}>network_id</dd></dl> |
| `epoch` | uint64 | Current epoch |
| `uptime_network` | uint64 | Indicates uptime in seconds |
| `block_last_reward` | uint64 | Block reward |
| `block_time_mean` | uint64 | Blocktime average |
| `block_time_sd` | uint64 | Blocktime standard deviation |
| `coins_total_supply` | uint64 | Total coins supply |
| `coins_emitted` | uint64 | Total coins emitted |
| `BlockDataPoint` | [repeated BlockDataPoint Object](#blockdatapoint) | <dl><dt>BlockDataPoint Object contains:</dt><dd style={{ display:'list-item' }}>number</dd><dd style={{ display:'list-item' }}>difficulty</dd><dd style={{ display:'list-item' }}>timestamp</dd><dd style={{ display:'list-item' }}>time_last</dd><dd style={{ display:'list-item' }}>time_movavg</dd><dd style={{ display:'list-item' }}>hash_power</dd><dd style={{ display:'list-item' }}>header_hash</dd><dd style={{ display:'list-item' }}>header_hash_prev</dd></dl> |





  ```go
  message GetStatsResp {
      NodeInfo node_info = 1;                 // NodeInfo object containing node state information
      uint64 epoch = 2;                       // Current epoch
      uint64 uptime_network = 3;              // Indicates uptime in seconds

      uint64 block_last_reward = 4;           // Block reward
      uint64 block_time_mean = 5;             // Blocktime average
      uint64 block_time_sd = 6;               // Blocktime standrad deviation

      uint64 coins_total_supply = 7;          // Total coins supply
      uint64 coins_emitted = 8;               // Total coins emitted

      repeated BlockDataPoint block_timeseries = 9;
  }
  ```  

:::note
Please see the [NodeInfo Object](#nodeinfo) and [BlockDataPoint Object](#blockdatapoint) for more information
:::

  </TabItem>
</Tabs>





### GetAddressState

`GetAddressState` returns information on a given address. 

This function requires a *QRL address* with optional fields to include *OTS Bitfield* and *Transaction Hashes*.

<Tabs
  groupId="getaddressstate"
  defaultValue="method"
  values={[
    {label: 'GetAddressState', value: 'method'},
    {label: 'GetAddressStateReq', value: 'request'},
    {label: 'GetAddressStateResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetAddressState

  ```go
  service PublicAPI
  {
      rpc GetAddressState (GetAddressStateReq) returns (GetAddressStateResp) {
        option (google.api.http) = {
          get: "/address-state"
        };
      };
  }
  ```
  
  </TabItem>
  
  <TabItem value="request">

  #### GetAddressStateReq  

| Field | Type | Details | 
| :--: | :---: | :--- |
| `address` | bytes | QRL Address to query address state |
| `exclude_ots_bitfield` | bool | Boolean to include OTS bitfield information or not |
| `exclude_transaction_hashes` | bool | Boolean to include transaction hashes from address |

  ```go
  message GetAddressStateReq {
      bytes address = 1;
      bool exclude_ots_bitfield = 2;
      bool exclude_transaction_hashes = 3; 
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetAddressStateResp

| Field | Type | Details | 
| :--: | :---: | :--- |
| `state` | [AddressState Object](#addressstate) | <dl><dt>AddressState Object contains:</dt><dd style={{ display:'list-item' }}> address</dd><dd style={{ display:'list-item' }}> balance</dd><dd style={{ display:'list-item' }}> nonce</dd><dd style={{ display:'list-item' }}> *<i>ots_bitfield</i></dd><dd style={{ display:'list-item' }}> *<i>transaction_hashes</i></dd><dd style={{ display:'list-item' }}> tokens</dd><dd style={{ display:'list-item' }}> latticePK_list</dd><dd style={{ display:'list-item' }}> slave_pks_access_type</dd><dd style={{ display:'list-item' }}> ots_counter</dd></dl> |


\**Optional boolean request needed for this data to be returned .*

  ```go
  message GetAddressStateResp {
      AddressState state = 1;
  }
  ```
  

:::note
See the [AddressState object](#addressstate) for more information
:::

  </TabItem>
</Tabs>




### GetOptimizedAddressState

Returns Optimized Address State information.

<Tabs
  groupId="getoptimizedaddressstate"
  defaultValue="method"
  values={[
    {label: 'GetOptimizedAddressState', value: 'method'},
    {label: 'GetAddressStateReq', value: 'request'},
    {label: 'GetOptimizedAddressStateResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetOptimizedAddressState
  
  ```go
  service PublicAPI
  {
      rpc GetOptimizedAddressState (GetAddressStateReq) returns (GetOptimizedAddressStateResp) {
        option (google.api.http) = {
          get: "/optimized-address-state"
        };
      };
  }
  ```
  
  </TabItem>
  
  <TabItem value="request">

  #### GetAddressStateReq  

| Field | Type | Details | 
| :--: | :---: | :--- |
| `address` | bytes | **Required** QRL Address for the state information lookup |
| `exclude_ots_bitfield` | bool | **Optional** Boolean to exclude OTS Bitfield information|
| `exclude_transaction_hashes` | bool | **Optional** Boolean to exclude transaction hash information |

  ```go
  message GetAddressStateReq {
      bytes address = 1;
      bool exclude_ots_bitfield = 2;
      bool exclude_transaction_hashes = 3; 
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetOptimizedAddressStateResp

| Field | Type | Details | 
| :--: | :---: | :--- |
| `state` | [OptimizedAddressState Object](#optimizedaddressstate) | <dl><dt>OptimizedAddressState Object contains:</dt><dd style={{ display:'list-item' }}> address</dd><dd style={{ display:'list-item' }}> balance</dd><dd style={{ display:'list-item' }}> nonce</dd><dd style={{ display:'list-item' }}> ots_bitfield_used_page</dd><dd style={{ display:'list-item' }}> used_ots_key_coun</dd><dd style={{ display:'list-item' }}> transaction_hash_count</dd><dd style={{ display:'list-item' }}> tokens_count</dd><dd style={{ display:'list-item' }}> slaves_count</dd><dd style={{ display:'list-item' }}> lattice_pk_count</dd><dd style={{ display:'list-item' }}> multi_sig_address_count</dd><dd style={{ display:'list-item' }}> multi_sig_spend_count</dd><dd style={{ display:'list-item' }}> inbox_message_count</dd><dd style={{ display:'list-item' }}> foundation_multi_sig_spend_txn_hash</dd><dd style={{ display:'list-item' }}> foundation_multi_sig_vote_txn_hash</dd><dd style={{ display:'list-item' }}> unvotes</dd><dd style={{ display:'list-item' }}> proposal_vote_stats</dd>  </dl> |


  ```go
  message GetOptimizedAddressStateResp {
      OptimizedAddressState state = 1;
  }
  ```

:::note
See the [OptimizedAddressState object](#optimizedaddressstate) for more information
:::


  </TabItem>
</Tabs>




### GetMultiSigAddressState

<Tabs
  groupId="getmultisigaddressstate"
  defaultValue="method"
  values={[
    {label: 'GetMultiSigAddressState', value: 'method'},
    {label: 'GetMultiSigAddressStateReq', value: 'request'},
    {label: 'GetMultiSigAddressStateResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetMultiSigAddressState
  
  ```go
  service PublicAPI
  {
      rpc GetMultiSigAddressState (GetMultiSigAddressStateReq) returns (GetMultiSigAddressStateResp) {
        option (google.api.http) = {
          get: "/multi-sig-address-state"
        };
      };
  }
  ```
  
  </TabItem>
  
  <TabItem value="request">

  #### GetMultiSigAddressStateReq  

| Field | Type | Details | 
| :--: | :---: | :--- |
| `address` | bytes | QRL Address for state lookup |


  ```go
  message GetMultiSigAddressStateReq {
      bytes address = 1;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `state` | [MultiSigAddressState object](#multisigaddressstate) | <dl>  <dt>MultiSigAddressState Object contains:</dt>  <dd style={{ display:'list-item' }}> address</dd>  <dd style={{ display:'list-item' }}> creation_tx_hash</dd>  <dd style={{ display:'list-item' }}> nonce</dd>  <dd style={{ display:'list-item' }}> balance</dd>  <dd style={{ display:'list-item' }}> signatories</dd>  <dd style={{ display:'list-item' }}> weights</dd>  <dd style={{ display:'list-item' }}> threshold</dd>  <dd style={{ display:'list-item' }}> transaction_hash_count</dd>  <dd style={{ display:'list-item' }}> multi_sig_spend_count</dd>  <dd style={{ display:'list-item' }}> multi_sig_address_count</dd>  <dd style={{ display:'list-item' }}> foundation_multi_sig_spend_txn_hash</dd>  <dd style={{ display:'list-item' }}> foundation_multi_sig_vote_txn_hash</dd>  <dd style={{ display:'list-item' }}> unvotes</dd>  <dd style={{ display:'list-item' }}> proposal_vote_stats</dd></dl> |




  #### GetMultiSigAddressStateResp

  ```go
  message GetMultiSigAddressStateResp {
      MultiSigAddressState state = 1;
  }
  ```
  
:::note
See the [MultiSigAddressState object](#multisigaddressstate) for more information
:::

  </TabItem>
</Tabs>




### IsSlave

<Tabs
  groupId="isslave"
  defaultValue="method"
  values={[
    {label: 'IsSlave', value: 'method'},
    {label: 'IsSlaveReq', value: 'request'},
    {label: 'IsSlaveResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### IsSlave
  
  ```go
  service PublicAPI
  {
      rpc IsSlave (IsSlaveReq) returns (IsSlaveResp) {
        option (google.api.http) = {
          get: "/is-slave"
        };
      };
  }
  ```
  
  </TabItem>
  
  <TabItem value="request">

  #### IsSlaveReq  
  
| Field | Type | Details | 
| :--: | :---: | :--- | 
| `master_address` | bytes | Master QRL address slave is associated with |
| `slave_pk` | bytes | Public key from slave address |

  ```go
  message IsSlaveReq {
      bytes master_address = 1;
      bytes slave_pk = 2;
  }
  ```
  </TabItem>
  
  <TabItem value="response">

 
  #### IsSlaveResp


| Field | Type | Details | 
| :--: | :---: | :--- |
| `result` | bool | Boolean result if address is a slave address or not |

  ```go
  message IsSlaveResp {
      bool result = 1;
  }
  ```


  </TabItem>
</Tabs>




### GetObject

Returns information based on the query submitted. Can be one of: QRL Address, Transaction Hash, Block height.


<Tabs
  groupId="getobject"
  defaultValue="method"
  values={[
    {label: 'GetObject', value: 'method'},
    {label: 'GetObjectReq', value: 'request'},
    {label: 'GetObjectResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetObject

  ```go
  service PublicAPI
  {
      rpc GetObject(GetObjectReq) returns (GetObjectResp) {
        option (google.api.http) = {
          get: "/object"
        };
      };

  }
  ```
  
  </TabItem>
  
  <TabItem value="request">

  #### GetObjectReq  

| Field | Type | Details | 
| :--: | :---: | :--- |
| `query` | bytes | Query data to lookup, can be one of: *QRL Address, Transaction Hash, Block Number* |

  ```go
  message GetObjectReq {  
      bytes query = 1;    
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetObjectResp

| Field | Type | Details | 
| :--: | :---: | :--- |
| `address_state` | [OptimizedAddressState Object](#optimizedaddressstate) | <dl><dt>OptimizedAddressState Object contains:</dt><dd style={{ display:'list-item' }}> address</dd><dd style={{ display:'list-item' }}> balance</dd><dd style={{ display:'list-item' }}> nonce</dd><dd style={{ display:'list-item' }}> ots_bitfield_used_page</dd><dd style={{ display:'list-item' }}> used_ots_key_coun</dd><dd style={{ display:'list-item' }}> transaction_hash_count</dd><dd style={{ display:'list-item' }}> tokens_count</dd><dd style={{ display:'list-item' }}> slaves_count</dd><dd style={{ display:'list-item' }}> lattice_pk_count</dd><dd style={{ display:'list-item' }}> multi_sig_address_count</dd><dd style={{ display:'list-item' }}> multi_sig_spend_count</dd><dd style={{ display:'list-item' }}> inbox_message_count</dd><dd style={{ display:'list-item' }}> foundation_multi_sig_spend_txn_hash</dd><dd style={{ display:'list-item' }}> foundation_multi_sig_vote_txn_hash</dd><dd style={{ display:'list-item' }}> unvotes</dd><dd style={{ display:'list-item' }}> proposal_vote_stats</dd>  </dl> |
| `transaction` | [TransactionExtended Object](#transactionextended) | <dl><dt>TransactionExtended Object contains:</dt><dd style={{ display:'list-item' }}>header</dd><dd style={{ display:'list-item' }}>tx</dd><dd style={{ display:'list-item' }}>addr_from</dd><dd style={{ display:'list-item' }}>size</dd><dd style={{ display:'list-item' }}>timestamp_seconds</dd></dl> |
| `block_extended` | [BlockExtended Object](#blockextended) | <dl><dt>BlockExtended Object contains:</dt><dd style={{ display:'list-item' }}>header</dd><dd style={{ display:'list-item' }}>extended_transactions</dd><dt>genesis block only:</dt><dd style={{ display:'list-item' }}>genesis_balance</dd><dd style={{ display:'list-item' }}>size</dd></dl> |


  ```go
  message GetObjectResp {
      bool found = 1;
      oneof result {
          OptimizedAddressState address_state = 2;
          TransactionExtended transaction = 3;
          BlockExtended block_extended = 4;
      }
  }
  ```
  
:::note
See [OptimizedAddressState Object](#optimizedaddressstate), [TransactionExtended Object](#transactionextended), [BlockExtended Object](#blockextended) for more information.
:::

  </TabItem>
</Tabs>




### GetLatestData

<Tabs
  groupId="getlatestdata"
  defaultValue="method"
  values={[
    {label: 'GetLatestData', value: 'method'},
    {label: 'GetLatestDataReq', value: 'request'},
    {label: 'GetLatestDataResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetLatestData
  
  ```go
  service PublicAPI
  {
      rpc GetLatestData(GetLatestDataReq) returns (GetLatestDataResp) {
        option (google.api.http) = {
          get: "/latest-data"
        };
      };
  }
  ```
  
  </TabItem>
  
  <TabItem value="request">

  #### GetLatestDataReq  

| Field | Type | Details | 
| :--: | :---: | :--- |
| `filter` | filter | One of: *ALL, BLOCKHEADERS, TRANSACTIONS, TRANSACTIONS_UNCONFIRMED* |
| `offset` | uint32 | Offset in the result list (works backwards in this case) |
| `quantity` | uint32 | Number of items to retrieve. Capped at 100 |


  ```go
  message GetLatestDataReq {
      enum Filter {
          ALL = 0;
          BLOCKHEADERS = 1;
          TRANSACTIONS = 2;
          TRANSACTIONS_UNCONFIRMED = 3;
      }
      Filter filter = 1;
      uint32 offset = 2;                      // Offset in the result list (works backwards in this case)
      uint32 quantity = 3;                    // Number of items to retrieve. Capped at 100
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetLatestDataResp


| Field | Type | Details | 
| :--: | :---: | :--- |
| `blockheaders` | [BlockHeaderExtended Object](#blockheaderextended) | <dl><dt>BlockHeaderExtended Object contains:</dt><dd style={{ display:'list-item' }}> header</dd><dd style={{ display:'list-item' }}> transaction_count</dd></dl> |
| `transactions` | [TransactionExtended Object](#transactionextended) | <dl><dt>TransactionExtended Object contains:</dt><dd style={{ display:'list-item' }}> header</dd><dd style={{ display:'list-item' }}> tx</dd><dd style={{ display:'list-item' }}> addr_from</dd><dd style={{ display:'list-item' }}> size</dd><dd style={{ display:'list-item' }}> timestamp_seconds</dd></dl> |
| `transactions_unconfirmed` | [TransactionExtended Object](#transactionextended) | <dl><dt>TransactionExtended Object contains:</dt><dd style={{ display:'list-item' }}> header</dd><dd style={{ display:'list-item' }}> tx</dd><dd style={{ display:'list-item' }}> addr_from</dd><dd style={{ display:'list-item' }}> size</dd><dd style={{ display:'list-item' }}> timestamp_seconds</dd></dl> |



  ```go
  message GetLatestDataResp {
      repeated BlockHeaderExtended blockheaders = 1;
      repeated TransactionExtended transactions = 2;
      repeated TransactionExtended transactions_unconfirmed = 3;
  }
  ```    

:::note
See [BlockHeaderExtended Object](#blockheaderextended), [TransactionExtended Object](#transactionextended), [TransactionExtended Object](#transactionextended) for more information
:::

  </TabItem>
</Tabs>




### PushTransaction

<Tabs
  groupId="pushtransaction"
  defaultValue="method"
  values={[
    {label: 'PushTransaction', value: 'method'},
    {label: 'PushTransactionReq', value: 'request'},
    {label: 'PushTransactionResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### PushTransaction
  
  ```go
  service PublicAPI
  {
      rpc PushTransaction (PushTransactionReq) returns (PushTransactionResp) {
        option (google.api.http) = {
          post: "/push-transaction"
        };
      };
  }
  ```
  
  </TabItem>
  
  <TabItem value="request">

  #### PushTransactionReq  

| Field | Type | Details | 
| :--: | :---: | :--- |
| `transaction_signed` | [Transaction Object](#transaction) | <dl><dt>Transaction Object contains:</dt><dd style={{ display:'list-item' }}> master_addr</dd><dd style={{ display:'list-item' }}> fee</dd><dd style={{ display:'list-item' }}> public_key</dd><dd style={{ display:'list-item' }}> signature</dd><dd style={{ display:'list-item' }}> nonce</dd><dd style={{ display:'list-item' }}> transaction_hash</dd><dd style={{ display:'list-item' }}> transactionType</dd></dl> |

  ```go
  message PushTransactionReq {    
      Transaction transaction_signed = 1;     
  }
  ```

:::note
See the [Transaction Object](#transaction) for more information.
:::

  </TabItem>
  <TabItem value="response">

 
  #### PushTransactionResp

| Field | Type | Details | 
| :--: | :---: | :--- |
| `error_code` | enum `ResponseCode` | <dl><dt>Response code will be one of:</dt><dd style={{ display:'list-item' }}> UNKNOWN</dd><dd style={{ display:'list-item' }}> ERROR</dd><dd style={{ display:'list-item' }}> VALIDATION_FAILED</dd><dd style={{ display:'list-item' }}> SUBMITTED</dd></dl> |
| `error_description` | string | String description of the error |
| `tx_hash` | bytes | Transaction hash from the PushTransaction  |

  ```go
  message PushTransactionResp {
      enum ResponseCode {
          UNKNOWN = 0;
          ERROR = 1;
          VALIDATION_FAILED = 2;
          SUBMITTED = 3;
      }

      ResponseCode error_code = 1;
      string error_description = 2;
      bytes tx_hash = 3;
  }
  ```


  </TabItem>
</Tabs>




### TransferCoins

<Tabs
  groupId="transfercoins"
  defaultValue="method"
  values={[
    {label: 'TransferCoins', value: 'method'},
    {label: 'TransferCoinsReq', value: 'request'},
    {label: 'TransferCoinsResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### TransferCoins
  
  ```go
  service PublicAPI
  {
      rpc TransferCoins (TransferCoinsReq) returns (TransferCoinsResp) {
        option (google.api.http) = {
          post: "/transfer-coins"
        };
      };

  }
  ```
  
  </TabItem>
  
  <TabItem value="request">

  #### TransferCoinsReq  

| Field | Type | Details | 
| :--: | :---: | :--- |
| `master_addr` | bytes | Transaction source address |
| `addresses_to` | repeated bytes | Transaction destination address |
| `amounts` | repeated uint64 | Amount. It should be expressed in Shor |
| `message_data` | bytes | Message Data. Optional field to send messages |
| `fee` | uint64 | Fee. It should be expressed in Shor |
| `xmss_pk` | bytes | XMSS Public key |

```go
message TransferCoinsReq {
    bytes master_addr = 1;                 // Transaction source address
    repeated bytes addresses_to = 2;       // Transaction destination address
    repeated uint64 amounts = 3;           // Amount. It should be expressed in Shor
    bytes message_data = 4;                // Message Data. Optional field to send messages
    uint64 fee = 5;                        // Fee. It should be expressed in Shor
    bytes xmss_pk = 6;                     // XMSS Public key
}
```

  </TabItem>
  
  <TabItem value="response">

 
  #### TransferCoinsResp


| Field | Type | Details | 
| :--: | :---: | :--- |
| `extended_transaction_unsigned` | [TransactionExtended Object](#transactionextended) | <dl><dt>TransactionExtended Object contains:</dt><dd style={{ display:'list-item' }}> header</dd><dd style={{ display:'list-item' }}> tx</dd><dd style={{ display:'list-item' }}> addr_from</dd><dd style={{ display:'list-item' }}> size</dd><dd style={{ display:'list-item' }}> timestamp_seconds</dd></dl> |

```go
message TransferCoinsResp {
    TransactionExtended extended_transaction_unsigned = 1;
}
```  

:::note
See [TransactionExtended Object](#transactionextended) for more information.
:::

  </TabItem>
</Tabs>



### ParseAddress

`ParseAddress` returns a `AddressDescriptor` object containing information about the given QRL address, as well as verification that the address is valid.

<Tabs
  groupId="parseaddress"
  defaultValue="method"
  values={[
    {label: 'ParseAddress', value: 'method'},
    {label: 'ParseAddressReq', value: 'request'},
    {label: 'ParseAddressResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### ParseAddress
  
  ```go
  service PublicAPI
  {
      rpc ParseAddress (ParseAddressReq) returns (ParseAddressResp) {
        option (google.api.http) = {
          get: "/parse-address"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### ParseAddressReq  


| Field | Type | Details | 
| :--: | :---: | :--- |
| `address` | bytes | QRL Address to parse |

  ```go
  message ParseAddressReq { 
      bytes address = 1;
  }
```


  </TabItem>
  
  <TabItem value="response">

 
  #### ParseAddressResp

| Field | Type | Details | 
| :--: | :---: | :--- |
| `is_valid` | bool | Returns `True` if address given is valid |
| `desc` | [AddressDescriptor Object](#addressdescriptor) | <dl><dt>AddressDescriptor object contains:</dt><dd style={{ display:'list-item' }}>hash_function</dd><dd style={{ display:'list-item' }}>signature_scheme</dd><dd style={{ display:'list-item' }}>tree_height</dd><dd style={{ display:'list-item' }}>signatures</dd><dd style={{ display:'list-item' }}>address_format</dd></dl>| 


```go
message ParseAddressResp {
    bool is_valid = 1;
    AddressDescriptor desc = 2;
}
```
  
:::note
See [AddressDescriptor object](#addressdescriptor) for more information.
:::

  </TabItem>
</Tabs>


### GetChainStats

<Tabs
  groupId="getchainstats"
  defaultValue="method"
  values={[
    {label: 'GetChainStats', value: 'method'},
    {label: 'GetChainStatsReq', value: 'request'},
    {label: 'GetChainStatsResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetChainStats
  
  ```go
  service PublicAPI
  {
      rpc GetChainStats (GetChainStatsReq) returns (GetChainStatsResp) {
        option (google.api.http) = {
          get: "/chain-stats"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### GetChainStatsReq  

  ```go
  /**
   * Represents the query for get chain size
  */
  message GetChainStatsReq {
    // No request parameters required
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetChainStatsResp

| Field | Type | Details | 
| :--: | :---: | :--- |
| `state_size` | uint64 | Returns the whole state folder size, in bytes |
| `state_size_mb` | string | Returns the whole state folder size, in megabytes |
| `state_size_gb` | string | Returns the whole state folder size, in gigabytes |
  
```go
/**
 * Represents the reply message for get chain stats
*/

message GetChainStatsResp {
    uint64 state_size = 1;                    // whole state folder size in bytes
    string state_size_mb = 2;                 // megabytes
    string state_size_gb = 3;                 // gigabytes
}
```

  </TabItem>
</Tabs>




### GetAddressFromPK

:::caution Define this function
Define this function and request parameters
:::

<Tabs
  groupId="getaddressfrompk"
  defaultValue="method"
  values={[
    {label: 'GetAddressFromPK', value: 'method'},
    {label: 'GetAddressFromPKReq', value: 'request'},
    {label: 'GetAddressFromPKResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetAddressFromPK
  
  ```go
  service PublicAPI
  {
      rpc GetAddressFromPK (GetAddressFromPKReq) returns (GetAddressFromPKResp) {
        option (google.api.http) = {
          get: "/address-from-pk"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### GetAddressFromPKReq  



| Field | Type | Details | 
| :--: | :---: | :--- |
| `pk` | bytes | Requires PK |

  ```go
  message GetAddressFromPKReq {
      bytes pk = 1;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetAddressFromPKResp

| Field | Type | Details | 
| :--: | :---: | :--- |
| `address` | bytes | Returns the QRL Address from the PK |
  

  ```go
  message GetAddressFromPKResp {
      bytes address = 1;
  }
  ```


  </TabItem>
</Tabs>




### GetMultiSigCreateTxn

Create a Multisig address transaction

<Tabs
  groupId="getmultisigcreatetxn"
  defaultValue="method"
  values={[
    {label: 'GetMultiSigCreateTxn', value: 'method'},
    {label: 'MultiSigCreateTxnReq', value: 'request'},
    {label: 'TransferCoinsResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetMultiSigCreateTxn
  
  ```go
  service PublicAPI
  {
      rpc GetMultiSigCreateTxn (MultiSigCreateTxnReq) returns (TransferCoinsResp) {
        option (google.api.http) = {
          post: "/multi-sig-create-txn"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### MultiSigCreateTxnReq  


| Field | Type | Details | 
| :--: | :---: | :--- |
| `master_addr` | bytes | QRL Address used to create the multisig address |
| `signatories` | repeated bytes | List of authorized signatories for multisig address  |
| `weights` | repeated uint32 | List of weights associated with signatories |
| `threshold` | threshold | Threshold required for approval of multisig spend transaction  |
| `fee` | uint64 | Fee for creation of multisig address transaction |
| `xmss_pk` | bytes | QRL Private key for transaction signature |


  ```go 
  message MultiSigCreateTxnReq {
      bytes master_addr = 1;

      repeated bytes signatories = 2;
      repeated uint32 weights = 3;
      uint32 threshold = 4;

      uint64 fee = 5;
      bytes xmss_pk = 6;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### TransferCoinsResp

| Field | Type | Details | 
| :--: | :---: | :--- |
| `extended_transaction_unsigned` | [TransactionExtended Object](#transactionextended) | <dl><dt>TransactionExtended object contains:</dt><dd style={{ display:'list-item' }}> header</dd><dd style={{ display:'list-item' }}>             <dt>tx</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}><dt>MultiSigCreate</dt><dd style={{ display:'list-item' }}>signatories</dd> <dd style={{ display:'list-item' }}>weights</dd> <dd style={{ display:'list-item' }}>threshold</dd>    </dd></dd><dd style={{ display:'list-item' }}>addr_from</dd><dd style={{ display:'list-item' }}>size</dd><dd style={{ display:'list-item' }}>timestamp_seconds</dd></dl> | 


  ```go 
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```

:::note
See the [TransactionExtended Object](#transactionextended) for more information
:::

  </TabItem>
</Tabs>



### GetMultiSigSpendTxn

<Tabs
  groupId="getmultisigspendtxn"
  defaultValue="method"
  values={[
    {label: 'GetMultiSigSpendTxn', value: 'method'},
    {label: 'MultiSigSpendTxnReq', value: 'request'},
    {label: 'TransferCoinsResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetMultiSigSpendTxn
  
  ```go
  service PublicAPI
  {
      rpc GetMultiSigSpendTxn (MultiSigSpendTxnReq) returns (TransferCoinsResp) {
        option (google.api.http) = {
          post: "/multi-sig-spend-txn"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### MultiSigSpendTxnReq  

| Field | Type | Details | 
| :--: | :---: | :--- |
| `master_addr` | bytes | QRL Address must be a signatory of the multisig address |
| `multi_sig_address` | bytes  | The multisig address used for the spend transaction |
| `addrs_to` | repeated bytes | List of QRL addresses to send funds to from the multisig address  |
| `amounts` | repeated uint64| List of amounts to send corresponding to the `addrs_to` list |
| `expiry_block_number` | uint64  | Block at which the multisig spend transaction expires if not approved |
| `fee` | uint64 | Fee for multisig spend transaction |
| `xmss_pk` | bytes | QRL Private key for transaction signature |
  

  ```go
  message MultiSigSpendTxnReq {
      bytes master_addr = 1;

      bytes multi_sig_address = 2;
      repeated bytes addrs_to = 3;
      repeated uint64 amounts = 4;
      uint64 expiry_block_number = 5;

      uint64 fee = 6;
      bytes xmss_pk = 7;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### TransferCoinsResp

| Field | Type | Details | 
| :--: | :---: | :--- |  
| `extended_transaction_unsigned` | [TransactionExtended Object](#transactionextended) | <dl><dt>TransactionExtended Object contains:</dt><dd style={{ display:'list-item' }}> header</dd>   <dd style={{ display:'list-item' }}><dt>tx</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}><dt>MultiSigSpend</dt><dd style={{ display:'list-item' }}>  multi_sig_address </dd> <dd style={{ display:'list-item' }}>  addrs_to </dd> <dd style={{ display:'list-item' }}>  amounts </dd> <dd style={{ display:'list-item' }}>  expiry_block_number </dd></dd></dd>    <dd style={{ display:'list-item' }}> addr_from</dd><dd style={{ display:'list-item' }}> size</dd><dd style={{ display:'list-item' }}> timestamp_seconds</dd></dl> |


  ```go
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```

  </TabItem>
</Tabs>



### GetMultiSigVoteTxn

:::caution Define this function and parameters
Define the function and cover what each request parameter is
:::

<Tabs
  groupId="getmultisigvotetxn"
  defaultValue="method"
  values={[
    {label: 'GetMultiSigVoteTxn', value: 'method'},
    {label: 'MultiSigVoteTxnReq', value: 'request'},
    {label: 'TransferCoinsResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetMultiSigVoteTxn
  
  ```go
  service PublicAPI
  {
      rpc GetMultiSigVoteTxn (MultiSigVoteTxnReq) returns (TransferCoinsResp) {
        option (google.api.http) = {
          post: "/multi-sig-vote-txn"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### MultiSigVoteTxnReq  


| Field | Type | Details | 
| :--: | :---: | :--- |  
| `master_addr` | bytes | QRL Address must be a signatory of the multisig address |
| `shared_key` | bytes | Multisig spend transaction to vote on |
| `unvote` | bool | |
| `fee` | uint64 | Fee for the multisig vote transaction |
| `xmss_pk` | bytes | QRL Private key for transaction signature |


  ```go
  message MultiSigVoteTxnReq {
      bytes master_addr = 1;

      bytes shared_key = 2;
      bool unvote = 3;

      uint64 fee = 4;
      bytes xmss_pk = 5;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### TransferCoinsResp


| Field | Type | Details | 
| :--: | :---: | :--- |  
| `extended_transaction_unsigned` | [TransactionExtended Object](#transactionextended) | <dl><dt>TransactionExtended Object contains:</dt><dd style={{ display:'list-item' }}> header</dd>   <dd style={{ display:'list-item' }}>  <dt>tx</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}><dt>MultiSigVote</dt><dd style={{ display:'list-item' }}>  shared_key </dd> <dd style={{ display:'list-item' }}>  unvote </dd> <dd style={{ display:'list-item' }}>  prev_tx_hash </dd> </dd>  </dd> <dd style={{ display:'list-item' }}> addr_from</dd><dd style={{ display:'list-item' }}> size</dd><dd style={{ display:'list-item' }}> timestamp_seconds</dd></dl> |



  ```go
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```
  
  </TabItem>
</Tabs>




### GetMessageTxn

:::caution Define this function and parameters
Define the function and cover what each request parameter is
:::

<Tabs
  groupId="getmessagetxn"
  defaultValue="method"
  values={[
    {label: 'GetMessageTxn', value: 'method'},
    {label: 'MessageTxnReq', value: 'request'},
    {label: 'TransferCoinsResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetMessageTxn
  
  ```go
  service PublicAPI
  {
      rpc GetMessageTxn (MessageTxnReq) returns (TransferCoinsResp) {
        option (google.api.http) = {
          post: "/message-txn"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### MessageTxnReq  

| Field | Type | Details | 
| :--: | :---: | :--- |
| `master_addr` | bytes | QRL Public address | 
| `message` | bytes | Message to send | 
| `addr_to` | bytes | Address to send message to (Optional) | 
| `fee` | uint64 | Fee for message transaction | 
| `xmss_pk` | bytes | QRL Private key for transaction signature |


```go
message MessageTxnReq {
    bytes master_addr = 1;
    bytes message = 2;
    bytes addr_to = 3;
    uint64 fee = 4;
    bytes xmss_pk = 5;
}
```

  </TabItem>
  
  <TabItem value="response">

 
  #### TransferCoinsResp

| Field | Type | Details | 
| :--: | :---: | :--- |  
| `extended_transaction_unsigned` | [TransactionExtended Object](#transactionextended) | <dl><dt>TransactionExtended Object contains:</dt><dd style={{ display:'list-item' }}> header</dd>   <dd style={{ display:'list-item' }}>  <dt>tx</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}><dt>Message</dt><dd style={{ display:'list-item' }}>  message_hash </dd> <dd style={{ display:'list-item' }}>  addr_to </dd> </dd>  </dd> <dd style={{ display:'list-item' }}> addr_from</dd><dd style={{ display:'list-item' }}> size</dd><dd style={{ display:'list-item' }}> timestamp_seconds</dd></dl> |



  ```go
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```

  
  </TabItem>
</Tabs>






### GetTokenTxn

Creates a token on the QRL network


<Tabs
  groupId="gettokentxn"
  defaultValue="method"
  values={[
    {label: 'GetTokenTxn', value: 'method'},
    {label: 'TokenTxnReq', value: 'request'},
    {label: 'TransferCoinsResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetTokenTxn
  
  ```go
  service PublicAPI
  {
      rpc GetTokenTxn (TokenTxnReq) returns (TransferCoinsResp) {
        option (google.api.http) = {
          post: "/token-txn"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### TokenTxnReq  

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `master_addr` | bytes | QRL Address creating the token |
| `symbol` | bytes | Token symbol |
| `name` | bytes | Token name |
| `owner` |  bytes| QRL Address of the token owner |
| `decimals` | uint64 | Number of decimals for the token (limit of 9 decimal places)|
| `initial_balances` | repeated [AddressAmount Object](#addressamount)  | list of QRL address and initial balances for up to 100 initial token holders  |
| `fee` | uint64 | Fee for the token transaction  |
| `xmss_pk` | bytes | QRL Private key for transaction signature |



  ```go
  message TokenTxnReq {
      bytes master_addr = 1;
      bytes symbol = 2;
      bytes name = 3;
      bytes owner = 4;
      uint64 decimals = 5;
      repeated AddressAmount initial_balances = 6;
      uint64 fee = 7;
      bytes xmss_pk = 8;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### TransferCoinsResp

| Field | Type | Details | 
| :--: | :---: | :--- |  
| `extended_transaction_unsigned` | [TransactionExtended Object](#transactionextended) | <dl><dt>TransactionExtended Object contains:</dt><dd style={{ display:'list-item' }}> header</dd>   <dd style={{ display:'list-item' }}>  <dt>tx</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}><dt>Token</dt><dd style={{ display:'list-item' }}>  symbol </dd> <dd style={{ display:'list-item' }}>  name </dd> <dd style={{ display:'list-item' }}>  owner </dd> <dd style={{ display:'list-item' }}>  decimals </dd> <dd style={{ display:'list-item' }}>  initial_balances </dd> </dd>  </dd> <dd style={{ display:'list-item' }}> addr_from</dd><dd style={{ display:'list-item' }}> size</dd><dd style={{ display:'list-item' }}> timestamp_seconds</dd></dl> |



  ```go
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```

  </TabItem>
</Tabs>


### GetTransferTokenTxn

:::caution Define this function and parameters
Define the function and cover what each request parameter is
:::

<Tabs
  groupId="gettransfertokentxn"
  defaultValue="method"
  values={[
    {label: 'GetTransferTokenTxn', value: 'method'},
    {label: 'TransferTokenTxnReq', value: 'request'},
    {label: 'TransferCoinsResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetTransferTokenTxn
  
  ```go
  service PublicAPI
  {
      rpc GetTransferTokenTxn (TransferTokenTxnReq) returns (TransferCoinsResp) {
        option (google.api.http) = {
          post: "/transfer-token-txn"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### TransferTokenTxnReq  

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `master_addr` | bytes | QRL Address sending the token |
| `addresses_to` | repeated bytes | List of addresses to send tokens to (Up to 100) |
| `token_txhash` | bytes | Transaction hash from token creation, identifying token to send |
| `amounts` | repeated uint64 | List of amounts to send corresponding to the `address_to` list  |
| `fee` | uint64 | Fee for the token transfer transaction |
| `xmss_pk` | bytes | QRL Private key for transaction signature |


  ```go
  message TransferTokenTxnReq {
      bytes master_addr = 1;
      repeated bytes addresses_to = 2;
      bytes token_txhash = 3;
      repeated uint64 amounts = 4;
      uint64 fee = 5;
      bytes xmss_pk = 6;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### TransferCoinsResp

| Field | Type | Details | 
| :--: | :---: | :--- |  
| `extended_transaction_unsigned` | [TransactionExtended Object](#transactionextended) | <dl><dt>TransactionExtended Object contains:</dt><dd style={{ display:'list-item' }}> header</dd>   <dd style={{ display:'list-item' }}>  <dt>tx</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}><dt>TransferToken</dt><dd style={{ display:'list-item' }}>  token_txhash </dd> <dd style={{ display:'list-item' }}>  addrs_to </dd> <dd style={{ display:'list-item' }}>  amounts </dd> </dd>  </dd> <dd style={{ display:'list-item' }}> addr_from</dd><dd style={{ display:'list-item' }}> size</dd><dd style={{ display:'list-item' }}> timestamp_seconds</dd></dl> |


  ```go
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```
  
  </TabItem>
</Tabs>




### GetSlaveTxn

Create slave addresses associated to a master address

<Tabs
  groupId="getslavetxn"
  defaultValue="method"
  values={[
    {label: 'GetSlaveTxn', value: 'method'},
    {label: 'SlaveTxnReq', value: 'request'},
    {label: 'TransferCoinsResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetSlaveTxn
  
  ```go
  service PublicAPI
  {
      rpc GetSlaveTxn (SlaveTxnReq) returns (TransferCoinsResp) {
        option (google.api.http) = {
          post: "/slave-txn"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### SlaveTxnReq  

| Field | Type | Details | 
| :--: | :---: | :--- |  
| `master_addr` | bytes | Master address creating the slaves addresses |
| `slave_pks` | repeated bytes | List of slave public keys (up to 100) |
| `access_types` | repeated uint32 | List Slave access type 0 or 1 (0 = Full access 1 = Depreciated) |
| `fee` |  uint64| Fee for the slave transaction |
| `xmss_pk` | bytes | QRL Private key for transaction signature |

  ```go
  message SlaveTxnReq {
      bytes master_addr = 1;
      repeated bytes slave_pks = 2;
      repeated uint32 access_types = 3;
      uint64 fee = 4;
      bytes xmss_pk = 5;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### TransferCoinsResp


| Field | Type | Details | 
| :--: | :---: | :--- |  
| `extended_transaction_unsigned` | [TransactionExtended Object](#transactionextended) | <dl><dt>TransactionExtended Object contains:</dt><dd style={{ display:'list-item' }}> header</dd>   <dd style={{ display:'list-item' }}>  <dt>tx</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}><dt>Slave</dt><dd style={{ display:'list-item' }}>  slave_pks </dd> <dd style={{ display:'list-item' }}>  access_types </dd> </dd>  </dd> <dd style={{ display:'list-item' }}> addr_from</dd><dd style={{ display:'list-item' }}> size</dd><dd style={{ display:'list-item' }}> timestamp_seconds</dd></dl> |


  ```go
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```

  </TabItem>
</Tabs>




### GetLatticeTxn

Generate a lattice transaction, sending Crystals public keys into chain


<Tabs
  groupId="getlatticetxn"
  defaultValue="method"
  values={[
    {label: 'GetLatticeTxn', value: 'method'},
    {label: 'LatticeTxnReq', value: 'request'},
    {label: 'TransferCoinsResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetLatticeTxn
  
  ```go
  service PublicAPI
  {
      rpc GetLatticeTxn (LatticeTxnReq) returns (TransferCoinsResp) {
        option (google.api.http) = {
          post: "/lattice-txn"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### LatticeTxnReq  

| Field | Type | Details | 
| :--: | :---: | :--- |  
| `master_addr` | bytes | Master address creating the lattice transaction |
| `pk1` | bytes | kyber Public Key |
| `pk2` | bytes | dilithium Public Key |
| `pk3` | bytes | ecdsa Public Key |
| `fee` | uint64 | Lattice key transaction |
| `xmss_pk` | bytes | QRL Private key for transaction signature |


  ```go
  message LatticeTxnReq {
      bytes master_addr = 1;
      bytes pk1 = 2; // kyber_pk
      bytes pk2 = 3; // dilithium_pk
      bytes pk3 = 4; // ecdsa_pk
      uint64 fee = 5;
      bytes xmss_pk = 6;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### TransferCoinsResp


| Field | Type | Details | 
| :--: | :---: | :--- |  
| `extended_transaction_unsigned` | [TransactionExtended Object](#transactionextended) | <dl><dt>TransactionExtended Object contains:</dt><dd style={{ display:'list-item' }}> header</dd>   <dd style={{ display:'list-item' }}>  <dt>tx</dt><dd style={{ display:'list-item' }}>master_addr</dd><dd style={{ display:'list-item' }}>fee</dd><dd style={{ display:'list-item' }}>public_key</dd><dd style={{ display:'list-item' }}>signature</dd><dd style={{ display:'list-item' }}>nonce</dd><dd style={{ display:'list-item' }}>transaction_hash</dd><dd style={{ display:'list-item' }}><dt>LatticePublicKey</dt><dd style={{ display:'list-item' }}>  pk1 </dd> <dd style={{ display:'list-item' }}>  pk2 </dd><dd style={{ display:'list-item' }}>  pk3 </dd> </dd>  </dd> <dd style={{ display:'list-item' }}> addr_from</dd><dd style={{ display:'list-item' }}> size</dd><dd style={{ display:'list-item' }}> timestamp_seconds</dd></dl> |



  ```go
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```
  
  </TabItem>
</Tabs>





### GetTransaction

Get transaction data from transaction hash provided

<Tabs
  groupId="gettransaction"
  defaultValue="method"
  values={[
    {label: 'GetTransaction', value: 'method'},
    {label: 'GetTransactionReq', value: 'request'},
    {label: 'GetTransactionResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetTransaction
  
  ```go
  service PublicAPI
  {
      rpc GetTransaction(GetTransactionReq) returns (GetTransactionResp) {
        option (google.api.http) = {
          get: "/transaction"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### GetTransactionReq  


| Field | Type | Details | 
| :--: | :---: | :--- |  
| `tx_hash` | bytes | Transaction hash to lookup |

  ```go
  message GetTransactionReq {
      bytes tx_hash = 1;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetTransactionResp


| Field | Type | Details | 
| :--: | :---: | :--- |  
| `tx` | [Transaction Object](#transaction)| Providing transaction data related to the transaction hash provided (Varies per transaction type) |
| `confirmations` | uint64 | Number of confirmations since transaction was minted |
| `block_number` | uint64 | Block number transaction was seen |
| `block_header_hash` | bytes | header hash from block |
| `timestamp` | uint64 | Timestamp of transaction |
| `addr_from` | bytes | QRL address transaction was sent from |


  ```go
  message GetTransactionResp {
      Transaction tx = 1;
      uint64 confirmations = 2;
      uint64 block_number = 3;
      bytes block_header_hash = 4;
      uint64 timestamp = 5;
      bytes addr_from = 6;
  }
  ```
  
  </TabItem>
</Tabs>



### GetMiniTransactionsByAddress

<Tabs
  groupId="getminitransactionsbyaddress"
  defaultValue="method"
  values={[
    {label: 'GetMiniTransactionsByAddress', value: 'method'},
    {label: 'GetMiniTransactionsByAddressReq', value: 'request'},
    {label: 'GetMiniTransactionsByAddressResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetMiniTransactionsByAddress
  
  ```go
  service PublicAPI
  {
      rpc GetMiniTransactionsByAddress(GetMiniTransactionsByAddressReq) returns (GetMiniTransactionsByAddressResp) {
        option (google.api.http) = {
          get: "/mini-transaction-by-address"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### GetMiniTransactionsByAddressReq  


| Field | Type | Details | 
| :--: | :---: | :--- |  
| `address` | bytes | Address to lookup |
| `item_per_page` | uint64 | Items per page |
| `page_number` | uint64 | Page number for data response |

  ```go
  message GetMiniTransactionsByAddressReq {
      bytes address = 1;
      uint64 item_per_page = 2;
      uint64 page_number = 3;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetMiniTransactionsByAddressResp


| Field | Type | Details | 
| :--: | :---: | :--- |  
| `mini_transactions` | repeated [MiniTransaction Object](#minitransaction) | <dl><dt>MiniTransaction Object contains:</dt><dd style={{ display:'list-item' }}> transaction_hash</dd><dd style={{ display:'list-item' }}> out</dd><dd style={{ display:'list-item' }}> amount</dd> </dl> |
| `balance` | uint64 | Address balance  |


  ```go
  message GetMiniTransactionsByAddressResp {
      repeated MiniTransaction mini_transactions = 1;
      uint64 balance = 2;
  }
  ```
  
  </TabItem>
</Tabs>





### GetTransactionsByAddress

<Tabs
  groupId="gettransactionsbyaddress"
  defaultValue="method"
  values={[
    {label: 'GetTransactionsByAddress', value: 'method'},
    {label: 'GetTransactionsByAddressReq', value: 'request'},
    {label: 'GetTransactionsByAddressResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetTransactionsByAddress
  
  ```go
  service PublicAPI
  {
      rpc GetTransactionsByAddress(GetTransactionsByAddressReq) returns (GetTransactionsByAddressResp) {
        option (google.api.http) = {
          get: "/transactions-by-address"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### GetTransactionsByAddressReq  

| Field | Type | Details | 
| :--: | :---: | :--- |  
| `address` | bytes | QRL Address to lookup |
| `item_per_page` | uint64 | Items per page to return |
| `page_number` | uint64 | Page number to return |

  ```go
  message GetTransactionsByAddressReq {
      bytes address = 1;
      uint64 item_per_page = 2;
      uint64 page_number = 3;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetTransactionsByAddressResp
  
| Field | Type | Details | 
| :--: | :---: | :--- | 
| `transactions_detail` | repeated [GetTransactionResp Object](#gettransactionresp-1) | <dl><dt>GetTransactionResp Object contains:</dt><dd style={{ display:'list-item' }}> tx</dd><dd style={{ display:'list-item' }}> confirmations</dd><dd style={{ display:'list-item' }}> block_number</dd><dd style={{ display:'list-item' }}> block_header_hash</dd><dd style={{ display:'list-item' }}> timestamp</dd><dd style={{ display:'list-item' }}> addr_from</dd></dl> |

  ```go
  message GetTransactionsByAddressResp {
      repeated GetTransactionResp transactions_detail = 1;
  }
  ```

  </TabItem>
</Tabs>




### GetTokensByAddress

<Tabs
  groupId="gettokensbyaddress"
  defaultValue="method"
  values={[
    {label: 'GetTokensByAddress', value: 'method'},
    {label: 'GetTransactionsByAddressReq', value: 'request'},
    {label: 'GetTokensByAddressResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetTokensByAddress
  
  ```go
  service PublicAPI
  {
      rpc GetTokensByAddress(GetTransactionsByAddressReq) returns (GetTokensByAddressResp) {
        option (google.api.http) = {
          get: "/tokens-by-address"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### GetTransactionsByAddressReq  

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `address` | bytes | QRL Address to lookup |
| `item_per_page` | uint64 | Items per page to return |
| `page_number` | uint64 | Page number to return |


  ```go
  message GetTransactionsByAddressReq {
      bytes address = 1;
      uint64 item_per_page = 2;
      uint64 page_number = 3;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetTokensByAddressResp

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `tokens_detail` | repeated [TokenDetail Object](#tokendetail) | <dl><dt>TokenDetail Object contains:</dt><dd style={{ display:'list-item' }}> token_txhash</dd><dd style={{ display:'list-item' }}> name</dd><dd style={{ display:'list-item' }}> symbol</dd><dd style={{ display:'list-item' }}> balance</dd></dl> |

  ```go
  message GetTokensByAddressResp {
      repeated TokenDetail tokens_detail = 1;
  }
  ```

  </TabItem>
</Tabs>



### GetSlavesByAddress

<Tabs
  groupId="getslavesbyaddress"
  defaultValue="method"
  values={[
    {label: 'GetSlavesByAddress', value: 'method'},
    {label: 'GetTransactionsByAddressReq', value: 'request'},
    {label: 'GetSlavesByAddressResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetSlavesByAddress
  
  ```go
  service PublicAPI
  {
      rpc GetSlavesByAddress(GetTransactionsByAddressReq) returns (GetSlavesByAddressResp) {
        option (google.api.http) = {
          get: "/slaves-by-address"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### GetTransactionsByAddressReq  

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `address` | bytes | Address to lookup for slave data |
| `item_per_page` | uint64 | items per page to return |
| `page_number` | uint64 | Page number to return |

  ```go
  message GetTransactionsByAddressReq {
      bytes address = 1;
      uint64 item_per_page = 2;
      uint64 page_number = 3;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetSlavesByAddressResp

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `slaves_detail` | repeated [SlaveDetail Object](#slavedetail) | <dl><dt>SlaveDetail Object contains:</dt><dd style={{ display:'list-item' }}> slave_address</dd><dd style={{ display:'list-item' }}> access_type</dd></dl> |


  ```go
  message GetSlavesByAddressResp {
      repeated SlaveDetail slaves_detail = 1;
  }
  ```
  
  </TabItem>
</Tabs>





### GetLatticePKsByAddress

Returns any Lattice keys associated with the QRL address given.

<Tabs
  groupId="getlatticepksbyaddress"
  defaultValue="method"
  values={[
    {label: 'GetLatticePKsByAddress', value: 'method'},
    {label: 'GetTransactionsByAddressReq', value: 'request'},
    {label: 'GetLatticePKsByAddressResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetLatticePKsByAddress

  ```go
  service PublicAPI
  {
      rpc GetLatticePKsByAddress(GetTransactionsByAddressReq) returns (GetLatticePKsByAddressResp) {
        option (google.api.http) = {
          get: "/lattice-pks-by-address"
        };
      };
  }
  ```
  
  </TabItem>
  
  <TabItem value="request">

  #### GetTransactionsByAddressReq  

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `address` | bytes | QRL Address to lookup |
| `item_per_page` | uint64 | Items per page to return |
| `page_number` | uint64 | Page number to return |

  ```go
  message GetTransactionsByAddressReq {
      bytes address = 1;
      uint64 item_per_page = 2;
      uint64 page_number = 3;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetLatticePKsByAddressResp

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `lattice_pks_detail` | repeated [LatticePKsDetail Object](#latticepksdetail) | <dl><dt>LatticePKsDetail Object contains:</dt><dd style={{ display:'list-item' }}> pk1</dd><dd style={{ display:'list-item' }}> pk2</dd><dd style={{ display:'list-item' }}> pk3</dd><dd style={{ display:'list-item' }}> tx_hash</dd></dl> |


  ```go
  message GetLatticePKsByAddressResp {
      repeated LatticePKsDetail lattice_pks_detail = 1;
  }
  ```

  </TabItem>
</Tabs>



### GetMultiSigAddressesByAddress

Lookup and return all multisig addresses associated with a QRL address

<Tabs
  groupId="getmultisigaddressesbyaddress"
  defaultValue="method"
  values={[
    {label: 'GetMultiSigAddressesByAddress', value: 'method'},
    {label: 'GetTransactionsByAddressReq', value: 'request'},
    {label: 'GetMultiSigAddressesByAddressResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetMultiSigAddressesByAddress

  ```go
  service PublicAPI
  {
      rpc GetMultiSigAddressesByAddress(GetTransactionsByAddressReq) returns (GetMultiSigAddressesByAddressResp) {
        option (google.api.http) = {
          get: "/multi-sig-addresses-by-address"
        };
      };
  }
  ```
  
  </TabItem>
  
  <TabItem value="request">

  #### GetTransactionsByAddressReq  

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `address` |  bytes | QRL Address for lookup |
| `item_per_page` |  uint64 | Items to return per page |
| `page_number` |  uint64 | Number of page to return |


  ```go
  message GetTransactionsByAddressReq {
      bytes address = 1;
      uint64 item_per_page = 2;
      uint64 page_number = 3;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetMultiSigAddressesByAddressResp


| Field | Type | Details | 
| :--: | :---: | :--- | 
| `multi_sig_detail` | repeated [MultiSigDetail Object](#multisigdetail) | <dl><dt>MultiSigDetail Object contains:</dt><dd style={{ display:'list-item' }}> address</dd><dd style={{ display:'list-item' }}> balance</dd></dl> |


  ```go
  message GetMultiSigAddressesByAddressResp {
      repeated MultiSigDetail multi_sig_detail = 1;
  }
  ```

  </TabItem>
</Tabs>



### GetMultiSigSpendTxsByAddress

Returns any multisig spend transactions associated with the address given.

<Tabs
  groupId="getmultisigspendtxsbyaddress"
  defaultValue="method"
  values={[
    {label: 'GetMultiSigSpendTxsByAddress', value: 'method'},
    {label: 'GetMultiSigSpendTxsByAddressReq', value: 'request'},
    {label: 'GetMultiSigSpendTxsByAddressResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetMultiSigSpendTxsByAddress
  
  ```go
  service PublicAPI
  {
      rpc GetMultiSigSpendTxsByAddress(GetMultiSigSpendTxsByAddressReq) returns (GetMultiSigSpendTxsByAddressResp) {
        option (google.api.http) = {
          get: "/multi-sig-spend-txs-by-address"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### GetMultiSigSpendTxsByAddressReq

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `address` | bytes | QRL address to lookup |
| `item_per_page` | uint64 | Items per page to return |
| `page_number` | uint64 | Page number to return |
| `filter_type` | FilterType Object | NONE, EXECUTED_ONLY, NON_EXECUTED, EXPIRED, NON_EXPIRED, NON_EXECUTED_EXPIRED, NON_EXECUTED_NON_EXPIRED |

  ```go
  message GetMultiSigSpendTxsByAddressReq {
      enum FilterType {
          NONE = 0;
          EXECUTED_ONLY = 1;
          NON_EXECUTED = 2;
          EXPIRED = 3;
          NON_EXPIRED = 4;
          NON_EXECUTED_EXPIRED = 5;
          NON_EXECUTED_NON_EXPIRED = 6;
      }
      bytes address = 1;
      uint64 item_per_page = 2;
      uint64 page_number = 3;
      FilterType filter_type = 4;
  }
  ```
  </TabItem>
  <TabItem value="response">

  #### GetMultiSigSpendTxsByAddressResp

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `transactions_detail` | repeated [GetTransactionResp Object](#gettransactionresp-1) | <dl><dt>GetTransactionResp Object contains:</dt><dd style={{ display:'list-item' }}><dt style={{ display:'list-item' }}> tx</dt><dd style={{ display:'list-item' }}> multi_sig_address</dd><dd style={{ display:'list-item' }}> addrs_to</dd><dd style={{ display:'list-item' }}> amounts</dd><dd style={{ display:'list-item' }}> expiry_block_number</dd></dd><dd style={{ display:'list-item' }}> confirmations</dd><dd style={{ display:'list-item' }}> block_number</dd><dd style={{ display:'list-item' }}> block_header_hash</dd><dd style={{ display:'list-item' }}> timestamp</dd><dd style={{ display:'list-item' }}> addr_from</dd></dl>  |

  ```go
  message GetMultiSigSpendTxsByAddressResp {
      repeated GetTransactionResp transactions_detail = 1;
  }
  ```

  </TabItem>
</Tabs>



### GetVoteStats

Returns multisig spend vote stats with a given multisig spend transaction hash

<Tabs
  groupId="getvotestats"
  defaultValue="method"
  values={[
    {label: 'GetVoteStats', value: 'method'},
    {label: 'GetVoteStatsReq', value: 'request'},
    {label: 'GetVoteStatsResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetVoteStats
  
  ```go
  service PublicAPI
  {
      rpc GetVoteStats(GetVoteStatsReq) returns (GetVoteStatsResp) {
        option (google.api.http) = {
          get: "/vote-stats"
        };
      };

  }
  ```

  </TabItem>
  
  <TabItem value="request">


  #### GetVoteStatsReq  


| Field | Type | Details | 
| :--: | :---: | :--- | 
| `multi_sig_spend_tx_hash` | bytes | multisig transaction hash for stats |

  ```go
  message GetVoteStatsReq {
      bytes multi_sig_spend_tx_hash = 1;
  }
  ```

  </TabItem>
  <TabItem value="response">


  #### GetVoteStatsResp


| Field | Type | Details | 
| :--: | :---: | :--- | 
| `vote_stats` | [VoteStats Object](#votestats) |  <dl><dt>VoteStats Object contains:</dt><dd style={{ display:'list-item' }}> multi_sig_address</dd><dd style={{ display:'list-item' }}> shared_key</dd><dd style={{ display:'list-item' }}> signatories</dd><dd style={{ display:'list-item' }}> tx_hashes</dd><dd style={{ display:'list-item' }}> unvotes</dd><dd style={{ display:'list-item' }}> expiry_block_number</dd><dd style={{ display:'list-item' }}> total_weight</dd><dd style={{ display:'list-item' }}> executed</dd></dl> |



  ```go
  message GetVoteStatsResp {
      VoteStats vote_stats = 1;
  }
  ```
  
  </TabItem>
</Tabs>



### GetInboxMessagesByAddress

<Tabs
  groupId="getinboxmessagesbyaddress"
  defaultValue="method"
  values={[
    {label: 'GetInboxMessagesByAddress', value: 'method'},
    {label: 'GetTransactionsByAddressReq', value: 'request'},
    {label: 'GetInboxMessagesByAddressResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetInboxMessagesByAddress
  
  ```go
  service PublicAPI
  {
      rpc GetInboxMessagesByAddress(GetTransactionsByAddressReq) returns (GetInboxMessagesByAddressResp) {
        option (google.api.http) = {
          get: "/inbox-messages-by-address"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### GetTransactionsByAddressReq  


| Field | Type | Details | 
| :--: | :---: | :--- | 
| `address` | bytes | QRL address to lookup |
| `item_per_page` | uint64 | Items per page to return |
| `page_number` | uint64 | page number to return |

  ```go
  message GetTransactionsByAddressReq {
      bytes address = 1;
      uint64 item_per_page = 2;
      uint64 page_number = 3;
  }
  ```

  </TabItem>
  <TabItem value="response">

  #### GetInboxMessagesByAddressResp

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `transactions_detail`  | repeated [GetTransactionResp Object](#gettransactionresp-1) |  |

  ```go
  message GetInboxMessagesByAddressResp {
      repeated GetTransactionResp transactions_detail = 1;
  }
  ```
  
  </TabItem>
</Tabs>



### GetBalance

Returns a given QRL address balance

<Tabs
  groupId="getbalance"
  defaultValue="method"
  values={[
    {label: 'GetBalance', value: 'method'},
    {label: 'GetBalanceReq', value: 'request'},
    {label: 'GetBalanceResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetBalance
  
  ```go
  service PublicAPI
  {
      rpc GetBalance(GetBalanceReq) returns (GetBalanceResp) {
        option (google.api.http) = {
          get: "/balance"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### GetBalanceReq  

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `address` | bytes | QRL Address to lookup for balance |

```go
message GetBalanceReq {
    bytes address = 1;
}
```

  </TabItem>  
  <TabItem value="response">

  #### GetBalanceResp

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `balance` | uint64 | Balance response with latest known balance |

```go
message GetBalanceResp {
    uint64 balance = 1;
}
```

  </TabItem>
</Tabs>


### GetTotalBalance

Returns total balance of all addresses given. 

<Tabs
  groupId="gettotalbalance"
  defaultValue="method"
  values={[
    {label: 'GetTotalBalance', value: 'method'},
    {label: 'GetTotalBalanceReq', value: 'request'},
    {label: 'GetTotalBalanceResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetTotalBalance
  
  ```go
  service PublicAPI
  {
      rpc GetTotalBalance(GetTotalBalanceReq) returns (GetTotalBalanceResp) {
        option (google.api.http) = {
          get: "/total-balance"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### GetTotalBalanceReq  

| Field | Type | Details | 
| :--: | :---: | :--- | 
| `addresses` | repeated bytes | List of QRL addresses for address lookup  |

```go
message GetTotalBalanceReq {
    repeated bytes addresses = 1;
}
```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetTotalBalanceResp
  
| Field | Type | Details |
| :--: | :---: | :--- |
| `balance` |  uint64 | Combined balance of all addresses in request |

```go
message GetTotalBalanceResp {
    uint64 balance = 1;
}
```

  </TabItem>
</Tabs>



### GetOTS

:::caution Need clarification
Define the Request parameters 
:::

<Tabs
  groupId="getots"
  defaultValue="method"
  values={[
    {label: 'GetOTS', value: 'method'},
    {label: 'GetOTSReq', value: 'request'},
    {label: 'GetOTSResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetOTS
  
  ```go
  service PublicAPI
  {
      rpc GetOTS(GetOTSReq) returns (GetOTSResp) {
        option (google.api.http) = {
          get: "/ots"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### GetOTSReq  

| Field | Type | Details |
| :--: | :---: | :--- |
| `address` | address | QRL Address to lookup OTS keys |
| `page_from` | page_from | Page to return starting point |
| `page_count` | page_count | Count of pages to return |
| `unused_ots_index_from` | unused_ots_index_from |  |


```go
message GetOTSReq {
    bytes address = 1;
    uint64 page_from = 2;
    uint64 page_count = 3;
    uint64 unused_ots_index_from = 4;
}
```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetOTSResp

| Field | Type | Details |
| :--: | :---: | :--- |
| `ots_bitfield_by_page` | repeated [OTSBitfieldByPage Object](#otsbitfieldbypage) | <dl><dt>OTSBitfieldByPage Object contains:</dt><dd style={{ display:'list-item' }}> ots_bitfield</dd><dd style={{ display:'list-item' }}> page_number</dd></dl> |
| `next_unused_ots_index` | uint64 | Next available un-used OTS key for the address given |
| `unused_ots_index_found` | bool | If any available OTS keys exist for the address given |

  ```go
  message GetOTSResp {
      repeated OTSBitfieldByPage ots_bitfield_by_page = 1;
      uint64 next_unused_ots_index = 2;
      bool unused_ots_index_found = 3;
  }
  ```

  #### GetOTSResp

  ```go
  message OTSBitfieldByPage {
      repeated bytes ots_bitfield = 1;
      uint64 page_number = 2;
  }
  ```

  </TabItem>
</Tabs>


### GetHeight

:::caution Need clarification
Define this function and response values 
:::

<Tabs
  groupId="getheight"
  defaultValue="method"
  values={[
    {label: 'GetHeight', value: 'method'},
    {label: 'GetHeightReq', value: 'request'},
    {label: 'GetHeightResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetHeight
  
  ```go
  service PublicAPI
  {
      rpc GetHeight(GetHeightReq) returns (GetHeightResp) {
        option (google.api.http) = {
          get: "/height"
        };
      };
  }
  ```

  </TabItem>
  
  <TabItem value="request">

  #### GetHeightReq  

  ```go
  message GetHeightReq {
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetHeightResp
  
| Field | Type | Details |
| :--: | :---: | :--- |
| `height` | uint64 |  |

  ```go
  message GetHeightResp {
      uint64 height = 1;
  }
  ```

  </TabItem>
</Tabs>



### GetBlock

Returns QRL block data from given block header hash

<Tabs
  groupId="getblock"
  defaultValue="method"
  values={[
    {label: 'GetBlock', value: 'method'},
    {label: 'GetBlockReq', value: 'request'},
    {label: 'GetBlockResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetBlock
  

  ```go
  service PublicAPI
  {
      rpc GetBlock(GetBlockReq) returns (GetBlockResp) {
        option (google.api.http) = {
          get: "/block"
        };
      };
  }
  ```
  </TabItem>
  
  <TabItem value="request">

  #### GetBlockReq  

| Field | Type | Details |
| :--: | :---: | :--- |
| `header_hash` | bytes | Block header hash to lookup |

```go
message GetBlockReq {
    bytes header_hash = 1;
}
```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetBlockResp

| Field | Type | Details |
| :--: | :---: | :--- |
| `block` | [Block object](#block) | <dl><dt>Block Object contains:</dt><dd style={{ display:'list-item' }}> header</dd><dd style={{ display:'list-item' }}> transactions</dd></dl>  |

```go
message GetBlockResp {
    Block block = 1;
}
```
  
  </TabItem>
</Tabs>

### GetBlockByNumber

Returns block data by given block number.

<Tabs
  groupId="getblockbynumber"
  defaultValue="method"
  values={[
    {label: 'GetBlockByNumber', value: 'method'},
    {label: 'GetBlockByNumberReq', value: 'request'},
    {label: 'GetBlockByNumberResp', value: 'response'},
  ]}>
  <TabItem value="method">

  #### GetBlockByNumber
  
  ```go
  service PublicAPI
  {
      rpc GetBlockByNumber(GetBlockByNumberReq) returns (GetBlockByNumberResp) {
        option (google.api.http) = {
          get: "/block-by-number"
        };
      };
  }
  ```
  
  </TabItem>
  
  <TabItem value="request">

  #### GetBlockByNumberReq  

| Field | Type | Details |
| :--: | :---: | :--- |
| `block_number` | uint64 | Block number for lookup |

```go
message GetBlockByNumberReq {
    uint64 block_number = 1;
}
```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetBlockByNumberResp

| Field | Type | Details |
| :--: | :---: | :--- |
| `block` | [Block object](#block) | <dl><dt>Block Object contains:</dt><dd style={{ display:'list-item' }}> header</dd><dd style={{ display:'list-item' }}> transactions</dd></dl>  |

```go
message GetBlockByNumberResp {
    Block block = 1;
}
```
  
  </TabItem>
</Tabs>





## Content

### NodeInfo

Node info returns the following:

| Field | Type | Details | 
| :--: | :---: | :--- |
| `version` | string | The version of the QRL node |
| `state` | State | One of  *UNKNOWN, UNSYNCED, SYNCING, SYNCED, FORKED* signifying the state of the node |
| `num_connections` | uint32 | Number of connections seen to node |
| `num_known_peers` | uint32 | Number of know peers seen by node |
| `uptime` | uint64 | The uptime of the node in seconds |
| `block_height` | uint64 | Blockheight currently known to node |
| `block_last_hash` | bytes | Last block hash; |
| `network_id` | string | Network ID |


```go
message NodeInfo
{
    enum State {
        UNKNOWN = 0;
        UNSYNCED = 1;
        SYNCING = 2;
        SYNCED = 3;
        FORKED = 4;
    }

    string version = 1;
    State  state = 2;
    uint32 num_connections = 3;
    uint32 num_known_peers = 4;
    uint64 uptime = 5;               // Uptime in seconds
    uint64 block_height = 6;
    bytes  block_last_hash = 7;
    string network_id = 8;
}

```

### AddressDescriptor

:::caution Define this function
Define this function and request parameters
:::


| Name | Bits | Count | Description |
| ---- | ---- | ----- | ----------- |
| *HF* | *0 .. 3* | *4* | *Hash Function* |
| *SIG* | *4 .. 7* | *4* | *Signature Scheme* |
| *P1* | *8 .. 11* | *4* | *Parameters 1 (ie. height, etc.)* |
| *P2* | *12 .. 15* | *4* | *Address Format* |
| *P3* | *16 .. 23* | *8* | *Parameters 2* |

In the case of using XMSS, the parameters are used as follows:

| Name | Bits | Count | Description |
| ---- | ---- | ----- | ----------- |
| *HF* | *0 .. 3* | *4* | *SHA2-256, SHAKE128, SHAKE256* |
| *SIG* | *4 .. 7* | *4* | *XMSS* |
| *P1* | *8 .. 11* | *4* | *XMSS Height / 2* |
| *AF* | */ P2 12* | *.* |. *15 4 Address Format* |
| *P3* | *16 .. 23* | *8* | *Not used* |

```go

// 3 byte scheme, 0-3 bits = hf, 4-7 = sig scheme, 8-11 = params (inc h), 12-15 addr fmt, 16-23 params2
message AddressDescriptor {
    string hash_function = 1;
    string signature_scheme = 2;
    uint32 tree_height = 3;
    uint32 signatures = 4;
    string address_format = 5;
}
```



### StoredPeers

| Field | Type | Details | 
| :--: | :---: | :--- |
| `peers` | repeated [Peer Object](#peer) | <dl><dt>Peer Object contains:</dt><dd style={{ display:'list-item' }}> ip</dd></dl> |


```go
message StoredPeers {
    repeated Peer peers = 1;
}
```

### Peer

| Field | Type | Details | 
| :--: | :---: | :--- |
| `ip` | string | Returns the public peer IP Address |

```go
message Peer {
    string ip = 1;
}
```

### AddressState

| Field | Type | Details | 
| :---: | :---: | :--- |
| `address` | bytes | Pub Address in bytes |
| `balance` | uint64 | Address balance |
| `nonce` | uint64 | Address Nonce |
| `ots_bitfield` | repeated bytes | One Time Signature Bitfield |
| `transaction_hashes` | repeated bytes | Repeated list of all transaction hashes |
| `tokens` | map<string, uint64> | Map of tokens found in address |
| `latticePK_list` | repeated [LatticePK](#latticepk) | Repeated list of lattice public keys |
| `slave_pks_access_type` | map<string, uint32> | Map of slave key access type |
| `ots_counter` | uint64 | Count of used OTS Keys |


```go
message AddressState {
    bytes address = 1;
    uint64 balance = 2;
    uint64 nonce = 3;                           
    repeated bytes ots_bitfield = 4;
    repeated bytes transaction_hashes = 5;
    map<string, uint64> tokens = 6;
    repeated LatticePK latticePK_list = 7;
    map<string, uint32> slave_pks_access_type = 8;
    uint64 ots_counter = 9;
}
```
### OptimizedAddressState

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `address` | bytes | Pub Address in bytes  |
| `balance` | uint64 | Address balance  |
| `nonce` | uint64 | Address Nonce  |
| `ots_bitfield_used_page` | uint64 | Keep track of last page till which all ots key has been used |
| `used_ots_key_count` | uint64 | Keep track of number of ots key that has been used |
| `transaction_hash_count` | uint64 | |
| `tokens_count` | uint64 | |
| `slaves_count` | uint64 | |
| `lattice_pk_count` | uint64 | |
| `multi_sig_address_count` | uint64 | |
| `multi_sig_spend_count` | uint64 | |
| `inbox_message_count` | uint64 | |
| `foundation_multi_sig_spend_txn_hash` | repeated | |
| `foundation_multi_sig_vote_txn_hash` | repeated | |
| `unvotes` | repeated | |
| `proposal_vote_stats` | repeated | |


```go
message OptimizedAddressState {
    bytes address = 1;
    uint64 balance = 2;
    uint64 nonce = 3;
    uint64 ots_bitfield_used_page = 4;  // Keep track of last page till which all ots key has been used
    uint64 used_ots_key_count = 5;  // Keep track of number of ots key that has been used
    uint64 transaction_hash_count = 6;
    uint64 tokens_count = 7;
    uint64 slaves_count = 8;
    uint64 lattice_pk_count = 9;
    uint64 multi_sig_address_count = 10;
    uint64 multi_sig_spend_count = 11;
    uint64 inbox_message_count = 12;

    repeated bytes foundation_multi_sig_spend_txn_hash = 13;
    repeated bytes foundation_multi_sig_vote_txn_hash = 14;
    repeated bytes unvotes = 15;

    repeated Transaction proposal_vote_stats = 16;
}
```
### MultiSigAddressState

:::caution Define this function
Define this function and request parameters
:::


| Field | Type | Details | 
| :---: | :---: | :--- |
| `address` | bbytes | Pub Address in bytes  |
| `creation_tx_hash` | bytes | | 
| `nonce` | uint64  | | 
| `balance` | uint64 | Address balance  |
| `signatories` | bytes  | |
| `weights` | uint32  | | 
| `threshold` | uint32  | | 
| `transaction_hash_count` | uint64  | | 
| `multi_sig_spend_count` | uint64  | | 
| `multi_sig_address_count` | uint64  | | 
| `foundation_multi_sig_spend_txn_hash` | bytes  | | 
| `foundation_multi_sig_vote_txn_hash` | bytes  | | 
| `unvotes` | bytes  | | 
| `proposal_vote_stats` | [Transaction Object](#transaction)  | Returns a transaction object with address state proposal vote stats | 

```go
message MultiSigAddressState {
    bytes address = 1;
    bytes creation_tx_hash = 2;
    uint64 nonce = 3;
    uint64 balance = 4;
    repeated bytes signatories = 5;
    repeated uint32 weights = 6;
    uint32 threshold = 7;
    uint64 transaction_hash_count = 8;
    uint64 multi_sig_spend_count = 9;
    // TODO: To be implemented
    uint64 multi_sig_address_count = 10;

    repeated bytes foundation_multi_sig_spend_txn_hash = 11;
    repeated bytes foundation_multi_sig_vote_txn_hash = 12;
    repeated bytes unvotes = 13;

    repeated Transaction proposal_vote_stats = 14;
}
```

### MultiSigAddressesList

:::caution Define this function
Define this function and request parameters
:::


| Field | Type | Details | 
| :---: | :---: | :--- |
| `hashes` | repeated bytes |  |

```go
message MultiSigAddressesList {
    repeated bytes hashes = 1;
}
```

### DataList

:::caution Define this function
Define this function and request parameters
:::


| Field | Type | Details | 
| :---: | :---: | :--- |
| `values` | repeated bytes |  |

```go
message DataList {
    repeated bytes values = 1;
}
```

### Bitfield

:::caution Define this function
Define this function and request parameters
:::


| Field | Type | Details | 
| :---: | :---: | :--- |
| bitfields | repeated bytes | |

```go
message Bitfield {
    repeated bytes bitfields = 1;
}
```

### TransactionHashList

:::caution Define this function
Define this function and request parameters
:::


| Field | Type | Details | 
| :---: | :---: | :--- |
| `hashes` | repeated bytes |  |

```go
message TransactionHashList {
    repeated bytes hashes = 1;
}
```
### LatticePK

:::caution Define this function
Define this function and request parameters
:::


| Field | Type | Details | 
| :---: | :---: | :--- |
| `kyber_pk` | bytes |  |
| `dilithium_pk` | bytes |  |

```go
message LatticePK {
    bytes kyber_pk = 1;
    bytes dilithium_pk = 2;
}
```
### AddressAmount 

:::caution Define this function
Define this function and request parameters
:::


| Field | Type | Details | 
| :---: | :---: | :--- |
| `address` | bytes |  |  
| `amount` | uint64 |  |  


```go
message AddressAmount {
    bytes address = 1;
    uint64 amount = 2;
}
```
### BlockHeader

:::caution Define this function
Define this function and request parameters
:::


| Field | Type | Details | 
| :---: | :---: | :--- |
| `hash_header` | bytes |  |
| `block_number` | uint64 |  |
| `timestamp_seconds` | uint64 |  |
| `hash_header_prev` | bytes |  |
| `reward_block` | uint64 |  |
| `reward_fee` | uint64 |  |
| `merkle_root` | bytes |  |
| `mining_nonce` | uint32 |  |
| `extra_nonce` | uint64 |  |


```go
message BlockHeader {
    // Header
    bytes hash_header = 1;

    uint64 block_number = 2;
    uint64 timestamp_seconds = 3;
    bytes hash_header_prev = 4;
    uint64 reward_block = 5;
    uint64 reward_fee = 6;
    bytes merkle_root = 7;

    uint32 mining_nonce = 8;
    uint64 extra_nonce = 9;
}
```
### BlockHeaderExtended

:::caution Define this function
Define this function and request parameters
:::


| Field | Type | Details | 
| :---: | :---: | :--- |
| `header` | [BlockHeader Object](#blockheader) |  |
| `transaction_count` | [TransactionCount Object](#transactioncount) |  |

```go
message BlockHeaderExtended {
    BlockHeader header = 1;
    TransactionCount transaction_count = 2;
}
```
### TransactionCount

:::caution Define this function
Define this function and request parameters
:::


| Field | Type | Details | 
| :---: | :---: | :--- |
| `count` | map<uint32, uint32>  |  |

```go
message TransactionCount {
    map<uint32, uint32> count = 1;
}
```

### TransactionExtended

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `header` | [BlockHeader Object](#blockheader)  |  |
| `tx` | [Transaction Object](#transacction)  |  |
| `addr_from` | bytes  |  |
| `size` | uint64  |  |
| `timestamp_seconds` | uint64  |  |
```go
message TransactionExtended {
    BlockHeader header = 1;
    Transaction tx = 2;
    bytes addr_from = 3;
    uint64 size = 4;
    uint64 timestamp_seconds = 5;
}
```


### BlockExtended

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `header` | [BlockHeader Object](#blockheader) |  |
| `extended_transactions` | repeated [TransactionExtended Object](#transactionextended) |  |
| \*`genesis_balance` | repeated [GenesisBalance Object](#genesisbalance) | This is only applicable to genesis blocks |
| `size` | uint64 | Block size |

:::note \* Genesis_Balance
`genesis_balance` is only applicable to genesis blocks.
:::

```go
message BlockExtended {
    BlockHeader header = 1;
    repeated TransactionExtended extended_transactions = 2;

    // This is only applicable to genesis blocks
    repeated GenesisBalance genesis_balance = 3;
    uint64 size = 4;
}
```



### Block

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `header` | [BlockHeader Object](#blockheader) |  |
| `transactions` | [Transaction Object](#transaction) |  |
| \*`genesis_balance` | [repeated GenesisBalance Object](#genesisbalance) | This is only applicable to genesis blocks |

:::note \* Genesis_Balance
`genesis_balance` is only applicable to genesis blocks.
:::

```go
message Block {
    BlockHeader header = 1;
    repeated Transaction transactions = 2;

    // This is only applicable to genesis blocks
    repeated GenesisBalance genesis_balance = 3;
}
```



### GenesisBalance

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `address` | bytes | Address is string only here to increase visibility |
| `balance` | uint64 |  |

```go
message GenesisBalance
{
    bytes address = 1;                     // Address is string only here to increase visibility
    uint64 balance = 2;
}
```



### BlockMetaDataList

| Field | Type | Details | 
| :---: | :---: | :--- |
| `block_number_hashes` | repeated [BlockMetaData Object](#blockmetadata) | <dl><dt>BlockMetaData object contains:</dt>    <dd style={{ display:'list-item' }}>block_difficulty</dd><dd style={{ display:'list-item' }}>cumulative_difficulty</dd><dd style={{ display:'list-item' }}>child_headerhashes</dd><dd style={{ display:'list-item' }}>last_N_headerhashes</dd>    </dl> |

```go
message BlockMetaDataList {
    repeated BlockMetaData block_number_hashes = 1;
}
```



### Transaction

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `master_addr` | bytes |  |
| `fee` | uint64 |  |
| `public_key` | bytes |  |
| `signature` | bytes |  |
| `nonce` | uint64 |  |
| `transaction_hash` | bytes |  |
| `transactionType` | One of: | <dl><dt>transactionType:</dt>    <dd style={{ display:'list-item' }}>transfer</dd><dd style={{ display:'list-item' }}>coinbase</dd><dd style={{ display:'list-item' }}>latticePK</dd><dd style={{ display:'list-item' }}>message</dd><dd style={{ display:'list-item' }}>token</dd><dd style={{ display:'list-item' }}>transfer_token</dd><dd style={{ display:'list-item' }}>slave</dd><dd style={{ display:'list-item' }}>multi_sig_create</dd><dd style={{ display:'list-item' }}>multi_sig_spend</dd><dd style={{ display:'list-item' }}>multi_sig_vote</dd><dd style={{ display:'list-item' }}>proposal_create</dd><dd style={{ display:'list-item' }}>proposal_vote</dd>    </dl> |


```go
message Transaction {
    bytes master_addr = 1;
    uint64 fee = 2;
    bytes public_key = 3;
    bytes signature = 4;
    uint64 nonce = 5;
    bytes transaction_hash = 6;

    oneof transactionType {
        Transfer transfer = 7;
        CoinBase coinbase = 8;
        LatticePublicKey latticePK = 9;
        Message message = 10;
        Token token = 11;
        TransferToken transfer_token = 12;
        Slave slave = 13;

        MultiSigCreate multi_sig_create = 14;
        MultiSigSpend multi_sig_spend = 15;
        MultiSigVote multi_sig_vote = 16;

        ProposalCreate proposal_create = 17;
        ProposalVote proposal_vote = 18;
    }

    message Transfer {
        repeated bytes addrs_to = 1;
        repeated uint64 amounts = 2;
        bytes message_data = 3;
    }

    message CoinBase {
        bytes addr_to = 1;
        uint64 amount = 2;
    }

    message LatticePublicKey {
        bytes pk1 = 1;  // kyber_pk
        bytes pk2 = 2;  // dilithium_pk
        bytes pk3 = 3;  // ecdsa_pk
    }

    message Message {
        bytes message_hash = 1;
        bytes addr_to = 2;
    }

    message Token {
        bytes symbol = 1;
        bytes name = 2;
        bytes owner = 3;
        uint64 decimals = 4;
        repeated AddressAmount initial_balances = 5;
    }

    message TransferToken {
        bytes token_txhash = 1;
        repeated bytes addrs_to = 2;
        repeated uint64 amounts = 3;
    }

    message Slave {
        repeated bytes slave_pks = 1;
        repeated uint32 access_types = 2;
    }

    message MultiSigCreate {
        repeated bytes signatories = 1;
        repeated uint32 weights = 2;
        uint32 threshold = 3;
    }

    message MultiSigSpend {
        bytes multi_sig_address = 1;
        repeated bytes addrs_to = 2;
        repeated uint64 amounts = 3;
        uint64 expiry_block_number = 4;
    }

    message MultiSigVote {
        bytes shared_key = 1;
        bool unvote = 2;

        bytes prev_tx_hash = 3;  // To be used internally by State
    }

    message ProposalCreate {
        uint64 expiry_block_number = 1;
        string description = 2;

        oneof proposalType {
            QIP qip = 3;
            Config config = 4;
            Other other = 5;
        }

        message QIP {
            string qip_link = 1;
        }

        message Config {
            repeated bytes changes_bitfield = 1;

            uint64 reorg_limit = 2;
            uint64 max_coin_supply = 3;
            uint64 complete_emission_time_span_in_years = 4;

            uint64 mining_nonce_offset = 5;
            uint64 extra_nonce_offset = 6;
            uint64 mining_blob_size_in_bytes = 7;
            uint64 block_timing_in_seconds = 8;

            uint64 number_of_blocks_analyze = 9;
            uint64 block_size_multiplier = 10;  // Support upto 2 decimal places
            uint64 block_min_size_limit_in_bytes = 11;

            uint64 transaction_multi_output_limit = 12;

            uint64 message_max_length = 13;

            uint64 token_symbol_max_length = 14;
            uint64 token_name_max_length = 15;

            uint64 lattice_pk1_max_length = 16;
            uint64 lattice_pk2_max_length = 17;
            uint64 lattice_pk3_max_length = 18;

            uint64 foundation_multi_sig_address_threshold_percentage = 19;

            uint64 proposal_threshold_per = 20;
            repeated string proposal_default_options = 21;
            uint64 description_max_length = 22;
            uint64 options_max_number = 23;
            uint64 option_max_text_length = 24;
            uint64 proposal_config_activation_delay = 25;

            uint64 N_measurement = 26;
            uint64 kp = 27;
        }

        message Other {
            repeated string options = 1;
        }
    }

    message ProposalVote {
        bytes shared_key = 1;
        uint32 option = 2;
    }
}
```


### MiniTransaction

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `transaction_hash` | string |  |
| `out` | bool |  |
| `amount` | uint64 |  |


```go
message MiniTransaction {
    string transaction_hash = 1;
    bool out = 2;
    uint64 amount = 3;
}
```



### GetTransactionResp 

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `tx` |Transaction |  | 
| `confirmations` |uint64 |  | 
| `block_number` |uint64 |  | 
| `block_header_hash` |bytes |  | 
| `timestamp` |uint64 |  | 
| `addr_from` |bytes |  | 

```go
message GetTransactionResp {
    Transaction tx = 1;
    uint64 confirmations = 2;
    uint64 block_number = 3;
    bytes block_header_hash = 4;
    uint64 timestamp = 5;
    bytes addr_from = 6;
}
```


### TokenDetail

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `token_txhash` | bytes |  |
| `name` | bytes |  |
| `symbol` | bytes |  |
| `balance` | uint64 |  |


```go
message TokenDetail {
    bytes token_txhash = 1;
    bytes name = 2;
    bytes symbol = 3;
    uint64 balance = 4;
}
```


### SlaveDetail

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `slave_address` | bytes |  |
| `access_type` | uint64 |  |

```go
message SlaveDetail {
    bytes slave_address = 1;
    uint64 access_type = 2;
}
```


### LatticePKsDetail

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `pk1` | bytes |  |
| `pk2` | bytes |  |
| `pk3` | bytes |  |
| `tx_hash` | bytes |  |

```go
message LatticePKsDetail {
    bytes pk1 = 1;
    bytes pk2 = 2;
    bytes pk3 = 3;
    bytes tx_hash = 4;
}
```


### MultiSigDetail

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `address` | bytes  |  |
| `balance` | uint64  |  |

```go
message MultiSigDetail {
    bytes address = 1;
    uint64 balance = 2;
}
```


### VoteStats

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `multi_sig_address` | bytes | |
| `shared_key` | bytes | |
| `signatories` | repeated bytes | |
| `tx_hashes` | repeated bytes | |
| `unvotes` | repeated bool | |
| `expiry_block_number` | uint64 | |
| `total_weight` | uint64 | |
| `executed` | bool | |


```go
message VoteStats {
    bytes multi_sig_address = 1;
    bytes shared_key = 2;
    repeated bytes signatories = 3;
    repeated bytes tx_hashes = 4;
    repeated bool unvotes = 5;
    uint64 expiry_block_number = 6;
    uint64 total_weight = 7;
    bool executed = 8;
}
```


### ProposalVoteStats

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `addr_from` |bytes |  |
| `shared_key` |bytes |  |
| `proposal_type` |string |  |
| `weight_by_option` |repeated uint64 |  |
| `expiry_block_number` |uint64 |  |
| `executed` |bool |  | 
| `number_of_tx_hashes` |uint64 | Keep track of number of pages for vote txn hash |


```go
message ProposalVoteStats {
    bytes addr_from = 1;
    bytes shared_key = 2;
    string proposal_type = 3;
    repeated uint64 weight_by_option = 4;
    uint64 expiry_block_number = 5;
    bool executed = 6;

    uint64 number_of_tx_hashes = 7;  // Keep track of number of pages for vote txn hash
}
```


### ProposalRecord

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `number_of_tx_hashes` | uint64 |  |


```go
message ProposalRecord {
    uint64 number_of_tx_hashes = 1;
}
```


### TokenList

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `token_txhash` | repeated bytes |  |

```go
message TokenList {
    repeated bytes token_txhash = 1;
}
```


### TokenBalance

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `balance` | uint64 |  |
| `decimals` | uint64 |  |
| `tx_hash` | bytes | Tx hash responsible for the creation of this data |
| `delete` | bool | For internal use only |


```go
message TokenBalance {
    uint64 balance = 1;
    uint64 decimals = 2;
    bytes tx_hash = 3; // Tx hash responsible for the creation of this data
    bool delete = 4;  // For internal use only
}
```


### OTSBitfieldByPage

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `ots_bitfield` | repeated bytes  |  |
| `page_number` | uint64  |  |

```go
message OTSBitfieldByPage {
    repeated bytes ots_bitfield = 1;
    uint64 page_number = 2;
}
```


### SlaveMetadata

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `access_type` | uint64  |  |
| `tx_hash` | bytes  |  |
| `delete` | bool  |  |

```go
message SlaveMetadata {
    uint64 access_type = 1;
    bytes tx_hash = 2;
    bool delete = 3;
}
```


### LatticePKMetadata

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `enabled` | bool |  |
| `tx_hash` | bytes |  |
| `delete` | bool |  |

```go
message LatticePKMetadata {
    bool enabled = 1;
    bytes tx_hash = 2;
    bool delete = 3;
}
```


### TokenMetadata

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `token_txhash` | bytes |  |
| `transfer_token_tx_hashes` | repeated bytes |  |

```go
message TokenMetadata {
    bytes token_txhash = 1;
    repeated bytes transfer_token_tx_hashes = 2;
}
```


### EncryptedEphemeralMessage

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `msg_id` | bytes | NEW or PRF |
| `ttl` | uint64 |  Expiry Timestamp in seconds |
| `ttr` | uint64 |  Time to relay |
| `channel` | Channel Object |<dl><dt>Channel object contains:</dt><dd style={{ display:'list-item' }}>enc_aes256_symkey</dd></dl>  |
| `nonce` | uint64 |  nonce |
| `payload` | bytes | JSON content, encrypted by aes256_symkey |

```go
message EncryptedEphemeralMessage {
    bytes msg_id = 1;                       // b'NEW' or PRF
    uint64 ttl = 2;                         // Expiry Timestamp in seconds
    uint64 ttr = 3;                         // Time to relay
    message Channel {
        bytes enc_aes256_symkey = 4;        // aes256_symkey encrypted by kyber
    }
    Channel channel = 5;
    uint64 nonce = 6;                       // nonce
    bytes payload = 7;                      // JSON content, encrypted by aes256_symkey
}
```


### AddressList

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `addresses` | repeated bytes |  |

```go
message AddressList {
    repeated bytes addresses = 1;
}
```


### BlockHeightData

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `block_number` |  |  |
| `block_headerhash` |  |  |
| `cumulative_difficulty` |  |  |

```go
message BlockHeightData {
    uint64 block_number = 1;
    bytes block_headerhash = 2;
    bytes cumulative_difficulty = 3;
}
```


### BlockMetaData

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `block_difficulty` | bytes |  |
| `cumulative_difficulty` | bytes |  |
| `child_headerhashes` | repeated bytes |  |
| `last_N_headerhashes` | repeated bytes | Keeps last N headerhashes, for measurement of timestamp difference |

```go
message BlockMetaData {
    bytes block_difficulty = 1;
    bytes cumulative_difficulty = 2;
    repeated bytes child_headerhashes = 3;
    repeated bytes last_N_headerhashes = 4;     // Keeps last N headerhashes, for measurement of timestamp difference
}
```


### BlockNumberMapping

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `headerhash` | bytes |  |
| `prev_headerhash` | bytes |  |

```go
message BlockNumberMapping {
    bytes headerhash = 1;
    bytes prev_headerhash = 2;
}
```



### PeerStat

`PeerStat` returns stats on a peer.

| Field | Type | Details | 
| :---: | :---: | :--- |
| `peer_ip` | bytes | Peer public IP address |
| `port` | uint32 | peer p2p open port |
| `node_chain_state` | [NodeChainState Object](#nodechainstate) | <dl><dt>NodeChainState object contains:</dt><dd style={{ display:'list-item' }}>block_number</dd><dd style={{ display:'list-item' }}>header_hash</dd><dd style={{ display:'list-item' }}>cumulative_difficulty</dd><dd style={{ display:'list-item' }}>version</dd><dd style={{ display:'list-item' }}>timestamp</dd></dl> |

```go
message PeerStat {
    bytes peer_ip = 1;
    uint32 port = 2;
    NodeChainState node_chain_state = 3;
}
```

:::note
See the [NodeChainState object](#nodechainstate) for more information
:::



### NodeChainState

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `block_number` | uint64 |  |  |
| `header_hash` | bytes |  |  |
| `cumulative_difficulty` | bytes |  |  |
| `version` | string |  |  |
| `timestamp` | uint64 |  |  |


```go
message NodeChainState {
    uint64 block_number = 1;
    bytes header_hash = 2;
    bytes cumulative_difficulty = 3;
    string version = 4;
    uint64 timestamp = 5;
}
```


### NodeHeaderHash

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `block_number` | uint64 |  |
| `headerhashes` | repeated bytes |  |


```go
message NodeHeaderHash {
    uint64 block_number = 1;
    repeated bytes headerhashes = 2;
}
```


### P2PAcknowledgement

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `bytes_processed` | uint32 |  |

```go
message P2PAcknowledgement {
    uint32 bytes_processed = 1;
}
```


### PeerInfo

`PeerInfo` returns data on a peer.


| Field | Type | Details | 
| :---: | :---: | :--- |
| `peer_ip` | bytes | Peer's public IP address |
| `port` | uint32 | p2p open port of peer |
| `banned_timestamp` | uint32 | timestamp if peer has ban |
| `credibility` | uint32 | credibility rating |
| `last_connections_timestamp` | repeated uint32 | last seen connection time |

```go
message PeerInfo {
    bytes peer_ip = 1;
    uint32 port = 2;
    uint32 banned_timestamp = 3;
    uint32 credibility = 4;
    repeated uint32 last_connections_timestamp = 5;
}
```


### Peers

Peers message returns all information from the [PeerInfo](#peerinfo) message function.


| Field | Type | Details | 
| :---: | :---: | :--- |
| `peer_info_list` | repeated [PeerInfo Object](#peerinfo) | <dl><dt>PeerInfo object contains:</dt><dd style={{ display:'list-item' }}>peer_ip</dd><dd style={{ display:'list-item' }}>port</dd><dd style={{ display:'list-item' }}>banned_timestamp</dd><dd style={{ display:'list-item' }}>credibility</dd><dd style={{ display:'list-item' }}>last_connections_timestamp</dd></dl> |

```go
message Peers {
    repeated PeerInfo peer_info_list = 1;
}
```


### BlockDataPoint

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `number` | uint64  | Block number |
| `difficulty` | string  | Block difficulty |
| `timestamp` | uint64  | Block timestamp |
| `time_last` | uint64  |  |
| `time_movavg` | uint64  |  |
| `hash_power` | float  | Hash power |
| `header_hash` | bytes  | Block header hash |
| `header_hash_prev` | bytes  | Previous block's header hash |

```go
/**
 * BlockDataPoint message definition
*/
message BlockDataPoint
{
    uint64 number = 1;                      // Block number
    string difficulty = 2;                  // Block difficulty
    uint64 timestamp = 3;                   // Block timestamp
    uint64 time_last = 4;
    uint64 time_movavg = 5;
    float hash_power = 6;                   // Hash power

    bytes header_hash = 7;                  // Block header hash
    bytes header_hash_prev = 8;             // Previous block's header hash
}
```


### DevConfig

:::caution Define this function
Define this function and request parameters
:::

| Field | Type | Details | 
| :---: | :---: | :--- |
| `prev_state_key` | bytes |  |
| `current_state_key` | bytes |  |
| `activation_header_hash` | bytes |  |
| `activation_block_number` | uint64 |  |
| `chain` | Chain Object | <dl><dt>Dev Chain object contains:</dt><dd style={{ display:'list-item' }}>reorg_limit</dd><dd style={{ display:'list-item' }}>max_coin_supply</dd><dd style={{ display:'list-item' }}>complete_emission_time_span_in_years</dd></dl> |
| `block` | Block Object | <dl><dt>Dev Block object contains:</dt><dd style={{ display:'list-item' }}>mining_nonce_offset</dd><dd style={{ display:'list-item' }}>extra_nonce_offset</dd><dd style={{ display:'list-item' }}>mining_blob_size_in_bytes</dd><dd style={{ display:'list-item' }}>block_timing_in_seconds</dd><dd style={{ display:'list-item' }}> <dt>block_size_controller</dt> <dd style={{ display:'list-item' }}>number_of_blocks_analyze</dd><dd style={{ display:'list-item' }}>size_multiplier</dd><dd style={{ display:'list-item' }}>block_min_size_limit_in_bytes</dd></dd></dl> |
| `transaction` | Transaction Object | <dl><dt>Dev Transaction object contains:</dt><dd style={{ display:'list-item' }}>multi_output_limit</dd><dd style={{ display:'list-item' }}><dt>message</dt>  <dd style={{ display:'list-item' }}>max_length</dd>  </dd><dd style={{ display:'list-item' }}><dt>slave</dt>  <dd style={{ display:'list-item' }}>slave_pk_max_length</dd>  </dd><dd style={{ display:'list-item' }}><dt>token</dt>  <dd style={{ display:'list-item' }}>symbol_max_length</dd><dd style={{ display:'list-item' }}>name_max_length</dd>  </dd><dd style={{ display:'list-item' }}><dt>lattice</dt>  <dd style={{ display:'list-item' }}>pk1_max_length</dd><dd style={{ display:'list-item' }}>pk2_max_length</dd><dd style={{ display:'list-item' }}>pk3_max_length</dd>  </dd><dd style={{ display:'list-item' }}><dt>foundation_multi_sig</dt>  <dd style={{ display:'list-item' }}>threshold_percentage</dd>  </dd><dd style={{ display:'list-item' }}><dt>proposal</dt>  <dd style={{ display:'list-item' }}>threshold_per</dd><dd style={{ display:'list-item' }}>default_options</dd><dd style={{ display:'list-item' }}>description_max_length</dd><dd style={{ display:'list-item' }}>options_max_number</dd><dd style={{ display:'list-item' }}>option_max_text_length</dd><dd style={{ display:'list-item' }}>proposal_config_activation_delay</dd>  </dd></dl> |
| `pow` | POW Object | <dl><dt>POW object contains:</dt><dd style={{ display:'list-item' }}>N_measurement</dd><dd style={{ display:'list-item' }}>kp</dd></dl> |


```go
message DevConfig {
    bytes prev_state_key = 1;
    bytes current_state_key = 2;
    bytes activation_header_hash = 3;
    uint64 activation_block_number = 4;

    Chain chain = 5;
    Block block = 6;
    Transaction transaction = 7;
    POW pow = 8;

    message Chain {
        uint64 reorg_limit = 1;
        uint64 max_coin_supply = 2;
        uint64 complete_emission_time_span_in_years = 3;
    }

    message Block {
        uint64 mining_nonce_offset = 1;
        uint64 extra_nonce_offset = 2;
        uint64 mining_blob_size_in_bytes = 3;
        uint64 block_timing_in_seconds = 4;
        BlockSizeController block_size_controller = 5;

        message BlockSizeController {
            uint64 number_of_blocks_analyze = 1;
            uint64 size_multiplier = 2;  // Support upto 2 decimal places
            uint64 block_min_size_limit_in_bytes = 3;
        }
    }

    message Transaction {
        uint64 multi_output_limit = 1;
        Message message = 2;
        Slave slave = 3;
        Token token = 4;
        Lattice lattice = 5;
        FoundationMultiSig foundation_multi_sig = 6;
        Proposal proposal = 7;

        message Message {
            uint64 max_length = 1;
        }

        message Slave {
            uint64 slave_pk_max_length = 2;
        }

        message Token {
            uint64 symbol_max_length = 1;
            uint64 name_max_length = 2;
        }

        message Lattice {
            uint64 pk1_max_length = 1;
            uint64 pk2_max_length = 2;
            uint64 pk3_max_length = 3;
        }

        message FoundationMultiSig {
            uint64 threshold_percentage = 1;  // Support upto 2 decimal places
        }

        message Proposal {
            uint64 threshold_per = 1;  // Support upto 2 decimal places
            repeated string default_options = 2;  // Convention: All strings must be in capital letters

            uint64 description_max_length = 3;
            uint64 options_max_number = 4;
            uint64 option_max_text_length = 5;
            uint64 proposal_config_activation_delay = 6;
        }
    }

    message POW {
        uint64 N_measurement = 1;
        uint64 kp = 2;
    }
}
```
