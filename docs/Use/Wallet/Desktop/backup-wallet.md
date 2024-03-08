---
id: desktop-wallet-backup
title: QRL Desktop Wallet - Backup
hide_title: false
hide_table_of_contents: false
sidebar_label: Backup
sidebar_position: 4
pagination_label: Desktop Wallet - Backup
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Wallet/Desktop/backup-wallet.md
description: Desktop Wallet - Backup
keywords:
  - wallet
  - Backup Desktop Wallet
  - Backup
image: /assets/img/icons/yellow.png
slug: /use/wallet/desktop/backup
---

The process to backup the Desktop wallet is simple. The software gives a few options for backing up an address during address creation. Chose any of these methods to backup your QRL address. Main point is that you have saved the private key information to be used later for recovery.

:::tip
The backup data must be tested and confirmed to open the same public address directly after creating it, before funds are deposited. This ensures the validity of the data and the ability to open the wallet in the future!
:::


## General Information


There are a few ways that the private keys for an address are represented. Any of these recovery methods will suffice to open the address in the future.

| Recovery Key Medium | Information |
| --- | --- |
| [Mnemonic Phrase](/build/address/mnemonic)  | <ul><li>Wordlist consisting of 34 selected words from the [master QRL wordlist](https://github.com/theQRL/qrllib/blob/master/src/qrl/wordlist.cpp)</li><li>Available using backup functions of the wallet applications</li> <li>Provided during most address generation steps</li></ul> |
| [Hexseed](/build/address/hexphrase) | <ul><li>Available using backup functions of the wallet applications</li><li>Hexstring consisting of 102 mixed alpha numeric characters</li><li>Provided during most address generation processes, or found in a "Backup Wallet" function</li></ul> |
| [`wallet.json` file](/build/address/wallet-json) |  <ul><li>Contains both Hexseed and Mnemonic as well as the Public Key</li><li>May be encrypted *(recommended)* and passphrase will be required to open</li><li>Generated from the [Desktop](/use/wallet/desktop/overview), [Web](/use/wallet/web/overview) and [CLI](/use/node/node-cli/overview) wallet applications</li></ul> |

The medium used to store the data is as important as storing the backup securely. 

Strong, long lasting methods are recommended and if used properly will lead to a successful long term backup. 

:::warning Test your backups!
Recovery of funds is dependent on the correctness of the backup data. Open the Wallet using the backup data directly after creating a new address to check that it works!
:::


## Backup
Backup the QRL Desktop Wallet following these instructions.


### During Address Creation


During the creation of a new address the desktop wallet software will prompt for the user to save the private details of their new address. This information must be saved in order to open the new wallet address.

After entering a passphrase for the encrypted wallet file the system will prompt for the user to save the mnemonic or secret key. 

All of these will work to access the address in the future and are intrinsically the same thing.

**Backup Options**

- Write down either the mnemonic phrase or hexseed onto offline media like paper an pen and store in a secure location. 
- Save a copy of the digital wallet file into multiple locations. The encrypted version uses the passphrase given during address creation to AES encrypt the data in the wallet file. This passphrase will be required to open the wallet at a later date.
- Copy either the mnemonic phrase or the hexseed into a digital file and backup on an external medium like a flash drive or hard drive


:::info
There are considerations to be made for all of the options listed. These solutions may not fit every situation and should be seen as examples not as rules to follow. 
:::


### Backup an Existing Wallet

After an address has been created, the recovery seed can be located using the desktop wallet application. 

- With a wallet open browse to the receive tab and select the "View Recovery Seed" option. 
- This will display the hexseed and mnemonic phrase as well as a QR tag that also contains this information.

Copy this information onto another medium and save it in a secure location. You will need one of the recovery keys to open the address, either will work.


## Backup Storage

Storage of the backup is crucial to a successful wallet recovery. Remember, decentralization comes with the responsibility to manage the funds. 

The selection of backup medium will change how to store the information for the longest amount of time and is overly out of scope for this document. There are some great guides out there for storing wallet keys and they apply to the QRL wallet as well. 

:::warning
Keep the backup secure! Anyone with the secret keys can spend the funds in the wallet.
:::


## Recovering a Backup

To recover a wallet you will need to have access to the secret keys of the address. This can be in the form of the mnemonic phrase word list, the hexseed, or the wallet file either plain text or encrypted.

- Open the desktop software and select open address.
- Select the format of the backup to open in the drop down on the right.
- Enter the data in the field and select "Unlock Wallet"
  - If you use an encrypted wallet file enter the encryption password as well.

The wallet will load and show all transactions that are related to this address.

### Troubleshooting Backup Wallets

If there are issues opening the address there are a few things to check.

#### Wallet File

```
Error!
Either your wallet file is invalid or it is encrypted and you forgot to enter its passphrase.
```

- Open the wallet file in a text editor and verify it is in JSON format
- Do you have the correct encryption passphrase?
  - The wallet.json file may be stored in an AES encrypted state. 
  - Without this encryption passphrase there is no recovery of the information in the file.

