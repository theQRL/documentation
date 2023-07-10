---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: offline-wallet-overview
title: QRL Offline Wallet Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Overveiw
sidebar_position: 1
pagination_label: Offline Wallet - Overview
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Offline Wallet documentation
keywords:
  - docs
  - Offline Wallet
image: /assets/img/icons/yellow.png
slug: /use/wallet/offline/overview
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


The QRL Offline Wallet Generator allows a user to create a completely offline, air-gapped QRL wallet.

This provides additional security while vulnerable functions of address creation are exposed.



:::info Offline Wallet Latest Download

<span>
  <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--12 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="https://github.com/theQRL/offline-wallet-generator/releases/latest">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Desktop Wallet Download">
                    QRL Offline Wallet Download
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL desktop wallet files">
                    Latest QRL Offline wallet files hosted on Github.com
                </p>
            </a>
        </article>
    </section>
</span>
:::


## Verify Integrity

Use these instructions to verify the integrity of the downloaded files.

This ensures nothing has changed since the developers created them using cryptography to verify the file contents are intact.


<details>
  <summary>Verify integrity Instructions</summary>
  <p>

- Obtain security@theqrl.org public PGP key from keyservers or [Github](https://raw.githubusercontent.com/theQRL/security/master/security.theqrl.org.gpg.asc)
- Download the PGP signed shasum file from this release from the [QRL security repo](https://github.com/theQRL/security/tree/master/offline-wallet-generator)
- Check the PGP signature of the shasum hashes file:
```
gpg --verify shasum.256.pgp.asc
```
- This should display _gpg: Good signature from "Security team <security@theqrl.org>"_
- From downloaded qrl-offline-wallet.zip, check the shasum of the index of shasums:
```
shasum shasum.256.asc
```
- This should match the shasum shown in the PGP signed message verified above
- Finally, check the shasum of the offline-wallet files:
```
shasum --check shasum.256.pgp.asc
```
- All files should be _OK_


</p>
</details>


## Quick Start Guide

Use this guide to get up and running quickly. 



<details>
  <summary>Quick Use Guide</summary>
  <p>

1. Download the latest **qrl-offline-wallet.zip** [release](https://github.com/theQRL/offline-wallet-generator/releases/latest)
2. Unarchive the files on your PC

**Either**:

3. Open offline.html in a modern browser (one which [supports webassembly](https://caniuse.com/#feat=wasm))

**or**:

3. Run a local web server pointing to the index.html file, eg:

```bash
#in a command prompt

npm i -g http-server
http-server offline-wallet-generator/
```

**then**:

4. Generate a wallet with the required settings (see [the QRL Address Options ](/use/wallet/overview#qrl-address-options))
5. Save JSON/print/save PDF and print later

> No internet connection required after files are downloaded


a
</p>
</details>



It is recommended that the files are verified and that the network connection is disconnected before generating a new address with the Offline Wallet Generator.
