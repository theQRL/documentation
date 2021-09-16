---
id: node-cli
title: Node CLI
hide_title: false
hide_table_of_contents: false
sidebar_label: Node CLI
sidebar_position: 4
pagination_label: Node CLI
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: Node CLI
keywords:
  - docs
  - node
  - advanced
image: /assets/img/icons/yellow.png

---


The QRL CLI allows users and developers the ability to interact with the QRL network for fundamental chain operations. This allows users to create new wallet files, transfer quanta, and create tokens.

In order to use the cli the main QRL software must be installed. It is not necessary to use sync the node to use the cli, however you will need the address and port of a publicly available node.

:::info
To use a remote QRL node, enter the address and port before the command: 

` qrl --host mainnet-1.automated.theqrl.org --port_pub 19009 state`
:::



## CLI Help

All command line options hav a help file available to assist in the use of the command. Simply add the `--help` option to the end of any command to see the help.

```
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

Commands:b
  slave_tx_generate    Generates Slave Transaction for the wallet
  state                Shows Information about a Node\'s State
  token_list           Fetch the list of tokens owned by an address.
  tx_inspect           Inspected a transaction blob
  tx_message           Message Transaction
  tx_multi_sig_create  Creates Multi Sig Create Transaction, that results...
  tx_multi_sig_spend   Transfer coins from src to dsts
  tx_push              Sends a signed transaction blob to a node
  tx_token             Create Token Transaction, that results into the...
  tx_transfer          Transfer coins from src to dsts
  tx_transfertoken     Create Transfer Token Transaction, which moves
                       tokens...

  wallet_add           Adds an address or generates a new wallet (working...
  wallet_decrypt
  wallet_encrypt
  wallet_gen           Generates a new wallet with one address
  wallet_ls            Lists available wallets
  wallet_recover       Recovers a wallet from a hexseed or mnemonic (32...
  wallet_rm            Removes an address from the wallet using the given...
  wallet_secret        Provides the mnemonic/hexseed of the given address...
```

You can browse even further into sub commands like:

```
qrl tx_transfer --help

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

These options allow advanced functionality and must be entered before the command. 

```
  -v, --verbose       verbose output whenever possible
  --host TEXT         remote host address             [127.0.0.1]
  --port_pub INTEGER  remote port number (public api) [19009]
  --wallet_dir TEXT   local wallet dir
  --json              output in json
  --version           Show the version and exit.
  --help              Show this message and exit.
```


## Commands

Brief explanation of each command with the additional help text.


### slave_tx_generate

Slave transaction allow an extension to the master address, allowing an entirely new OTS tree to be used for sending transactions as a proxy to the master address. Requires a QRL wallet file in the same directory as the command being entered, or by using the `--wallet_dir`  option.



:::tip Additional Info
See the [Slave Tree Documentation](#) for complete explanation of deterministic OTS key trees and how QRL has extend the life of an XMSS address to an almost infinite amount of OTS keys.
:::

> NEED TO ADD REFERENCE TO THE SLAVE DOCUMENTATION ^^^

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

:::info 
Treat this file just like the `wallet.json` file as it has authority to send transactions from the master address.
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
#### Example Command
#### Example Response

### tx_inspect

#### `tx_inspect` Help

```
Usage: qrl tx_inspect [OPTIONS]

  Inspected a transaction blob

Options:
  --txblob TEXT  transaction blob
  --help         Show this message and exit.
```
#### Example Command
#### Example Response

### tx_message

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

#### Help
#### Example Command
#### Example Response

### tx_multi_sig_spend

#### Help
#### Example Command
#### Example Response


### tx_push

#### Help
#### Example Command
#### Example Response


### tx_token

#### Help
#### Example Command
#### Example Response


### tx_transfer

#### Help
#### Example Command
#### Example Response


### tx_transfertoken

#### Help
#### Example Command
#### Example Response

### wallet_add

#### Help
#### Example Command
#### Example Response

### wallet_decrypt

#### Help
#### Example Command
#### Example Response


### wallet_encrypt

Encrypt a plaintext wallet file already created using password given. This will output an AES encrypted wallet.json file, overwriting the old file.

#### Help
#### Example Command
#### Example Response


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

#### Help
#### Example Command
#### Example Response

### wallet_recover

#### Help
#### Example Command
#### Example Response

### wallet_rm

#### Help
#### Example Command
#### Example Response

### wallet_secret


#### Help
#### Example Command
#### Example Response