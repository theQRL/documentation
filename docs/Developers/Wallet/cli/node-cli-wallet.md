---
id: node-cli-wallet
docstatus: DRAFT
title: QRL Node CLI Wallet
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL Node CLI Wallet
sidebar_position: 1
pagination_label: QRL Node CLI Wallet
custom_edit_url: https://github.com/theqrl/documentation/edit/master/docs/basics/what-is-qrl.md
description: The QRL Ledger Node CLI Wallet documentation
keywords:
  - docs
  - wallet
  - CLI
  - Node
image: /assets/img/icons/yellow.png
slug: /Build/wallet/cli/node-cli-wallet
---


:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::

Interacting with the QRL network can be done utilizing the CLI interface. This will allow you to complete some more advanced tasks on the network. Using the CLI is easy and there is a great `--help` section to guide you along.

Using the QRL command line utility we will show you how to:
* Create a new wallet
* Print your Mnemonic phrase and Hexseed
* Recover wallet from hexseed/mnemonic
* Sending QRL
* Adding and Removing addresses
* Advanced wallet functions
    * Generate a slaves.json file
    * Create QRT (Tokens)
    * Send QRT's
    

:::tip
It is recommended that you have a local working installation of QRL in order to use the CLI. See the Node installation instructions to get started today. 

It's also possible to connect to a remote node that has allowed external connections. Use the `--host {REMOTE_IP_ADDRESS}` flag on the CLI to connect. 
:::


Follow the guide to setup a [QRL node](/node/QRLnode) if you haven't already. This is much more secure, and reliable way to interact with the QRL network.

## Create a Wallet

To create a new wallet you need to open a terminal connected to a computer running the QRL node that is fully synced with the network. Once you are connected you will use the `qrl` function to create and modify the QRL wallet. 


There are some options that can be configured for the new wallet. The default wallet created is sufficient for most needs, though for security you should encrypt the file at minimum.


### Default Wallet

To simply create the QRL wallet unencrypted and with a default tree height of 10 you can enter the following command:

```bash
qrl wallet_gen
```

This will create an open wallet file in your current working directory called `wallet.json`. This is an **unencrypted** wallet file. Anyone with access can use this to get your funds. Protect this file with your life

Upon creation the wallet address (Public Key) is printed to the CLI. Save it somewhere safe. 


:::info
This is not the recommended way of creating a wallet as the wallet is not encrypted. See below to add security to your wallet file.
:::


### Encrypted Wallet

To utilize the encryption features of the CLI wallet you need to pass the `--encrypt` flag to the above command to wrap some security around your wallet file. This will create an **AES** encrypted wallet file.

```bash
qrl wallet_gen --encrypt
```

This will prompt you for a password, ensure the password is of sufficient length and complexity. Enter twice to confirm the password is correct and the wallet will be created.

:::info
Alternatively if you have already created a wallet file in plain text, you can encrypt it still using the `qrl wallet_encrypt` function.
:::

With an encrypted wallet file you will be prompted to enter your password anytime you interact with the wallet.

### XMSS Tree Height

You may chose to create a wallet with more or less OTS keys used to sign transactions on the QRL network. The only disadvantage for creating a larger tree height is the time required to generate the additional keys. This can be configured only when a wallet is created.


|  Tree Height | Available Keys |
|: ---------:|:----------:|
| 8  | 256 |
| 10 |  1,024 | 
| 12 |  4,096 |
| 14 |  16,384 | 
| 16 |  65,536 |
| 18 |  262,144 | 


:::info
If needed a hypertree or `slaves.json` file can be created with up to 100 additional XMSS trees allowing for additional TX's using the same QRL address. For more information please see the [Slaves.json documentation](#)
:::


Building on the example from above, create an encrypted wallet with a tree height of 12

```bash
qrl wallet_gen --height 12 --encrypt
```

This will create an AES encrypted wallet.json file with 4,096 OTS keys available to use (2^12 OTS Keys)


