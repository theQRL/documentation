---
id: token-lookup
title: QRL Token Lookup
hide_title: false
hide_table_of_contents: false
sidebar_label: Token Lookup
sidebar_position: 5
pagination_label: Token Lookup
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Tools/explorer/token-lookup.md
description: QRL Explorer Token Lookup
keywords:
  - docs
  - tools
  - Explorer
  - Token
image: /assets/img/icons/yellow.png
slug: /use/tools/explorer/token-lookup
---

Token information is searched similar to any other transaction in [the QRL Block Explorer](https://explorer.theqrl.org). Instead of searching by the token name, search for the token using the `create_token_tx` transaction hash or `token_tx` transaction hash.

:::info
See the [transaction lookup documentation](/use/tools/explorer/transaction-lookup) for more information on the transaction search function. 
:::

General information about the transaction is presented, along with the token name and address that created, and the address that holds the initial token balance.

Detailed information about the token transaction can be found in the `meta` information tab below the overall summary. 

This detailed information can be found in the data:


```mermaid
flowchart LR
    A[meta] --> B[object]
    B --> C(tx)
    C --> D{token}
    D --> E[initial_balances]
    D --> F[symbol]
    D --> G[name]
    D --> H[owner]
    D --> I[decimals]
```