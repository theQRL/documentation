---
docstatus: 30%  # one of {DRAFT, 30%, 90%, COMPLETE}
id: ledger-wallet-backup-restore
title: Ledger Wallet - Backup & Restore
hide_title: false
hide_table_of_contents: false
sidebar_label: Backup & Restore
sidebar_position: 3
pagination_label: Backup & Restore
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Wallet/Ledger/backup-ledger-addreses.md
description: Backup and restore a Ledger QRL address
keywords:
  - docs
  - wallet
  - ledger
  - backup
  - restore
image: /assets/img/icons/yellow.png
slug: /use/wallet/ledger/backup-restore
---


The QRL Ledger application, like all Ledger applications will never expose the QRL private keys associated to an address. Instead the Ledger device recovery keys are needed to recover a QRL address that is stored on the device.


## Backup Ledger QRL Address

:::tip
The backup process is simple and follows the [Ledger documentation found here](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-your-Ledger-Nano-S?docs=true) 
:::

You should have setup and saved the Ledger device's recovery keys when you first powered up the ledger. 
These device keys are what needs to be stored and recovered at a later date if needed.

:::info
If you have added the secondary address space with an additional Mnemonic passphrase make sure it is also stored with the backup for full recovery of all addresses stored on the device.
:::


## Restore Ledger QRL Address

Once the Ledger device is re-initialized the QRL application can be reinstalled and the previously initialized addresses recovered by following the [New Wallet setup process](/use/wallet/ledger/new) again.

The QRL addresses are created using a cryptographic seed provided by the Ledger that is directly related to the private keys used to setup the hardware device. As long as these keys are the same the resulting QRL address will be the same.

