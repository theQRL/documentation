---
id: notarize-qrl-cli
title: QRL Tutorials - Notarize QRL-CLI
hide_title: false
hide_table_of_contents: true
sidebar_label: QRL Tutorials - Notarize qrl-cli
sidebar_position: 2
pagination_label: QRL Tutorials - Notarize qrl-cli
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Tutorials/notarize-qrl-cli.md
description: Tutorials covering QRL focused tasks, building new tools, connecting advanced topics.
keywords:
  - docs
  - tutorials
image: /assets/img/icons/yellow.png
slug: /tutorials/notarize-qrl-cli
---

Recently a project came up that required additional security for users downloading a publicly hosted file. Utilizing the [Quantum Resistant Ledger's](https://theqrl.org) Notarization system seemed like a logical choice. *__Post quantum secure cryptography__* and a simple user interface!

The notarization system is simple and very straightforward to use. Additionally there are some advantages to using a system like this as opposed to some of the commercially available solutions, none which seemed to solve this issue in full. 


- It allows a file of any size to be notarized on the blockchain
- There are both front end tools and command line tools available
- The notarization will never expire or fail to verify, being part of the blockchain
- These notarization's are considered post quantum secure, using hash based cryptography


While not exactly a true notarization, as there is no trusted party involved to witness the transaction and verify my identity, for my purposes it is secure enough.

## Project Overview

The entire goal here is to ensure authenticity of a file to ensure that the file has not been tampered with nor corrupted during the download process.

To perform this security check I've implemented a typical checksum system where the original file is verified immediately following its creation using **sha256**. This part is simple and very common, with software like `openssl` and common tools found on \*nix systems like `sha256sum` to gather the file hashes. 

These hashes are serve alongside the file and also available for download. 

```bash
~$ sha256sum myfile.tar.gz
~$ e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 myfile.tar.gz
```

We will add an additional layer to this function by notarizing the file as well, forever validating the checksum has not been tampered with, secured by post quantum cryptography!

## Building Blocks

Notarization is simple and relies on a few requirements and foundations. 

1. The entire notarization system is based on the security provided by the `sha256sum` of the file.
2. The [`qrl-cli`](/use/node/node-cli/overview) is used for the notarization function. This utility provides simple interfacing with the QRL system allowing the hash to be passed through bash scripting.
3. A QRL Address is required with available OTS keys. We'll use the `qrl-cli` again to generate a new address.

## Scripting

Step by step process for notarizing a file on the chain through a bash script.

### Generate a new QRL Address

Using the `qrl-cli` to generate a new QRL address. Ensure there are enough OTS keys to send transactions for an extended period of time if you intend to make this process automated. As seen in the [OTS Key - Tree Height](/build/fundamentals/ots-keys#tree-height) documentation the address height can be quite large. 

For this example I have decided to settle on **Tree Height: 14** which allows **16,384** notarization transactions before running out of *One Time Signature keys* and need to re-generate a new address. 

I'm planing to send a tx every 6 hours, or 4 times a day: $16,384 \div 4=4096$ notarization transactions or over 11 years.

> More information on OTS keys can be found in the [OTS documentation](/build/fundamentals/ots-keys).

```bash
qrl-cli create-wallet -f wallet.json -h 14
```
This creates the wallet in the same directory the command was issued. Change to suit your needs.

### Hash File 

The next step requires a sha256 hash from the file to notarize. Any file type works of any size. The larger the file the longer it will take to generate the hash. *(Faster processors and additional RAM may help speed up this process.)*

Gather the `sha256sum` of the file. In this example I have named my file `myfile.tar.gz`

```bash
sha256sum myfile.tar.gz
```

This returns the `sha256` hash of the file:

```bash
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 myfile.tar.gz
```

### Gather Next Unused OTS Key

We need to provide an unused OTS key index to the `qrl-cli notarize` function. In order to gather this programmatically for our automated needs we will use the `qrl-cli` again.

Gather the next OTS key:

```bash
qrl-cli ots Q000700406ddf66834a15159d8d2600a9c2866159f721b7040d6da442171b6eda316bea879808ee -j -t
```

- The address is passed here, though the `wallet.json` file could have been used as well.
- `-j` here outputs the OS key response in JSON allowing easy parsing later.
- `-t` gathers the OTS keys from the **Testnet** network. For production remove or change to `-m` for mainnet.

### Send Notarization TX

Using the QRL wallet, the file hash, and next available OTS key we send the notarization transaction through the `qrl-cli` with the `notarize` function. 

```bash
qrl-cli notarize e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 -M -w wallet.json -i 0 -j -t
```

- The `sha256sum` is passed directly after the `notarize` command
- `-w` denotes the wallet used to sign and send the transaction with
- `-i` is the next unused OTS key index
- `-j` outputs the transaction ID as JSON
- `-t` sends the transaction on the **Testnet** network. For production remove or change to `-m` for mainnet.

## Bash One-liner

```bash
SHASUM=$(sha256sum myfile.tar.gz | awk '{print $1}') && OTS=$(qrl-cli ots ~/wallet.json -j -t |jq .[0].next_key) && qrl-cli notarize $SHASUM -i $OTS -w ~/wallet.json -t
```

> Requires the `qrl-cli` installed as well as `jq`

## Bash Script

Wrapping this all together into a bash script.

```bash
#!/bin/bash

# Collect File Hash, and notarize using the address specified.

QRL_WALLET=~/wallet.json
DOCUMENT=~/myfile.tar.gz

# Check for wallet and if not found generate a new one
if [[ ! -f $QRL_WALLET ]]; then
  echo "["`date -u`"] Wallet not found! Generating New Address at $QRL_WALLET"
  qrl-cli create-wallet -f $QRL_WALLET -h 14 # generate qrl address using the qrl-cli, tree height 14
  wallet_success=$? # Did that work?
  echo "["`date`"] create-wallet exit code: $wallet_success"
  if [[ "$wallet_success" = "1" ]]; then
    echo "["`date`"] ERROR: generate-wallet failure!"
    exit 1
  fi
fi

# Gather QRL Address into variable
QRL_ADDRESS=$(cat $QRL_WALLET |jq .[0].address | tr -d '"')
echo "["`date -u`"] Using address $QRL_ADDRESS"

# Get the next available OTS key from the address
OTS_KEY=$(qrl-cli ots $QRL_ADDRESS -t -j -t |grep next_key |jq .[0].next_key)
echo "["`date -u`"] Next available OTS Key: $OTS_KEY"

# Hash the file
SHASUM=$(sha256sum $DOCUMENT | awk '{print $1}')
echo "["`date -u`"] $DOCUMENT SHA256sum: $SHASUM"

# Send notarization
NOTARIZE=$(qrl-cli notarize $SHASUM -w $QRL_WALLET -i $OTS_KEY -j -t )
echo "["`date -u`"] Notarization response: $NOTARIZE"

# Return the TX_ID for lookup and verification.
TXID=$(echo $NOTARIZE |jq .[0].tx_id | tr -d '"')
echo "["`date -u`"] Validate notarization was successful: https://testnet-explorer.theqrl.org/tx/$TXID"
```

#### Response

```
[Mon Mar 14 23:13:00 UTC 2022] Using address Q0209000237c285fee4938fb71539aab3eddb16a2949ba1ef97f410f9742cabeef762db30ddd180
[Mon Mar 14 23:13:03 UTC 2022] Next available OTS Key: 0
[Mon Mar 14 23:13:03 UTC 2022] /home/fr1t2/myfile.tar.gz SHA256sum: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
✔ notarization: AFAFA2e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
✔ final notarization hex: AFAFA2e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
✔ xmssPK returned...
✔ Transaction signed with OTS key 0. (nodes will reject this transaction if key reuse is detected)
✔ Transaction submitted to Testnet node: transaction ID: 23729db492beda1055ea86e40f621a10f867bb7ccdfb6f0a8c669cf300c53705
✔ https://testnet-explorer.theqrl.org/tx/23729db492beda1055ea86e40f621a10f867bb7ccdfb6f0a8c669cf300c53705
[Mon Mar 14 23:29:57 UTC 2022] Notarization response: [{"tx_id":"23729db492beda1055ea86e40f621a10f867bb7ccdfb6f0a8c669cf300c53705"}]
[Mon Mar 14 23:29:57 UTC 2022] Validate notarization was successful: https://testnet-explorer.theqrl.org/tx/23729db492beda1055ea86e40f621a10f867bb7ccdfb6f0a8c669cf300c53705
```