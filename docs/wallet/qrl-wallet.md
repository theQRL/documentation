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


:::info One Time Signature Keys *(OTS)*
OTS keys can only be used to sign one transaction. There are limited keys for an address depending on tree height. See the [OTS Documentation](ots-keys) for more information. 
:::

## QRL Wallet Applications

<Tabs
    defaultValue="web"
    className="unique-tabs"
    groupId="wallets"
    values={[
        {label: 'Web Wallet', value: 'web'},
        {label: 'Desktop Wallet', value: 'desktop'},
        {label: 'Mobile Wallet', value: 'mobile'},
        {label: 'Ledger Wallet', value: 'ledger'},
        {label: 'CLI Wallet', value: 'cli'},
    ]}>


<TabItem value="web" label="Web Wallet" default>

#### QRL Web Wallet

The QRL Web wallet is found at [https://wallet.theqrl.org](https://wallet.theqrl.org).

:::tip Web Wallet Docs
Check out the [Web Wallet documentation](docs/web/web-wallet)
:::

![QRL Web Wallet Open](/assets/img/docs/wallet/web/webWalletOpenSend.png)

</TabItem>

<TabItem value="desktop" label="Desktop Wallet">

#### QRL Desktop Wallet

Download the desktop wallet from the main [QRL Website](https://theqrl.org/downloads/) for most operating systems including MacOS and Linux.

</TabItem>

<TabItem value="mobile" label="Mobile Wallet">

#### QRL Mobile Wallet

THe QRL mobile wallet is available on both iOS and Android. Search in the application stores or the links below.

> FIXME!! Need addresses and images for iOS and Android apps ^^^

</TabItem>
<TabItem value="ledger" label="Ledger Wallet">

#### QRL Mobile Wallet

THe QRL mobile wallet is available on both iOS and Android. Search in the application stores or the links below.

> FIXME!! Need addresses and images for iOS and Android apps ^^^

</TabItem>


<TabItem value="cli" label="CLI Wallet">

#### QRL CLI Wallet

THe QRL CLI wallet is available through the QRL Node installation. 

> FIXME!! ^^^

</TabItem>
</Tabs>

## QRL Wallet Keys

A QRL wallet is made up of a key pair, from which the Merkle tree of OTS keys are generated. These OTS keys are used to sign transactions, never exposing the root secret private key. 

These public and private keys can be stored in a wallet file, mnemonic, or hex-phrase and are utilized through a wallet application. 

### Public Keys

At the base of the wallet is the QRL address. The public key starts with a `Q` and consists of 79 hexadecimal characters.

The Public address represents the account and is what would be given to receive funds into the account.

#### Example QRL Public Address

`Q010500cf8971ae2f24cecc4296a23c24277bd107dbbc630bc0799dca65f9c25449d781148b7a85`

### Private Keys

A private key is required to interact with the QRL blockchain. This key is used to sign a transaction, verifying it originated using this key.Anyone with this key can send transactions on behalf of the address.

The private keys can be represented in either a hexseed or a mnemonic phrase. Either can be used to restore a wallet and best practice should be followed to ensure the security of these keys.


:::danger Never Share Private Wallet Keys
These keys should never be shared! Anyone can transfer funds using a secret key. 
:::

Private keys can not be recovered or regenerated if lost. Without them, any funds in the address will not be recoverable. Backup address keys and store in safe locations.

#### Example QRL Mnemonic

This list of 34 works represents the same key as the hexseed, with each word corresponding to an index location in the [QRL wordlist](https://github.com/theQRL/qrllib/blob/master/src/qrl/wordlist.cpp). This list is converted into binary/hexadecimal representation of the private keys.

`absorb filled elder lake swing behind thirst ink easter lucy sinful viola judge flint sample bleak ransom supply very liquid silky tensor wild panel clue croft aroma duress nail gender milk myself devoid toward`

#### Example QRL Hexseed

`010500457794dcc149e3570243d837c90f3b75252abeb17fb08db6f267fdc88e16fa29e72cc33a0b04259305bb8c692c3bde81`



