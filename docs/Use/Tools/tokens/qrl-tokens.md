---
id: qrl-tokens-overview
title: QRL Token Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Overveiw
sidebar_position: 1
pagination_label: QRL Token Overview
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Tools/tokens/qrl-tokens.md
description: QRL Token overview
keywords:
  - docs
  - tools
  - tokens
image: /assets/img/icons/yellow.png
slug: /use/tools/tokens/overveiw
---

QRL supports the generation of *colored* tokens, allowing a multitude of functionality in addition to the typical blockchain functions. 

These tokens are generated and sent in separate transaction types *([`RelayTokenTxn`](/api/wallet-api#relaytokentxn) and [`RelayTransferTokenTxn`](/api/wallet-api#relaytransfertokentxn))* allowing additional versatility as they are not tied to any QRL funds and can be transferred interdependently from an QRL coins. 


## Create Tokens

The project provides a GUI to make creating tokens simple. Generate a new token using the [QRL wallet](/use/wallet) interface via the [web wallet](/use/wallet/web), [desktop wallet](/use/wallet/desktop) as well as through multiple [API's](/api) and command line tools for more advanced usage.


<span  style={{ "text-align": "center"}}>
  <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
    <article class="col col--12 margin-bottom--md">
      <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/tools/tokens/create">
        <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Public API">
          Create QRL Tokens
        </h2>
        <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Create QRL Tokens on the Blockchain">Create QRL Tokens on the Blockchain.</p>
      </a>
    </article>
  </section>
</span>
<br />



There are various fields and information required to create a token transaction:


| Field |  Details | 
| :--: |  :--- |
| `Owner Address` |  Address shown to be the owner of the token, different from the initial token holding addresses |
| `Token Symbol` |  User defined Token symbol, max length $10$ $bytes$ |
| `Token Name` |  User defined Token name, max length $30$ $bytes$ |
| `Decimals` |  Amount of decimals supported for the token, max $9$ or $(10 ** 9)$|
| `Holder Balance` |  Array of initial token receiver's address and initial balance, limited to 100 QRL addresses |
| `Token Creation Fee` |  Initial token creation transaction fee set at the default $100$ $shor$|
| `OTS Key Index` |  This function will auto increment the OTS key from the last used. Otherwise a specific OTS Key can be used for this token transaction. |

This section covers the GUI interface through the web wallet tools section. 

:::note

For automated token functionality, including using slave OTS keys to generate and send see the [API Documentation](/api/wallet-api) as well as the [QRL Command Line Documentation](/use/node/node-cli/overview)
:::

## Send Tokens

Tokens can be transferred between addresses on the QRL blockchain. These tokens can be split into derivatives and fractionally split as well depending on the initial criteria set during the token creation. 

<span  style={{ "text-align": "center"}}>
  <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
    <article class="col col--12 margin-bottom--md">
      <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/tools/tokens/send">
        <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Public API">
          Send QRL Tokens
        </h2>
        <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Send QRL Tokens on the Blockchain">Send QRL Tokens on the Blockchain.</p>
      </a>
    </article>
  </section>
</span>
<br />

Tokens are tracked by their creation transaction hash and may be transferred between addresses, paying only the transaction cost to send them around. 




