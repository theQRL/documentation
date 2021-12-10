---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: check-wallet-balance
title: Check QRL Wallet Balance
hide_title: false
hide_table_of_contents: false
sidebar_label: Check Wallet Balance
sidebar_position: 2
pagination_label: Check Wallet Balance
custom_edit_url: https://github.com/theQRL/documentation/edit/main/docs/Wallet/qrl-wallet.md
description: Check Wallet Balance
keywords:
  - docs
  - wallet
  - balance
image: /assets/img/icons/yellow.png
slug: /wallet/check-wallet-balance
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::

To check the balance of a wallet browse to the [QRL Explorer](https://explorer.theqrl.org) and enter your address into the search field.

## Search Address

Enter the QRL address into the search bar in the top right of the Explorer.

You can enter QRL addresses, transaction hashes, or block indexes into this field.

This will show you the current balance and all transactions that have happened with this wallet.

## Meta Info

At the bottom left there is a **meta** button. This will give fine grain details for the current wallet.

## QRL Command line

Using a terminal with qrl installed you can simply enter `qrl wallet_ls` to get the balance from the same directory as your wallet.json file.

for more info on installing QRL see the doc [here](/node/QRLnode)
