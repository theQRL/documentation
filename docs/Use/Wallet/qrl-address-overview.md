---
id: qrl-address-overview
title: QRL Address Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Address Overview
sidebar_position: 2
pagination_label: Address Overview
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Wallet/qrl-address-overview.md
description: QRL Address overview covering public and private keys.
keywords:
  - docs
  - wallet
  - basics
image: /assets/img/icons/yellow.png
slug: /use/wallet/qrl-address-overview
---

The QRL address is a fundamental building block of the ecosystem. The **public address** is responsible for representing a users wallet in a publicly sharable identity without fear of the funds being vulnerable. 

The corresponding **private key** is the piece responsible for interaction on-chain and allows access to any funds stored in the public address.

Addresses, or key pairs, are generated using one of the QRL wallets, and once generated cannot be changed or altered. This Public Private key pair will represent a wallet, the public key is meant to be shared while the private key is never to be shared. 

## Public Address

The public address allows users the ability to view funds and gives other parties a unique identifier to send funds to. This public key is paired with it's corresponding private key in a cryptographically secured manner.

:::note A typical public key, or wallet address address is represented as follows:
_Q000400202ea4dc2b83ded8cfcd4fc8c0447ca3391582430cec6b093291ab9773173af1bb5ed7e8_
:::

This long, 79 character hexadecimal string prefixed with the letter $Q$ is unique to the private key it is derived from. No other public address will be the same.

It is considered safe to share the public key insomuch that the funds contained in the address are not accessible using only this information. There may still be other risks from sharing the public key as the balance is available to be viewed on the blockchain explorer. 
This may pose a personal security risk, similar to sharing the amount of funds contained in a bank account. Use discretion when sharing this information online or in public forums.

:::info 
For more information on how the public address is structured and what the bytes represent, see the [Address Scheme](/build/addresses) documentation
:::

##  Private Keys

The QRL public address is paired to a private key, which is represented in a few different ways, each are valid to access the wallet and are used to transact with the blockchain.

A secure source of entropy is used to generate a private key, or seed, which is passed through a secure [_Pseudo-Random Function_ (PRF)](https://crypto.stanford.edu/pbc/notes/crypto/prf.html) to generate a set of pseudo-random keys which generate the Merkle tree consisting of many [OTS keys](/build/fundamentals/ots-keys)

The wallet software will re-generate this tree each time an address is opened, giving access to each of the OTS keys available to the given address for signing transactions on-chain. 

A user will likely never see the full Merkle tree as it is unnecessary for any user functions. This is also why an address with a larger tree height takes longer to open as the tree is larger which take more computations to work through the PRF.

:::caution
Any of the private keys will allow a user full access to the wallet and are considered secret. Ensure that at least one of these private keys are stored in a secure location as they are __required__ for access to any funds contained in the address.
::: 

### Mnemonic Phrase

A mnemonic phrase is a list of words that cryptographically represent the seed when compared to a given word list and passed through an algorithm. 

This makes a user friendly way to represent the hexseed and is less error prone than a hexseed.

:::note Example mnemonic phrase
_aback drank swap fence strait donor script form imply eerie invade brave fan legend tape evil higher ride mortar tricky expect gentry scare retire remark gritty wolves repeal weary gray peak blew tsar pipe_
:::

This phrase can be entered into the wallet software and will allow full access to the funds contained in the address.

### Hexseed

The hexseed is another way to represent the seed used to regenerate the full Merkle tree.

This seed is given in a hexadecimal string consisting of numbers and letters, and when passed through the PRF will generate the same Merkle tree as the mnemonic phrase.

:::info Example hexseed
_000400dbf4ead7e3eec1155b6ea44b7181c94cb7cadee49969eb798fdea34ad5c3c01b64b4661dfbeb51f76609a0c182eb7a47_
:::

This hexseed can be entered into the wallet software and will allow full access to the funds contained in the address.

### Wallet.Json File

A wallet.json file is an amalgamation of all of the wallet information. This file contains every bit of information for an address including the full seed (_pk_), hexseed, mnemonic phrase, public address, as well as various information on how the address was generated.

:::caution Never share this file!
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

A wallet.json file can be uploaded to the wallet software encrypted or unsecured, and will allow the wallet software to re-generate the full Merkle tree for the given address. This will allow full interaction with the blockchain and access to all funds contained in the wallet.

