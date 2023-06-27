---
docstatus: DRAFT
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
| :---: | :---: | :---: |
| [GetNodeState](#getnodestate) | [GetNodeStateReq](#getnodestate) | [GetNodeStateResp](#getnodestate) |
| [GetKnownPeers](#getknownpeers) | [GetKnownPeersReq](#getknownpeers) | [GetKnownPeersResp](#getknownpeers) |
| [GetPeersStat](#getpeersstat) | [GetPeersStatReq](#getpeersstat) | [GetPeersStatResp](#getpeersstat) |
| [GetStats](#getstats) | [GetStatsReq](#getstats) | [GetStatsResp](#getstats) |
| [GetAddressState](#getaddressstate) | GetAddressStateReq | GetAddressStateResp |
| [GetOptimizedAddressState](#getoptimizedaddressstate) | GetAddressStateReq | GetOptimizedAddressStateResp |
| [GetMultiSigAddressState](#getmultisigaddressstate) | GetMultiSigAddressStateReq | GetMultiSigAddressStateResp |
| [IsSlave](#isslave) | IsSlaveReq | IsSlaveResp |
| [GetObject](#getobject) | GetObjectReq | GetObjectResp |
| [GetLatestData](#getlatestdata) | GetLatestDataReq | GetLatestDataResp |
| [PushTransaction](#pushtransaction) | PushTransactionReq | PushTransactionResp |
| [TransferCoins](#transfercoins) | TransferCoinsReq | TransferCoinsResp |
| [ParseAddress](#parseaddress) | ParseAddressReq | ParseAddressResp |
| [GetChainStats](#getchainstats) | GetChainStatsReq | GetChainStatsResp |
| [GetAddressFromPK](#getaddressfrompk) | GetAddressFromPKReq | GetAddressFromPKResp |
| [GetMultiSigCreateTxn](#getmultisigcreatetxn) | MultiSigCreateTxnReq | TransferCoinsResp |
| [GetMultiSigSpendTxn](#getmultisigspendtxn) | MultiSigSpendTxnReq | TransferCoinsResp |
| [GetMultiSigVoteTxn](#getmultisigvotetxn) | MultiSigVoteTxnReq | TransferCoinsResp |
| [GetMessageTxn](#getmessagetxn) | MessageTxnReq | TransferCoinsResp |
| [GetTokenTxn](#gettokentxn) | TokenTxnReq | TransferCoinsResp |
| [GetTransferTokenTxn](#gettransfertokentxn) | TransferTokenTxnReq | TransferCoinsResp |
| [GetSlaveTxn](#getslavetxn) | SlaveTxnReq | TransferCoinsResp |
| [GetLatticeTxn](#getlatticetxn) | LatticeTxnReq | TransferCoinsResp |
| [GetTransaction](#gettransaction) | GetTransactionReq | GetTransactionResp |
| [GetMiniTransactionsByAddress](#getminitransactionsbyaddress) | GetMiniTransactionsByAddressReq | GetMiniTransactionsByAddressResp |
| [GetTransactionsByAddress](#gettransactionsbyaddress) | GetTransactionsByAddressReq | GetTransactionsByAddressResp |
| [GetTokensByAddress](#gettokensbyaddress) | GetTransactionsByAddressReq | GetTokensByAddressResp |
| [GetSlavesByAddress](#getslavesbyaddress) | GetTransactionsByAddressReq | GetSlavesByAddressResp |
| [GetLatticePKsByAddress](#getlatticepksbyaddress) | GetTransactionsByAddressReq | GetLatticePKsByAddressResp |
| [GetMultiSigAddressesByAddress](#getmultisigaddressesbyaddress) | GetTransactionsByAddressReq | GetMultiSigAddressesByAddressResp |
| [GetMultiSigSpendTxsByAddress](#getmultisigspendtxsbyaddress) | GetMultiSigSpendTxsByAddressReq | GetMultiSigSpendTxsByAddressResp |
| [GetVoteStats](#getvotestats) | GetVoteStatsReq | GetVoteStatsResp |
| [GetInboxMessagesByAddress](#getinboxmessagesbyaddress) | GetTransactionsByAddressReq | GetInboxMessagesByAddressResp |
| [GetBalance](#getbalance) | GetBalanceReq | GetBalanceResp |
| [GetTotalBalance](#gettotalbalance) | GetTotalBalanceReq | GetTotalBalanceResp |
| [GetOTS](#getots) | GetOTSReq | GetOTSResp |
| [GetHeight](#getheight) | GetHeightReq | GetHeightResp |
| [GetBlock](#getblock) | GetBlockReq | GetBlockResp |
| [GetBlockByNumber](#getblockbynumber) | GetBlockByNumberReq | GetBlockByNumberResp |




### GetNodeState

Retrieves the current state of the QRL node.

The response `GetNodeStateResp` contains the following fields:

| Field | Type | Details | 
| :--: | :---: | :--- |
| `version` | (string) | The version of the QRL node |
| `state` | (State) | One of  *UNKNOWN, UNSYNCED, SYNCING, SYNCED, FORKED* signifying the state of the node |
| `num_connections` | (uint32) | Number of connections seen to node |
| `num_known_peers` | (uint32) | Number of know peers seen by node |
| `uptime` | (uint64) | The uptime of the node in seconds |
| `block_height` | (uint64) | Blockheight currently known to node |
| `block_last_hash` | (bytes) | Last block hash; |
| `network_id` | (string) | Network ID |


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


  ```go
  /**
   * Represents the reply message to node state query
  */
  message GetNodeStateResp {
      NodeInfo info = 1;
  }

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
  </TabItem>

</Tabs>





### GetKnownPeers

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
  
  ```go
  /**
   * Represents the reply message to known peers query
  */
  message GetKnownPeersResp {
      NodeInfo node_info = 1;             // NodeInfo object containing node state information
      repeated Peer known_peers = 2;      // List of Peer objects containing peer nodes detailed information
  }


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

  message Peer {
      string ip = 1;
  }
  ```

  </TabItem>
</Tabs>






### GetPeersStat


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
  
  ```go
  /**
   * Represents the reply message to peers stat query
  */
  message GetPeersStatResp {
      repeated PeerStat peers_stat = 1;    // PeerState object contains peer_ip, port and peer state information
  }

  message PeerStat {
      bytes peer_ip = 1;
      uint32 port = 2;
      NodeChainState node_chain_state = 3;
  }
  ```
  </TabItem>
</Tabs>



### GetStats

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
  
  ```go
  /**
   * Represents the reply message to get statistics about node
  */
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

  </TabItem>
</Tabs>





### GetAddressState



<Tabs
  groupId="getaddressstate"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method

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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetOptimizedAddressState



<Tabs
  groupId="getoptimizedaddressstate"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetMultiSigAddressState



<Tabs
  groupId="getmultisigaddressstate"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### IsSlave



<Tabs
  groupId="isslave"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetObject



<Tabs
  groupId="getobject"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method

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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetLatestData



<Tabs
  groupId="getlatestdata"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### PushTransaction



<Tabs
  groupId="pushtransaction"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### TransferCoins



<Tabs
  groupId="transfercoins"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### ParseAddress



<Tabs
  groupId="parseaddress"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetChainStats



<Tabs
  groupId="getchainstats"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetAddressFromPK



<Tabs
  groupId="getaddressfrompk"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetMultiSigCreateTxn


<Tabs
  groupId="getmultisigcreatetxn"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>



### GetMultiSigSpendTxn



<Tabs
  groupId="getmultisigspendtxn"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetMultiSigVoteTxn



<Tabs
  groupId="getmultisigvotetxn"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetMessageTxn



<Tabs
  groupId="getmessagetxn"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetTokenTxn



<Tabs
  groupId="gettokentxn"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetTransferTokenTxn



<Tabs
  groupId="gettransfertokentxn"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetSlaveTxn



<Tabs
  groupId="getslavetxn"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetLatticeTxn



<Tabs
  groupId="getlatticetxn"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetTransaction



<Tabs
  groupId="gettransaction"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetMiniTransactionsByAddress


<Tabs
  groupId="getminitransactionsbyaddress"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>



### GetTransactionsByAddress



<Tabs
  groupId="gettransactionsbyaddress"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  


  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetTokensByAddress



<Tabs
  groupId="gettokensbyaddress"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetSlavesByAddress



<Tabs
  groupId="getslavesbyaddress"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetLatticePKsByAddress


<Tabs
  groupId="getlatticepksbyaddress"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method

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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetMultiSigAddressesByAddress

<Tabs
  groupId="getmultisigaddressesbyaddress"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method

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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>



### GetMultiSigSpendTxsByAddress



<Tabs
  groupId="getmultisigspendtxsbyaddress"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetVoteStats



<Tabs
  groupId="getvotestats"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetInboxMessagesByAddress



<Tabs
  groupId="getinboxmessagesbyaddress"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetBalance



<Tabs
  groupId="getbalance"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetTotalBalance



<Tabs
  groupId="gettotalbalance"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetOTS



<Tabs
  groupId="getots"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetHeight



<Tabs
  groupId="getheight"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetBlock




<Tabs
  groupId="getblock"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>


### GetBlockByNumber



<Tabs
  groupId="getblockbynumber"
  defaultValue="method"
  values={[
    {label: 'Method', value: 'method'},
    {label: 'Request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="method">

  #### Method
  
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

  #### Request  



  </TabItem>
  
  <TabItem value="response">

 
  #### Response
  
  </TabItem>
</Tabs>

