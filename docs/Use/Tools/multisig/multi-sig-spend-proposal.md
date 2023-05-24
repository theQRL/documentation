---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: multi-sig-spend-proposal
title: Multi-Sig Spend Proposal
hide_title: false
hide_table_of_contents: false
sidebar_label: Spend Proposal
sidebar_position: 3
pagination_label: Spend Proposal
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Multisig Spend Proposal
keywords:
  - docs
  - tools
  - Multi-Signature
  - spend proposal
image: /assets/img/icons/yellow.png
slug: /use/tools/multi-sig/spend-proposal
---


:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::

To initiate a transfer of funds from a multi-sig address you must open the QRL wallet using one of the addresses that are authorized signatories for the multi-sig address.

With the wallet open, browse to the tools tab and select multi-sig. This will open the multi-sig screen with tabs along the top, select the spend tab.

All valid multi-sig addresses will be shown, allowing the user to select the multi-sig address they want to propose spending from. A single address may be a signatory to multiple multi-sig addresses.


### Required Data

Enter the required information for the transaction including the address of the recipient, amount to send and the expiry block for the spend transaction vote to end.

| Input | Description | Value | 
| --- | --- | ---- | 
|**Recipient** | Recipient(s) to receive funds | {QRL PUBLIC ADDRESS} |
|**Amount** | Amount of $Quanta$ to send to each given recipient | {INTEGER} |
|**Expiry block number** | Block number that the vote will end if consensus is not reached | {INTEGER} |
|**Fee** | Fee for the *Spend Proposal* transaction paid from the initiating users address balance | {INTEGER} |
|**OTS Key Index**| Next unused OTS key used to sign *spend proposal* transaction | {INTEGER} |


#### Recipient(s)

The intended recipients that will receive funds if the spend proposal is voted for with enough threshold to fulfill the multi-sig rules established when the address was created.

#### Amount

Amount of quanta to send to the recipient from the multi-sig address balance. There must be enough funds in the multi-sig address to cover the transaction.

#### Expiry block number

The block that this spend proposal will expire. This can be set to any future block in the chain, with some estimated time frames  by selecting the approximate time calculation button next to the block number. 

:::info
Any block that has already been minted will throw an error when the transaction is attempted to be sent.
:::

#### Fee

This fee will cover the spend proposal transaction being sent onto the chain.

#### OTS Key Index

This transaction will use an OTS key from the initiators address, not the multi-sig address. There must be unused OTS keys available to send this transaction.

## Spend Proposal Validation

Once the transaction has been sent onto the network you can see the details using the [QRL Block Explorer](https://explorer.theqrl.org) by looking up the transaction hash.

This will show the initiating address, and who the funds are proposed to be sent to. This transaction will not happen until enough signatories have voted to approve the transfer.
