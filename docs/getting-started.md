---
docstatus: 30%  # one of {DRAFT, 30%, 90%, COMPLETE}
id: getting-started
title: The QRL Documentation
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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';


Welcome to the Quantum Resistant Ledger documentation! These doc's aim to be the central source of information for the QRL for all topics from using the base tools to building on the project. Whether you are developing a new project or simply understanding the basics this is the source.

The docs are broken into 3 main categories, [Use](/use), [Build](/build) , and [API](/api). These sections aim to guide a users, developers, and everyone in between through the project from basic functionality into more advanced topics like API usage and Extended XMSS HyperTree creation.

---

<Tabs defaultValue="use" 
      groupID="syntaxSelection" 
      values={[
        { label: 'Use', value: 'use', },
        { label: 'Build', value: 'developer', },
        { label: 'API', value: 'api', },
        { label: 'Tutorials', value: 'tutorials', },
      ]}>
  <TabItem value="use">
    <h2>Using QRL</h2>
    <p>Start here to begin using the QRL and all of the cool features available!</p>
    <span>
      <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Wallet">
              QRL Wallet       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Creating Addresses, Sending and Receiving QRL">Creating Addresses, Sending and Receiving QRL</p>
          </a>
        </article>
        <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/mining">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Wallet">
              Mining QRL       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Full Node Solo Mining and Pool Mining">Full Node Solo Mining and Pool Mining</p>
          </a>
        </article>
        <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/mining">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Node">
              QRL Node       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL node installation, configuration and operation">QRL node installation, configuration and operation</p>
          </a>
        </article>
        <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/mining">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Tools">
              QRL Tools       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Tools usage and guides">QRL Tools usage and guides</p>
          </a>
        </article>
      </section>
    </span>
  </TabItem>
 
  <TabItem value="developer">
    <h2>Advanced Documentation</h2>
    <p>From API calls to address schemes, cli commands and Docker nodes. This is where all of the technical things are kept!</p>
    <span>
      <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--4 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/build">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="Developers Overview">
              Developers Overview       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Developers general information.">Developers general information.</p>
          </a>
        </article>
        <article class="col col--4 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/build/qrllib">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Wallet">
              QRLLIB       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="The QRL Core Library">The QRL Core Library</p>
          </a>
        </article>
        <article class="col col--4 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/build/mining/qrandomx">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Node">
              QrandomX
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="RandomX Library modified for QRL usage">RandomX Library modified for QRL usage</p>
          </a>
        </article>
        <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/build/fundamentals/ots-keys">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="OTS Keys">
              OTS Keys       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="One Time Signature Keys Overview">One Time Signature Keys Overview</p>
          </a>
        </article>
        <article class="col col--6 margin-bottom--lg" >
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL API's">
              QRL API's     
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL API documentation and examples">QRL API documentation and examples</p>
          </a>
        </article>
      </section>
    </span>
  </TabItem>
  <TabItem value="api">
    <h2>API</h2>
    <p>API documentation for advanced usage and programmatic connections.</p>
    <span>
      <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
      <article class="col col--12 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/qrl-api-overview">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="API Overview">
              API Overview
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL API Documentation.">QRL API Documentation.</p>
          </a>
        </article>
          <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/qrl-public-api">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Public API">
              QRL Public API
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Public API Documentation">QRL Public API documentation.</p>
          </a>
        </article>
          <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/wallet-api">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Wallet API">
              QRL Wallet API
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Wallet API documentation">QRL Wallet API documentation.</p>
          </a>
        </article>
          <article class="col col--4 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/walletd-rest-proxy">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Walletd Rest Proxy API">
              QRL Walletd Rest Proxy API
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Walletd Rest Proxy API documentation">QRL Walletd Rest Proxy API documentation.</p>
          </a>
        </article>
          <article class="col col--4 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/zeus-proxy">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Zeus Proxy API">
              QRL Zeus Proxy API
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Zeus Proxy API documentation">QRL Zeus Proxy API documentation.</p>
          </a>
        </article>
          <article class="col col--4 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/zeus-proxy">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Explorer API">
              QRL Explorer API
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Explorer API documentation">QRL Explorer API documentation.</p>
          </a>
        </article>
      </section>
    </span>
  </TabItem>
  <TabItem value="tutorials">
    <h2>Tutorials</h2>
    <p>Tutorial guides to get started using The QRL. Walking through basic tasks like setting up a node, requesting blockchain data etc.</p>
    <span>
      <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--4 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/tutorials/node">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="Node Tutorials">
              Node Tutorials
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Node related tutorials.">QRL Node related tutorials.</p>
          </a>
        </article>
        <article class="col col--4 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/tutorials/wallet">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="Wallet Tutorials">
              Wallet Tutorials
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Wallet Related Tutorials">QRL Wallet Related Tutorials</p>
          </a>
        </article>
      </section>
    </span>
  </TabItem>
</Tabs>

---

:::info MORE QUESTIONS?
If you don't find all you need from these docs, please join us in our [Discord Server](https://theqrl.org/discord) for more direct help.
:::

:::caution DOCUMENT STATUS
**Contributions welcome and appreciated!**

<span> This site is in <i>{frontMatter.docstatus}</i> status and needs additional input and work! </span>

<span>Use the links to edit any document in Github, sign in and make your changes. For in-depth contributions, fork the <a href="https://github.com/theqrl/documentation">documentation repo</a> and branch your changes to get started, or see us in the <a href="https://theqrl.org/discord">QRL Discord server. </a></span>
:::
