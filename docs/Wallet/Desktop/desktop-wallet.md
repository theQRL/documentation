---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: desktop-wallet
title: QRL Desktop Wallet
hide_title: false
hide_table_of_contents: false
sidebar_label: Desktop Wallet
sidebar_position: 1
pagination_label: QRL Desktop Wallet
custom_edit_url: https://github.com/theQRL/documentation/edit/main/docs/Wallet/qrl-wallet.md
description: Desktop Wallet
keywords:
  - docs
  - wallet
  - Desktop
image: /assets/img/icons/yellow.png
slug: /wallet/desktop
---


:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>


### NEEDED

- add sources and more detail in how the xmss tree is generated on the local hardware
- add links to download wallets and to the documentation for each listed below
    - Desktop Wallet
    - Web Wallet
    - Ledger Nano S
    - Offline Wallet Generator
:::


The QRL Desktop wallet provides users the ability to create new QRL wallets, open existing wallets from private keys or wallet files. This is the main interaction point for most users to the QRL blockchain.

The security and privacy of the generated cryptographic keys is paramount to any cryptocurrency where you are in charge of ownership and custodial duties. The private keys generated are the only way to access the funds contained in the wallet, and as such anyone with them can access the funds.


## Wallet Options


The QRL offers multiple options for users to create new addresses, and each has been evaluated and developed to ensure under most scenarios users security. That said it is ultimately up to the user to ensure the security and protection of their funds. 


The desktop wallet will generate the keys completely offline and on local hardware. the wallet will connect to the network for some functions like chain lookup functions, sending transactions to the network and for gathering the current converted price.

You can disconnect the computer from the network and still generate a perfectly valid QRL address offline, save the keys somewhere safe and close the wallet.

