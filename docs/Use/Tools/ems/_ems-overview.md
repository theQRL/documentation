---
id: ems-overview
title: Ephemeral Message System Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Ephemeral Message System Overview
sidebar_position: 1
pagination_label: Ephemeral Message System Overview
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Tools/ems/_ems-overview.md
description: Ephemeral Message System Overview
keywords:
  - docs
  - tools
image: /assets/img/icons/yellow.png

---

# EMS (Ephemeral Message System) Overview

The ephemeral message system utilizes the Crystals library to generate public and private Kyber and Dilithium key pairs. These public keys are signed using a quantum secure XMSS One Time Signature (OTS) from a QRL address and broadcast onto the distributed QRL blockchain. This transaction and related QRL address are then used as a quantum resistant key-store moving forward

Using this key-store to encrypt and verify data we can establish a quantum secure, ephemeral messaging system to securely share data between two parties.

## Step 1 - Setup

Each member of an ephemeral chat requires lattice keys with the public key pairs broadcast on the QRL blockchain. We will use these keys to encrypt and sign data that we send between users, verifying authenticity of the message using publicly available quantum secure information.

- Both users generate a new XMSS address used to sign and broadcast the lattice keys individually in private. *(wallet.json)*
- Both users generate new Kyber and Dilithium keys in private, and broadcast their public key pairs in a lattice transaction on the QRL blockchain. *(lattice.json)*
  - This creates the key-store on-chain linked through a QRL address (XmSS Merkle Tree) and a transaction hash.

With both users in control of their private XMSS and lattice keys, they can create a shared salt and generate AES keys used to encrypt/decrypt data between each other.

### Step 2 - Key Salt Generation

- Alice gets Bob's lattice `tx_id` and pulls Bob's public lattice keys from the blockchain. *(pub-lattice.json)*
  - *Look into ways this initial share can happen as securely as possible* 
- Alice generates some random data (salt)
  - This salt is used to create new AES keys that both users will share 
- Alice encrypts the salt using her Kyber private key and Bob's public key
- Alice sends the encrypted salt, her public lattice keys to Bob. 
  - **Need to use an encrypted ephemeral message to send this data**

Alice has created a new AES key file that she can use to securely encrypt data knowing that the only one that can decrypt the data must share these keys. 

#### Step 3 - Key Regeneration

- Bob, using the matching private Kyber keys from the lattice transaction and the on-chain public keys Alice has shared, decrypts the salt Alice sent
- Using this salt, Bob re-creates the shared AES key list identically to Alice's Key list


#### Step 4 - Ephemeral Message

> Needs development

- Using the shared AES list to open a channel, 

- Alice and Bob agree on a key index, or position in the AES key file, to open a message channel with
  - Message data is encrypted using Kyber keys? Or AES?
  - TTL time to live and TTB time to broadcast are set
  - The AES key is used for the message channel

The message is sent across the p2p network through nodes that have enabled EMS communication. This special message type will auto-magically be sent to any node listening. 

If a user has the appropriate keys, and looks, they will receive the message. Anyone else viewing will only see garbage, intended for no one.

Crypto magic!



To be clear as I understand it, in order for an adversary to decrypt a message they would need:
 - Public Lattice keys that were broadcast 
- Private Lattice keys from one of the users
- the AES key file in plain text or the salt used to generate the initial key file


Additional security can be placed by signing the message utilizing the Dilithium keys