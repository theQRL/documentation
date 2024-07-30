---
docstatus: 90%  # one of {DRAFT, 30%, 90%, COMPLETE}
id: node-cli
title: QRL Node Command Line Interface
hide_title: false
hide_table_of_contents: false
sidebar_label: CLI
sidebar_position: 5
pagination_label: Node-CLI
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Node/node-cli/node-cli.md
description: QRL Node CLI Overview
keywords:
  - docs
  - node
  - advanced
image: /assets/img/icons/yellow.png
slug: /use/node/node-cli/overview
---

Interacting with the QRL network can be done utilizing the CLI interface. This will allow you to complete some more advanced tasks on the network. Using the CLI is easy and there is a great `--help` section to guide you along.

It is recommended that you have a local working installation of QRL in order to use the CLI. See the Node installation instructions to get started today. Follow the guide to setup a [QRL node](/use/node) if you haven't already.

:::info Remote Node Connection
It is possible to connect to a remote node that allows external connections. Use the `--host {REMOTE_IP_ADDRESS}` flag on the CLI to connect. 
:::

## Overview

Running commands using the qrl node cli requires the QRL node software is installed. [See the documentation to get started installing the QRL node](/use/node/installation) as well as the full [Node cli documentation](/use/node/node-cli)

## CLI Help

All command line options have a help file available to assist in the use of the command. Simply add the `--help` option to the end of any command to see the help.

```bash
qrl --help
```
```bash
Usage: qrl [OPTIONS] COMMAND [ARGS]...

  QRL Command Line Interface

Options:
  -v, --verbose       verbose output whenever possible
  --host TEXT         remote host address             [127.0.0.1]
  --port_pub INTEGER  remote port number (public api) [19009]
  --wallet_dir TEXT   local wallet dir
  --json              output in json
  --version           Show the version and exit.
  --help              Show this message and exit.

Commands:
  slave_tx_generate    Generates Slave Transaction for the wallet
  state                Shows Information about a Node\'s State
  token_list           Fetch the list of tokens owned by an address.
  tx_inspect           Inspected a transaction blob
  tx_message           Message Transaction
  tx_multi_sig_create  Creates Multi Sig Create Transaction, that...
  tx_multi_sig_spend   Transfer coins from src to dsts
  tx_push              Sends a signed transaction blob to a node
  tx_token             Create Token Transaction, that results into...
  tx_transfer          Transfer coins from src to dsts
  tx_transfertoken     Create Transfer Token Transaction, which...
  wallet_add           Adds an address or generates a new wallet...
  wallet_decrypt
  wallet_encrypt
  wallet_gen           Generates a new wallet with one address
  wallet_ls            Lists available wallets
  wallet_recover       Recovers a wallet from a hexseed or mnemonic...
  wallet_rm            Removes an address from the wallet using the...
  wallet_secret        Provides the mnemonic/hexseed of the given...

```

You can browse even further into sub commands like:

```bash
qrl tx_transfer --help
```
```bash
Usage: qrl tx_transfer [OPTIONS]

  Transfer coins from src to dsts

Options:
  --src TEXT               signer QRL address
  --master TEXT            master QRL address
  --dsts TEXT              List of destination addresses
  --amounts TEXT           List of amounts to transfer (Quanta)
  --message_data TEXT      Message (Optional)
  --fee DECIMAL            fee in Quanta
  --ots_key_index INTEGER  OTS key Index (1..XMSS num signatures)
  --help                   Show this message and exit.

```

## Options

These options allow advanced functionality like remote node. 

```bash
  -v, --verbose       verbose output whenever possible
  --host TEXT         remote host address             [127.0.0.1]
  --port_pub INTEGER  remote port number (public api) [19009]
  --wallet_dir TEXT   local wallet dir
  --json              output in json
  --version           Show the version and exit.
  --help              Show this message and exit.
```

:::info These options must be entered directly after the `qrl` command, before any sub-commands are given.
`qrl [OPTIONS] [COMMAND]`
:::

| **Command_Options** | **Comments** |
| --- |  -- |
| --host | *[default: 127.0.0.1]* Host to connect to for network functions and chain data retrieval |
| --port_pub | [*default: 19009*] Port to use to connect to node services for network functions and chain data retrieval using the node public api |
| --wallet_dir | full path to the location of the wallet.json file to use for the function if not included in the local directory |
| --json | Print command output as JSON data for scripting functions |
| --version | Print the version of the QRL software and exit |
| --help | Print the help file and exit |


## Commands

Breakdown of each command with example commands and responses. 

### slave_tx_generate

Slave transaction allow an extension to the master address, allowing an entirely new OTS tree to be used for sending transactions as a proxy to the master address. Requires a QRL wallet file in the same directory as the command being entered, or by using the `--wallet_dir`  option.


:::tip Additional Info
See the [Slave Tree Documentation](/build/address/slave-keys) for complete explanation of deterministic OTS key trees and how QRL has extend the life of an XMSS address to an almost infinite amount of OTS keys.
:::


#### slave_tx_generate Help

```
Usage: qrl slave_tx_generate [OPTIONS]

  Generates Slave Transaction for the wallet

Options:
  --src TEXT                  source address or index
  --master TEXT               master QRL address
  --number_of_slaves INTEGER  Number of slaves addresses
  --access_type INTEGER       0 - All Permission, 1 - Only Mining Permission
  --fee DECIMAL               fee (Quanta)
  --pk INTEGER                public key (when local wallet is missing)
  --ots_key_index INTEGER     OTS index (when local wallet is missing)
  --help                      Show this message and exit.

```

#### Additional Option Info

| **Command_Options** | **Required** | **Format** | **Comments** |
| --- | --- |---| -- |
| --src | *Yes* | TEXT | The source address to send the `slave_tx_generate` transaction. Slave trees will be generated for this address.|
| --master | *No* | TEXT| Used for slave tree transactions, where the slave is the `--src`, the `--master` is the address the slave is signing for.|
| --number_of_slaves | *Yes* | INTEGER | Number of slaves trees to generate.|
| --access_type | *Yes* | INTEGER | Type of access the Slave is allowed to have. 0 if the slave is to sign transactions. |
| --fee | *Yes* | DECIMAL | Transaction fee to send the transaction.|
| --pk | *No* | INTEGER | Public Key when local wallet is missing.|
| --ots_key_index | *Yes* | INTEGER | OTS Key Index used to sign the transaction, must be an UNUSED OTS for the `--src` address  |



#### Example Command

```bash
qrl slave_tx_generate --src 0 --master Q01050022d047cc489e9a118e8b2ea45ca0259785586602799486dd8d6844fe2a5855fed1066c50 --number_of_slaves 100 --access_type 0 --fee 0 --ots_key_index 0 
```

#### Example Response

```
Generating Slave #1
Successfully Generated Slave 1/100
Generating Slave #2
Successfully Generated Slave 2/100
Generating Slave #3
Successfully Generated Slave 3/100
...
...
Generating Slave #98
Successfully Generated Slave 98/100
Generating Slave #99
Successfully Generated Slave 99/100
Generating Slave #100
Successfully Generated Slave 100/100
Successfully created slaves.json
Move slaves.json file from current directory to the mining node inside ~/.qrl/
```

This will output the slaves in a file `slaves.json` in the directory the command is issued. 

:::warning Contains Secret Keys 
This file has authority to send transactions from the master address. Secure it appropriately similar to a `wallet.json` file
:::

### state

Query the state of the node with some network stats including blockheight state of the node, block_last_hash etc.

#### `state` Help

```
Usage: qrl state [OPTIONS]

  Shows Information about a Node's State

Options:
  --help  Show this message and exit.
```

#### Example `state` Command

```bash
qrl state
```

:::info JSON Output
Enter with the `--json` flag for computer readable JSON output `qrl --json state`.
:::

```bash
qrl --json state
```

#### Example Response

```json
{
  "info": {
    "blockHeight": "1702386",
    "blockLastHash": "CFSdjFIVvkGWih5SKSF8ZEVjJA7uHI2Rf2R4ZQAAAAA=",
    "networkId": "The sleeper must awaken",
    "numConnections": 29,
    "numKnownPeers": 64,
    "state": "SYNCED",
    "uptime": "1313",
    "version": "2.1.2 python"
  }
}
```

### token_list

#### `token_list` Help

```
Usage: qrl token_list [OPTIONS]

  Fetch the list of tokens owned by an address.

Options:
  --owner TEXT  source QRL address
  --help        Show this message and exit.
```

#### Additional Option Info

| **Command_Options** | **Required** | **Format** | **Comments** |
| --- | --- |---| -- |
| --owner | *Yes* | TEXT | The source address to lookup `token_list`. Will list all tokens found in the address.|

#### Example Command

```
qrl token_list --owner Q01050069392d18b5f8757f1fcf1c61854aef9c3818c47fa4e28b1ce23fa89042de24d7e12a1940
```

#### Example Response

```
Hash: 241edecb19d9d8e981bf595b4865de011d591ee3817402332c7a2eccfd1cc6a3
Symbol: doc
Name: documentation
Balance: 10000000000000000
```

### tx_inspect

#### `tx_inspect` Help

```
Usage: qrl tx_inspect [OPTIONS]

  Inspected a transaction blob

Options:
  --txblob TEXT  transaction blob
  --help         Show this message and exit.
```

#### Additional Option Info

| **Command_Options** | **Required** | **Format** | **Comments** |
| --- | --- |---| -- |
| --txblob | *Yes* | TEXT | Text Blob from the send transaction|

#### Example Command

