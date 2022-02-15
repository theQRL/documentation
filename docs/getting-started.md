---
docstatus: DRAFT  # one of {DRAFT, 30%, 90%, COMPLETE}
id: getting-started
title: Getting Started
hide_title: false
hide_table_of_contents: true
sidebar_label: Getting Started
sidebar_position: 1
pagination_label: Getting Started
custom_edit_url: https://github.com/fr1t2/documentation/edit/main/docs/getting-started.md
description: Getting started with the QRL Blockchain and ecosystem
keywords:
  - docs
  - intro
  - getting started
image: /assets/img/icons/yellow.png
slug: /

---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>

### Needed:

- Inforgraphic type interface with accessable icons and obvious paths to get started needed!!!!
- dashboard to getting started with most popular topics called out
- Fancy graphics to accompany (can things move like the main site dots?)
- General overview description paragraph.
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';


Welcome to the Quantum Resistant Ledger documentation! This documentation aims to be the central source of information whether you are developing a new project or simply understanding the project basics this is the source. 

Our doc's are broken into 4 main categories, [Learn](/), [Build](/build) , [Maintain](/Maintenance) and [Tutorials](/tutorials). These sections aim to guide a user through the project from basic functionality into more advanced topics like the quantum resistant nature of our cryptography.

## What Is The QRL?

An externally audited enterprise-grade blockchain platform secure today from the quantum computing advances of tomorrow. QRL is the first industrial implementation to utilize [IETF specified XMSS](https://tools.ietf.org/html/rfc8391); a hash-based, forward secure signature scheme with minimal security assumptions and reusable addresses that comes with [NIST approval](https://csrc.nist.gov/publications/detail/sp/800-208/final).

QRL utilizes an [extensible address format](/developers/address/qrl-address-scheme) with quantum security built in from the genesis block. We maintain an open source code-base with implementation [verified by third-party audits](https://github.com/theQRL/audits) from [red4sec](https://red4sec.com/) and [x41 D-sec](https://www.x41-dsec.de/).

Aiming to be developer friendly, we have built this extensive documentation as well as an API reference, giving the tools to build anything, today, on an industrial grade platform that will survive tomorrow.

Offering a full suite of user-facing applications to make interacting with the QRL blockchain and digital assets a breeze, we have taken most of the complexity of a quantum resistant blockchain out of the users view. We offer products for Desktop (Windows, Mac, Linux), Mobile (iOS, Android) and the web to allow a user a quick on-boarding to use our tools.










### The QRL Mission

Provide enterprise grade security to the blockchain space with the future quantum threat in mind. Instead of relying on the classical secure elliptical curve cryptography to secure signatures The QRL has deployed XMSS, a NIST-approved post-quantum secure digital signature scheme.

By utilizing this post-quantum secure signature scheme from genesis, we are able to provide advanced asset protection now, as well as the future.



:::info
If you don't find all you need from these docs, please join us in our Discord server for more direct help.
:::


<Tabs
  defaultValue="learn"
  groupID="syntaxSelection"
  values={[
    { label: 'Learn', value: 'learn', },
    { label: 'Build', value: 'developer', },
    { label: 'Tutorials', value: 'tutorials', },
    { label: 'Maintain', value: 'maintain', },
  ]
}>



<TabItem value="learn">

<h2>User Documentation</h2>

:::note getting started
From creating your first wallet to sending multi-signiture transactions, this is the place to start!
:::



Get started with the basics of The QRL.


<span><img src={frontMatter.image} alt='QRL logo' /></span>

</TabItem>




<TabItem value="developer">

<h2>Advanced Documentation</h2>

:::note 

Diving into the more complex topics!
:::

Discussing things like the quantum resistant cryptography that makes The QRL what it is.


</TabItem>



<TabItem value="tutorials">

<h2>Tutorials</h2>

:::note 

Walking through basic tasks like setting up a node, requesting blockchain data etc.
:::

Tutorial guides to get started using The QRL.


</TabItem>
<TabItem value="maintain">

<h2>Developer Documentation</h2>

:::note 

API documentation and maintain information for core functions and advanced usage.
:::

Developers information

</TabItem>


</Tabs>
