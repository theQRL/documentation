---
id: offline-wallet-install
title: QRL Offline Wallet - Install
hide_title: false
hide_table_of_contents: false
sidebar_label: Install
sidebar_position: 2
pagination_label: Offline Wallet - Install
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Wallet/Offline/install-offline-wallet.md
description: QRL Offline Wallet - Install
keywords:
  - docs
  - Offline Wallet
image: /assets/img/icons/yellow.png
slug: /use/wallet/offline/install
---


The Offline QRL Wallet is not installed like other programs are typically and will work agnostic to the operating system you are running. As long as the browser used to access the files is modern and supports [WebAssembly](https://webassembly.org/)


## Quick Start Guide

Use this guide to get up and running quickly. 

1. Download the latest [**qrl-offline-wallet.zip** release](https://github.com/theQRL/offline-wallet-generator/releases/latest)
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

**Then**:

4. [Generate an Offline Wallet](/use/wallet/offline/new) with the required settings (see [the QRL Address Options ](/use/wallet/overview#qrl-address-options)) for more on these settings
5. Save JSON/print/save PDF and print later

:::info 
No internet connection required after files are downloaded and verified.
:::