```json title="example Unencrypted/encrypted wallet file"
//example Encrypted wallet file
{"addresses": [{"pk": null, "hexseed": "x2f6VpzajFS4ixWwDQM4PAMB6TWtWjNwpWVPnF3/iflx9qMh04JvcA/9drf6VVTXHlCqIBsmHjfTl/7lhKo7Y54psoHNVoWPqta6LJfkY2hr4aL68nK2mXqxDxiGfjBZ4ELPnpB+amQUMQ4cTl6sikDpyCNHww==", "mnemonic": "/YQkG+NBWUhZ7a0ziPzoQDOvtyJVduavViT6fl1frA7fXYvVQXty/Uqi3Wy9Whq5OiJCDcjS0UhwEwb18N1MflMEqo2lr1pBqvmfo74IXPTEedwe9zGwYBCFAosr7oFbUkEQa5VVmYAuP3Wqa5gHiiXoOpgK1U71Sb6N1OtTuYokAYqKnOgigsvVWtmICu5q05uV5LORoQ9FM/sMI/Db92pxN5Ceihe4A/DfeuN8LeKoC5tjiKvtW5qCCvMIzghvrJEWB/8EGAYtC7UbTrBXttZcb5FoTrtVX6vE/sM0lg==", "height": 8, "hashFunction": "shake128", "signatureType": 0, "index": 0, "address": "Q01040094e6916e412d5b9e8db40d12c8f8fd224a5a33a31c191850ca6a55b102fdbdcbdcc59819"}], "encrypted": true, "version": 1}


//example Unencrypted wallet file
{"addresses": [{"pk": null, "hexseed": "010400bc6ab22293abaa631fac6872cd1514aa7961e3de56766518158925ba97bebd50ca7855a5047eca0da6a9042171337ae4", "mnemonic": "absorb drank rust prone caller depict primal cowboy pulsar mare smoky five prime noble threat tile kedge flak berlin mutiny rose leap safer assume know gallop agony twelve audio hit agenda birch crisis quest", "height": 8, "hashFunction": "shake128", "signatureType": 0, "index": 0, "address": "Q01040094e6916e412d5b9e8db40d12c8f8fd224a5a33a31c191850ca6a55b102fdbdcbdcc59819"}], "encrypted": false, "version": 1}
```


### Hash Functions

QRL can utilize multiple hash functions, depending on the setting used during the creation of the wallet.

> By default the wallet will utilize the shake128 hash function if no configuration options are given. 

