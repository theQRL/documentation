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
      State  statGetKnownPeersRespe = 2;
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

  ```go
  message GetAddressStateResp {
      AddressState state = 1;
  }
  ```
  
  </TabItem>
</Tabs>




### GetOptimizedAddressState

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

  ```go
  message GetOptimizedAddressStateResp {
      OptimizedAddressState state = 1;
  }
  ```
    
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

  ```go
  message GetMultiSigAddressStateReq {
      bytes address = 1;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetMultiSigAddressStateResp

  ```go
  message GetMultiSigAddressStateResp {
      MultiSigAddressState state = 1;
  }
  ```
  
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
  
  ```go
  message IsSlaveReq {
      bytes master_address = 1;
      bytes slave_pk = 2;
  }
  ```
  </TabItem>
  
  <TabItem value="response">

 
  #### IsSlaveResp
  
  ```go
  message IsSlaveResp {
      bool result = 1;
  }
  ```


  </TabItem>
</Tabs>




### GetObject

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

  ```go
  message GetObjectReq {  
      bytes query = 1;    
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetObjectResp

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
      uint32 quantity = 3;                    // Number of items to retrive. Capped at 100
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetLatestDataResp

  ```go
  message GetLatestDataResp {
      repeated BlockHeaderExtended blockheaders = 1;
      repeated TransactionExtended transactions = 2;
      repeated TransactionExtended transactions_unconfirmed = 3;
  }
  ```    

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

  ```go
  message PushTransactionReq {    
      Transaction transaction_signed = 1;     
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### PushTransactionResp

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
  
```go
message TransferCoinsResp {
    TransactionExtended extended_transaction_unsigned = 1;
}
```  
  </TabItem>
</Tabs>




### ParseAddress

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

```go
message ParseAddressReq { 
    bytes address = 1;
}
```


  </TabItem>
  
  <TabItem value="response">

 
  #### ParseAddressResp


```go
message ParseAddressResp {
    bool is_valid = 1;
    AddressDescriptor desc = 2;
}
```
  
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

  message GetChainStatsReq { }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetChainStatsResp
  
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

  ```go
  message GetAddressFromPKReq {
      bytes pk = 1;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetAddressFromPKResp
  
  ```go
  message GetAddressFromPKResp {
      bytes address = 1;
  }
  ```

  </TabItem>
</Tabs>




### GetMultiSigCreateTxn

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

  ```go 
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```

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
  
  ```go
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```

  </TabItem>
</Tabs>




### GetMultiSigVoteTxn


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

  ```go
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```
  
  </TabItem>
</Tabs>




### GetMessageTxn

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

  ```go
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```

  
  </TabItem>
</Tabs>





### GetTokenTxn

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

  ```go
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```

  
  </TabItem>
</Tabs>




### GetTransferTokenTxn

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

  ```go
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```

  
  </TabItem>
</Tabs>




### GetSlaveTxn

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

  ```go
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```

  </TabItem>
</Tabs>




### GetLatticeTxn

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

  ```go
  message LatticeTxnReq {
      bytes master_addr = 1;
      bytes pk1 = 2;
      bytes pk2 = 3;
      bytes pk3 = 4;
      uint64 fee = 5;
      bytes xmss_pk = 6;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### TransferCoinsResp

  ```go
  message TransferCoinsResp {
      TransactionExtended extended_transaction_unsigned = 1;
  }
  ```
  
  </TabItem>
</Tabs>





### GetTransaction

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

  ```go
  message GetTransactionReq {
      bytes tx_hash = 1;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetTransactionResp

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

  ```go
  message GetSlavesByAddressResp {
      repeated SlaveDetail slaves_detail = 1;
  }
  ```
  
  </TabItem>
</Tabs>




### GetLatticePKsByAddress

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

  ```go
  message GetLatticePKsByAddressResp {
      repeated LatticePKsDetail lattice_pks_detail = 1;
  }
  ```

  </TabItem>
</Tabs>




### GetMultiSigAddressesByAddress

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
  
  ```go
  message GetMultiSigAddressesByAddressResp {
      repeated MultiSigDetail multi_sig_detail = 1;
  }
  ```

  </TabItem>
</Tabs>



### GetMultiSigSpendTxsByAddress

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
  

  ```go
  message GetMultiSigSpendTxsByAddressResp {
      repeated GetTransactionResp transactions_detail = 1;
  }
  ```

  </TabItem>
</Tabs>




### GetVoteStats

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

  ```go
  message GetVoteStatsReq {
      bytes multi_sig_spend_tx_hash = 1;
  }
  ```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetVoteStatsResp

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

  ```go
  message GetInboxMessagesByAddressResp {
      repeated GetTransactionResp transactions_detail = 1;
  }
  ```
  
  </TabItem>
</Tabs>




### GetBalance

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

```go
message GetBalanceReq {
    bytes address = 1;
}
```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetBalanceResp
  
```go
message GetBalanceResp {
    uint64 balance = 1;
}
```

  </TabItem>
</Tabs>




### GetTotalBalance

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

```go
message GetTotalBalanceReq {
    repeated bytes addresses = 1;
}
```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetTotalBalanceResp
  
```go
message GetTotalBalanceResp {
    uint64 balance = 1;
}
```

  </TabItem>
</Tabs>





### GetOTS

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
  
  ```go
  message GetHeightResp {
      uint64 height = 1;
  }
  ```

  </TabItem>
</Tabs>




### GetBlock

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

```go
message GetBlockReq {
    bytes header_hash = 1;
}
```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetBlockResp

```go
message GetBlockResp {
    Block block = 1;
}
```
  
  </TabItem>
</Tabs>




### GetBlockByNumber

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

```go
message GetBlockByNumberReq {
    uint64 block_number = 1;
}
```

  </TabItem>
  
  <TabItem value="response">

 
  #### GetBlockByNumberResp

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
| `version` | (string) | The version of the QRL node |
| `state` | (State) | One of  *UNKNOWN, UNSYNCED, SYNCING, SYNCED, FORKED* signifying the state of the node |
| `num_connections` | (uint32) | Number of connections seen to node |
| `num_known_peers` | (uint32) | Number of know peers seen by node |
| `uptime` | (uint64) | The uptime of the node in seconds |
| `block_height` | (uint64) | Blockheight currently known to node |
| `block_last_hash` | (bytes) | Last block hash; |
| `network_id` | (string) | Network ID |


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


```go
message StoredPeers {
    repeated Peer peers = 1;
}
```

### Peer

```go
message Peer {
    string ip = 1;
}
```


### AddressState

| Field | Type | Details | 
| :---: | :---: | :---: |
| address | bytes | Pub Address in bytes |
| balance | uint64 | Address balance |
| nonce | uint64 | Address Nonce |
| ots_bitfield | repeated bytes | One Time Signature Bitfield |
| transaction_hashes | repeated bytes | Repeated list of all transaction hashes |
| tokens | map<string, uint64> | Map of tokens found in address |
| latticePK_list | repeated [LatticePK](#latticepk) | Repeated list of lattice public keys |
| slave_pks_access_type | map<string, uint32> | Map of slave key access type |
| ots_counter | uint64 | Count of used OTS Keys |


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

| Field | Type | Details | 
| :---: | :---: | :---: |
| address | bytes | Pub Address in bytes  |
| balance | uint64 | Address balance  |
| nonce | uint64 | Address Nonce  |
| ots_bitfield_used_page | uint64 | Keep track of last page till which all ots key has been used |
| used_ots_key_count | uint64 | Keep track of number of ots key that has been used |
| transaction_hash_count | uint64 | |
| tokens_count | uint64 | |
| slaves_count | uint64 | |
| lattice_pk_count | uint64 | |
| multi_sig_address_count | uint64 | |
| multi_sig_spend_count | uint64 | |
| inbox_message_count | uint64 | |
| foundation_multi_sig_spend_txn_hash | repeated | |
| foundation_multi_sig_vote_txn_hash | repeated | |
| unvotes | repeated | |
| proposal_vote_stats | repeated | |


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

```go
message MultiSigAddressesList {
    repeated bytes hashes = 1;
}
```
### DataList

```go
message DataList {
    repeated bytes values = 1;
}
```
### Bitfield

```go
message Bitfield {
    repeated bytes bitfields = 1;
}
```
### TransactionHashList

```go
message TransactionHashList {
    repeated bytes hashes = 1;
}
```
### LatticePK

```go
message LatticePK {
    bytes kyber_pk = 1;
    bytes dilithium_pk = 2;
}
```
### AddressAmount 

```go
message AddressAmount {
    bytes address = 1;
    uint64 amount = 2;
}
```
### BlockHeader

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

```go
message BlockHeaderExtended {
    BlockHeader header = 1;
    TransactionCount transaction_count = 2;
}
```
### TransactionCount

```go
message TransactionCount {
    map<uint32, uint32> count = 1;
}
```

### TransactionExtended

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

```go
message Block {
    BlockHeader header = 1;
    repeated Transaction transactions = 2;

    // This is only applicable to genesis blocks
    repeated GenesisBalance genesis_balance = 3;
}
```

### GenesisBalance

```go
message GenesisBalance
{
    bytes address = 1;                     // Address is string only here to increase visibility
    uint64 balance = 2;
}
```

### BlockMetaDataList

```go
message BlockMetaDataList {
    repeated BlockMetaData block_number_hashes = 1;
}
```

### Transaction

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

### VoteStats

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

```go
message ProposalRecord {
    uint64 number_of_tx_hashes = 1;
}
```

### TokenList

```go
message TokenList {
    repeated bytes token_txhash = 1;
}
```

### TokenBalance

```go
message TokenBalance {
    uint64 balance = 1;
    uint64 decimals = 2;
    bytes tx_hash = 3; // Tx hash responsible for the creation of this data
    bool delete = 4;  // For internal use only
}
```

### SlaveMetadata

```go
message SlaveMetadata {
    uint64 access_type = 1;
    bytes tx_hash = 2;
    bool delete = 3;
}
```

### LatticePKMetadata

```go
message LatticePKMetadata {
    bool enabled = 1;
    bytes tx_hash = 2;
    bool delete = 3;
}
```

### TokenMetadata

```go
message TokenMetadata {
    bytes token_txhash = 1;
    repeated bytes transfer_token_tx_hashes = 2;
}
```

### EncryptedEphemeralMessage

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

```go
message AddressList {
    repeated bytes addresses = 1;
}
```

### BlockHeightData

```go
message BlockHeightData {
    uint64 block_number = 1;
    bytes block_headerhash = 2;
    bytes cumulative_difficulty = 3;
}
```

### BlockMetaData

```go
message BlockMetaData {
    bytes block_difficulty = 1;
    bytes cumulative_difficulty = 2;
    repeated bytes child_headerhashes = 3;
    repeated bytes last_N_headerhashes = 4;     // Keeps last N headerhashes, for measurement of timestamp difference
}
```

### BlockNumberMapping

```go
message BlockNumberMapping {
    bytes headerhash = 1;
    bytes prev_headerhash = 2;
}
```

### PeerStat

```go
message PeerStat {
    bytes peer_ip = 1;
    uint32 port = 2;
    NodeChainState node_chain_state = 3;
}
```


### NodeChainState

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

```go
message NodeHeaderHash {
    uint64 block_number = 1;
    repeated bytes headerhashes = 2;
}
```


### P2PAcknowledgement

```go
message P2PAcknowledgement {
    uint32 bytes_processed = 1;
}
```


### PeerInfo

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

```go
message Peers {
    repeated PeerInfo peer_info_list = 1;
}
```

### DevConfig

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
