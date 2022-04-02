---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: qrl-tokens
title: QRL Tokens
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL Tokens
sidebar_position: 1
pagination_label: QRL Tokens
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Tokens
keywords:
  - docs
  - tools
  - tokens
image: /assets/img/icons/yellow.png
slug: /tools/tokens/
---


:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


The initial token balance will be sent to the QRL addresses listed in the `addresses` array, with initial 
balances being a combination of the `decimals` and `amounts` fields. 

The total token distribution is calculated by taking the amounts and multiplying it by the decimal place. 

For example, say you have a token with a decimal of `2` with `100` minted tokens 

$$
100 \times 0.01=1\text{ token}
$$

Creating a whole token that can be divided into `100` sub-token derivatives to the second decimal place, similar as pennies are to a dollar. 
