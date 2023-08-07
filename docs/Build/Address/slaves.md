---
docstatus: DRAFT
id: slave-keys
title: QRL Slave Keys
hide_title: false
hide_table_of_contents: false
sidebar_label: Slave Keys
sidebar_position: 5
pagination_label: Slave Keys
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: Overview of the QRL Slave Key addresses.
keywords:
  - docs
  - advanced
  - Slave Keys
image: /assets/img/icons/yellow.png
slug: /build/address/slave-keys
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


The QRL wallet is an XMSS Merkle tree constructed using the private key to generate leaves of this tree. 

Each "leaf" can also generate a tree of OTS Slave keys that can be used to sign transactions. This allows further expansion of a QRL wallet extending the number of transactions you can process before needing to regenerate a new wallet.

