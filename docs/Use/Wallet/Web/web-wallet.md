---
id: web-wallet-overview
title: QRL Web Wallet
hide_title: false
hide_table_of_contents: false
sidebar_label: Overview
sidebar_position: 1
pagination_label: Web Wallet - Overview
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Wallet/Web/web-wallet.md
description: QRL web wallet overview.
keywords:
  - docs
  - Web Wallet
image: /assets/img/icons/yellow.png
slug: /use/wallet/web/overview
---


The easiest way to interact with a QRL wallet is through the online wallet found here: [https://wallet.theqrl.org](https://wallet.theqrl.org) allowing users to create new addresses, open and transact with the network and access on-chain tools. 

:::note
All secure XMSS operations are run in a web assembly compiled version of *qrllib* locally in your browser or desktop application. 

Private keys stay in the memory space of the XMSS object, which is destroyed the moment you close the wallet browser window.

:::

## General Info

Being Quantum Resistant comes with some inherent challenges. Before creating your new wallet, there are a few quirks worth noting about QRL. 

* The QRL uses hash based cryptography, and due to this requires a new signature for each transaction.
* One Time Signature Key indexes (*OTS Keys*) must never be used more than 1 time. 
* Once all OTS Key indexes are consumed the address will no longer be able to send outbound transactions


### Best Wallet Practices 

* Track all OTS Key indexes used in a spreadsheet *(ledger)* or paper file
* Backup the wallet onto paper or other physical media 
* Store your private keys somewhere safe offline

 
### OTS Key Index

When you create a new wallet you create an XMSS tree, which is comprised of many signatures to make a signature scheme. Every signature is referenced as your OTS index or [One Time Signature](/build/fundamentals/ots-keys) key index. 

**The OTS key index is limited.** 

You can only use each key index **ONCE**. When you've used your last key index, you will no longer be able to sign transactions. This can not be stressed enough! 

:::caution
If you use all of your OTS Key Indexes with funds in the wallet, these funds will be **lost FOREVER**!
:::

## QRL Web Wallet

Follow the links below to get started with the QRL Web wallet.




<span>
  <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
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


### Checking a Wallet Balance

With the wallet opened you can see the balance in the main screen of the web wallet. You can also check your wallet balance without opening the wallet by browsing to the [QRL Explorer](https://explorer.theqrl.org) and entering your address into the search field.


You will see all of the transactions the address has as well as the balance of quanta and any tokens held by the wallet.

### Find Remaining OTS Keys

If you need to find the remaining OTS keys for an address, you can see them in the OTS tab in the [Block Explorer](https://explorer.theqrl.org). Search for your address in the search bar and select the OTS tab to see the used OTS keys and find the next available.

