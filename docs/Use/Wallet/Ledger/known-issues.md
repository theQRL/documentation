---
id: ledger-wallet-known-issues
title: Ledger Wallet - Known Issues
hide_title: false
hide_table_of_contents: false
sidebar_label: Known Issues
sidebar_position: 8
pagination_label: Ledger Wallet - Known Issues
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Wallet/Ledger/known-issues.md
description: Known issues with the Ledger Nanao and QRL 
keywords:
  - docs
  - wallet
  - ledger
  - known Issues
image: /assets/img/icons/yellow.png
slug: /use/wallet/ledger/known-issues
---

The QRL has developed and integrated QRL's XMSS address scheme into the Ledger Nano S and have successfully launched an app with the oversight of the Ledger developers. 

As with any evolving ecosystem, there are growing pains to be worked through when using cutting edge cryptography. 


:::info
If you come across something not working as you would expect please report it to the team in a github issue. [theQRL Ledger GitHub](https://github.com/theQRL/ledger-qrl/issues)
::: 

## Known Issues

| Issue Name | Description | Impact | Mitigation |
|------------|-------------|--------| ---------- |
| [QRL app freezes on Nano S Firmware > 2.0](#qrl-app-freezes-on-nano-s-firmware--20) | Running the latest release of the QRL ledger app v1.1.4 causes device to freeze when sending transactions. | Transactions fail when using the latest version. | Downgrade the devices firmware or upgrade to a supported Ledger device (Nano S Plus or Nano X) |
| [NANO S End Of Life](#nano-s-end-of-life) | The NANO S device reached EOL and was sunset on JUNE 2022.  | The device is no longer supported | Upgrade to a new device |
| [U2F Timeout](#u2f-timeout) |  The browser will timeout with a "U2F Timeout" warning when attempting to transfer QRL from a Ledger, showing a consumed OTS key on the device. | Sending funds will not succeed as expected, and the OTS counter on the Ledger will become out of sync | Download and use the [QRL desktop wallet](https://theqrl.org/downloads/) |

---

### QRL app freezes on Nano S Firmware > 2.0

Running the latest QRL app on the old NANO S device will cause any transactions to fail. This is due to a memory restriction on the Ledger Nano S and the latest updates to the base application pushed by Ledger consuming more memory.

:::note THE LAST SUPPORTED VERSION OF THE QRL APPLICATION ON THE NANO S IS V1.1.3 ON v1.x FIRMWARE
:::

#### Migration to New Device

If you have updated to the latest version you can recover the wallet using the Ledger recovery keys from the original device. 

Using these keys in a new [Ledger Nano S Plus](https://shop.ledger.com/pages/ledger-nano-s-plus) or [Ledger Nano X](https://shop.ledger.com/pages/ledger-nano-x) will re-create the same QRL addresses and recover the funds contained within.

#### Transfer to new QRL Address

If you have not updated the QRL ledger application it is recommended that you transfer all funds from the un-supported device to a newly created QRL address. 

:::tip[Follow one of our guides on creating a new QRL wallet to transfer funds to](/use/wallet/overview#qrl-wallet-applications)
:::

Using the [guide to send funds on a ledger device](/use/wallet/ledger/send), transfer all funds to an address that you control.

---

### NANO S End Of Life

Ledger announced the NANO S has reached sunset on June 2022 and will no longer be sold or supported. The company has released a replacement device, the NANO S Plus that supersedes the old hardware.

End of life announcement:
https://support.ledger.com/hc/en-us/articles/5615862066717-Ledger-Nano-S-Sunset-FAQ?support=true

Replacement Device:
https://shop.ledger.com/pages/ledger-nano-s-plus


:::note
Using the [guide to send funds on a ledger device](/use/wallet/ledger/send), transfer all funds to an address that you control.

[Follow one of our guides on creating a new QRL wallet to transfer funds to](/use/wallet/overview#qrl-wallet-applications) if you don't already have a new address ready.
:::


---

### U2F Timeout

Ledger devices have been using the U2F protocol for easy and cryptographically secure second factor mechanism with the web browser since 2016. Lately, U2F timeouts have been enforced by browser applications more aggressively — which you may have noticed if you have ever experienced a “U2F timeout” warning. 

#### The Error

While attempting to transfer or sign a TX on the network, the browser will attempt unsuccessfully to sent the signed TX to the blockchain. This will eventually fail and show a failed message in the wallet screen. 

Additionally there will be an error message shown in the developer tools of the browser. indicating a "U2F Timeout" has occurred.

#### Mitigation

Previously, we have recommended using another browser or playing browser bingo, switching to a browser that will still function with the U2F requirements of the Ledger. 

The new current recommended action is to use our desktop wallets, which can be found on the [front page of our website](https://theqrl.org/) and our [github releases page](https://github.com/theQRL/qrl-wallet/releases/latest).

You can read more about the development of U2F tunnel transport for Ledger devices in their blog [Windows 10 Update: Sunsetting U2F tunnel transport for Ledger devices](https://www.ledger.com/2019/05/17/windows-10-update-sunsetting-u2f-tunnel-transport-for-ledger-devices/).

:::info
If you have attempted to send a TX with your ledger device connected to a Chrome, Brave, Opera, or Firefox browser and are showing and erroneous OTS key, you can reset the ledger device OTS key count. See the tools section of your opened wallet using the desktop application. **Make Sure you have not used any keys successfully prior to resetting the ledger** 
:::
