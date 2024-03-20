---
id: notarization-overview
title: QRL Notarization Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Overveiw
sidebar_position: 1
pagination_label: Notarization - Overview
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Tools/notarize/notarization.md
description: QRL Notarization
keywords:
  - docs
  - tools
  - Notarization
image: /assets/img/icons/yellow.png
slug: /use/tools/notarize/overview
---


The QRL's notarization system provides a secure and decentralized way of proving the existence and integrity of a document or message at a specific point in time. It is designed to provide a trustworthy method of verifying information without relying on a central authority utilizing blockchain technology.


When a user wants to notarize a document or message, they can submit it to the QRL network using the QRL Wallet Tools featured in the [Desktop and Web wallet](/use/wallet). The system then creates a cryptographic hash of the document, which is a unique representation of its contents.

This cryptographic hash is then stored on the QRL blockchain, making it a part of the public record. The hash serves as a digital fingerprint of the document and can be used to verify its integrity in the future. Since the blockchain is decentralized and replicated across multiple nodes, it is extremely difficult to tamper with the stored information.


Once notarized, any exact copy of that document can be cryptographically verified on-chain using the [QRL Block explorer](https://explorer.theqrl.org).


 ## Advanced users

:::note
There are multiple ways to access the notarization process through the [QRL API](/api) and [Command Line Tools](/use/node/node-cli/overview) using the `message_tx` with appropriate [message encoding](/build/messages/message-tx-encoding).
:::


Under the hood the notarization system utilizes [QRL message](/use/tools/messages) with some [clever encoding](/build/messages/message-tx-encoding) added to beginning of the file data encoded into a message. By signing the file signature onto the QRL's blockchain, the verifiable file data is immutably saved on-chain.


<details>
  <summary>Advanced Notarization Overview</summary>
  <p>


In it's simplest form the notarization message is a [SHA-256 hash](https://en.wikipedia.org/wiki/SHA-2) of the document data with the additional `AFAFA2` hex encoding appended to the front of the file data.

:::tip QRL Notarization Structure

| Encoding | SHA256_SUM *(example)*|
| :---: | :---: |
| AFAFA2 | 74ef874a9fa69a86e091ea6dc2668047d7e102d518bebed19f8a3958f664e3da |

:::

This data is sent in a `message_tx` to the blockchain utilizing the address provided, signing and submitting with quantum resistant XMSS keys to ensure that the validity of the original document can be forever verified for authenticity.

  </p>
</details>


To verify the integrity of the document, you simply pass it through the same hashing algorithm and verify the hash matches the one you have signed using your quantum resistant secure private keys.


:::tip
It is important to point out that this does **NOT** load the file to the blockchain, only a cryptographic representation (Hash) of the data in the file. An original copy of the file will be needed to verify the notarization.
:::caution

Overall, the QRL's notarization system offers a decentralized and secure way to prove the existence and integrity of documents or messages. It leverages blockchain technology to create an immutable record that can be verified by anyone, without the need for a central authority. 

The provided tools and API make it easy for users to notarize and retrieve information, while the technical documentation gives developers insights into the system's implementation.