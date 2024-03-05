---
id:  message-tx-encoding
title: QRL Message Transaction Encoding
hide_title: false
hide_table_of_contents: false
sidebar_label: Message Encoding
sidebar_position: 12
pagination_label: Message Encoding
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Build/Messages/message-tx-encoding.md
description: QRL Message TX Encoding
keywords:
  - docs
  - Advanced
  - QRL Message Encoding
image: /assets/img/icons/yellow.png
slug: /build/messages/message-tx-encoding
---

The QRL project has instituted a standard for encoding data into the `message_tx` function to differentiate encoded data on the blockchain. This highlights the usage and versatility of on-chain tools like messaging when paired with some additional off chain tooling.

[QIP002 - *A standard message encoding format to indicate encoded data in MessageTransaction transactions*](https://github.com/theQRL/qips/blob/master/qips/QIP002.md) set the standard for QRL message encoding that's used to differentiate various message types and their functions on the blockchain.


:::info
QRL's [Document Notarization](/use/tools/notarize) as mentioned in QIP002 has been integrated into both the [QRL Wallet](https://wallet.theqrl.org) and the [Block Explorer](https://explorer.theqrl.org) allowing a user to notarize and validate a document on the QRL blockchain. This system was implemented prior to the standard being instituted and uses a little different encoding.
:::



## Abstract

The QRL network supports arbitrary messages up to 80 bytes in length to be stored on chain through the [MessageTransaction](https://github.com/theQRL/QRL/blob/v4.0.2/src/qrl/core/txs/MessageTransaction.py#L8) transaction subtype.

There is the capability for second layer clients to read and interpret the data contained within these message transactions, and format interfaces accordingly. This can be seen with the currently implemented `Document Notarization` transaction type found on both the [QRL Wallet](https://github.com/theQRL/qrl-wallet/blob/v1.0.4/imports/ui/pages/tools/notarise/start.js#L71) and [QRL Explorer](https://github.com/theQRL/block-explorer/blob/2b11358f31415812bd374fb572c6ab9c8a06e9ad/imports/ui/components/tx/tx.html#L124) applications, and further implemented in the [explorer-helpers](https://github.com/theQRL/explorer-helpers/blob/v0.0.7/index.js#L356) repository.


## Motivation

This QIP aims to create a new base layer for a standard message encoding format such that other use cases have a framework to build within - for example the [coinvote](https://github.com/theQRL/qips/pull/2#issuecomment-434810654) proposal mentioned by @surg0r.

## Specification

The following will describe the base requirements to indicate a message contains encoded data, and provide further context on earlier usage as has been implemented in the `Document Notarization` transaction type.

There are a total of 80 bytes available in a MessageTransaction transaction that are usable. For the purposes of describing the format in this document, we will represent all data as HEX strings. It is worth noting however that the data is later converted to binary bytes for storage by a QRL node.

To indicate a message is an encoded message, the first two bytes are reserved for the following HEX string:

`0F0F`

The subsequent two bytes should indicate a unique encoded message transaction type. Each proposal to the community for a new encoded message type will be allocated a unique HEX string for these bytes for client implementations.

Eg: `0001`, `AA01` etc.

The remaining 76 bytes contain any data relevant to the encoded message, and should be proposed to the community through a QIP.


## Supported encoding bytes for specific message type (hex)

- `0000` - reserved
- `0001` - reserved
- `0002` - keybase
- `0003` - github
- `0004` - on-chain voting

