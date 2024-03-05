---
id: node-cli-usage
title: Node CLI Usage
hide_title: false
hide_table_of_contents: false
sidebar_label: Node CLI Usage 
sidebar_position: 1
pagination_label: Node CLI Usage
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Tutorials/Node/node-cli-usage.md
description: Tutorial for using the public API.
keywords:
  - tutorials
  - Node-CLI
image: /assets/img/icons/yellow.png
slug: /tutorials/node/node-cli-use
---

This tutorial covers some basic usage and gives an example of the wallet functions using the QRL Node command line tools.

These tools are available by installing the QRL node on your computer. You do not necessarily need a synced QRL node locally to perform all of these functions.

Anything that is off-chain like creating and encrypting an address can be done without connection to a node.

For the rest of the functions you will need access to a node with the public API port 19009 available.

For individual use you can try to use one of the foundations nodes

| Mainnet |  Testnet |
| :--: | :--: | 
| `mainnet-1.automated.theqrl.org:19009` |  `testnet-1.automated.theqrl.org:29009` | 
| `mainnet-2.automated.theqrl.org:19009` |  `testnet-2.automated.theqrl.org:29009` | 
| `mainnet-3.automated.theqrl.org:19009` |  `testnet-3.automated.theqrl.org:29009` | 
| `mainnet-4.automated.theqrl.org:19009` |  `testnet-4.automated.theqrl.org:29009` | 


## Wallet Functions

These functions apply to the 

### wallet_gen

To create a new wallet you need to open a terminal connected to a computer running the QRL node that is fully synced with the network. Once you are connected you will use the `qrl` function to create and modify the QRL wallet. 

:::tip
There are options that can be configured for the new wallet. The default wallet created is sufficient for most needs, though for security you should encrypt the file at minimum.
:::

To simply create the QRL wallet unencrypted and with a default tree height of 10 you can enter the following command:

```bash
qrl wallet_gen
```

This will create an open wallet file in your current working directory called `wallet.json`. This is an **unencrypted** wallet file. Anyone with access can use this to get your funds. Protect this file with your life

Upon creation the wallet address (Public Key) is printed to the CLI. Save it somewhere safe. 

:::info
This is not the recommended way of creating a wallet as the wallet is not encrypted. See below to add security to your wallet file.
:::

#### Generate an Encrypted Wallet

To utilize the encryption features of the CLI wallet you need to pass the `--encrypt` flag to the above command to wrap some security around your wallet file. This will create an **AES** encrypted wallet file.

```bash
qrl wallet_gen --encrypt
```

This will prompt you for a password, ensure the password is of sufficient length and complexity. Enter twice to confirm the password is correct and the wallet will be created.

