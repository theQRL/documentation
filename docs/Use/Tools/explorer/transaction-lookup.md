---
id: transaction-lookup
title: QRL Explorer Transaction Lookup
hide_title: false
hide_table_of_contents: false
sidebar_label: Transaction Lookup
sidebar_position: 3
pagination_label: Transaction Lookup
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Tools/explorer/transaction-lookup.md
description: QRL Explorer Transaction Lookup
keywords:
  - docs
  - tools
  - Explorer
  - Transaction Lookup
image: /assets/img/icons/yellow.png
slug: /use/tools/explorer/transaction-lookup
---

A transaction can be looked up by providing the transaction hash to the [QRL Explorer](https://explorer.theqrl.org) search bar, or clicking on the *txhash* in a block or address lookup.

This lookup gives detailed information on the transaction and will vary depending on the type of transaction. 


:::info
A transaction hash is a hexadecimal string that is unique to that transaction. Example txhash -  *269f1f53a87dcaa87aa27ca6abf945109abf5d11cf28a6e3f9dae6bc73a2e606*

For a detailed list of transaction types and their usage see the [developer documentation](/api/qrl-public-api#transaction)
:::

At the top of the transaction search screen is a list of general information related to the transaction that was queried.

**Confirmations**
: Example -*2579730 confirmations* - Number of blocks that have been confirmed since the transaction was minted

**Block**
: Example -*15* - Block number from the transaction

**Nonce**
: Example -*16* - Nonce the transaction used

**OTS Key**
: Example -*12* - The One Time Signature Key used from sending address

**Fee**
: Example -*0.0005 Quanta* - Amount of $Quanta$ that was used to submit transaction

**Size**
: Example -*19 Bytes* - Size of the transaction in the block

**Status**
: Example -*OK* - Status of the sent transaction

**Time**
: Example -*6:16 26 Jun 2018* - Time the transaction was sent and minted onto the chain

## Transaction Information

Detailed transaction information is shown below for the transaction that was queried. This includes the type of transaction, sending QRL address, receiving QRL address and amount sent for a typical transfer.

The Large amount sent will also show a value in USD underneath, this is the current estimated value of the amount of QRL transferred, not the historical value at the time of transfer. 

Additional information is shown in the meta tab, this is the detailed information that has been simplified and presented in the page above. Most of the time there is no need to view this data, however there is no sensitive information contained within.


