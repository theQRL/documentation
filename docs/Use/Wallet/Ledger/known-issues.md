---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
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

| Github Issue Number | Issue Name | Description | Impact |
|--------------|------------|-------------|--------| 
| NONE | U2F Timeout  |  The browser will timeout with a "U2F Timeout" warning when attempting to transfer QRL from a Ledger, showing a consumed OTS key on the device. | Sending funds will not succeed as expected, and the OTS counter on the Ledger will become out of sync |

### U2F Timeout

Ledger devices have been using the U2F protocol for easy and cryptographically secure second factor mechanism with the web browser since 2016. Lately, U2F timeouts have been enforced by browser applications more aggressively — which you may have noticed if you’ve ever experienced a “U2F timeout” warning. 

#### The Error

While attempting to transfer or sign a TX on the network, the browser will attempt unsuccessfully to sent the signed TX to the blockchain. This will eventually fail and show a failed message in the wallet screen. 

Additionally there will be an error message shown in the developer tools of the browser. indicating a "U2F Timeout" has occurred.

#### Mitigation

Previously, we’ve recommended using another browser or playing browser bingo, switching to a browser that will still function with the U2F requirements of the Ledger. 

The new current recommended action is to use our desktop wallets, which can be found on the [front page of our website](https://theqrl.org/) and our [github releases page](https://github.com/theQRL/qrl-wallet/releases/latest).

You can read more about the development of U2F tunnel transport for Ledger devices in their blog [Windows 10 Update: Sunsetting U2F tunnel transport for Ledger devices](https://www.ledger.com/2019/05/17/windows-10-update-sunsetting-u2f-tunnel-transport-for-ledger-devices/).

:::info
If you have attempted to send a TX with your ledger device connected to a Chrome, Brave, Opera, or Firefox browser and are showing and erroneous OTS key, you can reset the ledger device OTS key count. See the tools section of your opened wallet using the desktop application. **Make Sure you have not used any keys successfully prior to resetting the ledger** 
:::
