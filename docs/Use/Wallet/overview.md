---
docstatus: 30%  # one of {DRAFT, 30%, 90%, COMPLETE}
id: wallet-overview
title: QRL Wallet Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Overview
sidebar_position: 1
pagination_label: Overview
custom_edit_url: https://github.com/theQRL/documentation/edit/main/docs/Wallet/qrl-wallet.md
description: General Info covering the various official QRL wallets and their usage.
keywords:
  - docs
  - wallet
image: /assets/img/icons/yellow.png
slug: /use/wallet/overview
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs review!</span>
:::


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


The Quantum Resistant Ledger's wallet functions similar to other cryptocurrencies in which there are both public and private keys that represent an address. Where the QRL wallet differs from most, and where the post quantum security derives, is the signature scheme used.

The QRL uses [eXtended Merkle Signature Scheme *(XMSS)*](https://eprint.iacr.org/2011/484), a hash based cryptography that's been around since the 70's and recently [approved for use in cryptographic systems by NIST](https://csrc.nist.gov/publications/detail/sp/800-208/final). 

XMSS is considered to be one of the most secure quantum resistant algorithms in use today. There is one drawback to hash based cryptography however, a signature key may only be used one time.

:::info **OTS** *(One Time Signature Keys)*
OTS keys can only be used to sign one transaction. There are limited keys for an address depending on tree height selected during address creation. 
See the [OTS Documentation](ots-keys) for more information. 
:::

## QRL Wallet Applications

All of the wallets listed here are supported by the project and all can send quanta, the base currency of the Quantum Resistant Ledger. Some may provide advanced functionality and access to additional features.

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


<span>
  <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--12 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/web/overview">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Web Wallet">
                    QRL Web Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL web wallet overview, guides and instructions for getting started">
                    QRL web wallet overview, guides and instructions for getting started.
                </p>
            </a>
        </article>
        <article class="col col--6 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/web/new">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Create a new QRL Web Wallet">
                    New Web Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Create a new QRL wallet using the Web interface">
                    Create a new QRL wallet using the Web interface
                </p>
            </a>
        </article>
        <article class="col col--6 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/web/open">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Open Web Wallet">
                    Open Web Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Open a QRL wallet using the Web interface">
                    Open a QRL wallet using the Web interface
                </p>
            </a>
        </article>
        <article class="col col--6 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/web/send">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Send Web Wallet">
                    Send Web Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Send Quanta using the Web interface">
                    Send Quanta using the Web interface
                </p>
            </a>
        </article>
        <article class="col col--6 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/web/backup">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Backup Web Wallet">
                    Backup Web Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Backup a QRL Web Wallet">
                    Backup a QRL wallet using the Web interface
                </p>
            </a>
        </article>
        <br />
    </section>
</span>



- Built securely using [Meteor](https://www.meteor.com/), [Semantic UI](https://semantic-ui.com/), [NodeJS](https://nodejs.org/en/) and [Electron](https://electronjs.org/)
- All secure XMSS operations are run in a web assembly compiled version of [qrllib](https://github.com/theQRL/qrllib) locally in your browser
- Keys stay in the memory space of the XMSS object, which is destroyed the moment you close the wallet, browser window
- Code is all open source, [3rd party audited](https://github.com/theQRL/audits) and can be found at https://github.com/theqrl/

</TabItem>

<TabItem value="desktop" label="Desktop Wallet">

#### QRL Desktop Wallet

The QRL Desktop Wallet allows a local installation of the QRL Wallet on most modern computers.

<span>
  <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--12 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/desktop/overview">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Desktop Wallet">
                    QRL Desktop Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL desktop wallet overview, guides and instructions for getting started">
                    QRL desktop wallet overview, guides and instructions for getting started.
                </p>
            </a>
        </article>
        <article class="col col--6 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/desktop/new">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Create a new QRL Desktop Wallet">
                    New Desktop Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Create a new QRL wallet using the Desktop interface">
                    Create a new QRL wallet using the Desktop interface
                </p>
            </a>
        </article>
        <article class="col col--6 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/desktop/install">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Create a new QRL Desktop Wallet">
                    Install Desktop Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Install the QRL wallet application">
                    Install the QRL wallet application
                </p>
            </a>
        </article>
        <article class="col col--4 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/desktop/open">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Open Desktop Wallet">
                    Open Desktop Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Open a QRL wallet using the Desktop interface">
                    Open a QRL wallet using the Desktop interface
                </p>
            </a>
        </article>
        <article class="col col--4 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/desktop/send">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Send Desktop Wallet">
                    Send Desktop Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Send Quanta using the Desktop interface">
                    Send Quanta using the Desktop interface
                </p>
            </a>
        </article>
        <article class="col col--4 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/desktop/backup">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Backup Desktop Wallet">
                    Backup Desktop Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Backup a QRL Desktop Wallet">
                    Backup a QRL wallet using the Desktop interface
                </p>
            </a>
        </article>
        <br />
    </section>
</span>



- Built securely using [Meteor](https://www.meteor.com/), [Semantic UI](https://semantic-ui.com/), [NodeJS](https://nodejs.org/en/) and [Electron](https://electronjs.org/)
- All secure XMSS operations are run in a web assembly compiled version of [qrllib](https://github.com/theQRL/qrllib) locally in your browser
- Keys stay in the memory space of the XMSS object, which is destroyed the moment you close the wallet, browser window
- Code is all open source, [3rd party audited](https://github.com/theQRL/audits) and can be found at https://github.com/theqrl/


</TabItem>

<TabItem value="mobile" label="Mobile Wallet">

#### QRL Mobile Wallet

THe QRL mobile wallet is available on both iOS and Android. Search in the application stores or the links below.

<span>
  <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--12 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/mobile/overview">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Mobile Wallet">
                    QRL Mobile Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL mobile wallet overview, guides and instructions for getting started">
                    QRL mobile wallet overview, guides and instructions for getting started.
                </p>
            </a>
        </article>
        <article class="col col--6 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/mobile/new">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Create a new QRL Mobile Wallet">
                    New Mobile Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Create a new QRL wallet using the Mobile interface">
                    Create a new QRL wallet using the Mobile interface
                </p>
            </a>
        </article>
        <article class="col col--6 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/mobile/install">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Create a new QRL Mobile Wallet">
                    Install Mobile Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Install the QRL wallet application">
                    Install the QRL wallet application
                </p>
            </a>
        </article>
        <article class="col col--4 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/mobile/open">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Open Mobile Wallet">
                    Open Mobile Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Open a QRL wallet using the Mobile interface">
                    Open a QRL wallet using the Mobile interface
                </p>
            </a>
        </article>
        <article class="col col--4 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/mobile/send">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Send Mobile Wallet">
                    Send Mobile Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Send Quanta using the Mobile interface">
                    Send Quanta using the Mobile interface
                </p>
            </a>
        </article>
        <article class="col col--4 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/mobile/backup">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Backup Mobile Wallet">
                    Backup Mobile Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Backup a QRL Mobile Wallet">
                    Backup a QRL wallet using the Mobile interface
                </p>
            </a>
        </article>
        <br />
    </section>
</span>

> FIXME!! Need addresses and images for iOS and Android apps ^^^

</TabItem>
<TabItem value="ledger" label="Ledger Wallet">

#### QRL Ledger Wallet

The Ledger wallet is considered one of the most secure methods to store cryptocurrency. QRL supports wallet creation and hardware wallet function using the ledger nano. 


<span>
  <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--12 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/ledger/overview">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Ledger Wallet">
                    QRL Ledger Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL ledger wallet overview, guides and instructions for getting started">
                    QRL ledger wallet overview, guides and instructions for getting started.
                </p>
            </a>
        </article>
        <article class="col col--6 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/ledger/new">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Create a new QRL Ledger Wallet">
                    New Ledger Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Create a new QRL wallet using the Ledger interface">
                    Create a new QRL wallet using the Ledger interface
                </p>
            </a>
        </article>
        <article class="col col--6 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/ledger/recover">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Recover a QRL Ledger Wallet">
                    Recover Ledger Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Recover the QRL wallet application">
                    Recover a QRL Ledger wallet
                </p>
            </a>
        </article>
        <article class="col col--4 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/ledger/open">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Open Ledger Wallet">
                    Open Ledger Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Open a QRL wallet using the Ledger interface">
                    Open a QRL wallet using the Ledger interface
                </p>
            </a>
        </article>
        <article class="col col--4 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/ledger/send">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Send Ledger Wallet">
                    Send Ledger Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Send Quanta using the Ledger interface">
                    Send Quanta using the Ledger interface
                </p>
            </a>
        </article>
        <article class="col col--4 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/ledger/backup">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Backup Ledger Wallet">
                    Backup Ledger Wallet
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Backup a QRL Ledger Wallet">
                    Backup a QRL wallet using the Ledger interface
                </p>
            </a>
        </article>
        <br />
    </section>
</span>


:::note Extendable Ledger Addresses
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