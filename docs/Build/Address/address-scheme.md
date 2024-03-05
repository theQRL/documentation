---
id: qrl-address-scheme
title: QRL Address Scheme
hide_title: false
hide_table_of_contents: false
sidebar_label: Address Scheme
sidebar_position: 1
pagination_label: Address Scheme
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Build/Address/address-scheme.md
description: QRL Address Scheme Documentation.
keywords:
  - docs
  - advanced
  - Address Scheme
image: /assets/img/icons/yellow.png
slug: /build/address/address-scheme
---


QRL uses an extensible stateful asymmetrical hypertree signature scheme composed of chained XMSS trees. 

This has the dual benefit of utilizing a validated signature scheme and allowing generation of ledger addresses with the ability to sign transactions avoiding a lengthy pre-computation delay seen with giant XMSS constructions. W-OTS+ is the chosen hash-based one-time signature in the scheme for both security and performance reasons.


## Public Address Structure

A QRL address is designed to be extensible and supports a wide range of formats. 

The first three bytes of any address (descriptor) encode information to describe the hash function, signature scheme, address format, and additional parameters.

A typical account address is represented as follows:

`Q01070050d31c7f123995f097bc98209e9231d663dc26e06085df55dc2f6afe3c2cd62e8271a6bd`



QRL Addresses are structured in the following way:

| Name | Bytes | Count | Description |
| ---- | ----- | ----- | ----------- |
| *DESC* | *0 .. 2* | *3* |  *Address Descriptor* |
| *DATA* | *3 .. N* | *??* | *N will depend on the address format* | 

Using `sha256 2X`, a QRL address is composed of 39 bytes. This is the internal format used by any API or module in the project. 

:::info
At the moment, only one address format is utilized,  `sha256 2X`, however we support crypto-agility and the ability to later move to new hash schemes as the security landscape changes.
:::


For representational purposes (i.e. user interface, debugging, logs), it is possible that the address is represented as a hex-string prefixed with Q (79 hexadecimal characters). This is appropriate for user related purposes but will be rejected by the API

| Name | Bits | Count | Description |
| ---- | ---- | ----- | ----------- |
| *DESC* | *0 .. 2* | *3* | *Hash Function* | 
| *HASH* | *3 .. 35* | *32* | *SHA2 256(DESC+PK)* | 
| *VERH* | *36 .. 40* | *4* | *SHA2 256(DESC+HASH) (only last 4 bytes)* | 

In pythonic pseudocode this is represented as follows:

$$
Q + DESC[: 3] + HASH[: 32] + V ERH[: 4]
$$


### Address Descriptor

| Name | Bits | Count | Description |
| ---- | ---- | ----- | ----------- |
| *HF* | *0 .. 3* | *4* | *Hash Function* |
| *SIG* | *4 .. 7* | *4* | *Signature Scheme* |
| *P1* | *8 .. 11* | *4* | *Parameters 1 (ie. height, etc.)* |
| *P2* | *12 .. 15* | *4* | *Address Format* |
| *P3* | *16 .. 23* | *8* | *Parameters 2* |

In the case of using XMSS, the parameters are used as follows:

| Name | Bits | Count | Description |
| ---- | ---- | ----- | ----------- |
| *HF* | *0 .. 3* | *4* | *SHA2-256, SHAKE128, SHAKE256* |
| *SIG* | *4 .. 7* | *4* | *XMSS* |
| *P1* | *8 .. 11* | *4* | *XMSS Height / 2* |
| *AF* | */ P2 12* | *.* |. *15 4 Address Format* |
| *P3* | *16 .. 23* | *8* | *Not used* |

### SIG - Signature Type

| Value |  Description |
| ----- | ------------ |
| *0* | *XMSS* |
| *1 .. 15* | *Reserved - Future expansion* |

### HF - Hash Function

| Value | Description |
| ----- | ----------- |
| *0* | *SHA2 256* |
| *1* | *SHAKE 128* |
| *2* | *SHAKE 256* |
| *3 .. 15* | *Reserved - Future expansion* |


### AF - Address Format
| Value | Description |
| ----- | ----------- | 
| *0* | *SHA256 2X* |
| *1 .. 15* | *Reserved - Future expansion* |