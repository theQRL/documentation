---
id: Multisig-spend-proposal
title: Multisig Spend Proposal
hide_title: false
hide_table_of_contents: false
sidebar_label: Spend Proposal
sidebar_position: 3
pagination_label: Spend Proposal
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Tools/multisig/multisig-spend-proposal.md
description: QRL Multisig Spend Proposal
keywords:
  - docs
  - tools
  - Multi-Signature
  - spend proposal
image: /assets/img/icons/yellow.png
slug: /use/tools/multisig/spend-proposal
---


Transferring funds from a Multisig address requires a spend proposal be initiated by one of the members of the Multisig address.

As funds stored in a Multisig address are held under the rules established when the address was created, the minimum threshold must be met for any transaction to be sent. Defined signatories are required to vote on a spend proposal until the minimum threshold is met.

A spend proposal may be initiated by any of the signatories associated to a Multisig address.

:::info
For more info see the [documentation for creating a Multisig address](/use/tools/Multisig/generate)
:::

## Spend Proposal

To initiate a spend proposal for a Multisig address, you must open the [QRL wallet](https://wallet.theqrl.org) using one of the addresses that are authorized as a signatory for the Multisig address.


With the wallet open, browse to the tools tab and select Multisig. This will open the Multisig screen with tabs along the top, select the spend tab.

All valid Multisig addresses will be shown, allowing the user to select the Multisig address they want to propose spending from. A single address may be a signatory to multiple Multisig addresses.


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

- The intended recipients that will receive funds if the spend proposal is voted for.
- Threshold must be met for any funds to be transferred.
- Multiple recipients may be added (up to 100)

#### Amount

- Amount of quanta to be sent to the recipient from the Multisig address balance. 
- There must be enough funds in the Multisig address to cover the transaction.

#### Expiry block number

- Block that the spend proposal will expire. 
- This can be set to any future block in the chain
- Some estimated time frames are shown by selecting the approximate time calculation button next to the block number. 
- Any past block that has already been minted will throw an error when the transaction is attempted to be sent.

#### Fee

- This fee will cover the spend proposal transaction being sent onto the chain.

#### OTS Key Index

- This transaction will use an OTS key from the initiators address, not the Multisig address. 
- There must be unused OTS keys available to send this transaction.

## Spend Proposal Validation

Once the transaction has been sent onto the network you can see the details using the [QRL Block Explorer](https://explorer.theqrl.org) by looking up the transaction hash.

This will show the initiating address, and who the funds are proposed to be sent to. This transaction will not happen until enough signatories have voted to approve the transfer.

Additionally there will now be a spend transaction under the vote tab in the QRL Wallet Multisig tools ready to vote on from this address.

## Spend Proposal Approval

In order for the proposal to be accepted and funds sent the intended recipients the minimum threshold must be met by approve votes from signatories. 
