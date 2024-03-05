---
id: qrl-api-overview
title: QRL API Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: API Overview
sidebar_position: 1
pagination_label: API Overview
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/API/api-overview.md
description: QRL API Overview
keywords:
  - docs
  - build
  - developers
  - API
  - Overview
image: /assets/img/icons/yellow.png
slug: /api/qrl-api-overview
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';


The QRL API's are the developers portal into the inner workings of the Quantum Resistant Ledger's blockchain. These API's allow developers and advanced users access to core functions and information from the blockchain.

:::info
While there is no authentication required to interact with most of the QRL's API's, you will need access to an API service IP and Port of a node running on the QRL network. 

Best practice is to [run your own QRL node](/use/node/overview).
:::

## gRPC

The QRL API is organized around [gRPC (Google Remote Procedure Call)](https://grpc.io/). GRPC uses [protocol buffers](https://developers.google.com/protocol-buffers/docs/overview) for serializing structured data. Every function requires an object as parameter and returns another object as response. Our qrl.proto file lists the different objects as messages in two categories, request (*Req*) and response (*Resp*).

More information on GRPC can be found in [their official documentation](https://grpc.io/)

<Tabs defaultValue="public" 
      groupID="syntaxSelection" 
      values={[
        { label: 'Public API', value: 'public', },
        { label: 'Wallet API', value: 'wallet', },
        { label: 'Walletd-Rest API', value: 'walletd-rest', },
        { label: 'Zeus Proxy', value: 'zeus-proxy', },
        { label: 'Explorer API', value: 'explorer', },
      ]}>
  
  <TabItem value="public">
    <h2>QRL Public API</h2>
    <p>The core QRL API responsible for all core blockchain functions.</p>
    <span>
      <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/qrl-public-api">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Public API">
              QRL Public API
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Core blockchain functions">Core blockchain functions and operations.</p>
          </a>
        </article>
      </section>
    </span>
  </TabItem>
  
  <TabItem value="wallet">
    <h2>QRL Wallet API</h2>
    <p>The core wallet API functions</p>
    <span>
      <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--12 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/wallet-api">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Wallet API">
              QRL Wallet API       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Wallet API">The QRL Wallet API documentation.</p>
          </a>
        </article>
      </section>
    </span>
  </TabItem>
  <TabItem value="walletd-rest">
    <h2>Walletd Rest Proxy - API</h2>
    <p>The QRL Wallet Daemon Rest Proxy makes integrating QRL even easier</p>
    <span>
      <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--12 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/walletd-rest-proxy">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="Wallet Daemon Rest Proxy">
              QRL Walletd-Rest Proxy API      
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Wallet Daemon Proxy API.">The QRL WalletD-Rest Proxy API documentation</p>
          </a>
        </article>
      </section>
    </span>
  </TabItem>
  <TabItem value="zeus-proxy">
    <h2>Zeus Proxy API</h2>
    <p>The Zeus proxy simplifies interactions with the QRL Blockchain with focus on web development and RESTful queries</p>
    <span>
      <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--12 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/zeus-proxy">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="Zeus Proxy">
              Zeus Proxy API
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Zeus Proxy API Documentation">QRL Zeus Proxy API Documentation.</p>
          </a>
        </article>
      </section>
    </span>
  </TabItem>

  <TabItem value="explorer">
    <h2>Explorer API</h2>
    <p>The QRL Explorer offers simple and limited API connectivity allowing some basic information gathering</p>
    <span>
      <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--12 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/explorer-api">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="Explorer API">
              QRL Explorer API
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Explorer API.">QRL Explorer API documentation.</p>
          </a>
        </article>
      </section>
    </span>
  </TabItem>  
</Tabs>
