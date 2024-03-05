---
id: hexphrase
title: QRL Address Hexphrase
hide_title: false
hide_table_of_contents: false
sidebar_label: Hexphrase
sidebar_position: 3
pagination_label: Hexphrase
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Build/Address/hexphrase.md
description: QRL Address Hexphrase Documentation
keywords:
  - docs
  - advanced
  - Address 
  - Hexphrase
image: /assets/img/icons/yellow.png
slug: /build/address/hexphrase
---

A QRL Address's secret key can be represented in a Hexphrase, or in a hexadecimal format. This key is the seed to generating the XMSS tree that correlates to the QRL public address.

:::info Example Hexphrase
`000400dbf4ead7e3eec1155b6ea44b7181c94cb7cadee49969eb798fdea34ad5c3c01b64b4661dfbeb51f76609a0c182eb7a47`
:::

A secure source of entropy is used to generate a SEED which is passed through a secure PRF function to generate a set of pseudorandom keys which generate the XMSS tree.

An XMSS address is derived from the public key, $PK$, which
contains the Merkle root, and public SEED. 

If the SEED remains constant but the number of OTS key pairs
to compute the tree varies then the Merkle root will change for each variation. Thus for every single addition
or subtraction of a single OTS key pair the derived address will change.

:::warning
Hexphrase information is secrete and will allow anyone that posses it to access all funds and assets contained within the address.

Keep the Hexphrase safe!
:::