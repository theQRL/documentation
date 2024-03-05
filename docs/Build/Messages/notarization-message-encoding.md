---
id:  notarization-message-encoding
title: QRL Notarization Message Encoding
hide_title: false
hide_table_of_contents: false
sidebar_label: Notarization Encoding
sidebar_position: 12
pagination_label: Notarization Encoding
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Build/Messages/notarization-message-encoding.md
description: QRL Notarization Message TX Encoding definition and documentation.
keywords:
  - docs
  - Advanced
  - QRL Notarization Message Encoding
image: /assets/img/icons/yellow.png
slug: /build/messages/notarization-message-encoding
---

This document covers the QRL Notarization message encoding standard that was instituted into the project through the QIP process in 2018. 

:::note
This document is derived from [QIP 2 - A standard message encoding format to indicate encoded data in MessageTransaction transactions](https://github.com/theQRL/qips/blob/master/qips/QIP002.md)
:::

#### Document Notarization Specification

The following describes the structure of the `Document Notarization` message transaction sub type for historical purposes. There are approximately 25 transactions from early stages of the network that utilize this format. It is optional to implement for display purposes.

First 2 Bytes: `AFAF` - Indicates encoded message.
Subsequent Half Byte: `A` - Indicates this is a document notarization message transaction sub type.
Subsequent Half Byte: `1`, `2`, or `3` indicating which hash function has been used to notarize the document as per below:

    `1` - SHA1 (Now deprecated in user interfaces when notarizing a document)
    `2` - SHA256
    `3` - MD5 (Now deprecated in user interfaces when notarizing a document)

The remaining 77 bytes are reserved for both the hash of the document, and a variable amount of free form text depending which hash function was use. For each hash function above, the following describes the remaining 77 bytes utilization.

    `1` - SHA1 - Subsequent 20 bytes store the SHA1 hash, with the remaining 57 bytes available for free form text.
    `2` - SHA256 - Subsequent 32 bytes store the SHA256 hash, with the remaining 45 bytes available for free form text.
    `3` - MD5 - Subsequent 16 bytes store the SHA1 hash, with the remaining 61 bytes available for free form text.



:::tip Example Notarization Hash
`afafa258755c6c52d66d0c7af14252c59e17ee70391ca9fe21ab40354a75554939362468747470733a2f2f71726c2e636f2e696e2f636861696e2f236d61696e6e65742d636861696e`

| Message Encoding | Hash Function | 32 byte Data Hash | 45 byte Optional Data |
| :---: | :---: | :---: | :---: |
| `afafa` | `2` | `58755c6c52d66d0c7af14252c59e17ee70391ca9fe21ab40354a755549393624` | `68747470733a2f2f71726c2e636f2e696e2f636861696e2f236d61696e6e65742d636861696e` |

:::

