---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: check-wallet-balance
title: Check QRL Wallet Balance
hide_title: false
hide_table_of_contents: false
sidebar_label: Check Wallet Balance
sidebar_position: 2
pagination_label: Check Wallet Balance
custom_edit_url: https://github.com/theQRL/documentation/edit/main/docs/Wallet/qrl-wallet.md
description: Check Wallet Balance
keywords:
  - docs
  - wallet
  - balance
image: /assets/img/icons/yellow.png
slug: /wallet/check-wallet-balance
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::

The blockchain holds all balance information on any QRL wallet address and is the source of truth, be it a mobile wallet, web, or ledger address. Every time a transaction is sent to or from an address it is recorded on the chain. To find an address balance a lookup must be performed on the blockchain. There are several tools to make this lookup simple.

## Balance Lookup

The easiest method of looking up a QRL address balance is to plug the public address into the [QRL Block Explorer](https://explorer.theqrl.org). The Block Explorer provides a user interface through the web page, allowing the user to lookup blockchain details. 



### QRL Block Explorer

To check the balance of a wallet browse to the [QRL Explorer](https://explorer.theqrl.org) and enter your address into the search field.

##### Search Address

Enter the QRL public address into the search bar in the top of the Explorer. Should start with a `Q` and will not allow anyone to open the address. The explorer will return all pertaining information on the address found on the blockchain.

:::note 
Public QRL Address: `Q01040007a591a62c23ed27adfe3df8eb812ee5e4b73e47fb8471e8d78ecd9b4cadc325ca36d86e`

Additional information on our [Public Addresses can be found here.](developers/address/qrl-address-scheme#public-address-structure) Make sure that the secret key is never exposed!
:::

A wallet address is not seen until some transaction is sent to or from the address. Until then it is unknown to the chain.

:::note 
For more information and full documentation head over to the [Block Explorer Documentation](tools/explorer)
:::

You can enter QRL addresses, transaction hashes, or block indexes into this field.

This will show you the current balance and all transactions that have happened with this wallet.

##### Meta Info

At the bottom left there is a **meta** button. This will give fine grain details for the current wallet.



### QRL Wallet

The wallet allows a user to lookup the address balance once the secret keys have been loaded. This is not recommended for only a balance lookup as the secret keys are exposed, even slightly to the system in order to open the wallet.

1. Open Wallet using the wallet application of choice. [See the wallet documentation here](/wallet)
2. The wallet will load the address and show the balance available to send. (This balance will match the [block explorer](#qrl-block-explorer) lookup method)

### QRL Command line

Using a terminal with qrl installed you can simply enter `qrl wallet_ls` to get the balance from the same directory as your wallet.json file. Specify the directory containing a wallet to lookup with the `--wallet_dir` flag.

```bash
$ qrl wallet_ls 
Wallet at          : /home/qrl/
Number  Address                                                                            Balance      
-----------------------------------------------------------------------------------------------------
0       Q01040007a591a62c23ed27adfe3df8eb812ee5e4b73e47fb8471e8d78ecd9b4cadc325ca36d86e    10.00009990   

```
:::tip
for more info on installing QRL see the doc [here](/node/QRLnode)
:::
