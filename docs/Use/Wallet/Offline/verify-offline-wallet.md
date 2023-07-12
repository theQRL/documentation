---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: offline-wallet-verify
title: QRL Offline Wallet Verify
hide_title: false
hide_table_of_contents: false
sidebar_label: Verify
sidebar_position: 3
pagination_label: Offline Wallet - Verify
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: QRL Offline Wallet documentation
keywords:
  - docs
  - Offline Wallet
image: /assets/img/icons/yellow.png
slug: /use/wallet/offline/verify
---


:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


Verification of the wallet files are the next steps toward full security. This process allows you to be confident that the files you have downloaded have not been tampered with and are safe to trust for address creation.



## Verify Offline Wallet Files

Follow the steps below to verify the Offline QRL wallet files.

### **Get QRL's Public PGP Key**

- Obtain security@theqrl.org public PGP key from PGP keyservers or [Github](https://raw.githubusercontent.com/theQRL/security/master/security.theqrl.org.gpg.asc)

```bash
pgp import security.theqrl.org.gpg.asc
```

### **Verify the Offline Wallet PGP signed shasum file**

- Download the PGP signed shasum file for this release from the [QRL security repo](https://github.com/theQRL/security/tree/master/offline-wallet-generator)
- Check the PGP signature of the shasum hashes file:

```
gpg --verify shasum.256.pgp.asc
```

:::note This should display _gpg: Good signature from "Security team <security@theqrl.org>"_
:::

### **Verify the Offline Wallet Files**

- From downloaded qrl-offline-wallet.zip, check the shasum of the index of shasums:

```
shasum shasum.256.asc
```
:::note This should match the shasum shown in the PGP signed message verified above
:::

- Finally, check the shasum of the offline-wallet files:

```
shasum --check shasum.256.pgp.asc
```
:::tip All files should be _OK_
:::