```bash
qrl tx_inspect --txblob 1a43010500f6e8e9521b19934c0fa221324101c6075f114aa764ad362931d5c696846ec968c74e1f4b61067d07fc967be6797573b0d533db3b633258988faa0a73b8c5602d22c4130000000c36596a313cfa95f9bd1dc2bdf3d6dc46c857062b82fdf2530ab37a6da1fa5c362e2dc00d55d05cee9358c2a1bcb599fc575ed239774b15d97121b20139014aa61d0847b9ddab1536bdce36ea7ffcaba48346ce5e93edbaa9c4bf12979e123c5cacf08fe5bd812b961f867140f61079da74d70b001630bafbc1557f017fa06dd947d8dfbb6dd7f241575e5d8d519edd5af3ec031a4a359d5a320c5b3aee7378043c83695abf64c2f8dae5ee16c06cbbc8802e242f4d8a8698f5da881eedd212821a906acb508be799be4cb1e8d9599c2b6e5ce8a4847f7437f706812b51de516464df73a000ab07c96f09965ecb151da5ff25598b79d45a0be433182db8ae005ccd7866e076c902b87e59634a9779e96c53e66973fbf8cba8ed19084cde50260b1f1dbd1c059727d35f67ddf100b6b8b554e2c373fba79e91e583457c78385c246a68a415ffe1868ef1bde75b1092430f3cda850bdf01017640a73a567a1bd6b101d991d98b6799756df36ec4afa90a2e0ee6df173185a3a7f9ed087f8632602ca5f893181be810e0826bfadaf675ae0d06ba92907dc5a60d2e7cd90e2f77222e38b38a629105886f95984445c0e126309dde2d136f73edd31226ecbc0eebf1efe3b743584e315d451c9d9dbaba25dfd3ba373b70750ce369b43766ea15038248acf94d1212527d0a7f325121391a7cd74aec26c08d711788ff21c522f6735424d8d1839938b810cbe92057059a498e1887f566d0780603d4d83288be6ebe061b72f86e201892bc1b17fd8749ba6c93d7f4b5d5b1382c8bc9fa3e2dd256b2942a288aba75d23978893bc1bbf21cf1f1a9f84d8161f01478be5da2dafb506bda4ff1f4e640acb23cfb7bed425b9d927270280f9d6c903e08177d69e974a2b7b7f73c0ba54b9bce794c25f26c59a0be054cb5f99c36f3080a4dba18540685aeb1b8e70a2007d4d888117c479ada237123f75dab57dcac1d0e26a038ee542e7ef102da3c0abb4dacbf8e057893827922d2692494e8babd747f3ff2d968895080998ba185e804857d6b1861daa427b96d1ffdbed7ae017f25b6fa535e02b4e7e5975d98e387ae217c3c529dab2b0c2d2234b68aa12edc98bc15a085a044156765fb49f32630d6d86bea4ffaf53cc1739668b9da3f176b84d6b732e086be2182842c0dec3338d669fafb7d3cff119958d7f162464be900c94e760b32b4021a67904f4cad8b49c1ea8f10288a41e8c4626a7c70f6c6330dcb0bfaadbc20fec5117449df7f9d27c76a3dcc3e1dfbf231871583fa6771916aa4b79b60226fe72b5ccff7e46b2ee8f2686477798d57485436d70d47fb3bc0159a3ff611730e5f43c5dd9cc3226eeaf782c26a3697ad30cb713aaf8902b4f8d59f0243f08870fe1576568cb4866e4a76ab22a2f23ca97a6875e57d9e9b909eaa5da02106d43a0630ce0e4bf3d43ff04911bc8e3b3f302731e6e7369fc01201e7878edf6c60fc0dd0ea330ab0e1a9baa08619749fafa262978432c43085920ecd36c37dee9e8599ed726846510bb9a66fdc2d4c0200851fcf6c58c37d1341e6b85c2d9f181c9ad2b878d5f33807e7ad96c63a37b43642e8b5ca319b62930a3ea26ad58bce0a3739b215e125805d776032a1225eb880418cce0eb26abd28a66b242ab9e14fa700ad1d2deb9d90a3ffea12a8bad7446daf4c91456280b1b5552564f219224b8f9573319c2e9989aa589259e8e5997605178a361dcb3e65e3b969095ca0a656835e88389d6de048be6b01d4cf9ea22c4fb68b966125314613386f46b2cd602148ea2308da81d296826617aab4c9c178e20b0b1557075df7d7878fe6b2167a84ceab7e75fb25490d6e54c72a29a466278543436f88973e8b5337663b9ee276d884d973c34a8681a1f5fe9ee0ea23f9ef7467b9f1c078c5ee4886e57212b44cc3ecda16b1dad4d395ea8cf1182b00de4ed00d5b965aa5b04ee5e79a9fe78462afe680d4e14a9dfc56aa89b8eecb5e52d6a23c75636d34de4655e8699350df5f3018bf6d05d0e413e5d9f2fc00bfae28834b7d0cd09a8996b193a9dd9b06ee8649529cb0c278a576d57b0efbf0aa7857f5dbb87afb3a21f5f5921d816c3bfc8cf2004aa1fe229c8c946820f25cf3fdd09eb33695586e29a3f044d5ab49a5fd1d6d39af0692305cbd785f901fc131e1974a454959d7fbddf42a9f424b2ce4f52f746b108bcf483eac044715eb7539b6730a1f06e8c459d9f7f3e31abc242eb0c2302a8768de0c5441863a4364d7584cfc8431995437b3d57487d32b96cb2f0f1af3913bd76dff258872a178cdbc596806db1af9ca255c4d107b7454e350f46adffb2977deec6624b6e5412f1b44f050a31a48e5fa5067cb3de27714e257250b87cba79d15ccc64b3d7b8dc6ba46a6b15d4c9e0b950c0bf5dba2c3ebc74f65ade492680d6ee1b3bfb130ece1828d51ca8fb410372c8998ae252604f4a8ab4580ba0149f6f7ac70ab0d612c1b62c3fea36284d1c74d3f3b8368b6ea4c72c137f8651c920a258271efa0f73b16886eed2e5bc2cac2ba0dfcc219e2b5f6a92612404ad37afcf577c8378296ff21bafbc21d0eaa727afd7e20c94bba7f2e17512094e6a39d614f0961eaf441bf70cbdddbf1fc1a8ce3c358c058ddf4d45ee76d7d2d4b820714dafdea30ca6a5aea3b21a5e91461a8ac426ecd26a1cf1073b9e9c3a565186e9dcf80b9f6c7853b316c30ef773df0f0328c6a12dac6bd3abe7327a09ce31188794136bf05d271396a45aab05d666606b4b3daffeb6cc050d91794672f0ff5fc67c4f34feea15fdcb0d8e5456dc3bddc240a88406015ace1bcb52d66370edd1050661dd5af3dd567bb0640f50605a74a8d5d58ce2cce3fb200eebdba9e3ba15132b4a16260612d9abf5b081df6acaa0540339d5b15b2b89256658db87c470d5f0b63173465e819fc2fe4387d7589239d24c3f388949fc798ef3270447249bfcb86cd04771f4cb88e2965f17fa999d48be26081b0dbceaf7e1bf7b7aae1c0be4f575b20059af66e6ecf654cb14c07223827bc68b50f59d8e19c84713ee2823de32994d09d5a23958c6e6e190b354474df9ffd0d8aec8b47cc1b504f9c3d6c1dce1be14a3f7dc73948a989e0b0cbc7623b1f19a6e783110636c04e65f6872e83713bff869d8742077456c07cc45a88bff74badd2295ef4a5b456209f62221e59e8d9df0a75f6865222838236de409112e6263a8485ce4022191363713c4395f7b8a106970a3bb889158264a9c5ceb340cb3cf71e241b002d48028482584c9b8c2de2c48c8aaa589ebcc9bf121e3d1230a4aa3a8fa43019e70674a5b5266e3d0c7dfa5f873520175b7f937f27bfe1816ffb8d003ffa9e2249b9cf2f4b7c5cf6d5aaefe1eb7851740ed87912a63914457a33ccccc768c4b521c4ed02472f353879c6e0b6d95e3fed1f8322d0587f3e2b8aab9d6446ed62874095b1f4f429671e93d183455b7c887cdb53b1ddc4f0d50a83962819eade4e91d45056d653b60d596ae9dce36cbf46b2f832207f0bd7e18937cb8f8fb550c8b4a45b6ce25d9d17e3156d9fe08d75dfa8c7ce753aa8010a2701050069392d18b5f8757f1fcf1c61854aef9c3818c47fa4e28b1ce23fa89042de24d7e12a19400a27010500e52f42fa130eb56c8001d53fc0ade392fca95b8dc976f4200fc993142be4a73284b655e20a27010500f08f5159307edb6e948d7ccccf287ff5012feef9f07844c8d867697d8ebd7fe52bc1fcca120bc0843da09c018094ebdc031a1e5465737420446f63756d656e746174696f6e205472616e73616374696f6e
```

#### Example Response

```json
{
  "publicKey": "AQUA9ujpUhsZk0wPoiEyQQHGB18RSqdkrTYpMdXGloRuyWjHTh9LYQZ9B/yWe+Z5dXOw1TPbO2MyWJiPqgpzuMVgLQ==",
  "signature": "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",
  "transactionHash": "fwvX4Yk3y4+PtVDItKRbbOJdnRfjFW2f4I1136jHznU=",
  "transfer": {
    "addrsTo": [
      "AQUAaTktGLX4dX8fzxxhhUrvnDgYxH+k4osc4j+okELeJNfhKhlA",
      "AQUA5S9C+hMOtWyAAdU/wK3jkvypW43JdvQgD8mTFCvkpzKEtlXi",
      "AQUA8I9RWTB+226UjXzMzyh/9QEv7vnweETI2GdpfY69f+UrwfzK"
    ],
    "amounts": [
      "1000000",
      "20000",
      "1000000000"
    ],
    "messageData": "VGVzdCBEb2N1bWVudGF0aW9uIFRyYW5zYWN0aW9u"
  }
}
```

### tx_message

Transmit a message on-chain using address given, additionally this message can be sent to a specific address. Message data can be up to 80 bytes in length max.

:::tip Message Encoding Format
See the [Message Encoding Documentation](/build/messages/message-tx-encoding) for additional message use cases, hashing data that is prepended with determined encoding schemes
:::

#### `tx_message` Help

```
Usage: qrl tx_message [OPTIONS]

  Message Transaction

Options:
  --src TEXT               signer QRL address
  --master TEXT            master QRL address
  --addr_to TEXT           QRL Address receiving this message (optional)
  --message TEXT           Message (max 80 bytes)
  --fee DECIMAL            fee in Quanta
  --ots_key_index INTEGER  OTS key Index (1..XMSS num signatures)
  --help                   Show this message and exit.
```

#### Additional Option Info

| **Command_Options** | **Required** | **Format** | **Comments** |
| --- | --- |---| -- |
| --src | *Yes* | TEXT | The source address to send the `tx_message` transaction from.|
| --master | *No* | TEXT| Used for slave tree transactions, where the slave is the `--src`, the `--master` is the address the slave is signing for.|
| --addr_to | *Yes* | INTEGER | Address to send the message to (*Known issue with option being required for transaction*).|
| --message | *Yes* | TEXT | The message to send, max 80 bytes. (*See message encoding documentation for example of encoding methods and uses*) |
| --fee | *Yes* | DECIMAL | Transaction fee to send the transaction.|
| --ots_key_index | *Yes* | INTEGER | OTS Key Index used to sign the transaction, must be an UNUSED OTS for the `--src` address  |


#### Example Command

```
qrl --json tx_message --src 0 --message "Message to send" --fee 0 --ots_key_index 1 --addr_to Q01050022d047cc489e9a118e8b2ea45ca0259785586602799486dd8d6844fe2a5855fed1066c50
```
This will prompt for a master address `master` field to be input, simply ignore and press enter to continue sending the message. This is to support sending messages with OTS slaves

#### Example Response

```
error_code: SUBMITTED
tx_hash: "\306\366\213\236\177\"R\335\265\255\274\365\207\216\002\244{SY\n\216\000\002\247U\233\\N\r$\266U"
```

### tx_multi_sig_create

Create a new multi signature address.

#### `tx_multi_sig_create` Help

