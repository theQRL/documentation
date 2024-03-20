---
id: qrandomx
title: QrandomX
hide_title: false
hide_table_of_contents: false
sidebar_label: QrandomX
sidebar_position: 3
pagination_label: QrandomX
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/Build/Mining/qrandomx.md
description: QrandomX
keywords:
  - docs
  - Advanced
  - QRL QrandomX
image: /assets/img/icons/yellow.png
slug: /build/mining/qrandomx
---


[![PyPI version](https://badge.fury.io/py/pyqrandomx.svg)](https://badge.fury.io/py/pyqrandomx)
[![CircleCI](https://circleci.com/gh/theQRL/qrandomx.svg?style=shield)](https://circleci.com/gh/theQRL/qrandomx)
[![GPL3 licensed](https://img.shields.io/badge/license-GPL3-blue.svg)](https://raw.githubusercontent.com/theQRL/qrandomx/master/LICENSE)

# QRandomX

This library (derived from [RandomX](https://github.com/tevador/RandomX)) currently exposes the following functionality:  

- Python Wrapper for QRandomX hash
- Mining thread and hybrid callback 

**Platform support**

|           | Linux |     OSX<br />10.12     |  Windows<br />10 |
|-----------|:------------:|:-----------:|:--------:|
|Python 3   | :white_check_mark: | :white_check_mark: |    :white_check_mark:     |
|Webassembly (JS) |      :question:       |     :question:       |    :question:     |
|Golang     | - |     -       |    -     |     -    |

## Installing

#### Ubuntu
```
sudo apt -y install swig3.0 python3-dev build-essential cmake libhwloc-dev libboost-dev
pip3 install pyqrandomx
````

#### OSX

If you don't have brew yet, then Install brew following the instructions here: [https://brew.sh/](https://brew.sh/)

Now install some dependencies

```bash
brew install cmake python3 swig hwloc boost
pip3 install pyqrandomx
```

## License

*This library is distributed under the GPL3 software license
