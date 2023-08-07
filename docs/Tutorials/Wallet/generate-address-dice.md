---
docstatus: DRAFT
id: generate-address-dice
title: Generate QRL Address - Dice
displayed_sidebar: tutorialSidebar
hide_title: false
hide_table_of_contents: true
sidebar_label: Generate Address - Dice
sidebar_position: 1
pagination_label: Generate Address - Dice
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Tutorials/Wallet/generate-address-dice.md
description: Generating a QRL wallet using dice for random entropy used for the address cryptography.
keywords:
  - docs
  - tutorials
  - wallet
  - dice
image: /assets/img/icons/yellow.png
slug: /tutorials/wallet/generate-address-dice
---

:::caution DOCUMENT STATUS 
<span>This document is in: <b>{frontMatter.docstatus}</b> status and needs additional input!</span>
:::


For those who are completely paranoid about random number generation, it is possible to create entropy for a seed or mnemonic by rolling a dice. 

The more sides the dice has the more bits of entropy may be gathered with each roll, resulting in fewer rolls to complete a mnemonic.

The functions work for any sided dice, but I would recommend a polyhedral dice (e.g. 100 sided) which allows 6 bits of entropy per roll to be harvested.

## QRL Mnemonic Generation 

For the QRL mnemonic (34 words, 12 bits per word, 408 bits required) this translates to 68 dice rolls to complete a mnemonic phrase.


## Usage: 

You will need a dice, a PC with python loaded and some time to roll the dice.

#### Security First

To securely generate a QRL mnemonic you will want to work in an offline, air gapped PC. Make sure you are not running on an infected piece of hardware. It is recommended to boot into a live USB running a Linux distribution. 

There are lots of options out there for distributions to use. The biggest thing here is the OS is brand new, and not previously compromised.

#### Live USB Distribution options

- [Tails](#)
- [Cubes](#)
- [Debian](#)
- [Ubuntu](#)

Always verify the hash of the file you grab to ensure the file is not tampered with.

## Dice.py  

You need to get the files hosted on github and save them to the PC. 

Clone the repository from github:
```bash
git clone https://github.com/surg0r/dice.git
```

To run the software use:

```bash
python dice.py
```

Follow the instructions rolling the dice the appropriate number of times and record the number rolled each time. This will create a truly random mnemonic phrase from the word-list found in the repository on github.


:::tip
All of these operations can be done offline after the software is loaded to the local PC.
:::