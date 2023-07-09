---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: ledger-wallet-new
title: Ledger Wallet - New
hide_title: false
hide_table_of_contents: false
sidebar_label: New
sidebar_position: 2
pagination_label: Ledger Wallet - New
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: Create a new address using a Ledger device.
keywords:
  - docs
  - wallet
  - ledger
  - New
image: /assets/img/icons/yellow.png
slug: /use/wallet/ledger/new
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


## Installing the QRL Application

Using the [Ledger Live](https://www.ledger.com/pages/ledger-live) application, follow these instructions:

1. Open the **Manager** in Ledger Live
2. **Connect and Unlock** your Ledger Nano
3. Allow the Manager on your Ledger Nano device by pressing the right button when asked
4. Search the App catalog for **QRL**, and click the **Install** button next to the QRL app.
    - An installation window will appear, and your device will display **Processing...**
    - The QRL App installation has completed on your Ledger Nano

## Initializing the QRL App

Before you can use the QRL Ledger Nano App, it must first be initialized. The initialization process will generate an XMSS tree on your Ledger Nano device, which is a unique aspect of the QRL Network's signature scheme. This process only has to be completed once on your Ledger Nano device. Please allow up to 45 minutes for this process to complete for each tree. 

To initialize your Ledger Nano device for use with the QRL App, follow these instructions:

1. Make sure your Ledger Nano device is **Connected** and **Unlocked**.
2. Open the **QRL app** on your Ledger Nano
3. Your Ledger Nano device will show **QRL (Tree 1) not ready**. 
4. Scroll down and press both buttons on the **Init Tree** menu option.
5. Your Ledger Nano device will show **QRL (Tree 1) keygen: 001/256**. This will slowly progress until all 256 keys have been generated.
6. When this process has completed, your Ledger Nano device will show **QRL (Tree 1) READY rem:256** - indicating your device has finished generating tree 1 OTS keys, and you have 256 OTS Keys remaining in this Tree.
7. Scroll down in the menu and chose **Switch Tree** with both buttons. You will now see **QRL (Tree 2) Not Ready**
8. Initialize Tree 2 following the same steps above. Again this process will take about 45 minuets to complete.

:::info
Generating XMSS Tree 1 on the Ledger. This will take a while, have patience. ![Initializing Tree 1](assets/init-crop1.gif) 
:::

Your Ledger Nano device has been initialized for the QRL app, and contains 2 addresses (XMSS Trees) ready to deposit funds to. 2 addresses contain 256 OTS keys each which can be used to sign transactions on the QRL network.


| QRL Tree | OTS Keys | Address |
|-----|-----|-----| 
| Tree 1 | 256 OTS | Q00040043096f536b68eb36ec3~~fe577d33e78f3c |
| Tree 2 | 256 OTS | Q000400c722c2198837153a697~~5ee40365da6ee2 |

## Accessing Wallet with Ledger

1. Make sure your Ledger Nano device is **Connected**, **Unlocked** and the **QRL App is Open**.
2. Select the tree to open by scrolling to **Switch Tree** in the QRL menu.
3. Open the QRL desktop wallet.
4. Click **Open Wallet** on the left hand menu.
5. On the right hand side, select **Ledger Nano** in the drop down menu.
6. Click the **Open Ledger Nano** button.


This will present you with the unlocked QRL wallet ready to send or receive funds.

:::note
Ubuntu users may run into issues connecting to their Ledger devices. Please reference [this article *Fix-connection-issues*](https://support.ledger.com/hc/en-us/articles/115005165269-Fix-connection-issues) from Ledger explaining the issue and solution.
:::

:::note
Chrome Users, there is a bug with chrome that will not allow the Ledger to work. Please use another application or download the [qrl wallet](https://theqrl.org)
:::

:::note
If you are a Firefox user, ensure you have enabled **u2f** before proceeding. [Enabling U2F support in Mozilla Firefox](https://support.yubico.com/support/solutions/articles/15000017511-enabling-u2f-support-in-mozilla-firefox)
:::
