---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: web-wallet-new
title: QRL Web Wallet - New
hide_title: false
hide_table_of_contents: false
sidebar_label: New 
sidebar_position: 2
pagination_label: Web Wallet - New
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: Create a new address using the online web wallet.
keywords:
  - docs
  - New Wallet
image: /assets/img/icons/yellow.png
slug: /use/wallet/web/new
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::

From the main QRL web wallet menu, select new wallet to begin.

Enter a strong password into the password field. The password must be at least 8 characters in length, and must contain at least 1 number and 1 letter


#### Tree Height

This option allows you to create a wallet with varying tree size. In other words this controls the amount of signatures your wallet can use for transactions safely on the blockchain. 

By default an XMSS Tree height of 10 provides 1024 One Time Signatures. You may chose to create a wallet with more or less OTS keys used to sign transactions on the QRL network. The only disadvantage for creating a larger tree height is the time required to generate the additional keys. This can be configured only when a wallet is created.


|  Tree Height | Available Keys | Notes |
|:---------: | :----------: | :--- |
| 8  | 256 | Allows 256 transactions to be **sent** from the address |
| 10 |  1,024 | Allows 1024 transactions to be **sent** from the address | 
| 12 |  4,096 | Allows 4,096 transactions to be **sent** from the address |
| 14 |  16,384 | Allows 16,384 transactions to be **sent** from the address |
| 16 |  65,536 | Allows 65,536 transactions to be **sent** from the address |
| 18 |  262,144 | Allows 262,144 transactions to be **sent** from the address |


> If needed you can create an additional advanced `slaves.json` file with up to 100 slave OTS keys allowing for additional TX's using the same QRL address. For more information please see the [Slave Keys docs](/build/address/slave-keys)


#### Hash Function

QRL can utilize multiple hash functions, depending on the setting used during the creation of the wallet.

> By default the wallet will utilize the shake128 hash function if no configuration options are given. 

| Hash Function | Hash Algorithm | Description |
|:-----|:-----|:---------|
| shake128 | [SHA-3](https://en.wikipedia.org/wiki/SHA-3) | Default used in the web wallet |
| sha2_256 | [SHA-2](https://en.wikipedia.org/wiki/SHA-2) |  |
| shake256 | [SHA-3](https://en.wikipedia.org/wiki/SHA-3) |  |



> Which hash function is better to use is debatable, and they all have pros and cons. Most importantly the default can be changed if there is later a vulnerability found in the core cryptography of the hash function.
{: .info}


#### Create Wallet


After you have made your selections and entered a secure password, click the create wallet button and a new wallet will be generated. This will produce a sensitive screen once the address is created. 



This screen prints your public QRL address, your Mnemonic Phrase, and Hexseed directly to your screen. Write these down somewhere safe, they will recover your wallet.

> **Important:** Record Your Private Keys! Do Not Lose Them!
{: .warning}

It's recommended to Save a Secure, encrypted wallet.json file. You will need your password to unlock this file anytime it is loaded into the wallet **Don't Forget This Password!**

Welcome to the Quantum Resistance! 