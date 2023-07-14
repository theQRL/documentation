---
docstatus: DRAFT
id:  notarization-message-encoding
title: QRL Notarization Message Encoding
hide_title: false
hide_table_of_contents: false
sidebar_label: Notarization Encoding
sidebar_position: 12
pagination_label: Notarization Encoding
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Notarization Message TX Encoding definition and documentation.
keywords:
  - docs
  - Advanced
  - QRL Notarization Message Encoding
image: /assets/img/icons/yellow.png
slug: /build/messages/notarization-message-encoding
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


This document covers the QRL Notarization message encoding standard that was instituted into the project through the QIP process in 2018. 

:::note
This document is derived from [QIP 2 - A standard message encoding format to indicate encoded data in MessageTransaction transactions](https://github.com/theQRL/qips/blob/master/qips/QIP002.md)
:::

#### Document Notarisation Specification

The following describes the structure of the `Document Notarisation` message transaction sub type for historical purposes. There are approximately 25 transactions from early stages of the network that utilise this format. It is optional to implement for display purposes.

First 2 Bytes: `AFAF` - Indicates encoded message.
Subsequent Half Byte: `A` - Indicates this is a document notarisation message transaction sub type.
Subsequent Half Byte: `1`, `2`, or `3` indicating which hash function has been used to notarise the document as per below:

    `1` - SHA1 (Now deprecated in user interfaces when notarising a document)
    `2` - SHA256
    `3` - MD5 (Now deprecated in user interfaces when notarising a document)

The remaining 77 bytes are reserved for both the hash of the document, and a variable amount of free form text depending which hash function was use. For each hash function above, the following describes the remaining 77 bytes utilisation.

    `1` - SHA1 - Subsequent 20 bytes store the SHA1 hash, with the remaining 57 bytes available for free form text.
    `2` - SHA256 - Subsequent 32 bytes store the SHA256 hash, with the remaining 45 bytes available for free form text.
    `3` - MD5 - Subsequent 16 bytes store the SHA1 hash, with the remaining 61 bytes available for free form text.


`afafa258755c6c52d66d0c7af14252c59e17ee70391ca9fe21ab40354a75554939362468747470733a2f2f71726c2e636f2e696e2f636861696e2f236d61696e6e65742d636861696e`

## Implementation

No immediate implementation work is required for this QIP as it simply states a standard for encoding messages using the QRL networks `MessageTransaction` transaction type.

Eventual work will be required in any client implementations that wish to adhere to the standard encoding format, such as the public [QRL Wallet](https://wallet.theqrl.org/) or [Block Explorer](https://explorer.theqrl.org/)
