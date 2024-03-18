---
id: slave-keys
title: QRL Slave Keys
hide_title: false
hide_table_of_contents: false
sidebar_label: Slave Keys
sidebar_position: 5
pagination_label: Slave Keys
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Build/Address/slaves.md
description: Overview of the QRL Slave Key addresses.
keywords:
  - docs
  - advanced
  - Slave Keys
image: /assets/img/icons/yellow.png
slug: /build/address/slave-keys
---

The QRL wallet is an XMSS Merkle tree constructed using the private key to generate leaves of this tree. 

Each "leaf" can also authorize an additional tree of OTS keys (Slave address) that can be used to sign transactions. This allows further expansion of a QRL wallet extending the number of transactions you can process before needing to regenerate a new wallet.

An address generates additional addresses or slaves addresses, and sends a corresponding [`RelaySlaveTxn`](/api/wallet-api#relayslavetxn) to the blockchain giving authorization to the new slave addresses to access all funds and assets associated with the master address. 

This delegates authority to the slaves allowing an additional pool of OTS keys to be used to send transactions with. By allowing these additional OTS key index "pools" a once limited address becomes intrinsically infinite while still utilizing the core benefits of the underlying XMSS cryptography.

:::info
An understanding of the unique QRL cryptography, OTS key indexes, and overall address construction is recommended.
Slave addresses are advanced and are not usually needed for most users!
:::

## Overview

A slave key is generated using the [QRL command line tools](/use/node/node-cli/node-cli-slave-xmss) or via the API.

This process is similar to generating a QRL address and will output a slaves.json file which contains the private keys for each slave generated (Up to 100).

Once generated these newly generated slave addresses need to be submitted to the network signed by the address we intend to use the slaves for.

the `RelaySlaveTxn` will submit the public addresses in the body of the transaction and once mined into a block these addresses will be allowed to send on behalf of the master address.

Funds will still need to be deposited into the master address, and the slaves key file is critically important to using the slaves as that is where the secret key information is stored. Without the private keys the slaves will not be able to be used.

:::info
The [automatic slave address system utilized in the walletd-rest-proxy](/api/walletd-rest-proxy#automatic-slave-transactions) will store the slaves key information for retrieval and usage in the default `~/.qrl/walletd.json` file.
:::


### Using a Slave Address

To send a transaction with a slave address you will need to utilize either the QRL CLI tools or via an API call. 

#### Send Slave Transaction

The transaction will contain a few extra details than a normal transaction.

- The public key of the master address is still needed
- The Public key of the slave is needed (or slave address index)
- Access to the secret wallet information for the slave you are sending with
  - This varies depending on the method used to send the transaction

#### Receive Slave Transaction

To receive funds from a slave transaction nothing needs to happen different. The transaction should be sent to a master address (regular QRL address). 

There is no need to use a slave address to receive transactions as this function does not use any signatures from the receiving address. 

:::note
One can accept infinite transactions to an address without the need for a slave address.
:::