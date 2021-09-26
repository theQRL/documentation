---
id: qrl-wallet
title: QRL Wallet
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL wallet
sidebar_position: 1
pagination_label: QRL wallet
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL wallet
keywords:
  - docs
  - wallet
image: /assets/img/icons/yellow.png
slug: /wallet
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


The Quantum Resistant Ledger's wallet functions similar to other cryptocurrencies in which there are both public and private keys that represent an address. 

Where the QRL wallet differs from most, and where the post quantum aspects come together is in the signature scheme used. The QRL uses [eXtended Merkle Signature Scheme *(XMSS)*](https://eprint.iacr.org/2011/484). 

XMSS is a hash based cryptography that's been around since the 70's and  recently has been [approved for use in cryptographic systems by NIST](https://csrc.nist.gov/publications/detail/sp/800-208/final). XMSS is considered to be one of the most secure quantum resistant algorithms in use today.


:::info One Time Signature Keys
OTS keys can only be used to sign one transaction. There are limited keys for an address depending on tree height. See the [OTS Documentation](ots-keys) for more. 
:::

## QRL Wallet Applications

<Tabs
    defaultValue="ubuntu"
    values={[
        {label: 'Ubuntu', value: 'ubuntu'},
    ]}>

<TabItem value="ubuntu">


</TabItem>


## Cryptographic Keys

A QRL wallet is made up of a key pair, from which the Merkle tree of OTS keys are generated. These OTS keys are used to sign transactions, never exposing the root secret private key. 

These public and private keys can be stored in a wallet file, mnemonic, or hex-phrase and are utilized through a wallet application. 

### Public Keys

At the base of the wallet is the QRL address. The public key starts with a `Q` and consists of 79 hexadecimal characters.

The Public address represents the account and is what would be given to receive funds into the account.

#### Example QRL Public Address

`Q010500cf8971ae2f24cecc4296a23c24277bd107dbbc630bc0799dca65f9c25449d781148b7a85`

### Private Keys

A private key is required to interact with the QRL blockchain, signing a transaction verifying it only originated using this key linked to the public address.

The private keys can be represented in either a hexseed or a mnemonic phrase. Either can be used to restore a wallet and best practice should be followed to ensure the security of these keys.


:::danger Never Share Private Wallet Keys
These keys should never be shared! Anyone can transfer funds using a secret key. 
:::

Private keys can not be recovered or regenerated if lost. Without them, any funds in the address will not be recoverable. Backup address keys and store in safe locations.

#### Example QRL Mnemonic

`absorb filled elder lake swing behind thirst ink easter lucy sinful viola judge flint sample bleak ransom supply very liquid silky tensor wild panel clue croft aroma duress nail gender milk myself devoid toward`

### Example QRL Hexseed

`010500457794dcc149e3570243d837c90f3b75252abeb17fb08db6f267fdc88e16fa29e72cc33a0b04259305bb8c692c3bde81`






makeup the foundational security 

Being Quantum Resistant comes with some inherent challenges. 



Before creating your new wallet, there are a few quirks worth noting about QRL.