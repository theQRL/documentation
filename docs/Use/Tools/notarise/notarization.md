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


Authenticating a document, or for that matter, any data is possible on the Quantum Resistant Ledger!

Notarization is the method of certifying the validity of a document.Using the tools featured in the Desktop and Web wallet, or problematically through the QRL-CLI this is made simple.

## Overview

The system utilizes the [QRL message functionality](tools/messages) with some [clever encoding](developers/message-tx-encoding) added to mark the message for lookup and display. 

In it's simplest form the notarization message is a [`sha-256sum`](https://en.wikipedia.org/wiki/SHA-2) of the document data with the additional `AFAFA2` hex encoding appended to the front of the hex sum.

:::tip QRL Notarization Structure
| Encoding | SHA256_SUM *(example)*|
| --- | --- |
| AFAFA2 | 74ef874a9fa69a86e091ea6dc2668047d7e102d518bebed19f8a3958f664e3da |
:::

This message is then sent to the blockchain utilizing the address provided, signing and submitting with quantum resistant xMSS keys to ensure that the validity of the original document can be forever verified for authenticity.

To verify the integrity of the document, you simply pass it through the same hashing algorithm and verify the hash matches the one you have signed using your quantum resistant secure private keys.


:::info
It is important to point out that this does NOT load the file to the blockchain, only a cryptographic representation (Hash) of the data in the file. An original copy of the file will be needed to verify the notarization.
:::caution

