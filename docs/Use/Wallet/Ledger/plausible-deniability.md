---
id: ledger-wallet-plausible-deniability
title: Ledger wallet - Plausible Deniability 
hide_title: false
hide_table_of_contents: false
sidebar_position: 7
sidebar_label: Plausible Deniability
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Wallet/Ledger/plausible-deniability.md
pagination_label: Ledger Wallet - Plausible Deniability
description: Plausably Deniabile QRL address using the ledger device
keywords:
  - docs
  - wallet
  - ledger
  - Plausible deniability
image: /assets/img/icons/yellow.png
slug: /use/wallet/ledger/plausible-deniability
---

import ImageSwitcher from '@site/src/components/UseColorMode.js';
import KeyspaceSmall from './assets/keyspace-small.png';
import KeyspaceSmallDark from './assets/keyspace-small-dark.png';
import Keyspace2 from './assets/keyspace2.png';
import Keyspace2Dark from './assets/keyspace2-dark.png';

One of the most exciting features the QRL Ledger application supports is the ability to create a secondary profile with it's own address space. 

This function provides *Plausible Deniability* where a small amount of $quanta$ can be stored in one address space while the remaining balance is secured behind an additional passphrase in another address space.
 
This secures a users funds from any physical attacks by allowing the smaller balance to be given up while never allowing the attacker access to the second address space and remaining funds.

This second profile space allows an additional $2$ QRL XMSS trees or *Addresses* to be created on the Ledger. 

This will add an additional word to the 24 word recovery mnemonic phrase, creating 2 word lists. 

- The first being the typical 24 word Ledger recovery key, 
- The second being the same 24 word phrase plus the additional word that is setup during configuration.


<div style={{textAlign: 'center'}}>
  <ImageSwitcher 
    lightImageSrc={Keyspace2}
    darkImageSrc={Keyspace2Dark}
  />
</div>


To read more on the setup and configuration of the second account space see [this article from the Ledger team](https://support.ledger.com/hc/en-us/articles/115005214529-Advanced-passphrase-security)

This feature is optional and there is no way to tell from the Ledger if you have configured this extra space. Plausibly deniable and fully recoverable secure funds!

To setup the second address space, follow [The official ledger guide](https://support.ledger.com/hc/en-us/articles/115005214529-Advanced-passphrase-security). 

After you have secured the additional mnemonic word for the second space follow the [New QRL Ledger Address Guide](/use/wallet/ledger/new) again to initialize the 3rd and 4th QRL addresses.
