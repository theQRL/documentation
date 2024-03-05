---
id: desktop-wallet-new
title: New QRL Desktop Wallet
hide_title: false
hide_table_of_contents: false
sidebar_label: New
sidebar_position: 3
pagination_label: Desktop Wallet - New
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Wallet/Desktop/create-a-new-wallet.md
description: Create a New QRL Wallet using the QRL Desktop Application
keywords:
  - docs
  - wallet
  - Desktop
  - Create New
image: /assets/img/icons/yellow.png
slug: /use/wallet/desktop/new
---

Creating a new QRL address is simple and straightforward. Open the QRL Desktop wallet software to begin.


1. From the main QRL desktop wallet menu, select the "**New Wallet**" tab to begin. 
2. Enter a strong password into the password field.

:::caution Backup and verify the address recovery media
Ensure that you can access the QRL address using your backup media before sending any funds into the address.
:::

## Optional Wallet Configuration

There are a few optional configuration properties that may be useful. The defaults settings are usually acceptable for most users.

### Tree Height

This option allows you to create a wallet with varying tree size. In other words this controls the amount of signatures your wallet can use for transactions safely on the blockchain. 

By default an XMSS Tree height of 10 provides 1024 One Time Signatures. You may chose to create a wallet with more or less OTS keys used to sign transactions on the QRL network. 

The only disadvantage for creating a larger tree height is the time required to generate the additional keys. 

This can be configured only when a wallet is created.


|  Tree Height | Available Keys | Notes |
|:---------: | :----------: | :--- |
| 8  | 256 | Allows 256 transactions to be **sent** from the address |
| 10 |  1,024 | Allows 1024 transactions to be **sent** from the address | 
| 12 |  4,096 | Allows 4,096 transactions to be **sent** from the address |
| 14 |  16,384 | Allows 16,384 transactions to be **sent** from the address |
| 16 |  65,536 | Allows 65,536 transactions to be **sent** from the address |
| 18 |  262,144 | Allows 262,144 transactions to be **sent** from the address |


> If needed you can create an additional advanced `slaves.json` file with up to 100 slave OTS keys allowing for additional TX's using the same QRL address. For more information please see the [Slave Keys docs](/build/address/slave-keys)


### Hash Function

QRL can utilize multiple hash functions, depending on the setting used during the creation of the wallet.

> By default the wallet will utilize the shake128 hash function if no configuration options are given. 

| Hash Function | Hash Algorithm | Description |
|:-----|:-----|:---------|
| shake128 | [SHA-3](https://en.wikipedia.org/wiki/SHA-3) | Default used in the desktop wallet |
| sha2_256 | [SHA-2](https://en.wikipedia.org/wiki/SHA-2) |  |
| shake256 | [SHA-3](https://en.wikipedia.org/wiki/SHA-3) |  |


:::tip
All of these hash functions are considered to be secure, and the default is perfectly acceptable to use
:::


#### Create Wallet


After you have made your selections and entered a secure password, click the create wallet button and a new wallet will be generated. This will produce a sensitive screen once the address is created. 



This screen prints your public QRL address, your Mnemonic Phrase, and Hexseed directly to your screen. Write these down somewhere safe, they will recover your wallet.

> **Important:** Record Your Private Keys! Do Not Lose Them!
{: .warning}

It's recommended to Save a Secure, encrypted wallet.json file. You will need your password to unlock this file anytime it is loaded into the wallet **Don't Forget This Password!**

Welcome to the Quantum Resistance! 