:::info
Alternatively if you have already created a wallet file in plain text, you can encrypt it still using the [`qrl wallet_encrypt`](#wallet_encrypt) function.
:::

With an encrypted wallet file you will be prompted to enter your password anytime you interact with the wallet.

#### XMSS Tree Height

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

```json title="example encrypted wallet file"
//example Encrypted wallet file
{"addresses": [{"pk": null, "hexseed": "x2f6VpzajFS4ixWwDQM4PAMB6TWtWjNwpWVPnF3/iflx9qMh04JvcA/9drf6VVTXHlCqIBsmHjfTl/7lhKo7Y54psoHNVoWPqta6LJfkY2hr4aL68nK2mXqxDxiGfjBZ4ELPnpB+amQUMQ4cTl6sikDpyCNHww==", "mnemonic": "/YQkG+NBWUhZ7a0ziPzoQDOvtyJVduavViT6fl1frA7fXYvVQXty/Uqi3Wy9Whq5OiJCDcjS0UhwEwb18N1MflMEqo2lr1pBqvmfo74IXPTEedwe9zGwYBCFAosr7oFbUkEQa5VVmYAuP3Wqa5gHiiXoOpgK1U71Sb6N1OtTuYokAYqKnOgigsvVWtmICu5q05uV5LORoQ9FM/sMI/Db92pxN5Ceihe4A/DfeuN8LeKoC5tjiKvtW5qCCvMIzghvrJEWB/8EGAYtC7UbTrBXttZcb5FoTrtVX6vE/sM0lg==", "height": 8, "hashFunction": "shake128", "signatureType": 0, "index": 0, "address": "Q01040094e6916e412d5b9e8db40d12c8f8fd224a5a33a31c191850ca6a55b102fdbdcbdcc59819"}], "encrypted": true, "version": 1}
```

```json title="example Unencrypted wallet file"
//example Unencrypted wallet file
{"addresses": [{"pk": null, "hexseed": "010400bc6ab22293abaa631fac6872cd1514aa7961e3de56766518158925ba97bebd50ca7855a5047eca0da6a9042171337ae4", "mnemonic": "absorb drank rust prone caller depict primal cowboy pulsar mare smoky five prime noble threat tile kedge flak berlin mutiny rose leap safer assume know gallop agony twelve audio hit agenda birch crisis quest", "height": 8, "hashFunction": "shake128", "signatureType": 0, "index": 0, "address": "Q01040094e6916e412d5b9e8db40d12c8f8fd224a5a33a31c191850ca6a55b102fdbdcbdcc59819"}], "encrypted": false, "version": 1}
```
#### Hash Functions

QRL can utilize multiple hash functions, depending on the setting used during the creation of the wallet.

By default the wallet will utilize the shake128 hash function if no configuration options are given. 

| Hash Function | Hash Algorithm | Description |
|:-----|:-----|:---------|
| shake128 | [SHA-3](https://en.wikipedia.org/wiki/SHA-3) | Default used in the web wallet |
| sha2_256 | [SHA-2](https://en.wikipedia.org/wiki/SHA-2) |  |
| shake256 | [SHA-3](https://en.wikipedia.org/wiki/SHA-3) |  |

:::info
Choosing the best hash function is debatable, all have pros and cons. Perfectly acceptable and secure to leave at default or select either additional hash function.
:::

To select to a different hash function use the `--hash_function` option while generating a new wallet. The command below will create an encrypted wallet with a tree height of 10, using the `shake256` hash function.

```bash
qrl wallet_gen  --hash_function shake256 --encrypt
```

you can see the hash function of the wallet file by using the `wallet_ls` option with a `-v` verbose flag. It will be printed at the end of the command.





### wallet_add

QRL allows additional addresses to be added to the wallet after the wallet file is created by using the `wallet_add` command. This

This command will generate a new address and create a new wallet.json file if none are found. If a wallet.json file already exists an additional address will be added to the file.


```bash
qrl wallet_add
```
If your wallet is encrypted you will be prompted for your passphrase. This will increment the wallet_idx by one every time you enter this command. The default settings will create a wallet with tree height 10 and use hash function shake128. 

If you require other settings you can enter them in the command line. The command below will create a wallet with tree height 18, using shake256 hash function. 

If the wallet file is encrypted the new address will also be encrypted using the same passphrase you setup originally. A prompt will ask for the wallet passphrase if encrypted. Plaintext wallets will simply add the new address to the JSON file.

```bash
qrl wallet_add --height 18 --hash_function shake256

The wallet is encrypted. Enter password: ******
```

```bash
Wallet at          : /home/ubuntu/.qrl
Number  Address                                                                            Balance      Hash    
----------------------------------------------------------------------------------------------------------------
0       Q000600f1afe2a5d8247779795f0eb0d5225e5fe7b91bcb38c614b5a62fa3df0f5cfe92e6355ace    239.98000000 sha2_256
1       Q010600898e7cc45431c95a1e5a415c0f3d223620332becd43db92727a4900472198650e1775e4b    0.00000000   shake128
2       Q0106006780bde5e3bbbfd8c59b5775fd0ac7fb3026027e9814b1d3062569146d1b52f349b86d53    0.00000000   shake128
3       Q02090081f7e33cc535ca6ca54305f7d34cf2cd9620b1efcae657a76ca4c072902dfc4ed0f23a4a    0.00000000   shake256

```


### wallet_decrypt

Decrypt the wallet.json file, overwriting with plaintext key data.

:::caution exposed secret keys
Storing a plaintext wallet file is not recommend. Store the wallet.json in an encrypted state for best security practices.
:::

```bash
qrl wallet_decrypt
```

```bash
Decrypting wallet at /home/fr1t2/wallet.json

Enter password:
```

Inspecting the wallet.json file with a text editor, the end of the file will state `"encrypted": false`. This file is now plaintext and anyone with access can spend funds from the addresses contained.

### wallet_encrypt

This will overwrite the wallet.json file given with encrypted data. The passphrase used will be required to unlock the file at a later date. This cannot be reversed without the passphrase after.

:::warning Store the Passphrase
Please take care to store the encryption passphrase somewhere safe to access the wallet at a later date.
:::

```bash
qrl wallet_encrypt
```

```bash
Encrypting wallet at /home/fr1t2/wallet.json

Enter password: 
Repeat for confirmation:
```


The wallet file is now encrypted. Check the details using any text editor, the keys and address are random data and the end of the file contains `"encrypted": true`. This data can only be access using the passphrase setup during encryption.



### wallet_ls

To list all of the available wallets in a `wallet.json` file use the `wallet_ls` command. This will parse the json file and return the details for the addresses contained including any balance information for the address.


```bash
qrl -v wallet_ls
```

This will output something similar to this:

```bash title="wallet list output"
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


:::tip
You will need to have a QRL wallet already generated and know the passphrase used to secure the wallet.
:::

In the same directory as your QRL wallet.json file enter the following command to print your private key information:

```bash 
qrl wallet_secret
```

This will prompt you `wallet idx [0]:` asking which address to use in the wallet.json file. If you only have one address, simply leave default and hit enter. If you have multiple addresses and are not sure which `idx []` to use see the [wallet_ls](#wallet_ls-list) function

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
qrl wallet_recover
```

You will be prompted for the hexseed you have saved. Ensure you enter it correctly. The wallet address will be printed and you will have a chance to save it. enter yes and your wallet will be recovered and saved into the directory you are currently in. 

> This will save your file as an **Unencrypted** wallet.json file. Make sure you encrypt this file with a secure passphrase you will not lose.
{: .warning}

```bash 
qrl wallet_encrypt
```

Follow the prompt to encrypt the file. 

### Mnemonic Phrase

To recover using the Mnemonic phrase use the `{{ layout.v.qrlCommands.walletRecover }}  --seed-type` command:

```bash
qrl wallet_recover --seed-type mnemonic
```

You will be prompted for the mnemonic you have saved. Ensure you enter it correctly. The wallet address will be printed and you will have a chance to save it. enter yes and your wallet will be recovered and saved into the directory you are currently in.


> This will save your file as an **Unencrypted** wallet.json file. Make sure you encrypt this file with a secure passphrase you will not lose.
{: .warning}

```bash 
qrl wallet_encrypt
```

Follow the prompt to encrypt the file. 

## Send QRL

After you have a QRL address you can receive QRL to fund your wallet. Once you have a balance you can send the quanta to another address using the command line interface.

You will need to be in the same directory as your wallet.json file or specify where the file is using the `--wallet_dir` option.

Assuming you are in the same directory, enter the following:

```bash
qrl tx_transfer 
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
qrl tx_transfer --src 0 --dst Q010500317ce502123c0de6711fd4ea6833ea360e95cb40af71944eea38da90bfb5d83740d01e50 --amounts 5.25 --fee 0.01 --ots_key_index 1
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

To confirm the transfer of quanta went through browse to [explorer.theqrl.org](https://explorer.theqrl.org) and enter your address into the search field. You will see the recent transaction has confirmed and the quanta transferred.





## Remove a QRL Address

If you need to remove an old address from your wallet you can use the `wallet_rm` command. This will permanently remove the address. Without the private keys from the address you will not be able to recover this address. If you are not sure print the private keys and write them down **Before** you remove the address. 

```bash
qrl wallet_secret --wallet-idx 2
```

To remove an address enter the following into the command line:

```bash 
qrl wallet_rm
```

If you know the idx of the address you can specify by using the `--wallet-idx` option. 

You will be prompted for some information and the address will be removed from the wallet.

```bash
qrl -v wallet_rm --wallet-idx 2
```

```bash
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

## Transfer QRL Between Addresses

The process of sending QRL between addresses in the same wallet is exactly the same as above, you simply enter the second address. While the addresses may be in the same wallet, they are independent XMSS trees and require a transaction to send between.

```bash
qrl tx_transfer --src 0 --dst Q02090081f7e33cc535ca6ca54305f7d34cf2cd9620b1efcae657a76ca4c072902dfc4ed0f23a4a --amounts 5.25 --fee 0.01 --ots_key_index 2
```

After the transaction has propagated through the network you will see the balance in the newly created wallet with the `qrl wallet_ls` command.

## Print QRL Addresses

To view all available addresses in the wallet index use:

```bash
qrl wallet_ls

Wallet at          : /home/ubuntu/QRL_TEST
Number  Address                                                                            Balance      
-----------------------------------------------------------------------------------------------------
0       Q000600f1afe2a5d8247779795f0eb0d5225e5fe7b91bcb38c614b5a62fa3df0f5cfe92e6355ace    234.72000000 
1       Q010600898e7cc45431c95a1e5a415c0f3d223620332becd43db92727a4900472198650e1775e4b    0.00000000   
2       Q02090081f7e33cc535ca6ca54305f7d34cf2cd9620b1efcae657a76ca4c072902dfc4ed0f23a4a    5.25000000
```
:::tip
The `wallet_idx` used in various commands is the number to the left in the output of the terminal. 
:::