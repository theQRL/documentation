---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: crystals-key-generation
title: Crystals Key Generation
hide_title: false
hide_table_of_contents: false
sidebar_label: Crystals Key Generation
sidebar_position: 1
toc_min_heading_level: 3
toc_max_heading_level: 6
pagination_label: Crystals Key Generation
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Tools/crystals/_key-generation.md
description: Crystals Key Generation
keywords:
  - docs
  - tools
  - Crystals Key Generation
image: /assets/img/icons/yellow.png
slug: /use/tools/crystals/crystals-key-generation
---


Steps to generate and broadcast the required Dilithium and Kyber lattice keys for ephemeral message type applications or any system where having a quantum resistant, verifiable public key pair would be of use.

:::info Cryptographic definitions
A public-key encryption scheme $PKE = (KeyGen, Enc, Dec)$ is a triple of probabilistic algorithms together with a message space $M$. The key-generation algorithm $KeyGen$ returns a pair $(pk, sk)$ consisting of a public key and a secret key. The encryption algorithm $Enc$ takes a public key $pk$ and a message $m ∈ M$ to produce a ciphertext $c$. Finally, the deterministic decryption algorithm $Dec$ takes a secret key $sk$ and a ciphertext $c$, and outputs either a message $m ∈ M$ or a special symbol ⊥ to indicate rejection

 [CRYSTALS – Kyber: a CCA-secure module-lattice-based KEM {*PDF*}](https://eprint.iacr.org/2017/634.pdf)
:::

## Scope

Using the `qrl-cli`, this guide will produce a pair of lattice keys for Bob and Alice with their respective public keys signed and broadcast using separate address on the QRL blockchain. 

From these public keys, Alice will generate a random seed `Crypto.randomBytes(32)`, and a cyphertext using Bob's public keys to secure this random seed. 

Using public key encryption Alice then sends Bob the cyphertext, encrypted shared key, and her public key. Bob can reproduce Alice's shared key list opening an encrypted communication channel.

## Definitions

- Crystals
- Kyber
- Dilithium
- Key Pair
- ECDSA
- Lattice
- Shared Key
- Cyphertext
- Broadcast


## Requirements

To communicate securely, Bob and Alice both need to generate the following key combinations:

- QRL Address 
    - XmSS key pair
- Lattice Keys
    - Crystals - Kyber key pair (pk1)
    - Crystals - Dilithium key pair (pk2)
    - ECDSA key pair (pk3)

Using the QRL address, these lattice keys are broadcast through the chain. The respective transaction hashes are used to lookup the key store on-chain providing immutable quantum secure verification.


### Example Setup

The example below is created in a directory with the following structure

```
qrl-cli/tmp/
        ├── alice
        │   └── forBob
        └── bob
            └── fromAlice
```

Install the qrl-cli using ~~`npm install qrl-cli`~~ [**For now grab my fork**](https://github.com/fr1t2/qrl-cli)

```bash
git clone --single-branch --branch master https://github.com/fr1t2/qrl-cli.git
```
Change into the directory and install the required packages

```bash
cd qrl-cli && npm install
```

Setup the testing directory to follow along with the commands in this guide. For this guide, create a `tmp/` directory with a folder for both Alice and Bob as shown below.

```bash
# create directory structure for example

mkdir -p tmp/bob/fromAlice tmp/alice/forBob 
```

## Generate Keys

Using the steps below generate all of the required keys.

### Step 1 - Wallet and Lattice

#### Alice creates a QRL wallet and a new set of lattice keys

```bash
# Create wallet file
./bin/run create-wallet -3 -f tmp/alice/alice-wallet.json -h 8
```
##### Command flags

- `-3` using the shake-256 hashing mechanism
- `-f` File to save address data to (private key) in JSON format
- `-h` Height of the XmSS merkle tree

This outputs a QRL json wallet file containing the XmSS public key and private keys. 

> [Alice's wallet file as generated for this documentation](https://gist.github.com/fr1t2/fbbaafbbf835ee6d847c7e5c42ef9d15)

```bash
# Create lattice keys and broadcast
./bin/run generate-lattice-keys -b -t -c tmp/alice/alice-lattice.json -w tmp/alice/alice-wallet.json -i 0
```
##### Command flags

- `-b` Broadcast the public keys in addition to creating them
- `-t` Use the `TESTNET` network
- `-c` Output file to save the private lattice keys generated
- `-w` Wallet file used for broadcasting the lattice public keys
- `-i` Unused QRL OTS index to use for the lattice key transaction


```
## Output

Testnet
Creating Crystals Keys for: Q0204000d8c98d799f2d7f38c3f177bbb583bc4d3cc53ffb329bf2ec851d249413604731d9e5364
✔ XMSS Key
✔ ECDSA PK created
✔ Kyber Keys Created!
✔ Dilithium Keys Created!
✔ Node correctly returned transaction for signing
✔ Transaction signed with OTS key 0. (nodes will reject this transaction if key reuse is detected)
✔ Transaction submitted to node: transaction ID: 8cc2ac1e009760f271d0caeadfdf809d7eb52475e090e5f96a1c2d0e4e7cc505
✔ https://testnet-explorer.theqrl.org/tx/8cc2ac1e009760f271d0caeadfdf809d7eb52475e090e5f96a1c2d0e4e7cc505
✔ Lattice key file encrypted!
✔ Lattice keys written to tmp/alice/alice-lattice.json
```


Pay attention to the [transaction ID](https://testnet-explorer.theqrl.org/tx/8cc2ac1e009760f271d0caeadfdf809d7eb52475e090e5f96a1c2d0e4e7cc505) of the `generate-lattice-keys` command. This will be provided to Bob for shared key re-generation

> [Alice's lattice keys](https://gist.github.com/fr1t2/6b6eccef2a2e770a2346a2c2dc250bad)


#### Bob creates wallet and lattice keys exactly like Alice.

```bash
# Create wallet file
./bin/run create-wallet -3 -f tmp/bob/bob-wallet.json -h 8
```
##### Command flags

- `-3` using the shake-256 hashing mechanism
- `-f` File to save address data to (private key) in JSON format
- `-h` Height of the XmSS merkle tree

> Command outputs [Bobs wallet file](https://gist.github.com/fr1t2/c6c6351bf61b01b803cc67a49e55474c)

```bash
# Create lattice keys and broadcast
./bin/run generate-lattice-keys -b -t -c tmp/bob/bob-lattice.json -w tmp/bob/bob-wallet.json -i 0
```
##### Command flags

- `-b` Broadcast the public keys in addition to creating them
- `-t` Use the `TESTNET` network
- `-c` Output file to save the private lattice keys generated
- `-w` Wallet file used for broadcasting the lattice public keys
- `-i` OTS index to use for the lattice key transaction

```
## Output

Testnet
Creating Crystals Keys for: Q0204000a434ae9b2381c6d1ec1574116cfaca95dcecdb745545fce6ecafc427ece09c20e11deff
✔ XMSS Key
✔ ECDSA PK created
✔ Kyber Keys Created!
✔ Dilithium Keys Created!
✔ Node correctly returned transaction for signing
✔ Transaction signed with OTS key 0. (nodes will reject this transaction if key reuse is detected)
✔ Transaction submitted to node: transaction ID: 25e11b7f5f9d05a1bd807e924a8b43f814b369cd3cf3749859fb11e6d2f6bbe5
✔ https://testnet-explorer.theqrl.org/tx/25e11b7f5f9d05a1bd807e924a8b43f814b369cd3cf3749859fb11e6d2f6bbe5
✔ Lattice key file encrypted!
✔ Lattice keys written to tmp/bob/bob-lattice.json
```

Pay attention to the [transaction ID](https://testnet-explorer.theqrl.org/tx/25e11b7f5f9d05a1bd807e924a8b43f814b369cd3cf3749859fb11e6d2f6bbe5) of the `generate-lattice-keys` command. This will be provided to Alice for the initial shared key generation

> [Bob's lattice keys](https://gist.github.com/fr1t2/5d50e34b048171da8f1d82b715343989)

### Step 2 - Shared Key Generation

Bob now sends his public lattice keys to Alice through the transaction ID above, in this case it is `25e11b7f5f9d05a1bd807e924a8b43f814b369cd3cf3749859fb11e6d2f6bbe5` and the transaction was sent on the testnet network.


#### Alice Generates Shared Keys

Using Bob's tx_id *(public Crystals Keys)* Alice can generate and setup new keys. These keys are encrypted and signed for Bob, verifiable that they were sent by Alice.

```bash
# Alice generates a shared key pair using Bob's public keys (tx_id)

./bin/run generate-shared-keys 25e11b7f5f9d05a1bd807e924a8b43f814b369cd3cf3749859fb11e6d2f6bbe5 tmp/alice/alice-lattice.json -c tmp/alice/forBob/AliceCyphertext.txt -k tmp/alice/Alice-Bob_SharedKey.txt -s tmp/alice/forBob/AliceSignedMessage.txt -t
```

##### Command flags

- Lattice transaction_hash `25e11b7f5f9d05a1bd807e924a8b43f814b369cd3cf3749859fb11e6d2f6bbe5`
- Private lattice keys `tmp/alice/alice-lattice.json`
- `-c` Output file to save the cyphertext created
- `-s` Output file to save the sharedKey file
- `-w` Wallet file used for broadcasting the lattice public keys
- `-i` OTS index to use for the lattice key transaction
- `-t` Use the `TESTNET` network


```
# Output

Generate Lattice Shared_Keys...
✔ Grabbing public keys from Testnet
✔ Generating new shared secrets for
✔ Address: Q0204000a434ae9b2381c6d1ec1574116cfaca95dcecdb745545fce6ecafc427ece09c20e11deff
✔ Lattice Tx Hash: 25e11b7f5f9d05a1bd807e924a8b43f814b369cd3cf3749859fb11e6d2f6bbe5
✔ Secrets Generated, encrypting keys...
✔ Cyphertext file written to: tmp/alice/forBob/AliceCyphertext.txt
✔ Signed Message File file written to: tmp/alice/forBob/AliceSignedMessage.txt
✔ Shared Key List file written to: tmp/alice/Alice-Bob_SharedKey.txt

```

This command generated 3 files:

- [`forBob/AliceCyphertext.txt`](https://gist.github.com/fr1t2/63e80a50534bb330350979b685abc674) - Kyber encrypted Cyphertext
- [`forBob/AliceSignedMessage.txt`](https://gist.github.com/fr1t2/080c44828203147db12b5f7446433026) - Signed and encrypted random Seed 
- [`Alice-Bob_SharedKey.txt`](https://gist.github.com/fr1t2/f3f22c2596afc91eafd7aed353e877d7) - Secret key list

Alice sends bob the kyber encrypted Cyphertext *(KYBOBJECT_SENDER.getCypherText)*, AES encrypted and dilithium signed SignedMessage *seed (Crypto.randomBytes(32))* as well as the transaction_id from the `generate-lattice-keys` command Alice ran.

Alice **does not** share the `Alice-Bob_SharedKey.txt` file. Bob has enough information to re-create it without exposing it through transmission.

#### Alice sends Bob the 2 encrypted files.

> FIXME - Look to send this information over the network in a message transaction!

```bash
# Transmit the encrypted keys to bob SOMEHOW...
cp tmp/alice/forBob/* tmp/bob/fromAlice/ # here we simply copy the files into bob's directory
```

### Key Re-Generation

Using these provided keys and Alice's public lattice transaction_id, Bob is able to decrypt and re-generate the same list of AES keys Alice holds.


#### Bob Re-Generates Keys

Bob runs the following commands using the files and information Alice provided

```bash
# Bob re-generates the shared key from his private keys and Alice's files she sent over as well as her public keys
./bin/run generate-shared-keys 8cc2ac1e009760f271d0caeadfdf809d7eb52475e090e5f96a1c2d0e4e7cc505 tmp/bob/bob-lattice.json tmp/bob/fromAlice/AliceCyphertext.txt tmp/bob/fromAlice/AliceSignedMessage.txt -k tmp/bob/Bob-Alice_SharedKeys.txt -t
```

##### Command flags

- Lattice transaction_hash - `006393620dcd3bb4affc7f646c14ac6352b47f6708b5d4f649100fccca1adfe0`
- Private lattice keys - `tmp/alice/alice-lattice.json`
- `-c` Output file to save the cyphertext created
- `-s` Output file to save the sharedKey file
- `-w` Wallet file used for broadcasting the lattice public keys
- `-i` OTS index to use for the lattice key transaction
- `-t` Use the `TESTNET` network

```
# Output

Generate Lattice Shared_Keys...
✔ Grabbing public keys from Testnet
✔ Shared secrets found, decrypting and generating shared keylist
✔ keys generated!
✔ Keylist generated and written to: tmp/bob/Bob-Alice_SharedKeys.txt
```

> [Bob's Shared Key File](https://gist.github.com/fr1t2/6b6eccef2a2e770a2346a2c2dc250bad) should be identical to Alice's shared key list file.


### Final Example Files 

This will create the following files in the directory structure as described above:

```
qrl-cli/tmp/
├── alice
│   ├── Alice-Bob_SharedKey.txt
│   ├── alice-lattice.json
│   ├── alice-wallet.json
│   └── forBob
│       ├── AliceCyphertext.txt
│       └── AliceSignedMessage.txt
└── bob
    ├── Bob-Alice_SharedKeys.txt
    ├── bob-lattice.json
    ├── bob-wallet.json
    └── fromAlice
        ├── AliceCyphertext.txt
        └── AliceSignedMessage.txt
```

The AES shared keys are created, encrypted and shared securely between Bob and Alice, and re-generated on both ends identically. 
- Bobs AES key list `Bob-Alice_SharedKeys.txt`
- Alice's AES key list `Alice-Bob_SharedKey.txt` 

Alice and Bob are ready to use these keys for further communication in a quantum secure private way.



```bash
# These keys should match if both users correctly shared the public key tx_id
diff Alice-Bob_SharedKey.txt Bob-Alice_SharedKeys.txt  -s

# Output
Files Alice-Bob_SharedKey.txt and Bob-Alice_SharedKeys.txt are identical
```

```bash
# Get all of the generated keys into a list in bash - 
cat Alice-Bob_SharedKey.txt |sed -r 's/(.{64})/\1\n /g'

# Output

c0c6918c0c9a8f3a186fc507a60c15517a293816919787e8a4fc4544cc75f0ef # key index 0
9b98b6d078bd0faa908abc3ed6cf666be46862dc8758f339d96b065e8b112c19 # key index 1
315de08dcef07adf7ace3c14dc2be46d310af95026d7808a0f56df4bc86e44ad # key index 2
11b7ca2d9d832733e4e509e6e38d28aadee008fc5e4d09649e01d78e6c5e1522 # key index 3
6253183a328861669a74a6942f8f950ccf16893fc8e36470a62bf729d68e37a0 # key index 4
eba376d443b452354d601246e9b1e1625e519b255cd9c605cd03700af185f3c8 # key index 5
1b3293de592cd740ca18cbbddc145ccd61337033d03a06352633bec23b56860d # key index 6
187813c41b98bd7329ed451252df23b4596c3e44f30313ddf1ac85534f329924 # key index 7
3cf61dab5e88f64f51cc1c3d2769785dcf07e8b1895ce316b398767bf51cc8c2 # key index 8
3920f262aac127ee5f15d68efaa95e519a7b128ce6d70a322d059a83f8d24d43 # key index 9...
...
...

```
