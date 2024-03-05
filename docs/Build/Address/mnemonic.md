---
id: mnemonic
title: QRL Address Mnemonic
hide_title: false
hide_table_of_contents: false
sidebar_label: Mnemonic
sidebar_position: 4
pagination_label: Mnemonic
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Build/Address/mnemonic.md
description: QRL Address Mnemonic Documentation.
keywords:
  - docs
  - advanced
  - Address
  - Mnemonic
image: /assets/img/icons/yellow.png
slug: /build/address/mnemonic
---

A mnemonic phrase is a list of words that cryptographically represent the seed when compared to a given word list and passed through an algorithm. 

The QRL uses [this wordlist](https://github.com/theQRL/qrllib/blob/4c63c7e4976ba111e5e405de466f824d8ef1deb8/src/rust_wrapper/qrl/wordlist.rs#L4) to generate mnemonic phrase that represents a QRL addresses secret keys.

Depending on where these words are in the list assigns a unique number to each word. When passed through an [algorithm](https://github.com/theQRL/wallet.js/blob/bcf1587bea0455554e669c775c38faeca6faa1e3/src/utils/mnemonic.js#L2) they produce the same SEED used to generate a XMSS tree. 

The Mnemonic is a user friendly way to represent the hexseed and is less error prone than a hexseed when a user is presented with backing up and storing key information.


:::info Example mnemonic phrase
_aback drank swap fence strait donor script form imply eerie invade brave fan legend tape evil higher ride mortar tricky expect gentry scare retire remark gritty wolves repeal weary gray peak blew tsar pipe_
:::

This phrase can be entered into the wallet software and will allow full access to the funds contained in the address.



