---
id: address-lookup
title: Explorer Address Lookup
hide_title: false
hide_table_of_contents: false
sidebar_label: Address Lookup
sidebar_position: 2
pagination_label: Address Lookup
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Tools/explorer/address-lookup.md
description: QRL Explorer Address Lookup
keywords:
  - docs
  - tools
  - explorer
image: /assets/img/icons/yellow.png
slug: /use/tools/explorer/address-lookup
---

The address lookup tool is provided in the [QRL Explorer](https://explorer.theqrl.org) and is accessible using any modern browser. 

Looking up an address is a simple as entering the valid QRL address into the explorer search bar. This will browse to a screen that will print all relevant information on the address given, if found.


:::caution
A QRL address starts with a $Q$ and is 79 characters in length, ensure that you don't post your private keys! For more information on the QRL Address and Private keys, see the [QRL Address documentation](/use/wallet/qrl-address-overview).
:::


:::info
An address that has been created in a wallet, but has not interacted on the blockchain will not be shown in the explorer. Once there is a valid transaction with this address information will be shown.
:::


## Address Page

Once an address is entered, and if it is found on-chain, the resulting screen will print all information for the address as found on the blockchain. The balance, number of transactions, tree height, remaining signatures and all transactions will be shown for the given address.

### Balance

At the top is the current balance of the address shown in $Quanta$, the denominator for the QRL.

Additionally the balance is shown in approximate value of USD based on recent trades on the exchanges.

This includes all validated transactions that are found, if there are pending transactions you will need to wait for them to be validated and minted into a block to be shown here.

### Address Information

The information directly below the balance gives general information about the wallet address.

This includes:

- **Transactions** - Count of all transactions, incoming and outgoing, found for this address
- **Nonce** - The last used nonce for the address
- **Signature Scheme** - The signature scheme that was used to create the address 
- **Tree Height** - The tree height of the address
- **Total Signatures** - Total available OTS keys, or signatures for the address
- **Signatures Remaining** - Remaining signatures or OTS Keys
- **Hash Function** - The hash function that was used to create the address

## Address Page Tabs

Below the general address information is a list of tabs that hold information about various features of the address. 

### Quanta

This is the list of transactions that have modified the $quanta$ balance of the address, or `transfer_tx` types of transactions on chain. This includes any sent or received $quanta$ related to the address.

This list is paginated, browse through each page to see all historical transactions from the address. 

### Tokens

This tab will show all of the tokes associated to an address. This will include any that have been created by the address, as well as any that were sent to the address from other parties.

### NFT's

This tab will show all of the NFT's owned by the given address

### OTS

This tab shows all OTS keys that have been used, and the remaining OTS keys available based on chain information.

Keys may have been sent to the mempool without being accepted in a block, so this list should be referred to only as a reference. Managing a personal list of OTS keys used should be done as good practice to avoid any key reuse.

:::info
See the [One Time Signature Key documentation](/build/fundamentals/ots-keys) for more information on the OTS key system and the importance of not re-using OTS keys.
:::


### Slaves

The last tab shows all slave addresses that may be associated with an address.

These are extensible addresses that have been created through advanced tooling to extend the available number of transactions that an address can send. Most addresses will not have anything here for typical users.

:::info
See the [Slave Keys documentation](/build/address/slave-keys) for more on the extensible addresses available on the QRL network, and how we solved the issue of OTS key use in large transaction systems, such as exchanges and mining pools.
:::

