---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: notarization-overview
title: QRL Notarisation Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Overveiw
sidebar_position: 1
pagination_label: Notarisation - Overview
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Notarisation
keywords:
  - docs
  - tools
  - Notarisation
image: /assets/img/icons/yellow.png
slug: /use/tools/notarise/overview
---


:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


Authenticating a document, or for that matter, any data is possible on the Quantum Resistant Ledger. Notarization is the method of certifying the validity of a data through a verification process secured by strong cryptography. 


Using the [QRL Wallet Tools](#) featured in the [Desktop and Web wallet](/use/wallet), anyone can notarize data and verifiable prove it has not been tampered with. 

:::info Advanced users
There are multiple ways to access the notarization process through the [QRL API](/api) and [Command Line Tools](/build/node-cli) using the `message_tx` with appropriate [message encoding](/build/messages/message-tx-encoding).
:::

## Overview

QRL's notarization system uses additional quantum resistant, XMSS Hash based signatures to add validation to the SHA-256 hash of the data being notarized. 

Using the wallet interface is the simplest way to get started with document notarization. This process allows a user to notarize a file and submit the resulting data onto the blockchain. 

Once notarized, any exact copy of that document can be cryptographically verified on-chain. This allows all sort of functionality and  














Under the hood the notarization system utilizes [QRL message](/use/tools/messages) with some [clever encoding](/build/messages/message-tx-encoding) added to beginning of the file data encoded into a message. By signing the file signature onto the QRL's blockchain, the verifiable file data is immutably saved on-chain.

In it's simplest form the notarization message is a [SHA-256 hash](https://en.wikipedia.org/wiki/SHA-2) of the document data with the additional `AFAFA2` hex encoding appended to the front of the file data.

:::tip QRL Notarization Structure
| Encoding | SHA256_SUM *(example)*|
| --- | --- |
| AFAFA2 | 74ef874a9fa69a86e091ea6dc2668047d7e102d518bebed19f8a3958f664e3da |
:::

This data is send in a message is then sent to the blockchain utilizing the address provided, signing and submitting with quantum resistant xMSS keys to ensure that the validity of the original document can be forever verified for authenticity.

To verify the integrity of the document, you simply pass it through the same hashing algorithm and verify the hash matches the one you have signed using your quantum resistant secure private keys.


:::info
It is important to point out that this does NOT load the file to the blockchain, only a cryptographic representation (Hash) of the data in the file. An original copy of the file will be needed to verify the notarization.
:::caution

