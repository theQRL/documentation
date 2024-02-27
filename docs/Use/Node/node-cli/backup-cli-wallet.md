---
id: backup-cli-wallet
docstatus: 90%
title: Node CLI Wallet - Backup
hide_title: false
hide_table_of_contents: false
sidebar_label: Backup
sidebar_position: 2
pagination_label: Node CLI Wallet - Backup
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Node/node-cli/backup-cli-wallet.md
description: Backup a QRL Node CLI wallet address using the node CLI tools
keywords:
  - docs
  - wallet
  - CLI
  - Node
  - node-cli
  - Backup
image: /assets/img/icons/yellow.png
slug: /use/node/node-cli/backup-cli-wallet
---

Backing up a QRL CLI wallet is similar to the GUI wallets offered. Print the secret keys and store them somewhere safe. 

Additionally the `wallet.json` file can be encrypted using AES encryption and stored digitally until needed. 

:::tip 
It's recommended that you store a copy of your private keys in at least 2 physical locations in case of catastrophe.
:::

## wallet.json Secrets

Secret keys are stored in a `wallet.json` file when an address is created using the QRL CLI. This wallet file is the same as what is generated in the web wallet and can be loaded there as well. 

If the `wallet.json` is stored in plain text, unencrypted the secret keys are simply contained in a JSON array inside of the file. 

open or print the contents of the `wallet.json` file to get the secret keys, `cat wallet.json`

```bash {}
{"addresses": [{"pk": null, "hexseed": "010400bc6ab22293abaa631fac6872cd1514aa7961e3de56766518158925ba97bebd50ca7855a5047eca0da6a9042171337ae4", "mnemonic": "absorb drank rust prone caller depict primal cowboy pulsar mare smoky five prime noble threat tile kedge flak berlin mutiny rose leap safer assume know gallop agony twelve audio hit agenda birch crisis quest", "height": 8, "hashFunction": "shake128", "signatureType": 0, "index": 0, "address": "Q01040094e6916e412d5b9e8db40d12c8f8fd224a5a33a31c191850ca6a55b102fdbdcbdcc59819"}], "encrypted": false, "version": 1}
````


### Encrypted Wallet Keys

In the same directory as your QRL wallet.json file enter the following command to print your private key information:

```bash 
qrl wallet_secret
```
- This will prompt for an address from the wallet to print the secrets for: `wallet idx [0]:` 
  - If you only have one address, simply leave default and hit enter.
- If the wallet file is encrypted you will then be prompted for the passphrase used to set up the wallet.

:::info
This requires a QRL wallet has already been generated and is in the local directory. To specify an additional directory location for the wallet.json file use the `--wallet_dir {PATH}` flag.
:::

After successful decryption the private key information will be printed.

```bash {3,5}
Wallet Address  : Q000600f1afe2a5d8247779795f0eb0d5225e5fe7b91bcb38c614b5a62fa3df0f5cfe92e6355ace

Mnemonic        : aback grape latest ace ferry bucket creak safety hour russia parade site donor yeast tunnel dusty odd dirt mutual you brine might two mercy shady print smite wrap swan common coat modify leave tort

Hexseed         : 0006007a70174ec1ec32abd66c2bc59ecc9a3eefe7ec14299903d2928ff01da8c0ecf8a6c46aa9ccffd4dbe2ee2d38e57c3e7a
```

This information is needed to recover your wallet file. Store it in safe locations and ensure the recovery media is correct and opens the expected address.

:::warning Anyone with private key information can unlock the wallet and steal funds!
:::


## Recover Wallet


In order the recover a wallet, or load one onto a new computer you will need one of three things, 

- The wallet.json file
  - If encrypted, the passphrase to decrypt
- The mnemonic phrase in the correct order
- The hexseed. 

Without one of these, it is **impossible** to recover the wallet.

Additionally you will need a wallet application. Any of the QRL wallet applications can be used to recover an address. Load the wallet.json file to the application or enter the secret keys to recover the address.

### CLI wallet.json Recovery

If you have the wallet.json file, simply copy it over to the new machine and use the qrl functions as needed. The CLI will recognize that a wallet.json file is found and load the secret keys from the file.


### CLI Hexseed

To recover using the Mnemonic phrase use the `wallet_recover` command. By default the command will expect a hexseed:

```bash
qrl wallet_recover
```

You will be prompted for the hexseed you have saved. Ensure you enter it correctly. The wallet address will be printed and you will have a chance to save it. enter yes and your wallet will be recovered and saved into the directory you are currently in. 

:::warning
This will save your file as an **Unencrypted** wallet.json file. Make sure you encrypt this file with a secure passphrase you will not lose.
:::

### Mnemonic Phrase

To recover using the Mnemonic phrase use the `qrl wallet_recover --seed-type` command:

```bash
qrl wallet_recover --seed-type mnemonic
```

You will be prompted for the mnemonic you have saved. Ensure you enter it correctly. The wallet address will be printed and you will have a chance to save it. enter yes and your wallet will be recovered and saved into the directory you are currently in.


:::warning
This will save your file as an **Unencrypted** wallet.json file. Make sure you encrypt this file with a secure passphrase you will not lose.
:::