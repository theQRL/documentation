---
id: web-wallet-open
title: QRL Web Wallet - Open Wallet
hide_title: false
hide_table_of_contents: false
sidebar_label: Open 
sidebar_position: 4
pagination_label: Web Wallet - Open
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Wallet/Web/open-wallet.md
description: Open QRL address using the web wallet.
keywords:
  - docs
  - Web Wallet
  - backup address
image: /assets/img/icons/yellow.png
slug: /use/wallet/web/open
---


In order to interact with a QRL wallet, it must be opened using the private keys that were created during the [wallet creation](/use/wallet/web/new) process.

Browse to the QRL Web wallet at https://wallet.theqrl.org to get started opening a wallet.

## Private Keys

There are a few ways that the private keys for an address are represented. Any of these recovery methods will suffice to open a QRL address.

| Recovery Key Medium | Information |
| --- | --- |
| [Mnemonic Phrase](/build/address/mnemonic)  | <ul><li>Wordlist consisting of 34 selected words from the [master QRL wordlist](https://github.com/theQRL/qrllib/blob/master/src/qrl/wordlist.cpp)</li><li>Available using backup functions of the wallet applications</li> <li>Provided during most address generation steps</li></ul> |
| [Hexphrase](/build/address/hexphrase) | <ul><li>Available using backup functions of the wallet applications</li><li>Hexseed consisting of 102 mixed alpha numeric characters</li><li>Provided during most address generation processes, or found in a "Backup Wallet" function</li></ul> |
| [`wallet.json` file](/build/address/wallet-json) |  <ul><li>Contains both Hexseed and Mnemonic as well as the Public Key</li><li>May be encrypted *(recommended)* and passphrase will be required to open</li><li>Generated from the [Desktop](/use/wallet/desktop/overview), [Web](/use/wallet/web/overview) and [CLI](/use/node/node-cli/overview) wallet applications</li></ul> |


:::warning Test your backups!
These keys allow full access to the address and all funds and assets that are held in that address. Ensure you secure them in an appropriate manner to protect the security of the funds.
:::


## Open QRL Wallet

By using one of the recovery methods mentioned above, you can access your wallet to send or receive QRL. Using a web browser to access https://wallet.theqrl.org select the **OPEN** tab on the left side of the page.

Using the drop down on the left you can toggle between a `wallet.json` file, Mnemonic Phrase and Hexseed.

### Using Wallet.json file

Select the wallet.json file stored locally on your computer and if applicable enter the encryption passphrase into the second field.

Click "Unlock Wallet" and your QRL wallet will open allowing you to check balances and interact with the QRL network. 

### Using Mnemonic

With the wallet web page open, and the Open Wallet tab selected drop down the form field and select *Mnemonic Phrase*

Enter the address Mnemonic phrase into the form and select "Unlock Wallet" and your QRL wallet will open.

### Using Hexseed


With the wallet web page open, and the Open Wallet tab selected drop down the form field and select *Hexseed*

Enter the address hexseed into the form and select "Unlock Wallet" and your QRL wallet will open.
