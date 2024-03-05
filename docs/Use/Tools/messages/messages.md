---
id: messages
title: QRL Message Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Overview
sidebar_position: 1
pagination_label: Message Overview 
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Tools/messages/messages.md
description: QRL Messages overview
keywords:
  - docs
  - tools
  - Messages
image: /assets/img/icons/yellow.png
slug: /use/tools/messages/overview
---

The QRL network supports on-chain messages providing a variety of functionality to the project. These messages are sent onto the QRL network writing data into the immutable quantum resistant blockchain ledger.

Anyone is able to write data to the chain and can do so in multiple ways.

- `Transafer_TX` - This message data is written during a transfer of funds. Most wallet software supports the addition of message data during a transfer of funds.
- `Message_tx` - 
and a dedicated message transaction, or `message_tx` where only the message data is transferred. Take a look at the tools section of the QRL Wallet software.

Messages can be retrieved by any user by simply [searching for the block number](/use/tools/explorer/block-lookup) that the message was added, or by [searching the transaction hash](/use/tools/explorer/transaction-lookup) using the [QRL block explorer](https://explorer.theqrl.org).

:::info
Messages are limited to `80 bytes` or 80 text characters that may be sent onto the QRL blockchain. This limitation is to ensure blocks stay small in size.
:::


## Transfer Transaction Message

During a typical transaction, where a user sends funds to another address, there is an additional and optional field that will allow some message data to be inserted.

The use of this field is entirely up to the end user. For instance it can be simply a text sentence that gives reference to the transaction for later, such as "Alice's weekly pay".

It may also be used to reference a transaction ID for some automated system to verify a user has sent funds, say in a point of sale payment system. The Merchant could use this field to enter a unique transaction ID, then verify the funds were transferred into the merchant's address with a matching tx_id prior to releasing a product to the customer.

The only limitation is the length of text (*80 bytes or characters*), and the users imagination. Message data can be seen in [the QRL Explorer](https://explorer.theqrl.org), referencing the transaction hash from the outgoing funds transfer.

## Message Transaction

This functionality has many uses and is the basis of a few other tools implemented on the QRL chain like the [on-chain notarization](/use/tools/notarize/overview) functions. 

At it's core the message is simply a string of text, established by the user sending the transaction. This string is limited to 80 bytes, or text characters and will fail if anything larger than that is used.

:::info
To differentiate between established message types that have been implemented, the QRL developers have established a standard message transaction encoding that allows a system to tell that the message is intended for processing. These systems then watch for this encoding and react accordingly.

The established message transaction encoding standard can be found at [the QRL GitHub repository here](https://github.com/theQRL/message-transaction-encoding) and is hosted open source. 

If you would like to add a new encoding to support a project you are working on, submit a PR to that repo following the standard set there.
:::