```
Usage: qrl tx_multi_sig_create [OPTIONS]

  Creates Multi Sig Create Transaction, that results into the formation of
  new multi_sig_address if accepted.

Options:
  --src TEXT               source QRL address
  --master TEXT            master QRL address
  --threshold INTEGER      Threshold
  --fee DECIMAL            fee in Quanta
  --ots_key_index INTEGER  OTS key Index (1..XMSS num signatures)
  --help                   Show this message and exit.
```

#### Additional Option Info

| **Command_Options** | **Required** | **Format** | **Comments** |
| --- | --- |---| -- |
| --src | *Yes* | TEXT | The source address to send the `tx_multi_sig_create` transaction. Will not automatically be added to the signatories.|
| --master | *No* | TEXT | Used for slave tree transactions, where the slave is the `--src`, the `--master` is the address the slave is signing for.|
| --threshold | *Yes* | INTEGER | Minimum threshold required for a vote approval allowing a multi-sig wallet transaction.|
| --fee | *Yes* | DECIMAL | Transaction fee to send the transaction.|
| --ots_key_index | *Yes* | INTEGER | OTS Key Index used to sign the transaction, must be an UNUSED OTS for the `--src` address  |

#### Example Command

```bash
qrl tx_multi_sig_create --src 0 --threshold 2 --fee 0 --ots_key_index 5
```

#### Example Response

```
Master []: 
Address of Signatory  []: Q01050069392d18b5f8757f1fcf1c61854aef9c3818c47fa4e28b1ce23fa89042de24d7e12a1940
Weight : 1
Address of Signatory  []: Q010500e52f42fa130eb56c8001d53fc0ade392fca95b8dc976f4200fc993142be4a73284b655e2
Weight : 1
Address of Signatory  []: Q010500f08f5159307edb6e948d7ccccf287ff5012feef9f07844c8d867697d8ebd7fe52bc1fcca
Weight : 1
Address of Signatory  []: 
3
Multi sig Address Q11000097fbb170ab30140e5701de3c7463b38b3f2b81326ad7466f42edf5563d724e30235fc5ea

```

### tx_multi_sig_spend

#### Help

```
Usage: qrl tx_multi_sig_spend [OPTIONS]

  Transfer coins from src to dsts

Options:
  --src TEXT                     signer QRL address
  --master TEXT                  master QRL address
  --multi_sig_address TEXT       signer Multi Sig Address
  --dsts TEXT                    List of destination addresses
  --amounts TEXT                 List of amounts to transfer (Quanta)
  --expiry_block_number INTEGER  Expiry Blocknumber
  --fee DECIMAL                  fee in Quanta
  --ots_key_index INTEGER        OTS key Index (1..XMSS num signatures)
  --help                         Show this message and exit.
```

#### Additional Option Info

| **Command_Options** | **Required** | **Format** | **Comments** |
| --- | --- |---| -- |
| --src | *Yes* | TEXT | The source address to send the `tx_multi_sig_spend` transaction. This is the address proposing the vote to spend|
| --master | *No* | TEXT| Used for slave tree transactions where the slave is the `--src`, `--master` is the address the slave is signing for|
| --multi_sig_address | *Yes* | TEXT | Multi-Sig address to send the transaction from. This address should contain funds and will require vote threshold be met before transaction will succeed|
| --dsts | *Yes* | TEXT | List of addresses to vote to transfer funds to from the main multi-sig address. LIST FORMAT|
| --amounts | *Yes* | TEXT | List of amounts to transfer to addresses listed in the `--dsts` list|
| --expiry_block_number | *Yes* | INTEGER | Block of vote expiration after which the transaction will be canceled if not approved|
| --fee | *Yes* | DECIMAL | Transaction fee to send the transaction|
| --ots_key_index | *Yes* | INTEGER | OTS Key Index used to sign the transaction, must be an UNUSED OTS for the `--src` address|


#### Example Command

```bash
qrl tx_multi_sig_spend --src 1 --multi_sig_address Q11000097fbb170ab30140e5701de3c7463b38b3f2b81326ad7466f42edf5563d724e30235fc5ea --dsts Q01050069392d18b5f8757f1fcf1c61854aef9c3818c47fa4e28b1ce23fa89042de24d7e12a1940 --amounts .1 --expiry_block_number 818022 --fee .01 --ots_key_index 6
```

This will send a vote transaction to the master address, requiring the minimum threshold of that address be met for this transaction to send.

#### Example Response

```bash
Transaction Blob (signed): 

1a430105001d0ba7228ffc58cef6f6e372398a757d634667c5e6496756d3cb0b3749ad1c3b62cf79a4b36868c43ab95ed72a409c9d72a98abecc8bea7bf33bcf7c44417e1222c41300000006cdbda36d685ef8df2e559e8a7a72bce8a218dd927ecd749bdd8e5ac97cff7fa237aaaaa5b6f7b0d5581bb5071fcfaae17080fc11b39d332308f1e58d2c9a2c8ef5bf1a48fb1ab0b4f1dc12ae34afe63a45a6da476d5b1611d01be72f0b3f235eddacca805281e8e2290c9737a948f86b7b568bdc9b14782e51e02879af533b1af2bf6b8906bd59fea09c24186abaefcac1c3190469a44f0918e699cc9b068b8edca8d3b2e41443d67b681deee0e86577927503fa2e7c5311422e7d3dddd9fd724507715009b6e6e315a877770fd3cbe283e25d74cd6c02f435edd13ff7342423ae187ee74b4dd200068e6ad8c7e7c000a6a3d5611122cea5e4b7410febd5feeefd231854ab7e452cb10c57ae829e89be660d30e3c359519d37b09c9a48c3a3e7b6619e5d0ce865f79ddce8460c3aa0df70e06930bdf517ebfb2f3a305265c384180698e4273935403a6f7b84f4300debe1e6625ab829547fe9eb3433e7f3477ace389b67cbb1b4cbd4276e046f0bcd2d53b2aa067ef093d85403bc906fe75621a2b0cbe6d03d69bd777a36734589b9af0ac33dd14629f8513b448ff8d589d087befefa4080921fe19168a3b8a8572db627c44562c1a4f9d5175093cb514237224cc2a7d39abf81f8ba1b0095ae84e2da7c9c775e92f1af186c0052ee7e1b59581430aff76040c5210c02f35aa5be7eb49985bafbccf252a7e337fae74c621233bb6e1d4199817be1aebb77d9de284be54927aafbd35865c779d6eff2a2c5f584c3dc2c2d0d5145522df3ac522bff6c48d3802dfbb0e132c06d73002e0f36d3617bb1057e154a8acb660cf38871f1bf08c7e0bb00ce4f68ffc9b4dcfbcd244edaa7d6fba61ebeca1017d0f0fbb86bdf510c9a3f2917ddd7cab6005416201714ca8a54c3e3defc48c074b8765ea8923fd08cf4912268915e9e397f7bbf960e0ec3e7443c2cbc0e581c7e56601969ab78bb14a1e7255d9dbcb8ea0ed6be05650facd340443626d74a56bc0760eb9c2792fb606bb3ba989906ed1bf8a383835a20c877ef7cdc8136eee774d7f768612361859d65db27784328897b9763ca1a967852b91114b81485e121ec054ec0ed0adf2d51bbad6ce9fdd51cc2e6e46f1ae3ad74d84d58a411843f6b6a97906a8871c49f90d0bcfc8df6833891937fc5c28091e8333f83fb3c379e5a5c8deb087989438a9a54e1794c16da8d5bc35c7621f06ec9275940fce965a3a23b89431246f4984c92dea46bba2e8eb0c9e1ad4c5e032d096f6ce5fcf4e3a85b54ad604223fdbb6b25877c5893499ccd450a66fec821502f512a6e6fe73d5ca2ffea25f01374990fb96793ed345218c940fccb6361b35c5034e5ddf8079fcf072334bdaa7117c825f8e17bd317b86e398b5a23ca23e561b953df6f4393314f70cb5fb2685da762751990c392554775970c83fdeaf4d5c8422714dbdff2be49f7daede5dd9ba08370627211b11ed35a6d8a5f46ce232ed8e9febb3f5f09b1597357adb6adce9ead052dda24a256496f9be1dbf6eb72bd3edcd070834d77613c7f809aecb7e9bcf683be28a1fbf2c9512a0f8739a3684a8656f98e1745ef4488d55646d6017462e05aa2699f488e0cb71130f3e5453ee1b272f6adcfc268c6dc181bf2df94226ccef2896a6000dda40f35b725dd0a381c49ce8084c3f3578a195abf4cba1b2fc63029dd7daad51d0d58e68a419ae2a3db627463cc1de3ec00e0758606ef35a2acced035da5ce6d94a8b69bf1bb6f504ad9bc4cd51195d48e868c2a9ec7b62c62f8a8a666ca7e3dae6336c096db0d3e47bbc7124a68819235f79ba778e244ef1d16059b1d421dffaf3fd907231b5345d4aec6e30237a0d05f08f3fb297d4011e7282ea1f46cc5e13f17c58300df68885cb4968f23215f2a8119d3c3b6593ff530be9d17e832a65f82b19b98172d1c60d7eb605124edbc03b33da63e92c41dba75ef9e8337e9242061cc03fca7b70e38c60f328d3286b9717afb1bd4f8cfd34992c1cd84597fcc4d1fc03a48e015c9eb3683b8c4eab81accc79c81e45645c3a3fd4b4ce359a381514969a57d5306ddd3665ba5f7b8907b0720427f95de208fef10d2df463061cfafc6216d47696c02d9adbecd1e4e7687c926233c6f8d0b4335cad02cf3b937958676ee4b633441ff6ef41d4089625871ee5ebfda3e4214d2f1071b5ea157b4b1269b3a27d43acf576807f78d7146aeb63266e2a22471ea73d48f93d1e18b799be007c3d83d44d36417781d9243449a54a35547686dd3b4f2a30d0e294cf78522eafe4230519f621b52db16aee7fc6f4f6edbdf9d2ba7d7bd4c29516611b47f433ff723777c19b0b0e0363ffeb51ee21f0da76ca3e8d8ec9a59507371f8f73bf776ef2539733b213ed5fc5fef42ce555f4bbf625c8c088ab86a8d8de1eabaa0f2c1b8c8a7657914c4f9acbdab728ea8a9c606ae47c22c805359159c5a90a20158733348558d3a866ab37883a3bca29eaea01e4fd15b0cb3f842bbbc49e64b06651480ae328fd3f16a05738cb4f41677f66e63eb936175c675356785fa0d2ee1f0badba7f7c588076c631be084d480e3d2941da5437dd6361b429a50b5506a35cfab0256c398cb20ac58ca9ac9d03803a6d51229dd6003bca09314ba8ba2619fa2edc5b4d2bccda9a30327cbdad6186c220f782413dbba3116f70b345f63707989fbf023a48a030a56ec72342869e0a10e4d97fd1d114880c4602abacc2115c30a7d90c8af2ca770909dd5d0562217c9179e9dbd3044b38436ae44cb7af87bb1234d3b242e3ee5870700ea3cae61257546de753fc51e76cf0776eb9886d3b12aa0d6c4b21401ba0d6d374c075823505f671e5574586550492836f6a82111160b2fca819f5a8f8d82ef6482ba26d7c24757d2ba4fb3450ec4a5bf631f4435b9a913f76ce629e7b7122b40246317ae5a06166e77796a739f814c5c4dbbbb9f3386a60f6aafaf5f220b157ae19e014583268e7eac65408d58098f1eed160f8e81abdf6aaaa7103cece717dc1c336d61765b91ba3f37966b427fa6d8a5906f2e83e9824c5bdb0fb0ac632ffbc24e5d23f80d8125fc7491c1296467ea99faa75b3652b73da4ea315e67b36ebdfd885d54508551c122e0a90c0cfcb7cffd4e7c21ada0151e5eb32670348d4ed24764e2f52b4a1ec6033984cc3ee53abcba0602a3e74b22308fbdb9f18e3265ba065805d4890df73a9a3dc6169162343dfca7afd6085275c345120166ed3353c8a3a5e3a3a0a474a85b8313a640c92d9e40b71b42b9aa2949c18d2d9ab4f295e9df42d8932accdf814e42c784522fa004e91d7e91659a83e01900f9dfeb1716f40150e6e44c4e7b8307df595317b024a808b8d68e4272cb697aead2952d2b687b9bc8a3caea176141e95fb39effafe607aac7267691ba4ec4d99eb086c319b70e4e650dd9fc7e31c44ac36d78752cb90203ec5f06c03140cb60330ae4fe7e4de04764dfcdfcb169bc500f38f798de16c7377819c46a48d99f5716976964b7a92fde362c43220d2a2113e8155fdcba08055d6ee843e7370cfb336d65dfbaee31bd63f8fd99c9b7a5c0a2711000097fbb170ab30140e5701de3c7463b38b3f2b81326ad7466f42edf5563d724e30235fc5ea122701050069392d18b5f8757f1fcf1c61854aef9c3818c47fa4e28b1ce23fa89042de24d7e12a19401a0480c2d72f20e6f631

Sending to a QRL Node...
error_code: SUBMITTED
tx_hash: "\322\242\021>\201U\375\313\240\200U\326\356\204>sp\317\2636\326]\373\256\343\033\326?\217\331\234\233"

```

