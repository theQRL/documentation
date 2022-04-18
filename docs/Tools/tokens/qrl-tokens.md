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


QRL supports the generation of colored tokens, allowing a multitude of functionality in addition to the typical blockchain functions. 

These tokens are generated and sent in separate transaction types *([`RelayTokenTxn`](/developers/api/wallet-api) and [`RelayTransferTokenTxn`](/developers/api/wallet-api))* allowing additional versatility as they are not tied to any QRL funds and can be transferred interdependently from an QRL coins. 

:::note
Additional functionality is possible using the token system. See the NFT documentation for an example of encoding data into a token, as well as the token encoding standard established.
:::



## Token Generation

One can generate new tokens using the [QRL wallet](/wallet) interface via the web wallet, desktop wallet as well as through multiple API's and command line tools.


There are various fields and information required to create a token transaction. The full documentation [can be found here](/tools/tokens/token-create)

:::info
THis section covers the GUI interface through the web wallet tools section. For automated token functionality, including using slave OTS keys to generate and send see the [API Documentation](/developers/api/wallet-api) as well as the [QRL Command Line Documentation](/Build/wallet/cli/node-cli)
:::


## Send Tokens

Tokens can be transferred between addresses on the QRL blockchain. These tokens can be split into derivatives and fractionally split as well depending on the initial criteria set during the token creation. 

Tokens are tracked by their creation transaction hash and may be transferred between addresses paying only the transaction cost to send them around. 

## Token Uses

While the versatility is yet to be fully realized, we think there are some great opportunities for quantum resistant functional systems to be developed using these tools.

A great example is the NFT generation system that has utilized the various input forms for the token transaction to mint NFT tokens while storing metadata information as a hash of the JSON data served by a 3rd party.

