---
id: create-token
title: QRL Token - Create
hide_title: false
hide_table_of_contents: false
sidebar_label: Create
sidebar_position: 2
pagination_label: Token - Create
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Tools/tokens/create-token.md
description: Create new token on the QRL newtwork
keywords:
  - docs
  - tools
  - tokens
image: /assets/img/icons/yellow.png
slug: /use/tools/tokens/create
---

The QRL supports QRT or Quantum Resistant Ledger Tokens. These tokens share the same cryptography and Quantum Resistance as the main QRL blockchain. 

You can create tokens either by using the `qrl` command line, API, or through a GUI by browsing to the qrl web wallet application hosted at [https://wallet.theqrl.org](https://wallet.theqrl.org). 

Open your wallet, or create a new one to begin with this guide.

### Token Creation

Creating a new token is easy. Once you have all of the details entered and the fee paid, the network takes care of the rest. 

To create a token you will need to provide the following information:

| Field |  Details | 
| :--: |  :--- |
| `Owner Address` |  Address shown to be the owner of the token, different from the initial token holding addresses |
| `Token Symbol` |  User defined Token symbol, max length $10$ $bytes$ |
| `Token Name` |  User defined Token name, max length $30$ $bytes$ |
| `Decimals` |  Amount of decimals supported for the token, max $9$ or $(10 ** 9)$|
| `Holder Balance` |  Array of initial token receiver's address and initial balance, limited to 100 QRL addresses |
| `Token Creation Fee` |  Initial token creation transaction fee set at the default $100$ $shor$|
| `OTS Key Index` |  This function will auto increment the OTS key from the last used. Otherwise a specific OTS Key can be used for this token transaction. |

The "Holder Balance" field allows you to select the address(es) that will receive the initial tokens. You can add up to 100 QRL addresses. 

Once you have filled in all of the necessary details, click the create token button at the bottom of the form. 

This will broadcast the creation of your token across the QRL network and send the newly minted tokens to the addresses specified.

You will see a confirmation page that shows the details of the transaction. Verify the information is correct and press "Confirm Token Creation"

The confirmation screen will print the details of the transaction.

### Checking Token Balance

You can check the balance of any tokens you have in your wallet by selecting the tokens tab in the top bar of the "Send and Receive" tab in the web wallet.

You can also see the recent transactions on the right of the balance screen.

You can receive tokens at your main QRL address, no need for anything special to receive.