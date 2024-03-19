---
id: security
title: QRL Security
hide_title: false
hide_table_of_contents: false
sidebar_label: QRL Security
sidebar_position: 2
pagination_label: QRL Security
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Build/security.md
description: QRL Security
keywords:
  - docs
  - Advanced
  - Security
  - PGP
image: /assets/img/icons/yellow.png
slug: /build/security
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


The QRL provides means for secure communication and verification of various functions and features of the project.

From validating releases for the QRL wallet to providing a secure means to report security impacts and concerns, the QRL Security repo provides the Public PGP keys for the project.


<div style={{ "text-align": "center"}}>
<span>
      <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--12 margin-bottom--lg">
          <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="https://github.com/theQRL/security">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Security - PGP">
              QRL Security - PGP 
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="The QRL Security - PGP keys and signed verification messages">The QRL Security - PGP keys and signed verification messages hosted in GitHub</p>
          </a>
        </article>
      </section>
</span>    
</div>
<br />

The QRL security repo contains:

1. The public key for security@theqrl.org
2. Signed messages containing the hashes of some QRL releases in order that they may be verified

QRL network security issues can be directed to the QRL development team at ```security@theqrl.org```

Should the matter be sensitive, PGP/GPG can be used using the public key contained in this repository.

While setup of secure email is outwith the scope of this repository, instructions to do so are below (thanks @jackalyst)

## Instructions

### Thunderbird

**1. Setup private/public key**

1. Open Thunderbird v78 and above
2. Go to Edit -> Account Settings
3. Find the email account you want to use and select [email acct]-> End-to-End Encryption
4. Click [Add Key]
5. Create new OpenPGP key [continue]
6. Define any parameters (defaults are fine), then [Generate Key] and [confirm]

**2. Import security@theqrl.org's public key**

1. Open Thunderbird 78 and above
2. Go to Tools -> OpenPGP key manager
3. Select Edit -> Import Keys from URL
4. Enter URL: `https://raw.githubusercontent.com/theQRL/security/master/security.theqrl.org.gpg.asc`

**3. Sending an End-to-end encrypted message**

1. Open Thunderbird 78 and above
2. Compose a message to security@theqrl.org
3. Select from the dropdown [security], "Require Encryption", and "Attach my public key"
4. Send email.