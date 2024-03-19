---
id: qrllib
title: QRLLIB - The QRL Core Library
hide_title: false
hide_table_of_contents: false
sidebar_label: QRLLIB
sidebar_position: 3
pagination_label: QRLLIB
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Build/qrllib.md
description: QRLLIB - The QRL Core Library
keywords:
  - docs
  - Advanced
  - QRLLIB
image: /assets/img/icons/yellow.png
slug: /build/qrllib
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{ "text-align": "center"}}>
<span>
      <section class="row list_node_modules-@docusaurus-theme-classic-lib-theme-DocCategoryGeneratedIndexPage-styles-module">
        <article class="col col--12 margin-bottom--md">
          <a class="card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="https://github.com/theQRL/qrllib">
            <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
                title="QRL Core Library">
              QRL Core Library
            </h2>
            <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" 
               title="GitHub Repository link">GitHub repository link for the QRL Core Library </p>
          </a>
        </article>
      </section>
</span>    
</div>
<br />

[![PyPI version](https://badge.fury.io/py/pyqrllib.svg)](https://badge.fury.io/py/pyqrllib)
[![npm version](https://badge.fury.io/js/qrllib.svg)](https://badge.fury.io/js/qrllib)
[![Build Status](https://travis-ci.org/theQRL/qrllib.svg?branch=master)](https://travis-ci.org/theQRL/qrllib)
[![CircleCI](https://circleci.com/gh/theQRL/qrllib.svg?style=svg)](https://circleci.com/gh/theQRL/qrllib)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/theQRL/qrllib/master/LICENSE)






This library currently exposes the following functionality:  

- XMSS, XMSS_fast
- Shake128, Shake256, SHA2_256
- Hashchain seeds, etc.
- Helpers: seed generation, address generation, mnemonics

**Platform support**

|           | Linux |     OSX<br />10.12     |  Windows<br />10 |
|-----------|:------------:|:-----------:|:--------:|
|Python 3   | :white_check_mark: | :white_check_mark: |    :seedling:     |
|Webassembly (JS) |      :white_check_mark:       |     :white_check_mark:       |    :white_check_mark:     |
|Golang     | :seedling: |     -       |    -     |
|Java       |      -       |     -       |    -     |

## Installing

#### Ubuntu
```
sudo apt -y install swig3.0 python3-dev build-essential cmake ninja-build pkg-config
pip3 install pyqrllib
````

#### OSX

If you don't have brew yet, we think you should :) Install brew following the instructions here: [https://brew.sh/](https://brew.sh/)

Now install some dependencies

```bash
brew install cmake python3 swig
pip3 install pyqrllib
```

#### Windows
```
TBD
```

#### Raspbian

```
sudo apt -y install swig3.0 python3-dev build-essential cmake ninja-build
sudo pip3 install -U setuptools
sudo pip3 install -U pyqrllib
```

#### Miscellaneous

Golang and Java wrappers are currently experimental (By default they are disabled in cmake)

```
brew install go --cross-compile-common
```

## Development

#### Emscripten

In order to compile the webassembly and run node.js tests you first need to install CircleCI CLI:

https://circleci.com/docs/2.0/local-cli/#installing-the-circleci-local-cli-on-macos-and-linux-distros

Then run the following command

```
circleci build --job build_emscripten
```

This will compile and test the webassembly. Output files will be copied over to `tests/js/tmp`

You can then run node.js locally using npm.

## License

*This library is distributed under the MIT software license, see the accompanying file LICENSE or http://www.opensource.org/licenses/mit-license.php.*

Some of the code is based on the xmss-reference implementation that has been released in the public domain by their respective authors.

Most of third party code has been included as git submodules for future reference.