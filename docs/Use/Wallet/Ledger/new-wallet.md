---
id: ledger-wallet-new
title: Ledger Wallet - New
hide_title: false
hide_table_of_contents: false
sidebar_label: New
sidebar_position: 2
pagination_label: Ledger Wallet - New
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Wallet/Ledger/new-wallet.md
description: Create a new address using a Ledger device.
keywords:
  - docs
  - wallet
  - ledger
  - New
image: /assets/img/icons/yellow.png
slug: /use/wallet/ledger/new
---

## Installing the QRL App

Using the [Ledger Live](https://www.ledger.com/ledger-live) application, [follow these instructions](https://support.ledger.com/hc/en-us/articles/360019184453?support=true):

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
| Tree 1 | 256 OTS | Q00040043096...577d33e78f3c |
| Tree 2 | 256 OTS | Q000400c722c...e40365da6ee2 |

