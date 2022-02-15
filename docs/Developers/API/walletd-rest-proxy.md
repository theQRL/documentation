---
docstatus: DRAFT
id: walletd-rest-proxy
title: QRL API - walletd-rest-proxy
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL API - walletd-rest-proxy
sidebar_position: 4
pagination_label: QRL API - walletd-rest-proxy
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL API - walletd-rest-proxy
keywords:
  - docs
  - build
  - developers
  - API
  - Automatic
  - walletd-rest-proxy
image: /assets/img/icons/yellow.png
slug: /developers/api/walletd-rest-proxy
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


The wallet daemon provides connectivity and functionality into the QRL Wallet functionality. This continues that functionality by providing REST connectivity to the typical wallet functions in addition to automated wallet management. 

This allows a seemingly unending amount of outgoing transactions to be sent from a single master address.

:::info
The `qrl_walletd` API is available with the base QRL Python package install. This system also uses the [QRL walletd-rest-proxy](https://github.com/theQRL/walletd-rest-proxy) to make automatic wallet management simple.
:::


## `walletd-rest-proxy` General Info



By default the API expects there to be a QRL node running on the localhost with port `19009` available. This [configuration setting](https://github.com/theQRL/QRL/blob/353b32aeb3897c7ffb50c9a5759091928f493f1d/src/qrl/core/config.py#L121) can be overridden with the `self.public_api_server = "127.0.0.1:19009"` directive.


The wallet daemon will by default create the wallet file at `~/.qrl/walletd.json`.

### Requirements

- QRL Node installed on the localhost, fully synced.
- golang v1.8 or greater


## Getting Started

Running the wallet daemon is simple. Once you have met the requirements above, follow the steps below, ensuring the `wallet-rest-proxy` stays running as this will allow interaction with the GRPC node.

- Run the QRL wallet daemon `qrl_walletd`
- Clone walletd-rest-proxy from the repo hosted at https://github.com/theQRL/walletd-rest-proxy `go get github.com/theQRL/walletd-rest-proxy`
- Start the wallet-rest-proxy `./walletd-rest-proxy -serverIPPort 127.0.0.1:5359 -walletServiceEndpoint 127.0.0.1:19010`


This will expose port `5359` for typical REST connections as seen with a `netstat -tulnp` lookup.

:::info
Running the `wallet-rest-proxy` in a [screen session](https://linux.die.net/man/1/screen) is a simple way to handle this on a Unix system. `screen -Sdm wallet-rest-proxy ./walletd-rest-proxy -serverIPPort 127.0.0.1:5359 -walletServiceEndpoint 127.0.0.1:19010` where the named screen session runs the command from above to start the proxy
:::caution


| Method Name | Request Type | Response Type | Auto |
| :---------- | :----------- | :------------ | :---: |
| [AddNewAddress](#addnewaddress) | [AddNewAddressReq](#addnewaddressreq) | [AddNewAddressResp](#addnewaddressresp) |  |
| [AddNewAddressWithSlaves](#addnewaddresswithslaves) | [AddNewAddressWithSlavesReq](#addnewaddresswithslavesreq) | [AddNewAddressResp](#addnewaddressresp) | * |
| [IsValidAddress](#isvalidaddress) | [ValidAddressReq](#validaddressreq) | [ValidAddressResp](#validaddressresp) | |
| [ListAddresses](#listaddresses) | [ListAddressesReq](#listaddressesreq) | [ListAddressesResp](#listaddressesresp) | |
| [RemoveAddress](#removeaddress) | [RemoveAddressReq](#removeaddressreq) | [RemoveAddressResp](#removeaddressresp) | |
| [EncryptWallet](#encryptwallet) | [EncryptWalletReq](#encryptwalletreq) | [EncryptWalletResp](#encryptwalletresp) |   |
| [LockWallet](#lockwallet) | [LockWalletReq](#lockwalletreq) | [LockWalletResp](#lockwalletresp) | |
| [UnlockWallet](#unlockwallet) | [UnlockWalletReq](#unlockwalletreq) | [UnlockWalletResp](#unlockwalletresp) | |
| [GetRecoverySeeds](#getrecoveryseeds) | [GetRecoverySeedsReq](#getrecoveryseedsreq) | [GetRecoverySeedsResp](#getrecoveryseedsresp) | |
| [GetWalletInfo](#getwalletinfo) | [GetWalletInfoReq](#getwalletinforeq) | [GetWalletInfoResp](#getwalletinforesp) | |
| [RelayTransferTxn](#relaytransfertxn) | [RelayTransferTxnReq](#relaytransfertxnreq) | [RelayTxnResp](#relaytransfertxnresp) | |
| [RelayTransferTxnBySlave](#relaytransfertxnbyslave) | [RelayTransferTxnBySlaveReq](#relaytransfertxnbyslavereq) | [RelayTxnResp](#relaytxnresp) | |
| [RelayMessageTxn](#relaymessagetxn) | [RelayMessageTxnReq](#relaymessagetxnreq) | [RelayTxnResp](#relaytxnresp) | |
| [RelayMessageTxnBySlave](#relaymessagetxnbyslave) | [RelayMessageTxnBySlaveReq](#relaymessagetxnbyslavereq) | [RelayTxnResp](#relaytxnresp) | |
| [RelayTokenTxn](#relaytokentxn) | [RelayTokenTxnReq](#relaytokentxnreq) | [RelayTxnResp](#relaytxnresp) | |
| [RelayTokenTxnBySlave](#relaytokentxnbyslave) | [RelayTokenTxnBySlaveReq](#relaytokentxnbyslavereq) | [RelayTxnResp](#relaytxnresp) | |
| [RelayTransferTokenTxn](#relaytransfertokentxn) | [RelayTransferTokenTxnReq](#relaytransfertokentxnreq) | [RelayTxnResp](#relaytxnresp) | |
| [RelayTransferTokenTxnBySlave](#relaytransfertokentxnbyslave) | [RelayTransferTokenTxnBySlaveReq](#relaytransfertokentxnbyslavereq) | [RelayTxnResp](#relaytxnresp) | |
| [RelaySlaveTxn](#relayslavetxn) | [RelaySlaveTxnReq](#relayslavetxnreq) | [RelayTxnResp](#relaytxnresp) | |
| [RelaySlaveTxnBySlave](#relayslavetxnbyslave) | [RelaySlaveTxnBySlaveReq](#relayslavetxnbyslavereq) | [RelayTxnResp](#relaytxnresp) | |
| [ChangePassphrase](#changepassphrase) | [ChangePassphraseReq](#changepassphrasereq) | [ChangePassphraseResp](#changepassphraseresp) | |
| [GetTransactionsByAddress](#gettransactionsbyaddress) | [TransactionsByAddressReq](#transactionsbyaddressreq) | [ransactionsByAddressResp](#transactionsbyaddressresp) | |
| [GetTransaction](#gettransaction) | [TransactionReq](#transactionreq) | [TransactionResp](#transactionresp) | |
| [GetBalance](#getbalance) | [BalanceReq](#balancereq) | [BalanceResp](#balanceresp) | |
| [GetTotalBalance](#gettotalbalance) | [GetTotalBalanceReq](#gettotalbalancereq) | [GetTotalBalanceResp](#gettotalbalanceresp) | |
| [GetOTS](#getots) | [OTSReq](#otsreq) | [OTSResp](#otsresp) | |
| [GetHeight](#getheight) | [HeightReq](#heightreq) | [HeightResp](#heightresp) | |
| [GetBlock](#getblock) | [BlockReq](#blockreq) | [BlockResp](#blockresp) | |
| [GetBlockByNumber](#getblockbynumber) | [BlockByNumberReq](#blockbynumberreq) | [BlockResp](#blockbynumberresp) | |
| [GetAddressFromPK](#getaddressfrom-pk) | [GetAddressFromPKReq](#addressfrompkreq) | [GetAddressFromPKResp](#addressfrompkresp) | |
| [GetNodeInfo](#getnodeinfo) | [GetNodeInfoReq](#nodeinforeq) | [GetNodeInfoResp](#nodeinforesp) | |

---

## AddNewAddress 

Adds new randomly generated address to the wallet located at `~/.qrl/walletd.json`. 


<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="addnewaddress"
    values={[
        {label: 'Usage', value: 'usage', className: 'red'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage" >


This function will create a single address with no slave keys. For use when outgoing transactions will not exceed addresses tree height. 

By default this will generate a new address with:

- OTS key height `{"height": 10}` or $1,024$ outgoing transactions
- Using the `{"hash_function": "shake_128"}`

The newly generated address will be added to the `~/.qrl/walletd.json` file. This file will be created if not existing.

> This address is limited to the initial OTS height given when generated.

</TabItem>

<TabItem value="code" label="Code">

Code examples below use the default values, change as needed.

:::note 
Higher tree heights may take longer to generate.
:::

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="addnewaddress-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
curl -XPOST http://127.0.0.1:5359/api/AddNewAddress \
     -d '{"height": 10, "hash_function": "shake128"}'
```

</TabItem>
<TabItem value="jsreq" label="Request" default>

```js {5}
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function addNewAddress() {
  const { stdout, stderr } = await exec(`curl -XPOST http://127.0.0.1:5359/api/AddNewAddress \
                                              -d '{  "height": 10, "hash_function": "shake128"}'`);
  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  return stdout;
}

addNewAddress().then(function(generatedAddress){
  const QRLaddress = JSON.parse(generatedAddress);
  console.log(QRLaddress)
})
```

</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {5}
import json
import requests

payload = {"height": 10, "hash_function": "shake128"}
newAddress = requests.post("http://127.0.0.1:5359/api/AddNewAddress", data=json.dumps(payload))

print(newAddress.text)

```

</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  "address": "Q01050031f634740f73b9c3928f36e525e75498b490497be9e1ed87ccd8860eba35a005819d0c3f"
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

#### Optional Configurations

| Configuration | Default | Notes |
| :---: | :---: | :---: | 
| `height` | `10` | **Min**: `6`, **Max**: `18` |
| `hash_function` | `shake128` | **Options**: `shake128`, `sha256`, `sha2_256` |


</TabItem>
</Tabs>
<br />

---

















## AddNewAddressWithSlaves


Adds a new address into the `~/.qrl/walletd.json` wallet file, generates and transmits slave transaction to the chain. 

 
:::info
This command will create an unlimited address, re-generating slave keys as needed. Additionally the system will preserve 5 OTS keys from each 
slave to ensure there are no lost funds with this system.
:::


<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="addnewaddresswithslaves"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">

#### Automatic OTS Key System

When used with a wallet API transaction that utilizes slave OTS keys, like [RelayTransferTxnBySlave](#relaytransfertxnbyslave)
the API will generate new slave keys when needed using the [RelaySlaveTxnBySlave](#relayslavetxnbyslave) function.


:::note
Use this function to generate an address to use the automatic OTS key system. 
:::

By default this will generate a new address with: 

- Tree height 10 `{"height": 10}` or $1,024$ outgoing transactions
- Three slave keys each with height 10 `{"number_of_slaves":3}` 
- Using the shake-128 hash function  `{"hash_function": "shake_128"}` 
- The first five slave OTS keys will be preserved, beginning at `{"index": 5}`
  - Keys `{0 - 4}` are saved for backup or recovery for each slave generated.

This address and slave keys will be added to the \~/.qrl/walletd.json file, *this file will be created if not existing*.


</TabItem>

<TabItem value="code" label="Code">

The examples below are using the default address values. Change as needed.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="addnewaddresswithslaves-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>

<TabItem value="shreq" label="Curl Request" default>


```bash
curl -XPOST http://127.0.0.1:5359/api/AddNewAddressWithSlaves \
     -d '{"height": 10,  "number_of_slaves": 3, "hash_function": "shake128" }'
```

</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {5} 
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function addNewAddressWithSlaves() {
  const { stdout, stderr } = await exec(`curl -XPOST http://127.0.0.1:5359/api/AddNewAddressWithSlaves \
                                              -d '{"height": 10,  "number_of_slaves": 3, "hash_function": "shake128" }'`);
  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  return stdout;
}

addNewAddressWithSlaves().then(function(generatedAddress){
  const QRLaddress = JSON.parse(generatedAddress);
  console.log(QRLaddress)
})
```

</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {5}
import json
import requests

payload = {"height": 10, "number_of_slaves": 3, "hash_function": "shake128"}
newAddressWithSlaves = requests.post("http://127.0.0.1:5359/api/AddNewAddressWithSlaves", data=json.dumps(payload))

print(newAddressWithSlaves.text)

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





























## IsValidAddress

Check if a QRL address is valid. Returns `{"valid": "True"}` if the QRL Address is valid. 





<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="isvalidaddress"
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

<TabItem value="code" label="Code">

Example code below. Enter details for the address to lookup  `{"address": ""}`.

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="isvalidaddress-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
curl -XPOST http://127.0.0.1:5359/api/IsValidAddress \
     -d '{"address": "Q010500dacbf29a83ef6832bcf16f0592adb15313836228a873a7b8eed1c354c4414a206ad38728"}'
```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function isValidAddress() {
  const { stdout, stderr } = await exec(`curl -XPOST http://127.0.0.1:5359/api/IsValidAddress \
                                              -d '{"address": "Q010500dacbf29a83ef6832bcf16f0592adb15313836228a873a7b8eed1c354c4414a206ad38728"}'`);
  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  return stdout;
}

isValidAddress().then(function(address){
  const QRLaddress = JSON.parse(address);
  console.log(QRLaddress)
})
```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}
import json
import requests

payload = {"address": "Q010500dacbf29a83ef6832bcf16f0592adb15313836228a873a7b8eed1c354c4414a206ad38728"}
validAddress = requests.post("http://127.0.0.1:5359/api/IsValidAddress", data=json.dumps(payload))

print(validAddress.text)

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json 
{
  "valid":"True"
}
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

</TabItem>
</Tabs>
<br />

---








## ListAddresses

Lists all addresses located in the `~/.qrl/walletd.json` file loaded into the walletd-rest-proxy.

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="listaddresses"
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

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="listaddresses-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
curl -XGET http://127.0.0.1:5359/api/ListAddresses
```

</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function listAddresses() {
  const { stdout, stderr } = await exec(`curl -XGET http://127.0.0.1:5359/api/ListAddresses`)
  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  return stdout;
}

listAddresses().then(function(addresses){
  const QRLaddressList = JSON.parse(addresses);
  console.log(QRLaddressList)
})
```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}
import json
import requests

validAddress = requests.get("http://127.0.0.1:5359/api/ListAddresses")

print(json.loads(validAddress.text))

```
</TabItem>
<TabItem value="resp" label="Response" default>

```json
{
  "addresses": [
    "Q010400ea706c30ae0fbefb7d20c502d5133c8d08f916bfe5fb5eee7363c8560389d70786cc5168",
    "Q010300bd584ed189f16a402bcd6a78063eaa2b392bd8848f6bc414cba1f681b62e770dc63ccca4",
    "Q010300fe36d9928d12b36b07db783859eb6eb5647479191a35bf877c7bb405989109fe14882fd5",
    "Q010500a590c37f94dbbf42bd272fba83c4fa5bcb58c55e61ec6a81625227367d5257e1a9d6dea7",
    "Q010500a05b83696c2fe909ccceb209cf2a965b934f4f3c105bcaf6650af02fe8841394fbae54e2",
    "Q0105002b9b849b4ae4d2297a2a0f98f46a08bb692e83ec2451610961fb0d6f0513e026daf10bf3"
  ]
}
```
</TabItem>
<TabItem value="err" label="Error" default>

```json title="Invalid POST data sent"
Method Not Allowed
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
    groupId="removeaddress"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">

Removes given address from the the `walletd.json` wallet file. Requires a QRL address that exists in the `~/.qrl/walletd.json` file.

:::note
Replace the `{"address": ""}` with the address to be removed. This action is permanent. 
::: 

</TabItem>

<TabItem value="code" label="Code">

Gives an empty array `{}` on successful removal of the address from the wallet. 

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="removeaddress-code"
    values={[
        {label: 'Curl Request', value: 'shreq'},
        {label: 'JS Request', value: 'jsreq'},
        {label: 'Python Request', value: 'pyreq'},
        {label: 'Response', value: 'resp'},
        {label: 'Error', value: 'err'},
    ]}>
<TabItem value="shreq" label="Curl Request" default>

```bash
curl -XPOST http://127.0.0.1:5359/api/RemoveAddress \
     -d '{"address": "Q010500dacbf29a83ef6832bcf16f0592adb15313836228a873a7b8eed1c354c4414a206ad38728"}'
```
</TabItem>    
<TabItem value="jsreq" label="Request" default>

```js {} 
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function removeAddress() {
  const { stdout, stderr } = await exec(`curl -XPOST http://127.0.0.1:5359/api/RemoveAddress \
                                              -d '{"address": "Q010500dacbf29a83ef6832bcf16f0592adb15313836228a873a7b8eed1c354c4414a206ad38728"}'`);
  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  return stdout;
}

removeAddress().then(function(response){
  const removeResp = JSON.parse(response);
  console.log(removeResp)
})
```
</TabItem>
<TabItem value="pyreq" label="Python Request" default>

```py {}
import json
import requests

payload = {"address": "Q010500dacbf29a83ef6832bcf16f0592adb15313836228a873a7b8eed1c354c4414a206ad38728"}
removeAddress = requests.post("http://127.0.0.1:5359/api/RemoveAddress", data=json.dumps(payload))

print(removeAddress.text)

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

</TabItem>
</Tabs>
<br />

---










## EncryptWallet

<Tabs
    defaultValue="usage"
    className="unique-tabs"
    groupId="removeaddress"
    values={[
        {label: 'Usage', value: 'usage'},
        {label: 'code', value: 'code'},
    ]}>

<TabItem value="usage">

Removes given address from the the `walletd.json` wallet file.

</TabItem>

<TabItem value="code" label="Code">


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>
</Tabs>

</TabItem>
</Tabs>
<br />

---



## LockWallet

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>



## UnlockWallet

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## GetRecoverySeeds

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>



## GetWalletInfo

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>

## RelayTransferTxn

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>



## RelayTransferTxnBySlave

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## RelayMessageTxn

<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>



## RelayMessageTxnBySlave


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>

## RelayTokenTxn


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## RelayTokenTxnBySlave


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## RelayTransferTokenTxn


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## RelayTransferTokenTxnBySlave


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## RelaySlaveTxn


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## RelaySlaveTxnBySlave


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## ChangePassphrase


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## GetTransactionsByAddress


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## GetTransaction


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## GetBalance


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## GetTotalBalance


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>





## GetOTS


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>



## GetHeight



<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## GetBlock



<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## GetBlockByNumber



<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## GetAddressFromPK



<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>


## GetNodeInfo


<Tabs
    defaultValue="shreq"
    className="unique-tabs"
    groupId="wallets"
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

```json title=" "

```

</TabItem>

</Tabs>



