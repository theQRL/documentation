---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: qrl-explorer
title: QRL Explorer Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Overview
sidebar_position: 1
pagination_label: QRL Explorer
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Explorer overview
keywords:
  - docs
  - tools
  - Explorer
image: /assets/img/icons/yellow.png
slug: /use/tools/explorer/overview
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


The Block Explorer is a portal into the blockchain allowing users to lookup information from the chain.

The explorer is connected through a QRL node and parses data directly from the immutable data contained in the chain. Any transaction, address with funds, mining payouts etc. are all stored and accessible through the explorer. 

:::note
If an address has been generated but has not made a transaction on-chain, the address will not be found with the explorer. A transaction is required to be seen on the chain prior to being discoverable by the explorer
:::
