---
id: getting-started
title: QRL Dokümantasyonu
hide_title: false
hide_table_of_contents: true
sidebar_label: Başlarken
sidebar_position: 1
pagination_label: Başlarken
custom_edit_url: https://github.com/theQRL/documentation/edit/main/i18n/tr/docusaurus-plugin-content-docs/current/getting-started.md
description: QRL Blockchain ve ekosistemine başlangıç
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

:::info QRL Zond Dokümantasyonu
EVM akıllı sözleşmeleriyle çalışan yeni Proof-of-Stake ağımızı denemek için [test-zond.theqrl.org](https://test-zond.theqrl.org) adresine bakın.
:::

Quantum Resistant Ledger dokümantasyonuna hoş geldiniz! Bu dokümanlar, temel araçların kullanımından projenin geliştirilmesine kadar QRL ile ilgili tüm konularda merkezi bir bilgi kaynağı olmayı amaçlar. İster yeni bir proje geliştiriyor olun, ister sadece temelleri anlamaya çalışıyor olun, aradığınız kaynak burada.

Dokümanlar 3 ana kategoriye ayrılmıştır: [Kullanım](/use), [Geliştirme](/build) ve [API](/api). Bu bölümler; kullanıcıları, geliştiricileri ve aradaki herkesi projenin temel işlevlerinden API kullanımı ve Genişletilmiş XMSS HyperTree oluşturma gibi daha ileri düzey konulara doğru yönlendirmeyi amaçlar.



---

<Tabs defaultValue="use" 
      groupID="syntaxSelection" 
      values={[
        { label: 'Kullanım', value: 'use', },
        { label: 'Geliştirme', value: 'developer', },
        { label: 'API', value: 'api', },
        
      
      ]}>
  <TabItem value="use">
    <h2>QRL'yi Kullanma</h2>
    <p>Mevcut tüm harika özellikleri kullanmaya başlamak için buradan başlayın!</p>
    <span>
      <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/wallet">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Cüzdanı">
              QRL Cüzdanı       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Adres Oluşturma, QRL Gönderme ve Alma">Adres oluşturma, QRL gönderme ve alma</p>
          </a>
        </article>
        <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/mining">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Cüzdanı">
              QRL Madenciliği       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="Tam Node ile Tekli ve Havuz Madenciliği">Tam node ile tekli ve havuz madenciliği</p>
          </a>
        </article>
        <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/node">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Node">
              QRL Node       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL node kurulumu, yapılandırması ve işletimi">QRL node kurulumu, yapılandırması ve işletimi</p>
          </a>
        </article>
        <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/use/tools">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Araçları">
              QRL Araçları       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Araçları kullanımı ve rehberleri">QRL Araçları kullanımı ve rehberleri</p>
          </a>
        </article>
      </section>
    </span>
  </TabItem>
 
  <TabItem value="developer">
    <h2>İleri Düzey Dokümantasyon</h2>
    <p>API çağrılarından adres şemalarına, cli komutlarından Docker node'larına kadar. Tüm teknik detaylar burada!</p>
    <span>
      <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--4 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/build">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="Geliştiriciler İçin Genel Bakış">
              Geliştiriciler İçin Genel Bakış       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Geliştiriciler için genel bilgiler.">Geliştiriciler için genel bilgiler.</p>
          </a>
        </article>
        <article class="col col--4 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/build/qrllib">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Cüzdanı">
              QRLLIB       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Çekirdek Kütüphanesi">QRL Çekirdek Kütüphanesi</p>
          </a>
        </article>
        <article class="col col--4 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/build/mining/qrandomx">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Node">
              QrandomX
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL kullanımı için uyarlanmış RandomX Kütüphanesi">QRL kullanımı için uyarlanmış RandomX Kütüphanesi</p>
          </a>
        </article>
        <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/build/fundamentals/ots-keys">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="OTS Anahtarları">
              OTS Anahtarları       
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="Tek Kullanımlık İmza Anahtarlarına Genel Bakış">Tek Kullanımlık İmza (OTS) Anahtarlarına genel bakış</p>
          </a>
        </article>
        <article class="col col--6 margin-bottom--lg" >
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL API'leri">
              QRL API'leri     
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL API dokümantasyonu ve örnekler">QRL API dokümantasyonu ve örnekler</p>
          </a>
        </article>
      </section>
    </span>
  </TabItem>
  <TabItem value="api">
    <h2>API</h2>
    <p>İleri düzey kullanım ve programatik bağlantılar için API dokümantasyonu.</p>
    <span>
      <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
      <article class="col col--12 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/qrl-api-overview">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="API Genel Bakış">
              API Genel Bakış
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL API Dokümantasyonu.">QRL API dokümantasyonu.</p>
          </a>
        </article>
          <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/qrl-public-api">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Genel API">
              QRL Genel API
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Genel API Dokümantasyonu">QRL Genel API dokümantasyonu.</p>
          </a>
        </article>
          <article class="col col--6 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/wallet-api">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Cüzdan API">
              QRL Cüzdan API
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Cüzdan API dokümantasyonu">QRL Cüzdan API dokümantasyonu.</p>
          </a>
        </article>
          <article class="col col--4 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/walletd-rest-proxy">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Walletd Rest Proxy API">
              QRL Walletd Rest Proxy API
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Walletd Rest Proxy API dokümantasyonu">QRL Walletd Rest Proxy API dokümantasyonu.</p>
          </a>
        </article>
          <article class="col col--4 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/zeus-proxy">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Zeus Proxy API">
              QRL Zeus Proxy API
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Zeus Proxy API dokümantasyonu">QRL Zeus Proxy API dokümantasyonu.</p>
          </a>
        </article>
          <article class="col col--4 margin-bottom--lg">
          <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/api/explorer-api">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Gezgin API">
              QRL Gezgin API
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL Gezgin API dokümantasyonu">QRL Gezgin API dokümantasyonu.</p>
          </a>
        </article>
      </section>
    </span>
  </TabItem>

</Tabs>

---

:::info DAHA FAZLA SORUNUZ MU VAR?
Bu dokümanlarda aradığınızı bulamazsanız, daha doğrudan yardım için lütfen [Discord Sunucumuza](https://theqrl.org/discord) katılın.
:::
