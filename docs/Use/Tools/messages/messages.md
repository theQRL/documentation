---
docstatus: 30%  # one of {DRAFT, 30%, 90%, COMPLETE}
id: messages
title: QRL Message Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Overview
sidebar_position: 1
pagination_label: Message Overview 
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Messages overview
keywords:
  - docs
  - tools
  - Messages
image: /assets/img/icons/yellow.png
slug: /use/tools/messages/overview
---


:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


The QRL supports message transactions as well as messages that can be added to a funds transfer transaction. These different messages are sent onto the QRL network, writing the data into the immutable blockchain.

Anyone is able to write data to the chain and can do so in multiple ways.

- `Transafer_TX` - This message data is written during a transfer of funds. Most wallet software supports the adition of message data during a transfer of funds.
- `Message_tx` - 
and a dedicated message transaction, or `message_tx` where only the message data is transferred. Take a look at the tools section of the QRL Wallet software.

These messages can be retrieved by any user by simply [searching for the block number](/use/tools/explorer/block-lookup) that the message was added, or by [searching the transaction hash](/use/tools/explorer/transaction-lookup) using the [block explorer](https://explorer.theqrl.org).

These messages are limited to 80 bytes or characters that may be sent onto the QRL blockchain. 

## Transfer Transaction Message

During a typical transaction, where a user sends funds to another address, there is an additional and optional field that will allow some message data to be inserted.

The use of this field is entirely up to the end user. For instance it can be simply a text sentence that gives reference to the transaction for later, such as "Alice's weekly pay".

It may also be used to reference a transaction ID for some automated system to verify a user has sent funds, say in a payment system. The Merchant could use this field to enter a unique transaction ID, then verify the funds were transferred prior to releasing a product to the customer.

The only limitation is the length of text (*80 bytes or characters*), and the users imagination. Message data can be seen in [the QRL Explorer](https://explorer.theqrl.org), referencing the transaction hash from the outgoing funds transfer.

## Message Transaction

This functionality has many uses and is the basis of a few other tools implemented on the QRL chain like the [on-chain notarization](/use/tools/notarise/overview) functions. 

At it's core the message is simply a string of text, established by the user sending the transaction. This string is limited to 80 bytes, or text characters and will fail if anything larger than that is used.

:::note
To differentiate between established message types that have been implemented, the QRL developers have established a standard message transaction encoding that allows a system to tell that the message is intended for processing. These systems then watch for this encoding and react accordingly.

The established message transaction encoding standard can be found at [the QRL GitHub repository here](https://github.com/theQRL/message-transaction-encoding) and is hosted open source. 

If you would like to add a new encoding to support a project you are working on, submit a PR to that repo following the standard set there.
:::

