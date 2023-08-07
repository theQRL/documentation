---
docstatus: DRAFT
id: ledger-app
title: QRL Ledger Nano S App
hide_title: false
hide_table_of_contents: false
sidebar_label: ledger-app
sidebar_position: 1
pagination_label: ledger-app
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/
description: ledger-app
keywords:
  - docs
  - Advanced
  - QRL ledger-app
image: /assets/img/icons/yellow.png
slug: /developers/wallet/ledger/ledger-app
---


[![CircleCI](https://circleci.com/gh/theQRL/ledger-qrl.svg?style=svg)](https://circleci.com/gh/theQRL/ledger-qrl)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e5130886a7e44a23b11844c44fb323ed)](https://www.codacy.com/app/qrl/ledger-qrl?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=theQRL/ledger-qrl&amp;utm_campaign=Badge_Grade)

This is a prototype of the Ledger Nano S app for Quantum Resistant Ledger. 

It is work in progress and subject to further modifications and testing.

**WARNING: DO NOT USE THIS APP IN A LEDGER WITH REAL FUNDS.**

This repo includes:
- Ledger Nano S app/firmware
- C++ unit tests

## Demo Firmware

Continuous integration generates a demo.zip. This includes firmware plus a shell script that installs the firmware. 

**WARNING**: Again! Remember to use this ONLY in a ledger without funds and only for testing purposes.

## More info

[Build instructions](https://github.com/theQRL/ledger-qrl-app/blob/master/docs/BUILD.md)

**Specifications**

- [APDU Protocol](https://github.com/theQRL/ledger-qrl-app/blob/master/docs/PROTOSPEC.md)
- [Transaction format](https://github.com/theQRL/ledger-qrl-app/blob/master/docs/TXSPEC.md)