---
id: wallet-json
title: QRL Address Wallet.json File
hide_title: false
hide_table_of_contents: false
sidebar_label: Wallet.json File
sidebar_position: 2
pagination_label: Wallet.json File
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Build/Address/wallet-json.md
description: QRL Address Wallet.json File Documentation
keywords:
  - docs
  - advanced
  - Address File
image: /assets/img/icons/yellow.png
slug: /build/address/wallet-json
---

A wallet.json file is an amalgamation of all of the various wallet information that makes a QRL address. This file contains every bit of information for an address including the full seed (_pk_), hexseed, mnemonic phrase, public address, as well as various information on how the address was generated.


:::warning Never share this file or it's contents!
The wallet.json file should be stored encrypted, and should never be shared. It allows full access to any funds contained in the wallet address.
::: 

:::note Example wallet.json file
Below is an example of the wallet.json file contents stored insecurely without encryption for ease of viewing here.


```json
[
  { 
    "address":"Q000400202ea4dc2b83ded8cfcd4fc8c0447ca3391582430cec6b093291ab9773173af1bb5ed7e8",
    "addressB32":"q1qqzqqgpw5nwzhq77mr8u6n7gcpz8egeezkpyxr8vdvyn9ydtjae3wwh38u0m5v",
    "pk":"000400422e85d434d8d3054ed6eb32dab4f77b4c5919f96b44701b91bb538eaa3e5e83a1b5b893ab335ae9ce04ac483a8ed53cb0d82c70ae9971fe93eeea6ea0ccf819",
    "hexseed":"000400dbf4ead7e3eec1155b6ea44b7181c94cb7cadee49969eb798fdea34ad5c3c01b64b4661dfbeb51f76609a0c182eb7a47",
    "mnemonic":"aback drank swap fence strait donor script form imply eerie invade brave fan legend tape evil higher ride mortar tricky expect gentry scare retire remark gritty wolves repeal weary gray peak blew tsar pipe",
    "height":8,
    "hashFunction":{},
    "signatureType":{},
    "index":0,
    "walletType":"seed",
    "encrypted":false
  }
]
```
:::

A wallet.json file can be uploaded to the wallet software encrypted or unsecured, and will allow the wallet software to re-generate the full Merkle tree for the given address. This will allow full interaction with the blockchain and access to all funds contained in the wallet.

:::info
The recommendation is to never store a plaintext wallet file. Use the tools included with the QRL wallet software to encrypt the file and store that encryption password somewhere safe!
:::