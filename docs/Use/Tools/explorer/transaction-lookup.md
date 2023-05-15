---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: transaction-lookup
title: QRL Explorer Transaction Lookup
hide_title: false
hide_table_of_contents: false
sidebar_label: Transaction Lookup
sidebar_position: 3
pagination_label: Transaction Lookup
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Explorer Transaction Lookup
keywords:
  - docs
  - tools
  - Explorer
  - Transaction Lookup
image: /assets/img/icons/yellow.png
slug: /use/tools/explorer/transaction-lookup
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>

**Needed**
- Link to transaction types
:::


A transaction can be looked up by providing the transaction hash to the [QRL Explorer](https://explorer.theqrl.org) search bar, or clicking on the *txhash* in a block or address lookup.

This lookup gives detailed information on the transaction and will vary depending on the type of transaction. 


:::info
A transaction hash is a hexadecimal string that is unique to that transaction. Example txhash -  *269f1f53a87dcaa87aa27ca6abf945109abf5d11cf28a6e3f9dae6bc73a2e606*

For a detailed list of transaction types and their usage see the [developer documentation](#)
:::

At the top of the transaction search screen is a list of general information related to the transaction that was queried.

- **Confirmations** - Example -*2579730 confirmations* - Number of blocks that have been confirmed since the transaction was minted
- **Block** - Example -*15* - Block number from the transaction
- **Nonce** - Example -*16* - Nonce the transaction used
- **OTS Key** - Example -*12* - The One Time Signature Key used from sending address
- **Fee** - Example -*0.0005 Quanta* - Amount of $Quanta$ that was used to submit transaction
- **Size**  - Example -*19 Bytes* - Size of the transaction in the block
- **Status** - Example -*OK* - Status of the sent transaction
- **Time**  - Example -*6:16 26 Jun 2018* - Time the transaction was sent and minted onto the chain

## Transaction Information

Below the general information detailed transaction information is shown.