### tx_push

Push a signed transaction blob to a node for broadcasting. 


#### Help

```
Usage: qrl tx_push [OPTIONS]

  Sends a signed transaction blob to a node

Options:
  --txblob TEXT  transaction blob (unsigned)
  --help         Show this message and exit.
```

#### Additional Option Info

| **Command_Options** | **Required** | **Format** | **Comments** |
| --- | --- |---| -- |
| --txblob | *Yes* | TEXT | Transaction blob (unsigned) to be sent to the node for inclusion to the chain|

#### Example Command

```bash
qrl tx_push --txblob .........
```

#### Example Response

```json
{
  "multiSigSpend": {
    "addrsTo": [
      "AQUAaTktGLX4dX8fzxxhhUrvnDgYxH+k4osc4j+okELeJNfhKhlA"
    ],
    "amounts": [
      "100000000"
    ],
    "expiryBlockNumber": "818022",
    "multiSigAddress": "EQAAl/uxcKswFA5XAd48dGOziz8rgTJq10ZvQu31Vj1yTjAjX8Xq"
  },
  "publicKey": "AQUAHQunIo/8WM729uNyOYp1fWNGZ8XmSWdW08sLN0mtHDtiz3mks2hoxDq5XtcqQJydcqmKvsyL6nvzO898REF+Eg==",
  "signature": "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",
  "transactionHash": "0qIRPoFV/cuggFXW7oQ+c3DPszbWXfuu4xvWP4/ZnJs="
}
3

```


### tx_token

#### Help

```
Usage: qrl tx_token [OPTIONS]

  Create Token Transaction, that results into the formation of new token if
  accepted.

Options:
  --src TEXT               source QRL address
  --master TEXT            master QRL address
  --symbol TEXT            Symbol Name
  --name TEXT              Token Name
  --owner TEXT             Owner QRL address
  --decimals INTEGER       decimals
  --fee DECIMAL            fee in Quanta
  --ots_key_index INTEGER  OTS key Index (1..XMSS num signatures)
  --help                   Show this message and exit.

```
#### Additional Option Info

