---
id: what-is-qrl
title: What Is The QRL?
hide_title: false
hide_table_of_contents: false
sidebar_label: What is The QRL
sidebar_position: 1
pagination_label: What is The QRL
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Learn/what-is-qrl.md
description: Overview of the Quantum Resistant Ledger
keywords:
  - docs
  - intro
image: /assets/img/icons/yellow.png
slug: /what-is-qrl

---


The Quantum Resistant Ledger (QRL) is an externally audited enterprise-grade blockchain platform secure today from the quantum computing advances of tomorrow. 

QRL is the first industrial implementation to utilize [IETF specified XMSS](https://tools.ietf.org/html/rfc8391); a hash-based, forward secure signature scheme with minimal security assumptions and reusable addresses that comes with [NIST approval](https://csrc.nist.gov/publications/detail/sp/800-208/final).

QRL utilizes an [extensible address format](/build/address/address-scheme) with quantum security built in from the genesis block. We maintain an open source code-base with implementation [verified by third-party audits](https://github.com/theQRL/audits) from [red4sec](https://red4sec.com/) and [x41 D-sec](https://www.x41-dsec.de/).

Aiming to be developer friendly, we have built this extensive documentation as well as an API reference, giving the tools to build anything, today, on an industrial grade platform that will survive tomorrow.

Offering a full suite of user-facing applications to make interacting with the QRL blockchain and digital assets a breeze, we have taken most of the complexity of a quantum resistant blockchain out of the users view. We offer products for Desktop (Windows, Mac, Linux), Mobile (iOS, Android) and the web to allow all users a quick on-boarding to use our tools.


## The QRL Mission

Provide enterprise grade security to the blockchain space with the future quantum threat in mind. Instead of relying on the classical secure elliptical curve cryptography to secure signatures The QRL has deployed XMSS, a NIST-approved post-quantum secure digital signature scheme.

By utilizing this post-quantum secure signature scheme from genesis, we are able to provide advanced asset protection now, as well as the future.

### Quantum Resistance

To understand what the difference between classical computers and quantum computers, lets start with the problem and current solution.


#### Classical Resistance


Finding complex prime numbers for a classical computer proves to be more difficult than one would think. This process is iterative and due to the massive number space, mostly impractical for a classical computer to try and guess. 

Using this foundation, cryptographers devised methods to secure data with a "difficult to guess" prime numbers represented by an elliptical curve. Guessing this prime number without secret data is impractical and requires a sufficient classical computer running for a long time. 

This is what cryptographers call **classically secure**, or secure against the attack by a sufficient classical computer. 


#### Quantum Resistance

Post-quantum cryptography also uses difficult math to achieve security, however the math is not only difficult to a classical computer, it is also extremely hard for a quantum computer to solve. 

This extends the life of the security of information secured using additional difficult math through the quantum age. While we expect the advancement of the quantum computer to continue to advance, the math being implemented in post-quantum secure cryptography is expected to withstand these advancements.

While no cryptography will ever be forever secure, the algorithms being implemented and approved by top cryptographers and standardizing institutions like [XMSS](https://csrc.nist.gov/publications/detail/sp/800-208/final) are expected to be secure for the near foreseeable future. 

## Why Use QRL

The QRL has implemented the approved and secure eXtended Merkle Tree Signature Scheme (XMSS) in the most vulnerable functions of the blockchain, signatures. These signatures comprise the fundamental properties and secure the immutability of the chain. 

Similar to how Bitcoin works, the QRL took everything a step further and utilized a better, more secure algorithm to secure the most important functions of the chain. 

There are some drawbacks from using post-quantum secure signature schemes like signature size and one time key use, the QRL has worked out novel ways to overcome these shortcomings with the knowledge that the chain is not vulnerable to a quantum computer attack using [Shor's algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm).

Choosing to use a project is open to the end users needs and project requirements, however most will agree that the security of any system should be taken at the upmost importance.

If you are looking to store funds for a period of time, it can be argued that most blockchain projects that utilize classically secure algorithms, such as ECDSA, are vulnerable in the near future. The QRL is not.


## Resources

For more information on the security implementations and usage of Post-Quantum cryptography see the following links and the core project Whitepaper.

- [TheQRL.org](https://theqrl.org)
- [The QRL Whitepaper](https://github.com/theQRL/Whitepaper/)
- [Address Scheme](/build/address/address-scheme)
- [OTS Keys](/build/fundamentals/ots-keys)
