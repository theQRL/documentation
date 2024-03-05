---
id: ledger-wallet-overview
title: Ledger Wallet Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Overveiw
sidebar_position: 1
pagination_label: Ledger Wallet - Overveiw
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Wallet/Ledger/ledger-wallet.md
description: The QRL Ledger wallet overview
keywords:
  - docs
  - wallet
  - ledger
image: /assets/img/icons/yellow.png
slug: /use/wallet/ledger/overview
---

import ImageSwitcher from '@site/src/components/UseColorMode.js';
import KeyspaceSmall from './assets/keyspace-small.png';
import KeyspaceSmallDark from './assets/keyspace-small-dark.png';
import Keyspace2 from './assets/keyspace2.png';
import Keyspace2Dark from './assets/keyspace2-dark.png';


Hardware wallets are considered one of the most secure methods to safely store cryptocurrency. These devices allow a physical barrier to a wallet's private keys by storing them offline.

To send a transaction, a hardware wallet requires some physical action to authorize any spend. By providing this barrier, a users funds are secured from computer viruses and attackers attempts to remotely steal funds.

:::note Ledger QRL Hardware Support

The Ledger Nano S device was sunset June 2022 and replaced it with the [Ledger Nano S Plus](https://shop.ledger.com/products/ledger-nano-s-plus). 

See official notification from Ledger: https://support.ledger.com/hc/en-us/articles/5615862066717-Ledger-Nano-S-Sunset-FAQ?support=true

Additionally there is a confirmed issue with the latest Ledger QRL app (V1.1.4) published by Ledger. Using the latest version causes the device to freeze up when sending a transaction. The last supported version of the QRL Ledger app is 1.1.3.

It is recommended that you migrate from the unsupported device. [Follow the guide here for more information on migration options for ledger nano S users.](/use/wallet/ledger/known-issues#qrl-app-v114-on-nano-s)

:::



**QRL Ledger Features:**

* Support for Ledger [Nano S Plus](https://shop.ledger.com/products/ledger-nano-s-plus) and [Nano X](https://shop.ledger.com/pages/ledger-nano-x) devices
* Multi-Tree dual QRL address support allowing $2$ addresses with $256$ OTS each
* [Plausible Deniability](https://support.ledger.com/hc/en-us/articles/115005214529-Advanced-passphrase-security) allowing multiple address spaces with advanced passphrase security


## Multi-Tree Support

The QRL Ledger application supports multiple Addresses, or XMSS Merkle Trees, to be stored on a single device. There are memory limitations on the small hardware devices limiting how large the hash tree can be.

<div style={{textAlign: 'center'}}>
  <ImageSwitcher 
    lightImageSrc={KeyspaceSmall}
    darkImageSrc={KeyspaceSmallDark}
  />
</div>

This function allows a the initialization of two ($2$) XMSS trees, or QRL addresses, on a Ledger device. Each tree is limited still to $256$ OTS keys, however now you can sign up to $512$ combined transactions between the $2$ addresses.

:::info See the Multi-tree Documentation 
<span >
  <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--12 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/ledger/new">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="New QRL Ledger Wallet">
                    QRL Multi-Tree Initialization 
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Ledger wallet initialization">
                    Instructions and documentation covering the multi-tree QRL address setup on the Ledger devices
                </p>
            </a>
        </article>
    </section>
</span>
:::






## Plausible Deniability

One of the most exciting features the QRL Ledger application supports is the ability to create a secondary profile with it's own address space. 

<div style={{textAlign: 'center'}}>
  <ImageSwitcher 
    lightImageSrc={Keyspace2}
    darkImageSrc={Keyspace2Dark}
  />
</div>

This function provides *Plausible Deniability* where a small amount of $quanta$ can be stored in one address space while the remaining balance is secured behind an additional passphrase in another address space.

This secures a users funds from any physical attacks by allowing the smaller balance to be given up while never allowing the attacker access to the second address space and remaining funds.


:::info See the Plausible Deniability Documentation 
<span >
  <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--12 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet/ledger/plausible-deniability">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Ledger Plausible Deniability Setup">
                    Ledger Plausible Deniability Setup 
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Ledger Plausible Deniability Setup">
                    Instructions and documentation covering setup of the Plausible Deniability address space on the Ledger devices
                </p>
            </a>
        </article>
    </section>
</span>
:::



## Ledger Nano Quirks

Being Quantum Resistant comes with some inherent challenges. Before using the QRL Ledger Nano app for your wallet, there are a few quirks worth noting about QRL. 


### Private Keys

The Ledger will not print your *QRL* private key. This is stored on the Ledgers secure element, and the basis of what makes this device so secure. 

You will be presented with a private key to restore your Ledger device during the initial setup. Any application secrets will be tied to this private key, and it is required to restore your wallet if ever needed.

:::warning Save recovery keys
If you forget or lose your ledger private keys, any funds will be lost!
:::

Store your Ledger Device seed (mnemonic) somewhere safe, in an encrypted manner if possible (Recommended you have this information stored in multiple physical locations)

:::info
The Plausible Deniability function adds an additional self-set mnemonic word that must be stored as well. This additional word can be up to 100 characters max and is case sensitive. 
:::


### OTS Key Index


Each Ledger address has a limited amount of One Time Keys (*OTS*) for sending transactions due to the memory limitations on the hardware wallet. Each address has $256$ keys available.

:::caution OTS Keys are Limited
The OTS key index is limited. You can only use each key ONCE, the address will be locked when all OTS Keys are consumed.
:::


The [QRL Web Wallet](https://wallet.theqrl.org/) will provide ample warnings you are running low on OTS Keys (<=50) to ensure you have plenty of time to move your coins to a new address. It is up to you to move them, however!

### OTS Key Tracking

It's recommended that you track all OTS Keys used in a spreadsheet or similar media. The Nano will keep track of your OTS keys for you, however if you ever lose the device and need to reinstall on a new Ledger Nano you will need to know which OTS keys have been consumed. 

Once you have restored your wallet on a new Ledger, manually set the XMSS OTS key index inside the [QRL Web Wallet](https://wallet.theqrl.org/) tools section. See below to [Manually Set XMSS Index](#manually-set-xmss-index)  

:::note It is best to track all OTS key usage elsewhere to ensure you never reuse the same OTS key.
:::

### Tokens and Messages

Currently the QRL Ledger Nano app does not support the creation and sending of QR Tokens on the QRL Network. Only native Quanta (QRL) transfers and Message Transaction types and derivatives of are currently supported. 