| Hash Function | Hash Algorithm | Description |
|:-----|:-----|:---------|
| shake128 | [SHA-3](https://en.wikipedia.org/wiki/SHA-3) | Default used in the web wallet |
| sha2_256 | [SHA-2](https://en.wikipedia.org/wiki/SHA-2) |  |
| shake256 | [SHA-3](https://en.wikipedia.org/wiki/SHA-3) |  |



> Which hash function is better to use is debatable, and they all have pros and cons. Most importantly the default can be changed if there is later a vulnerability found in the core cryptography of the hash function.
{: .info}

To select to a different hash function use the `--hash_function` option while generating a new wallet. The command below will create an encrypted wallet with a tree height of 10, using the `shake256` hash function.

```bash
qrl wallet_gen  --hash_function shake256 --encrypt
```

you can see the hash function of the wallet file by using the `wallet_ls` option with a `-v` verbose flag. It will be printed at the end of the command.

```bash
qrl -v wallet_ls
```


This will output something similar to this:

```bash title="wallet list output" {4}
Wallet at          : /home/ubuntu/QRL_TEST
Number  Address                                                                            Balance      Hash    
----------------------------------------------------------------------------------------------------------------
0       Q000600f1afe2a5d8247779795f0eb0d5225e5fe7b91bcb38c614b5a62fa3df0f5cfe92e6355ace    0.00000000   sha2_256
```
This will also print the available qrl balance and the wallet address. 


## Private Keys

Now that you have an encrypted QRL wallet file lets get the private key and mnemonic phrase from the wallet. 

This section will cover:
- Printing the Private key information (secret)
- Recovering a wallet from a private key / mnemonic

> You will need to have a QRL wallet already generated and know the passphrase used to secure the wallet.

In the same directory as your QRL wallet.json file enter the following command to print your private key information:

```bash 
qrl wallet_secret
```

This will prompt you `wallet idx [0]:` this is asking which address to use in the wallet.json file. If you only have one address, simply leave default and hit enter.

If the wallet file is encrypted you will then be prompted for the passphrase used to set up the wallet.

After successful decryption the private key information will be printed.

```bash
Wallet Address  : Q000600f1afe2a5d8247779795f0eb0d5225e5fe7b91bcb38c614b5a62fa3df0f5cfe92e6355ace
Mnemonic        : aback grape latest ace ferry bucket creak safety hour russia parade site donor yeast tunnel dusty odd dirt mutual you brine might two mercy shady print smite wrap swan common coat modify leave tort

Hexseed         : 0006007a70174ec1ec32abd66c2bc59ecc9a3eefe7ec14299903d2928ff01da8c0ecf8a6c46aa9ccffd4dbe2ee2d38e57c3e7a

```

This information is needed to recover your wallet file. Anyone with the private key information can unlock the wallet. Treat this as very sensitive information.

> It is recommended that you store a copy of your private keys in at least 2 physical locations in case of catastrophe. If lost no one can help you.


























## Recover Wallet


In order the recover a wallet, or load one onto a new computer you will need one of three things, an encrypted wallet.json file, the mnemonic phrase in the correct order, or the hexseed. Without one of these it is impossible to recover the wallet.

### wallet.json file

If you have the wallet.json file still, simply copy it over to the new machine and use the qrl functions as needed.


### Hexseed

To recover using the Mnemonic phrase use the `wallet_recover` command. By default the command will expect a hexseed:

```bash
{{ layout.v.qrlCommands.walletRecover }} 
```

You will be prompted for the hexseed you have saved. Ensure you enter it correctly. The wallet address will be printed and you will have a chance to save it. enter yes and your wallet will be recovered and saved into the directory you are currently in. 

> This will save your file as an **Unencrypted** wallet.json file. Make sure you encrypt this file with a secure passphrase you will not lose.
{: .warning}

```bash 
{{ layout.v.qrlCommands.walletEncrypt }} 
```

Follow the prompt to encrypt the file. 

### Mnemonic Phrase

To recover using the Mnemonic phrase use the `{{ layout.v.qrlCommands.walletRecover }}  --seed-type` command:

```bash
{{ layout.v.qrlCommands.walletRecover }} --seed-type mnemonic
```

You will be prompted for the mnemonic you have saved. Ensure you enter it correctly. The wallet address will be printed and you will have a chance to save it. enter yes and your wallet will be recovered and saved into the directory you are currently in.


> This will save your file as an **Unencrypted** wallet.json file. Make sure you encrypt this file with a secure passphrase you will not lose.
{: .warning}

```bash 
{{ layout.v.qrlCommands.walletEncrypt }} 
```

Follow the prompt to encrypt the file. 


## Send QRL

After you have a QRL address you can receive QRL to fund your wallet. Once you have a balance you can send the quanta to another address using the command line interface.

You will need to be in the same directory as your wallet.json file or specify where the file is using the `--wallet_dir` option.


Assuming you are in the same directory, enter the following:

```bash
{{ layout.v.qrlCommands.txTransfer }} 
```

This command will prompt you for the following information:


| Options | Data Format | Description |
|:--------|:------------|:------------|
| src | TEXT | signer QRL address |
| master | TEXT | master QRL address (for slave tx) |
| dst | TEXT | List of destination addresses |
| amounts | TEXT | List of amounts to transfer (Quanta) |
| fee | DECIMAL | fee in Quanta |
| ots_key_index | INTEGER | OTS key Index |


You can enter these options either in the command or by answering the prompt. Here is an example qrl transaction sending 5.5QRL to another QRL address giving all of the relevant information to the command line.

```bash
{{ layout.v.qrlCommands.txTransfer }} --src 0 --dst Q010500317ce502123c0de6711fd4ea6833ea360e95cb40af71944eea38da90bfb5d83740d01e50 --amounts 5.25 --fee 0.01 --ots_key_index 1
```
If your wallet.json file is encrypted enter your passphrase when prompted.

This will print something similar to below:

```bash
The wallet is encrypted. Enter password: 
error_code: SUBMITTED
tx_hash: "\206\024\244\025\215~\035\201\365\010k\304\'@\021c\0033\357(\3372\360\367r\271B\2009\337Po"

```


> Note the `error_code: SUBMITTED` is not an error. Submitted is a good thing, this is saying the transaction is posted.

After a little while the transaction will be propagated through the network and your quanta will be in another wallet.

To confirm the transfer of quanta went through browse to [explorer.theqrl.org](https://explorer.theqrl.org) and enter your address into the search field. You will see the recent transaction has confirmed and the quanta transfered.




## Add a QRL Address

Sometimes it can be nice to have more than one address in your wallet. You can add new addresses to the wallet after the wallet file is created by using the `wallet_add` command.


```bash
{{ layout.v.qrlCommands.walletAdd }}
```
If your wallet is encrypted you will be prompted for your passphrase. This will increment the wallet_idx by one every time you enter this command. The default settings will create a wallet with tree height 10 and use hash function shake128. 

If you require other settings you can enter them in the command line. The command below will create a wallet with tree height 18, using shake256 hash function. 

```bash
{{ layout.v.qrlCommands.walletAdd }} --height 18 --hash_function shake256

The wallet is encrypted. Enter password: 

Wallet at          : /home/ubuntu/.qrl
Number  Address                                                                            Balance      Hash    
----------------------------------------------------------------------------------------------------------------
0       Q000600f1afe2a5d8247779795f0eb0d5225e5fe7b91bcb38c614b5a62fa3df0f5cfe92e6355ace    239.98000000 sha2_256
1       Q010600898e7cc45431c95a1e5a415c0f3d223620332becd43db92727a4900472198650e1775e4b    0.00000000   shake128
2       Q0106006780bde5e3bbbfd8c59b5775fd0ac7fb3026027e9814b1d3062569146d1b52f349b86d53    0.00000000   shake128
3       Q02090081f7e33cc535ca6ca54305f7d34cf2cd9620b1efcae657a76ca4c072902dfc4ed0f23a4a    0.00000000   shake256

```


> If the wallet file is encrypted your new address will also be encrypted using the same passphrase you setup originally. 



### Remove a QRL Address

If you need to remove an old address from your wallet you can use the `wallet_rm` command. This will permanently remove the address. Without the private keys from the address you will not be able to recover this address. If you are not sure print the private keys and write them down **Before** you remove the address. 

```bash
{{ layout.v.qrlCommands.walletSecret }} --wallet-idx 2
```

To remove an address enter the following into the command line:

```bash 
{{ layout.v.qrlCommands.walletRemove }}
```

If you know the idx of the address you can specify by using the `--wallet-idx` option. 

You will be prompted for some information and the address will be removed from the wallet.

```bash
qrl -v wallet_rm --wallet-idx 2
You are about to remove address [2]: Q0106006780bde5e3bbbfd8c59b5775fd0ac7fb3026027e9814b1d3062569146d1b52f349b86d53 from the wallet.
Warning! By continuing, you risk complete loss of access to this address if you do not have a recovery Mnemonic/Hexseed.
Do you want to continue? [y/N]: y
Wallet at          : /home/ubuntu/.qrl
Number  Address                                                                            Balance      Hash    
----------------------------------------------------------------------------------------------------------------
0       Q000600f1afe2a5d8247779795f0eb0d5225e5fe7b91bcb38c614b5a62fa3df0f5cfe92e6355ace    239.98000000 sha2_256
1       Q010600898e7cc45431c95a1e5a415c0f3d223620332becd43db92727a4900472198650e1775e4b    0.00000000   shake128
2       Q02090081f7e33cc535ca6ca54305f7d34cf2cd9620b1efcae657a76ca4c072902dfc4ed0f23a4a    0.00000000   shake256
```

#### Transfer QRL Between Addresses

The process of sending QRL between addresses in the same wallet is exactly the same as above, you simply enter the second address. While the addresses may be in the same wallet, they are independent XMSS trees and require a transaction to send between.

```bash
{{ layout.v.qrlCommands.txTransfer }} --src 0 --dst Q02090081f7e33cc535ca6ca54305f7d34cf2cd9620b1efcae657a76ca4c072902dfc4ed0f23a4a --amounts 5.25 --fee 0.01 --ots_key_index 2
```

After the transaction has propagated through the network you will see the balance in the newly created wallet with the `qrl wallet_ls` command.

### Print QRL Addresses

To view all available addresses in the wallet index use:

```bash
{{ layout.v.qrlCommands.walletLs }}

Wallet at          : /home/ubuntu/QRL_TEST
Number  Address                                                                            Balance      
-----------------------------------------------------------------------------------------------------
0       Q000600f1afe2a5d8247779795f0eb0d5225e5fe7b91bcb38c614b5a62fa3df0f5cfe92e6355ace    234.72000000 
1       Q010600898e7cc45431c95a1e5a415c0f3d223620332becd43db92727a4900472198650e1775e4b    0.00000000   
2       Q02090081f7e33cc535ca6ca54305f7d34cf2cd9620b1efcae657a76ca4c072902dfc4ed0f23a4a    5.25000000
```
The wallet_idx is the number to the left in the output of the terminal. 



## CLI Help

All command line options have a help file available to assist in the use of the command. Simply add the `--help` option to the end of any command to see the help.

```bash
qrl --help

Usage: qrl [OPTIONS] COMMAND [ARGS]...

  QRL Command Line Interface

Options:
  -v, --verbose       verbose output whenever possible
  --host TEXT         remote host address             [127.0.0.1]
  --port_pub INTEGER  remote port number (public api) [19009]
  --wallet_dir TEXT   local wallet dir
  --json              output in json
  --version           Show the version and exit.
  --help              Show this message and exit.

Commands:
  slave_tx_generate    Generates Slave Transaction for the wallet
  state                Shows Information about a Node\'s State
  token_list           Fetch the list of tokens owned by an address.
  tx_inspect           Inspected a transaction blob
  tx_message           Message Transaction
  tx_multi_sig_create  Creates Multi Sig Create Transaction, that...
  tx_multi_sig_spend   Transfer coins from src to dsts
  tx_push              Sends a signed transaction blob to a node
  tx_token             Create Token Transaction, that results into...
  tx_transfer          Transfer coins from src to dsts
  tx_transfertoken     Create Transfer Token Transaction, which...
  wallet_add           Adds an address or generates a new wallet...
  wallet_decrypt
  wallet_encrypt
  wallet_gen           Generates a new wallet with one address
  wallet_ls            Lists available wallets
  wallet_recover       Recovers a wallet from a hexseed or mnemonic...
  wallet_rm            Removes an address from the wallet using the...
  wallet_secret        Provides the mnemonic/hexseed of the given...

```

You can browse even further into sub commands like:

```bash
{{ layout.v.qrlCommands.txTransfer }} --help

Usage: qrl tx_transfer [OPTIONS]

  Transfer coins from src to dsts

Options:
  --src TEXT               signer QRL address
  --master TEXT            master QRL address
  --dsts TEXT              List of destination addresses
  --amounts TEXT           List of amounts to transfer (Quanta)
  --message_data TEXT      Message (Optional)
  --fee DECIMAL            fee in Quanta
  --ots_key_index INTEGER  OTS key Index (1..XMSS num signatures)
  --help                   Show this message and exit.

```