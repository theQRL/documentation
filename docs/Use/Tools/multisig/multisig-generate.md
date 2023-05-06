---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: multisig-generate
title: QRL MultiSig - Generate Address
hide_title: false
hide_table_of_contents: false
sidebar_label: Generate
sidebar_position: 2
pagination_label: Multisig - Generate
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Multisig - Generate new address
keywords:
  - docs
  - tools
  - Multi-Signature
  - New Address
image: /assets/img/icons/yellow.png
slug: /use/tools/multi-sig/generate
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>

### HELP NEEDED

- Graphics showing multi-sig overall flow, relationships and weights

:::

![Generate Multisig Address Flow](./assets/img/generate-multisig.png)


## Required Info

Here are the various pieces of required information needed to generate a Multisig Address.

:::info Required Data For Multisig Address
| Input | Description | Value | 
| --- | --- | ---- | 
|**Signatory** | Parties to be setup as a signatories | {QRL PUBLIC ADDRESS} |
|**Weight** | Weight for each signatory to use for voting power | {INTEGER} |
|**Threshold to Spend** | Minimum vote threshold required for vote to pass | {INTEGER} |
|**Fee** | Fee for the *multisig-generate* transaction | {0.01} |
|**OTS Key Index**| Next unused OTS key used to sign *multisig-generate* transaction | {INTEGER} |
:::

### Signatory(s)

Each voting party in the multisig address is required to have generated a QRL Address. This address will be associated to the multisig address and used for all further transactions related to the multisig address.

The creator of the multisig address will need to collect all of the public keys for voting members of the multisig address prior to generating a new address. 

### Weight

Each signatory will be assigned a weight during the address creation process. This weight cannot be changed after the multisig address is created. 

This weight determines the voting power the signatory has. 

### Threshold To Spend

### Fee

### OTS Key Index
