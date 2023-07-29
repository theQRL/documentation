---
docstatus: 30%
id: explorer-api
title: QRL API - Explorer
hide_title: false
hide_table_of_contents: false
sidebar_label: API - Explorer
sidebar_position: 6
pagination_label: API - Explorer
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL API - Explorer
keywords:
  - docs
  - build
  - developers
  - API
  - Explorer
image: /assets/img/icons/yellow.png
slug: /api/explorer-api
---


:::caution DOCUMENT STATUS 

<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


The QRL block explorer has been built with an API endpoint to enable an easy way for developers to grab data from the QRL blockchain. This endpoint is limited in scope and may change in future iterations of the explorer.

:::info
The Explorer API queries the explorer node infrastructure and returns a response in either JSON or text. This is intended to simplify the process of developing tools for the QRL.
:::


The Explore endpoint is reached at [explorer.theQRL.org](https://explorer.theqrl.org/). The API response can be either text or json depending on the developers needs. By default JSON is returned, simply append /text to the API query.

Far an easy to read output use a browser add-on like Chrome's [jsonview](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc) and browse to the endpoint.


## Explorer API Methods


:::info
Default response is in JSON format Append /text to the end of most requests to get a simple text response [https://explorer.theqrl.org/api/{REQUEST}/text](https://explorer.theqrl.org/api/blockheight/text)
:::


| Method Name | Endpoint | Description | 
| ----------- | ------------ | ------------- | 
| [Block](#block-by-number) | [/api/block/#](#block-by-number) | Get data from a specific block number |
| [Transaction ](#transaction-by-hash) | [/api/tx/](#transaction-by-hash) | Get data from a transaction by number |
| [Address](#address-by-number) | [/api/a/](#address-by-number) | Get data from an address |
| [Emission](#emission) | [/api/emission](https://explorer.theqrl.org/api/emission) | Get the total emission of coins to date  |
| [reward](#reward) | [/api/reward](https://explorer.theqrl.org/api/reward) | Get the current payout reward value |
| [rewardshor](#rewardshor) | [/api/rewardshor](https://explorer.theqrl.org/api/rewardshor) | Get the current reward in shor |
| [blockheight](#blockheight) | [/api/blockheight](https://explorer.theqrl.org/api/blockheight) | Get the current blockheight |
| [status](#network-status) | [/api/status](https://explorer.theqrl.org/api/status) | Get the status of the network |



## Block By Number

Get any block details by block number. 

**Request**

| **Parameter** | **Description** |
| --- | --- |
| block | Block Number |

**Response**

| **Parameter** | **Description** |
| --- | --- |
| code | Error Code. Only appears if any exception is triggered. |
| json | Block Details in JSON Response |


:::info
`/api/block/` requests will only return in JSON format. Parse the response using json tools in a language of your choice. 
:::

**cURL Example**

```bash
curl -XGET https://explorer.theqrl.org/api/block/34556
```

**Python Example**

```python
def getblockByNumber(block_number):
  import requests
  import json
  request = requests.get('https://explorer.theqrl.org/api/block/'+block_number)
  response = request.text
  getBlockResp = json.loads(response)
  jsonResponse = getBlockResp
  return(jsonResponse)

getblockByNumber("34556")
```

## Transaction By Hash


Get data from a transaction by number

**Request**

| **Parameter** | **Description** |
| --- | --- |
| transaction | Transaction Hash |

**Response**

| **Parameter** | **Description** |
| --- | --- |
| code | Error Code. Only appears if any exception is triggered. |
| json | Transaction Details in JSON Response |


:::info
`/api/tx/` requests will only return in JSON format. 
Parse the response using json tools in a language of your choice. 
:::

**cURL Example**

```bash
curl -XGET https://explorer.theqrl.org/api/tx/c9656d989bce2000c794314b73882b0ebb99fa1fe58e7a466a8a64e7b851a4c6

```

**Python Example**

```python
def getTransactionByHash(tx_hash):
  import requests
  import json
  request = requests.get('https://explorer.theqrl.org/api/tx/'+tx_hash)
  response = request.text
  getTXResp = json.loads(response)
  jsonResponse = getTXResp
  return(jsonResponse)

getTransactionByHash("c9656d989bce2000c794314b73882b0ebb99fa1fe58e7a466a8a64e7b851a4c6")
```

## Address By Number


Get address data by number.

**Request**

| **Parameter** | **Description** |
| --- | --- |
| address | QRL Address |

**Response**

| **Parameter** | **Description** |
| --- | --- |
| code | Error Code. Only appears if any exception is triggered. |
| json | Address Details in JSON Response |

:::info
`/api/a/` requests will only return in JSON format. 
Parse the response using json tools in a language of your choice. 
:::


**cURL Example**

```bash
curl -XGET https://explorer.theqrl.org/api/a/Q01040007a591a62c23ed27adfe3df8eb812ee5e4b73e47fb8471e8d78ecd9b4cadc325ca36d86e
```

**Python Example**

```python
def getAddress(address):
  import requests
  import json
  request = requests.get('https://explorer.theqrl.org/api/a/'+address)
  response = request.text
  getAddressResp = json.loads(response)
  jsonResponse = getAddressResp
  return(jsonResponse)

getAddress("Q01040007a591a62c23ed27adfe3df8eb812ee5e4b73e47fb8471e8d78ecd9b4cadc325ca36d86e")
```

## Emission

Get the total QRL emission to date.

**Request**

| **Parameter** | **Description** |
| --- | --- |
| emission | emission request |

**Response**

| **Parameter** | **Description** |
| --- | --- |
| code | Error Code. Only appears if any exception is triggered. |
| json | Emission Details in JSON Response |

:::info 
`/api/emission` requests can return both JSON format as well as simple text. 
:::

**cURL Example**

```bash
curl -XGET https://explorer.theqrl.org/api/emission
```

**Python Example**

```python
def getEmission():
  import requests
  import json
  request = requests.get("https://explorer.theqrl.org/api/emission")
  response = request.text
  getEmissionResp = json.loads(response)
  jsonResponse = getEmissionResp
  return(jsonResponse)


getEmission()
```

This request will also return text output by appending /text as shown below.


**Text Request**

| **Parameter** | **Description** |
| --- | --- |
| emission/text | emission text request |


**Text Response**

| **Parameter** | **Description** |
| --- | --- |
| code | Error Code. Only appears if any exception is triggered. |
| text | Emission Details in simple TEXT Response |


**cURL Example**

```bash
curl -XGET https://explorer.theqrl.org/api/emission/text
```

**Python Example**

```python
def getEmissionText():
  import requests
  import json
  request = requests.get("https://explorer.theqrl.org/api/emission/text")
  response = request.text
  getEmissionResp = json.loads(response)
  jsonResponse = getEmissionResp
  return(jsonResponse)


getEmissionText()
```

## Reward

Get the current reward amount.

**Request**

| **Parameter** | **Description** |
| --- | --- |
| reward | Reward Request |

**Response**

| **Parameter** | **Description** |
| --- | --- |
| code | Error Code. Only appears if any exception is triggered. |
| json | Current reward Details in JSON Response |


:::info 
`/api/reward` requests can return both JSON format as well as simple text. 
:::


**cURL Example**

```bash
curl -XGET https://explorer.theqrl.org/api/reward
```

**Python Example**

```python
def getReward():
  import requests
  import json
  request = requests.get("https://explorer.theqrl.org/api/reward")
  response = request.text
  getRewardResp = json.loads(response)
  jsonResponse = getRewardResp
  return(jsonResponse)


getReward()
```

This request will also return text output by appending /text as shown below.

**Text Request**

| **Parameter** | **Description** |
| --- | --- |
| reward/text | reward text request |


**Text Response**

| **Parameter** | **Description** |
| --- | --- |
| code | Error Code. Only appears if any exception is triggered. |
| text | Emission Details in simple TEXT Response |


**cURL Example**

```bash
curl -XGET https://explorer.theqrl.org/api/reward/text
```

**Python Example**

```python
def getRewardText():
  import requests
  import json
  request = requests.get("https://explorer.theqrl.org/api/reward/text")
  response = request.text
  getRewardTextResp = json.loads(response)
  jsonResponse = getRewardTextResp
  return(jsonResponse)


getRewardText()
```

## RewardShor

Get the current reward amount in shor.

**Request**

| **Parameter** | **Description** |
| --- | --- |
| rewardshor | rewardshor request |

**Response**

| **Parameter** | **Description** |
| --- | --- |
| code | Error Code. Only appears if any exception is triggered. |
| json | Reward Details in shor JSON Response |

:::info 
`/api/rewardshor` requests can return both JSON format as well as simple text. 
:::

**cURL Example**

```bash
curl -XGET https://explorer.theqrl.org/api/rewardshor
```

**Python Example**

```python
def getRewardShor():
  import requests
  import json
  request = requests.get("https://explorer.theqrl.org/api/rewardshor")
  response = request.text
  getRewardShorResp = json.loads(response)
  jsonResponse = getRewardShorResp
  return(jsonResponse)


getRewardShor()
```


This request will also return text output by appending /text as shown below.

**Text Request**

| **Parameter** | **Description** |
| --- | --- |
| rewardshor/text | rewardshor text request |


**Text Response**

| **Parameter** | **Description** |
| --- | --- |
| code | Error Code. Only appears if any exception is triggered. |
| text | rewardshor Details in simple TEXT Response |


**cURL Example**

```bash
curl -XGET https://explorer.theqrl.org/api/rewardshor/text
```

**Python Example**

```python
def getRewardShorText():
  import requests
  import json
  request = requests.get("https://explorer.theqrl.org/api/rewardshor/text")
  response = request.text
  getRewardShorTextResp = json.loads(response)
  jsonResponse = getRewardShorTextResp
  return(jsonResponse)


getRewardShorText()
```



## Blockheight


Get the current Blockheight.

**Request**

| **Parameter** | **Description** |
| --- | --- |
| blockheight | blockheight Request |

**Response**

| **Parameter** | **Description** |
| --- | --- |
| code | Error Code. Only appears if any exception is triggered. |
| json | Blockheight Details in JSON Response |


:::info 
`/api/blockheight` requests can return both JSON format as well as simple text. 
:::


**cURL Example**

```bash
curl -XGET https://explorer.theqrl.org/api/blockheight
```

**Python Example**

```python
def getBlockheight():
  import requests
  import json
  request = requests.get("https://explorer.theqrl.org/api/blockheight")
  response = request.text
  getBlockheightResp = json.loads(response)
  jsonResponse = getBlockheightResp
  return(jsonResponse)


getBlockheight()
```

This request will also return text output by appending /text as shown below.

**Text Request**

| **Parameter** | **Description** |
| --- | --- |
| blockheight/text | rewardshor text request |


**Text Response**

| **Parameter** | **Description** |
| --- | --- |
| code | Error Code. Only appears if any exception is triggered. |
| text | blockheight Details in simple TEXT Response |



**cURL Example**

```bash
curl -XGET https://explorer.theqrl.org/api/blockheight/text
```

**Python Example**

```python
def getBlockheightText():
  import requests
  import json
  request = requests.get("https://explorer.theqrl.org/api/blockheight/text")
  response = request.text
  getBlockheightTextResp = json.loads(response)
  jsonResponse = getBlockheightTextResp
  return(jsonResponse)


getBlockheightText()
```


## Network Status

Get status of the blockchain including node details.


**Request**

| **Parameter** | **Description** |
| --- | --- |
| status | Network status |

**Response**

| **Parameter** | **Description** |
| --- | --- |
| code | Error Code. Only appears if any exception is triggered. |
| json | status Details in JSON Response |


:::info 
`/api/status` requests will only return in JSON format. 
Parse the response using json tools in a language of your choice. 
:::


**cURL Example**

```bash
curl -XGET https://explorer.theqrl.org/api/status
```

**Python Example**

```python
def getStatus():
  import requests
  import json
  request = requests.get("https://explorer.theqrl.org/api/status")
  response = request.text
  getStatusResp = json.loads(response)
  jsonResponse = getStatusResp
  #return(jsonResponse)
  return(json.dumps(jsonResponse, indent=4, sort_keys=True))


getStatus()
```