| **Command_Options** | **Required** | **Format** | **Comments** |
| --- | --- |---| -- |
| --src | *Yes* | TEXT | The source address to send the `tx_token` transaction. This address is responsible for the creation but may not necessarily own the token|
| --master | *No* | TEXT| Used for slave tree transactions where the slave is the `--src`, `--master` is the address the slave is signing for|
| --symbol | *Yes* | TEXT | Symbol that represents the token. (Max length 10)|
| --name | *Yes* | TEXT | Name for the token. (Max length 30|
| --owner | *Yes* | TEXT | Owner QRL address, does not need to be the same as src or receive any tokens|
| --decimals | *Yes* | INTEGER | (Max 19)|
| --fee | *Yes* | DECIMAL | Transaction fee to send the transaction|
| --ots_key_index | *Yes* | INTEGER | OTS Key Index used to sign the transaction, must be an UNUSED OTS for the `--src` address|


#### Example Command

```bash
qrl tx_token --src 0  --symbol doc --name documentation --owner Q01050022d047cc489e9a118e8b2ea45ca0259785586602799486dd8d6844fe2a5855fed1066c50 --decimals 10 --fee 0 --ots_key_index 7 

Master []: 
Address  []: Q01050022d047cc489e9a118e8b2ea45ca0259785586602799486dd8d6844fe2a5855fed1066c50
Amount : 1000000
```
The command will prompt for the master address if not passed, an address to receive initial tokens, and the amount to receive in shor.


#### Example Response

```bash
3
```

### tx_transfer

Transfer funds from an address to destination address(s) with optional message data.

#### Help

```
Usage: qrl tx_transfer [OPTIONS]

  Transfer coins from src to dsts

Options:
  --src TEXT               signer QRL address
  --master TEXT            master QRL address
  --dsts TEXT              List of destination addresses
  --amounts TEXT           List of amounts to transfer (Quanta)
  --message_data TEXT      Message (Optional)
  --fee DECIMAL            fee in Quanta
  --ots_key_index INTEGER  OTS key Index (1..XMSS num signatures)
  --help                   Show this message and exit.
```

#### Additional Option Info

| **Command_Options** | **Required** | **Format** | **Comments** |
| --- | --- |---| -- |
| --src | *Yes* | TEXT | The source address to send the `tx_transfer` transaction. Must have sufficient balance to cover the transaction + fee|
| --master | *No* | TEXT| Used for slave tree transactions where the slave is the `--src`, `--master` is the address the slave is signing for|
| --dsts | *Yes* | TEXT | QRL Destination addresses to receive the transaction (*Max 100 addresses*) given in list format|
| --amounts | *Yes* | TEXT | amount of tokens to create into the address(s) given in `--dsts` in list format|
| --message_data | *No* | TEXT | Additional text to append to the transaction. (Max 80 bytes)|
| --fee | *Yes* | DECIMAL | Transaction fee to send the transaction on-chain|
| --ots_key_index | *Yes* | INTEGER | OTS Key Index used to sign the transaction, must be an UNUSED OTS key for the `--src` address|


#### Example Command

##### Single Address `tx_transfer`

```bash
qrl tx_transfer --src 0 --dsts "Q01050069392d18b5f8757f1fcf1c61854aef9c3818c47fa4e28b1ce23fa89042de24d7e12a1940" --amounts "0.001" --message_data "Test Documentation Transaction" --fee 0 --ots_key_index 10
```

##### Multi-Address `tx_transafer`

```bash
qrl --json --port_pub 19010 tx_transfer --src 0 --dsts "Q01050069392d18b5f8757f1fcf1c61854aef9c3818c47fa4e28b1ce23fa89042de24d7e12a1940 Q010500e52f42fa130eb56c8001d53fc0ade392fca95b8dc976f4200fc993142be4a73284b655e2 Q010500f08f5159307edb6e948d7ccccf287ff5012feef9f07844c8d867697d8ebd7fe52bc1fcca" --amounts "0.001 0.00002 1" --message_data "Test Documentation Transaction" --fee 0 --ots_key_index 12
```

#### Example Response

##### Single Address `tx_transfer` response

```bash
{
 "publicKey": "010500f6e8e9521b19934c0fa221324101c6075f114aa764ad362931d5c696846ec968c74e1f4b61067d07fc967be6797573b0d533db3b633258988faa0a73b8c5602d",
 "signature": "00000004ee549e8f087edd27b193f78e2a75431794369f2d3392f8ef6438e1fd8233cc8233668a6347586406147a8b471e7e71d5df1498f9659de45181e032e26612ccacba951fd910128977488716d66ae687d81cc2085aae154e7a338a5e922e6d8142e470cbca9a9c9c5cb55ba807e7ac7ac0b29b9e7b1236a9d15e92035a8b98c70f478507542549c503b5e4a1006820d592b9303eb4191526da86856d4533cffe194a7df335290b5ec7bbf688591fc492da69c98441836854baa00dbbee1bd8c1d94d132771eca07f2d7126d91771e8c454db01447b6f2543f531fb92e94fa3b9fe4d36731a7ff267fb9865cda440e68fae0587746e1e9380b2a0797857c91ed100dea0d4e1e520b1e869eec80daa6c5b26da6f9f742e17897c6d337c127d8b0978894eafc562e71eacf604ebfd082affe48118575cac747e6f422315edb544cce6207a4939879d13d87aad3977aac14d8d91f9cc13b0cc1957375ed208156bc47ea11b28893771ff4b1a28fbd6d7d1b73a3aa09db421e5212c60cdf89473dcecf27385b4c365d935b22eeaacd46db402d5ab8335eccc5afd3c7a636a5a002a1d53bd055cb54c4c9779abacc1927b95fb7ccf6bfdde41eab67989a1babeb78573dcd3cb4ab5e517ac040871eecf8817dee6b11c6b4300f8e862a972a6121686c3b1857cacca9d792c5de49c1bf5f153d8f6847b7aee63ffd369cecaf94e9345e2211cfca8b02911a897732558a3ab90a666893cb387195103ca656d3935b31c352de0b4a3c8080312546cacc6b5ec0d56cada139f67aab4cf5801a81c9836eb0a38dfc492cb08c4e3a159c4b668d2906ff285a4a5bfeb524cc27d987d00f85fb642b43a9b42fceeb2b96a5f89fb399137d25fecf9a619b6fda8dbfbb953e34a0ba44dfc1cdbffc7472c02620a39477ac6b5071a3fb23c5069603f90dd46edaa8cd7572b284c547ac6f7277ef0f92ca987d4991be367d25b2fb6be8ee135c641f7fb1ae7897146211cea28f2204d80d3c7647501bba2007f741852d87c52dc74dc8d41202f0b205f5176b53e403d08f463305ab4fc44e4bbecd62954e75d8afb4aceb3a6d140675285bdc87019c0235909a63f417d46e83aabc2effa1e58d85c196f00d3c58ab8186e29a42274294ea40117cb6b22046b51513e4de93a60a9ccf2ee9fc33284f2388bac299b78576cd5080604a653bf8bcc4fe919b1036f9f4c3593019a9cb523b76669f7d884c152f06f4160714b51b1eed899fab215f5c9df7be1f73146d3cdfc7c87f1be59811ad7ba94e3a16e23882b564bae060114fd1597023e7072fe80cbca9c207b9d100f2997115b8ea52c17f9f4238962af87c04c7a32072d2fd076f7471d4a863cbd9a8971bf03af4c3ada7ee58ba4f77d05385ce4052f0ca1b4ddf1a91a1f895b3b6f25604f839ba78e26ca3533275f08054902e5ca5d599247de2d48405f4cdaafbabc78c53cb276e19df84ce1c99970e32c13c84b034834e19fd85e74516a7c118e519acf92023f61683e924907d50301ec06776db334f70a6638f97994c3d766999029a89a32a060463dfde4bc6aff65fc7b7b0a506fcabf5880cb2d1987b9cc1638f2fbd9bffb86b141e91effc40b9a9bafe039cff1b7097052449dcd6cf1b91e2a44c9bb4076aa9904099f050516ca4f245871218c4f9ab4b6dc6d7fe17d8a01025f1edc2d3cc45a4705bfb3809a57f1d7bd89781065d3520b1bc23e4e3962f4f4b69eba537a8d5e3932fce47165c4d2ac9801141d94c460427aad05ccc026a5d7b9bff1b6bb15bbaceb90d4f0c9d5c611c3c0996bbb2faadabbc2444c609a1abd3a1a2e95e4aaaae8bcdb1d266a75e910172f081d228d8ab5044174f6466850a3391824c8697b2b997b646b8ec0e8c68b0167fc5c5319736c117e45810fba50af24d6e66649abbfb204a6de9b3c8859037f9b8de6e31797dd9858a0d6606b6058c5f4f303c09684a745946bb9438ddbafb92b92944ca7e061a2aa36b8380e91725f794a31a63f4bfee72c227b0704baf11130150f64de4b6027278d1be05810d045483f96ebb85794dc97300259114bb47e3789d9e265864efdfc21bfc7fdaab195c124bf2f22531e07e73928bbd67b217a2c0a14c4419f01aff1ce8ae0f9946b861c29beb5108beab80224f45b68fe8133154b06323a5181dc66cadf6ba8aa2723e3e9b292a47db481c5c9b7fe83bd5797ba545a4864ec50e579f919fab8a4e7a31276dc27e135f56bb6c7b543a34a7e151d453e6550b6e4130637f2e01ee4a4bd4a12b17912659255c553fef0144009c0e08edd3401dbeaf68cedd04860a40f611176468f1f940af14602169d9f7ed0495269a2902bc1ee053b71e1902d7fbefb838fdeeaa85218e168b6e32171ed368c3440d4eb959077cfb614413c8e1e4441de425b57072fca936c2e3bb593833c4a8cc9cb071ba8217967be03ccbb6202c2eb8ca2b36cd4bffa228cfbef00742358886d22b3096240ea6a9b68205db94e86e111520ed2faaaceaa5b73057ed76edd0f86f9e20b3b656cf696ad9a06d0af4d96cc890439af3215daeb310e4b78495d2eda2238848710f3fbc0b84be3ece0af88d1daa75ad936ee68a6be3a3d7cfbdd60b51506b192a03d00438a6a4bd4c1f13164882fcfa2b0ab72099bf1681bd1d6f28586c99adbd83b4a08214282d7326a0f4a9f44158b48ff5315ccc6439492f0f63bffafe8fc87baf25fdd884449fbe2c44a37408ca958a2df218f45a05d1640f7bf12d0f39a8afdd22130974b9b85c51a65435a95a48aefd1cb743dffb1f8ed6ddaa238b8b48ce6471300a37a554c68270265ec01d536c246f7c30b068fef4b922016af8e0a0fcb4d0ea8f758eaf464a9a68c8a0a2f46a49e0c93ba5b0c6d69849205658ff693e42050448114e35ea996231766781978485486c37af0197835f1c51bc76a17f1b2bc4f86e8c6dc15576b03ec6d0d7f8a4a11abf7f80c3734d36af288af523fb15172d16a72f4aff3a2c1963ea8c2c9c2e4f4c1b77694dc18028e4c9340555ed9509c362216fc5636200db68dea786fcc2309bd1ba57d9995a3c41f08694b68354f77719d622a5d6964774683b24d5f837257759103d3b30d959aff1851b09de68120a69d2c8c5977cc0de657bf919af288bf0bcf41809a27de2be385e6ce623988a52fb28e0a501c0e505e64d78786141f526225b48197fddfc7bae81f5cbf13264348995b17711e5ab6c5c3de32215c56f51266ba5d0b2b3a66158264a9c5ceb340cb3cf71e241b002d48028482584c9b8c2de2c48c8aaa589ebcc9bf121e3d1230a4aa3a8fa43019e70674a5b5266e3d0c7dfa5f873520175b7f937f27bfe1816ffb8d003ffa9e2249b9cf2f4b7c5cf6d5aaefe1eb7851740ed87912a63914457a33ccccc768c4b521c4ed02472f353879c6e0b6d95e3fed1f8322d0587f3e2b8aab9d6446ed62874095b1f4f429671e93d183455b7c887cdb53b1ddc4f0d50a83962819eade4e91d45056d653b60d596ae9dce36cbf46b2f8",
 "transactionHash": "47677ba8f5058c08b51cac24665990bc501d3628243eb99f9563c680e74bb925",
 "transfer": {
  "addrsTo": [
   "01050069392d18b5f8757f1fcf1c61854aef9c3818c47fa4e28b1ce23fa89042de24d7e12a1940"
  ],
  "amounts": [
   "1000000"
  ],
  "messageData": "VGVzdCBEb2N1bWVudGF0aW9uIFRyYW5zYWN0aW9u"
 }
}

Transaction Blob (signed): 

1a43010500f6e8e9521b19934c0fa221324101c6075f114aa764ad362931d5c696846ec968c74e1f4b61067d07fc967be6797573b0d533db3b633258988faa0a73b8c5602d22c41300000004ee549e8f087edd27b193f78e2a75431794369f2d3392f8ef6438e1fd8233cc8233668a6347586406147a8b471e7e71d5df1498f9659de45181e032e26612ccacba951fd910128977488716d66ae687d81cc2085aae154e7a338a5e922e6d8142e470cbca9a9c9c5cb55ba807e7ac7ac0b29b9e7b1236a9d15e92035a8b98c70f478507542549c503b5e4a1006820d592b9303eb4191526da86856d4533cffe194a7df335290b5ec7bbf688591fc492da69c98441836854baa00dbbee1bd8c1d94d132771eca07f2d7126d91771e8c454db01447b6f2543f531fb92e94fa3b9fe4d36731a7ff267fb9865cda440e68fae0587746e1e9380b2a0797857c91ed100dea0d4e1e520b1e869eec80daa6c5b26da6f9f742e17897c6d337c127d8b0978894eafc562e71eacf604ebfd082affe48118575cac747e6f422315edb544cce6207a4939879d13d87aad3977aac14d8d91f9cc13b0cc1957375ed208156bc47ea11b28893771ff4b1a28fbd6d7d1b73a3aa09db421e5212c60cdf89473dcecf27385b4c365d935b22eeaacd46db402d5ab8335eccc5afd3c7a636a5a002a1d53bd055cb54c4c9779abacc1927b95fb7ccf6bfdde41eab67989a1babeb78573dcd3cb4ab5e517ac040871eecf8817dee6b11c6b4300f8e862a972a6121686c3b1857cacca9d792c5de49c1bf5f153d8f6847b7aee63ffd369cecaf94e9345e2211cfca8b02911a897732558a3ab90a666893cb387195103ca656d3935b31c352de0b4a3c8080312546cacc6b5ec0d56cada139f67aab4cf5801a81c9836eb0a38dfc492cb08c4e3a159c4b668d2906ff285a4a5bfeb524cc27d987d00f85fb642b43a9b42fceeb2b96a5f89fb399137d25fecf9a619b6fda8dbfbb953e34a0ba44dfc1cdbffc7472c02620a39477ac6b5071a3fb23c5069603f90dd46edaa8cd7572b284c547ac6f7277ef0f92ca987d4991be367d25b2fb6be8ee135c641f7fb1ae7897146211cea28f2204d80d3c7647501bba2007f741852d87c52dc74dc8d41202f0b205f5176b53e403d08f463305ab4fc44e4bbecd62954e75d8afb4aceb3a6d140675285bdc87019c0235909a63f417d46e83aabc2effa1e58d85c196f00d3c58ab8186e29a42274294ea40117cb6b22046b51513e4de93a60a9ccf2ee9fc33284f2388bac299b78576cd5080604a653bf8bcc4fe919b1036f9f4c3593019a9cb523b76669f7d884c152f06f4160714b51b1eed899fab215f5c9df7be1f73146d3cdfc7c87f1be59811ad7ba94e3a16e23882b564bae060114fd1597023e7072fe80cbca9c207b9d100f2997115b8ea52c17f9f4238962af87c04c7a32072d2fd076f7471d4a863cbd9a8971bf03af4c3ada7ee58ba4f77d05385ce4052f0ca1b4ddf1a91a1f895b3b6f25604f839ba78e26ca3533275f08054902e5ca5d599247de2d48405f4cdaafbabc78c53cb276e19df84ce1c99970e32c13c84b034834e19fd85e74516a7c118e519acf92023f61683e924907d50301ec06776db334f70a6638f97994c3d766999029a89a32a060463dfde4bc6aff65fc7b7b0a506fcabf5880cb2d1987b9cc1638f2fbd9bffb86b141e91effc40b9a9bafe039cff1b7097052449dcd6cf1b91e2a44c9bb4076aa9904099f050516ca4f245871218c4f9ab4b6dc6d7fe17d8a01025f1edc2d3cc45a4705bfb3809a57f1d7bd89781065d3520b1bc23e4e3962f4f4b69eba537a8d5e3932fce47165c4d2ac9801141d94c460427aad05ccc026a5d7b9bff1b6bb15bbaceb90d4f0c9d5c611c3c0996bbb2faadabbc2444c609a1abd3a1a2e95e4aaaae8bcdb1d266a75e910172f081d228d8ab5044174f6466850a3391824c8697b2b997b646b8ec0e8c68b0167fc5c5319736c117e45810fba50af24d6e66649abbfb204a6de9b3c8859037f9b8de6e31797dd9858a0d6606b6058c5f4f303c09684a745946bb9438ddbafb92b92944ca7e061a2aa36b8380e91725f794a31a63f4bfee72c227b0704baf11130150f64de4b6027278d1be05810d045483f96ebb85794dc97300259114bb47e3789d9e265864efdfc21bfc7fdaab195c124bf2f22531e07e73928bbd67b217a2c0a14c4419f01aff1ce8ae0f9946b861c29beb5108beab80224f45b68fe8133154b06323a5181dc66cadf6ba8aa2723e3e9b292a47db481c5c9b7fe83bd5797ba545a4864ec50e579f919fab8a4e7a31276dc27e135f56bb6c7b543a34a7e151d453e6550b6e4130637f2e01ee4a4bd4a12b17912659255c553fef0144009c0e08edd3401dbeaf68cedd04860a40f611176468f1f940af14602169d9f7ed0495269a2902bc1ee053b71e1902d7fbefb838fdeeaa85218e168b6e32171ed368c3440d4eb959077cfb614413c8e1e4441de425b57072fca936c2e3bb593833c4a8cc9cb071ba8217967be03ccbb6202c2eb8ca2b36cd4bffa228cfbef00742358886d22b3096240ea6a9b68205db94e86e111520ed2faaaceaa5b73057ed76edd0f86f9e20b3b656cf696ad9a06d0af4d96cc890439af3215daeb310e4b78495d2eda2238848710f3fbc0b84be3ece0af88d1daa75ad936ee68a6be3a3d7cfbdd60b51506b192a03d00438a6a4bd4c1f13164882fcfa2b0ab72099bf1681bd1d6f28586c99adbd83b4a08214282d7326a0f4a9f44158b48ff5315ccc6439492f0f63bffafe8fc87baf25fdd884449fbe2c44a37408ca958a2df218f45a05d1640f7bf12d0f39a8afdd22130974b9b85c51a65435a95a48aefd1cb743dffb1f8ed6ddaa238b8b48ce6471300a37a554c68270265ec01d536c246f7c30b068fef4b922016af8e0a0fcb4d0ea8f758eaf464a9a68c8a0a2f46a49e0c93ba5b0c6d69849205658ff693e42050448114e35ea996231766781978485486c37af0197835f1c51bc76a17f1b2bc4f86e8c6dc15576b03ec6d0d7f8a4a11abf7f80c3734d36af288af523fb15172d16a72f4aff3a2c1963ea8c2c9c2e4f4c1b77694dc18028e4c9340555ed9509c362216fc5636200db68dea786fcc2309bd1ba57d9995a3c41f08694b68354f77719d622a5d6964774683b24d5f837257759103d3b30d959aff1851b09de68120a69d2c8c5977cc0de657bf919af288bf0bcf41809a27de2be385e6ce623988a52fb28e0a501c0e505e64d78786141f526225b48197fddfc7bae81f5cbf13264348995b17711e5ab6c5c3de32215c56f51266ba5d0b2b3a66158264a9c5ceb340cb3cf71e241b002d48028482584c9b8c2de2c48c8aaa589ebcc9bf121e3d1230a4aa3a8fa43019e70674a5b5266e3d0c7dfa5f873520175b7f937f27bfe1816ffb8d003ffa9e2249b9cf2f4b7c5cf6d5aaefe1eb7851740ed87912a63914457a33ccccc768c4b521c4ed02472f353879c6e0b6d95e3fed1f8322d0587f3e2b8aab9d6446ed62874095b1f4f429671e93d183455b7c887cdb53b1ddc4f0d50a83962819eade4e91d45056d653b60d596ae9dce36cbf46b2f8322047677ba8f5058c08b51cac24665990bc501d3628243eb99f9563c680e74bb9253a4e0a2701050069392d18b5f8757f1fcf1c61854aef9c3818c47fa4e28b1ce23fa89042de24d7e12a19401203c0843d1a1e5465737420446f63756d656e746174696f6e205472616e73616374696f6e
Sending to a QRL Node...
error_code: SUBMITTED
tx_hash: "Gg{\250\365\005\214\010\265\034\254$fY\220\274P\0356($>\271\237\225c\306\200\347K\271%"

```
##### Multi-Address `tx_transfer` response

```json
{
 "publicKey": "010500f6e8e9521b19934c0fa221324101c6075f114aa764ad362931d5c696846ec968c74e1f4b61067d07fc967be6797573b0d533db3b633258988faa0a73b8c5602d",
 "signature": "0000000c36596a313cfa95f9bd1dc2bdf3d6dc46c857062b82fdf2530ab37a6da1fa5c362e2dc00d55d05cee9358c2a1bcb599fc575ed239774b15d97121b20139014aa61d0847b9ddab1536bdce36ea7ffcaba48346ce5e93edbaa9c4bf12979e123c5cacf08fe5bd812b961f867140f61079da74d70b001630bafbc1557f017fa06dd947d8dfbb6dd7f241575e5d8d519edd5af3ec031a4a359d5a320c5b3aee7378043c83695abf64c2f8dae5ee16c06cbbc8802e242f4d8a8698f5da881eedd212821a906acb508be799be4cb1e8d9599c2b6e5ce8a4847f7437f706812b51de516464df73a000ab07c96f09965ecb151da5ff25598b79d45a0be433182db8ae005ccd7866e076c902b87e59634a9779e96c53e66973fbf8cba8ed19084cde50260b1f1dbd1c059727d35f67ddf100b6b8b554e2c373fba79e91e583457c78385c246a68a415ffe1868ef1bde75b1092430f3cda850bdf01017640a73a567a1bd6b101d991d98b6799756df36ec4afa90a2e0ee6df173185a3a7f9ed087f8632602ca5f893181be810e0826bfadaf675ae0d06ba92907dc5a60d2e7cd90e2f77222e38b38a629105886f95984445c0e126309dde2d136f73edd31226ecbc0eebf1efe3b743584e315d451c9d9dbaba25dfd3ba373b70750ce369b43766ea15038248acf94d1212527d0a7f325121391a7cd74aec26c08d711788ff21c522f6735424d8d1839938b810cbe92057059a498e1887f566d0780603d4d83288be6ebe061b72f86e201892bc1b17fd8749ba6c93d7f4b5d5b1382c8bc9fa3e2dd256b2942a288aba75d23978893bc1bbf21cf1f1a9f84d8161f01478be5da2dafb506bda4ff1f4e640acb23cfb7bed425b9d927270280f9d6c903e08177d69e974a2b7b7f73c0ba54b9bce794c25f26c59a0be054cb5f99c36f3080a4dba18540685aeb1b8e70a2007d4d888117c479ada237123f75dab57dcac1d0e26a038ee542e7ef102da3c0abb4dacbf8e057893827922d2692494e8babd747f3ff2d968895080998ba185e804857d6b1861daa427b96d1ffdbed7ae017f25b6fa535e02b4e7e5975d98e387ae217c3c529dab2b0c2d2234b68aa12edc98bc15a085a044156765fb49f32630d6d86bea4ffaf53cc1739668b9da3f176b84d6b732e086be2182842c0dec3338d669fafb7d3cff119958d7f162464be900c94e760b32b4021a67904f4cad8b49c1ea8f10288a41e8c4626a7c70f6c6330dcb0bfaadbc20fec5117449df7f9d27c76a3dcc3e1dfbf231871583fa6771916aa4b79b60226fe72b5ccff7e46b2ee8f2686477798d57485436d70d47fb3bc0159a3ff611730e5f43c5dd9cc3226eeaf782c26a3697ad30cb713aaf8902b4f8d59f0243f08870fe1576568cb4866e4a76ab22a2f23ca97a6875e57d9e9b909eaa5da02106d43a0630ce0e4bf3d43ff04911bc8e3b3f302731e6e7369fc01201e7878edf6c60fc0dd0ea330ab0e1a9baa08619749fafa262978432c43085920ecd36c37dee9e8599ed726846510bb9a66fdc2d4c0200851fcf6c58c37d1341e6b85c2d9f181c9ad2b878d5f33807e7ad96c63a37b43642e8b5ca319b62930a3ea26ad58bce0a3739b215e125805d776032a1225eb880418cce0eb26abd28a66b242ab9e14fa700ad1d2deb9d90a3ffea12a8bad7446daf4c91456280b1b5552564f219224b8f9573319c2e9989aa589259e8e5997605178a361dcb3e65e3b969095ca0a656835e88389d6de048be6b01d4cf9ea22c4fb68b966125314613386f46b2cd602148ea2308da81d296826617aab4c9c178e20b0b1557075df7d7878fe6b2167a84ceab7e75fb25490d6e54c72a29a466278543436f88973e8b5337663b9ee276d884d973c34a8681a1f5fe9ee0ea23f9ef7467b9f1c078c5ee4886e57212b44cc3ecda16b1dad4d395ea8cf1182b00de4ed00d5b965aa5b04ee5e79a9fe78462afe680d4e14a9dfc56aa89b8eecb5e52d6a23c75636d34de4655e8699350df5f3018bf6d05d0e413e5d9f2fc00bfae28834b7d0cd09a8996b193a9dd9b06ee8649529cb0c278a576d57b0efbf0aa7857f5dbb87afb3a21f5f5921d816c3bfc8cf2004aa1fe229c8c946820f25cf3fdd09eb33695586e29a3f044d5ab49a5fd1d6d39af0692305cbd785f901fc131e1974a454959d7fbddf42a9f424b2ce4f52f746b108bcf483eac044715eb7539b6730a1f06e8c459d9f7f3e31abc242eb0c2302a8768de0c5441863a4364d7584cfc8431995437b3d57487d32b96cb2f0f1af3913bd76dff258872a178cdbc596806db1af9ca255c4d107b7454e350f46adffb2977deec6624b6e5412f1b44f050a31a48e5fa5067cb3de27714e257250b87cba79d15ccc64b3d7b8dc6ba46a6b15d4c9e0b950c0bf5dba2c3ebc74f65ade492680d6ee1b3bfb130ece1828d51ca8fb410372c8998ae252604f4a8ab4580ba0149f6f7ac70ab0d612c1b62c3fea36284d1c74d3f3b8368b6ea4c72c137f8651c920a258271efa0f73b16886eed2e5bc2cac2ba0dfcc219e2b5f6a92612404ad37afcf577c8378296ff21bafbc21d0eaa727afd7e20c94bba7f2e17512094e6a39d614f0961eaf441bf70cbdddbf1fc1a8ce3c358c058ddf4d45ee76d7d2d4b820714dafdea30ca6a5aea3b21a5e91461a8ac426ecd26a1cf1073b9e9c3a565186e9dcf80b9f6c7853b316c30ef773df0f0328c6a12dac6bd3abe7327a09ce31188794136bf05d271396a45aab05d666606b4b3daffeb6cc050d91794672f0ff5fc67c4f34feea15fdcb0d8e5456dc3bddc240a88406015ace1bcb52d66370edd1050661dd5af3dd567bb0640f50605a74a8d5d58ce2cce3fb200eebdba9e3ba15132b4a16260612d9abf5b081df6acaa0540339d5b15b2b89256658db87c470d5f0b63173465e819fc2fe4387d7589239d24c3f388949fc798ef3270447249bfcb86cd04771f4cb88e2965f17fa999d48be26081b0dbceaf7e1bf7b7aae1c0be4f575b20059af66e6ecf654cb14c07223827bc68b50f59d8e19c84713ee2823de32994d09d5a23958c6e6e190b354474df9ffd0d8aec8b47cc1b504f9c3d6c1dce1be14a3f7dc73948a989e0b0cbc7623b1f19a6e783110636c04e65f6872e83713bff869d8742077456c07cc45a88bff74badd2295ef4a5b456209f62221e59e8d9df0a75f6865222838236de409112e6263a8485ce4022191363713c4395f7b8a106970a3bb889158264a9c5ceb340cb3cf71e241b002d48028482584c9b8c2de2c48c8aaa589ebcc9bf121e3d1230a4aa3a8fa43019e70674a5b5266e3d0c7dfa5f873520175b7f937f27bfe1816ffb8d003ffa9e2249b9cf2f4b7c5cf6d5aaefe1eb7851740ed87912a63914457a33ccccc768c4b521c4ed02472f353879c6e0b6d95e3fed1f8322d0587f3e2b8aab9d6446ed62874095b1f4f429671e93d183455b7c887cdb53b1ddc4f0d50a83962819eade4e91d45056d653b60d596ae9dce36cbf46b2f8",
 "transactionHash": "7f0bd7e18937cb8f8fb550c8b4a45b6ce25d9d17e3156d9fe08d75dfa8c7ce75",
 "transfer": {
  "addrsTo": [
   "01050069392d18b5f8757f1fcf1c61854aef9c3818c47fa4e28b1ce23fa89042de24d7e12a1940",
   "010500e52f42fa130eb56c8001d53fc0ade392fca95b8dc976f4200fc993142be4a73284b655e2",
   "010500f08f5159307edb6e948d7ccccf287ff5012feef9f07844c8d867697d8ebd7fe52bc1fcca"
  ],
  "amounts": [
   "1000000",
   "20000",
   "1000000000"
  ],
  "messageData": "VGVzdCBEb2N1bWVudGF0aW9uIFRyYW5zYWN0aW9u"
 }
}

Transaction Blob (signed): 

1a43010500f6e8e9521b19934c0fa221324101c6075f114aa764ad362931d5c696846ec968c74e1f4b61067d07fc967be6797573b0d533db3b633258988faa0a73b8c5602d22c4130000000c36596a313cfa95f9bd1dc2bdf3d6dc46c857062b82fdf2530ab37a6da1fa5c362e2dc00d55d05cee9358c2a1bcb599fc575ed239774b15d97121b20139014aa61d0847b9ddab1536bdce36ea7ffcaba48346ce5e93edbaa9c4bf12979e123c5cacf08fe5bd812b961f867140f61079da74d70b001630bafbc1557f017fa06dd947d8dfbb6dd7f241575e5d8d519edd5af3ec031a4a359d5a320c5b3aee7378043c83695abf64c2f8dae5ee16c06cbbc8802e242f4d8a8698f5da881eedd212821a906acb508be799be4cb1e8d9599c2b6e5ce8a4847f7437f706812b51de516464df73a000ab07c96f09965ecb151da5ff25598b79d45a0be433182db8ae005ccd7866e076c902b87e59634a9779e96c53e66973fbf8cba8ed19084cde50260b1f1dbd1c059727d35f67ddf100b6b8b554e2c373fba79e91e583457c78385c246a68a415ffe1868ef1bde75b1092430f3cda850bdf01017640a73a567a1bd6b101d991d98b6799756df36ec4afa90a2e0ee6df173185a3a7f9ed087f8632602ca5f893181be810e0826bfadaf675ae0d06ba92907dc5a60d2e7cd90e2f77222e38b38a629105886f95984445c0e126309dde2d136f73edd31226ecbc0eebf1efe3b743584e315d451c9d9dbaba25dfd3ba373b70750ce369b43766ea15038248acf94d1212527d0a7f325121391a7cd74aec26c08d711788ff21c522f6735424d8d1839938b810cbe92057059a498e1887f566d0780603d4d83288be6ebe061b72f86e201892bc1b17fd8749ba6c93d7f4b5d5b1382c8bc9fa3e2dd256b2942a288aba75d23978893bc1bbf21cf1f1a9f84d8161f01478be5da2dafb506bda4ff1f4e640acb23cfb7bed425b9d927270280f9d6c903e08177d69e974a2b7b7f73c0ba54b9bce794c25f26c59a0be054cb5f99c36f3080a4dba18540685aeb1b8e70a2007d4d888117c479ada237123f75dab57dcac1d0e26a038ee542e7ef102da3c0abb4dacbf8e057893827922d2692494e8babd747f3ff2d968895080998ba185e804857d6b1861daa427b96d1ffdbed7ae017f25b6fa535e02b4e7e5975d98e387ae217c3c529dab2b0c2d2234b68aa12edc98bc15a085a044156765fb49f32630d6d86bea4ffaf53cc1739668b9da3f176b84d6b732e086be2182842c0dec3338d669fafb7d3cff119958d7f162464be900c94e760b32b4021a67904f4cad8b49c1ea8f10288a41e8c4626a7c70f6c6330dcb0bfaadbc20fec5117449df7f9d27c76a3dcc3e1dfbf231871583fa6771916aa4b79b60226fe72b5ccff7e46b2ee8f2686477798d57485436d70d47fb3bc0159a3ff611730e5f43c5dd9cc3226eeaf782c26a3697ad30cb713aaf8902b4f8d59f0243f08870fe1576568cb4866e4a76ab22a2f23ca97a6875e57d9e9b909eaa5da02106d43a0630ce0e4bf3d43ff04911bc8e3b3f302731e6e7369fc01201e7878edf6c60fc0dd0ea330ab0e1a9baa08619749fafa262978432c43085920ecd36c37dee9e8599ed726846510bb9a66fdc2d4c0200851fcf6c58c37d1341e6b85c2d9f181c9ad2b878d5f33807e7ad96c63a37b43642e8b5ca319b62930a3ea26ad58bce0a3739b215e125805d776032a1225eb880418cce0eb26abd28a66b242ab9e14fa700ad1d2deb9d90a3ffea12a8bad7446daf4c91456280b1b5552564f219224b8f9573319c2e9989aa589259e8e5997605178a361dcb3e65e3b969095ca0a656835e88389d6de048be6b01d4cf9ea22c4fb68b966125314613386f46b2cd602148ea2308da81d296826617aab4c9c178e20b0b1557075df7d7878fe6b2167a84ceab7e75fb25490d6e54c72a29a466278543436f88973e8b5337663b9ee276d884d973c34a8681a1f5fe9ee0ea23f9ef7467b9f1c078c5ee4886e57212b44cc3ecda16b1dad4d395ea8cf1182b00de4ed00d5b965aa5b04ee5e79a9fe78462afe680d4e14a9dfc56aa89b8eecb5e52d6a23c75636d34de4655e8699350df5f3018bf6d05d0e413e5d9f2fc00bfae28834b7d0cd09a8996b193a9dd9b06ee8649529cb0c278a576d57b0efbf0aa7857f5dbb87afb3a21f5f5921d816c3bfc8cf2004aa1fe229c8c946820f25cf3fdd09eb33695586e29a3f044d5ab49a5fd1d6d39af0692305cbd785f901fc131e1974a454959d7fbddf42a9f424b2ce4f52f746b108bcf483eac044715eb7539b6730a1f06e8c459d9f7f3e31abc242eb0c2302a8768de0c5441863a4364d7584cfc8431995437b3d57487d32b96cb2f0f1af3913bd76dff258872a178cdbc596806db1af9ca255c4d107b7454e350f46adffb2977deec6624b6e5412f1b44f050a31a48e5fa5067cb3de27714e257250b87cba79d15ccc64b3d7b8dc6ba46a6b15d4c9e0b950c0bf5dba2c3ebc74f65ade492680d6ee1b3bfb130ece1828d51ca8fb410372c8998ae252604f4a8ab4580ba0149f6f7ac70ab0d612c1b62c3fea36284d1c74d3f3b8368b6ea4c72c137f8651c920a258271efa0f73b16886eed2e5bc2cac2ba0dfcc219e2b5f6a92612404ad37afcf577c8378296ff21bafbc21d0eaa727afd7e20c94bba7f2e17512094e6a39d614f0961eaf441bf70cbdddbf1fc1a8ce3c358c058ddf4d45ee76d7d2d4b820714dafdea30ca6a5aea3b21a5e91461a8ac426ecd26a1cf1073b9e9c3a565186e9dcf80b9f6c7853b316c30ef773df0f0328c6a12dac6bd3abe7327a09ce31188794136bf05d271396a45aab05d666606b4b3daffeb6cc050d91794672f0ff5fc67c4f34feea15fdcb0d8e5456dc3bddc240a88406015ace1bcb52d66370edd1050661dd5af3dd567bb0640f50605a74a8d5d58ce2cce3fb200eebdba9e3ba15132b4a16260612d9abf5b081df6acaa0540339d5b15b2b89256658db87c470d5f0b63173465e819fc2fe4387d7589239d24c3f388949fc798ef3270447249bfcb86cd04771f4cb88e2965f17fa999d48be26081b0dbceaf7e1bf7b7aae1c0be4f575b20059af66e6ecf654cb14c07223827bc68b50f59d8e19c84713ee2823de32994d09d5a23958c6e6e190b354474df9ffd0d8aec8b47cc1b504f9c3d6c1dce1be14a3f7dc73948a989e0b0cbc7623b1f19a6e783110636c04e65f6872e83713bff869d8742077456c07cc45a88bff74badd2295ef4a5b456209f62221e59e8d9df0a75f6865222838236de409112e6263a8485ce4022191363713c4395f7b8a106970a3bb889158264a9c5ceb340cb3cf71e241b002d48028482584c9b8c2de2c48c8aaa589ebcc9bf121e3d1230a4aa3a8fa43019e70674a5b5266e3d0c7dfa5f873520175b7f937f27bfe1816ffb8d003ffa9e2249b9cf2f4b7c5cf6d5aaefe1eb7851740ed87912a63914457a33ccccc768c4b521c4ed02472f353879c6e0b6d95e3fed1f8322d0587f3e2b8aab9d6446ed62874095b1f4f429671e93d183455b7c887cdb53b1ddc4f0d50a83962819eade4e91d45056d653b60d596ae9dce36cbf46b2f832207f0bd7e18937cb8f8fb550c8b4a45b6ce25d9d17e3156d9fe08d75dfa8c7ce753aa8010a2701050069392d18b5f8757f1fcf1c61854aef9c3818c47fa4e28b1ce23fa89042de24d7e12a19400a27010500e52f42fa130eb56c8001d53fc0ade392fca95b8dc976f4200fc993142be4a73284b655e20a27010500f08f5159307edb6e948d7ccccf287ff5012feef9f07844c8d867697d8ebd7fe52bc1fcca120bc0843da09c018094ebdc031a1e5465737420446f63756d656e746174696f6e205472616e73616374696f6e
Sending to a QRL Node...
error_code: SUBMITTED
tx_hash: "\177\013\327\341\2117\313\217\217\265P\310\264\244[l\342]\235\027\343\025m\237\340\215u\337\250\307\316u"

```
### tx_transfertoken

#### Help

```
Usage: qrl tx_transfertoken [OPTIONS]

  Create Transfer Token Transaction, which moves tokens from src to dst.

Options:
  --src TEXT               source QRL address
  --master TEXT            master QRL address
  --token_txhash TEXT      Token Txhash
  --dsts TEXT              List of destination addresses
  --amounts TEXT           List of amounts to transfer (Quanta)
  --decimals INTEGER       decimals
  --fee DECIMAL            fee in Quanta
  --ots_key_index INTEGER  OTS key Index (1..XMSS num signatures)
  --help                   Show this message and exit.
```
#### Additional Option Info

| **Command_Options** | **Required** | **Format** | **Comments** |
| --- | --- |---| -- |
| --src | *Yes* | TEXT | The source address to send the `tx_transfertoken` transaction. Must hold a positive balance of the token to send|
| --master | *No* | TEXT| Used for slave tree transactions where the slave is the `--src`, `--master` is the address the slave is signing for|
| --token_txhash | *Yes* | TEXT | Transaction hash from the `tx_token` token generation command|
| --dsts | *Yes* | TEXT | QRL Destination addresses to receive the tokens (*Max 100 addresses*)|
| --amounts | *Yes* | TEXT | amount of tokens to create into the address(s) given in `--dsts`|
| --decimals | *Yes* | INTEGER | (Max 19)|
| --fee | *Yes* | DECIMAL | Transaction fee to send the transaction|
| --ots_key_index | *Yes* | INTEGER | OTS Key Index used to sign the transaction, must be an UNUSED OTS for the `--src` address|


#### Example Command


**Single destination**

```bash
qrl tx_transfertoken --src 0 --token_txhash d02c4ec9499c0085ae10ba54f82b7461e608183f459f7905fb9bf8cb2611afc1 --dsts Q01050069392d18b5f8757f1fcf1c61854aef9c3818c47fa4e28b1ce23fa89042de24d7e12a1940 --amounts 1 --decimals 10 --fee 0 --ots_key_index 2
```

**Multiple Destinations**

```bash
qrl tx_transfertoken --src 1 --token_txhash 241edecb19d9d8e981bf595b4865de011d591ee3817402332c7a2eccfd1cc6a3 --dsts "Q01050022d047cc489e9a118e8b2ea45ca0259785586602799486dd8d6844fe2a5855fed1066c50 Q010500e52f42fa130eb56c8001d53fc0ade392fca95b8dc976f4200fc993142be4a73284b655e2 Q010500f08f5159307edb6e948d7ccccf287ff5012feef9f07844c8d867697d8ebd7fe52bc1fcca" --amounts "1 1 1" --decimals 0 --fee 0 --ots_key_index 2
```


#### Example Response

```bash
3
```

### wallet_add

Add a new address to an already generated wallet.json file. If none found will create a new file with new address.

#### Help

```
Usage: qrl wallet_add [OPTIONS]

  Adds an address or generates a new wallet (working directory)

Options:
  --height INTEGER
  --hash_function [shake128|shake256|sha2_256] 
                                  Hash function used to build the XMSS tree [default=shake128]

  --help                          Show this message and exit.
```

#### Example Command

```bash
qrl wallet_add  --height 10 --hash_function shake128
```

#### Example Response

```bash
Wallet at          : /home/fr1t2/.qrl
Number  Address                                                                            Balance      
-----------------------------------------------------------------------------------------------------
0       Q01050022d047cc489e9a118e8b2ea45ca0259785586602799486dd8d6844fe2a5855fed1066c50    0.00000000   
1       Q01050069392d18b5f8757f1fcf1c61854aef9c3818c47fa4e28b1ce23fa89042de24d7e12a1940    0.00000000 
```

### wallet_decrypt

Decrypt a previously encrypted `wallet.json` file, overwriting the encrypted file with the plaintext version.

#### Help

```
Usage: qrl wallet_decrypt [OPTIONS]

Options:
  --help  Show this message and exit.
```

#### Example Command

```bash
qrl wallet_decrypt
```

#### Example Response

```bash
Decrypting wallet at /home/fr1t2/wallet.json
Enter password: 
```


### wallet_encrypt

Encrypt a plaintext wallet file already created using password given. This will output an AES encrypted wallet.json file, overwriting the old file.

#### Help

```
Usage: qrl wallet_encrypt [OPTIONS]

Options:
  --help  Show this message and exit.
```

#### Example Command

```bash
qrl wallet_encrypt
```

#### Example Response

```bash
Encrypting wallet at /home/fr1t2/wallet.json
Enter password: 
Repeat for confirmation:
```
File is now encrypted and must be decrypted before use using the password given to encrypt.

### wallet_gen

Generate a new qrl address into a wallet.json file. This will output the newly created wallet in the directory the command is issued from.


#### Help Info

```
qrl wallet_gen --help

Usage: qrl wallet_gen [OPTIONS]

  Generates a new wallet with one address

Options:
  --height INTEGER                XMSS tree height. The resulting tree will be
                                  good for 2^height signatures

  --hash_function [shake128|shake256|sha2_256]
                                  Hash function used to build the XMSS tree
                                  [default=shake128]

  --encrypt                       Encrypts important fields with AES
  --help                          Show this message and exit.
  
  ```

#### Example Command

```bash
qrl wallet_gen --height 10 --hash_function shake128
```

#### Example Output

```
Wallet at          : /home/fr1t2/wallet.json
Number  Address                                                                            Balance      
-----------------------------------------------------------------------------------------------------
0       Q01050022d047cc489e9a118e8b2ea45ca0259785586602799486dd8d6844fe2a5855fed1066c50    0.00000000
```

### wallet_ls

List available addresses in local a wallet.json file, including balance. Will list all addresses associated with the file.

:::info 
Use the optional flag [`--wallet_dir`](#options) to signify a separate wallet.json file location if not in the current directory
:::
#### Help

```
Usage: qrl wallet_ls [OPTIONS]

  Lists available wallets

Options:
  --help  Show this message and exit.
```

#### Example Command

```bash
qrl wallet_ls
```

#### Example Response

```bash
Wallet at          : /home/fr1t2
Number  Address                                                                            Balance      
-----------------------------------------------------------------------------------------------------
0       Q01050022d047cc489e9a118e8b2ea45ca0259785586602799486dd8d6844fe2a5855fed1066c50    100.00000000 
```

### wallet_recover

Recover a wallet file using the private keys from a QRL address. Can be either hexseed or mnemonic. This will reproduce the same wallet.json file generated when the initial address was created.

#### Help

```
Usage: qrl wallet_recover [OPTIONS]

  Recovers a wallet from a hexseed or mnemonic (32 words)

Options:
  --seed-type [hexseed|mnemonic]
  --help                          Show this message and exit.
```

#### Example Command

```bash
qrl wallet_recover --seed-type hexseed
```

#### Example Response

```bash
Please enter your hexseed: 010500bcca375065977c8c5bcfac86bc4e18e80b181247616b7d1ac633644f2b284b074aecd6d6241955046a1c61602682bf45
Recovered Wallet Address : Q01050022d047cc489e9a118e8b2ea45ca0259785586602799486dd8d6844fe2a5855fed1066c50
Do you want to save the recovered wallet? [y/N]: y
Saving...
Done
Wallet at          : /home/fr1t2
Number  Address                                                                            Balance      
-----------------------------------------------------------------------------------------------------
0       Q01050022d047cc489e9a118e8b2ea45ca0259785586602799486dd8d6844fe2a5855fed1066c50    0.00000000
```

### wallet_rm

Removes given address index from a wallet.json file. This will only remove the index given, leaving the rest of the file intact.

#### Help

```
Usage: qrl wallet_rm [OPTIONS]

  Removes an address from the wallet using the given address index.

  Warning! Use with caution. Removing an address from the wallet will result
  in loss of access to the address and is not reversible unless you have
  address recovery information. Use the wallet_secret command for obtaining
  the recovery Mnemonic/Hexseed and the wallet_recover command for restoring
  an address.

Options:
  --wallet-idx INTEGER  index of address in wallet
  --skip-confirmation   skip the confirmation prompt
  --help                Show this message and exit.
```

#### Additional Option Info

| **Command_Options** | **Required** | **Format** | **Comments** |
| --- | --- |---| -- |
| --wallet-idx | *Yes* | INTEGER | The index ID of the address to be removed. [0 ...] |
| --skip-confirmation | *No* | | Remove the address without prompting for user confirmation |

#### Example Command

```bash
qrl wallet_rm --wallet-idx 4
```

#### Example Response

```
You are about to remove address [4]: Q010600ac45b5f965e942cd696a2b9b1d32a2714b756d49cd41ef733b11b23a8dc8281bf91bc4c2 from the wallet.
Warning! By continuing, you risk complete loss of access to this address if you do not have a recovery Mnemonic/Hexseed.
Do you want to continue? [y/N]: y


Wallet at          : /home/fr1t2/.qrl
Number  Address                                                                            Balance      
-----------------------------------------------------------------------------------------------------
0       Q01050022d047cc489e9a118e8b2ea45ca0259785586602799486dd8d6844fe2a5855fed1066c50    0.00000000   
1       Q01050069392d18b5f8757f1fcf1c61854aef9c3818c47fa4e28b1ce23fa89042de24d7e12a1940    0.00000000   
2       Q010500e52f42fa130eb56c8001d53fc0ade392fca95b8dc976f4200fc993142be4a73284b655e2    0.00000000   
3       Q010500f08f5159307edb6e948d7ccccf287ff5012feef9f07844c8d867697d8ebd7fe52bc1fcca    0.00000000 
```

### wallet_secret

Gives the secret keys via mnemonic and hexseed for a given wallet.json index id. This index starts at 0, and counts up for each address in the wallet.json file. You can see the index with the [`wallet_ls`](#wallet_ls) command.

:::warning Contains Secret Keys 
This command outputs the secret keys for the address. Anyone with these keys can send transactions from this address.
:::

#### Help

```
Usage: qrl wallet_secret [OPTIONS]

  Provides the mnemonic/hexseed of the given address index

Options:
  --wallet-idx INTEGER
  --help                Show this message and exit.
```

#### Example Command

```bash
qrl wallet_secret --wallet-idx 0
```

#### Example Response

```bash
Wallet Address  : Q01050022d047cc489e9a118e8b2ea45ca0259785586602799486dd8d6844fe2a5855fed1066c50
Mnemonic        : absorb filled sack pig final fuss legacy shelf sonic silk rush tenth tour razor basic kami hood spend shire dagger fewer recipe export jolly twin hut car nicely ago pepper grief adapt lousy visual
Hexseed         : 010500bcca375065977c8c5bcfac86bc4e18e80b181247616b7d1ac633644f2b284b074aecd6d6241955046a1c61602682bf45

```
