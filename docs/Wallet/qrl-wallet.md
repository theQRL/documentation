---
docstatus: 30%  # one of {DRAFT, 30%, 90%, COMPLETE}
id: qrl-wallet
title: QRL Wallet
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL wallet
sidebar_position: 1
pagination_label: QRL wallet
custom_edit_url: https://github.com/theQRL/documentation/edit/main/docs/Wallet/qrl-wallet.md
description: QRL wallet
keywords:
  - docs
  - wallet
image: /assets/img/icons/yellow.png
slug: /wallet
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs review!</span>
:::


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

import thumbnail from './assets/img/desktop/desktopWallet.png';

The Quantum Resistant Ledger's wallet functions similar to other cryptocurrencies in which there are both public and private keys that represent an address. Where the QRL wallet differs from most, and where the post quantum security derives, is the signature scheme used.

The QRL uses [eXtended Merkle Signature Scheme *(XMSS)*](https://eprint.iacr.org/2011/484), a hash based cryptography that's been around since the 70's and recently [approved for use in cryptographic systems by NIST](https://csrc.nist.gov/publications/detail/sp/800-208/final). 

XMSS is considered to be one of the most secure quantum resistant algorithms in use today. There is one drawback to hash based cryptography however, a signature key may only be used one time.

:::info **OTS** *(One Time Signature Keys)*
OTS keys can only be used to sign one transaction. There are limited keys for an address depending on tree height selected during address creation. 
See the [OTS Documentation](ots-keys) for more information. 
:::

## QRL Wallet Applications

The QRL Foundation provides a multitude of wallet applications including support for the Ledger Nano through the desktop application.

All of the wallets listed here are supported by the project and all can send quanta, the base currency of the Quantum Resistant Ledger. Some may provide advanced functionality and access to new features.

---

<Tabs
    defaultValue="web"
    className="unique-tabs"
    groupId="wallets"
    values={[
        {label: 'Web Wallet', value: 'web'},
        {label: 'Desktop Wallet', value: 'desktop'},
        {label: 'Mobile Wallet', value: 'mobile'},
        {label: 'Ledger Wallet', value: 'ledger'},
    ]}>


<TabItem value="web" label="Web Wallet" default>


#### QRL Web Wallet

This is the QRL Web wallet developed by The QRL team, hosted at [https://wallet.theqrl.org](https://wallet.theqrl.org).

:::note Web Wallet Docs
Check out the [Web Wallet documentation](wallet/web) for detailed usage and more information.
:::


- Built securely using [Meteor](https://www.meteor.com/), [Semantic UI](https://semantic-ui.com/), [NodeJS](https://nodejs.org/en/) and [Electron](https://electronjs.org/)
- All secure XMSS operations are run in a web assembly compiled version of [qrllib](https://github.com/theQRL/qrllib) locally in your browser
- Keys stay in the memory space of the XMSS object, which is destroyed the moment you close the wallet, browser window
- Code is all open source, [3rd party audited](https://github.com/theQRL/audits) and can be found at https://github.com/theqrl/

[<Image img={require('./assets/img/web/webWalletOpenSend.png')} quality="85"/>](https://wallet.theqrl.org)

</TabItem>

<TabItem value="desktop" label="Desktop Wallet">

#### QRL Desktop Wallet

This is the QRL Desktop wallet application developed by The QRL team, identical to the web wallet in most ways and developed to run on most modern operating systems.

:::note Desktop Wallet Docs
Check out the [Desktop Wallet documentation](wallet/desktop) for detailed usage and more information.

:::


- Built securely using [Meteor](https://www.meteor.com/), [Semantic UI](https://semantic-ui.com/), [NodeJS](https://nodejs.org/en/) and [Electron](https://electronjs.org/)
- All secure XMSS operations are run in a web assembly compiled version of [qrllib](https://github.com/theQRL/qrllib) locally in your browser
- Keys stay in the memory space of the XMSS object, which is destroyed the moment you close the wallet, browser window
- Code is all open source, [3rd party audited](https://github.com/theQRL/audits) and can be found at https://github.com/theqrl/


[<Image img={require('./assets/img/desktop/desktopWallet.png')} quality="85"/>](https://github.com/theQRL/qrl-wallet/releases/latest)

:::note 
Click on the image above to go to the downloads or grab them from the main [QRL Website](https://theqrl.org/downloads/).
:::

</TabItem>

<TabItem value="mobile" label="Mobile Wallet">

#### QRL Mobile Wallet

THe QRL mobile wallet is available on both iOS and Android. Search in the application stores or the links below.

:::note Desktop Wallet Docs
Find the [QRL Mobile Wallet documentation here](wallet/mobile) for detailed usage and more information.
:::

[<Image img={require('./Mobile/assets/android1.webp')} quality="85"/>](https://itunes.apple.com/us/app/qrl-wallet/id1458620542?ls=1&mt=8)

> FIXME!! Need addresses and images for iOS and Android apps ^^^

</TabItem>
<TabItem value="ledger" label="Ledger Wallet">

#### QRL Ledger Wallet

The QRL Ledger wallet is considered one of the most secure methods to store QRL. 

Hardware storage requires user interaction for any on-chain functions and signs all transactions on device, never exposing the secret keys. The QRL Ledger integration provides 2 QRL address trees that can vbe used to stack QRL. 

[<Image img={require('./assets/img/ledger/QRL-ledger.png')} quality="85"/>](https://shop.ledger.com/products/ledger-nano-s)

:::note Desktop Wallet Docs
There is an additional address space that can be unlocked to extend the amount of addresses one can generate on device. See these and more details about the [Ledger QRL wallet in the documentation here](wallet/ledger).
:::

</TabItem>
</Tabs>



## QRL Wallet Security

All QRL wallets are made up of a cryptographic key pair, or *public* and *private* keys, from which the Merkle tree of One Time Signature keys are generated. These OTS keys are then used to sign user transactions, never exposing the root secret "private" key. 


:::caution 
Correctly recording and securing recovery keys is the most important thing a user needs to do before interacting with the QRL network.
:::

### Public Keys

At the base of the wallet is the QRL address. The public key starts with a `Q` and consists of $79$ hexadecimal characters. The Public address represents an account, and is what would be given to receive funds into the address.

Public keys are safe to share with trusted parties you will be transacting with. Use this to request funds from another user or to deposit funds yourself. 

#### Example QRL Public Address

```
Q010500cf8971ae2f24cecc4296a23c24277bd107dbbc630bc0799dca65f9c25449d781148b7a85
```

### Private Keys

The private keys can be represented in either a hexseed, a mnemonic phrase, or a `wallet.json` file containing both. Any can be used to restore a wallet and best practice should be followed to ensure the security of these keys.

- A private key is required to interact with the QRL blockchain
- Private keys are used to sign transactions
- No two private keys are the same
- Anyone with this key can send transactions on behalf of the address.
- Ensure any recovery keys open the address expected prior to using the address 

:::danger Never Share Private Wallet Keys
Any of the private keys above will be able to recover an address and access all funds associated with that address.
These keys should **NEVER** be shared! 

It is up to the end user to ensure that any encryption phrase, and all secret keys are stored in a secure location. Any loss of funds will be at the owners fault if these keys are lost, compromised, or copied incorrectly. Verify that any backup method re-opens the same address as expected **before** depositing any funds into the address!
:::

Private keys can not be recovered or regenerated if lost. Without them, any funds in the address will not be recoverable. Backup address keys and store them in a safe locations.

#### Typical QRL Private Key Format

Public and private keys can be stored in a multitude of ways and are typically utilized through a wallet application.

| Private Key Medium | Information |
| --- | --- |
|[`wallet.json` file](developers/address/wallet-json) |  <ul><li>Contains both Hexphrase and Mnemonic as well as the Public Key</li><li>May be encrypted *(recommended)* and passphrase will be required to open</li><li>Generated from the [Desktop](wallet/desktop), [Web](wallet/web) and [CLI](Build/wallet/cli/node-cli-wallet) wallet applications</li></ul> |
| [Mnemonic Phrase](developers/address/mnemonic)  | <ul><li>Wordlist consisting of 34 selected words from the [master QRL wordlist](https://github.com/theQRL/qrllib/blob/master/src/qrl/wordlist.cpp)</li><li>Available using backup functions of the wallet applications</li> <li>Provided during most address generation steps</li></ul> |
| [Hexphrase](developers/address/hexphrase) | <ul><li>Available using backup functions of the wallet applications</li><li>Hexstring consisting of 102 mixed alpha numeric characters</li><li>Provided during most address generation processes, or found in a "Backup Wallet" function</li></ul> |
| [Ledger Hardware](/wallet/ledger) | <ul><li>Ledger manages QRL private keys on device, never exposing them to the end user</li><li>Master Ledger Recovery Seed is required to recover a QRL address stored on a Ledger device</li></ul> |
| [Slave Keys](developers/address/slave-keys) | <ul><li>Advanced address functionality. CLI tools are required to generate slave Keys</li><li>Generated slaves files are typically named `slaves.json` or `payment_slaves.json`</li><li>Slave keys are additional secret key(s) that are allowed to spend for a given master address</li></ul> |

:::danger Never Share Private Wallet Keys
These keys should never be shared! Anyone can transfer funds using a secret key. 
:::

#### Example QRL Mnemonic

This list of 34 works represents the same key as the hexseed, with each word corresponding to an index location in the [QRL wordlist](https://github.com/theQRL/qrllib/blob/master/src/qrl/wordlist.cpp). This list is converted into binary/hexadecimal representation of the private keys.

```
absorb filled elder lake swing behind thirst ink easter lucy sinful viola judge flint sample bleak ransom supply very liquid silky tensor wild panel clue croft aroma duress nail gender milk myself devoid toward
```
#### Example QRL Hexseed

```
010500457794dcc149e3570243d837c90f3b75252abeb17fb08db6f267fdc88e16fa29e72cc33a0b04259305bb8c692c3bde81
```
:::info
For more information on QRL's cryptography see the [Address Scheme](developers/address/qrl-address-scheme), [QRL Cryptography Overview](developers/cryptography/qrl-cryptography) documentation, as well as the [QRL Whitepaper (PDF)](https://github.com/theQRL/Whitepaper/raw/f1b0f61b7cf61195fa9489aeaf1a2e05643c12ec/QRL_whitepaper.pdf)
:::