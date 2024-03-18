---
id: notarization-verification
title: QRL - Notarization Verification
hide_title: false
hide_table_of_contents: false
sidebar_label: Verification
sidebar_position: 1
pagination_label: Verification
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/notarize/verify-data.md
description: QRL Notarisation verification guide
keywords:
  - docs
  - tools
  - Notarisation
image: /assets/img/icons/yellow.png
slug: /use/tools/notarize/noatrization-verification
---

Verifying a document that has been notarized on the QRL blockchain is simple and can be done using a web browser.

:::info
Use our Document Notarization guide to get started with on-chain quantum resistant notarization.
:::


## Document Verification

Browse to the [QRL Block Explorer](https://explorer.theqrl.org) and lookup the transaction hash from the initial document notarization.

You can either save the tx_hash from the original transaction or simply lookup the QRL address used to send the notarization.

From the transaction lookup screen, select the "choose File" button and select the document you wish to validate. This should be an exact copy of the original document that was notarized initially.

Select the "Verify Notarization" button and the prompt should read `Document Verified` and list some additional details about the initial notarization.

:::tip
Any change to the file will invalidate the notarization and will not verify using this process. If this is the case the file you are verifying does not match the original.
:::