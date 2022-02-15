---
docstatus: DRAFT
id:  message-tx-encoding
title: QRL Message Transaction Encoding
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL Message TX Encoding
sidebar_position: 12
pagination_label: QRL Message TX Encoding
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Message TX Encoding
keywords:
  - docs
  - Advanced
  - QRL Message Encoding
image: /assets/img/icons/yellow.png
slug: /developers/message-tx-encoding
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


List of supported encoding bytes for various services using QRL message transactions. 

Based upon [QIP002.](https://github.com/theQRL/qips/tree/master/2.Proposals/1.%20Open/2%20-%20MessageTransaction%20Encoded%20Message%20Standard)

For an encoded message transaction to be valid, the first two bytes of the 80 byte message body must be (in hex), "0x0F0F".
The next **two bytes** of the message denote the encoding of the **specific message type**.

i.e. where the encoding for specific message type is (in hex) "0x0000", a valid hexstring message would be:
 
`0F0F 0000 <remaining 76 bytes of message>`

## Supported encoding bytes for specific message type (hex)

- 0000 - reserved
- 0001 - reserved
- 0002 - keybase
- 0003 - github
- 0004 - on-chain voting



