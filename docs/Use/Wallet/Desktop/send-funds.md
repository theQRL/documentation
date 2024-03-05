---
id: desktop-wallet-send
title: QRL Desktop Wallet - Send
hide_title: false
hide_table_of_contents: false
sidebar_label: Send
sidebar_position: 6
pagination_label: Desktop Wallet - Send
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Wallet/Desktop/send-funds.md
description: Desktop Wallet - Send Funds
keywords:
  - docs
  - wallet
  - Desktop
  - Send Funds
image: /assets/img/icons/yellow.png
slug: /use/wallet/desktop/send
---

Send funds using the desktop wallet:

It is assumed you have already installed the application on your computer and have opened a wallet address containing funds. Please see our guides to [check a QRL balance](/use/wallet/check-balance) or to [receive QRL](/use/wallet/overview).

1. With an open wallet, select the Send & Receive tab
2. Enter the recipient's public QRL address in the Recipient field
3. Enter the amount to send to the recipient *(optionally you can enter up to 99 addresses as recipients)*
4. Enter the fee to use *(can be left default)*
5. Ensure the [OTS key](/build/fundamentals/ots-keys) is not already used or enter an unused key index
6. Confirm transaction details are valid, if so select send transaction




The process of sending QRL to another address using the QRL Desktop wallet is simple and secure. 

You must have the private recovery key medium to access your wallet, funds in your address, and the Public address of the recipient.

:::info
Use [this guide to open the QRL desktop wallet](/use/wallet/desktop/open) using recovery keys to access your wallet.
:::

## Send Quanta

With an open QRL Desktop wallet, select the "**Send & Receive**" tab on the left (*Default tab when you open a wallet*)

To send QRL there are four (4) fields you need to fill in:

| Field |  Description  |
|:-----|:--| 
| **Recipient Address** | A valid QRL address to receive funds from you |
| **Amount** | How much QRL to send to recipient |
| **Fee** | How much you are paying to broadcast this transaction onto the network |
| **OTS Key Index** | Enter an unused [One Time Signature OTS Key](/build/fundamentals/ots-keys) for signing the transaction |

:::info
Keep track of used OTS Keys! The desktop wallet will keep track of your OTS key index for you from the blockchain, but it is good practice to write this number down after each use.
:::

Once all of this information has been entered correctly select the "**Confirm**" button at the bottom of the form. This will gather all of the transaction data and sign the transaction for broadcasting to the chain. 

### Broadcast Transaction

On the next page, verify everything looks correct, and if so select "**Click To Send**", to relay the transaction into the QRL network.

The transaction will be propagated across the QRL network and deposited into the address you entered. Your screen will show the confirmation details as the transaction is sent. 
 

## Confirm Transaction

To confirm a transaction was sent and accepted by the network from an open QRL Web Wallet, select the transaction in the list to show details.

Additionally you can enter the transaction hash or ID into the tab "**Verify Transaction**". This will give various data on the transaction and show the number of confirmations (*blocks*) that have been seen since this transaction was sent. 

:::note Example transaction hash
_60a3d4ee64291a0d8c56a3e2092e6f32e7234c943c10d633754c1dd850153365_
:::

Additionally you can browse to the [QRL Block explorer](https://explorer.theqrl.org) to further confirm the transaction was seen on the network.

More information can be found in the [QRL Block Explorer documentation](/use/tools/explorer/overview)



## Receiving Quanta


To receive Quanta to a QRL Address, you simply need to provide the sending party your public address that corresponds to the private keys used to access the wallet address.

You don't need to have the wallet opened in order to receive QRL.

### Locate Public Address

You can access your public address through the QRL Desktop Wallet. 

Open your wallet and the public address will be shown in the top of the "**Send & Receive**" tab.

Click the receive tab in the wallet and you will see your wallet address and QR code with additional wallet information. 

Send this **Public Key** to whomever you are receiving coins from.

:::note A typical public key, or wallet address address is represented as follows:
_Q000400202ea4dc2b83ded8cfcd4fc8c0447ca3391582430cec6b093291ab9773173af1bb5ed7e8_
:::