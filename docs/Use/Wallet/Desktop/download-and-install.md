---
id: desktop-wallet-install
title: QRL Desktop Wallet - Install 
hide_title: false
hide_table_of_contents: false
sidebar_label: Install
sidebar_position: 2
pagination_label: Desktop Wallet - Install
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Use/Wallet/Desktop/download-and-install.md
description: Install QRL Desktop Wallet
keywords:
  - docs
  - wallet
  - Desktop
  - Install
image: /assets/img/icons/yellow.png
slug: /use/wallet/desktop/install
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


The QRL offers packages for most popular operating systems like Window, Mac OS and Debian Linux. In addition the package can be built from source with instructions for most other systems.

:::info
he QRL Desktop wallet can be installed on most modern operating systems. 
:::

## Download

Using the link below to access the latest desktop wallet files, download the version that suits your computers' OS.

<span>
  <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--12 margin-bottom--md">
            <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="https://github.com/theQRL/qrl-wallet/releases/latest">
                <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" title="QRL Desktop Wallet Download">
                    QRL Desktop Wallet Download
                </h2>
                <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="QRL desktop wallet files">
                    Latest QRL desktop wallet files hosted at Github.com
                </p>
            </a>
        </article>
    </section>
</span>


<br />

<details>
  <summary>Verifying integrity of QRL Wallet releases</summary>
  <p>

#### Requirements

- shasum
- gpg

#### 1. Download a QRL wallet

These are found on the Github releases page: [https://github.com/theQRL/qrl-wallet/releases](https://github.com/theQRL/qrl-wallet/releases)

#### 2. Download security@theqrl.org GPG public key

Either from key servers or [Github](https://github.com/theQRL/security/blob/master/security.theqrl.org.gpg.asc)

e.g.:

**Either:**

```
curl https://raw.githubusercontent.com/theQRL/security/master/security.theqrl.org.gpg.asc | gpg --import
```

**or:**

```
gpg --search-keys security@theqrl.org
```
should yield:

> gpg: data source: https://keys.openpgp.org:443
(1)  Security team <security@theqrl.org>
    4096 bit RSA key 14762269BFDD11F3, created: 2019-02-16

selecting key 1 will add the key to your keychain

#### 3. Download SHASUM file for the OS/version of wallet release

- [v1.8.1](https://github.com/theQRL/security/blob/master/qrl-wallet/1.8.1)
- [v1.8.0](https://github.com/theQRL/security/blob/master/qrl-wallet/1.8.0)
- [v1.7.3](https://github.com/theQRL/security/blob/master/qrl-wallet/1.7.3)
- [v1.7.0](https://github.com/theQRL/security/blob/master/qrl-wallet/1.7.0)
- [v1.6.6](https://github.com/theQRL/security/blob/master/qrl-wallet/1.6.6)

#### 4. Verify the signature of the SHASUM file

```
gpg --verify LINUX-x64_QRL-Wallet_1.8.1.deb.shasum.asc
```

Successful verification is indicated by:

```
gpg: Good signature from "Security team <security@theqrl.org>"
```

#### 5. Check the SHASUM of the downloaded wallet package

```
shasum -a 512 --check LINUX-x64_QRL-Wallet_1.8.1.deb.shasum.asc
```

Successful verification is indicated by (in this example):

```
LINUX-x64_QRL-Wallet_1.8.1.deb: OK
```

NB: _shasum: WARNING: 19 lines are improperly formatted_ messages are expected and are **not** errors: this is due to the SHASUM file being signed with GPG


  </p>
</details>

## Install

After you have downloaded the appropriate package follow these instructions to install the QRL Desktop wallet


<Tabs
    defaultValue="ubuntu"
    groupId="os"
    values={[
        {label: 'Ubuntu', value: 'ubuntu'},
        {label: 'MacOS', value: 'macos'},
        {label: 'Windows', value: 'windows'},
    ]}>

<TabItem value="ubuntu">

:::tip
Linux users can select from either the `.rpm` version or a `.deb` package.
:::

#### Install From .deb File

Using the `DPKG` installer that comes with Ubuntu you can simply enter the following command to install the QRL desktop wallet.

```bash
sudo dpkg -i LINUX-x64_QRL-Wallet_1.8.1_amd64.deb
```

This will install the package using your package manager.

#### Install From .rpm File

Using the `RPM` packaging system you can install the desktop wallet using the following command. 

```bash
rpm -i LINUX-x64_QRL-Wallet_1.8.1.rpm
```
</TabItem>

<TabItem value="macos">

Installation of the QRL Desktop application on a MAC is simple. Download the correct version depending on what type of MAC you have. 

Then simply drag the `.dmg` file into the applications folder.

Then you can run the application to access the QRL Desktop wallet.

</TabItem>

<TabItem value="windows">

:::tip
Windows users can select from either the `.msi` version or an executable `.exe` package.
:::

#### Install from `.msi` File

Download the `WINDOWS-x64_QRL-Wallet_1.8.1.msi
` file onto your windows computer.

Double click on the `.msi` file to install the desktop wallet on Windows.

#### Install from `.zip` File

Download and unzip the QRL Desktop wallet for windows.

Once unzipped, run the `QRLWallet.exe` file located in the archive.

</TabItem>
</Tabs>